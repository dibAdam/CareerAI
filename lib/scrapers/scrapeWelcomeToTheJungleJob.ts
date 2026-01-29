import puppeteer from 'puppeteer';
import { JobData } from './types';
import { cleanJobHtml, normalizeText, extractSections } from './utils';

/**
 * Scrapes job data from Welcome to the Jungle URL using Puppeteer.
 */
export async function scrapeWelcomeToTheJungleJob(url: string): Promise<JobData> {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    try {
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

        const rawData = await page.evaluate(() => {
            const title = document.querySelector('h1')?.textContent || '';

            // Company name is often in a link or header
            const companyElement = document.querySelector('a[href*="/companies/"] h2') ||
                document.querySelector('a[href*="/companies/"] span') ||
                document.querySelector('a[href*="/companies/"]');
            const company = companyElement?.textContent || '';

            const location = document.querySelector('[data-testid="job-metadata-location"]')?.textContent ||
                document.querySelector('i.wttj-icon-location')?.parentElement?.textContent ||
                '';

            // WTTJ uses data-testid="job-section-description"
            const descElement = document.querySelector('[data-testid="job-section-description"]') ||
                document.querySelector('section#section-description') ||
                document.querySelector('.job-description');

            const descriptionHtml = descElement?.innerHTML || '';

            return { title, company, location, descriptionHtml };
        });

        if (!rawData.descriptionHtml) {
            const hasBotDetection = await page.evaluate(() => {
                const text = document.body.textContent || '';
                return text.includes('hCaptcha') || text.includes('Cloudflare') || text.includes('Checking your browser');
            });

            if (hasBotDetection) {
                throw new Error("Welcome to the Jungle's anti-bot protection blocked the request. Please paste the description manually.");
            }
            throw new Error("Could not locate job description on Welcome to the Jungle page");
        }

        await browser.close();

        const cleanDescription = cleanJobHtml(rawData.descriptionHtml);
        const requirements = extractSections(cleanDescription, ['requirements', 'profile', 'what we are looking for', 'skills']);
        const responsibilities = extractSections(cleanDescription, ['responsibilities', 'what you will do', 'the role', 'mission']);

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
        console.error('Welcome to the Jungle Puppeteer scraping error:', error);
        throw error instanceof Error ? error : new Error('Failed to scrape Welcome to the Jungle job');
    }
}
