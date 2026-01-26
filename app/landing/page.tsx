'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function LandingPage() {
    const [scrollY, setScrollY] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Universal Header */}
            <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/landing" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
                                <span className="text-white font-bold text-sm">CV</span>
                            </div>
                            <span className="text-lg font-semibold text-gray-900">ATS Optimizer</span>
                        </Link>
                        <Link
                            href="/analyze"
                            className="px-5 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-all hover:shadow-lg hover:scale-105"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section - Full Height */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50">
                {/* Animated Grid Background */}
                <div className="absolute inset-0">
                    {/* Grid lines */}
                    <div className="absolute inset-0 opacity-[0.04]" style={{
                        backgroundImage: `
              linear-gradient(to right, rgb(0 0 0) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(0 0 0) 1px, transparent 1px)
            `,
                        backgroundSize: '80px 80px',
                        transform: `translateY(${scrollY * 0.3}px)`
                    }} />

                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 animate-gradient-shift" />

                    {/* Radial gradient vignette */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,white_100%)]" />
                </div>

                {/* Floating geometric shapes */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-gray-200 rounded-full animate-float-slow opacity-20" />
                    <div className="absolute top-1/2 right-1/4 w-48 h-48 border border-blue-200 rounded-lg rotate-45 animate-float opacity-20" />
                    <div className="absolute bottom-1/4 left-1/2 w-56 h-56 border border-purple-200 rounded-full animate-float-delayed opacity-20" />
                </div>

                {/* Gradient Orbs - More Sophisticated */}
                <div className="absolute top-1/4 -left-48 w-96 h-96 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
                <div className="absolute top-1/3 -right-48 w-96 h-96 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
                <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-gradient-to-br from-indigo-200 to-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

                {/* Content */}
                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    {/* Badge */}
                    <div
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 mb-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        <span className="text-sm font-medium text-gray-700">AI-Powered CV Analysis</span>
                    </div>

                    {/* Main Headline */}
                    <h1
                        className={`text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 tracking-tight transition-all duration-1000 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                    >
                        Optimize Your CV for
                        <span className="block mt-2 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent animate-gradient-x">
                            Applicant Tracking Systems
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p
                        className={`text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                    >
                        AI-powered analysis that identifies gaps, suggests improvements,
                        and helps you land more interviews.
                    </p>

                    {/* CTA Buttons */}
                    <div
                        className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                    >
                        <Link
                            href="/analyze"
                            className="group relative px-8 py-4 bg-gray-900 text-white font-medium rounded-lg overflow-hidden transition-all hover:shadow-2xl hover:scale-105"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                            <span className="relative flex items-center justify-center gap-2">
                                Analyze Your CV
                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </span>
                        </Link>
                        <button className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 font-medium rounded-lg border-2 border-gray-200 transition-all hover:border-gray-300 hover:shadow-lg">
                            View Example
                        </button>
                    </div>

                    {/* Stats */}
                    <div
                        className={`grid grid-cols-3 gap-8 max-w-2xl mx-auto transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                    >
                        {[
                            { value: '95%', label: 'Match Rate', delay: '0ms' },
                            { value: '<30s', label: 'Analysis Time', delay: '100ms' },
                            { value: 'Free', label: 'Always', delay: '200ms' },
                        ].map((stat, i) => (
                            <div
                                key={i}
                                className="group cursor-default"
                                style={{ animationDelay: stat.delay }}
                            >
                                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 group-hover:scale-110 transition-transform">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                        <span className="text-xs font-medium">Scroll to explore</span>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-32 px-6 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            How It Works
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Three simple steps to transform your CV
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                step: '1',
                                title: 'Paste Job URL',
                                description: 'Add a LinkedIn job posting URL or paste the job description directly.',
                            },
                            {
                                step: '2',
                                title: 'Upload CV',
                                description: 'Upload your CV as a PDF or paste the text. We analyze every section.',
                            },
                            {
                                step: '3',
                                title: 'Get Insights',
                                description: 'Receive detailed feedback with actionable improvements and missing keywords.',
                            },
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className="group bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300"
                                style={{ animationDelay: `${i * 100}ms` }}
                            >
                                <div className="w-12 h-12 bg-gray-900 text-white rounded-xl flex items-center justify-center font-bold text-lg mb-6 group-hover:scale-110 transition-transform">
                                    {feature.step}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-32 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-10">
                                Everything You Need
                            </h2>
                            <div className="space-y-6">
                                {[
                                    { title: 'Match Score', desc: 'See your compatibility at a glance (0-100%)' },
                                    { title: 'Missing Keywords', desc: 'Identify critical terms from the job posting' },
                                    { title: 'Section Analysis', desc: 'Detailed feedback on every CV section' },
                                    { title: 'Priority Actions', desc: 'Know exactly what to fix first' },
                                    { title: 'ATS Tips', desc: 'Expert advice for optimization' },
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-4 group hover:translate-x-2 transition-transform"
                                    >
                                        <div className="w-6 h-6 bg-gray-900 rounded flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                                            <p className="text-gray-600 text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-12 border border-gray-200 hover:shadow-2xl transition-all">
                            <div className="text-center">
                                <div className="text-8xl font-bold text-gray-900 mb-4 hover:scale-110 transition-transform cursor-default">
                                    85%
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Average Match Score</h3>
                                <p className="text-gray-600 leading-relaxed mb-10">
                                    Users see significant improvements after optimizing with our AI-powered insights
                                </p>

                                <div className="space-y-4">
                                    {[
                                        { label: 'Keyword Match', value: 92 },
                                        { label: 'ATS Compatibility', value: 88 },
                                        { label: 'Format Score', value: 95 },
                                    ].map((bar, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                                                <span>{bar.label}</span>
                                                <span className="font-medium">{bar.value}%</span>
                                            </div>
                                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gray-900 rounded-full transition-all duration-1000 ease-out hover:bg-gray-700"
                                                    style={{ width: `${bar.value}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive Demo Section */}
            <section className="py-32 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `
              linear-gradient(to right, rgb(255 255 255) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(255 255 255) 1px, transparent 1px)
            `,
                        backgroundSize: '80px 80px'
                    }} />
                </div>

                <div className="relative max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400"></span>
                            </span>
                            <span className="text-sm font-medium text-white">Try It Now</span>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            See It In Action
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Test the analyzer with sample data or jump right in with your own CV
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Quick Demo Card */}
                        <div className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl opacity-50 group-hover:opacity-75 blur-xl transition-opacity" />
                            <div className="relative bg-white rounded-3xl p-10 hover:scale-105 transition-all">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                    Quick Demo
                                </h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    See how it works with pre-loaded sample data. Perfect for a quick preview.
                                </p>
                                <button className="w-full py-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-all hover:shadow-xl">
                                    Try Sample Analysis
                                </button>
                            </div>
                        </div>

                        {/* Full Analysis Card */}
                        <div className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl opacity-50 group-hover:opacity-75 blur-xl transition-opacity" />
                            <div className="relative bg-white rounded-3xl p-10 hover:scale-105 transition-all">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                    Analyze Your CV
                                </h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Upload your actual CV and get personalized, actionable feedback.
                                </p>
                                <Link
                                    href="/analyze"
                                    className="block w-full py-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-all hover:shadow-xl text-center"
                                >
                                    Start Analysis
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 px-6 bg-white relative overflow-hidden">
                {/* Subtle pattern */}
                <div className="absolute inset-0 opacity-[0.02]">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0 0 0) 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }} />
                </div>

                <div className="relative max-w-4xl mx-auto text-center">
                    <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
                        Ready to Get Started?
                    </h2>
                    <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                        Join thousands who've optimized their CVs and landed their dream jobs
                    </p>
                    <Link
                        href="/analyze"
                        className="inline-block px-10 py-5 bg-gray-900 hover:bg-gray-800 text-white font-semibold text-lg rounded-lg transition-all hover:shadow-2xl hover:scale-105"
                    >
                        Analyze Your CV Now
                    </Link>
                    <p className="mt-8 text-sm text-gray-500">
                        No credit card required • No signup needed • Results in 30 seconds
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-200 py-12 px-6 bg-white">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-gray-600 text-sm">
                        © 2026 ATS CV Optimizer. This tool provides optimization guidance and does not guarantee job offers.
                    </p>
                </div>
            </footer>

            <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }

        @keyframes gradient-shift {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.1; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(-5deg); }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }

        .animate-gradient-shift {
          animation: gradient-shift 8s ease-in-out infinite;
        }

        .animate-float {
          animation: float 10s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 15s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 12s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>
        </div>
    );
}
