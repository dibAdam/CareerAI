import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import ResultsView from '@/components/ResultsView';

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

    return <ResultsView analysis={analysis} sectionFeedback={sectionFeedback} />;
}
