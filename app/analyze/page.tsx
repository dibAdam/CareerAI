'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles,
    ArrowLeft,
    FileText,
    Briefcase,
    ChevronRight,
    Loader2,
    AlertCircle,
    CheckCircle2
} from 'lucide-react';
import UploadCV from '@/components/UploadCV';
import JobInput from '@/components/JobInput';
import { analyzeCVAction } from '@/app/actions/analyzeCV';
import { cn } from '@/lib/utils';

export default function AnalyzePage() {
    const router = useRouter();
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [cvText, setCvText] = useState<string>('');
    const [jobInput, setJobInput] = useState<string>('');
    const [jobSource, setJobSource] = useState<'url' | 'text'>('text');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [error, setError] = useState<string>('');
    const [step, setStep] = useState(1);

    const handleAnalyze = async () => {
        setError('');

        if (!cvFile && !cvText) {
            setError('Please upload a CV or paste CV text');
            return;
        }

        if (!jobInput || jobInput.trim().length < 10) {
            setError('Please provide a LinkedIn URL or complete job description');
            return;
        }

        setIsAnalyzing(true);

        try {
            const result = await analyzeCVAction({
                cvFile: cvFile || undefined,
                cvText: cvText || undefined,
                jobInput,
                jobSource,
            });

            if (result.success && result.analysisId) {
                router.push(`/results/${result.analysisId}`);
            } else {
                setError(result.error || 'Analysis failed. Please try again.');
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
            console.error(err);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const canAnalyze = (cvFile || cvText) && jobInput.trim().length >= 10;

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-white/20">
            {/* Header */}
            <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#050505]/50 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/landing" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform duration-500">
                            <Sparkles className="w-6 h-6 text-black" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">CareerAI</span>
                    </Link>

                    <Link
                        href="/landing"
                        className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-white/40 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>
            </nav>

            <main className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Progress Header */}
                    <div className="text-center mb-16">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-black mb-4 tracking-tighter"
                        >
                            Analysis <span className="premium-gradient-text">Configuration</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-white/60 font-medium"
                        >
                            Configure your analysis parameters for maximum precision.
                        </motion.p>
                    </div>

                    {/* Step Indicator */}
                    <div className="flex items-center justify-center gap-4 mb-12">
                        {[1, 2].map((i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center font-black transition-all duration-500",
                                    step >= i ? "bg-white text-black scale-110 shadow-[0_0_20px_rgba(255,255,255,0.2)]" : "bg-white/5 text-white/20 border border-white/10"
                                )}>
                                    {i}
                                </div>
                                {i === 1 && (
                                    <div className={cn(
                                        "w-20 h-px transition-colors duration-500",
                                        step > 1 ? "bg-white" : "bg-white/10"
                                    )} />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="relative">
                        <AnimatePresence mode="wait">
                            {step === 1 ? (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="glass-card p-8 md:p-12"
                                >
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                                            <Briefcase className="w-6 h-6 text-blue-400" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold">Job Specification</h2>
                                            <p className="text-sm text-white/40 font-medium">Paste the job URL or description text.</p>
                                        </div>
                                    </div>

                                    <JobInput
                                        onJobInput={(text, source) => {
                                            setJobInput(text);
                                            setJobSource(source);
                                            setError('');
                                        }}
                                        disabled={isAnalyzing}
                                    />

                                    <div className="mt-10 flex justify-end">
                                        <button
                                            onClick={() => setStep(2)}
                                            disabled={!jobInput || jobInput.trim().length < 10}
                                            className="luxury-button group flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Next Step
                                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="glass-card p-8 md:p-12"
                                >
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                                            <FileText className="w-6 h-6 text-purple-400" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold">Your Curriculum Vitae</h2>
                                            <p className="text-sm text-white/40 font-medium">Upload your PDF or paste your CV text.</p>
                                        </div>
                                    </div>

                                    <UploadCV
                                        onFileSelect={setCvFile}
                                        onTextInput={setCvText}
                                        disabled={isAnalyzing}
                                    />

                                    <div className="mt-10 flex items-center justify-between">
                                        <button
                                            onClick={() => setStep(1)}
                                            className="luxury-button-secondary"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={handleAnalyze}
                                            disabled={!canAnalyze || isAnalyzing}
                                            className="luxury-button group flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isAnalyzing ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Analyzing...
                                                </>
                                            ) : (
                                                <>
                                                    Finalize Analysis
                                                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Error Message */}
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="mt-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3"
                                >
                                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-red-200 font-medium">{error}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Security Disclaimer */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-12 text-center"
                    >
                        <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-white/20">
                            <ShieldCheck className="w-3 h-3" />
                            End-to-End Encrypted Analysis
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}

function ShieldCheck({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
    );
}
