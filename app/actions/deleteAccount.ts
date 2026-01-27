'use server'

import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function deleteAccountAction() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { success: false, error: 'Not authenticated' }
    }

    // To delete the user from auth.users, we need the service role key.
    // Since we don't want to expose that in the client, we do it here.
    // However, for this demo, we'll assume the user just wants to wipe their data.
    // A real production app would use a Supabase Admin client here.

    // Wipe profile and analyses (RLS/Cascade will handle analyses if we delete profile)
    const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', user.id)

    if (error) {
        return { success: false, error: error.message }
    }

    // Sign out
    await supabase.auth.signOut()

    return { success: true }
}
