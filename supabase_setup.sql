-- =============================================
-- Khadija Foundation CMS — Supabase Setup SQL
-- Run this in the Supabase SQL Editor
-- =============================================

-- 1. Create the content table
CREATE TABLE IF NOT EXISTS content (
    id TEXT PRIMARY KEY,
    value TEXT NOT NULL DEFAULT '',
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Trigger to auto-update updated_at on change
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_content_updated_at
  BEFORE UPDATE ON content
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- 3. Seed with initial content values
INSERT INTO
    content (id, value)
VALUES
    -- Hero Section
    (
        'hero_title',
        'Where there is need, we are there Across all of Somaliland'
    ),
    (
        'hero_subtitle',
        'Khadija Foundation is dedicated to providing sustainable solutions for vulnerable communities in Somaliland through education, healthcare, and humanitarian aid programs.'
    ),
    ('hero_image', ''),

-- Recent Projects
(
    'project_1_title',
    'Our school in Burco graduating and ranking on top'
),
(
    'project_1_description',
    'We not only focus on their education but also their wellbeing, emotional support, health care, and transport access.'
),
(
    'project_1_image',
    'https://static.readdy.ai/image/adf562689ffc9835cd635ce609fa5c86/08bc1dc1514cfc09b8f523c5806be1eb.jfif'
),
(
    'project_2_title',
    'Water aid support across the country'
),
(
    'project_2_description',
    'We try to reach places that most NGOs or foreign aid do not reach during drought seasons.'
),
(
    'project_2_image',
    'https://static.readdy.ai/image/adf562689ffc9835cd635ce609fa5c86/e0eabc37b88dcf27bd2e2c27ba369097.jfif'
),
(
    'project_3_title',
    'Youth Employment & Support'
),
(
    'project_3_description',
    'Unemployment is an issue we are actively solving through hands-on training and youth initiatives.'
),
(
    'project_3_image',
    'https://static.readdy.ai/image/adf562689ffc9835cd635ce609fa5c86/a83fce7a3fe8d834f9495c5e7350bd70.jfif'
),

-- Programs
(
    'program_1_title',
    'Orphan Care & Support'
),
(
    'program_1_description',
    'Providing comprehensive care, education, and emotional support for orphaned children across Somalia.'
),
(
    'program_1_image',
    'https://static.readdy.ai/image/adf562689ffc9835cd635ce609fa5c86/3b376c440400ab2e9d306b5665ae38c9.jfif'
),
(
    'program_2_title',
    'Education Initiatives'
),
(
    'program_2_description',
    'Building and supporting schools that provide quality education to orphaned and underprivileged children.'
),
(
    'program_2_image',
    'https://static.readdy.ai/image/adf562689ffc9835cd635ce609fa5c86/fdabed76848f547f1299ba58e7ab1b6f.jfif'
),
(
    'program_3_title',
    'Family Assistance'
),
(
    'program_3_description',
    'Supporting vulnerable families with essential resources, healthcare access, and sustainable livelihood opportunities.'
),
(
    'program_3_image',
    'https://static.readdy.ai/image/adf562689ffc9835cd635ce609fa5c86/2afc35b342cda4b93acade6de7b2be11.jfif'
),

-- About
(
    'about_title',
    'About Khadija Foundation'
),
(
    'about_mission',
    'Our mission is to empower vulnerable communities across Somaliland through sustainable development, education, and humanitarian aid.'
),
('about_hero_image', ''),
('about_video_url', '') ON CONFLICT (id) DO NOTHING;

-- 4. Enable Row Level Security
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

-- 5. Policy: Anyone can read
CREATE POLICY "Public can read content" ON content FOR
SELECT USING (true);

-- 6. Policy: Only authenticated users (admin) can insert/update
CREATE POLICY "Admin can insert content" ON content FOR
INSERT
WITH
    CHECK (
        auth.role () = 'authenticated'
    );

CREATE POLICY "Admin can update content" ON content FOR
UPDATE USING (
    auth.role () = 'authenticated'
);

-- =============================================
-- Storage policies for the 'media' bucket
-- Run this in the Supabase SQL Editor if uploads fail
-- =============================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('media', 'media', true) 
ON CONFLICT (id) DO UPDATE SET public = true;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Public Read Access" ON storage.objects;
DROP POLICY IF EXISTS "Auth Insert Access" ON storage.objects;
DROP POLICY IF EXISTS "Auth Update Access" ON storage.objects;

-- Allow anyone to view public media files
CREATE POLICY "Public Read Access" ON storage.objects 
FOR SELECT USING (bucket_id = 'media');

-- Allow logged in admins to upload media files
CREATE POLICY "Auth Insert Access" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'media' AND auth.role() = 'authenticated');

-- Allow logged in admins to update media files
CREATE POLICY "Auth Update Access" ON storage.objects 
FOR UPDATE USING (bucket_id = 'media' AND auth.role() = 'authenticated');