-- ============================================
-- SECURE AUTHENTICATION & PROFILE SCHEMA
-- ============================================

-- 1. PROFILES TABLE
-- Stores additional user information and consent status
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    avatar_url TEXT,
    email TEXT UNIQUE NOT NULL,
    provider TEXT,
    
    -- Consent Tracking (GDPR Compliance)
    consent_accepted BOOLEAN DEFAULT FALSE,
    consent_timestamp TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. ENABLE RLS ON PROFILES
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 3. RLS POLICIES FOR PROFILES
CREATE POLICY "Users can view their own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

-- 4. TRIGGER FOR NEW USER PROFILE
-- Automatically creates a profile entry when a new user signs up via Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, avatar_url, email, provider)
    VALUES (
        NEW.id,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'avatar_url',
        NEW.email,
        NEW.app_metadata->>'provider'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. UPDATE ANALYSES TABLE FOR AUTH
-- Add user_id if it doesn't exist and link it to auth.users
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='analyses' AND column_name='user_id') THEN
        ALTER TABLE analyses ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
    END IF;
END $$;

-- 6. SECURE RLS POLICIES FOR ANALYSES
-- Remove old public policies first
DROP POLICY IF EXISTS "Allow public read access to analyses" ON analyses;
DROP POLICY IF EXISTS "Allow public insert access to analyses" ON analyses;
DROP POLICY IF EXISTS "Allow all operations on analyses" ON analyses;

CREATE POLICY "Users can view their own analyses"
    ON analyses FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own analyses"
    ON analyses FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own analyses"
    ON analyses FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own analyses"
    ON analyses FOR DELETE
    USING (auth.uid() = user_id);

-- 7. SECURE RLS POLICIES FOR ANALYSIS_SECTIONS
-- Remove old public policies first
DROP POLICY IF EXISTS "Allow public read access to analysis_sections" ON analysis_sections;
DROP POLICY IF EXISTS "Allow public insert access to analysis_sections" ON analysis_sections;
DROP POLICY IF EXISTS "Allow all operations on analysis_sections" ON analysis_sections;

CREATE POLICY "Users can view their own analysis sections"
    ON analysis_sections FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM analyses
            WHERE analyses.id = analysis_sections.analysis_id
            AND analyses.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert their own analysis sections"
    ON analysis_sections FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM analyses
            WHERE analyses.id = analysis_sections.analysis_id
            AND analyses.user_id = auth.uid()
        )
    );

-- 8. UPDATED_AT TRIGGER FOR PROFILES
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
