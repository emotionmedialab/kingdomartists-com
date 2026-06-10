import { createServerClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

function isAdmin(request: Request): boolean {
  const authHeader = request.headers.get("authorization");
  const adminKey = process.env.ADMIN_SECRET_KEY;
  if (!adminKey) return false;
  return authHeader === `Bearer ${adminKey}`;
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdmin(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const supabase = createServerClient();

  // Get optional notes from body
  let notes: string | null = null;
  try {
    const body = await request.json();
    notes = body.notes || null;
  } catch {
    // No body is fine
  }

  const { data: updated, error } = await supabase
    .from("applications")
    .update({
      status: "rejected",
      rejected_at: new Date().toISOString(),
      notes,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Reject error:", error);
    return Response.json(
      { error: "Failed to reject application." },
      { status: 500 }
    );
  }

  if (!updated) {
    return Response.json(
      { error: "Application not found." },
      { status: 404 }
    );
  }

  return Response.json({
    success: true,
    application: updated,
  });
}
