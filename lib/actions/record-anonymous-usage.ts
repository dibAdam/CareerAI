'use server';

import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { db } from '@/lib/db';
import { anonymousUsage } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';

const ANON_COOKIE_NAME = 'career_ai_anon_id';

export interface RecordUsageResult {
    success: boolean;
    error?: string;
}

/**
 * Record an anonymous usage attempt
 * Increments the attempt count after a successful analysis
 * 
 * Should be called AFTER the analysis completes successfully
 */
export async function recordAnonymousUsage(): Promise<RecordUsageResult> {
    try {
        // 1. Verify user is anonymous (not logged in)
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            // Logged-in users don't need usage tracking
            return { success: true };
        }

        // 2. Get anonymous ID from cookie
        const cookieStore = await cookies();
        const anonymousId = cookieStore.get(ANON_COOKIE_NAME)?.value;

        if (!anonymousId) {
            return {
                success: false,
                error: 'No anonymous ID found. Please refresh and try again.',
            };
        }

        // 3. Increment attempt count using SQL
        const result = await db
            .update(anonymousUsage)
            .set({
                attemptCount: sql`${anonymousUsage.attemptCount} + 1`,
                lastUsedAt: new Date(),
                updatedAt: new Date(),
            })
            .where(eq(anonymousUsage.anonymousId, anonymousId))
            .returning();

        if (!result || result.length === 0) {
            return {
                success: false,
                error: 'Failed to update usage record.',
            };
        }

        return { success: true };
    } catch (error) {
        console.error('Error recording anonymous usage:', error);
        return {
            success: false,
            error: 'Failed to record usage. Please try again.',
        };
    }
}

/**
 * Clear anonymous usage cookie
 * Should be called after user logs in
 */
export async function clearAnonymousCookie(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(ANON_COOKIE_NAME);
}
