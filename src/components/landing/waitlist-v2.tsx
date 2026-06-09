"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Loader2, Sparkles } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export function WaitlistV2() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [creativeType, setCreativeType] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "no-code"
  >("idle");
  const [submitting, setSubmitting] = useState(false);
  const [hasCodeFromUrl, setHasCodeFromUrl] = useState(false);
  const [memberNumber] = useState(() => Math.floor(Math.random() * 50 + 48));

  // Auto-fill invite code from URL: ?ref=KINGDOMFIRST or ?code=KINGDOMFIRST
  useEffect(() => {
    const ref = searchParams.get("ref") || searchParams.get("code") || "";
    if (ref) {
      setInviteCode(ref.toUpperCase());
      setHasCodeFromUrl(true);
    }
  }, [searchParams]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || !name) return;

    if (!inviteCode.trim()) {
      setStatus("no-code");
      return;
    }

    setStatus("loading");

    // TODO: Replace with Supabase insert
    // table: waitlist_signups { name, email, creative_type, invite_code, signed_up_at }
    await new Promise((r) => setTimeout(r, 1200));

    setStatus("success");
  }

  async function handleRequestAccess(e: FormEvent) {
    e.preventDefault();
    if (!email || !name) return;

    setSubmitting(true);

    // TODO: Replace with Supabase insert
    // table: access_requests { name, email, creative_type, requested_at }
    await new Promise((r) => setTimeout(r, 1200));

    setSubmitting(false);
    setStatus("success");
  }

  return (
    <section id="join" className="relative py-20 sm:py-28 lg:py-36">
      {/* Dark background */}
      <div className="absolute inset-0 bg-foreground rounded-t-[2.5rem] sm:rounded-t-[3.5rem]" />

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <span className="text-[11px] tracking-[0.25em] uppercase text-background/25 font-medium">
            Invite Only — Founding 300
          </span>
          <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.75rem,5vw,3.25rem)] font-medium tracking-tight mt-4 text-background leading-[1.1] text-balance">
            This isn&apos;t open to everyone.
            <br />
            <span className="italic text-background/60">
              That&apos;s the point.
            </span>
          </h2>
          <p className="text-background/30 text-sm sm:text-[15px] mt-4 sm:mt-5 max-w-md mx-auto leading-relaxed text-balance">
            {hasCodeFromUrl
              ? "You've been invited. Claim your founding spot below."
              : "You need an invite code to join. Got one? Enter it below."}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="mt-8 sm:mt-10"
        >
          <AnimatePresence mode="wait">
            {/* ===== SUCCESS STATE ===== */}
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="flex flex-col items-center gap-5 py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center"
                >
                  <Check className="w-7 h-7 text-emerald-400" />
                </motion.div>
                <div>
                  <p className="text-background text-xl font-[family-name:var(--font-heading)] font-medium">
                    You&apos;re in, {name}.
                  </p>
                  <p className="text-background/35 text-sm mt-2 max-w-xs mx-auto">
                    Welcome to the Kingdom. We&apos;ll reach out with everything you
                    need to get started.
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-1 bg-background/[0.06] px-5 py-2.5 rounded-full">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-background/50 text-sm">
                    Founding member{" "}
                    <span className="text-background font-semibold">
                      #{memberNumber}
                    </span>{" "}
                    of 300
                  </span>
                </div>
              </motion.div>
            ) : status === "no-code" ? (
              /* ===== NO CODE — ASK FOR ACCESS ===== */
              <motion.div
                key="no-code"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <div className="max-w-sm mx-auto">
                  <div className="bg-background/[0.04] border border-background/[0.08] rounded-2xl p-6 mb-5">
                    <p className="text-background/70 text-sm font-medium">
                      No invite code?
                    </p>
                    <p className="text-background/30 text-xs mt-1.5 leading-relaxed">
                      Kingdom Artists is invite-only right now. If you know
                      someone who&apos;s already in, ask them for a link. Otherwise,
                      drop your info and we&apos;ll reach out if there&apos;s a spot.
                    </p>
                  </div>
                  <form onSubmit={handleRequestAccess} className="space-y-2.5">
                    <input
                      type="text"
                      placeholder="Your name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-background/[0.06] border border-background/[0.06] text-background placeholder:text-background/20 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-background/15 focus:bg-background/[0.08] transition-all"
                    />
                    <input
                      type="email"
                      placeholder="Your email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-background/[0.06] border border-background/[0.06] text-background placeholder:text-background/20 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-background/15 focus:bg-background/[0.08] transition-all"
                    />
                    <select
                      value={creativeType}
                      onChange={(e) => setCreativeType(e.target.value)}
                      className="w-full bg-background/[0.06] border border-background/[0.06] text-background/50 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-background/15 transition-all appearance-none"
                    >
                      <option value="" className="text-foreground">
                        What kind of creative are you?
                      </option>
                      {[
                        "Musician",
                        "Producer",
                        "Songwriter",
                        "Worship Leader",
                        "Filmmaker",
                        "Photographer",
                        "Designer",
                        "Creative Director",
                        "Visual Artist",
                        "Writer / Storyteller",
                        "Other",
                      ].map((type) => (
                        <option
                          key={type}
                          value={type}
                          className="text-foreground"
                        >
                          {type}
                        </option>
                      ))}
                    </select>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-background/[0.08] border border-background/[0.1] text-background rounded-xl px-6 py-3.5 text-sm font-semibold hover:bg-background/[0.12] transition-all flex items-center justify-center gap-2.5 disabled:opacity-60 active:scale-[0.98] mt-1"
                    >
                      {submitting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        "Request Access"
                      )}
                    </button>
                  </form>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-4 text-background/25 text-xs hover:text-background/40 transition-colors"
                  >
                    ← I actually have a code
                  </button>
                </div>
              </motion.div>
            ) : (
              /* ===== MAIN FORM ===== */
              <motion.form
                key="main-form"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                onSubmit={handleSubmit}
                className="max-w-sm mx-auto"
              >
                <div className="space-y-2.5">
                  {/* Invite code field */}
                  {hasCodeFromUrl ? (
                    <div className="flex items-center justify-center gap-2 bg-emerald-500/[0.08] border border-emerald-500/[0.15] rounded-xl px-4 py-3 mb-1">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400/80 text-sm font-mono tracking-wider">
                        {inviteCode}
                      </span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      placeholder="Invite code"
                      value={inviteCode}
                      onChange={(e) =>
                        setInviteCode(e.target.value.toUpperCase())
                      }
                      className="w-full bg-background/[0.06] border border-background/[0.06] text-background placeholder:text-background/20 rounded-xl px-4 py-3.5 text-sm tracking-widest font-mono focus:outline-none focus:border-background/15 focus:bg-background/[0.08] transition-all text-center uppercase"
                    />
                  )}
                  <input
                    type="text"
                    placeholder="Your name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-background/[0.06] border border-background/[0.06] text-background placeholder:text-background/20 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-background/15 focus:bg-background/[0.08] transition-all"
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-background/[0.06] border border-background/[0.06] text-background placeholder:text-background/20 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-background/15 focus:bg-background/[0.08] transition-all"
                  />
                  <select
                    value={creativeType}
                    onChange={(e) => setCreativeType(e.target.value)}
                    className="w-full bg-background/[0.06] border border-background/[0.06] text-background/50 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-background/15 transition-all appearance-none"
                  >
                    <option value="" className="text-foreground">
                      What kind of creative are you?
                    </option>
                    {[
                      "Musician",
                      "Producer",
                      "Songwriter",
                      "Worship Leader",
                      "Filmmaker",
                      "Photographer",
                      "Designer",
                      "Creative Director",
                      "Visual Artist",
                      "Writer / Storyteller",
                      "Other",
                    ].map((type) => (
                      <option
                        key={type}
                        value={type}
                        className="text-foreground"
                      >
                        {type}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-background text-foreground rounded-xl px-6 py-3.5 text-sm font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2.5 disabled:opacity-60 active:scale-[0.98] mt-1"
                  >
                    {status === "loading" ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        Claim My Founding Spot
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                {!hasCodeFromUrl && (
                  <button
                    type="button"
                    onClick={() => setStatus("no-code")}
                    className="mt-4 text-background/20 text-xs hover:text-background/40 transition-colors"
                  >
                    Don&apos;t have an invite code?
                  </button>
                )}

                <p className="mt-4 text-[11px] text-background/12">
                  No spam. We&apos;ll only reach out about Kingdom Artists.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
