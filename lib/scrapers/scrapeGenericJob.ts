import puppeteer from 'puppeteer';
import { JobData } from './types';
import { cleanJobHtml, normalizeText } from './utils';

/**
 * Fallback scraper for unknown job sites using Puppeteer.
 * Attempts to locate job content using semantic tags and heuristics.
 */
export async function scrapeGenericJob(url: string): Promise<JobData> {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    try {
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

        const rawData = await page.evaluate(() => {
            // 1. Attempt to find the main content
            const mainContent = document.querySelector('article, main, [role="main"], #main, .main, #content, .content');

            // 2. Extract title (h1 is usually the best bet)
            const title = document.querySelector('h1')?.textContent ||
                document.title.split('|')[0].split('-')[0] ||
                '';

            // 3. Extract company (often in meta tags or near the title)
            const siteName = document.querySelector('meta[property="og:site_name"]')?.getAttribute('content') ||
                document.querySelector('meta[name="author"]')?.getAttribute('content') ||
                document.querySelector('.company-name, .employer-name, [itemprop="hiringOrganization"]')?.textContent ||
                document.querySelector('.card-block-company h3, .company-profile h1, .company-profile h2')?.textContent ||
                '';

            // 4. Extract description using heuristics
            let descriptionHtml = '';
            if (mainContent) {
                descriptionHtml = mainContent.innerHTML;
            } else {
                // Fallback: find the largest text block that looks like a job description
                const divs = Array.from(document.querySelectorAll('div, section'));
                let bestBlock = null;
                let maxScore = 0;

                divs.forEach(el => {
                    const text = el.textContent || '';
                    const keywords = [
                        'responsibilities', 'requirements', 'qualifications', 'experience', 'benefits', 'apply', 'skills',
                        'missions', 'profil', 'compétences', 'postuler', 'offre', 'recrutement'
                    ];
                    let score = 0;

                    const lowerText = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    keywords.forEach(k => {
                        const normalizedK = k.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                        if (lowerText.includes(normalizedK)) score += 100;
                    });
                    score += Math.min(text.length / 10, 500);

                    if (score > maxScore) {
                        maxScore = score;
                        bestBlock = el;
                    }
                });

                if (bestBlock) {
                    descriptionHtml = (bestBlock as HTMLElement).innerHTML;
                }
            }

            return { title, siteName, descriptionHtml };
        });

        if (!rawData.descriptionHtml) {
            throw new Error("Provided URL is not a valid job offer");
        }

        const cleanDescription = cleanJobHtml(rawData.descriptionHtml);

        // 5. Validation (STRICT)
        if (!isValidJobOffer(cleanDescription)) {
            throw new Error("Provided URL is not a valid job offer");
        }

        await browser.close();

        return {
            title: normalizeText(rawData.title) || 'Job Position',
            company: normalizeText(rawData.siteName) || 'Company',
            description: cleanDescription,
        };

    } catch (error) {
        if (browser) await browser.close();
        console.error('Generic Puppeteer scraping error:', error);
        if (error instanceof Error && error.message === "Provided URL is not a valid job offer") {
            throw error;
        }
        throw new Error("Provided URL is not a valid job offer");
    }
}

/**
 * Validates if the extracted content is likely a job offer.
 * Supports multiple languages by normalizing accents and including localized keywords.
 */
function isValidJobOffer(text: string): boolean {
    const minLength = 300;
    const keywords = [
        'responsibilities', 'requirements', 'qualifications', 'experience', 'skills', 'job', 'role', 'apply',
        'missions', 'profil', 'competences', 'postuler', 'offre', 'recrutement'
    ];

    if (text.length < minLength) return false;

    // Normalize text: lowercase and remove accents
    const normalizedText = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const matchCount = keywords.filter(k => {
        const normalizedK = k.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return normalizedText.includes(normalizedK);
    }).length;

    // Must have at least 2 job-related keywords
    return matchCount >= 2;
}
