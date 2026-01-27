'use client';

import { UserPlus, Briefcase, GraduationCap, Globe } from 'lucide-react';

export default function WhoItsFor() {
    return (
        <section className="py-20 md:py-32 bg-surface/50">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-12 md:mb-20 tracking-tighter font-heading">Tailored for <span className="emerald-gradient-text">Success.</span></h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-8">
                    {[
                        { label: "Junior Developers", icon: UserPlus },
                        { label: "Senior Engineers", icon: Briefcase },
                        { label: "Career Switchers", icon: GraduationCap },
                        { label: "International", icon: Globe }
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center gap-4 group">
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-emerald-500/10 transition-colors">
                                <item.icon className="w-6 h-6 md:w-8 md:h-8 text-white/40 group-hover:text-emerald-400 transition-colors" />
                            </div>
                            <span className="text-xs md:text-base font-bold text-white/60 group-hover:text-white transition-colors">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
