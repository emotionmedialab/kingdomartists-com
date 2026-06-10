"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { useSearchParams } from "next/navigation";

const serif = "var(--font-heading), Georgia, serif";
const easeOut = "cubic-bezier(0.16, 1, 0.3, 1)";

const CREATIVE_TYPES = [
  "Singer",
  "Songwriter",
  "Worship Leader",
  "Producer",
  "Engineer",
  "Musician",
  "Filmmaker",
  "Photographer",
  "Designer",
  "Visual Artist",
  "Writer / Storyteller",
  "Other",
];

const VOICE_QUESTION = "Why do you create?";
const VOICE_WHISPER =
  "Take a breath. Not the resume answer — the real one. Up to 90 seconds.";
const MAX_RECORD_SECONDS = 90;

function formatReferrerName(ref: string) {
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

const bigInputStyle: CSSProperties = {
  appearance: "none",
  width: "100%",
  boxSizing: "border-box",
  background: "transparent",
  border: "none",
  borderBottom: "1px solid rgba(244,239,229,0.22)",
  padding: "12px 0 16px",
  fontFamily: serif,
  fontSize: "clamp(28px, 4.5vw, 56px)",
  fontWeight: 400,
  letterSpacing: "-0.01em",
  color: "#F4EFE5",
  caretColor: "#E0B45C",
  outline: "none",
  textAlign: "center",
};

const midInputStyle: CSSProperties = {
  ...bigInputStyle,
  fontSize: "clamp(20px, 2.6vw, 32px)",
};

const STEPS = [
  "intro",
  "name",
  "email",
  "phone",
  "craft",
  "socials",
  "links",
  "voice",
] as const;
type Step = (typeof STEPS)[number] | "done";
const NUMBERED = STEPS.length - 1; // exclude intro

export function ApplyFlow() {
  const searchParams = useSearchParams();
  const referrer = searchParams.get("ref") || "";
  const vouched = referrer.length > 0;
  const referrerName = vouched ? formatReferrerName(referrer) : "";

  const [step, setStep] = useState<Step>("intro");
  const [visible, setVisible] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [crafts, setCrafts] = useState<string[]>([]);
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // voice state
  const [recState, setRecState] = useState<
    "idle" | "recording" | "recorded" | "denied"
  >("idle");
  const [seconds, setSeconds] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const blobRef = useRef<Blob | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const firstName = name.trim().split(/\s+/)[0] || "friend";
  const stepIndex = step === "done" ? STEPS.length : STEPS.indexOf(step);
  const progress = Math.max(0, stepIndex) / STEPS.length;

  const goTo = useCallback((next: Step) => {
    setError("");
    setVisible(false);
    setTimeout(() => {
      setStep(next);
      setVisible(true);
    }, 280);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => inputRef.current?.focus(), 350);
    return () => clearTimeout(t);
  }, [step, visible]);

  // stop tracks on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      recorderRef.current?.stream.getTracks().forEach((t) => t.stop());
    };
  }, []);

  function validate(current: Step): string {
    if (current === "name" && !name.trim())
      return "Tell us your name. A real person is reading.";
    if (
      current === "email" &&
      (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    )
      return "We need a valid email to reach you.";
    if (current === "phone" && phone.trim().replace(/\D/g, "").length < 7)
      return "We need a phone number to reach you.";
    if (current === "craft" && crafts.length === 0)
      return "Choose at least one.";
    return "";
  }

  function next() {
    const err = validate(step);
    if (err) {
      setError(err);
      return;
    }
    if (step === "voice") {
      submit();
      return;
    }
    const i = STEPS.indexOf(step as (typeof STEPS)[number]);
    goTo(STEPS[i + 1]);
  }

  function back() {
    const i = STEPS.indexOf(step as (typeof STEPS)[number]);
    if (i > 0) goTo(STEPS[i - 1]);
  }

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const mime = MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : "audio/mp4";
      const rec = new MediaRecorder(stream, { mimeType: mime });
      const chunks: Blob[] = [];
      rec.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };
      rec.onstop = () => {
        const blob = new Blob(chunks, { type: mime });
        blobRef.current = blob;
        setAudioUrl(URL.createObjectURL(blob));
        setRecState("recorded");
        stream.getTracks().forEach((t) => t.stop());
        if (timerRef.current) clearInterval(timerRef.current);
      };
      recorderRef.current = rec;
      rec.start();
      setSeconds(0);
      setRecState("recording");
      timerRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s + 1 >= MAX_RECORD_SECONDS) {
            rec.stop();
            return s + 1;
          }
          return s + 1;
        });
      }, 1000);
    } catch {
      setRecState("denied");
    }
  }

  function stopRecording() {
    recorderRef.current?.stop();
  }

  function reRecord() {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    blobRef.current = null;
    setSeconds(0);
    setRecState("idle");
  }

  async function submit() {
    setSubmitting(true);
    setError("");

    // upload voice note first (best-effort — never blocks the application)
    let voiceUrl: string | null = null;
    if (blobRef.current) {
      try {
        const fd = new FormData();
        fd.append("audio", blobRef.current, "voice-note");
        const up = await fetch("/api/voice", { method: "POST", body: fd });
        if (up.ok) {
          const d = await up.json();
          voiceUrl = d.url || null;
        }
      } catch {
        // proceed without the recording
      }
    }

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          creative_type: crafts.join(", "),
          instagram: instagram.trim() || null,
          tiktok: tiktok.trim() || null,
          portfolio_url: portfolio.trim() || null,
          voice_note_url: voiceUrl,
          vouched_by: referrer || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      goTo("done");
    } catch {
      setError("Network error. Check your connection and try again.");
      setSubmitting(false);
    }
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter" && step !== "done" && step !== "voice") {
      e.preventDefault();
      next();
    }
  }

  const fade: CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0px)" : "translateY(14px)",
    transition: `opacity 0.28s ease, transform 0.28s ${easeOut}`,
  };

  return (
    <div
      className="ka-page"
      onKeyDown={onKeyDown}
      style={{
        minHeight: "100dvh",
        background: "#121009",
        backgroundImage:
          "radial-gradient(1000px 600px at 50% -10%, rgba(224,180,92,0.12), transparent 65%)",
        display: "flex",
        flexDirection: "column",
        color: "#F4EFE5",
      }}
    >
      <div className="ka-grain" />

      {/* progress hairline */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          zIndex: 90,
          background: "rgba(244,239,229,0.08)",
        }}
      >
        <div
          style={{
            width: `${(step === "done" ? 1 : progress) * 100}%`,
            height: "100%",
            background: "#B8872B",
            transition: "width 0.5s " + easeOut,
          }}
        />
      </div>

      {/* top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "clamp(16px, 2.5vw, 28px) clamp(20px, 5vw, 64px)",
        }}
      >
        <a
          href="/"
          style={{
            fontFamily: serif,
            fontWeight: 500,
            fontSize: "clamp(17px, 1.5vw, 21px)",
            color: "#F4EFE5",
            textDecoration: "none",
          }}
        >
          Kingdom Artists
        </a>
        {step !== "done" && step !== "intro" && (
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(244,239,229,0.4)",
            }}
          >
            <span style={{ fontFamily: serif, fontSize: 16, color: "#E0B45C" }}>
              {String(stepIndex).padStart(2, "0")}
            </span>{" "}
            / {String(NUMBERED).padStart(2, "0")}
          </span>
        )}
      </div>

      {/* stage */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "24px clamp(20px, 6vw, 64px) 64px",
          maxWidth: 860,
          width: "100%",
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        <div style={{ ...fade, width: "100%" }}>
          {step === "intro" && (
            <div>
              {vouched && (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    border: "1px solid rgba(224,180,92,0.5)",
                    background: "rgba(224,180,92,0.08)",
                    borderRadius: 999,
                    padding: "10px 20px",
                    marginBottom: 28,
                    fontSize: 12.5,
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    color: "#E0B45C",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      background: "#E0B45C",
                      color: "#16140F",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    ✓
                  </span>
                  Vouched by {referrerName} · Fast-tracked
                </div>
              )}
              <p
                style={{
                  margin: "0 0 24px",
                  fontSize: 11.5,
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#E0B45C",
                }}
              >
                For Such a Time as This
              </p>
              <h1
                style={{
                  margin: "0 0 24px",
                  fontFamily: serif,
                  fontWeight: 500,
                  fontSize: "clamp(40px, 6.5vw, 88px)",
                  lineHeight: 1.06,
                  letterSpacing: "-0.02em",
                }}
              >
                You didn&apos;t find this page{" "}
                <em
                  style={{
                    display: "block",
                    fontWeight: 400,
                    color: "rgba(244,239,229,0.7)",
                  }}
                >
                  by accident.
                </em>
              </h1>
              <p
                style={{
                  margin: "0 auto 40px",
                  maxWidth: 460,
                  fontSize: 15.5,
                  lineHeight: 1.75,
                  color: "rgba(244,239,229,0.55)",
                }}
              >
                {vouched
                  ? `${referrerName} put their name on yours. You're at the front of the line.`
                  : "300 founding spots. Reviewed personally."}
              </p>
              <button onClick={next} style={primaryBtn}>
                Begin →
              </button>
            </div>
          )}

          {step === "name" && (
            <QuestionShell title="What's your name?" error={error} onNext={next} onBack={back}>
              <input
                ref={inputRef}
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
                placeholder="Your full name"
                style={bigInputStyle}
              />
            </QuestionShell>
          )}

          {step === "email" && (
            <QuestionShell
              title={`Good to meet you, ${firstName}. Where can we reach you?`}
              error={error}
              onNext={next}
              onBack={back}
            >
              <input
                ref={inputRef}
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="you@example.com"
                style={bigInputStyle}
              />
            </QuestionShell>
          )}

          {step === "phone" && (
            <QuestionShell
              title="And a number — for when it's good news."
              error={error}
              onNext={next}
              onBack={back}
            >
              <input
                ref={inputRef}
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setError("");
                }}
                placeholder="+1 (555) 123-4567"
                style={bigInputStyle}
              />
            </QuestionShell>
          )}

          {step === "craft" && (
            <QuestionShell
              title="What kind of creative are you?"
              subtitle="Choose all that apply."
              error={error}
              onNext={next}
              onBack={back}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: 10,
                  maxWidth: 720,
                  margin: "0 auto",
                }}
              >
                {CREATIVE_TYPES.map((t) => {
                  const active = crafts.includes(t);
                  return (
                    <button
                      key={t}
                      onClick={() => {
                        setCrafts((prev) =>
                          prev.includes(t)
                            ? prev.filter((c) => c !== t)
                            : [...prev, t]
                        );
                        setError("");
                      }}
                      style={{
                        border: active
                          ? "1px solid #E0B45C"
                          : "1px solid rgba(244,239,229,0.22)",
                        background: active
                          ? "rgba(224,180,92,0.12)"
                          : "rgba(255,255,255,0.03)",
                        color: active ? "#E0B45C" : "rgba(244,239,229,0.75)",
                        borderRadius: 999,
                        padding: "13px 22px",
                        fontFamily: "inherit",
                        fontSize: 14,
                        fontWeight: 500,
                        letterSpacing: "0.02em",
                        cursor: "pointer",
                        transition:
                          "border-color 0.25s ease, background 0.25s ease, color 0.25s ease, transform 0.25s ease",
                        transform: active ? "scale(1.04)" : "scale(1)",
                      }}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </QuestionShell>
          )}

          {step === "socials" && (
            <QuestionShell
              title="Where do you share your work?"
              subtitle="Optional — but we'd love to see what you're already building."
              error={error}
              onNext={next}
              onBack={back}
            >
              <div
                style={{
                  display: "grid",
                  gap: 28,
                  maxWidth: 560,
                  margin: "0 auto",
                }}
              >
                <div>
                  <span style={socialLabel}>Instagram</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="@yourhandle"
                    style={midInputStyle}
                  />
                </div>
                <div>
                  <span style={socialLabel}>TikTok</span>
                  <input
                    type="text"
                    value={tiktok}
                    onChange={(e) => setTiktok(e.target.value)}
                    placeholder="@yourhandle"
                    style={midInputStyle}
                  />
                </div>
              </div>
            </QuestionShell>
          )}

          {step === "links" && (
            <QuestionShell
              title="Where can we hear or see your work?"
              subtitle="Spotify, YouTube, a portfolio, a website — any link that shows your gift. Optional."
              error={error}
              onNext={next}
              onBack={back}
            >
              <div style={{ maxWidth: 620, margin: "0 auto" }}>
                <input
                  ref={inputRef}
                  type="url"
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  placeholder="open.spotify.com/artist/you"
                  style={midInputStyle}
                />
              </div>
            </QuestionShell>
          )}

          {step === "voice" && (
            <div style={{ width: "min(92vw, 760px)", margin: "0 auto" }}>
              <p
                style={{
                  margin: "0 0 18px",
                  fontSize: 11.5,
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#E0B45C",
                }}
              >
                One Last Thing — In Your Own Voice
              </p>
              <h2
                style={{
                  margin: "0 0 10px",
                  fontFamily: serif,
                  fontWeight: 500,
                  fontSize: "clamp(34px, 5.5vw, 72px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  color: "#F4EFE5",
                }}
              >
                {VOICE_QUESTION}
              </h2>
              <p
                style={{
                  margin: "0 0 36px",
                  fontSize: 13.5,
                  color: "rgba(244,239,229,0.45)",
                }}
              >
                {VOICE_WHISPER}
              </p>

              {/* recorder */}
              <div style={{ marginBottom: 36 }}>
                {recState === "idle" && (
                  <button
                    onClick={startRecording}
                    style={{
                      ...recBtnBase,
                      border: "1px solid rgba(224,180,92,0.5)",
                      background: "rgba(224,180,92,0.08)",
                      color: "#E0B45C",
                    }}
                  >
                    <span style={recDot("#E0B45C")} /> Tap to record
                  </button>
                )}
                {recState === "recording" && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 18,
                    }}
                  >
                    <button
                      onClick={stopRecording}
                      style={{
                        ...recBtnBase,
                        border: "1px solid rgba(224,92,92,0.6)",
                        background: "rgba(224,92,92,0.1)",
                        color: "#E07B5C",
                      }}
                    >
                      <span
                        style={{
                          ...recDot("#E05C5C"),
                          animation: "ka-tickpulse 1.2s ease-in-out infinite",
                        }}
                      />
                      Recording… {String(Math.floor(seconds / 60))}:
                      {String(seconds % 60).padStart(2, "0")} — tap to stop
                    </button>
                    <span
                      style={{ fontSize: 12, color: "rgba(244,239,229,0.35)" }}
                    >
                      Max {MAX_RECORD_SECONDS} seconds
                    </span>
                  </div>
                )}
                {recState === "recorded" && audioUrl && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 16,
                    }}
                  >
                    <audio
                      controls
                      src={audioUrl}
                      style={{ width: "min(100%, 420px)" }}
                    />
                    <button
                      onClick={reRecord}
                      style={{
                        border: "none",
                        background: "transparent",
                        color: "rgba(244,239,229,0.55)",
                        fontFamily: "inherit",
                        fontSize: 13,
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      Record again
                    </button>
                  </div>
                )}
                {recState === "denied" && (
                  <p
                    style={{
                      margin: 0,
                      fontSize: 14,
                      color: "rgba(244,239,229,0.55)",
                    }}
                  >
                    We couldn&apos;t access your microphone. You can still
                    submit — we&apos;ll ask you this one in person.
                  </p>
                )}
              </div>

              {error && (
                <p
                  style={{ margin: "0 0 20px", fontSize: 13.5, color: "#E0B45C" }}
                >
                  {error}
                </p>
              )}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 18,
                }}
              >
                <button onClick={back} style={backBtn}>
                  ← Back
                </button>
                <button
                  onClick={next}
                  disabled={submitting || recState === "recording"}
                  style={{
                    ...primaryBtn,
                    opacity: submitting || recState === "recording" ? 0.6 : 1,
                  }}
                >
                  {submitting
                    ? "Submitting..."
                    : vouched
                      ? "Complete My Application →"
                      : "Submit Application →"}
                </button>
              </div>
              {recState !== "recorded" && recState !== "recording" && (
                <p
                  style={{
                    margin: "18px 0 0",
                    fontSize: 11.5,
                    color: "rgba(244,239,229,0.3)",
                  }}
                >
                  The voice note is optional — but it&apos;s the part we listen
                  to first.
                </p>
              )}
            </div>
          )}

          {step === "done" && (
            <div style={{ padding: "24px 0" }}>
              <svg
                width="92"
                height="92"
                viewBox="0 0 92 92"
                style={{ display: "block", margin: "0 auto 36px" }}
              >
                <circle
                  cx="46"
                  cy="46"
                  r="44"
                  fill="none"
                  stroke="rgba(224,180,92,0.4)"
                  strokeWidth="1.5"
                  style={{
                    strokeDasharray: 277,
                    strokeDashoffset: 277,
                    animation: `ka-draw 1s cubic-bezier(0.65,0,0.35,1) 0.1s forwards`,
                  }}
                />
                <path
                  d="M30 47 L42 59 L63 35"
                  fill="none"
                  stroke="#E0B45C"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: 62,
                    strokeDashoffset: 62,
                    animation: `ka-draw 0.55s cubic-bezier(0.65,0,0.35,1) 0.85s forwards`,
                  }}
                />
              </svg>
              <h1
                style={{
                  margin: "0 0 20px",
                  fontFamily: serif,
                  fontWeight: 500,
                  fontSize: "clamp(34px, 4.6vw, 64px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  opacity: 0,
                  animation: `ka-fade 0.8s ${easeOut} 1.2s forwards`,
                }}
              >
                {vouched
                  ? `You've been fast-tracked, ${firstName}.`
                  : `We see you, ${firstName}.`}
              </h1>
              <p
                style={{
                  margin: "0 auto 40px",
                  maxWidth: 440,
                  fontSize: 15.5,
                  lineHeight: 1.75,
                  color: "rgba(244,239,229,0.55)",
                  opacity: 0,
                  animation: `ka-fade 0.8s ${easeOut} 1.45s forwards`,
                }}
              >
                {vouched
                  ? `${referrerName} put their name on yours. Review within 24 to 48 hours. Watch your inbox.`
                  : "A real person on our team has your application. We'll be in touch."}
              </p>
              <a
                href="/"
                style={{
                  ...primaryBtn,
                  textDecoration: "none",
                  display: "inline-flex",
                  opacity: 0,
                  animation: `ka-fade 0.8s ${easeOut} 1.7s forwards`,
                }}
              >
                ← Back to Kingdom Artists
              </a>
            </div>
          )}
        </div>
      </div>

      {/* footer whisper */}
      {step !== "done" && (
        <p
          style={{
            margin: 0,
            padding: "0 20px 28px",
            textAlign: "center",
            fontSize: 12,
            color: "rgba(244,239,229,0.3)",
          }}
        >
          {vouched
            ? "Fast-tracked applications are reviewed within 24 to 48 hours."
            : "Every application is read by a real person."}
        </p>
      )}
    </div>
  );
}

