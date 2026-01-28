# 🚀 Supabase Integration Guide

## Overview

This guide will help you set up Supabase for the Nextrova application.

## Prerequisites

- A Supabase account (free tier works fine)
- Node.js installed
- This project cloned/downloaded

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click **"New Project"**
4. Fill in:
   - **Name**: `nextrova` (or your choice)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users
5. Click **"Create new project"**
6. Wait 2-3 minutes for setup to complete

## Step 2: Get Your API Keys

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: `eyJhbGc...` (long string)

## Step 3: Set Up Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. Add your AI API key (choose one):
   ```env
   OPENAI_API_KEY=sk-your-openai-api-key-here
   ```

## Step 4: Create Database Tables

Run this SQL in your Supabase SQL Editor (**SQL Editor** in sidebar):

```sql
-- ============================================
-- ANALYSES TABLE
-- Stores CV analysis results
-- ============================================
CREATE TABLE analyses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Job Information
    job_title TEXT NOT NULL,
    company TEXT NOT NULL,
    job_description TEXT NOT NULL,
    job_url TEXT,
    
    -- CV Information
    cv_text TEXT NOT NULL,
    
    -- Analysis Results
    match_score INTEGER CHECK (match_score >= 0 AND match_score <= 100),
    summary TEXT,
    missing_keywords TEXT[], -- Array of missing keywords
    priority_actions TEXT[], -- Array of priority actions
    ats_tips TEXT[], -- Array of ATS tips
    
    -- Metadata
    analysis_duration_ms INTEGER,
    ai_model TEXT DEFAULT 'gpt-4'
);

-- ============================================
-- ANALYSIS_SECTIONS TABLE
-- Stores detailed feedback for each CV section
-- ============================================
CREATE TABLE analysis_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    analysis_id UUID REFERENCES analyses(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Section Information
    section TEXT NOT NULL, -- e.g., 'summary', 'skills', 'experience'
    feedback TEXT NOT NULL,
    priority TEXT CHECK (priority IN ('high', 'medium', 'low')),
    score INTEGER CHECK (score >= 0 AND score <= 100)
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX idx_analyses_created_at ON analyses(created_at DESC);
CREATE INDEX idx_analysis_sections_analysis_id ON analysis_sections(analysis_id);
CREATE INDEX idx_analysis_sections_priority ON analysis_sections(priority);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- Enable public read access (no auth required for demo)
-- ============================================
ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE analysis_sections ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read analyses
CREATE POLICY "Allow public read access to analyses"
    ON analyses FOR SELECT
    TO anon
    USING (true);

-- Allow anyone to insert analyses
CREATE POLICY "Allow public insert access to analyses"
    ON analyses FOR INSERT
    TO anon
    WITH CHECK (true);

-- Allow anyone to read analysis sections
CREATE POLICY "Allow public read access to analysis_sections"
    ON analysis_sections FOR SELECT
    TO anon
    USING (true);

-- Allow anyone to insert analysis sections
CREATE POLICY "Allow public insert access to analysis_sections"
    ON analysis_sections FOR INSERT
    TO anon
    WITH CHECK (true);

-- ============================================
-- UPDATED_AT TRIGGER
-- Automatically update the updated_at timestamp
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_analyses_updated_at
    BEFORE UPDATE ON analyses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

## Step 5: Verify Database Setup

1. Go to **Table Editor** in Supabase
2. You should see two tables:
   - `analyses`
   - `analysis_sections`
3. Click on each table to verify the columns are created

## Step 6: Test the Connection

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Go to [http://localhost:3000](http://localhost:3000)
3. Try analyzing a CV
4. Check Supabase **Table Editor** → `analyses` to see if data was saved

## Step 7: Get an AI API Key

### Option 1: OpenAI (Recommended)

1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Click **"Create new secret key"**
4. Copy the key (starts with `sk-`)
5. Add to `.env.local`:
   ```env
   OPENAI_API_KEY=sk-your-key-here
   ```

**Cost**: ~$0.01-0.05 per analysis (very cheap)

### Option 2: Google Gemini (Free Alternative)

1. Go to [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
2. Click **"Create API Key"**
3. Copy the key
4. Add to `.env.local`:
   ```env
   GOOGLE_AI_API_KEY=your-key-here
   ```

**Cost**: Free tier available

## Troubleshooting

### Error: "Failed to fetch"
- Check your Supabase URL and anon key are correct
- Verify RLS policies are enabled
- Check browser console for CORS errors

### Error: "Invalid API key"
- Verify your AI API key is correct
- Check for extra spaces or quotes
- Make sure the key hasn't expired

### Error: "Table does not exist"
- Run the SQL script again in Supabase SQL Editor
- Verify you're in the correct project
- Check the table names match exactly

### Data not saving
- Check Supabase **Logs** for errors
- Verify RLS policies allow inserts
- Check browser network tab for failed requests

## Database Schema Diagram

```
┌─────────────────────────────────────┐
│           analyses                  │
├─────────────────────────────────────┤
│ id (UUID, PK)                       │
│ created_at                          │
│ updated_at                          │
│ job_title                           │
│ company                             │
│ job_description                     │
│ job_url                             │
│ cv_text                             │
│ match_score (0-100)                 │
│ summary                             │
│ missing_keywords (array)            │
│ priority_actions (array)            │
│ ats_tips (array)                    │
│ analysis_duration_ms                │
│ ai_model                            │
└─────────────────────────────────────┘
                │
                │ 1:N
                ▼
┌─────────────────────────────────────┐
│       analysis_sections             │
├─────────────────────────────────────┤
│ id (UUID, PK)                       │
│ analysis_id (UUID, FK)              │
│ created_at                          │
│ section (text)                      │
│ feedback (text)                     │
│ priority (high/medium/low)          │
│ score (0-100)                       │
└─────────────────────────────────────┘
```

## Security Notes

### Current Setup (Demo Mode)
- **Public access**: Anyone can read/write
- **No authentication**: Perfect for demos
- **No user data**: No personal info stored

### For Production
If you want to add authentication later:

1. Remove the public RLS policies
2. Add user authentication (Supabase Auth)
3. Create user-specific RLS policies
4. Add user_id column to analyses table

## Next Steps

1. ✅ Set up Supabase project
2. ✅ Create database tables
3. ✅ Add environment variables
4. ✅ Get AI API key
5. ✅ Test the application
6. 🚀 Deploy to production (optional)

## Production Deployment

When ready to deploy:

1. **Vercel** (Recommended):
   - Connect your GitHub repo
   - Add environment variables in Vercel dashboard
   - Deploy automatically

2. **Netlify**:
   - Similar to Vercel
   - Add env vars in Netlify dashboard

3. **Your own server**:
   - Build: `npm run build`
   - Start: `npm start`
   - Use PM2 or similar for process management

## Support

If you need help:
- Check Supabase docs: [https://supabase.com/docs](https://supabase.com/docs)
- OpenAI docs: [https://platform.openai.com/docs](https://platform.openai.com/docs)
- This project's issues on GitHub

---

**You're all set!** 🎉 Your Nextrova is now connected to Supabase and ready to analyze CVs!
