'use client';

import { BarChart3, ShieldCheck, Layers } from 'lucide-react';

export default function Trust() {
    return (
        <section className="py-20 md:py-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="glass-card p-8 md:p-20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-emerald-500/5 blur-[80px] md:blur-[100px] rounded-full" />
                    <div className="relative z-10 max-w-3xl">
                        <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 md:mb-8 tracking-tighter font-heading">Designed by <br />Hiring Experts.</h2>
                        <p className="text-lg md:text-xl text-white/60 mb-8 md:mb-12 leading-relaxed font-medium">
                            Our AI is trained on thousands of successful hiring patterns and real-world
                            recruiter feedback. We don&apos;t use generic templates; we use logic.
                        </p>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-6 md:gap-8">
                            {[
                                { label: "Data-Driven", icon: BarChart3 },
                                { label: "Privacy First", icon: ShieldCheck },
                                { label: "ATS Optimized", icon: Layers }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <item.icon className="w-5 h-5 text-emerald-400" />
                                    <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-white/40">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
