'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    ArrowRight,
    CheckCircle2,
    Sparkles,
    Target,
    Zap,
    ShieldCheck,
    BarChart3,
    ChevronRight,
    Play
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LandingPage() {
    const [mounted, setMounted] = useState(false);
    const { scrollY } = useScroll();

    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const scale = useTransform(scrollY, [0, 300], [1, 0.9]);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-white/20">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-[100] border-b border-white/5 bg-[#050505]/50 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform duration-500">
                            <Sparkles className="w-6 h-6 text-black" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">CareerAI</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <Link href="#features" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Features</Link>
                        <Link href="#how-it-works" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Process</Link>
                        <Link href="#results" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Results</Link>
                    </div>

                    <Link
                        href="/analyze"
                        className="px-6 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    >
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 overflow-hidden min-h-screen flex flex-col items-center justify-center">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full animate-pulse delay-1000" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
                </div>

                <motion.div
                    style={{ opacity, scale }}
                    className="relative z-10 max-w-5xl mx-auto px-6 text-center"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-xs font-bold tracking-widest uppercase text-white/60">Next-Gen AI Analysis</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tighter"
                    >
                        Master the <span className="premium-gradient-text">ATS Game</span> <br />
                        with Precision AI.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-white/60 mb-12 max-w-3xl mx-auto leading-relaxed font-medium"
                    >
                        Don't let algorithms hide your talent. Our elite AI engine dissects job descriptions
                        and optimizes your CV for maximum impact and interview rates.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                    >
                        <Link href="/analyze" className="luxury-button group flex items-center gap-2">
                            Start Free Analysis
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <button className="luxury-button-secondary flex items-center gap-2 group">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                <Play className="w-3 h-3 fill-white" />
                            </div>
                            Watch Demo
                        </button>
                    </motion.div>
                </motion.div>

                {/* Floating Dashboard Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                    style={{ y: y1 }}
                    className="relative z-10 mt-24 w-full max-w-6xl mx-auto px-6"
                >
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-[2.5rem] opacity-20 group-hover:opacity-40 blur-2xl transition duration-1000" />
                        <div className="relative glass-card overflow-hidden border-white/10 shadow-2xl">
                            <div className="h-12 border-b border-white/5 bg-white/5 flex items-center px-6 gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-white/10" />
                                    <div className="w-3 h-3 rounded-full bg-white/10" />
                                    <div className="w-3 h-3 rounded-full bg-white/10" />
                                </div>
                                <div className="mx-auto text-[10px] font-bold tracking-widest uppercase text-white/20">Analysis Dashboard v1.0</div>
                            </div>
                            <img
                                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"
                                alt="Dashboard Preview"
                                className="w-full h-auto opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Stats Section */}
            <section className="py-20 border-y border-white/5 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                        {[
                            { label: "Success Rate", value: "98%", icon: Target },
                            { label: "Analysis Speed", value: "< 2s", icon: Zap },
                            { label: "Jobs Optimized", value: "50k+", icon: BarChart3 },
                            { label: "Security", value: "AES-256", icon: ShieldCheck },
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col items-center md:items-start gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                                    <stat.icon className="w-6 h-6 text-white/40" />
                                </div>
                                <div>
                                    <div className="text-3xl font-black mb-1">{stat.value}</div>
                                    <div className="text-sm font-bold tracking-widest uppercase text-white/40">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-32 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">
                                Engineered for <br />
                                <span className="premium-gradient-text">Elite Performance.</span>
                            </h2>
                            <p className="text-xl text-white/60 font-medium">
                                Our platform isn't just a tool; it's your personal career architect.
                                Built with advanced LLM technology to give you the unfair advantage.
                            </p>
                        </div>
                        <Link href="/analyze" className="text-sm font-bold tracking-widest uppercase flex items-center gap-2 hover:text-blue-400 transition-colors">
                            Explore All Features <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Deep Semantic Analysis",
                                desc: "Our AI understands context, not just keywords. It identifies how your experience maps to job requirements at a conceptual level.",
                                icon: Sparkles,
                                color: "blue"
                            },
                            {
                                title: "Keyword Extraction",
                                desc: "Instantly identify the high-priority terms that ATS filters are looking for. Never miss a critical skill again.",
                                icon: Target,
                                color: "purple"
                            },
                            {
                                title: "Actionable Roadmap",
                                desc: "Get a prioritized list of exactly what to change, add, or remove from your CV to hit that 90%+ match score.",
                                icon: Zap,
                                color: "pink"
                            }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className="glass-card p-10 group relative overflow-hidden"
                            >
                                <div className={cn(
                                    "absolute top-0 right-0 w-32 h-32 blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity",
                                    feature.color === "blue" ? "bg-blue-500" : feature.color === "purple" ? "bg-purple-500" : "bg-pink-500"
                                )} />
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                                    <feature.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                                <p className="text-white/50 leading-relaxed font-medium">
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-32 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">The Path to <span className="premium-gradient-text">Success</span></h2>
                        <p className="text-xl text-white/60 max-w-2xl mx-auto font-medium">Three steps to transform your career trajectory.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-16 relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-24 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                        {[
                            { step: "01", title: "Input Job", desc: "Paste a LinkedIn URL or the full job description into our secure portal." },
                            { step: "02", title: "Upload CV", desc: "Securely upload your resume. We support PDF and direct text input." },
                            { step: "03", title: "Optimize", desc: "Receive your elite analysis and start applying with confidence." }
                        ].map((item, i) => (
                            <div key={i} className="relative flex flex-col items-center text-center">
                                <div className="w-20 h-20 rounded-full bg-[#050505] border border-white/10 flex items-center justify-center text-2xl font-black mb-8 z-10 shadow-2xl">
                                    {item.step}
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                                <p className="text-white/50 leading-relaxed font-medium max-w-[250px]">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-40 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-blue-600/10 blur-[150px] rounded-full" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">
                        Ready to <span className="premium-gradient-text">Elevate</span> <br />
                        Your Future?
                    </h2>
                    <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                        Join the elite group of professionals who use AI to bypass filters and land
                        interviews at top-tier companies.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link href="/analyze" className="luxury-button w-full sm:w-auto">
                            Analyze Now — It's Free
                        </Link>
                        <p className="text-sm font-bold tracking-widest uppercase text-white/40">
                            No Credit Card Required
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 border-t border-white/5 bg-[#050505]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-black" />
                            </div>
                            <span className="text-lg font-bold tracking-tight">CareerAI</span>
                        </div>

                        <div className="flex gap-12">
                            <Link href="#" className="text-xs font-bold tracking-widest uppercase text-white/40 hover:text-white transition-colors">Privacy</Link>
                            <Link href="#" className="text-xs font-bold tracking-widest uppercase text-white/40 hover:text-white transition-colors">Terms</Link>
                            <Link href="#" className="text-xs font-bold tracking-widest uppercase text-white/40 hover:text-white transition-colors">Contact</Link>
                        </div>

                        <p className="text-xs font-bold tracking-widest uppercase text-white/20">
                            © 2026 CareerAI. All Rights Reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
