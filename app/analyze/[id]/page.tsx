import { notFound } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import MatchScore from '@/components/MatchScore';
import SectionFeedback from '@/components/SectionFeedback';
import ReportCard from '@/components/ReportCard';

interface AnalyzePageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function AnalyzePage({ params }: AnalyzePageProps) {
    const { id } = await params;

    // Fetch analysis from database
    const { data: analysis, error: analysisError } = await supabase
        .from('analyses')
        .select('*')
        .eq('id', id)
        .single();

    if (analysisError || !analysis) {
        notFound();
    }

    // Fetch section feedback
    const { data: sections, error: sectionsError } = await supabase
        .from('analysis_sections')
        .select('*')
        .eq('analysis_id', id)
        .order('priority', { ascending: false });

    const sectionFeedback = sections || [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-6xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Analysis Results</h1>
                            <p className="text-gray-600 mt-1">
                                {analysis.job_title} at {analysis.company}
                            </p>
                        </div>
                        <Link
                            href="/"
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                        >
                            New Analysis
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 py-12">
                <div className="space-y-8">
                    {/* Match Score */}
                    <MatchScore score={analysis.match_score || 0} />

                    {/* Summary */}
                    {analysis.summary && (
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Summary</h2>
                            <p className="text-gray-700 leading-relaxed">{analysis.summary}</p>
                        </div>
                    )}

                    {/* Priority Actions */}
                    {analysis.priority_actions && analysis.priority_actions.length > 0 && (
                        <ReportCard
                            title="Priority Actions"
                            items={analysis.priority_actions}
                            variant="warning"
                        />
                    )}

                    {/* Missing Keywords */}
                    {analysis.missing_keywords && analysis.missing_keywords.length > 0 && (
                        <ReportCard
                            title="Missing Keywords"
                            items={analysis.missing_keywords}
                            variant="info"
                        />
                    )}

                    {/* Section Feedback */}
                    {sectionFeedback.length > 0 && <SectionFeedback sections={sectionFeedback} />}

                    {/* ATS Tips */}
                    {analysis.ats_tips && analysis.ats_tips.length > 0 && (
                        <ReportCard
                            title="ATS Optimization Tips"
                            items={analysis.ats_tips}
                            variant="success"
                        />
                    )}

                    {/* Disclaimer */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                        <p className="text-sm text-gray-600 text-center">
                            <strong>Disclaimer:</strong> This analysis provides optimization guidance based on
                            AI-generated suggestions. It does not guarantee job offers or ATS acceptance. Use
                            these recommendations as a starting point for improving your CV.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
