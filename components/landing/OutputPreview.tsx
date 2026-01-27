'use client';

export default function OutputPreview() {
    return (
        <section className="py-20 md:py-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
                    <div className="w-full lg:w-1/2">
                        <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 md:mb-8 tracking-tighter font-heading">Professional Insights, <br /><span className="text-white/40">Not Generic Advice.</span></h2>
                        <div className="space-y-6">
                            <div className="p-4 md:p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                                <p className="text-emerald-400 font-medium italic text-sm md:text-base">
                                    &quot;Your experience in React is strong, but the job emphasizes System Design. Add your &apos;Scalability&apos; project to the top of your Experience section to increase your score by 15%.&quot;
                                </p>
                            </div>
                            <p className="text-lg md:text-xl text-white/60 leading-relaxed font-medium">
                                Get clear, structured, and professional AI feedback that actually makes sense.
                                No more guessing what &quot;optimization&quot; means.
                            </p>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <div className="glass-card overflow-hidden shadow-2xl border-white/10">
                            <div className="h-10 md:h-12 border-b border-white/5 bg-white/5 flex items-center px-4 md:px-6 justify-between">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/20" />
                                    <div className="w-3 h-3 rounded-full bg-amber-500/20" />
                                    <div className="w-3 h-3 rounded-full bg-emerald-500/20" />
                                </div>
                                <div className="text-[8px] md:text-[10px] font-bold tracking-widest uppercase text-white/20">Analysis Report #8241</div>
                            </div>
                            <div className="p-6 md:p-8 space-y-6 md:space-y-8">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div>
                                        <h4 className="text-xl md:text-2xl font-bold font-heading">Senior Frontend Engineer</h4>
                                        <p className="text-xs md:text-sm text-white/40">Meta • Menlo Park, CA</p>
                                    </div>
                                    <div className="px-3 md:px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] md:text-xs font-bold tracking-widest uppercase">
                                        Strong Match
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                                    {[
                                        { label: "Skills", score: "92%" },
                                        { label: "Experience", score: "88%" },
                                        { label: "ATS", score: "100%" }
                                    ].map((stat, i) => (
                                        <div key={i} className="p-3 md:p-4 rounded-xl bg-white/5 border border-white/5 text-center flex sm:flex-col items-center justify-between sm:justify-center gap-2">
                                            <div className="text-base md:text-lg font-bold font-heading">{stat.score}</div>
                                            <div className="text-[8px] md:text-[10px] font-bold tracking-widest uppercase text-white/40">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-4">
                                    <div className="h-px bg-white/5" />
                                    <div className="space-y-2">
                                        <div className="h-3 md:h-4 w-24 md:w-32 bg-white/10 rounded-full" />
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
