/**
 * Extracts job description text from LinkedIn URL or direct text input
 * Now supports LinkedIn URL scraping!
 */

import { scrapeLinkedInJob } from './scrapeLinkedIn';
import { scrapeJob } from './jobScraper';

export interface JobInput {
    source: 'url' | 'text';
    content: string;
}

export interface ExtractedJob {
    title: string;
    company: string;
    description: string;
}

/**
 * Extracts job information from user input
 * @param input - Job input (URL or text)
 * @returns Extracted job information
 */
export async function extractJobText(input: JobInput): Promise<ExtractedJob> {
    let jobUrl = input.content;
    if (input.source === 'url') {
        // Try to scrape LinkedIn URL
        if (jobUrl.includes("linkedin") && jobUrl.includes("currentJobId")) {
            const jobID = jobUrl.split("currentJobId=")[1];
            jobUrl = "https://www.linkedin.com/jobs/view/" + jobID;
        }
        try {
            const jobData = await scrapeJob(jobUrl);
            return {
                title: jobData.title,
                company: jobData.company,
                description: jobData.description,
            };
        } catch (error) {
            // If scraping fails, throw error with helpful message
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';

            if (errorMessage === "Provided URL is not a valid job offer") {
                throw error;
            }

            throw new Error(
                `Unable to scrape the job from this URL. ${errorMessage}. ` +
                'Please switch to "manual text" mode and paste the job description directly.'
            );
        }
    }

    // Process pasted text
    const description = jobUrl.trim();

    // Check if the user pasted a URL instead of text in manual mode
    const urlPattern = /^(https?:\/\/[^\s]+)$/i;
    if (urlPattern.test(description)) {
        throw new Error(
            'It looks like you pasted a URL instead of the job description. ' +
            'Please copy the actual text of the job posting and paste it here, or switch to "URL" mode.'
        );
    }

    if (!description || description.length < 50) {
        throw new Error('Job description is too short. Please provide a complete job posting.');
    }

    // Try to extract title and company from the text (basic heuristics)
    const extracted = extractJobMetadata(description);

    return {
        title: extracted.title || 'Job Position',
        company: extracted.company || 'Company',
        description,
    };
}

/**
 * Attempts to extract job title and company from job description text
 * Uses simple heuristics - not perfect but good enough for V1
 */
function extractJobMetadata(text: string): { title: string; company: string } {
    const lines = text.split('\n').filter(line => line.trim().length > 0);

    let title = '';
    let company = '';

    // Common patterns for job titles (first few lines usually)
    const titlePatterns = [
        /^(.+?)\s*(?:at|@|-)\s*(.+?)$/i,
        /^job title:\s*(.+?)$/i,
        /^position:\s*(.+?)$/i,
    ];

    // Try to find title and company in first 5 lines
    for (let i = 0; i < Math.min(5, lines.length); i++) {
        const line = lines[i].trim();

        for (const pattern of titlePatterns) {
            const match = line.match(pattern);
            if (match) {
                title = match[1]?.trim() || '';
                company = match[2]?.trim() || '';
                break;
            }
        }

        if (title && company) break;

        // If no pattern match, use first line as title, second as company
        if (i === 0 && !title) title = line;
        if (i === 1 && !company) company = line;
    }

    return { title, company };
}

/**
 * Validates job description input
 */
export function validateJobInput(input: string): boolean {
    if (!input || input.trim().length < 50) {
        throw new Error('Job description must be at least 50 characters');
    }

    if (input.length > 50000) {
        throw new Error('Job description is too long (max 50,000 characters)');
    }

    return true;
}
