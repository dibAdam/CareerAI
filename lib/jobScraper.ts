import { scrapeLinkedInJob } from './scrapeLinkedIn';
import { scrapeIndeedJob } from './scrapers/scrapeIndeedJob';
import { scrapeGlassdoorJob } from './scrapers/scrapeGlassdoorJob';
import { scrapeWelcomeToTheJungleJob } from './scrapers/scrapeWelcomeToTheJungleJob';
import { scrapeGenericJob } from './scrapers/scrapeGenericJob';
import { JobData } from './scrapers/types';

/**
 * Central dispatcher for job scraping.
 * Detects the platform from the URL and calls the appropriate scraper.
 */
export async function scrapeJob(url: string): Promise<JobData> {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();

    // 1. LinkedIn
    if (hostname.includes('linkedin.com')) {
        const linkedInData = await scrapeLinkedInJob(url);
        return {
            title: linkedInData.title,
            company: linkedInData.company,
            location: linkedInData.location,
            description: linkedInData.description,
            // LinkedIn scraper doesn't currently extract these separately, 
            // but they are included in the description.
        };
    }

    // 2. Indeed
    if (hostname.includes('indeed.com')) {
        return await scrapeIndeedJob(url);
    }

    // 3. Glassdoor
    if (hostname.includes('glassdoor.com')) {
        return await scrapeGlassdoorJob(url);
    }

    // 4. Welcome to the Jungle
    if (hostname.includes('welcometothejungle.com')) {
        return await scrapeWelcomeToTheJungleJob(url);
    }

    // 5. Fallback to Generic Scraper
    console.log(`No specific scraper for ${hostname}, falling back to generic scraper.`);
    return await scrapeGenericJob(url);
}
