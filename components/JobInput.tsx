'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Link2, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';

interface JobInputProps {
    onJobInput: (text: string, source: 'url' | 'text') => void;
    disabled?: boolean;
}

export default function JobInput({ onJobInput, disabled }: JobInputProps) {
    const [inputValue, setInputValue] = useState<string>('');
    const [source, setSource] = useState<'url' | 'text'>('text');

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setInputValue(value);

        // More specific LinkedIn URL detection
        const isUrlPattern = /^(https?:\/\/)?(www\.)?linkedin\.com\/jobs\/view\/\d+/i;
        const isLinkedInUrl = isUrlPattern.test(value.trim());

        const newSource = isLinkedInUrl ? 'url' : 'text';
        setSource(newSource);
        onJobInput(value, newSource);
    };

    const toggleSource = () => {
        const newSource = source === 'url' ? 'text' : 'url';
        setSource(newSource);
        onJobInput(inputValue, newSource);
    };

    return (
        <div className="space-y-6">
            {/* Mode Indicator & Toggle */}
            {inputValue.trim() && (
                <div className="flex items-center justify-between px-1">
                    <div className={cn(
                        "inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-500",
                        source === 'url'
                            ? 'bg-blue-500/10 border-blue-500/20 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                            : 'bg-purple-500/10 border-purple-500/20 text-purple-400 shadow-[0_0_15px_rgba(139,92,246,0.1)]'
                    )}>
                        {source === 'url' ? (
                            <>
                                <Link2 className="w-4 h-4" />
                                <span className="text-xs font-bold tracking-widest uppercase">LinkedIn URL Detected</span>
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
                <div className="absolute -inset-0.5 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl opacity-0 group-focus-within:opacity-100 transition duration-500 blur-sm" />
                <textarea
                    value={inputValue}
                    onChange={handleInputChange}
                    disabled={disabled}
                    placeholder="Paste a LinkedIn job URL or the complete job description..."
                    rows={12}
                    className={cn(
                        "relative w-full px-6 py-6 bg-white/[0.03] border border-white/10 rounded-2xl focus:ring-0 focus:border-white/20 resize-none text-base font-medium placeholder:text-white/20 transition-all",
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
