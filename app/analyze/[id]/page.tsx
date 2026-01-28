import { notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/db';
import { analyses, analysisSections } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
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

    // Fetch analysis from database using Drizzle
    const analysis = await db.query.analyses.findFirst({
        where: eq(analyses.id, id),
    });

    if (!analysis) {
        notFound();
    }

    // Fetch section feedback using Drizzle
    const sections = await db.query.analysisSections.findMany({
        where: eq(analysisSections.analysisId, id),
        orderBy: [desc(analysisSections.priority)],
    });

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
                                {analysis.jobTitle} at {analysis.company}
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
                    <MatchScore score={analysis.matchScore || 0} />

                    {/* Summary */}
                    {analysis.summary && (
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Summary</h2>
                            <p className="text-gray-700 leading-relaxed">{analysis.summary}</p>
                        </div>
                    )}

                    {/* Priority Actions */}
                    {analysis.priorityActions && analysis.priorityActions.length > 0 && (
                        <ReportCard
                            title="Priority Actions"
                            items={analysis.priorityActions}
                            variant="warning"
                        />
                    )}

                    {/* Missing Keywords */}
                    {analysis.missingKeywords && analysis.missingKeywords.length > 0 && (
                        <ReportCard
                            title="Missing Keywords"
                            items={analysis.missingKeywords}
                            variant="info"
                        />
                    )}

                    {/* Section Feedback */}
                    {sectionFeedback.length > 0 && <SectionFeedback sections={sectionFeedback} />}

                    {/* ATS Tips */}
                    {analysis.atsTips && analysis.atsTips.length > 0 && (
                        <ReportCard
                            title="ATS Optimization Tips"
                            items={analysis.atsTips}
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
