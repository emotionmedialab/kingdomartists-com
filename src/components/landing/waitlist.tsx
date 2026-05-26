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

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [creativeType, setCreativeType] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
  }

  return (
    <section id="join" className="relative py-20 sm:py-32">
      <div className="absolute inset-0 bg-foreground rounded-t-[2rem] sm:rounded-t-[3rem]" />

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <span className="text-[11px] tracking-[0.3em] uppercase text-background/30">
            Early Access
          </span>
          <h2 className="font-[family-name:var(--font-heading)] text-2xl sm:text-4xl lg:text-[3.25rem] font-medium tracking-tight mt-3 text-background leading-[1.1] text-balance">
            Your creative journey
            <br />
            <span className="italic">starts here</span>
          </h2>
          <p className="text-background/40 text-sm sm:text-base mt-4 sm:mt-5 max-w-md mx-auto text-balance">
            Join the waitlist to be among the first Kingdom creatives on the
            platform. Early members help shape the community.
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
                className="flex flex-col items-center gap-4 py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  className="w-14 h-14 rounded-full bg-background/10 flex items-center justify-center"
                >
                  <Check className="w-6 h-6 text-background" />
                </motion.div>
                <div>
                  <p className="text-background text-lg font-medium">
                    Welcome to the Kingdom
                  </p>
                  <p className="text-background/40 text-sm mt-1">
                    We&apos;ll be in touch soon with early access.
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-2 text-background/25 text-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  You&apos;re #{Math.floor(Math.random() * 200 + 800)} on the waitlist
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
                    className="w-full bg-background/[0.06] border border-background/[0.08] text-background placeholder:text-background/25 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-background/20 focus:bg-background/[0.1] transition-all"
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-background/[0.06] border border-background/[0.08] text-background placeholder:text-background/25 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-background/20 focus:bg-background/[0.1] transition-all"
                  />
                  <select
                    value={creativeType}
                    onChange={(e) => setCreativeType(e.target.value)}
                    className="w-full bg-background/[0.06] border border-background/[0.08] text-background/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-background/20 transition-all appearance-none"
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
                    className="w-full bg-background text-foreground rounded-xl px-6 py-3 text-sm font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-60 active:scale-[0.98]"
                  >
                    {status === "loading" ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        Get Early Access
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                {/* Social proof below form */}
                <div className="mt-5 flex items-center justify-center gap-2.5">
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
                  <span className="text-background/30 text-xs">
                    <span className="text-background/60 font-medium">800+</span>{" "}
                    creatives have joined
                  </span>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
