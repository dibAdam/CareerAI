'use client';

import { motion } from 'framer-motion';
import { Lock, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface LoginGateProps {
    message?: string;
}

/**
 * Login gate modal for anonymous users who have exhausted their free analysis
 * Non-dismissible modal with conversion-focused messaging
 */
export default function LoginGate({ message }: LoginGateProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="relative w-full max-w-md mx-4"
            >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-3xl blur-xl" />

                {/* Main card */}
                <div className="relative glass-card p-8 bg-surface/95 border-2 border-white/10">
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                            <Lock className="w-8 h-8 text-white" />
                        </div>
                    </div>

                    {/* Heading */}
                    <h2 className="text-2xl font-black text-center mb-3 font-heading tracking-tight">
                        Free Analysis Used
                    </h2>

                    {/* Message */}
                    <p className="text-center text-white/60 mb-8 font-medium leading-relaxed">
                        {message || 'You\'ve used your free CV analysis. Sign in to unlock unlimited analyses and save your results.'}
                    </p>

                    {/* Benefits */}
                    <div className="space-y-3 mb-8">
                        {[
                            'Unlimited CV analyses',
                            'Save and compare results',
                            'Track your progress over time',
                            'Export professional reports',
                        ].map((benefit, index) => (
                            <motion.div
                                key={benefit}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + index * 0.05 }}
                                className="flex items-center gap-3"
                            >
                                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                    <Sparkles className="w-3 h-3 text-emerald-400" />
                                </div>
                                <span className="text-sm text-white/80 font-medium">{benefit}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="space-y-3">
                        <Link
                            href="/login"
                            className="luxury-button-emerald w-full flex items-center justify-center gap-2 group"
                        >
                            Sign In to Continue
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                            href="/login"
                            className="luxury-button-secondary w-full flex items-center justify-center"
                        >
                            Create Free Account
                        </Link>
                    </div>

                    {/* Fine print */}
                    <p className="text-center text-[10px] text-white/30 mt-6 font-bold tracking-widest uppercase">
                        Free Forever • No Credit Card Required
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
