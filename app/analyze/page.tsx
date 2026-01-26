'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import UploadCV from '@/components/UploadCV';
import JobInput from '@/components/JobInput';
import { analyzeCVAction } from '@/app/actions/analyzeCV';

export default function AnalyzePage() {
    const router = useRouter();
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [cvText, setCvText] = useState<string>('');
    const [jobInput, setJobInput] = useState<string>('');
    const [jobSource, setJobSource] = useState<'url' | 'text'>('text');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [error, setError] = useState<string>('');

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
        <div className="min-h-screen bg-gray-50">
            {/* Universal Header */}
            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/landing" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
                                <span className="text-white font-bold text-sm">CV</span>
                            </div>
                            <span className="text-lg font-semibold text-gray-900">ATS Optimizer</span>
                        </Link>
                        <Link
                            href="/landing"
                            className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
                        >
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-6 py-12">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">
                        CV Analysis
                    </h1>
                    <p className="text-lg text-gray-600">
                        Get your personalized ATS optimization report in seconds
                    </p>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10">
                    <div className="space-y-10">
                        {/* Step 1: Job Input */}
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-lg bg-gray-900 text-white flex items-center justify-center font-semibold text-sm">
                                    1
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Job Description
                                    </h2>
                                    <p className="text-sm text-gray-600">
                                        Paste a LinkedIn job URL or the full job description
                                    </p>
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
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-200" />

                        {/* Step 2: CV Upload */}
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-lg bg-gray-900 text-white flex items-center justify-center font-semibold text-sm">
                                    2
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Your CV
                                    </h2>
                                    <p className="text-sm text-gray-600">
                                        Upload a PDF or paste your CV text
                                    </p>
                                </div>
                            </div>
                            <UploadCV
                                onFileSelect={setCvFile}
                                onTextInput={setCvText}
                                disabled={isAnalyzing}
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                                <div className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-sm text-red-800">{error}</p>
                                </div>
                            </div>
                        )}

                        {/* Analyze Button */}
                        <div className="pt-6">
                            <button
                                onClick={handleAnalyze}
                                disabled={!canAnalyze || isAnalyzing}
                                className={`w-full py-4 rounded-lg font-semibold transition-all ${canAnalyze && !isAnalyzing
                                    ? 'bg-gray-900 hover:bg-gray-800 text-white shadow-lg hover:shadow-xl'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                {isAnalyzing ? (
                                    <span className="flex items-center justify-center gap-3">
                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Analyzing...
                                    </span>
                                ) : (
                                    'Analyze CV'
                                )}
                            </button>
                        </div>

                        {/* Disclaimer */}
                        <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                            <p className="text-xs text-gray-600 text-center leading-relaxed">
                                <strong>Disclaimer:</strong> This tool provides optimization guidance and does not
                                guarantee job offers or ATS acceptance. Results are AI-generated suggestions.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
