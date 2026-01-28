# 🚀 Quick Start Guide

Get Nextrova running in 5 minutes!

## Prerequisites

- Node.js 18+ installed ✓ (already done)
- npm installed ✓ (already done)
- Dependencies installed ✓ (already done)

## What You Need

1. **Supabase Account** (free) - [Sign up here](https://supabase.com)
2. **OpenAI API Key** (paid, ~$5 minimum) - [Get key here](https://platform.openai.com)

## Setup Steps

### 1. Create Supabase Project (2 minutes)

```
1. Go to supabase.com → Sign up/Login
2. Click "New Project"
3. Name it "nextrova"
4. Set a database password (save it!)
5. Choose your region
6. Wait ~2 minutes for setup
```

### 2. Run Database Schema (1 minute)

```
1. In Supabase dashboard → SQL Editor
2. Click "New Query"
3. Copy ALL content from: supabase-schema.sql
4. Paste and click "Run"
5. Should see: "Success. No rows returned"
```

### 3. Get Supabase Credentials (30 seconds)

```
1. Supabase dashboard → Settings (gear icon)
2. Click "API"
3. Copy:
   - Project URL
   - anon public key
```

### 4. Get OpenAI API Key (1 minute)

```
1. Go to platform.openai.com
2. Sign up/Login
3. Go to API Keys
4. Click "Create new secret key"
5. Copy the key (you won't see it again!)
6. Add $5+ credits in Billing section
```

### 5. Configure Environment (30 seconds)

Create a `.env` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
OPENAI_API_KEY=sk-proj-...
```

### 6. Run the App! (10 seconds)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Test It Out

1. **Upload a CV**: Use PDF or paste text
2. **Paste a job description**: Copy from any job board
3. **Click "Analyze CV"**
4. **Wait ~10-30 seconds**
5. **View your results!**

## 🎉 You're Done!

The app is now running locally. Try analyzing a real CV!

## Troubleshooting

**"Missing Supabase environment variables"**
- Check `.env` file exists in project root
- Restart dev server: Ctrl+C, then `npm run dev`

**"Failed to analyze CV"**
- Verify OpenAI API key is correct
- Check you have credits ($5+) in OpenAI account

**Database errors**
- Make sure you ran the SQL schema in Supabase
- Check both tables exist: `analyses` and `analysis_sections`

## Next Steps

- Read `README.md` for full documentation
- Read `IMPLEMENTATION.md` for technical details
- Read `SETUP.md` for detailed setup guide

---

**Need help?** Check the detailed guides or open an issue on GitHub.
