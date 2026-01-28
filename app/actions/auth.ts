'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function signUpAction(formData: FormData): Promise<{ error?: string; success?: boolean; message?: string }> {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string
    const supabase = await createClient()

    // Server-side validation
    if (password !== confirmPassword) {
        return { error: 'Passwords do not match' }
    }

    if (password.length < 8) {
        return { error: 'Password must be at least 8 characters long' }
    }

    const hasUpper = /[A-Z]/.test(password)
    const hasLower = /[a-z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    if (!hasUpper || !hasLower || !hasNumber || !hasSpecial) {
        return { error: 'Password must include uppercase, lowercase, number, and special character' }
    }

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
        },
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/', 'layout')
    return { success: true, message: 'Account created! Please check your email to confirm, then you\'ll be asked to accept our privacy terms.' }
}

export async function signInAction(formData: FormData): Promise<{ error?: string; success?: boolean }> {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/', 'layout')
    return { success: true }
}
