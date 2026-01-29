import puppeteer from 'puppeteer';
import { JobData } from './types';
import { cleanJobHtml, normalizeText, extractSections } from './utils';

/**
 * Scrapes job data from Indeed URL using Puppeteer to bypass bot detection.
 */
export async function scrapeIndeedJob(url: string): Promise<JobData> {
    // Launch browser in headless mode
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    try {
        // Set a realistic user agent
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');

        // Navigate to the URL
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

        // Extract data from the page
        const rawData = await page.evaluate(() => {
            // Indeed specific selectors
            const title = document.querySelector('h1.jobsearch-JobInfoHeader-title')?.textContent ||
                document.querySelector('meta[property="og:title"]')?.getAttribute('content')?.split('-')[0] ||
                '';

            const company = document.querySelector('[data-company-name="true"]')?.textContent ||
                document.querySelector('.jobsearch-InlineCompanyRating div')?.textContent ||
                '';

            const location = document.querySelector('.jobsearch-JobInfoHeader-subtitle > div:last-child')?.textContent ||
                document.querySelector('[data-testid="inline-header-location"]')?.textContent ||
                '';

            const descriptionHtml = document.querySelector('#jobDescriptionText')?.innerHTML || '';

            return { title, company, location, descriptionHtml };
        });

        if (!rawData.descriptionHtml) {
            // Check if we hit a captcha
            const hasCaptcha = await page.evaluate(() => {
                return document.body.innerHTML.includes('hCaptcha') ||
                    document.body.innerHTML.includes('Cloudflare') ||
                    document.body.innerHTML.includes('dd-captcha');
            });

            if (hasCaptcha) {
                throw new Error("Indeed's anti-bot protection (CAPTCHA) blocked the request even with Puppeteer. Please paste the description manually.");
            }

            throw new Error("Could not locate job description on Indeed page");
        }

        await browser.close();

        // Process and clean the data using our utilities
        const cleanDescription = cleanJobHtml(rawData.descriptionHtml);
        const requirements = extractSections(cleanDescription, ['requirements', 'qualifications', 'what you bring', 'skills']);
        const responsibilities = extractSections(cleanDescription, ['responsibilities', 'what you will do', 'the role', 'key tasks']);
        const skills = extractSections(cleanDescription, ['skills', 'technologies', 'stack']);

        return {
            title: normalizeText(rawData.title) || 'Job Position',
            company: normalizeText(rawData.company) || 'Company',
            location: normalizeText(rawData.location) || undefined,
            description: cleanDescription,
            requirements: requirements.length > 0 ? requirements : undefined,
            responsibilities: responsibilities.length > 0 ? responsibilities : undefined,
            skills: skills.length > 0 ? skills : undefined,
        };

    } catch (error) {
        if (browser) await browser.close();
        console.error('Indeed Puppeteer scraping error:', error);
        throw error instanceof Error ? error : new Error('Failed to scrape Indeed job with Puppeteer');
    }
}
