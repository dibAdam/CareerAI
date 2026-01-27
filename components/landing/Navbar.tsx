'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    // Close menu on resize if it's open
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setIsOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Prevent scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const navLinks = [
        { href: "#problem", label: "The Problem", description: "Why traditional CVs fail today" },
        { href: "#solution", label: "Solution", description: "AI-powered optimization engine" },
        { href: "#how-it-works", label: "Process", description: "How we transform your career" },
        { href: "#features", label: "Features", description: "Advanced tools for your success" },
    ];

    return (
        <nav className="fixed top-0 w-full z-[100] border-b border-white/5 bg-black">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <motion.div
                    animate={{ opacity: 1 }}
                    className="z-[1100]"
                >
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform duration-500 shadow-lg shadow-emerald-500/20">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight font-heading">Career AI</span>
                    </Link>
                </motion.div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-white/60 hover:text-white transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <Link
                        href="/analyze"
                        className="hidden sm:block px-6 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg shadow-white/10"
                    >
                        Analyze My CV
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 text-white/60 hover:text-white md:hidden z-[1100]"
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                        className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-3xl md:hidden flex flex-col"
                    >
                        {/* Mobile Header Context */}
                        {/* <div className="h-20 px-6 flex items-center justify-between border-b border-white/5">
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="flex items-center gap-2"
                            >
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                                <span className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">Engine: Active</span>
                            </motion.div>
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.15 }}
                                className="text-[10px] font-bold tracking-[0.2em] text-white/20 uppercase"
                            >
                                AI-powered career analysis
                            </motion.span>
                        </div> */}

                        <div className="flex-1 flex flex-col justify-center px-8">
                            <div className="space-y-1 mb-10">
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-[10px] font-bold tracking-[0.2em] text-white/20 uppercase"
                                >
                                    — Navigation
                                </motion.span>
                            </div>

                            <div className="flex flex-col gap-10">
                                {navLinks.map((link, i) => {
                                    const isPrimary = link.label === "Process";
                                    return (
                                        <motion.div
                                            key={link.href}
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={() => setIsOpen(false)}
                                                className="group flex flex-col gap-1.5 relative"
                                            >
                                                <span className={`text-3xl font-bold font-heading transition-all duration-300 flex items-center gap-3 ${isPrimary ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                                                    {link.label}
                                                    {isPrimary && (
                                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 uppercase tracking-widest font-bold">
                                                            Start Here
                                                        </span>
                                                    )}
                                                    <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-emerald-500" />
                                                </span>
                                                <span className="text-sm text-white/40 font-medium group-hover:text-white/60 transition-colors">{link.description}</span>

                                                {isPrimary && (
                                                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald-500 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.5)]" />
                                                )}
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="p-8 space-y-8 relative">
                            {/* Separation Line */}
                            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

                            <div className="space-y-4">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="relative group"
                                >
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-pulse" />
                                    <Link
                                        href="/analyze"
                                        onClick={() => setIsOpen(false)}
                                        className="relative w-full py-5 bg-white text-black text-center text-lg font-bold rounded-2xl flex items-center justify-center gap-3 shadow-2xl active:scale-[0.98] transition-transform"
                                    >
                                        Begin AI Optimization
                                        <Sparkles className="w-5 h-5" />
                                    </Link>
                                </motion.div>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="text-center text-[10px] font-bold tracking-widest text-white/20 uppercase"
                                >
                                    No signup required · Private & secure
                                </motion.p>
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                className="flex flex-col items-center gap-1"
                            >
                                <button className="group flex items-center gap-2 text-white/40 hover:text-white text-sm font-medium transition-colors">
                                    View a sample AI report
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <span className="text-[10px] text-white/20 font-medium">See what you&apos;ll get</span>
                            </motion.div>
                        </div>

                        {/* Background Decoration */}
                        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.05),transparent_50%)] pointer-events-none" />
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
