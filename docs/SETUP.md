# Setup Guide - ATS CV Optimizer

Follow these steps to get the application running locally.

## Step 1: Install Dependencies

Already done! ✅

## Step 2: Set Up Supabase

### 2.1 Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Name**: `ats-cv-optimizer` (or any name)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to you
5. Click "Create new project" and wait ~2 minutes

### 2.2 Run the Database Schema

1. In your Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click "New Query"
3. Copy the entire contents of `supabase-schema.sql` from this project
4. Paste into the SQL editor
5. Click "Run" (or press Ctrl+Enter)
6. You should see: "Success. No rows returned"

### 2.3 Get Your Supabase Credentials

1. Go to **Project Settings** (gear icon in left sidebar)
2. Click **API** in the left menu
3. Copy these two values:
   - **Project URL** (under "Project URL")
   - **anon public** key (under "Project API keys")

## Step 3: Get OpenAI API Key

### 3.1 Create OpenAI Account

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up or log in
3. Go to **API Keys** section
4. Click "Create new secret key"
5. Give it a name (e.g., "ATS CV Optimizer")
6. Copy the key (you won't see it again!)

### 3.2 Add Credits (if needed)

- OpenAI requires a paid account for API access
- Go to **Billing** and add at least $5
- GPT-4o-mini is very cheap (~$0.15 per 1M input tokens)

## Step 4: Configure Environment Variables

1. In the project root, copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` in your editor

3. Fill in your credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   OPENAI_API_KEY=sk-your-openai-key-here
   ```

4. Save the file

## Step 5: Run the Application

```bash
npm run dev
```

The app should now be running at [http://localhost:3000](http://localhost:3000)

## Step 6: Test the Application

1. Open [http://localhost:3000](http://localhost:3000)
2. Upload a sample CV (PDF or paste text)
3. Paste a job description
4. Click "Analyze CV"
5. Wait ~10-30 seconds for AI analysis
6. View your results!

## Troubleshooting

### Error: "Missing Supabase environment variables"

- Make sure `.env` file exists in project root
- Check that variable names match exactly
- Restart the dev server after changing `.env`

### Error: "Failed to extract text from PDF"

- Ensure the PDF contains selectable text (not scanned images)
- Try pasting CV text directly instead

### Error: "Failed to analyze CV"

- Check your OpenAI API key is valid
- Ensure you have credits in your OpenAI account
- Check the console for detailed error messages

### Database Errors

- Verify the SQL schema was run successfully in Supabase
- Check that both tables (`analyses` and `analysis_sections`) exist
- Go to Supabase Dashboard → Table Editor to verify

## Next Steps

Once everything is working:

1. **Test with real CVs**: Try different CV formats and job descriptions
2. **Review AI output**: Check if the feedback is helpful and accurate
3. **Customize prompts**: Edit `lib/aiAnalyze.ts` to adjust AI behavior
4. **Deploy**: Follow deployment guide in README.md

## Need Help?

- Check the main README.md for more details
- Review the code comments for implementation details
- Open an issue on GitHub if you encounter problems
