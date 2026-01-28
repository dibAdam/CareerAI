'use server'

import { createClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'
import { profiles } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function deleteAccountAction() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { success: false, error: 'Not authenticated' }
    }

    try {
        // Wipe profile (Cascade in DB handles analyses and sections)
        await db.delete(profiles).where(eq(profiles.id, user.id))

        // Sign out
        await supabase.auth.signOut()

        return { success: true }
    } catch (error: any) {
        console.error('Delete account error:', error)
        return { success: false, error: error.message || 'Failed to delete account' }
    }
}
