'use client'

import { useState, useTransition, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Github, Mail, Lock, UserPlus, LogIn, ArrowRight, Check, X, ShieldCheck, ShieldAlert } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { signInAction, signUpAction } from '@/app/actions/auth'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState<string | null>(null)
    const [mode, setMode] = useState<'login' | 'signup'>('login')
    const [error, setError] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()

    // Password validation state
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [strength, setStrength] = useState({
        length: false,
        upper: false,
        lower: false,
        number: false,
        special: false,
        match: false
    })

    const supabase = createClient()
    const router = useRouter()

    useEffect(() => {
        setStrength({
            length: password.length >= 8,
            upper: /[A-Z]/.test(password),
            lower: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
            match: mode === 'signup' ? (password === confirmPassword && password !== '') : true
        })
    }, [password, confirmPassword, mode])

    const strengthScore = Object.values(strength).filter(Boolean).length
    const isPasswordStrong = strengthScore >= 5 // All requirements met (excluding match for score)
    const canSubmit = mode === 'login' || (isPasswordStrong && strength.match)

    const handleOAuthLogin = async (provider: 'google' | 'github') => {
        setIsLoading(provider)
        setError(null)
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        })

        if (error) {
            setError(error.message)
            setIsLoading(null)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!canSubmit) return

        setError(null)
        setMessage(null)
        setIsLoading('email')

        const formData = new FormData(e.currentTarget)

        startTransition(async () => {
            const result = mode === 'login'
                ? await signInAction(formData)
                : await signUpAction(formData)

            if (result.error) {
                setError(result.error)
                setIsLoading(null)
            } else {
                if (mode === 'signup' && 'message' in result) {
                    setMessage(result.message as string)
                    setIsLoading(null)
                } else {
                    router.push('/')
                    router.refresh()
                }
            }
        })
    }

    const Requirement = ({ met, text }: { met: boolean, text: string }) => (
        <div className={`flex items-center gap-2 text-[11px] transition-colors ${met ? 'text-green-400' : 'text-white/20'}`}>
            {met ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
            {text}
        </div>
    )

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#030303] relative overflow-hidden p-4">
            {/* Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl relative z-10"
            >
                <div className="text-center mb-8">
                    <motion.h1
                        layout
                        className="text-3xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent mb-2"
                    >
                        {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                    </motion.h1>
                    <motion.p layout className="text-white/40">
                        {mode === 'login'
                            ? 'Sign in to continue your career journey'
                            : 'Join CareerAI to optimize your professional path'}
                    </motion.p>
                </div>

                <AnimatePresence mode="wait">
                    {(error || message) && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className={`mb-6 p-4 rounded-xl border text-sm overflow-hidden ${error ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-green-500/10 border-green-500/20 text-green-400'
                                }`}
                        >
                            {error || message}
                        </motion.div>
                    )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-white/40 ml-1 uppercase tracking-wider">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-blue-400 transition-colors" />
                            <input
                                name="email"
                                type="email"
                                required
                                placeholder="name@example.com"
                                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:bg-white/10 outline-none transition-all text-white placeholder:text-white/20"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-medium text-white/40 ml-1 uppercase tracking-wider">Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-blue-400 transition-colors" />
                            <input
                                name="password"
                                type="password"
                                required
                                value={password}
                                autoComplete="new-password"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:bg-white/10 outline-none transition-all text-white placeholder:text-white/20"
                            />
                        </div>

                        {mode === 'signup' && (
                            <div className="px-1 pt-1 space-y-3">
                                <div className="flex gap-1 h-1">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div
                                            key={i}
                                            className={`flex-1 rounded-full transition-all duration-500 ${i <= strengthScore - (strength.match ? 0 : 0) // match doesn't count for strength
                                                ? strengthScore >= 5 ? 'bg-green-500' : strengthScore >= 3 ? 'bg-yellow-500' : 'bg-red-500'
                                                : 'bg-white/5'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <div className="grid grid-cols-2 gap-y-1.5">
                                    <Requirement met={strength.length} text="8+ characters" />
                                    <Requirement met={strength.upper} text="Uppercase letter" />
                                    <Requirement met={strength.lower} text="Lowercase letter" />
                                    <Requirement met={strength.number} text="One number" />
                                    <Requirement met={strength.special} text="Special character" />
                                </div>
                            </div>
                        )}
                    </div>

                    <AnimatePresence>
                        {mode === 'signup' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-2 overflow-hidden"
                            >
                                <label className="text-xs font-medium text-white/40 ml-1 uppercase tracking-wider">Confirm Password</label>
                                <div className="relative group">
                                    <ShieldCheck className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${confirmPassword === '' ? 'text-white/20' : strength.match ? 'text-green-400' : 'text-red-400'
                                        }`} />
                                    <input
                                        name="confirmPassword"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className={`w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border transition-all text-white placeholder:text-white/20 outline-none ${confirmPassword === '' ? 'border-white/10' : strength.match ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'
                                            }`}
                                    />
                                </div>
                                {confirmPassword !== '' && !strength.match && (
                                    <p className="text-[10px] text-red-400 ml-1">Passwords do not match</p>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button
                        type="submit"
                        disabled={!!isLoading || isPending || !canSubmit}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20 mt-4"
                    >
                        {isLoading === 'email' ? (
                            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                {mode === 'login' ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                                {mode === 'login' ? 'Sign In' : 'Create Account'}
                            </>
                        )}
                    </button>
                </form>

                <div className="relative mb-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/5"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-[#030303] px-4 text-white/20 tracking-widest">Or continue with</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => handleOAuthLogin('google')}
                        disabled={!!isLoading}
                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                        {isLoading === 'google' ? (
                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        ) : (
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                        )}
                        <span className="text-sm font-medium">Google</span>
                    </button>

                    <button
                        onClick={() => handleOAuthLogin('github')}
                        disabled={!!isLoading}
                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                        {isLoading === 'github' ? (
                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Github className="w-4 h-4" />
                        )}
                        <span className="text-sm font-medium">GitHub</span>
                    </button>
                </div>

                <div className="mt-8 text-center">
                    <button
                        onClick={() => {
                            setMode(mode === 'login' ? 'signup' : 'login')
                            setError(null)
                            setMessage(null)
                        }}
                        className="text-sm text-white/40 hover:text-white transition-colors flex items-center justify-center gap-2 mx-auto group"
                    >
                        {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
                        <span className="text-blue-400 font-semibold group-hover:underline flex items-center gap-1">
                            {mode === 'login' ? 'Sign Up' : 'Sign In'}
                            <ArrowRight className="w-3 h-3" />
                        </span>
                    </button>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5">
                    <p className="text-center text-[10px] text-white/20 leading-relaxed uppercase tracking-widest">
                        Secure Authentication by Supabase
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
