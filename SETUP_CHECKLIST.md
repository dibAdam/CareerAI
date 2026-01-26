# 🔧 Quick Setup Checklist

Run through this checklist to ensure everything is configured correctly.

## ✅ Environment Variables

Check your `.env.local` file has these variables:

```bash
# Required
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
OPENAI_API_KEY=sk-...

# Optional
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## ✅ Supabase Database

1. **Tables Created**:
   - [ ] `analyses` table exists
   - [ ] `analysis_sections` table exists

2. **RLS Policies Enabled**:
   - [ ] Public read access on `analyses`
   - [ ] Public insert access on `analyses`
   - [ ] Public read access on `analysis_sections`
   - [ ] Public insert access on `analysis_sections`

3. **Test Query** (run in Supabase SQL Editor):
   ```sql
   SELECT COUNT(*) FROM analyses;
   ```
   Should return `0` (or number of existing analyses)

## ✅ Dependencies Installed

```bash
npm install
```

Should have these packages:
- `@supabase/supabase-js`
- `openai` (or your chosen AI SDK)
- `next`
- `react`
- `react-dom`

## ✅ Development Server

```bash
npm run dev
```

Should start on [http://localhost:3000](http://localhost:3000)

## ✅ Test the Application

1. **Landing Page**:
   - [ ] Loads without errors
   - [ ] Navigation works
   - [ ] Buttons are clickable

2. **Analyze Page**:
   - [ ] Can paste job description
   - [ ] Can upload CV or paste text
   - [ ] "Analyze CV" button appears

3. **Full Test**:
   - [ ] Paste a sample job description
   - [ ] Paste sample CV text
   - [ ] Click "Analyze CV"
   - [ ] Wait for analysis
   - [ ] Redirects to results page
   - [ ] Results display correctly

4. **Verify in Supabase**:
   - [ ] Go to Supabase Table Editor
   - [ ] Check `analyses` table
   - [ ] Should see your test analysis
   - [ ] Check `analysis_sections` table
   - [ ] Should see related sections

## 🐛 Common Issues

### Issue: "Supabase client not initialized"
**Fix**: Check `.env.local` has correct Supabase URL and anon key

### Issue: "OpenAI API error"
**Fix**: Verify your OpenAI API key is valid and has credits

### Issue: "Table does not exist"
**Fix**: Run the SQL script from `SUPABASE_SETUP.md` in Supabase SQL Editor

### Issue: "CORS error"
**Fix**: Ensure you're using `NEXT_PUBLIC_` prefix for client-side env vars

### Issue: "Analysis not saving"
**Fix**: Check RLS policies are enabled and allow public insert

## 📊 Sample Test Data

### Sample Job Description:
```
Senior Software Engineer at TechCorp

We are seeking an experienced software engineer to join our team.

Requirements:
- 5+ years of software development experience
- Strong proficiency in Python and JavaScript
- Experience with React and Node.js
- Knowledge of AWS cloud services
- Excellent problem-solving skills
- Bachelor's degree in Computer Science or related field

Responsibilities:
- Design and develop scalable web applications
- Collaborate with cross-functional teams
- Write clean, maintainable code
- Participate in code reviews
- Mentor junior developers
```

### Sample CV Text:
```
John Doe
Software Engineer

EXPERIENCE
Software Developer at StartupXYZ (2020-2024)
- Developed web applications using React and Node.js
- Worked with AWS services including EC2 and S3
- Collaborated with team of 5 developers
- Implemented CI/CD pipelines

Junior Developer at CompanyABC (2018-2020)
- Built features using JavaScript and Python
- Fixed bugs and improved code quality
- Participated in agile development process

EDUCATION
Bachelor of Science in Computer Science
University of Technology (2014-2018)

SKILLS
JavaScript, Python, React, Node.js, AWS, Git, SQL
```

## ✅ Production Checklist

Before deploying to production:

- [ ] Remove console.log statements
- [ ] Add proper error handling
- [ ] Set up error tracking (Sentry)
- [ ] Add analytics (Google Analytics)
- [ ] Configure proper CORS
- [ ] Set up rate limiting
- [ ] Add monitoring (Vercel Analytics)
- [ ] Test on mobile devices
- [ ] Optimize images
- [ ] Add meta tags for SEO
- [ ] Set up custom domain
- [ ] Configure SSL certificate
- [ ] Add privacy policy
- [ ] Add terms of service

## 🚀 You're Ready!

If all checkboxes are checked, your application is ready to use!

**Next Steps**:
1. Test with real data
2. Share with friends for feedback
3. Deploy to production
4. Add more features

---

Need help? Check `SUPABASE_SETUP.md` for detailed instructions.
