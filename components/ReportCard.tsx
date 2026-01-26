'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
    AlertTriangle,
    CheckCircle2,
    Info,
    Zap,
    ChevronRight
} from 'lucide-react';

interface ReportCardProps {
    title: string;
    items: string[];
    variant?: 'default' | 'warning' | 'success' | 'info';
}

export default function ReportCard({ title, items, variant = 'default' }: ReportCardProps) {
    const getVariantConfig = () => {
        switch (variant) {
            case 'warning':
                return {
                    icon: AlertTriangle,
                    color: 'text-amber-400',
                    bg: 'bg-amber-400/10',
                    border: 'border-amber-400/20',
                    glow: 'shadow-[0_0_20px_rgba(251,191,36,0.1)]'
                };
            case 'success':
                return {
                    icon: CheckCircle2,
                    color: 'text-emerald-400',
                    bg: 'bg-emerald-400/10',
                    border: 'border-emerald-400/20',
                    glow: 'shadow-[0_0_20px_rgba(52,211,153,0.1)]'
                };
            case 'info':
                return {
                    icon: Info,
                    color: 'text-blue-400',
                    bg: 'bg-blue-400/10',
                    border: 'border-blue-400/20',
                    glow: 'shadow-[0_0_20px_rgba(96,165,250,0.1)]'
                };
            default:
                return {
                    icon: Zap,
                    color: 'text-purple-400',
                    bg: 'bg-purple-400/10',
                    border: 'border-purple-400/20',
                    glow: 'shadow-[0_0_20px_rgba(167,139,250,0.1)]'
                };
        }
    };

    const config = getVariantConfig();
    const Icon = config.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "glass-card p-8 relative overflow-hidden group transition-all duration-500",
                config.glow
            )}
        >
            <div className="flex items-center gap-4 mb-8">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110", config.bg)}>
                    <Icon className={cn("w-6 h-6", config.color)} />
                </div>
                <div>
                    <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
                    <div className="flex items-center gap-2">
                        <div className={cn("w-1.5 h-1.5 rounded-full", config.color.replace('text-', 'bg-'))} />
                        <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white/20">
                            {items.length} Insights Identified
                        </span>
                    </div>
                </div>
            </div>

            {items.length === 0 ? (
                <div className="py-12 text-center border border-dashed border-white/10 rounded-2xl">
                    <p className="text-sm text-white/20 font-bold tracking-widest uppercase">No Critical Items Found</p>
                </div>
            ) : title.toLowerCase().includes('keywords') ? (
                <div className="flex flex-wrap gap-2">
                    {items.map((item, index) => (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className={cn(
                                "px-3 py-1.5 rounded-lg text-xs font-bold border transition-all duration-300",
                                config.bg,
                                config.border,
                                config.color,
                                "hover:bg-white/10 hover:border-white/20"
                            )}
                        >
                            {item}
                        </motion.span>
                    ))}
                </div>
            ) : (
                <div className="grid gap-3">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group/item flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300"
                        >
                            <div className="w-5 h-5 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-white/10 transition-colors">
                                <ChevronRight className={cn("w-3 h-3 transition-transform group-hover/item:translate-x-0.5", config.color)} />
                            </div>
                            <span className="text-white/60 text-xs font-medium leading-relaxed group-hover/item:text-white transition-colors">
                                {item}
                            </span>
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );
}
