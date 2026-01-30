'use client';

import { motion } from 'framer-motion';
import {
    Globe,
    Zap,
    ShieldCheck,
    Search,
    ExternalLink
} from 'lucide-react';
import Image from 'next/image';

const platforms = [
    {
        name: 'LinkedIn',
        url: 'linkedin.com',
        color: 'from-blue-600 to-blue-400',
        description: 'Full support for job view and search URLs'
    },
    {
        name: 'Indeed',
        url: 'indeed.com',
        color: 'from-blue-700 to-indigo-500',
        description: 'Global support for all Indeed domains'
    },
    {
        name: 'Glassdoor',
        url: 'glassdoor.com',
        color: 'from-emerald-600 to-teal-400',
        description: 'Extract requirements and salary data'
    },
    {
        name: 'WTTJ',
        url: 'welcometothejungle.com',
        color: 'from-yellow-500 to-orange-400',
        description: 'Optimized for European job markets'
    }
];

export default function SupportedPlatforms() {
    return (
        <section id="platforms" className="py-24 relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] -z-10" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
                    >
                        <Globe className="w-4 h-4 text-emerald-400" />
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-emerald-400">Universal Extraction</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black mb-6 tracking-tighter font-heading"
                    >
                        Supported <span className="emerald-gradient-text">Platforms</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-white/40 max-w-2xl mx-auto font-medium"
                    >
                        Our advanced scraping engine automatically detects and extracts job details from the world&apos;s leading career platforms.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {platforms.map((platform, index) => (
                        <motion.div
                            key={platform.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="glass-card p-8 group relative overflow-hidden"
                        >
                            {/* Gradient Glow */}
                            <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-3xl`} />

                            <div className="relative z-10">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                                    <Zap className="w-6 h-6 text-white" />
                                </div>

                                <h3 className="text-xl font-bold mb-2 font-heading">{platform.name}</h3>
                                <div className="flex items-center gap-2 text-white/20 text-xs font-mono mb-4">
                                    <Search className="w-3 h-3" />
                                    {platform.url}
                                </div>

                                <p className="text-sm text-white/40 leading-relaxed font-medium">
                                    {platform.description}
                                </p>

                                <div className="mt-6 flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ShieldCheck className="w-3 h-3" />
                                    Verified Support
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Fallback Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 p-8 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8"
                >
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center flex-shrink-0">
                            <Globe className="w-8 h-8 text-white/20" />
                        </div>
                        <div>
                            <h4 className="text-lg font-bold font-heading mb-1">And many more...</h4>
                            <p className="text-sm text-white/40 font-medium">Our generic extraction engine works with 95% of job boards worldwide.</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-3">
                            {[
                                "https://cdn.dribbble.com/userupload/42304023/file/original-e4f6434b02d6754d488e1ed6b6bf519d.jpg?resize=400x300",
                                "https://cdn.dribbble.com/userupload/40636733/file/original-74462bed8a23d31864cbdfb410d910bb.png?resize=400x300",
                                "https://cdn.dribbble.com/userupload/12876811/file/original-f174c9a7dec671f5bc7e8baaeef8cdf9.png?resize=400x300"
                            ].map((url, i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0A0A0B] bg-white flex items-center justify-center overflow-hidden">
                                    <Image
                                        src={url}
                                        alt={`Logo ${i + 1}`}
                                        width={40}
                                        height={40}
                                        className="w-full h-full object-cover"
                                        unoptimized
                                    />
                                </div>
                            ))}
                            <div className="w-10 h-10 rounded-full border-2 border-[#0A0A0B] bg-white/5 flex items-center justify-center text-[10px] font-bold">
                                +
                            </div>
                        </div>
                        <span className="text-xs font-bold text-white/20 uppercase tracking-widest">Global Coverage</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
