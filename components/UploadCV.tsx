'use client';

import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import {
    Upload,
    FileText,
    X,
    CheckCircle2,
    AlertCircle,
    FileUp,
    Type
} from 'lucide-react';

interface UploadCVProps {
    onFileSelect: (file: File | null) => void;
    onTextInput: (text: string) => void;
    disabled?: boolean;
}

export default function UploadCV({ onFileSelect, onTextInput, disabled }: UploadCVProps) {
    const [mode, setMode] = useState<'file' | 'text'>('file');
    const [file, setFile] = useState<File | null>(null);
    const [text, setText] = useState<string>('');
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
            onFileSelect(selectedFile);
            onTextInput('');
        }
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        setText(val);
        onTextInput(val);
        setFile(null);
        onFileSelect(null);
    };

    const removeFile = () => {
        setFile(null);
        onFileSelect(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = () => setIsDragging(false);

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && droppedFile.type === 'application/pdf') {
            setFile(droppedFile);
            onFileSelect(droppedFile);
            onTextInput('');
        }
    };

    return (
        <div className="space-y-6">
            {/* Mode Switcher */}
            <div className="flex p-1 bg-white/[0.03] border border-white/5 rounded-xl w-fit">
                <button
                    onClick={() => setMode('file')}
                    className={cn(
                        "flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold tracking-widest uppercase transition-all",
                        mode === 'file' ? "bg-white text-black shadow-xl" : "text-white/40 hover:text-white"
                    )}
                >
                    <FileUp className="w-4 h-4" />
                    PDF Upload
                </button>
                <button
                    onClick={() => setMode('text')}
                    className={cn(
                        "flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold tracking-widest uppercase transition-all",
                        mode === 'text' ? "bg-white text-black shadow-xl" : "text-white/40 hover:text-white"
                    )}
                >
                    <Type className="w-4 h-4" />
                    Paste Text
                </button>
            </div>

            {mode === 'file' ? (
                <div
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    onClick={() => !file && fileInputRef.current?.click()}
                    className={cn(
                        "relative group cursor-pointer transition-all duration-500",
                        isDragging ? "scale-[1.02]" : "hover:scale-[1.01]"
                    )}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".pdf"
                        className="hidden"
                        disabled={disabled}
                    />

                    <div className={cn(
                        "relative flex flex-col items-center justify-center py-16 px-6 rounded-2xl border-2 border-dashed transition-all duration-500",
                        isDragging ? "border-white bg-white/10" : "border-white/10 bg-white/[0.02] group-hover:border-white/20 group-hover:bg-white/[0.04]",
                        file && "border-green-500/20 bg-green-500/5"
                    )}>
                        {file ? (
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mb-4">
                                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                                </div>
                                <h3 className="text-lg font-bold mb-1">{file.name}</h3>
                                <p className="text-sm text-white/40 font-medium mb-6">{(file.size / 1024 / 1024).toFixed(2)} MB • Ready for analysis</p>
                                <button
                                    onClick={(e) => { e.stopPropagation(); removeFile(); }}
                                    className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-white/20 hover:text-red-400 transition-colors"
                                >
                                    <X className="w-3 h-3" />
                                    Remove File
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                    <Upload className="w-8 h-8 text-white/40 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Drop your CV here</h3>
                                <p className="text-sm text-white/40 font-medium">or click to browse from your device</p>
                                <div className="mt-8 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black tracking-widest uppercase text-white/20">
                                    PDF Format Only • Max 10MB
                                </div>
                            </>
                        )}
                    </div>
                </div>
            ) : (
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl opacity-0 group-focus-within:opacity-100 transition duration-500 blur-sm" />
                    <textarea
                        value={text}
                        onChange={handleTextChange}
                        disabled={disabled}
                        placeholder="Paste your CV text here..."
                        rows={12}
                        className={cn(
                            "relative w-full px-6 py-6 bg-white/[0.03] border border-white/10 rounded-2xl focus:ring-0 focus:border-white/20 resize-none text-base font-medium placeholder:text-white/20 transition-all",
                            disabled && "opacity-50 cursor-not-allowed"
                        )}
                    />
                </div>
            )}

            {/* Info Box */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <AlertCircle className="w-4 h-4 text-white/40" />
                    </div>
                    <p className="text-xs text-white/40 leading-relaxed font-medium">
                        <strong className="text-white/60">Note:</strong> Your data is processed securely and never stored permanently without your consent. We use enterprise-grade encryption for all file transfers.
                    </p>
                </div>
            </div>
        </div>
    );
}
