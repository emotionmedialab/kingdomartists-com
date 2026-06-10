"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Loader2, Star } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

function formatReferrerName(ref: string) {
  // "sarahkim" → "Sarah K." / "david" → "David" / "alec-martin" → "Alec M."
  const clean = ref.replace(/[-_]/g, " ").trim();
  const parts = clean.split(/\s+/);
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase() + parts[0].slice(1).toLowerCase();
  }
  return (
    parts[0].charAt(0).toUpperCase() +
    parts[0].slice(1).toLowerCase() +
    " " +
    parts[parts.length - 1].charAt(0).toUpperCase() +
    "."
  );
}

export function WaitlistV2() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [creativeType, setCreativeType] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [referrer, setReferrer] = useState("");
  const [referrerDisplay, setReferrerDisplay] = useState("");

  // Check for referral: ?ref=sarahkim
  useEffect(() => {
    const ref = searchParams.get("ref") || "";
    if (ref) {
      setReferrer(ref);
      setReferrerDisplay(formatReferrerName(ref));
    }
  }, [searchParams]);

  const isVouched = referrer.length > 0;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || !name) return;

    setStatus("loading");

    // TODO: Replace with Supabase insert
    // table: applications {
    //   name, email, creative_type,
    //   status: "pending",
    //   vouched_by: referrer || null,
    //   priority: isVouched ? "high" : "normal",
    //   created_at
    // }
    await new Promise((r) => setTimeout(r, 1200));

    setStatus("success");
  }

  return (
    <section id="join" className="relative py-20 sm:py-28 lg:py-36">
      <div className="absolute inset-0 bg-foreground rounded-t-[2.5rem] sm:rounded-t-[3.5rem]" />

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <span className="text-[11px] tracking-[0.25em] uppercase text-background/25 font-medium">
            {isVouched
              ? `Vouched by ${referrerDisplay}`
              : "Apply for Early Access"}
          </span>
          <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.75rem,5vw,3.25rem)] font-medium tracking-tight mt-4 text-background leading-[1.1] text-balance">
            {isVouched ? (
              <>
                Someone in Kingdom Artists
                <br />
                <span className="italic text-background/60">
                  believes in your gift.
                </span>
              </>
            ) : (
              <>
                This isn&apos;t open to everyone.
                <br />
                <span className="italic text-background/60">
                  That&apos;s the point.
                </span>
              </>
            )}
          </h2>
          <p className="text-background/30 text-sm sm:text-[15px] mt-4 sm:mt-5 max-w-md mx-auto leading-relaxed text-balance">
            {isVouched
              ? `${referrerDisplay} vouched for you — your application has been fast-tracked. Complete it below and our team will review it within 24 hours.`
              : "We're handpicking the first 300 founding members. Apply below and our team will review your application personally."}
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
                  {isVouched ? (
                    <>
                      <p className="text-background text-xl font-[family-name:var(--font-heading)] font-medium">
                        You&apos;ve been fast-tracked, {name}.
                      </p>
                      <p className="text-background/35 text-sm mt-2 max-w-xs mx-auto">
                        {referrerDisplay} put in a good word for you. Our team
                        will review your application within 24 hours. Watch your
                        inbox.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-background text-xl font-[family-name:var(--font-heading)] font-medium">
                        Application received, {name}.
                      </p>
                      <p className="text-background/35 text-sm mt-2 max-w-xs mx-auto">
                        Our team reviews every application personally.
                        We&apos;ll be in touch.
                      </p>
                    </>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                onSubmit={handleSubmit}
                className="max-w-sm mx-auto"
              >
                <div className="space-y-2.5">
                  {/* Vouched badge */}
                  {isVouched && (
                    <div className="flex items-center justify-center gap-2 bg-amber-500/[0.06] border border-amber-500/[0.12] rounded-xl px-4 py-3 mb-1">
                      <Star className="w-4 h-4 text-amber-400" fill="currentColor" />
                      <span className="text-amber-400/80 text-sm">
                        Vouched by {referrerDisplay} — fast-tracked
                      </span>
                    </div>
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
                        {isVouched
                          ? "Complete My Application"
                          : "Apply for Founding Access"}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                <p className="mt-4 text-[11px] text-background/12">
                  {isVouched
                    ? "Fast-tracked applications are reviewed within 24 hours."
                    : "We review every application. No algorithms — just us."}
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
