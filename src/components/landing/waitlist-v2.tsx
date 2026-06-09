"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Loader2, Sparkles, Lock, Send } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

// Mock valid invite codes — replace with real backend validation
const VALID_CODES = ["KINGDOM300", "FOUNDING", "CREATORS", "KA2026"];

export function WaitlistV2() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [creativeType, setCreativeType] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "request-sent" | "invalid-code"
  >("idle");
  const [mode, setMode] = useState<"invite" | "request">("invite");
  const [queuePosition] = useState(() => Math.floor(Math.random() * 50 + 48));

  async function handleInviteSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || !inviteCode) return;

    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1200));

    const isValid = VALID_CODES.includes(inviteCode.trim().toUpperCase());
    if (isValid) {
      setStatus("success");
    } else {
      setStatus("invalid-code");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  async function handleRequestSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || !name) return;

    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("request-sent");
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
            Got an invite code? Claim your founding spot. No code yet? Request
            one — we review every application.
          </p>
        </motion.div>

        {/* Mode toggle */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="mt-8 sm:mt-10 flex justify-center"
        >
          <div className="inline-flex rounded-full bg-background/[0.06] p-1">
            <button
              onClick={() => {
                setMode("invite");
                setStatus("idle");
              }}
              className={`px-5 sm:px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                mode === "invite"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-background/40 hover:text-background/60"
              }`}
            >
              <span className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5" />I Have a Code
              </span>
            </button>
            <button
              onClick={() => {
                setMode("request");
                setStatus("idle");
              }}
              className={`px-5 sm:px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                mode === "request"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-background/40 hover:text-background/60"
              }`}
            >
              <span className="flex items-center gap-2">
                <Send className="w-3.5 h-3.5" />
                Request an Invite
              </span>
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="mt-6 sm:mt-8"
        >
          <AnimatePresence mode="wait">
            {/* ===== SUCCESS STATE ===== */}
            {status === "success" && (
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
                    Welcome to the Kingdom, {name || "creative"}.
                  </p>
                  <p className="text-background/35 text-sm mt-2">
                    You&apos;re in. We&apos;ll send you everything soon.
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-1 bg-background/[0.06] px-5 py-2.5 rounded-full">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-background/50 text-sm">
                    You&apos;re founding member{" "}
                    <span className="text-background font-semibold">
                      #{queuePosition}
                    </span>{" "}
                    of 300
                  </span>
                </div>
              </motion.div>
            )}

            {/* ===== REQUEST SENT STATE ===== */}
            {status === "request-sent" && (
              <motion.div
                key="request-sent"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="flex flex-col items-center gap-5 py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  className="w-16 h-16 rounded-full bg-violet-500/20 flex items-center justify-center"
                >
                  <Send className="w-7 h-7 text-violet-400" />
                </motion.div>
                <div>
                  <p className="text-background text-xl font-[family-name:var(--font-heading)] font-medium">
                    Request received, {name || "creative"}.
                  </p>
                  <p className="text-background/35 text-sm mt-2 max-w-xs mx-auto">
                    We review every request personally. If you&apos;re a fit,
                    you&apos;ll get your invite code within 48 hours.
                  </p>
                </div>
              </motion.div>
            )}

            {/* ===== INVITE CODE FORM ===== */}
            {status !== "success" &&
              status !== "request-sent" &&
              mode === "invite" && (
                <motion.form
                  key="invite-form"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  onSubmit={handleInviteSubmit}
                  className="max-w-sm mx-auto"
                >
                  <div className="space-y-2.5">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter your invite code"
                        value={inviteCode}
                        onChange={(e) => {
                          setInviteCode(e.target.value.toUpperCase());
                          if (status === "invalid-code") setStatus("idle");
                        }}
                        className={`w-full bg-background/[0.06] border text-background placeholder:text-background/20 rounded-xl px-4 py-3.5 text-sm tracking-widest font-mono focus:outline-none transition-all text-center uppercase ${
                          status === "invalid-code"
                            ? "border-red-500/50 bg-red-500/[0.06]"
                            : "border-background/[0.06] focus:border-background/15 focus:bg-background/[0.08]"
                        }`}
                      />
                      {status === "invalid-code" && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-xs mt-1.5"
                        >
                          Invalid code. Check your spelling or request an
                          invite.
                        </motion.p>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Your name"
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

                  <p className="mt-4 text-[11px] text-background/15">
                    Your code is single-use. One code, one founding member.
                  </p>
                </motion.form>
              )}

            {/* ===== REQUEST INVITE FORM ===== */}
            {status !== "success" &&
              status !== "request-sent" &&
              mode === "request" && (
                <motion.form
                  key="request-form"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  onSubmit={handleRequestSubmit}
                  className="max-w-sm mx-auto"
                >
                  <div className="space-y-2.5">
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
                    <textarea
                      placeholder="Why do you want to join Kingdom Artists? (optional)"
                      rows={3}
                      className="w-full bg-background/[0.06] border border-background/[0.06] text-background placeholder:text-background/20 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-background/15 focus:bg-background/[0.08] transition-all resize-none"
                    />
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full bg-background/[0.08] border border-background/[0.1] text-background rounded-xl px-6 py-3.5 text-sm font-semibold hover:bg-background/[0.12] transition-all flex items-center justify-center gap-2.5 disabled:opacity-60 active:scale-[0.98] mt-1"
                    >
                      {status === "loading" ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          Request an Invite
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  <p className="mt-5 text-[11px] text-background/15">
                    We read every request personally. No algorithms, no bots — just us.
                  </p>
                </motion.form>
              )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
