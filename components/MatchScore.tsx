'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Target, TrendingUp, AlertCircle } from 'lucide-react';

interface MatchScoreProps {
    score: number;
}

export default function MatchScore({ score }: MatchScoreProps) {
    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-400';
        if (score >= 60) return 'text-yellow-400';
        if (score >= 40) return 'text-orange-400';
        return 'text-red-400';
    };

    const getScoreGlow = (score: number) => {
        if (score >= 80) return 'shadow-[0_0_30px_rgba(74,222,128,0.2)]';
        if (score >= 60) return 'shadow-[0_0_30px_rgba(250,204,21,0.2)]';
        if (score >= 40) return 'shadow-[0_0_30px_rgba(251,146,60,0.2)]';
        return 'shadow-[0_0_30px_rgba(248,113,113,0.2)]';
    };

    const getScoreLabel = (score: number) => {
        if (score >= 80) return 'Elite Match';
        if (score >= 60) return 'Strong Candidate';
        if (score >= 40) return 'Moderate Alignment';
        return 'Significant Gaps';
    };

    const getProgressColor = (score: number) => {
        if (score >= 80) return 'from-green-500 to-emerald-400';
        if (score >= 60) return 'from-yellow-500 to-amber-400';
        if (score >= 40) return 'from-orange-500 to-orange-400';
        return 'from-red-500 to-rose-400';
    };

    return (
        <div className="glass-card p-10 relative overflow-hidden group">
            {/* Background Glow */}
            <div className={cn(
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 blur-[100px] opacity-20 transition-all duration-1000",
                score >= 80 ? "bg-green-500" : score >= 60 ? "bg-yellow-500" : "bg-red-500"
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
                                score >= 80 ? "text-green-400" : score >= 60 ? "text-yellow-400" : "text-red-400"
                            )}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.span
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className={cn("text-6xl font-black tracking-tighter", getScoreColor(score))}
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
                    <h2 className="text-4xl font-black mb-2 tracking-tighter">
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
                                <TrendingUp className="w-3 h-3 text-blue-400" />
                                <span className="text-[10px] font-black tracking-widest uppercase text-white/20">Potential</span>
                            </div>
                            <div className="text-xl font-bold">+{Math.min(100 - score, 15)}%</div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                            <div className="flex items-center gap-2 mb-1">
                                <AlertCircle className="w-3 h-3 text-purple-400" />
                                <span className="text-[10px] font-black tracking-widest uppercase text-white/20">Risk Level</span>
                            </div>
                            <div className="text-xl font-bold">{score >= 80 ? "Low" : score >= 60 ? "Medium" : "High"}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
