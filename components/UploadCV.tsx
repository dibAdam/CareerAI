'use client';

import { useState, useRef } from 'react';

interface UploadCVProps {
    onFileSelect: (file: File) => void;
    onTextInput: (text: string) => void;
    disabled?: boolean;
}

export default function UploadCV({ onFileSelect, onTextInput, disabled }: UploadCVProps) {
    const [mode, setMode] = useState<'file' | 'text'>('file');
    const [fileName, setFileName] = useState<string>('');
    const [textValue, setTextValue] = useState<string>('');
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            onFileSelect(file);
        }
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        setTextValue(text);
        onTextInput(text);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file && file.type === 'application/pdf') {
            setFileName(file.name);
            onFileSelect(file);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    return (
        <div className="space-y-4">
            {/* Mode Toggle */}
            <div className="flex gap-2 p-1 rounded-lg bg-gray-100">
                <button
                    type="button"
                    onClick={() => setMode('file')}
                    disabled={disabled}
                    className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${mode === 'file'
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Upload PDF
                </button>
                <button
                    type="button"
                    onClick={() => setMode('text')}
                    disabled={disabled}
                    className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${mode === 'text'
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Paste Text
                </button>
            </div>

            {/* File Upload Mode */}
            {mode === 'file' && (
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`rounded-lg border-2 border-dashed transition-colors ${isDragging
                            ? 'border-gray-400 bg-gray-50'
                            : fileName
                                ? 'border-green-300 bg-green-50'
                                : 'border-gray-300 hover:border-gray-400 bg-white'
                        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    onClick={() => !disabled && fileInputRef.current?.click()}
                >
                    <div className="p-12 text-center">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            disabled={disabled}
                            className="hidden"
                        />

                        {fileName ? (
                            <div className="space-y-3">
                                <svg className="mx-auto h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{fileName}</p>
                                    <p className="text-xs text-gray-500 mt-1">Click to change file</p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <div>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium text-gray-900">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">PDF up to 10MB</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Text Input Mode */}
            {mode === 'text' && (
                <textarea
                    value={textValue}
                    onChange={handleTextChange}
                    disabled={disabled}
                    placeholder="Paste your CV text here..."
                    rows={14}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none text-sm ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                        }`}
                />
            )}
        </div>
    );
}
