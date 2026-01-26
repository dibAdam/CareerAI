<<<<<<< HEAD
# 🚀 ATS CV Optimizer

An AI-powered tool that analyzes your CV against job descriptions and provides actionable feedback to help you pass Applicant Tracking Systems (ATS).

![Professional CV Analysis](https://img.shields.io/badge/AI-Powered-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Supabase](https://img.shields.io/badge/Supabase-Database-green)

## ✨ Features

- **LinkedIn URL Support**: Paste a LinkedIn job URL and we'll extract the details automatically
- **Multiple AI Models**: Choose from 30+ models via OpenRouter (Claude, GPT-4, Gemini, Llama, etc.)
- **AI-Powered Analysis**: Get detailed feedback using your preferred AI model
- **Match Score**: See how well your CV matches the job (0-100%)
- **Missing Keywords**: Identify critical terms you're missing
- **Section Feedback**: Detailed analysis of each CV section
- **Priority Actions**: Know exactly what to fix first
- **ATS Tips**: Expert advice for optimization
- **No Login Required**: Demo mode for instant testing

## 🎨 Design

- **Professional**: Clean, corporate-appropriate design
- **Modern**: Latest design trends and best practices
- **Responsive**: Works perfectly on all devices
- **Fast**: Optimized for performance
- **Accessible**: WCAG compliant

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **AI**: OpenRouter (Claude 3.5, GPT-4, Gemini, Llama, etc.)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)
- An OpenRouter API key (get $1 free credit)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd careerAi
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your credentials:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# OpenRouter
OPENROUTER_API_KEY=sk-or-v1-your-key
OPENROUTER_MODEL=anthropic/claude-3.5-sonnet
```

### 4. Set Up Supabase Database

Follow the detailed guide in [`SUPABASE_SETUP.md`](./SUPABASE_SETUP.md)

**Quick version**:
1. Create a Supabase project
2. Run the SQL script from `SUPABASE_SETUP.md` in SQL Editor
3. Verify tables are created

### 5. Get OpenRouter API Key

Follow the guide in [`OPENROUTER_SETUP.md`](./OPENROUTER_SETUP.md)

**Quick version**:
1. Go to [https://openrouter.ai/keys](https://openrouter.ai/keys)
2. Create an API key
3. Add to `.env.local`

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 7. Test the Application

Use the sample data from [`SETUP_CHECKLIST.md`](./SETUP_CHECKLIST.md) to test

## 📚 Documentation

- **[OPENROUTER_SETUP.md](./OPENROUTER_SETUP.md)**: OpenRouter API key and model selection
- **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)**: Complete Supabase integration guide
- **[SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)**: Quick setup verification checklist
- **[PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)**: Project architecture and details

## 🏗️ Project Structure

```
careerAi/
├── app/
│   ├── landing/          # Landing page
│   ├── analyze/          # CV analysis page
│   ├── results/[id]/     # Results display page
│   ├── actions/          # Server actions
│   └── layout.tsx        # Root layout
├── components/
│   ├── UploadCV.tsx      # CV upload component
│   ├── JobInput.tsx      # Job description input
│   ├── MatchScore.tsx    # Score display
│   ├── ReportCard.tsx    # Feedback cards
│   └── SectionFeedback.tsx # Section analysis
├── lib/
│   ├── supabase.ts       # Supabase client
│   ├── openai.ts         # OpenAI client
│   └── scrapeLinkedIn.ts # LinkedIn scraper
└── public/               # Static assets
```

## 🔑 Environment Variables

### Required

```env
NEXT_PUBLIC_SUPABASE_URL=      # Your Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY= # Your Supabase anon key
OPENROUTER_API_KEY=            # Your OpenRouter API key
```

### Optional

```env
OPENROUTER_MODEL=              # AI model to use (default: claude-3.5-sonnet)
NEXT_PUBLIC_APP_URL=           # Your app URL (for production)
NEXT_PUBLIC_GA_ID=             # Google Analytics ID
SENTRY_DSN=                    # Error tracking
```

### Available Models (via OpenRouter)

- `anthropic/claude-3.5-sonnet` - Best quality (default)
- `anthropic/claude-3-haiku` - Fast & cheap
- `openai/gpt-4-turbo` - GPT-4 Turbo
- `openai/gpt-3.5-turbo` - Cheapest option
- `google/gemini-pro-1.5` - Free tier available
- `meta-llama/llama-3.1-70b-instruct` - Open source

See all models: [https://openrouter.ai/models](https://openrouter.ai/models)

## 🗄️ Database Schema

### `analyses` Table
Stores CV analysis results

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| job_title | TEXT | Job title |
| company | TEXT | Company name |
| job_description | TEXT | Full job description |
| cv_text | TEXT | CV content |
| match_score | INTEGER | 0-100 match score |
| summary | TEXT | Analysis summary |
| missing_keywords | TEXT[] | Array of missing keywords |
| priority_actions | TEXT[] | Array of actions |
| ats_tips | TEXT[] | Array of tips |

### `analysis_sections` Table
Stores section-by-section feedback

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| analysis_id | UUID | Foreign key to analyses |
| section | TEXT | Section name |
| feedback | TEXT | Detailed feedback |
| priority | TEXT | high/medium/low |
| score | INTEGER | 0-100 section score |

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

```bash
# Or use Vercel CLI
npm install -g vercel
vercel
```

### Other Platforms

- **Netlify**: Similar to Vercel
- **Railway**: Good for full-stack apps
- **Your own server**: `npm run build && npm start`

## 🧪 Testing

### Manual Testing

1. Go to `/analyze`
2. Paste sample job description
3. Upload sample CV
4. Click "Analyze CV"
5. Verify results appear
6. Check Supabase for saved data

### Sample Test Data

See [`SETUP_CHECKLIST.md`](./SETUP_CHECKLIST.md) for sample job descriptions and CVs

## 🐛 Troubleshooting

### Common Issues

**"Supabase client not initialized"**
- Check your `.env.local` file
- Verify Supabase URL and anon key are correct

**"OpenAI API error"**
- Verify your API key is valid
- Check you have credits in your OpenAI account

**"Table does not exist"**
- Run the SQL script from `SUPABASE_SETUP.md`
- Verify you're in the correct Supabase project

**"Analysis not saving"**
- Check RLS policies are enabled
- Verify public insert access is allowed

See [`SETUP_CHECKLIST.md`](./SETUP_CHECKLIST.md) for more troubleshooting tips

## 💰 Cost Estimate

### Development (Free Tier)
- **Supabase**: Free (500MB database, 2GB bandwidth)
- **Vercel**: Free (100GB bandwidth)
- **OpenAI**: ~$0.01-0.05 per analysis

### Production (Low Traffic)
- **Supabase**: $0-25/month
- **Vercel**: $0-20/month
- **OpenAI**: ~$10-50/month (depends on usage)

**Total**: ~$10-95/month for low-medium traffic

## 🔒 Security

### Current Setup (Demo Mode)
- Public read/write access
- No authentication required
- No personal data stored
- Perfect for demos and testing

### For Production
- Add user authentication (Supabase Auth)
- Implement user-specific RLS policies
- Add rate limiting
- Set up CORS properly
- Add input validation
- Implement API key rotation

## 📈 Future Enhancements

- [ ] User accounts and history
- [ ] PDF parsing improvements
- [ ] Multiple CV versions
- [ ] Job application tracking
- [ ] Email notifications
- [ ] Premium features
- [ ] Mobile app
- [ ] Chrome extension

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes

## 🙏 Acknowledgments

- OpenAI for GPT-4 API
- Supabase for the database
- Next.js team for the framework
- The open-source community

## 📞 Support

- **Documentation**: Check the `/docs` folder
- **Issues**: Open a GitHub issue
- **Email**: your-email@example.com

---

**Built with ❤️ for job seekers everywhere**

Made by [Your Name]
=======
# CareerAI
>>>>>>> 84126b6463bbdbccf49f337e7d6fd595a58c6f25
