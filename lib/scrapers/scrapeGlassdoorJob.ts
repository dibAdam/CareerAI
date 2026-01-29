import puppeteer from 'puppeteer';
import { JobData } from './types';
import { cleanJobHtml, normalizeText, extractSections } from './utils';

/**
 * Scrapes job data from Glassdoor URL using Puppeteer to bypass bot detection.
 */
export async function scrapeGlassdoorJob(url: string): Promise<JobData> {
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
            // Glassdoor specific selectors
            const title = document.querySelector('[data-test="jobTitle"]')?.textContent ||
                document.querySelector('h1')?.textContent ||
                '';

            const employerNameElement = document.querySelector('[data-test="employerName"]');
            let company = employerNameElement?.textContent || '';
            // Clean up ratings often attached to the name (e.g., "Google 4.5")
            company = company.replace(/\d\.\d\s*$/, '').trim();

            const location = document.querySelector('[data-test="location"]')?.textContent || '';

            // Glassdoor usually uses .jobDescriptionContent or #JobDescriptionContainer
            const descElement = document.querySelector('.jobDescriptionContent') ||
                document.querySelector('#JobDescriptionContainer') ||
                // Fallback: find the largest text block that looks like a description
                Array.from(document.querySelectorAll('div')).find(div =>
                    (div.textContent?.length || 0) > 500 &&
                    (div.textContent?.toLowerCase().includes('responsibilities') ||
                        div.textContent?.toLowerCase().includes('requirements'))
                );

            const descriptionHtml = descElement?.innerHTML || '';

            return { title, company, location, descriptionHtml };
        });

        if (!rawData.descriptionHtml) {
            // Check if we hit a captcha or bot detection
            const hasBotDetection = await page.evaluate(() => {
                const bodyText = document.body.textContent || '';
                return bodyText.includes('hCaptcha') ||
                    bodyText.includes('Cloudflare') ||
                    bodyText.includes('dd-captcha') ||
                    bodyText.includes('Checking your browser') ||
                    document.title.includes('Access Denied');
            });

            if (hasBotDetection) {
                throw new Error("Glassdoor's anti-bot protection blocked the request even with Puppeteer. Please paste the job description manually.");
            }

            throw new Error("Could not locate job description on Glassdoor page");
        }

        await browser.close();

        // Process and clean the data using our utilities
        const cleanDescription = cleanJobHtml(rawData.descriptionHtml);
        const requirements = extractSections(cleanDescription, ['requirements', 'qualifications', 'what you bring', 'skills']);
        const responsibilities = extractSections(cleanDescription, ['responsibilities', 'what you will do', 'the role', 'key tasks']);

        return {
            title: normalizeText(rawData.title) || 'Job Position',
            company: normalizeText(rawData.company) || 'Company',
            location: normalizeText(rawData.location) || undefined,
            description: cleanDescription,
            requirements: requirements.length > 0 ? requirements : undefined,
            responsibilities: responsibilities.length > 0 ? responsibilities : undefined,
        };

    } catch (error) {
        if (browser) await browser.close();
        console.error('Glassdoor Puppeteer scraping error:', error);
        throw error instanceof Error ? error : new Error('Failed to scrape Glassdoor job with Puppeteer');
    }
}
