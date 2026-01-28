-- Create analyses table
CREATE TABLE IF NOT EXISTS analyses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  job_title TEXT NOT NULL,
  company TEXT,
  job_description TEXT NOT NULL,
  cv_text TEXT NOT NULL,
  match_score INTEGER CHECK (match_score >= 0 AND match_score <= 100),
  potential_score INTEGER CHECK (potential_score >= 0 AND potential_score <= 100),
  summary TEXT,
  missing_keywords TEXT[], -- Array of missing keywords
  priority_actions TEXT[], -- Array of priority actions
  ats_tips TEXT[], -- Array of ATS tips
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create analysis_sections table
CREATE TABLE IF NOT EXISTS analysis_sections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  analysis_id UUID NOT NULL REFERENCES analyses(id) ON DELETE CASCADE,
  section TEXT NOT NULL, -- e.g., 'summary', 'skills', 'experience', 'education', 'formatting'
  feedback TEXT NOT NULL,
  priority TEXT CHECK (priority IN ('high', 'medium', 'low')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_analyses_user_id ON analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_analyses_created_at ON analyses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analysis_sections_analysis_id ON analysis_sections(analysis_id);

-- Enable Row Level Security (optional, for future auth)
ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE analysis_sections ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all for V1, can be restricted later)
CREATE POLICY "Allow all operations on analyses" ON analyses
  FOR ALL USING (true);

CREATE POLICY "Allow all operations on analysis_sections" ON analysis_sections
  FOR ALL USING (true);
