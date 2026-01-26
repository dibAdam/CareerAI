import { notFound } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import MatchScore from '@/components/MatchScore';
import SectionFeedback from '@/components/SectionFeedback';
import ReportCard from '@/components/ReportCard';

interface ResultsPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ResultsPage({ params }: ResultsPageProps) {
    const { id } = await params;

    const { data: analysis, error: analysisError } = await supabase
        .from('analyses')
        .select('*')
        .eq('id', id)
        .single();

    if (analysisError || !analysis) {
        notFound();
    }

    const { data: sections } = await supabase
        .from('analysis_sections')
        .select('*')
        .eq('analysis_id', id)
        .order('priority', { ascending: false });

    const sectionFeedback = sections || [];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Universal Header */}
            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/landing" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
                                <span className="text-white font-bold text-sm">CV</span>
                            </div>
                            <span className="text-lg font-semibold text-gray-900">ATS Optimizer</span>
                        </Link>
                        <Link
                            href="/analyze"
                            className="px-5 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                            New Analysis
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Page Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-6 py-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Analysis Results</h1>
                    <p className="text-gray-600">
                        {analysis.job_title} at {analysis.company}
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-6 py-12">
                <div className="space-y-8">
                    {/* Match Score */}
                    <MatchScore score={analysis.match_score || 0} />

                    {/* Summary */}
                    {analysis.summary && (
                        <div className="bg-white rounded-xl border border-gray-200 p-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Summary</h2>
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
                    <div className="p-4 rounded-lg bg-gray-100 border border-gray-200">
                        <p className="text-xs text-gray-600 text-center leading-relaxed">
                            <strong>Disclaimer:</strong> This analysis provides optimization guidance based on
                            AI-generated suggestions. It does not guarantee job offers or ATS acceptance.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
