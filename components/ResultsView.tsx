'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    Sparkles,
    ArrowLeft,
    Download,
    Share2,
    Plus,
    Briefcase,
    Building2,
    Calendar,
    AlertCircle
} from 'lucide-react';
import MatchScore from '@/components/MatchScore';
import SectionFeedback from '@/components/SectionFeedback';
import ReportCard from '@/components/ReportCard';
import { cn } from '@/lib/utils';

interface ResultsViewProps {
    analysis: any;
    sectionFeedback: any[];
}

export default function ResultsView({ analysis, sectionFeedback }: ResultsViewProps) {
    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-white/20">
            {/* Header */}
            <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#050505]/50 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/landing" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform duration-500">
                            <Sparkles className="w-6 h-6 text-black" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">CareerAI</span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold tracking-widest uppercase text-white/60 hover:text-white transition-all">
                            <Download className="w-4 h-4" />
                            Export PDF
                        </button>
                        <Link
                            href="/analyze"
                            className="flex items-center gap-2 px-6 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                        >
                            <Plus className="w-4 h-4" />
                            New Analysis
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="pt-32 pb-20 px-6">
                <div className="max-w-[85%] mx-auto">
                    {/* Hero Header */}
                    <div className="mb-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2 text-[10px] font-black tracking-[0.3em] uppercase text-white/20 mb-4"
                        >
                            <Calendar className="w-3 h-3" />
                            Analysis Completed • {new Date(analysis.created_at).toLocaleDateString()}
                        </motion.div>

                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">
                                    Analysis <span className="premium-gradient-text">Report</span>
                                </h1>
                                <div className="flex flex-wrap items-center gap-6">
                                    <div className="flex items-center gap-2 text-white/60 font-medium">
                                        <Briefcase className="w-4 h-4 text-blue-400" />
                                        {analysis.job_title}
                                    </div>
                                    <div className="flex items-center gap-2 text-white/60 font-medium">
                                        <Building2 className="w-4 h-4 text-purple-400" />
                                        {analysis.company}
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex gap-3"
                            >
                                <button className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white transition-colors">
                                    <Share2 className="w-5 h-5" />
                                </button>
                                <button className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white transition-colors md:hidden">
                                    <Download className="w-5 h-5" />
                                </button>
                            </motion.div>
                        </div>
                    </div>

                    {/* Dashboard Grid */}
                    <div className="grid lg:grid-cols-4 gap-8">
                        {/* Left Column - Score & Summary */}
                        <div className="lg:col-span-3 space-y-8">
                            <MatchScore score={analysis.match_score || 0} />

                            {analysis.summary && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="glass-card p-10"
                                >
                                    <h2 className="text-2xl font-bold mb-6 tracking-tight">Executive Summary</h2>
                                    <p className="text-white/60 leading-relaxed font-medium text-lg">
                                        {analysis.summary}
                                    </p>
                                </motion.div>
                            )}

                            {analysis.missing_keywords && analysis.missing_keywords.length > 0 && (
                                <ReportCard
                                    title="Missing Keywords"
                                    items={analysis.missing_keywords}
                                    variant="info"
                                />
                            )}

                            <SectionFeedback sections={sectionFeedback} />
                        </div>

                        {/* Right Column - Insights */}
                        <div className="space-y-8">
                            {analysis.priority_actions && analysis.priority_actions.length > 0 && (
                                <ReportCard
                                    title="Priority Actions"
                                    items={analysis.priority_actions}
                                    variant="warning"
                                />
                            )}

                            {analysis.ats_tips && analysis.ats_tips.length > 0 && (
                                <ReportCard
                                    title="ATS Optimization"
                                    items={analysis.ats_tips}
                                    variant="success"
                                />
                            )}

                            {/* Disclaimer */}
                            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-4 h-4 text-white/20 flex-shrink-0 mt-0.5" />
                                    <p className="text-[10px] text-white/20 leading-relaxed font-bold tracking-widest uppercase">
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
