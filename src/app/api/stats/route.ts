import { createServerClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = createServerClient();

    const { count: acceptedCount } = await supabase
      .from("applications")
      .select("*", { count: "exact", head: true })
      .eq("status", "accepted");

    const { count: totalApplied } = await supabase
      .from("applications")
      .select("*", { count: "exact", head: true });

    return Response.json({
      accepted: acceptedCount || 0,
      applied: totalApplied || 0,
      spotsRemaining: 300 - (acceptedCount || 0),
    });
  } catch {
    // If Supabase isn't connected yet, return zeros
    return Response.json({
      accepted: 0,
      applied: 0,
      spotsRemaining: 300,
    });
  }
}
