import { createServerClient } from "@/lib/supabase";
import { sendEmail } from "@/lib/send-email";
import { acceptanceEmail } from "@/lib/email-templates";

export const dynamic = "force-dynamic";

function isAdmin(request: Request): boolean {
  const authHeader = request.headers.get("authorization");
  const adminKey = process.env.ADMIN_SECRET_KEY;
  if (!adminKey) return false;
  return authHeader === `Bearer ${adminKey}`;
}

// Generate a referral slug from name: "Sarah Kim" → "sarah-kim"
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
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

  // Get the application
  const { data: app, error: fetchError } = await supabase
    .from("applications")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError || !app) {
    return Response.json(
      { error: "Application not found." },
      { status: 404 }
    );
  }

  if (app.status === "accepted") {
    return Response.json(
      { error: "Already accepted.", referral_slug: app.referral_slug },
      { status: 409 }
    );
  }

  // Check spots remaining
  const { count: acceptedCount } = await supabase
    .from("applications")
    .select("*", { count: "exact", head: true })
    .eq("status", "accepted");

  if ((acceptedCount || 0) >= 300) {
    return Response.json(
      { error: "All 300 founding spots are filled." },
      { status: 400 }
    );
  }

  // Generate unique referral slug
  let slug = generateSlug(app.name);
  let attempt = 0;

  // Check uniqueness, append number if needed
  while (true) {
    const candidateSlug = attempt === 0 ? slug : `${slug}-${attempt}`;
    const { data: existing } = await supabase
      .from("applications")
      .select("id")
      .eq("referral_slug", candidateSlug)
      .single();

    if (!existing) {
      slug = candidateSlug;
      break;
    }
    attempt++;
  }

  // Accept the application
  const { data: updated, error: updateError } = await supabase
    .from("applications")
    .update({
      status: "accepted",
      referral_slug: slug,
      accepted_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (updateError) {
    console.error("Accept error:", updateError);
    return Response.json(
      { error: "Failed to accept application." },
      { status: 500 }
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://kingdomartists.com";
  const referralLink = `${baseUrl}/?ref=${slug}`;

  // Acceptance email with their referral link — automatic when Resend is configured
  const email = acceptanceEmail(updated.name, referralLink);
  const emailSent = await sendEmail({ to: updated.email, ...email });

  return Response.json({
    success: true,
    application: updated,
    referral_link: referralLink,
    emailSent,
    // Email content (for manual sending if Resend isn't configured)
    email: { to: updated.email, ...email },
  });
}
