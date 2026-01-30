'use server';

import { analyzeCV } from '@/lib/aiAnalyze';
import { extractCVText } from '@/lib/extractCVText';
import { extractJobText } from '@/lib/extractJobText';
import { createClient } from '@/lib/supabase/server';
import { db } from '@/lib/db';
import { analyses, analysisSections } from '@/db/schema';
import { checkAnonymousUsage } from '@/lib/actions/check-anonymous-usage';
import { recordAnonymousUsage } from '@/lib/actions/record-anonymous-usage';

export interface AnalyzeCVInput {
    cvFile?: File;
    cvText?: string;
    jobInput: string; // Job description text
    jobSource: 'url' | 'text';
}

export interface AnalyzeCVResult {
    success: boolean;
    analysisId?: string;
    error?: string;
}

/**
 * Server action to analyze CV against job description
 * This is the main entry point for the analysis flow
 * Supports both authenticated and anonymous users (1 free analysis)
 */
export async function analyzeCVAction(input: AnalyzeCVInput): Promise<AnalyzeCVResult> {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        // Check anonymous usage limits (bypassed for authenticated users)
        const usageCheck = await checkAnonymousUsage();
        if (!usageCheck.allowed) {
            return {
                success: false,
                error: usageCheck.reason || 'Usage limit reached. Please sign in to continue.'
            };
        }

        // Step 1: Extract CV text
        let cvText: string;

        if (input.cvFile) {
            cvText = await extractCVText(input.cvFile);
        } else if (input.cvText) {
            cvText = input.cvText.trim();
        } else {
            return { success: false, error: 'Please provide a CV file or text' };
        }

        if (!cvText || cvText.length < 100) {
            return { success: false, error: 'CV text is too short. Please provide a complete CV.' };
        }

        // Step 2: Extract job description
        const jobData = await extractJobText({
            source: input.jobSource,
            content: input.jobInput,
        });

        // Step 3: Perform AI analysis
        const analysis = await analyzeCV(
            cvText,
            jobData.description,
            jobData.title,
            jobData.company
        );

        // Step 4: Save to database using Drizzle (userId can be null for anonymous)
        const [analysisRecord] = await db.insert(analyses).values({
            userId: user?.id || null,
            jobTitle: jobData.title,
            company: jobData.company,
            jobDescription: jobData.description,
            cvText: cvText,
            matchScore: analysis.overall_match_score,
            potentialScore: analysis.potential_score,
            summary: analysis.summary,
            missingKeywords: analysis.missing_keywords,
            priorityActions: analysis.priority_actions,
            atsTips: analysis.ats_tips,
        }).returning();

        if (!analysisRecord) {
            return { success: false, error: 'Failed to save analysis' };
        }

        // Step 5: Save section feedback using Drizzle
        const sectionsToInsert = Object.entries(analysis.section_feedback).map(([section, feedback]) => ({
            analysisId: analysisRecord.id,
            section,
            feedback,
            priority: determinePriority(section, feedback),
        }));

        if (sectionsToInsert.length > 0) {
            await db.insert(analysisSections).values(sectionsToInsert);
        }

        // Step 6: Record anonymous usage (if user is not logged in)
        if (!user) {
            await recordAnonymousUsage();
        }

        return {
            success: true,
            analysisId: analysisRecord.id,
        };
    } catch (error) {
        console.error('Analysis error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'An unexpected error occurred',
        };
    }
}

/**
 * Determines priority level based on section and feedback content
 */
function determinePriority(section: string, feedback: string): 'high' | 'medium' | 'low' {
    const highPrioritySections = ['skills', 'experience'];
    const lowercaseFeedback = feedback.toLowerCase();

    if (
        lowercaseFeedback.includes('missing') ||
        lowercaseFeedback.includes('critical') ||
        lowercaseFeedback.includes('required')
    ) {
        return 'high';
    }

    if (highPrioritySections.includes(section)) {
        return 'high';
    }

    if (section === 'formatting' || section === 'summary') {
        return 'medium';
    }

    return 'low';
}
