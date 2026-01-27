/**
 * LinkedIn job scraping utility
 * Extracts job details from LinkedIn job posting URLs
 */

export interface LinkedInJobData {
    title: string;
    company: string;
    description: string;
    location?: string;
    employmentType?: string;
}

/**
 * Scrapes job data from LinkedIn URL
 * Uses a simple fetch approach to get the page content
 */
export async function scrapeLinkedInJob(url: string): Promise<LinkedInJobData> {
    // console.log("scraping linkedin job", url);
    try {
        // Validate LinkedIn URL
        if (!isValidLinkedInJobUrl(url)) {
            throw new Error('Invalid LinkedIn job URL. Please provide a valid LinkedIn job posting URL.');
        }

        // Fetch the page content
        const response = await fetch(url, {
            cache: 'no-store',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            },
        });

        // console.log("response after scraping", response);

        if (!response.ok) {
            throw new Error('Failed to fetch LinkedIn job page');
        }

        const html = await response.text();

        // Extract job data from HTML
        const jobData = extractJobDataFromHTML(html);

        return jobData;
    } catch (error) {
        console.error('LinkedIn scraping error:', error);
        throw new Error(
            'Unable to scrape LinkedIn job. Please paste the job description manually instead.'
        );
    }
}

/**
 * Validates if URL is a LinkedIn job posting
 */
function isValidLinkedInJobUrl(url: string): boolean {
    try {
        const urlObj = new URL(url);
        return (
            urlObj.hostname.includes('linkedin.com') &&
            (urlObj.pathname.includes('/jobs/view/') || urlObj.pathname.includes('/jobs/collections/') || urlObj.pathname.includes('/jobs/search'))
        );
    } catch {
        return false;
    }
}

/**
 * Extracts job data from LinkedIn HTML
 * Uses JSON-LD if available, otherwise falls back to regex
 */
function extractJobDataFromHTML(html: string): LinkedInJobData {
    // Try JSON-LD first (most reliable)
    try {
        const jsonLdMatch = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i);
        if (jsonLdMatch) {
            const data = JSON.parse(jsonLdMatch[1].trim());

            // LinkedIn job JSON-LD structure
            if (data['@type'] === 'JobPosting' || (Array.isArray(data) && data.find(i => i['@type'] === 'JobPosting'))) {
                const job = Array.isArray(data) ? data.find(i => i['@type'] === 'JobPosting') : data;

                return {
                    title: cleanText(job.title || ''),
                    company: cleanText(job.hiringOrganization?.name || ''),
                    description: cleanHtml(job.description || ''),
                    location: cleanText(job.jobLocation?.address?.addressLocality || ''),
                    employmentType: cleanText(job.employmentType || ''),
                };
            }
        }
    } catch (e) {
        console.warn('Failed to parse JSON-LD:', e);
    }

    // Fallback to regex extraction
    // Extract title
    const titleMatch = html.match(/<h1[^>]*class="[^"]*topcard__title[^"]*"[^>]*>([^<]+)<\/h1>/i) ||
        html.match(/<title>([^|]+)\|/i) ||
        html.match(/<meta[^>]*property="og:title"[^>]*content="([^"]+)"/i);
    const title = titleMatch ? cleanText(titleMatch[1]) : 'Job Position';

    // Extract company
    const companyMatch = html.match(/<a[^>]*class="[^"]*topcard__org-name-link[^"]*"[^>]*>([^<]+)<\/a>/i) ||
        html.match(/at\s+([^|]+)\s+\|/i) ||
        html.match(/<meta[^>]*property="og:description"[^>]*content="[^"]*at\s+([^"]+)"/i);
    const company = companyMatch ? cleanText(companyMatch[1]) : 'Company';

    // Extract description
    const descMatch = html.match(/<div[^>]*class="[^"]*description__text[^"]*"[^>]*>([\s\S]*?)<\/div>/i) ||
        html.match(/<section[^>]*class="[^"]*show-more-less-html[^"]*"[^>]*>([\s\S]*?)<\/section>/i) ||
        html.match(/<div[^>]*class="[^"]*job-description[^"]*"[^>]*>([\s\S]*?)<\/div>/i);

    let description = '';
    if (descMatch) {
        description = cleanHtml(descMatch[1]);
    }

    if (!description || description.length < 50) {
        // Last ditch effort: try to find the largest text block
        const bodyText = html.replace(/<script[\s\S]*?<\/script>/gi, '')
            .replace(/<style[\s\S]*?<\/style>/gi, '')
            .replace(/<[^>]+>/g, ' ')
            .replace(/\s+/g, ' ');

        if (bodyText.length > 500) {
            description = bodyText.trim();
        } else {
            throw new Error('Could not extract job description from LinkedIn page');
        }
    }

    // Extract location (optional)
    const locationMatch = html.match(/<span[^>]*class="[^"]*topcard__flavor[^"]*"[^>]*>([^<]+)<\/span>/i) ||
        html.match(/<span[^>]*class="[^"]*job-search-card__location[^"]*"[^>]*>([^<]+)<\/span>/i);
    const location = locationMatch ? cleanText(locationMatch[1]) : undefined;

    return {
        title,
        company,
        description,
        location,
    };
}

/**
 * Cleans HTML and converts to plain text
 */
function cleanHtml(html: string): string {
    return html
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/p>/gi, '\n\n')
        .replace(/<li>/gi, '\n• ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/\n\s*\n/g, '\n\n')
        .replace(/[ \t]+/g, ' ')
        .trim();
}

/**
 * Cleans extracted text
 */
function cleanText(text: string): string {
    return text
        .replace(/\s+/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .trim();
}
