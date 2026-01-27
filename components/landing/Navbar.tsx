'use client';

import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-[100] border-b border-white/5 bg-[#0A0A0B]/50 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform duration-500 shadow-lg shadow-emerald-500/20">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight font-heading">Career AI</span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <Link href="#problem" className="text-sm font-medium text-white/60 hover:text-white transition-colors">The Problem</Link>
                    <Link href="#solution" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Solution</Link>
                    <Link href="#how-it-works" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Process</Link>
                    <Link href="#features" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Features</Link>
                </div>

                <Link
                    href="/analyze"
                    className="px-6 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg shadow-white/10"
                >
                    Analyze My CV
                </Link>
            </div>
        </nav>
    );
}
