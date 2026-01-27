'use client';

import { Globe, FileText, BarChart3 } from 'lucide-react';

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-20 md:py-32 relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12 md:mb-20">
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 tracking-tighter font-heading">Three Steps to <span className="emerald-gradient-text">Clarity.</span></h2>
                    <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-medium">From uncertainty to a professional, optimized CV in minutes.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-12 relative">
                    <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    {[
                        { step: "01", title: "Paste the Job", desc: "Drop any LinkedIn job URL. Our AI extracts the hidden requirements.", icon: Globe },
                        { step: "02", title: "Upload your CV", desc: "Text or PDF. We analyze your experience against the specific role.", icon: FileText },
                        { step: "03", title: "Get the Report", desc: "Receive a detailed verdict, match score, and an optimization plan.", icon: BarChart3 }
                    ].map((item, i) => (
                        <div key={i} className="relative flex flex-col items-center text-center group">
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-surface border border-white/10 flex items-center justify-center mb-6 md:mb-8 z-10 shadow-2xl group-hover:border-emerald-500/30 transition-colors relative">
                                <item.icon className="w-8 h-8 md:w-10 md:h-10 text-white/40 group-hover:text-emerald-400 transition-colors" />
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 md:-top-2 md:left-auto md:-right-2 w-7 h-7 md:w-8 md:h-8 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] md:text-xs font-black text-black">
                                    {item.step}
                                </div>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 font-heading">{item.title}</h3>
                            <p className="text-sm md:text-base text-white/50 leading-relaxed font-medium max-w-[280px]">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
