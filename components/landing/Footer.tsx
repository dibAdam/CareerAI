'use client';

import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="py-20 border-t border-white/5 bg-[#0A0A0B]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-lg font-bold tracking-tight font-heading">Career AI</span>
                    </div>

                    <div className="flex gap-12">
                        <Link href="#" className="text-xs font-bold tracking-widest uppercase text-white/40 hover:text-white transition-colors">Privacy</Link>
                        <Link href="#" className="text-xs font-bold tracking-widest uppercase text-white/40 hover:text-white transition-colors">Terms</Link>
                        <Link href="#" className="text-xs font-bold tracking-widest uppercase text-white/40 hover:text-white transition-colors">Contact</Link>
                    </div>

                    <p className="text-xs font-bold tracking-widest uppercase text-white/20">
                        © 2026 Career AI. The Science of the Perfect Match.
                    </p>
                </div>
            </div>
        </footer>
    );
}
