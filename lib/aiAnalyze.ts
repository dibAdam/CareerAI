import OpenAI from 'openai';

// Initialize OpenRouter client (uses OpenAI SDK)
const openrouter = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: 'https://openrouter.ai/api/v1',
    defaultHeaders: {
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        'X-Title': 'Nextrova',
    },
});

// Available models on OpenRouter (you can change this)
const MODEL = process.env.OPENROUTER_MODEL || 'anthropic/claude-3.5-sonnet'; // Default to Claude 3.5 Sonnet

export interface AnalysisResult {
    overall_match_score: number;
    potential_score: number;
    summary: string;
    missing_keywords: string[];
    section_feedback: {
        summary: string;
        skills: string;
        experience: string;
        education: string;
        formatting: string;
    };
    priority_actions: string[];
    ats_tips: string[];
}

/**
 * Analyzes CV against job description using AI via OpenRouter
 * Returns structured ATS-focused feedback
 */
export async function analyzeCV(
    cvText: string,
    jobDescription: string,
    jobTitle: string,
    company: string
): Promise<AnalysisResult> {
    // console.log(`AI Analysis started for ${jobTitle} at ${company}. CV length: ${cvText.length}, Job length: ${jobDescription.length}`);
    const prompt = buildAnalysisPrompt(cvText, jobDescription, jobTitle, company);

    try {
        const response = await openrouter.chat.completions.create({
            model: MODEL,
            messages: [
                {
                    role: 'system',
                    content: SYSTEM_PROMPT,
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            temperature: 0.3, // Lower temperature for more consistent and accurate analysis
            response_format: { type: 'json_object' },
        });

        const content = response.choices[0]?.message?.content;

        if (!content) {
            throw new Error('No response from AI');
        }

        // Try to parse JSON from the response
        let result: AnalysisResult;

        try {
            // Clean the content of any potential markdown artifacts if they exist
            const cleanedContent = content.trim().replace(/^```json\n?/, '').replace(/\n?```$/, '');
            result = JSON.parse(cleanedContent) as AnalysisResult;
        } catch (parseError) {
            // Fallback: try to extract JSON from markdown code blocks
            const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/```\n([\s\S]*?)\n```/);
            if (jsonMatch) {
                try {
                    result = JSON.parse(jsonMatch[1]) as AnalysisResult;
                } catch (innerError) {
                    console.error('Failed to parse extracted JSON:', jsonMatch[1]);
                    throw new Error('AI returned invalid JSON structure');
                }
            } else {
                console.error('Raw AI response that failed to parse:', content);
                throw new Error('Failed to parse AI response as JSON');
            }
        }

        // Validate the response structure
        validateAnalysisResult(result);

        return result;
    } catch (error) {
        console.error('AI Analysis error:', error);
        if (error instanceof Error) {
            throw new Error(`Failed to analyze CV: ${error.message}`);
        }
        throw new Error('Failed to analyze CV. Please try again.');
    }
}

/**
 * System prompt that defines the AI's role and output format
 */
const SYSTEM_PROMPT = `You are an expert ATS (Applicant Tracking System) consultant and career coach.

Your role is to analyze CVs against job descriptions and provide actionable, ATS-focused feedback.

You MUST respond with valid JSON in this exact structure:
{
  "overall_match_score": <number 0-100, be realistic but fair. 0 should only be for completely irrelevant CVs>,
  "potential_score": <number 0-100, the score the candidate could achieve if they implement all your priority actions>,
  "summary": "<brief 2-3 sentence overview>",
  "missing_keywords": ["keyword1", "keyword2", ...],
  "section_feedback": {
    "summary": "<feedback on CV summary/objective section>",
    "skills": "<feedback on skills section>",
    "experience": "<feedback on work experience section>",
    "education": "<feedback on education section>",
    "formatting": "<feedback on ATS-friendly formatting>"
  },
  "priority_actions": [
    "<high-impact action 1>",
    "<high-impact action 2>",
    "<high-impact action 3>"
  ],
  "ats_tips": [
    "<ATS tip 1>",
    "<ATS tip 2>",
    "<ATS tip 3>"
  ]
}

Focus on:
- ATS compatibility (formatting, keywords, structure)
- Job requirement alignment
- Missing critical skills/keywords
- Concrete, actionable improvements
- Prioritized fixes (high impact first)

Scoring Guidance:
- 80-100: Excellent match, ready for submission.
- 60-79: Good match, needs minor tweaks.
- 40-59: Moderate match, requires significant optimization.
- 0-39: Poor match or major gaps. Only give 0 if the CV is for a completely different field.

Be constructive, specific, and helpful. Avoid generic advice. Every analysis MUST be unique and deeply tailored to the specific text provided.

IMPORTANT: Return ONLY the JSON object, no additional text or markdown formatting.`;

/**
 * Builds the user prompt with CV and job details
 */
function buildAnalysisPrompt(
    cvText: string,
    jobDescription: string,
    jobTitle: string,
    company: string
): string {
    return `Analyze this CV for the following job position:

**Job Title:** ${jobTitle}
**Company:** ${company}

**Job Description:**
${jobDescription}

---

**Candidate's CV:**
${cvText}

---

Provide a comprehensive ATS-focused analysis comparing the CV to the job requirements.
Identify missing keywords, structural issues, and prioritize the most impactful improvements.

Return your analysis as valid JSON following the specified structure.
Request ID: ${Date.now()}`;
}

/**
 * Validates the AI response structure
 */
function validateAnalysisResult(result: any): asserts result is AnalysisResult {
    if (typeof result.overall_match_score !== 'number') {
        throw new Error('Invalid analysis result: missing overall_match_score');
    }

    if (typeof result.potential_score !== 'number') {
        throw new Error('Invalid analysis result: missing potential_score');
    }

    if (result.overall_match_score < 0 || result.overall_match_score > 100) {
        throw new Error('Invalid match score: must be between 0 and 100');
    }

    if (!result.summary || typeof result.summary !== 'string') {
        throw new Error('Invalid analysis result: missing summary');
    }

    if (!Array.isArray(result.missing_keywords)) {
        throw new Error('Invalid analysis result: missing_keywords must be an array');
    }

    if (!result.section_feedback || typeof result.section_feedback !== 'object') {
        throw new Error('Invalid analysis result: missing section_feedback');
    }

    const requiredSections = ['summary', 'skills', 'experience', 'education', 'formatting'];
    for (const section of requiredSections) {
        if (!result.section_feedback[section]) {
            throw new Error(`Invalid analysis result: missing section_feedback.${section}`);
        }
    }

    if (!Array.isArray(result.priority_actions)) {
        throw new Error('Invalid analysis result: priority_actions must be an array');
    }

    if (!Array.isArray(result.ats_tips)) {
        throw new Error('Invalid analysis result: ats_tips must be an array');
    }
}
