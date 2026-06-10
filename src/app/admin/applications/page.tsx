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
  Filter,
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

      // Show the acceptance email content
      if (data.email) {
        setExpandedId(id);
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
        <div className="space-y-2">
          {filtered.map((app) => (
            <div
              key={app.id}
              className={cn(
                "rounded-2xl border p-4 sm:p-5 transition-all",
                app.priority === "high" && app.status === "pending"
                  ? "bg-amber-50/50 border-amber-200/40"
                  : "bg-background border-foreground/[0.06]",
                app.status === "rejected" && "opacity-50"
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* Name + badges */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-semibold tracking-tight">
                      {app.name}
                    </h3>
                    {app.priority === "high" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-medium">
                        <Star className="w-3 h-3" fill="currentColor" />
                        Vouched
                      </span>
                    )}
                    {app.status === "accepted" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-medium">
                        <Check className="w-3 h-3" />
                        Accepted
                      </span>
                    )}
                    {app.status === "rejected" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-[10px] font-medium">
                        <X className="w-3 h-3" />
                        Rejected
                      </span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-foreground/40">
                    <span>{app.email}</span>
                    {app.creative_type && (
                      <>
                        <span className="text-foreground/15">·</span>
                        <span>{app.creative_type}</span>
                      </>
                    )}
                    {app.vouched_by && (
                      <>
                        <span className="text-foreground/15">·</span>
                        <span className="text-amber-600">
                          Vouched by {app.vouched_by}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Timestamp */}
                  <p className="text-[11px] text-foreground/25 mt-1.5">
                    Applied {new Date(app.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                    {app.accepted_at && (
                      <>
                        {" · "}Accepted{" "}
                        {new Date(app.accepted_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </>
                    )}
                  </p>

                  {/* Referral link (for accepted) */}
                  {app.status === "accepted" && app.referral_slug && (
                    <div className="flex items-center gap-2 mt-3 p-2.5 rounded-lg bg-foreground/[0.03] border border-foreground/[0.06]">
                      <span className="text-xs text-foreground/50 truncate flex-1">
                        kingdomartists.com/?ref={app.referral_slug}
                      </span>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            `https://kingdomartists.com/?ref=${app.referral_slug}`,
                            app.id
                          )
                        }
                        className="flex items-center gap-1 px-2 py-1 rounded-md bg-foreground/[0.06] text-[10px] font-medium hover:bg-foreground/[0.1] transition-colors"
                      >
                        {copiedLink === app.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-500" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* Actions */}
                {app.status === "pending" && (
                  <div className="flex items-center gap-1.5 shrink-0">
                    {actionLoading === app.id ? (
                      <Loader2 className="w-4 h-4 animate-spin text-foreground/30" />
                    ) : (
                      <>
                        <button
                          onClick={() => handleAccept(app.id)}
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-700 transition-colors"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Accept
                        </button>
                        <button
                          onClick={() => handleReject(app.id)}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-foreground/[0.08] text-foreground/40 text-xs hover:text-red-500 hover:border-red-200 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
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
