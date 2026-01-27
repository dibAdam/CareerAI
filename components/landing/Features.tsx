'use client';

import { Target, Search, ShieldCheck, Zap } from 'lucide-react';

export default function Features() {
    return (
        <section id="features" className="py-32 bg-surface/30">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-20">
                    <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter font-heading">The Engine Under <br /><span className="amethyst-gradient-text">The Hood.</span></h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { title: "Match Score", desc: "Proprietary algorithm weighing experience, seniority, and skill density.", icon: Target },
                        { title: "Keyword Gap", desc: "Instantly identify the specific industry terms missing from your profile.", icon: Search },
                        { title: "ATS Audit", desc: "Ensure your formatting and structure are readable by every major system.", icon: ShieldCheck },
                        { title: "Rewrite Suggestions", desc: "Get AI-generated bullet points tailored specifically to the job.", icon: Zap }
                    ].map((feature, i) => (
                        <div key={i} className="glass-card p-8 group hover:border-amethyst-500/30 transition-all">
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-amethyst-500/10 transition-colors">
                                <feature.icon className="w-6 h-6 text-white/40 group-hover:text-amethyst-400 transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 font-heading">{feature.title}</h3>
                            <p className="text-sm text-white/50 leading-relaxed font-medium">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
