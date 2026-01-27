'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, FileText, Globe } from 'lucide-react';

export default function Hero() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const scale = useTransform(scrollY, [0, 300], [1, 0.9]);

    return (
        <section className="relative pt-40 pb-20 overflow-hidden min-h-screen flex flex-col items-center justify-center">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-600/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amethyst-600/10 blur-[120px] rounded-full animate-pulse delay-1000" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
            </div>

            <motion.div
                style={{ opacity, scale }}
                className="relative z-10 max-w-5xl mx-auto px-6 text-center"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
                >
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold tracking-widest uppercase text-white/60">Precision AI Analysis</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tighter font-heading"
                >
                    Stop Guessing. <br />
                    <span className="emerald-gradient-text">Start Interviewing.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-xl md:text-2xl text-white/60 mb-12 max-w-3xl mx-auto leading-relaxed font-medium"
                >
                    Career AI bridges the gap between your CV and the job description.
                    Beat ATS filters and align your experience with recruiter expectations
                    using precision AI analysis.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                >
                    <Link href="/analyze" className="luxury-button-emerald group flex items-center gap-2">
                        Analyze My CV
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <button className="luxury-button-secondary flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                            <Play className="w-3 h-3 fill-white" />
                        </div>
                        See How It Works
                    </button>
                </motion.div>
            </motion.div>

            {/* Hero UI Mockup */}
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                style={{ y: y1 }}
                className="relative z-10 mt-24 w-full max-w-6xl mx-auto px-6"
            >
                <div className="relative glass-card p-4 md:p-8 overflow-hidden border-white/10 shadow-2xl bg-surface/50">
                    <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                        <div className="w-full md:w-1/2 space-y-4">
                            <div className="h-4 w-32 bg-white/10 rounded-full animate-pulse" />
                            <div className="h-8 w-full bg-white/5 rounded-xl" />
                            <div className="h-8 w-3/4 bg-white/5 rounded-xl" />
                            <div className="pt-4 flex gap-4">
                                <div className="h-12 w-12 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                                    <FileText className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div className="space-y-2 flex-1">
                                    <div className="h-4 w-24 bg-white/10 rounded-full" />
                                    <div className="h-3 w-full bg-white/5 rounded-full" />
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:flex flex-col items-center justify-center relative">
                            <div className="w-32 h-32 rounded-full border-4 border-emerald-500/20 flex items-center justify-center relative">
                                <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />
                                <span className="text-3xl font-black font-heading">94%</span>
                            </div>
                            <span className="mt-4 text-xs font-bold tracking-widest uppercase text-emerald-400">Match Score</span>
                        </div>
                        <div className="w-full md:w-1/2 space-y-4">
                            <div className="h-4 w-32 bg-white/10 rounded-full animate-pulse" />
                            <div className="h-8 w-full bg-white/5 rounded-xl" />
                            <div className="h-8 w-3/4 bg-white/5 rounded-xl" />
                            <div className="pt-4 flex gap-4">
                                <div className="h-12 w-12 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                                    <Globe className="w-6 h-6 text-cyan-400" />
                                </div>
                                <div className="space-y-2 flex-1">
                                    <div className="h-4 w-24 bg-white/10 rounded-full" />
                                    <div className="h-3 w-full bg-white/5 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Scanning Beam */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent w-1/2 h-full -skew-x-12 animate-[scan_3s_linear_infinite]" />
                </div>
            </motion.div>
            <style jsx global>{`
                @keyframes scan {
                    from { transform: translateX(-100%) skewX(-12deg); }
                    to { transform: translateX(200%) skewX(-12deg); }
                }
            `}</style>
        </section>
    );
}
