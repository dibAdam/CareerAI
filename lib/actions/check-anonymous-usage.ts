'use server';

import { cookies, headers } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { db } from '@/lib/db';
import { anonymousUsage } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { getClientFingerprint, generateAnonymousId } from '@/lib/hash-utils';

const ANON_COOKIE_NAME = 'career_ai_anon_id';
const MAX_ANONYMOUS_ATTEMPTS = 1;

export interface AnonymousUsageResult {
    allowed: boolean;
    remainingAttempts: number;
    reason?: string;
    anonymousId?: string;
}

/**
 * Check if an anonymous user can perform a CV analysis
 * 
 * Flow:
 * 1. Check if user is authenticated → Allow unlimited
 * 2. Check for existing cookie → Query database
 * 3. Fallback to fingerprint matching (catch cookie clearing)
 * 4. If no record found → Create new record, set cookie, allow
 * 5. If record found → Check attempt count
 */
export async function checkAnonymousUsage(): Promise<AnonymousUsageResult> {
    try {
        // 1. Check if user is logged in
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            // Authenticated users have unlimited access
            return { allowed: true, remainingAttempts: Infinity };
        }

        // 2. Get anonymous identifier from cookie
        const cookieStore = await cookies();
        let anonymousId = cookieStore.get(ANON_COOKIE_NAME)?.value;

        // 3. Generate fingerprint
        const headersList = await headers();
        const { ipHash, userAgentHash } = getClientFingerprint(headersList);

        // 4. Query database
        let usageRecord;

        if (anonymousId) {
            // Check by cookie ID (primary method)
            usageRecord = await db.query.anonymousUsage.findFirst({
                where: eq(anonymousUsage.anonymousId, anonymousId),
            });
        }

        // 5. Fallback: Check by fingerprint (catch cookie clearing)
        if (!usageRecord) {
            usageRecord = await db.query.anonymousUsage.findFirst({
                where: and(
                    eq(anonymousUsage.ipHash, ipHash),
                    eq(anonymousUsage.userAgentHash, userAgentHash)
                ),
            });

            // If found via fingerprint, restore the cookie
            if (usageRecord) {
                anonymousId = usageRecord.anonymousId;
                cookieStore.set(ANON_COOKIE_NAME, anonymousId, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax',
                    maxAge: 60 * 60 * 24 * 365, // 1 year
                    path: '/',
                });
            }
        }

        // 6. Evaluate usage
        if (usageRecord) {
            const remaining = MAX_ANONYMOUS_ATTEMPTS - usageRecord.attemptCount;

            if (remaining <= 0) {
                return {
                    allowed: false,
                    remainingAttempts: 0,
                    reason: 'Free analysis limit reached. Please sign in to continue.',
                };
            }

            return {
                allowed: true,
                remainingAttempts: remaining,
                anonymousId: usageRecord.anonymousId,
            };
        }

        // 7. No record found - create new anonymous user
        const newAnonymousId = generateAnonymousId();

        await db.insert(anonymousUsage).values({
            id: generateAnonymousId(), // Primary key
            anonymousId: newAnonymousId,
            ipHash,
            userAgentHash,
            attemptCount: 0,
        });

        // Set cookie
        cookieStore.set(ANON_COOKIE_NAME, newAnonymousId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 365, // 1 year
            path: '/',
        });

        return {
            allowed: true,
            remainingAttempts: MAX_ANONYMOUS_ATTEMPTS,
            anonymousId: newAnonymousId,
        };
    } catch (error) {
        console.error('Error checking anonymous usage:', error);
        // On error, allow the request (fail open for better UX)
        return {
            allowed: true,
            remainingAttempts: 1,
            reason: 'Unable to verify usage. Proceeding with caution.',
        };
    }
}
