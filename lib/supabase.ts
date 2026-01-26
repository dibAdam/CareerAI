import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions for our database
export interface Analysis {
    id: string;
    user_id?: string;
    job_title: string;
    company?: string;
    job_description: string;
    cv_text: string;
    match_score?: number;
    summary?: string;
    missing_keywords?: string[];
    priority_actions?: string[];
    ats_tips?: string[];
    created_at: string;
}

export interface AnalysisSection {
    id: string;
    analysis_id: string;
    section: string;
    feedback: string;
    priority?: 'high' | 'medium' | 'low';
    created_at: string;
}
