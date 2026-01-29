'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Link2, FileText, AlertCircle } from 'lucide-react';

interface JobInputProps {
    onJobInput: (text: string, source: 'url' | 'text') => void;
    disabled?: boolean;
    forcedSource?: 'url' | 'text';
}

export default function JobInput({ onJobInput, disabled, forcedSource }: JobInputProps) {
    const [inputValue, setInputValue] = useState<string>('');
    const [source, setSource] = useState<'url' | 'text'>('text');

    // Sync with forcedSource if provided
    useEffect(() => {
        if (forcedSource && forcedSource !== source) {
            setSource(forcedSource);
        }
    }, [forcedSource]);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setInputValue(value);

        const trimmedValue = value.trim();

        // Platform detection by domain
        const platforms = [
            { name: 'LinkedIn', domains: ['linkedin.com'] },
            { name: 'Indeed', domains: ['indeed.com', 'indeed.co.uk', 'indeed.fr', 'indeed.de', 'indeed.ca', 'indeed.ma', 'indeed.ae', 'indeed.es', 'indeed.it'] },
            { name: 'Glassdoor', domains: ['glassdoor.com', 'glassdoor.co.uk', 'glassdoor.ca', 'glassdoor.fr', 'glassdoor.de', 'glassdoor.es'] },
            { name: 'WelcomeToTheJungle', domains: ['welcometothejungle.com', 'wttj.co'] },
        ];

        const detectedPlatform = platforms.find(({ domains }) =>
            domains.some(domain => trimmedValue.includes(domain))
        )?.name || '';

        // Check if it's a URL (has http/https or www or contains domain pattern)
        const isUrl = /^(https?:\/\/|www\.)/i.test(trimmedValue) ||
            /[a-z0-9-]+\.[a-z]{2,}/i.test(trimmedValue);

        const newSource = detectedPlatform ? 'url' : (isUrl ? 'url' : 'text');
        setSource(newSource);
        onJobInput(value, newSource);
    };

    const toggleSource = () => {
        const newSource = source === 'url' ? 'text' : 'url';
        setSource(newSource);
        onJobInput(inputValue, newSource);
    };

    // Helper to get platform name for display
    const getPlatformDisplay = () => {
        const trimmedValue = inputValue.trim();
        if (/linkedin\.com/i.test(trimmedValue)) return 'LinkedIn';
        if (/indeed\.com/i.test(trimmedValue)) return 'Indeed';
        if (/glassdoor\.com/i.test(trimmedValue)) return 'Glassdoor';
        if (/welcometothejungle\.com/i.test(trimmedValue)) return 'WTTJ';
        return '';
    };

    return (
        <div className="space-y-6">
            {/* Mode Indicator & Toggle */}
            {inputValue.trim() && (
                <div className="flex items-center justify-between px-1">
                    <div className={cn(
                        "inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-500",
                        source === 'url'
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-[0_0_15_rgba(16,185,129,0.1)]'
                            : 'bg-amethyst-500/10 border-amethyst-500/20 text-amethyst-400 shadow-[0_0_15px_rgba(168,85,247,0.1)]'
                    )}>
                        {source === 'url' ? (
                            <>
                                <Link2 className="w-4 h-4" />
                                <span className="text-xs font-bold tracking-widest uppercase">{getPlatformDisplay()} URL Detected</span>
                            </>
                        ) : (
                            <>
                                <FileText className="w-4 h-4" />
                                <span className="text-xs font-bold tracking-widest uppercase">Manual Text Mode</span>
                            </>
                        )}
                    </div>

                    <button
                        onClick={toggleSource}
                        className="text-[10px] font-black tracking-[0.2em] uppercase text-white/20 hover:text-white transition-colors underline underline-offset-4"
                    >
                        Switch to {source === 'url' ? 'Manual Text' : 'URL Extraction'}
                    </button>
                </div>
            )}

            {/* Input Area */}
            <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-amethyst-500/20 rounded-2xl opacity-0 group-focus-within:opacity-100 transition duration-500 blur-sm" />
                <textarea
                    value={inputValue}
                    onChange={handleInputChange}
                    disabled={disabled}
                    placeholder="Paste a job URL (LinkedIn, Indeed, Glassdoor, WTTJ) or the complete job description..."
                    rows={12}
                    className={cn(
                        "relative w-full px-6 py-6 bg-white/[0.03] border border-white/10 rounded-2xl focus:ring-0 focus:border-emerald-500/50 resize-none text-base font-medium placeholder:text-white/20 transition-all",
                        disabled && "opacity-50 cursor-not-allowed"
                    )}
                />
            </div>

            {/* Info Box */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <AlertCircle className="w-4 h-4 text-white/40" />
                    </div>
                    <p className="text-xs text-white/40 leading-relaxed font-medium">
                        <strong className="text-white/60">Pro Tip:</strong> For the most accurate analysis, ensure the full job description is included, including requirements and responsibilities.
                    </p>
                </div>
            </div>
        </div>
    );
}
