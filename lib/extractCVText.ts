import pdf from 'pdf-parse/lib/pdf-parse';

/**
 * Extracts text from a PDF CV file
 * @param file - The PDF file to extract text from
 * @returns Extracted text content
 */
export async function extractCVText(file: File): Promise<string> {
    try {
        // Convert File to Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Parse PDF
        const data = await pdf(buffer);

        if (!data.text || data.text.trim().length === 0) {
            throw new Error('No text content found in PDF');
        }

        return data.text;
    } catch (error) {
        console.error('Error extracting CV text:', error);
        throw new Error('Failed to extract text from PDF. Please ensure the file is a valid PDF.');
    }
}

/**
 * Validates CV file before processing
 * @param file - The file to validate
 * @returns true if valid, throws error otherwise
 */
export function validateCVFile(file: File): boolean {
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    const ALLOWED_TYPES = ['application/pdf'];

    if (!ALLOWED_TYPES.includes(file.type)) {
        throw new Error('Only PDF files are supported');
    }

    if (file.size > MAX_SIZE) {
        throw new Error('File size must be less than 10MB');
    }

    return true;
}
