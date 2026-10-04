"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const CREATIVE_TYPES = [
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
];

export function Waitlist() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [creativeType, setCreativeType] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || !name) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1100));
    setStatus("success");
  }

  return (
    <section
      id="join"
      className="relative overflow-hidden border-t border-line px-6 py-28 text-center sm:px-12"
    >
      {/* Gold ambient glow to set the final CTA apart */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[440px] w-[660px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.06] blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
        >
          <span className="cap">Apply for Early Access</span>
          <h3 className="serif mt-3 text-[clamp(36px,6vw,72px)] font-light leading-[1.02] tracking-[-0.03em] text-paper">
            This isn&apos;t open to everyone.
            <br />
            <em className="italic text-gold-soft">That&apos;s the point.</em>
          </h3>
          <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted-foreground">
            We&apos;re handpicking the first 300 founding members. Apply below
            and our team will review your application personally.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="mt-10"
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-3 py-6"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/15">
                  <Check className="h-6 w-6 text-gold" />
                </div>
                <p className="serif text-xl text-paper">
                  Application received, {name}.
                </p>
                <p className="max-w-xs text-sm text-muted-foreground">
                  Our team reviews every application personally. We&apos;ll be in
                  touch soon.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="mx-auto max-w-sm space-y-2.5 text-left"
              >
                <input
                  type="text"
                  placeholder="Your name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-line bg-bg2 px-4 py-3.5 text-sm text-paper placeholder:text-muted-foreground focus:border-line2 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-line bg-bg2 px-4 py-3.5 text-sm text-paper placeholder:text-muted-foreground focus:border-line2 focus:outline-none"
                />
                <select
                  value={creativeType}
                  onChange={(e) => setCreativeType(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-line bg-bg2 px-4 py-3.5 text-sm text-muted-foreground focus:border-line2 focus:outline-none"
                >
                  <option value="">What kind of creative are you?</option>
                  {CREATIVE_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="pill pill-gold mt-1 w-full py-3.5 disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Apply for Founding Access →"
                  )}
                </button>
                <p className="pt-1 text-center text-[11px] text-faint">
                  No resume. Just your craft. No application fee — just a few
                  questions.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
