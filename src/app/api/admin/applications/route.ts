import { createServerClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// Simple admin auth check — in production, use proper auth
function isAdmin(request: Request): boolean {
  const authHeader = request.headers.get("authorization");
  const adminKey = process.env.ADMIN_SECRET_KEY;
  if (!adminKey) return false;
  return authHeader === `Bearer ${adminKey}`;
}

export async function GET(request: Request) {
  if (!isAdmin(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServerClient();
  const { searchParams } = new URL(request.url);

  const status = searchParams.get("status"); // pending, accepted, rejected
  const priority = searchParams.get("priority"); // normal, high

  let query = supabase
    .from("applications")
    .select("*")
    .order("priority", { ascending: false }) // high priority first
    .order("created_at", { ascending: false });

  if (status) {
    query = query.eq("status", status);
  }

  if (priority) {
    query = query.eq("priority", priority);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Supabase query error:", error);
    return Response.json(
      { error: "Failed to fetch applications." },
      { status: 500 }
    );
  }

  // Get stats
  const { count: totalCount } = await supabase
    .from("applications")
    .select("*", { count: "exact", head: true });

  const { count: pendingCount } = await supabase
    .from("applications")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending");

  const { count: acceptedCount } = await supabase
    .from("applications")
    .select("*", { count: "exact", head: true })
    .eq("status", "accepted");

  const { count: vouchedCount } = await supabase
    .from("applications")
    .select("*", { count: "exact", head: true })
    .eq("priority", "high");

  return Response.json({
    applications: data,
    stats: {
      total: totalCount || 0,
      pending: pendingCount || 0,
      accepted: acceptedCount || 0,
      vouched: vouchedCount || 0,
      spotsRemaining: 300 - (acceptedCount || 0),
    },
  });
}
