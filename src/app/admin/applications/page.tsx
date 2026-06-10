"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Search,
  Check,
  X,
  Star,
  Users,
  Clock,
  Copy,
  ExternalLink,
  ChevronDown,
  Loader2,
  ArrowLeft,
  Inbox,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Application } from "@/lib/supabase";

interface Stats {
  total: number;
  pending: number;
  accepted: number;
  vouched: number;
  spotsRemaining: number;
}

const ADMIN_KEY_STORAGE = "ka-admin-key";

export default function ApplicationsPage() {
  const [adminKey, setAdminKey] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [applications, setApplications] = useState<Application[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "pending" | "accepted" | "rejected">("pending");
  const [search, setSearch] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Check for saved admin key
  useEffect(() => {
    const saved = localStorage.getItem(ADMIN_KEY_STORAGE);
    if (saved) {
      setAdminKey(saved);
      setIsAuthed(true);
    }
  }, []);

  const fetchApplications = useCallback(async () => {
    if (!adminKey) return;
    setLoading(true);

    try {
      const statusParam = filter === "all" ? "" : `?status=${filter}`;
      const res = await fetch(`/api/admin/applications${statusParam}`, {
        headers: { Authorization: `Bearer ${adminKey}` },
      });

      if (!res.ok) {
        if (res.status === 401) {
          setIsAuthed(false);
          localStorage.removeItem(ADMIN_KEY_STORAGE);
          return;
        }
        throw new Error("Failed to fetch");
      }

      const data = await res.json();
      setApplications(data.applications);
      setStats(data.stats);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [adminKey, filter]);

  useEffect(() => {
    if (isAuthed) {
      fetchApplications();
    }
  }, [isAuthed, fetchApplications]);

  async function handleAccept(id: string) {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/admin/applications/${id}/accept`, {
        method: "POST",
        headers: { Authorization: `Bearer ${adminKey}` },
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Failed to accept");
        return;
      }

      const data = await res.json();

      if (data.emailSent) {
        alert(
          `Accepted! Acceptance email sent automatically.\n\nReferral link: ${data.referral_link}`
        );
      } else {
        alert(
          `Accepted! Email sending isn't configured yet — copy their referral link and reach out manually:\n\n${data.referral_link}`
        );
      }

      await fetchApplications();
    } catch {
      alert("Network error");
    } finally {
      setActionLoading(null);
    }
  }

  async function handleReject(id: string) {
    if (!confirm("Reject this application?")) return;

    setActionLoading(id);
    try {
      await fetch(`/api/admin/applications/${id}/reject`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${adminKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      await fetchApplications();
    } catch {
      alert("Network error");
    } finally {
      setActionLoading(null);
    }
  }

  function copyToClipboard(text: string, id: string) {
    navigator.clipboard.writeText(text);
    setCopiedLink(id);
    setTimeout(() => setCopiedLink(null), 2000);
  }

  function handleLogin() {
    if (!adminKey.trim()) return;
    localStorage.setItem(ADMIN_KEY_STORAGE, adminKey.trim());
    setIsAuthed(true);
  }

  // Filter + search
  const filtered = applications.filter((app) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      app.name.toLowerCase().includes(q) ||
      app.email.toLowerCase().includes(q) ||
      (app.creative_type || "").toLowerCase().includes(q) ||
      (app.vouched_by || "").toLowerCase().includes(q)
    );
  });

  // ─── Login Screen ─────────────────────────────────────────────────────────

  if (!isAuthed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-foreground/[0.04] flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-foreground/60" />
            </div>
            <h1 className="font-[family-name:var(--font-heading)] text-2xl font-medium tracking-tight">
              Applications Admin
            </h1>
            <p className="text-sm text-foreground/40 mt-2">
              Enter your admin key to review applications.
            </p>
          </div>
          <div className="space-y-3">
            <input
              type="password"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="Admin secret key"
              className="w-full bg-foreground/[0.03] border border-foreground/[0.08] rounded-xl px-4 py-3 text-sm placeholder:text-foreground/25 focus:outline-none focus:border-foreground/20 transition-all"
            />
            <button
              onClick={handleLogin}
              className="w-full bg-foreground text-background rounded-xl px-4 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Main Dashboard ────────────────────────────────────────────────────────

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-6 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="p-2 -ml-2 rounded-lg hover:bg-foreground/[0.04] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-foreground/40" />
          </Link>
          <div>
            <h1 className="font-[family-name:var(--font-heading)] text-xl font-medium tracking-tight">
              Applications
            </h1>
            <p className="text-xs text-foreground/40 mt-0.5">
              Review and accept founding members
            </p>
          </div>
        </div>
        <button
          onClick={fetchApplications}
          disabled={loading}
          className="text-xs text-foreground/40 hover:text-foreground/70 transition-colors"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
          {[
            { label: "Total", value: stats.total, icon: Inbox },
            { label: "Pending", value: stats.pending, icon: Clock, highlight: stats.pending > 0 },
            { label: "Accepted", value: stats.accepted, icon: Check },
            { label: "Vouched", value: stats.vouched, icon: Star },
            { label: "Spots Left", value: stats.spotsRemaining, icon: Users },
          ].map((stat) => (
            <div
              key={stat.label}
              className={cn(
                "p-4 rounded-2xl border transition-colors",
                "highlight" in stat && stat.highlight
                  ? "bg-amber-50 border-amber-200/50"
                  : "bg-background border-foreground/[0.06]"
              )}
            >
              <div className="flex items-center gap-1.5 text-foreground/40 mb-1.5">
                <stat.icon className="w-3.5 h-3.5" />
                <span className="text-[11px]">{stat.label}</span>
              </div>
              <span className="font-[family-name:var(--font-heading)] text-2xl font-medium">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Filters + Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex gap-1.5 p-1 rounded-xl bg-foreground/[0.03] border border-foreground/[0.06]">
          {(["pending", "all", "accepted", "rejected"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all",
                filter === f
                  ? "bg-foreground text-background shadow-sm"
                  : "text-foreground/50 hover:text-foreground/80"
              )}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === "pending" && stats?.pending ? (
                <span className="ml-1.5 bg-amber-400 text-foreground px-1.5 py-0.5 rounded-full text-[10px]">
                  {stats.pending}
                </span>
              ) : null}
            </button>
          ))}
        </div>
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/25" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or creative type..."
            className="w-full bg-foreground/[0.03] border border-foreground/[0.06] rounded-xl pl-10 pr-4 py-2.5 text-sm placeholder:text-foreground/25 focus:outline-none focus:border-foreground/15 transition-colors"
          />
        </div>
      </div>

      {/* Applications List */}
      {loading && applications.length === 0 ? (
        <div className="py-20 text-center">
          <Loader2 className="w-5 h-5 animate-spin text-foreground/30 mx-auto" />
          <p className="text-sm text-foreground/40 mt-3">Loading applications...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center">
          <Inbox className="w-8 h-8 text-foreground/15 mx-auto mb-3" />
          <p className="text-sm text-foreground/40">
            {search
              ? "No applications match your search."
              : filter === "pending"
                ? "No pending applications. 🎉"
                : "No applications yet."}
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-foreground/[0.08] overflow-hidden bg-background">
          {/* table header */}
          <div className="hidden sm:grid grid-cols-[1.4fr_1.2fr_0.9fr_0.9fr_0.7fr_28px] gap-3 px-5 py-3 bg-foreground/[0.03] border-b border-foreground/[0.06] text-[10.5px] font-semibold uppercase tracking-wider text-foreground/35">
            <span>Applicant</span>
            <span>Craft</span>
            <span>Vouched By</span>
            <span>Applied</span>
            <span>Status</span>
            <span />
          </div>

          {filtered.map((app) => {
            const open = expandedId === app.id;
            return (
              <div key={app.id} className="border-b border-foreground/[0.05] last:border-b-0">
                {/* row */}
                <button
                  onClick={() => setExpandedId(open ? null : app.id)}
                  className={cn(
                    "w-full text-left grid grid-cols-[1fr_28px] sm:grid-cols-[1.4fr_1.2fr_0.9fr_0.9fr_0.7fr_28px] gap-3 items-center px-5 py-3.5 transition-colors hover:bg-foreground/[0.025]",
                    open && "bg-foreground/[0.025]",
                    app.status === "rejected" && "opacity-45"
                  )}
                >
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold tracking-tight truncate">
                      {app.name}
                      {app.priority === "high" && (
                        <Star className="inline w-3 h-3 ml-1.5 -mt-0.5 text-amber-500" fill="currentColor" />
                      )}
                    </span>
                    <span className="block text-xs text-foreground/40 truncate">{app.email}</span>
                  </span>
                  <span className="hidden sm:block text-xs text-foreground/55 truncate">
                    {app.creative_type || "—"}
                  </span>
                  <span className="hidden sm:block text-xs truncate">
                    {app.vouched_by ? (
                      <span className="text-amber-600">{app.vouched_by}</span>
                    ) : (
                      <span className="text-foreground/25">—</span>
                    )}
                  </span>
                  <span className="hidden sm:block text-xs text-foreground/40">
                    {new Date(app.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                  <span className="hidden sm:block">
                    {app.status === "pending" && (
                      <span className="inline-flex px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-medium">Pending</span>
                    )}
                    {app.status === "accepted" && (
                      <span className="inline-flex px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-medium">Accepted</span>
                    )}
                    {app.status === "rejected" && (
                      <span className="inline-flex px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-[10px] font-medium">Rejected</span>
                    )}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-foreground/30 transition-transform duration-300",
                      open && "rotate-180"
                    )}
                  />
                </button>

                {/* detail panel */}
                {open && (
                  <div className="px-5 pb-5 pt-1 bg-foreground/[0.015]">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 mb-4">
                      {[
                        { label: "Email", value: app.email, href: `mailto:${app.email}` },
                        { label: "Phone", value: app.phone, href: app.phone ? `tel:${app.phone}` : undefined },
                        { label: "Craft", value: app.creative_type },
                        {
                          label: "Instagram",
                          value: app.instagram,
                          href: app.instagram ? `https://instagram.com/${app.instagram.replace(/^@/, "")}` : undefined,
                        },
                        {
                          label: "TikTok",
                          value: app.tiktok,
                          href: app.tiktok ? `https://tiktok.com/@${app.tiktok.replace(/^@/, "")}` : undefined,
                        },
                        {
                          label: "Work / Portfolio",
                          value: app.portfolio_url?.replace(/^https?:\/\//, ""),
                          href: app.portfolio_url
                            ? app.portfolio_url.startsWith("http")
                              ? app.portfolio_url
                              : `https://${app.portfolio_url}`
                            : undefined,
                        },
                        { label: "Vouched By", value: app.vouched_by },
                        {
                          label: "Applied",
                          value: new Date(app.created_at).toLocaleDateString("en-US", {
                            month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit",
                          }),
                        },
                        {
                          label: "Accepted",
                          value: app.accepted_at
                            ? new Date(app.accepted_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                            : null,
                        },
                      ].map(
                        (field) =>
                          field.value && (
                            <div key={field.label}>
                              <p className="text-[10px] uppercase tracking-wider text-foreground/35 font-medium mb-0.5">
                                {field.label}
                              </p>
                              {field.href ? (
                                <a
                                  href={field.href}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 text-[13px] font-medium hover:underline break-all"
                                >
                                  {field.value}
                                  <ExternalLink className="w-3 h-3 text-foreground/30 shrink-0" />
                                </a>
                              ) : (
                                <p className="text-[13px] font-medium break-words">{field.value}</p>
                              )}
                            </div>
                          )
                      )}
                    </div>

                    {app.notes && (
                      <div className="mb-4 p-3 rounded-lg bg-background border border-foreground/[0.06]">
                        <p className="text-[10px] uppercase tracking-wider text-foreground/35 font-medium mb-1">Notes</p>
                        <p className="text-[13px] leading-relaxed">{app.notes}</p>
                      </div>
                    )}

                    {app.voice_note_url ? (
                      <div className="mb-4 p-3 rounded-lg bg-background border border-foreground/[0.06]">
                        <p className="text-[10px] uppercase tracking-wider text-foreground/35 font-medium mb-1.5">
                          🎙 Why do you create?
                        </p>
                        <audio controls preload="none" src={app.voice_note_url} className="w-full h-9" />
                      </div>
                    ) : (
                      <p className="mb-4 text-xs text-foreground/30">No voice note submitted.</p>
                    )}

                    {app.status === "accepted" && app.referral_slug && (
                      <div className="flex items-center gap-2 mb-4 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200/50">
                        <span className="text-xs text-emerald-800 truncate flex-1">
                          kingdomartists.com/?ref={app.referral_slug}
                        </span>
                        <button
                          onClick={() => copyToClipboard(`https://kingdomartists.com/?ref=${app.referral_slug}`, app.id)}
                          className="flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-600 text-white text-[10px] font-medium hover:bg-emerald-700 transition-colors"
                        >
                          {copiedLink === app.id ? (
                            <><Check className="w-3 h-3" /> Copied</>
                          ) : (
                            <><Copy className="w-3 h-3" /> Copy Link</>
                          )}
                        </button>
                      </div>
                    )}

                    {app.status === "pending" && (
                      <div className="flex items-center gap-2">
                        {actionLoading === app.id ? (
                          <Loader2 className="w-4 h-4 animate-spin text-foreground/30" />
                        ) : (
                          <>
                            <button
                              onClick={() => handleAccept(app.id)}
                              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
                            >
                              <Check className="w-3.5 h-3.5" />
                              Accept — Welcome to the Family
                            </button>
                            <button
                              onClick={() => handleReject(app.id)}
                              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-foreground/[0.1] text-foreground/45 text-xs font-medium hover:text-red-500 hover:border-red-200 transition-colors"
                            >
                              <X className="w-3.5 h-3.5" />
                              Not Right Now
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Spots progress */}
      {stats && (
        <div className="mt-8 p-5 rounded-2xl border border-foreground/[0.06] bg-foreground/[0.02]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-foreground/40">Founding 300 Progress</span>
            <span className="text-xs font-medium">
              {stats.accepted} / 300
            </span>
          </div>
          <div className="h-2 bg-foreground/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full bg-foreground rounded-full transition-all duration-500"
              style={{ width: `${Math.min((stats.accepted / 300) * 100, 100)}%` }}
            />
          </div>
          <p className="text-[11px] text-foreground/25 mt-2">
            {stats.spotsRemaining} spots remaining · {stats.vouched} vouched applications total
          </p>
        </div>
      )}
    </div>
  );
}
