import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { analyses, analysisSections } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import ResultsView from '@/components/ResultsView';

interface ResultsPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ResultsPage({ params }: ResultsPageProps) {
    const { id } = await params;

    const analysis = await db.query.analyses.findFirst({
        where: eq(analyses.id, id),
    });

    if (!analysis) {
        notFound();
    }

    const sections = await db.query.analysisSections.findMany({
        where: eq(analysisSections.analysisId, id),
        orderBy: [desc(analysisSections.priority)],
    });

    return <ResultsView analysis={analysis} sectionFeedback={sections} />;
}
