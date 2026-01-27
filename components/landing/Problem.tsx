'use client';

import { AlertCircle, Clock, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Problem() {
    return (
        <section id="problem" className="py-20 md:py-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12 md:mb-20">
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 tracking-tighter font-heading">
                        Why 75% of Qualified Candidates <br />
                        <span className="text-white/40">Never Get a Call.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {[
                        {
                            title: "The ATS Barrier",
                            desc: "Applicant Tracking Systems discard brilliant resumes for simple keyword mismatches and formatting errors.",
                            icon: AlertCircle,
                            color: "red"
                        },
                        {
                            title: "The Recruiter’s 6 Seconds",
                            desc: "You have less than 10 seconds to prove you're a match. If the alignment isn't obvious, it's a rejection.",
                            icon: Clock,
                            color: "orange"
                        },
                        {
                            title: "The Silence",
                            desc: "Applying shouldn't feel like shouting into a void. Most candidates are rejected without ever knowing why.",
                            icon: Search,
                            color: "slate"
                        }
                    ].map((item, i) => (
                        <div key={i} className="glass-card p-8 md:p-10 group hover:bg-white/[0.05] transition-colors">
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 transition-transform">
                                <item.icon className={cn("w-6 h-6 md:w-7 md:h-7",
                                    item.color === "red" ? "text-red-400" :
                                        item.color === "orange" ? "text-orange-400" : "text-slate-400"
                                )} />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 font-heading">{item.title}</h3>
                            <p className="text-sm md:text-base text-white/50 leading-relaxed font-medium">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
