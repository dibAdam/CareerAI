'use client';

import { CheckCircle2, MousePointer2 } from 'lucide-react';

export default function Solution() {
    return (
        <section id="solution" className="py-32 bg-surface/50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-20">
                    <div className="w-full md:w-1/2">
                        <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter font-heading">
                            Your Unfair <br />
                            <span className="emerald-gradient-text">Advantage.</span>
                        </h2>
                        <p className="text-xl text-white/60 mb-8 leading-relaxed font-medium">
                            We don&apos;t just scan your CV; we strategize it. Career AI reverse-engineers
                            the job offer to tell you exactly what a recruiter is looking for.
                        </p>
                        <ul className="space-y-4">
                            {[
                                "Reverse-engineered job requirements",
                                "Context-aware skill mapping",
                                "Recruiter-focused optimization",
                                "Instant ATS compatibility check"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-white/80 font-medium">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="relative glass-card p-2 overflow-hidden aspect-square md:aspect-video">
                            <div className="absolute inset-0 flex">
                                <div className="w-1/2 h-full bg-red-500/5 border-r border-white/10 p-6 flex flex-col justify-center">
                                    <span className="text-[10px] font-bold tracking-widest uppercase text-red-400 mb-4">Before</span>
                                    <div className="space-y-3 opacity-40">
                                        <div className="h-2 w-full bg-white/20 rounded-full" />
                                        <div className="h-2 w-3/4 bg-white/20 rounded-full" />
                                        <div className="h-2 w-5/6 bg-white/20 rounded-full" />
                                        <div className="h-2 w-1/2 bg-white/20 rounded-full" />
                                    </div>
                                    <div className="mt-8 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                                        <span className="text-xs font-bold text-red-400">Low ATS Score</span>
                                    </div>
                                </div>
                                <div className="w-1/2 h-full bg-emerald-500/5 p-6 flex flex-col justify-center">
                                    <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-400 mb-4">After</span>
                                    <div className="space-y-3">
                                        <div className="h-2 w-full bg-emerald-500/40 rounded-full" />
                                        <div className="h-2 w-3/4 bg-emerald-500/40 rounded-full" />
                                        <div className="h-2 w-5/6 bg-emerald-500/40 rounded-full" />
                                        <div className="h-2 w-1/2 bg-emerald-500/40 rounded-full" />
                                    </div>
                                    <div className="mt-8 p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                                        <span className="text-xs font-bold text-emerald-400">94% Match</span>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-xl z-10">
                                <MousePointer2 className="w-4 h-4 text-black" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
