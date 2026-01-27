'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Target, TrendingUp, AlertCircle } from 'lucide-react';

interface MatchScoreProps {
    score: number;
}

export default function MatchScore({ score }: MatchScoreProps) {
    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-emerald-400';
        if (score >= 60) return 'text-cyan-400';
        if (score >= 40) return 'text-amethyst-400';
        return 'text-red-400';
    };

    const getScoreLabel = (score: number) => {
        if (score >= 80) return 'Elite Match';
        if (score >= 60) return 'Strong Candidate';
        if (score >= 40) return 'Moderate Alignment';
        return 'Significant Gaps';
    };

    return (
        <div className="glass-card p-10 relative overflow-hidden group bg-surface/50">
            {/* Background Glow */}
            <div className={cn(
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 blur-[100px] opacity-20 transition-all duration-1000",
                score >= 80 ? "bg-emerald-500" : score >= 60 ? "bg-cyan-500" : score >= 40 ? "bg-amethyst-500" : "bg-red-500"
            )} />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                {/* Circular Score */}
                <div className="relative w-48 h-48 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle
                            cx="96"
                            cy="96"
                            r="88"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="transparent"
                            className="text-white/5"
                        />
                        <motion.circle
                            cx="96"
                            cy="96"
                            r="88"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="transparent"
                            strokeDasharray={553}
                            initial={{ strokeDashoffset: 553 }}
                            animate={{ strokeDashoffset: 553 - (553 * score) / 100 }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            className={cn(
                                "transition-all duration-1000",
                                score >= 80 ? "text-emerald-400" : score >= 60 ? "text-cyan-400" : score >= 40 ? "text-amethyst-400" : "text-red-400"
                            )}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.span
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className={cn("text-6xl font-black tracking-tighter font-heading", getScoreColor(score))}
                        >
                            {score}
                        </motion.span>
                        <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white/20 mt-[-4px]">Percent</span>
                    </div>
                </div>

                {/* Info */}
                <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
                        <Target className="w-3 h-3 text-white/40" />
                        <span className="text-[10px] font-black tracking-widest uppercase text-white/40">Compatibility Index</span>
                    </div>
                    <h2 className="text-4xl font-black mb-2 tracking-tighter font-heading">
                        {getScoreLabel(score)}
                    </h2>
                    <p className="text-white/40 font-medium max-w-md leading-relaxed">
                        Our AI engine has analyzed your profile against the job requirements.
                        {score >= 80
                            ? " Your experience is exceptionally well-aligned with this role."
                            : score >= 60
                                ? " You have a strong foundation, but some key areas need optimization."
                                : " Significant adjustments are required to pass the initial ATS screening."}
                    </p>

                    {/* Mini Stats */}
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                            <div className="flex items-center gap-2 mb-1">
                                <TrendingUp className="w-3 h-3 text-emerald-400" />
                                <span className="text-[10px] font-black tracking-widest uppercase text-white/20">Potential</span>
                            </div>
                            <div className="text-xl font-bold font-heading">+{Math.min(100 - score, 15)}%</div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                            <div className="flex items-center gap-2 mb-1">
                                <AlertCircle className="w-3 h-3 text-amethyst-400" />
                                <span className="text-[10px] font-black tracking-widest uppercase text-white/20">Risk Level</span>
                            </div>
                            <div className="text-xl font-bold font-heading">{score >= 80 ? "Low" : score >= 60 ? "Medium" : "High"}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
