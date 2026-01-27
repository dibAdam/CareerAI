'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function FinalCTA() {
    return (
        <section className="py-40 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-emerald-600/10 blur-[150px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter font-heading">
                    Stop Applying. <br />
                    <span className="emerald-gradient-text">Start Getting Hired.</span>
                </h2>
                <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                    Join thousands of professionals who have turned "No Response" into
                    "When can you interview?"
                </p>
                <div className="flex flex-col items-center gap-6">
                    <Link href="/analyze" className="luxury-button-emerald px-12 py-5 text-lg group flex items-center gap-3 animate-pulse hover:animate-none">
                        Optimize My CV Now
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <p className="text-sm font-bold tracking-widest uppercase text-white/40">
                        No credit card required for your first scan.
                    </p>
                </div>
            </div>
        </section>
    );
}
