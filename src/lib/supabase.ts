import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Client-side Supabase client (anon key, RLS enforced)
// Only create if env vars are present
let _supabase: SupabaseClient | null = null;

export function getSupabase() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase environment variables not configured.");
  }
  if (!_supabase) {
    _supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
  return _supabase;
}

// Server-side Supabase client (service role, bypasses RLS)
export function createServerClient() {
  if (!supabaseUrl) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is not configured.");
  }
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured.");
  }
  return createClient(supabaseUrl, serviceRoleKey);
}

// ─── Types ───────────────────────────────────────────────────────────────────

export type ApplicationStatus = "pending" | "accepted" | "rejected";
export type ApplicationPriority = "normal" | "high";

export interface Application {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  creative_type: string | null;
  instagram: string | null;
  tiktok: string | null;
  portfolio_url: string | null;
  voice_note_url: string | null;
  status: ApplicationStatus;
  vouched_by: string | null;
  priority: ApplicationPriority;
  referral_slug: string | null;
  notes: string | null;
  created_at: string;
  accepted_at: string | null;
  rejected_at: string | null;
}
