import { createServerClient } from "@/lib/supabase";

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

  return Response.json({
    success: true,
    application: updated,
    referral_link: referralLink,
    // Email content for manual sending (or future automation)
    email: {
      to: updated.email,
      subject: "You're in. Welcome to Kingdom Artists.",
      ...generateAcceptanceEmail(updated.name, referralLink, slug),
    },
  });
}

function generateAcceptanceEmail(name: string, referralLink: string, slug: string) {
  const firstName = name.split(" ")[0];

  const text = `${firstName},

You're in.

You've been accepted as a Founding Member of Kingdom Artists — one of just 300 creatives shaping this from the ground up.

What that means for you:
• Lifetime free access — every feature we build, you get first
• Exclusive Founder badge — never available again after the 300
• First access to everything — beta features, tools, premium drops
• Creative Resource Kit — templates, assets, and resources for your craft

YOUR PERSONAL REFERRAL LINK
${referralLink}

Anyone who applies through your link gets fast-tracked. You get to choose who's next. That's real influence.

We're building something that's never existed for Kingdom creatives. And you're one of the first people to shape it.

Welcome home.

— David & Cara
Kingdom Artists`;

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Kingdom Artists</title>
</head>
<body style="margin:0;padding:0;background-color:#fafaf9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">

    <!-- Logo -->
    <div style="text-align:center;margin-bottom:40px;">
      <span style="font-size:18px;font-weight:600;color:#0a0a0a;letter-spacing:-0.02em;">Kingdom Artists</span>
    </div>

    <!-- Main content -->
    <div style="background:#ffffff;border-radius:16px;padding:40px 32px;border:1px solid #e5e5e5;">

      <p style="font-size:15px;color:#0a0a0a;margin:0 0 8px 0;">${firstName},</p>

      <h1 style="font-size:32px;font-weight:500;color:#0a0a0a;margin:24px 0 16px 0;line-height:1.1;letter-spacing:-0.02em;">
        You're in.
      </h1>

      <p style="font-size:15px;color:#525252;line-height:1.7;margin:0 0 24px 0;">
        You've been accepted as a <strong style="color:#0a0a0a;">Founding Member</strong> of Kingdom Artists — one of just 300 creatives shaping this from the ground up.
      </p>

      <!-- Perks -->
      <div style="background:#fafaf9;border-radius:12px;padding:24px;margin:24px 0;">
        <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#a3a3a3;margin:0 0 16px 0;font-weight:500;">What you get</p>
        <table cellpadding="0" cellspacing="0" style="width:100%;">
          <tr><td style="padding:6px 0;font-size:14px;color:#525252;">✦ Lifetime free access</td></tr>
          <tr><td style="padding:6px 0;font-size:14px;color:#525252;">✦ Exclusive Founder badge</td></tr>
          <tr><td style="padding:6px 0;font-size:14px;color:#525252;">✦ First access to everything</td></tr>
          <tr><td style="padding:6px 0;font-size:14px;color:#525252;">✦ Creative Resource Kit</td></tr>
        </table>
      </div>

      <!-- Referral link -->
      <div style="background:#0a0a0a;border-radius:12px;padding:24px;margin:24px 0;text-align:center;">
        <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#a3a3a3;margin:0 0 12px 0;font-weight:500;">Your personal referral link</p>
        <a href="${referralLink}" style="font-size:15px;color:#ffffff;text-decoration:none;word-break:break-all;font-weight:500;">${referralLink}</a>
        <p style="font-size:13px;color:#737373;margin:12px 0 0 0;line-height:1.5;">
          Anyone who applies through your link gets <span style="color:#f59e0b;">fast-tracked</span>. You choose who's next.
        </p>
      </div>

      <p style="font-size:15px;color:#525252;line-height:1.7;margin:24px 0 0 0;">
        We're building something that's never existed for Kingdom creatives. And you're one of the first to shape it.
      </p>

      <p style="font-size:15px;color:#525252;line-height:1.7;margin:16px 0 0 0;">
        Welcome home.
      </p>

      <p style="font-size:15px;color:#0a0a0a;margin:24px 0 0 0;font-weight:500;">
        — David & Cara<br>
        <span style="color:#a3a3a3;font-weight:400;">Kingdom Artists</span>
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align:center;margin-top:32px;">
      <p style="font-size:12px;color:#a3a3a3;margin:0;">
        © 2026 Kingdom Artists. Built with purpose.
      </p>
    </div>
  </div>
</body>
</html>`;

  return { text, html };
}
