-- ============================================================
-- Kingdom Artists — Applications Table
-- Run this in Supabase SQL Editor after creating the project
-- ============================================================

-- Applications table
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  creative_type TEXT,
  instagram TEXT,
  tiktok TEXT,
  portfolio_url TEXT,         -- Spotify or any link to their work
  voice_note_url TEXT,        -- storage URL of their voice answer
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'accepted', 'rejected')),
  vouched_by TEXT,           -- referrer slug who vouched (e.g., "sarah-kim")
  priority TEXT NOT NULL DEFAULT 'normal'
    CHECK (priority IN ('normal', 'high')),
  referral_slug TEXT UNIQUE, -- generated on accept (e.g., "sarah-kim")
  notes TEXT,                -- admin notes
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  accepted_at TIMESTAMPTZ,
  rejected_at TIMESTAMPTZ
);

-- Unique email constraint (one application per email)
CREATE UNIQUE INDEX idx_applications_email ON applications(email);

-- Indexes for admin queries
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_priority ON applications(priority);
CREATE INDEX idx_applications_vouched_by ON applications(vouched_by);
CREATE INDEX idx_applications_created_at ON applications(created_at DESC);

-- Enable Row Level Security
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can INSERT (submit an application)
CREATE POLICY "Anyone can apply" ON applications
  FOR INSERT
  WITH CHECK (true);

-- Policy: Only service role can SELECT/UPDATE/DELETE (admin operations)
-- (No select policy for anon = anon can't read applications)

-- ============================================================
-- Tracking table for vouch counts
-- ============================================================
CREATE VIEW vouch_stats AS
SELECT
  vouched_by,
  COUNT(*) as total_vouched,
  COUNT(*) FILTER (WHERE status = 'accepted') as accepted_count,
  COUNT(*) FILTER (WHERE status = 'pending') as pending_count
FROM applications
WHERE vouched_by IS NOT NULL
GROUP BY vouched_by;

-- Voice notes storage bucket (public read)
INSERT INTO storage.buckets (id, name, public)
VALUES ('voice-notes', 'voice-notes', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Service role can upload voice notes"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'voice-notes');
