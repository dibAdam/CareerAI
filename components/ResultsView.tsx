'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    ArrowLeft,
    Download,
    Share2,
    Plus,
    Briefcase,
    Building2,
    Calendar,
    AlertCircle,
    FileText,
    ShieldCheck
} from 'lucide-react';
import Image from 'next/image';
import MatchScore from '@/components/MatchScore';
import SectionFeedback from '@/components/SectionFeedback';
import ReportCard from '@/components/ReportCard';
import { cn } from '@/lib/utils';
import { exportToPDF } from '@/lib/exportPdf';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface ResultsViewProps {
    analysis: any;
    sectionFeedback: any[];
}

export default function ResultsView({ analysis, sectionFeedback }: ResultsViewProps) {
    const [isExporting, setIsExporting] = useState(false);

    // Defensive mapping to handle both camelCase (Drizzle) and snake_case (Raw DB/AI)
    const matchScore = analysis.matchScore ?? analysis.match_score ?? 0;
    const potentialScore = analysis.potentialScore ?? analysis.potential_score ?? 0;
    const summary = analysis.summary;
    const missingKeywords = analysis.missingKeywords ?? analysis.missing_keywords ?? [];
    const priorityActions = analysis.priorityActions ?? analysis.priority_actions ?? [];
    const atsTips = analysis.atsTips ?? analysis.ats_tips ?? [];
    const jobTitle = analysis.jobTitle ?? analysis.job_title ?? 'Job Position';
    const company = analysis.company ?? 'Company';
    const createdAt = analysis.createdAt ?? analysis.created_at;

    const handleExport = async () => {
        try {
            setIsExporting(true);
            await exportToPDF({
                jobTitle,
                company,
                matchScore,
                potentialScore,
                summary,
                missingKeywords,
                priorityActions,
                atsTips,
                createdAt: createdAt?.toString()
            }, sectionFeedback);
        } catch (error) {
            console.error('Export failed:', error);
            // Fallback to print
            window.print();
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0A0B] text-white selection:bg-emerald-500/30 font-sans">
            {/* Header */}
            <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0A0A0B] backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 md:gap-3 group">
                        <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center group-hover:rotate-6 transition-transform duration-500">
                            <Image
                                src="/logo2.png"
                                alt="Nextrova Logo"
                                width={40}
                                height={40}
                                className="object-contain"
                            />
                        </div>
                        <span className="text-lg md:text-xl font-bold tracking-tight font-heading">Nextrova</span>
                    </Link>

                    <div className="flex items-center gap-2 md:gap-4">
                        <button
                            onClick={handleExport}
                            disabled={isExporting}
                            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold tracking-widest uppercase text-white/40 hover:text-white transition-all disabled:opacity-50"
                        >
                            {isExporting ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Download className="w-4 h-4" />
                            )}
                            {isExporting ? 'Generating...' : 'Export PDF'}
                        </button>
                        <Link
                            href="/analyze"
                            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-2.5 bg-white text-black text-xs md:text-sm font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg shadow-white/10"
                        >
                            <Plus className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            <span className="hidden sm:inline">New Analysis</span>
                            <span className="sm:hidden">New</span>
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="pt-24 md:pt-32 pb-20 px-4 md:px-6">
                <div className="max-w-7xl lg:max-w-[80%] mx-auto">
                    {/* Hero Header */}
                    <div className="mb-8 md:mb-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2 text-[8px] md:text-[10px] font-black tracking-[0.3em] uppercase text-white/20 mb-4"
                        >
                            <Calendar className="w-3 h-3" />
                            Analysis Completed • {createdAt ? new Date(createdAt).toLocaleDateString() : 'Recent'}
                        </motion.div>

                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <h1 className="text-3xl md:text-6xl font-black mb-4 tracking-tighter font-heading">
                                    Analysis <span className="emerald-gradient-text">Report</span>
                                </h1>
                                <div className="flex flex-wrap items-center gap-4 md:gap-6">
                                    <div className="flex items-center gap-2 text-sm md:text-base text-white/60 font-medium">
                                        <Briefcase className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                        {jobTitle}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm md:text-base text-white/60 font-medium">
                                        <Building2 className="w-4 h-4 text-amethyst-400 flex-shrink-0" />
                                        {analysis.company}
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex gap-2 md:gap-3"
                            >
                                <button className="p-2.5 md:p-3 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white transition-colors">
                                    <Share2 className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={handleExport}
                                    disabled={isExporting}
                                    className="p-2.5 md:p-3 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white transition-colors md:hidden disabled:opacity-50"
                                >
                                    {isExporting ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <Download className="w-5 h-5" />
                                    )}
                                </button>
                            </motion.div>
                        </div>
                    </div>

                    {/* Dashboard Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
                        {/* Left Column - Score & Summary */}
                        <div className="lg:col-span-3 space-y-6 md:space-y-8">
                            <MatchScore
                                score={matchScore}
                                potentialScore={potentialScore}
                            />

                            {summary && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="glass-card p-6 md:p-10 bg-surface/50"
                                >
                                    <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 tracking-tight font-heading">Executive Summary</h2>
                                    <p className="text-white/60 leading-relaxed font-medium text-base md:text-lg">
                                        {summary}
                                    </p>
                                </motion.div>
                            )}

                            {missingKeywords && missingKeywords.length > 0 && (
                                <ReportCard
                                    title="Missing Keywords"
                                    items={missingKeywords}
                                    variant="info"
                                />
                            )}

                            <SectionFeedback sections={sectionFeedback} />
                        </div>

                        {/* Right Column - Insights */}
                        <div className="space-y-6 md:space-y-8">
                            {priorityActions && priorityActions.length > 0 && (
                                <ReportCard
                                    title="Priority Actions"
                                    items={priorityActions}
                                    variant="warning"
                                />
                            )}

                            {atsTips && atsTips.length > 0 && (
                                <ReportCard
                                    title="ATS Optimization"
                                    items={atsTips}
                                    variant="success"
                                />
                            )}

                            {/* Disclaimer */}
                            <div className="p-4 md:p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-4 h-4 text-white/20 flex-shrink-0 mt-0.5" />
                                    <p className="text-[8px] md:text-[10px] text-white/20 leading-relaxed font-bold tracking-widest uppercase">
                                        AI-generated guidance. Results may vary based on specific ATS configurations and recruiter preferences.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
