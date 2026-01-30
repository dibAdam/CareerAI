import { pgTable, text, timestamp, uuid, integer, boolean } from 'drizzle-orm/pg-core';

export * from './anonymous-usage';

export const profiles = pgTable('profiles', {
    id: uuid('id').primaryKey().notNull(),
    fullName: text('full_name'),
    avatarUrl: text('avatar_url'),
    email: text('email').unique().notNull(),
    provider: text('provider'),
    consentAccepted: boolean('consent_accepted').default(false),
    consentTimestamp: timestamp('consent_timestamp', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const analyses = pgTable('analyses', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').references(() => profiles.id, { onDelete: 'cascade' }),
    jobTitle: text('job_title').notNull(),
    company: text('company'),
    jobDescription: text('job_description').notNull(),
    cvText: text('cv_text').notNull(),
    matchScore: integer('match_score'),
    potentialScore: integer('potential_score'),
    summary: text('summary'),
    missingKeywords: text('missing_keywords').array(),
    priorityActions: text('priority_actions').array(),
    atsTips: text('ats_tips').array(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const analysisSections = pgTable('analysis_sections', {
    id: uuid('id').primaryKey().defaultRandom(),
    analysisId: uuid('analysis_id').notNull().references(() => analyses.id, { onDelete: 'cascade' }),
    section: text('section').notNull(),
    feedback: text('feedback').notNull(),
    priority: text('priority'), // 'high' | 'medium' | 'low'
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});
