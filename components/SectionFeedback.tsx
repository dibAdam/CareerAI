'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
    Layers,
    ChevronDown
} from 'lucide-react';
import { useState } from 'react';

interface SectionFeedbackProps {
    sections: {
        section: string;
        feedback: string;
        priority?: 'high' | 'medium' | 'low';
    }[];
}

export default function SectionFeedback({ sections }: SectionFeedbackProps) {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

    const getPriorityConfig = (priority?: 'high' | 'medium' | 'low') => {
        switch (priority) {
            case 'high':
                return {
                    label: 'Critical',
                    color: 'text-red-400',
                    bg: 'bg-red-400/10',
                    border: 'border-red-400/20'
                };
            case 'medium':
                return {
                    label: 'Important',
                    color: 'text-amethyst-400',
                    bg: 'bg-amethyst-400/10',
                    border: 'border-amethyst-400/20'
                };
            case 'low':
                return {
                    label: 'Optimization',
                    color: 'text-emerald-400',
                    bg: 'bg-emerald-400/10',
                    border: 'border-emerald-400/20'
                };
            default:
                return {
                    label: 'Standard',
                    color: 'text-white/40',
                    bg: 'bg-white/5',
                    border: 'border-white/10'
                };
        }
    };

    const getSectionTitle = (section: string) => {
        return section.charAt(0).toUpperCase() + section.slice(1);
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <Layers className="w-5 h-5 text-white/40" />
                </div>
                <h2 className="text-3xl font-black tracking-tighter font-heading">Section <span className="emerald-gradient-text">Intelligence</span></h2>
            </div>

            <div className="grid gap-4">
                {sections.map((item, index) => {
                    const config = getPriorityConfig(item.priority);
                    const isExpanded = expandedIndex === index;

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={cn(
                                "glass-card overflow-hidden transition-all duration-500 bg-surface/30",
                                isExpanded ? "border-white/20 bg-white/[0.05]" : "border-white/5 bg-white/[0.02] hover:border-white/10"
                            )}
                        >
                            <button
                                onClick={() => setExpandedIndex(isExpanded ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <div className="flex items-center gap-6">
                                    <div className={cn(
                                        "w-2 h-2 rounded-full",
                                        item.priority === 'high' ? "bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.5)]" :
                                            item.priority === 'medium' ? "bg-amethyst-400 shadow-[0_0_10px_rgba(168,85,247,0.5)]" :
                                                "bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                                    )} />
                                    <div>
                                        <h3 className="text-lg font-bold tracking-tight font-heading">
                                            {getSectionTitle(item.section)}
                                        </h3>
                                        <span className={cn("text-[10px] font-black tracking-widest uppercase", config.color)}>
                                            {config.label} Priority
                                        </span>
                                    </div>
                                </div>
                                <ChevronDown className={cn(
                                    "w-5 h-5 text-white/20 transition-transform duration-500",
                                    isExpanded && "rotate-180 text-white"
                                )} />
                            </button>

                            <motion.div
                                initial={false}
                                animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                                className="overflow-hidden"
                            >
                                <div className="px-6 pb-8 pt-2">
                                    <div className="h-px bg-white/5 mb-6" />
                                    <div className="flex gap-4">
                                        <div className="w-1 h-auto bg-white/10 rounded-full" />
                                        <p className="text-white/60 leading-relaxed font-medium text-sm whitespace-pre-line">
                                            {item.feedback}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