const primaryBtn: CSSProperties = {
  border: "none",
  cursor: "pointer",
  background: "#F4EFE5",
  color: "#16140F",
  borderRadius: 999,
  padding: "18px 44px",
  fontFamily: "inherit",
  fontSize: 14,
  fontWeight: 600,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
};

const backBtn: CSSProperties = {
  border: "1px solid rgba(244,239,229,0.25)",
  background: "transparent",
  color: "rgba(244,239,229,0.65)",
  borderRadius: 999,
  padding: "16px 26px",
  fontFamily: "inherit",
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  cursor: "pointer",
};

const recBtnBase: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 12,
  borderRadius: 999,
  padding: "18px 36px",
  fontFamily: "inherit",
  fontSize: 14,
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  cursor: "pointer",
};

function recDot(color: string): CSSProperties {
  return {
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: color,
  };
}

const socialLabel: CSSProperties = {
  display: "block",
  marginBottom: 2,
  fontSize: 10.5,
  fontWeight: 600,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "rgba(244,239,229,0.45)",
  textAlign: "center",
};

function QuestionShell({
  title,
  subtitle,
  error,
  children,
  onNext,
  onBack,
  nextLabel = "Continue →",
  nextDisabled = false,
}: {
  title: string;
  subtitle?: string;
  error: string;
  children: React.ReactNode;
  onNext: () => void;
  onBack: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
}) {
  return (
    <div style={{ width: "min(92vw, 760px)", margin: "0 auto" }}>
      <h2
        style={{
          margin: "0 0 10px",
          fontFamily: serif,
          fontWeight: 500,
          fontSize: "clamp(26px, 3.6vw, 48px)",
          lineHeight: 1.15,
          letterSpacing: "-0.015em",
          color: "#F4EFE5",
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            margin: "0 0 8px",
            fontSize: 13,
            color: "rgba(244,239,229,0.4)",
          }}
        >
          {subtitle}
        </p>
      )}
      <div style={{ margin: "clamp(24px, 4vh, 44px) 0" }}>{children}</div>
      {error && (
        <p style={{ margin: "0 0 20px", fontSize: 13.5, color: "#E0B45C" }}>
          {error}
        </p>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 18,
        }}
      >
        <button onClick={onBack} style={backBtn}>
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={nextDisabled}
          style={{ ...primaryBtn, opacity: nextDisabled ? 0.7 : 1 }}
        >
          {nextLabel}
        </button>
      </div>
      <p
        style={{
          margin: "18px 0 0",
          fontSize: 11.5,
          color: "rgba(244,239,229,0.3)",
        }}
      >
        press <span style={{ color: "rgba(244,239,229,0.55)" }}>Enter ↵</span>{" "}
        to continue
      </p>
    </div>
  );
}
