import * as cheerio from 'cheerio';

/**
 * Cleans HTML content and converts it to a structured, readable plain text format.
 * Preserves bullet points and section titles.
 */
export function cleanJobHtml(html: string): string {
    const $ = cheerio.load(html);

    // Remove unwanted elements
    $('script, style, nav, footer, header, button, .cookie-banner, [role="banner"], [role="navigation"]').remove();

    // Process lists to preserve bullet points
    $('li').each((_, el) => {
        $(el).prepend('• ');
    });

    // Add newlines after block elements
    $('p, div, section, article, h1, h2, h3, h4, h5, h6, li').each((_, el) => {
        $(el).append('\n');
    });

    let text = $.text();

    // Normalize whitespace
    text = text
        .replace(/[ \t]+/g, ' ') // Replace multiple spaces/tabs with single space
        .replace(/\n\s*\n\s*\n/g, '\n\n') // Replace 3+ newlines with 2
        .trim();

    return text;
}

/**
 * Normalizes text by removing extra whitespace
 */
export function normalizeText(text: string | undefined): string {
    if (!text) return '';
    return text.replace(/\s+/g, ' ').trim();
}

/**
 * Extracts sections like Requirements, Responsibilities from text
 */
export function extractSections(text: string, keywords: string[]): string[] {
    const lines = text.split('\n');
    const result: string[] = [];
    let capturing = false;

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        const isHeader = keywords.some(k => trimmed.toLowerCase().includes(k.toLowerCase())) && trimmed.length < 50;

        if (isHeader) {
            capturing = true;
            continue;
        }

        if (capturing) {
            // Stop if we hit another potential header that isn't in our current search
            // (This is a bit naive but works for simple cases)
            if (trimmed.length < 30 && /^[A-Z][a-z]+/.test(trimmed) && !keywords.some(k => trimmed.toLowerCase().includes(k.toLowerCase()))) {
                // capturing = false;
            }

            if (trimmed.startsWith('•')) {
                result.push(trimmed.replace(/^•\s*/, ''));
            }
        }
    }

    return result;
}
