// ─── Email Templates ─────────────────────────────────────────────────────────
// These are the email templates for the Kingdom Artists application flow.
// For now, these generate HTML + plaintext that can be copied/sent manually.
// When ready, plug into Resend, SendGrid, or Supabase Edge Functions.

// ─── 1. APPLICATION RECEIVED ─────────────────────────────────────────────────
// Sent immediately when someone submits an application

export function applicationReceivedEmail(name: string, isVouched: boolean, vouchedBy?: string) {
  const firstName = name.split(" ")[0];

  const text = isVouched
    ? `${firstName},

We got your application — and yes, we see that ${vouchedBy || "someone"} vouched for you.

That means a lot around here. Your application has been fast-tracked and our team will review it within 24 hours.

You'll hear from us soon.

— Kingdom Artists Team`
    : `${firstName},

We got your application.

Our team reviews every application personally — no algorithms, no automation. Just us, reading your name and thinking about what you'd bring to this community.

We'll be in touch.

— Kingdom Artists Team`;

  const vouchedNote = isVouched
    ? `<p style="font-size:14px;color:#525252;line-height:1.7;margin:0 0 20px 0;">
        We see that <strong style="color:#0a0a0a;">${vouchedBy || "someone"}</strong> vouched for you. That carries weight here. Your application has been <span style="color:#d97706;font-weight:500;">fast-tracked</span> and our team will review it within 24 hours.
      </p>`
    : `<p style="font-size:14px;color:#525252;line-height:1.7;margin:0 0 20px 0;">
        Our team reviews every application personally — no algorithms, no automation. Just us, reading your name and thinking about what you'd bring to this community.
      </p>`;

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#fafaf9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:520px;margin:0 auto;padding:40px 24px;">

    <div style="text-align:center;margin-bottom:32px;">
      <span style="font-size:18px;font-weight:600;color:#0a0a0a;letter-spacing:-0.02em;">Kingdom Artists</span>
    </div>

    <div style="background:#ffffff;border-radius:16px;padding:36px 28px;border:1px solid #e5e5e5;">
      <p style="font-size:14px;color:#0a0a0a;margin:0 0 6px 0;">${firstName},</p>

      <h1 style="font-size:24px;font-weight:500;color:#0a0a0a;margin:20px 0 16px 0;line-height:1.2;letter-spacing:-0.02em;">
        We got your application.
      </h1>

      ${vouchedNote}

      <p style="font-size:14px;color:#525252;line-height:1.7;margin:0;">
        We'll be in touch.
      </p>

      <p style="font-size:14px;color:#0a0a0a;margin:24px 0 0 0;font-weight:500;">
        — Kingdom Artists Team
      </p>
    </div>

    <div style="text-align:center;margin-top:28px;">
      <p style="font-size:11px;color:#a3a3a3;margin:0;">
        © 2026 Kingdom Artists. Built with purpose.
      </p>
    </div>
  </div>
</body>
</html>`;

  return {
    subject: isVouched
      ? "We got your application — you've been fast-tracked."
      : "We got your application.",
    text,
    html,
  };
}


// ─── 2. ACCEPTANCE EMAIL ─────────────────────────────────────────────────────
// Sent when admin clicks "Accept" — includes personal referral link

export function acceptanceEmail(name: string, referralLink: string) {
  const firstName = name.split(" ")[0];

  const text = `${firstName},

You're in.

You've been accepted as a Founding Member of Kingdom Artists — one of just 300 creatives shaping this from the ground up.

WHAT YOU GET:
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
</head>
<body style="margin:0;padding:0;background-color:#fafaf9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">

    <div style="text-align:center;margin-bottom:40px;">
      <span style="font-size:18px;font-weight:600;color:#0a0a0a;letter-spacing:-0.02em;">Kingdom Artists</span>
    </div>

    <div style="background:#ffffff;border-radius:16px;padding:40px 32px;border:1px solid #e5e5e5;">

      <p style="font-size:15px;color:#0a0a0a;margin:0 0 8px 0;">${firstName},</p>

      <h1 style="font-size:36px;font-weight:500;color:#0a0a0a;margin:24px 0 16px 0;line-height:1.1;letter-spacing:-0.02em;">
        You're in.
      </h1>

      <p style="font-size:15px;color:#525252;line-height:1.7;margin:0 0 24px 0;">
        You've been accepted as a <strong style="color:#0a0a0a;">Founding Member</strong> of Kingdom Artists — one of just 300 creatives shaping this from the ground up.
      </p>

      <div style="background:#fafaf9;border-radius:12px;padding:24px;margin:24px 0;">
        <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#a3a3a3;margin:0 0 16px 0;font-weight:500;">What you get</p>
        <table cellpadding="0" cellspacing="0" style="width:100%;">
          <tr><td style="padding:6px 0;font-size:14px;color:#525252;">✦ Lifetime free access</td></tr>
          <tr><td style="padding:6px 0;font-size:14px;color:#525252;">✦ Exclusive Founder badge</td></tr>
          <tr><td style="padding:6px 0;font-size:14px;color:#525252;">✦ First access to everything</td></tr>
          <tr><td style="padding:6px 0;font-size:14px;color:#525252;">✦ Creative Resource Kit</td></tr>
        </table>
      </div>

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

    <div style="text-align:center;margin-top:32px;">
      <p style="font-size:12px;color:#a3a3a3;margin:0;">
        © 2026 Kingdom Artists. Built with purpose.
      </p>
    </div>
  </div>
</body>
</html>`;

  return {
    subject: "You're in. Welcome to Kingdom Artists.",
    text,
    html,
  };
}
