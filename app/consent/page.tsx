'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Check, AlertCircle } from 'lucide-react'

export default function ConsentPage() {
    const [accepted, setAccepted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const supabase = createClient()

    const handleAccept = async () => {
        if (!accepted) return

        setIsLoading(true)
        setError(null)

        try {
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                router.push('/login')
                return
            }

            const { error: updateError } = await supabase
                .from('profiles')
                .update({
                    consent_accepted: true,
                    consent_timestamp: new Date().toISOString()
                })
                .eq('id', user.id)

            if (updateError) throw updateError

            router.push('/analyze')
        } catch (err: any) {
            setError(err.message || 'Failed to save consent. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#030303] p-4 relative overflow-hidden">
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-2xl bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl relative z-10"
            >
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                        <ShieldCheck className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Privacy & Data Consent</h1>
                        <p className="text-white/40 text-sm">Required for AI-powered matching</p>
                    </div>
                </div>

                <div className="space-y-6 mb-10">
                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                        <h2 className="text-white font-semibold flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-400" />
                            What we store
                        </h2>
                        <ul className="text-white/60 text-sm space-y-3 list-disc pl-5">
                            <li>Your uploaded CV/Resume data (text and structure)</li>
                            <li>Job descriptions and offers you provide</li>
                            <li>AI-generated analysis and matching results</li>
                            <li>Basic profile info (email, name)</li>
                        </ul>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                        <h2 className="text-white font-semibold flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-400" />
                            Why we store it
                        </h2>
                        <p className="text-white/60 text-sm leading-relaxed">
                            We store this data to provide and improve our AI matching engine.
                            This allows us to track your progress, refine keyword extraction,
                            and give you more accurate career advice over time.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10 space-y-4">
                        <h2 className="text-blue-400 font-semibold">Our Commitment</h2>
                        <p className="text-white/60 text-sm leading-relaxed">
                            Your data is encrypted and stored securely. We <span className="text-white font-medium">never</span> sell
                            or share your personal data with third parties for marketing purposes.
                            You can revoke this consent and request data deletion at any time.
                        </p>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                    </div>
                )}

                <div className="space-y-6">
                    <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative mt-1">
                            <input
                                type="checkbox"
                                className="peer sr-only"
                                checked={accepted}
                                onChange={(e) => setAccepted(e.target.checked)}
                            />
                            <div className="w-5 h-5 border-2 border-white/20 rounded-md bg-transparent peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-all" />
                            <Check className="absolute top-0.5 left-0.5 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-white/60 text-sm leading-relaxed group-hover:text-white/80 transition-colors">
                            I have read the Privacy Policy and I explicitly consent to the storage and processing of my CV and job data for AI matching purposes.
                        </span>
                    </label>

                    <button
                        onClick={handleAccept}
                        disabled={!accepted || isLoading}
                        className="w-full py-4 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
                    >
                        {isLoading ? (
                            <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto" />
                        ) : (
                            'Confirm & Continue'
                        )}
                    </button>
                </div>
            </motion.div>
        </div>
    )
}
