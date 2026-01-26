'use client';

import { useState } from 'react';

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

        // More specific LinkedIn URL detection: check if it's likely just a URL
        const isUrlPattern = /^(https?:\/\/)?(www\.)?linkedin\.com\/jobs\/view\/\d+/i;
        const isLinkedInUrl = isUrlPattern.test(value.trim());

        if (isLinkedInUrl) {
            setSource('url');
        } else {
            setSource('text');
        }

        onJobInput(value, isLinkedInUrl ? 'url' : 'text');
    };

    const toggleSource = () => {
        const newSource = source === 'url' ? 'text' : 'url';
        setSource(newSource);
        onJobInput(inputValue, newSource);
    };

    return (
        <div className="space-y-3">
            {/* Mode Indicator & Toggle */}
            {inputValue.trim() && (
                <div className="flex items-center justify-between px-1">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md border ${source === 'url'
                            ? 'bg-green-50 border-green-200 text-green-800'
                            : 'bg-blue-50 border-blue-200 text-blue-800'
                        }`}>
                        {source === 'url' ? (
                            <>
                                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-xs font-medium">LinkedIn URL detected</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                                </svg>
                                <span className="text-xs font-medium">Text mode enabled</span>
                            </>
                        )}
                    </div>

                    <button
                        onClick={toggleSource}
                        className="text-xs font-medium text-gray-500 hover:text-gray-900 underline underline-offset-2"
                    >
                        Switch to {source === 'url' ? 'manual text' : 'URL extraction'}
                    </button>
                </div>
            )}

            {/* Input Area */}
            <textarea
                value={inputValue}
                onChange={handleInputChange}
                disabled={disabled}
                placeholder="Paste a LinkedIn job URL or the complete job description...

LinkedIn URL Example:
https://www.linkedin.com/jobs/view/1234567890

Or paste job description:
Senior Software Engineer at TechCorp

We are seeking an experienced software engineer...

Requirements:
• 5+ years of experience
• Python, React, AWS
• Strong problem-solving skills..."
                rows={14}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none text-sm ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                    }`}
            />

            {/* Info Box */}
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <p className="text-xs text-blue-800 leading-relaxed">
                        <strong>Tip:</strong> Paste a LinkedIn job URL and we'll automatically extract all details, or paste the full job description text.
                    </p>
                </div>
            </div>
        </div>
    );
}
