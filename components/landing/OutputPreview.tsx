'use client';

export default function OutputPreview() {
    return (
        <section className="py-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-20 items-center">
                    <div className="w-full lg:w-1/2">
                        <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter font-heading">Professional Insights, <br /><span className="text-white/40">Not Generic Advice.</span></h2>
                        <div className="space-y-6">
                            <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                                <p className="text-emerald-400 font-medium italic">
                                    &quot;Your experience in React is strong, but the job emphasizes System Design. Add your &apos;Scalability&apos; project to the top of your Experience section to increase your score by 15%.&quot;
                                </p>
                            </div>
                            <p className="text-xl text-white/60 leading-relaxed font-medium">
                                Get clear, structured, and professional AI feedback that actually makes sense.
                                No more guessing what &quot;optimization&quot; means.
                            </p>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <div className="glass-card overflow-hidden shadow-2xl border-white/10">
                            <div className="h-12 border-b border-white/5 bg-white/5 flex items-center px-6 justify-between">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/20" />
                                    <div className="w-3 h-3 rounded-full bg-amber-500/20" />
                                    <div className="w-3 h-3 rounded-full bg-emerald-500/20" />
                                </div>
                                <div className="text-[10px] font-bold tracking-widest uppercase text-white/20">Analysis Report #8241</div>
                            </div>
                            <div className="p-8 space-y-8">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="text-2xl font-bold font-heading">Senior Frontend Engineer</h4>
                                        <p className="text-sm text-white/40">Meta • Menlo Park, CA</p>
                                    </div>
                                    <div className="px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-widest uppercase">
                                        Strong Match
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    {[
                                        { label: "Skills", score: "92%" },
                                        { label: "Experience", score: "88%" },
                                        { label: "ATS", score: "100%" }
                                    ].map((stat, i) => (
                                        <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                                            <div className="text-lg font-bold font-heading">{stat.score}</div>
                                            <div className="text-[10px] font-bold tracking-widest uppercase text-white/40">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-4">
                                    <div className="h-px bg-white/5" />
                                    <div className="space-y-2">
                                        <div className="h-4 w-32 bg-white/10 rounded-full" />
                                        <div className="h-3 w-full bg-white/5 rounded-full" />
                                        <div className="h-3 w-4/5 bg-white/5 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
