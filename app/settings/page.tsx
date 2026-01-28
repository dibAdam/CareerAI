'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { Trash2, ShieldOff, AlertTriangle, CheckCircle2, LogOut } from 'lucide-react'
import { deleteAccountAction } from '@/app/actions/deleteAccount'

export default function SettingsPage() {
    const [profile, setProfile] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isActionLoading, setIsActionLoading] = useState<string | null>(null)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        async function getProfile() {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                router.push('/login')
                return
            }

            const { data } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single()

            setProfile(data)
            setIsLoading(false)
        }
        getProfile()
    }, [supabase, router])

    const handleRevokeConsent = async () => {
        if (!confirm('Are you sure you want to revoke consent? This will limit your access to AI features.')) return

        setIsActionLoading('revoke')
        const { error } = await supabase
            .from('profiles')
            .update({ consent_accepted: false, consent_timestamp: null })
            .eq('id', profile.id)

        if (error) {
            setMessage({ type: 'error', text: error.message })
        } else {
            setMessage({ type: 'success', text: 'Consent revoked successfully.' })
            setProfile({ ...profile, consent_accepted: false })
            router.push('/consent')
        }
        setIsActionLoading(null)
    }

    const handleDeleteData = async () => {
        if (!confirm('CRITICAL: This will permanently delete all your CV analyses and profile data. This cannot be undone. Proceed?')) return

        setIsActionLoading('delete')
        const result = await deleteAccountAction()

        if (!result.success) {
            setMessage({ type: 'error', text: result.error || 'Failed to delete account' })
            setIsActionLoading(null)
            return
        }

        router.push('/')
    }

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push('/')
    }

    if (isLoading) return <div className="min-h-screen bg-[#030303] flex items-center justify-center text-white/40">Loading settings...</div>

    return (
        <div className="min-h-screen bg-[#030303] text-white p-6 md:p-12">
            <div className="max-w-3xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-bold mb-2">Settings</h1>
                    <p className="text-white/40">Manage your account, privacy, and data.</p>
                </header>

                {message && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mb-8 p-4 rounded-xl flex items-center gap-3 ${message.type === 'success' ? 'bg-green-500/10 border border-green-500/20 text-green-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'
                            }`}
                    >
                        {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                        {message.text}
                    </motion.div>
                )}

                <div className="space-y-8">
                    <section className="p-8 rounded-3xl bg-white/5 border border-white/10">
                        <h2 className="text-xl font-semibold mb-6">Account</h2>
                        <div className="flex items-center gap-4 mb-8">
                            {profile?.avatar_url ? (
                                <Image
                                    src={profile.avatar_url}
                                    alt={profile.full_name || 'Avatar'}
                                    width={64}
                                    height={64}
                                    className="w-16 h-16 rounded-full border-2 border-white/10 object-cover"
                                />
                            ) : (
                                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-2xl font-bold">
                                    {profile?.full_name?.[0] || profile?.email?.[0]}
                                </div>
                            )}
                            <div>
                                <p className="font-medium text-lg">{profile?.full_name || 'User'}</p>
                                <p className="text-white/40 text-sm">{profile?.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-sm"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </section>

                    <section className="p-8 rounded-3xl bg-white/5 border border-white/10">
                        <h2 className="text-xl font-semibold mb-6">Privacy & Consent</h2>
                        <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                            <div>
                                <p className="font-medium">AI Data Processing</p>
                                <p className="text-white/40 text-sm">You have consented to AI analysis of your CV data.</p>
                                {profile?.consent_timestamp && (
                                    <p className="text-white/20 text-[10px] mt-1">Accepted on: {new Date(profile.consent_timestamp).toLocaleString()}</p>
                                )}
                            </div>
                            <button
                                onClick={handleRevokeConsent}
                                disabled={isActionLoading === 'revoke' || !profile?.consent_accepted}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/20 text-yellow-400 transition-colors text-sm disabled:opacity-50"
                            >
                                <ShieldOff className="w-4 h-4" />
                                {isActionLoading === 'revoke' ? 'Revoking...' : 'Revoke'}
                            </button>
                        </div>
                    </section>

                    <section className="p-8 rounded-3xl bg-red-500/5 border border-red-500/10">
                        <h2 className="text-xl font-semibold text-red-400 mb-2">Danger Zone</h2>
                        <p className="text-white/40 text-sm mb-6">Permanently delete your account and all associated data.</p>

                        <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20">
                            <h3 className="font-bold text-red-400 mb-2 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4" />
                                Delete Account
                            </h3>
                            <p className="text-red-400/60 text-sm mb-6">
                                This action is irreversible. All your analyses, CV data, and profile information will be wiped from our servers in compliance with GDPR &quot;Right to be Forgotten&quot;.
                            </p>
                            <button
                                onClick={handleDeleteData}
                                disabled={isActionLoading === 'delete'}
                                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold transition-all active:scale-[0.98] disabled:opacity-50"
                            >
                                <Trash2 className="w-5 h-5" />
                                {isActionLoading === 'delete' ? 'Deleting...' : 'Delete All My Data'}
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
