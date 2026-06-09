"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Loader2, Sparkles } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const proofAvatars = [
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=60&h=60&fit=crop&crop=face",
];

export function WaitlistV2() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [creativeType, setCreativeType] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [queuePosition] = useState(() => Math.floor(Math.random() * 50 + 48));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1200));
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
            Join the Founding 300
          </span>
          <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.75rem,5vw,3.25rem)] font-medium tracking-tight mt-4 text-background leading-[1.1] text-balance">
            Your creative journey
            <br />
            <span className="italic text-background/60">starts right here</span>
          </h2>
          <p className="text-background/30 text-sm sm:text-[15px] mt-4 sm:mt-5 max-w-md mx-auto leading-relaxed text-balance">
            Lock in your founding member spot. Get lifetime free access, the
            exclusive golden check, and early access to everything we build.
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
                    You&apos;re founding member <span className="text-background font-semibold">#{queuePosition}</span> of 300
                  </span>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="max-w-sm mx-auto"
              >
                <div className="space-y-2.5">
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
                      <option key={type} value={type} className="text-foreground">
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

                {/* Social proof */}
                <div className="mt-6 flex items-center justify-center gap-2.5">
                  <div className="flex -space-x-1.5">
                    {proofAvatars.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt=""
                        className="w-6 h-6 rounded-full border-2 border-foreground/80 object-cover"
                      />
                    ))}
                  </div>
                  <span className="text-background/25 text-xs">
                    <span className="text-background/50 font-medium">800+</span>{" "}
                    creatives have joined
                  </span>
                </div>

                {/* Trust line */}
                <p className="mt-4 text-[11px] text-background/15">
                  No spam. No credit card. Just your spot in the Kingdom.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
