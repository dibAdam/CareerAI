'use client';

import { AlertCircle, Clock, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Problem() {
    return (
        <section id="problem" className="py-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter font-heading">
                        Why 75% of Qualified Candidates <br />
                        <span className="text-white/40">Never Get a Call.</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
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
                        <div key={i} className="glass-card p-10 group hover:bg-white/[0.05] transition-colors">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                <item.icon className={cn("w-7 h-7",
                                    item.color === "red" ? "text-red-400" :
                                        item.color === "orange" ? "text-orange-400" : "text-slate-400"
                                )} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 font-heading">{item.title}</h3>
                            <p className="text-white/50 leading-relaxed font-medium">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
