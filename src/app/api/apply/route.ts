import { createServerClient } from "@/lib/supabase";
import { sendEmail } from "@/lib/send-email";
import { applicationReceivedEmail } from "@/lib/email-templates";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, creative_type, vouched_by, story, instagram, tiktok, portfolio_url, voice_note_url } = body;

    // Validate required fields
    if (!name || !email) {
      return Response.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // Check for duplicate email
    const { data: existing } = await supabase
      .from("applications")
      .select("id, status")
      .eq("email", email.toLowerCase().trim())
      .single();

    if (existing) {
      if (existing.status === "accepted") {
        return Response.json(
          { error: "You're already a member! Check your email for your referral link." },
          { status: 409 }
        );
      }
      return Response.json(
        { error: "You've already applied. We'll be in touch!" },
        { status: 409 }
      );
    }

    // Determine priority
    const isVouched = vouched_by && vouched_by.length > 0;

    // Insert application
    const { data, error } = await supabase
      .from("applications")
      .insert({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        phone: phone?.trim() || null,
        creative_type: creative_type || null,
        instagram: instagram?.trim() || null,
        tiktok: tiktok?.trim() || null,
        portfolio_url: portfolio_url?.trim() || null,
        voice_note_url: voice_note_url || null,
        notes: story?.trim() || null,
        vouched_by: isVouched ? vouched_by : null,
        priority: isVouched ? "high" : "normal",
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return Response.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    // Confirmation email — best-effort, never blocks the application
    const received = applicationReceivedEmail(
      data.name,
      !!isVouched,
      vouched_by || undefined
    );
    await sendEmail({ to: data.email, ...received });

    return Response.json({
      success: true,
      vouched: isVouched,
      id: data.id,
    });
  } catch {
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
