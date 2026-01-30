import { pgTable, text, timestamp, integer, index } from 'drizzle-orm/pg-core';

/**
 * Anonymous usage tracking table
 * Tracks anonymous users who use the free CV analysis feature
 * 
 * Privacy: IP addresses are hashed (SHA-256) before storage
 * No personally identifiable information is stored
 */
export const anonymousUsage = pgTable(
    'anonymous_usage',
    {
        // Primary key (UUID v4)
        id: text('id').primaryKey(),

        // Anonymous identifier (stored in httpOnly cookie)
        anonymousId: text('anonymous_id').notNull().unique(),

        // Soft fingerprint (hashed for privacy)
        ipHash: text('ip_hash').notNull(),
        userAgentHash: text('user_agent_hash').notNull(),

        // Usage tracking
        attemptCount: integer('attempt_count').notNull().default(0),
        firstUsedAt: timestamp('first_used_at', { withTimezone: true }).notNull().defaultNow(),
        lastUsedAt: timestamp('last_used_at', { withTimezone: true }).notNull().defaultNow(),

        // Metadata
        createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
        updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
    },
    (table) => ({
        // Index for fast cookie-based lookups (primary flow)
        anonymousIdIdx: index('anonymous_id_idx').on(table.anonymousId),

        // Index for IP-based abuse detection
        ipHashIdx: index('ip_hash_idx').on(table.ipHash),

        // Composite index for fingerprint matching (catch cookie clearing)
        fingerprintIdx: index('fingerprint_idx').on(table.ipHash, table.userAgentHash),
    })
);

export type AnonymousUsage = typeof anonymousUsage.$inferSelect;
export type NewAnonymousUsage = typeof anonymousUsage.$inferInsert;
