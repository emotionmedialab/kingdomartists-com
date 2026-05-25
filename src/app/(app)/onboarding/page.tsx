"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Camera,
  MapPin,
  Link as LinkIcon,
  Sparkles,
  Eye,
} from "lucide-react";
import { CATEGORIES } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const STEPS = [
  { title: "Your craft", icon: Sparkles },
  { title: "Location", icon: MapPin },
  { title: "Profile", icon: Camera },
  { title: "Links", icon: LinkIcon },
  { title: "Preview", icon: Eye },
];

const SOCIAL_FIELDS = [
  { key: "instagram", label: "Instagram", placeholder: "@yourhandle" },
  { key: "spotify", label: "Spotify", placeholder: "Artist profile URL" },
  { key: "youtube", label: "YouTube", placeholder: "Channel URL" },
  { key: "website", label: "Website", placeholder: "https://yoursite.com" },
  { key: "soundcloud", label: "SoundCloud", placeholder: "Profile URL" },
  { key: "behance", label: "Behance", placeholder: "Profile URL" },
  { key: "tiktok", label: "TikTok", placeholder: "@yourhandle" },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("US");
  const [from, setFrom] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [socials, setSocials] = useState<Record<string, string>>({});

  function next() {
    if (step < STEPS.length - 1) setStep(step + 1);
  }

  function back() {
    if (step > 0) setStep(step - 1);
  }

  const selectedCat = CATEGORIES.find((c) => c.slug === category);

  return (
    <div className="min-h-[calc(100dvh-3.5rem)] flex flex-col">
      {/* Progress */}
      <div className="max-w-xl mx-auto w-full px-5 pt-6 sm:pt-10">
        <div className="flex items-center gap-1">
          {STEPS.map((s, i) => (
            <div key={i} className="flex-1 flex items-center gap-1">
              <div
                className={cn(
                  "h-1 rounded-full flex-1 transition-all duration-500",
                  i <= step ? "bg-foreground" : "bg-border/60"
                )}
              />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-muted-foreground/50">
            Step {step + 1} of {STEPS.length}
          </span>
          <span className="text-xs text-muted-foreground/50 flex items-center gap-1">
            {(() => { const Icon = STEPS[step].icon; return <Icon className="w-3 h-3" />; })()}
            {STEPS[step].title}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-start justify-center px-5 pt-8 sm:pt-14 pb-24">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait">
            {/* Step 1: Category */}
            {step === 0 && (
              <motion.div
                key="step-0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease }}
              >
                <h1 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-medium">
                  What kind of creative
                  <br />
                  <span className="italic">are you?</span>
                </h1>
                <p className="text-sm text-muted-foreground mt-2 mb-6">
                  Choose your primary creative discipline.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => setCategory(cat.slug)}
                      className={cn(
                        "text-left p-3.5 rounded-xl border transition-all text-sm",
                        category === cat.slug
                          ? "border-foreground bg-foreground/[0.03] font-medium"
                          : "border-border/50 hover:border-border text-muted-foreground"
                      )}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Location */}
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease }}
              >
                <h1 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-medium">
                  Where are you
                  <br />
                  <span className="italic">based?</span>
                </h1>
                <p className="text-sm text-muted-foreground mt-2 mb-6">
                  Help other creatives find you by location.
                </p>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-muted-foreground/60 uppercase tracking-wider mb-1.5 block">
                      City
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Los Angeles"
                      className="w-full bg-muted/40 border border-border/50 rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground/30 focus:outline-none focus:border-foreground/20 transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-muted-foreground/60 uppercase tracking-wider mb-1.5 block">
                        State / Province
                      </label>
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="CA"
                        className="w-full bg-muted/40 border border-border/50 rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground/30 focus:outline-none focus:border-foreground/20 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground/60 uppercase tracking-wider mb-1.5 block">
                        Country
                      </label>
                      <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="US"
                        className="w-full bg-muted/40 border border-border/50 rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground/30 focus:outline-none focus:border-foreground/20 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground/60 uppercase tracking-wider mb-1.5 block">
                      Where are you from? (optional)
                    </label>
                    <input
                      type="text"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      placeholder="Houston, TX"
                      className="w-full bg-muted/40 border border-border/50 rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground/30 focus:outline-none focus:border-foreground/20 transition-colors"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Profile */}
            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease }}
              >
                <h1 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-medium">
                  Tell us about
                  <br />
                  <span className="italic">yourself</span>
                </h1>
                <p className="text-sm text-muted-foreground mt-2 mb-6">
                  A great profile helps you get discovered.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-muted/60 border-2 border-dashed border-border/60 flex items-center justify-center cursor-pointer hover:border-foreground/20 transition-colors">
                      <Camera className="w-6 h-6 text-muted-foreground/40" />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium text-foreground">Profile photo</p>
                      <p className="text-xs mt-0.5">Square, at least 400x400px</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground/60 uppercase tracking-wider mb-1.5 block">
                      Full name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full bg-muted/40 border border-border/50 rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground/30 focus:outline-none focus:border-foreground/20 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground/60 uppercase tracking-wider mb-1.5 block">
                      Bio
                    </label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell us about your creative journey, vision, and what drives you..."
                      rows={4}
                      maxLength={500}
                      className="w-full bg-muted/40 border border-border/50 rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground/30 focus:outline-none focus:border-foreground/20 transition-colors resize-none"
                    />
                    <div className="text-right text-[11px] text-muted-foreground/40 mt-1">
                      {bio.length}/500
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Links */}
            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease }}
              >
                <h1 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-medium">
                  Connect your
                  <br />
                  <span className="italic">platforms</span>
                </h1>
                <p className="text-sm text-muted-foreground mt-2 mb-6">
                  Add links so people can find your work. All optional.
                </p>
                <div className="space-y-3">
                  {SOCIAL_FIELDS.map((field) => (
                    <div key={field.key}>
                      <label className="text-xs text-muted-foreground/60 uppercase tracking-wider mb-1.5 block">
                        {field.label}
                      </label>
                      <input
                        type="text"
                        value={socials[field.key] || ""}
                        onChange={(e) =>
                          setSocials({ ...socials, [field.key]: e.target.value })
                        }
                        placeholder={field.placeholder}
                        className="w-full bg-muted/40 border border-border/50 rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground/30 focus:outline-none focus:border-foreground/20 transition-colors"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 5: Preview */}
            {step === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease }}
              >
                <h1 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-medium">
                  Looking
                  <br />
                  <span className="italic">good</span>
                </h1>
                <p className="text-sm text-muted-foreground mt-2 mb-6">
                  Here&apos;s how your profile will look. Publish when ready.
                </p>

                {/* Preview card */}
                <div className="rounded-2xl border border-border/50 overflow-hidden">
                  <div className="h-28 bg-gradient-to-r from-violet-200/30 via-rose-200/20 to-amber-200/30" />
                  <div className="p-5 -mt-10">
                    <div className="w-20 h-20 rounded-2xl bg-muted border-4 border-background flex items-center justify-center">
                      <Camera className="w-6 h-6 text-muted-foreground/30" />
                    </div>
                    <h2 className="font-[family-name:var(--font-heading)] text-xl font-medium mt-3">
                      {name || "Your Name"}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {selectedCat?.label || "Creative"}
                    </p>
                    {city && (
                      <p className="text-xs text-muted-foreground/50 mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {[city, state, country].filter(Boolean).join(", ")}
                      </p>
                    )}
                    {bio && (
                      <p className="text-sm text-foreground/70 mt-3 leading-relaxed">
                        {bio}
                      </p>
                    )}
                    {Object.entries(socials).filter(([, v]) => v).length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {Object.entries(socials)
                          .filter(([, v]) => v)
                          .map(([key]) => (
                            <span
                              key={key}
                              className="text-[11px] px-2.5 py-1 rounded-full bg-muted/60 text-muted-foreground capitalize"
                            >
                              {key}
                            </span>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-16 md:bottom-0 left-0 right-0 bg-background/90 backdrop-blur-xl border-t border-border/30 p-4">
        <div className="max-w-xl mx-auto flex items-center gap-3">
          {step > 0 && (
            <button
              onClick={back}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm text-muted-foreground border border-border/50 hover:bg-muted/50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}
          <button
            onClick={step === STEPS.length - 1 ? () => (window.location.href = "/profile") : next}
            className="flex-1 flex items-center justify-center gap-2 bg-foreground text-background px-6 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity active:scale-[0.97]"
          >
            {step === STEPS.length - 1 ? (
              <>
                Publish Profile
                <Check className="w-4 h-4" />
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
