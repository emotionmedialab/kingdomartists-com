"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Trash2,
  Edit3,
  ExternalLink,
  Users,
  Eye,
  X,
  Check,
  ChevronDown,
  Image as ImageIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getAllArtists,
  getCustomArtists,
  addArtist,
  updateArtist,
  deleteArtist,
  createBlankArtist,
  CATEGORIES,
} from "@/lib/artist-store";
import type { Artist } from "@/lib/artist-store";
import { MOCK_ARTISTS } from "@/lib/mock-data";

type FormData = Omit<Artist, "id" | "username" | "joinedAt">;

const TAG_SUGGESTIONS = [
  "Worship",
  "Gospel",
  "R&B",
  "Hip-Hop",
  "Neo-Soul",
  "Contemporary",
  "Jazz",
  "Classical",
  "Rock",
  "Pop",
  "Electronic",
  "Acoustic",
  "Branding",
  "Art Direction",
  "Typography",
  "Photography",
  "Cinematography",
  "Editing",
  "Illustration",
  "Mixing",
  "Mastering",
  "Songwriting",
  "Production",
  "Portrait",
  "Documentary",
  "Fine Art",
  "Motion Graphics",
  "Animation",
  "Creative Direction",
  "Content Strategy",
];

const SOCIAL_FIELDS = [
  { key: "instagram", label: "Instagram", placeholder: "@handle" },
  { key: "spotify", label: "Spotify", placeholder: "Profile name" },
  { key: "youtube", label: "YouTube", placeholder: "Channel name" },
  { key: "website", label: "Website", placeholder: "https://..." },
  { key: "soundcloud", label: "SoundCloud", placeholder: "Profile name" },
  { key: "behance", label: "Behance", placeholder: "Profile name" },
  { key: "tiktok", label: "TikTok", placeholder: "@handle" },
];

function ArtistForm({
  initial,
  onSave,
  onCancel,
  isEditing,
}: {
  initial: FormData;
  onSave: (data: FormData) => void;
  onCancel: () => void;
  isEditing: boolean;
}) {
  const [form, setForm] = useState<FormData>(initial);
  const [tagInput, setTagInput] = useState("");
  const [workSampleUrl, setWorkSampleUrl] = useState("");
  const [workSampleAlt, setWorkSampleAlt] = useState("");

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateLink(key: string, value: string) {
    setForm((prev) => ({ ...prev, links: { ...prev.links, [key]: value } }));
  }

  function addTag(tag: string) {
    const trimmed = tag.trim();
    if (trimmed && !form.tags.includes(trimmed)) {
      update("tags", [...form.tags, trimmed]);
    }
    setTagInput("");
  }

  function removeTag(tag: string) {
    update(
      "tags",
      form.tags.filter((t) => t !== tag)
    );
  }

  function addWorkSample() {
    if (!workSampleUrl) return;
    update("workSamples", [
      ...form.workSamples,
      { src: workSampleUrl, alt: workSampleAlt || "Work sample" },
    ]);
    setWorkSampleUrl("");
    setWorkSampleAlt("");
  }

  function removeWorkSample(idx: number) {
    update(
      "workSamples",
      form.workSamples.filter((_, i) => i !== idx)
    );
  }

  const isValid = form.name && form.role && form.category;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm overflow-y-auto py-8">
      <div className="bg-background rounded-2xl border border-border/40 shadow-xl w-full max-w-2xl mx-4 my-4">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border/30">
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-medium">
            {isEditing ? "Edit Artist" : "Add New Artist"}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 -mr-2 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="p-5 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Basic info */}
          <section>
            <h3 className="text-xs font-medium text-muted-foreground/60 uppercase tracking-wider mb-3">
              Basic Information
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground/50 mb-1 block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Ava Morales"
                    className="w-full bg-muted/30 border border-border/40 rounded-xl px-3.5 py-2.5 text-sm placeholder:text-muted-foreground/30 focus:outline-none focus:border-foreground/20 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground/50 mb-1 block">
                    Role / Title *
                  </label>
                  <input
                    type="text"
                    value={form.role}
                    onChange={(e) => update("role", e.target.value)}
                    placeholder="Vocalist & Songwriter"
                    className="w-full bg-muted/30 border border-border/40 rounded-xl px-3.5 py-2.5 text-sm placeholder:text-muted-foreground/30 focus:outline-none focus:border-foreground/20 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground/50 mb-1 block">
                  Category *
                </label>
                <select
                  value={form.category}
                  onChange={(e) => update("category", e.target.value)}
                  className="w-full bg-muted/30 border border-border/40 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-foreground/20 transition-colors appearance-none"
                >
                  <option value="">Select a category...</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground/50 mb-1 block">
                  Bio
                </label>
                <textarea
                  value={form.bio}
                  onChange={(e) => update("bio", e.target.value)}
                  placeholder="Tell us about this creative..."
                  rows={3}
                  maxLength={500}
                  className="w-full bg-muted/30 border border-border/40 rounded-xl px-3.5 py-2.5 text-sm placeholder:text-muted-foreground/30 focus:outline-none focus:border-foreground/20 transition-colors resize-none"
                />
                <div className="text-right text-[10px] text-muted-foreground/30 mt-0.5">
                  {form.bio.length}/500
                </div>
              </div>
            </div>
          </section>

          {/* Location */}
          <section>
            <h3 className="text-xs font-medium text-muted-foreground/60 uppercase tracking-wider mb-3">
              Location
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-muted-foreground/50 mb-1 block">
                  City
                </label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  placeholder="Los Angeles"
                  className="w-full bg-muted/30 border border-border/40 rounded-xl px-3.5 py-2.5 text-sm placeholder:text-muted-foreground/30 focus:outline-none focus:border-foreground/20 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground/50 mb-1 block">
                  State
                </label>
                <input
                  type="text"
                  value={form.state}
                  onChange={(e) => update("state", e.target.value)}
                  placeholder="CA"
                  className="w-full bg-muted/30 border border-border/40 rounded-xl px-3.5 py-2.5 text-sm placeholder:text-muted-foreground/30 focus:outline-none focus:border-foreground/20 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground/50 mb-1 block">
                  Country
                </label>
                <input
                  type="text"
                  value={form.country}
                  onChange={(e) => update("country", e.target.value)}
                  placeholder="US"
                  className="w-full bg-muted/30 border border-border/40 rounded-xl px-3.5 py-2.5 text-sm placeholder:text-muted-foreground/30 focus:outline-none focus:border-foreground/20 transition-colors"
                />
              </div>
            </div>
            <div className="mt-3">
              <label className="text-xs text-muted-foreground/50 mb-1 block">
                Originally From
              </label>
              <input
                type="text"
                value={form.from}
                onChange={(e) => update("from", e.target.value)}
                placeholder="Houston, TX"
                className="w-full bg-muted/30 border border-border/40 rounded-xl px-3.5 py-2.5 text-sm placeholder:text-muted-foreground/30 focus:outline-none focus:border-foreground/20 transition-colors"
              />
            </div>
          </section>

          {/* Images */}
          <section>
            <h3 className="text-xs font-medium text-muted-foreground/60 uppercase tracking-wider mb-3">
              Images
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground/50 mb-1 block">
                  Profile Photo URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={form.image}
                    onChange={(e) => update("image", e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 bg-muted/30 border border-border/40 rounded-xl px-3.5 py-2.5 text-sm placeholder:text-muted-foreground/30 focus:outline-none focus:border-foreground/20 transition-colors"
                  />
                  {form.image && (
                    <img
                      src={form.image}
                      alt=""
                      className="w-10 h-10 rounded-lg object-cover border border-border/30"
                    />
                  )}
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground/50 mb-1 block">
                  Banner Image URL
                </label>
                <input
                  type="url"
                  value={form.banner}
                  onChange={(e) => update("banner", e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-muted/30 border border-border/40 rounded-xl px-3.5 py-2.5 text-sm placeholder:text-muted-foreground/30 focus:outline-none focus:border-foreground/20 transition-colors"
                />
              </div>
            </div>
          </section>

          {/* Tags */}
          <section>
            <h3 className="text-xs font-medium text-muted-foreground/60 uppercase tracking-wider mb-3">
              Tags / Skills
            </h3>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {form.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-foreground text-background text-xs"
                >
                  {tag}
                  <button onClick={() => removeTag(tag)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag(tagInput);
                  }
                }}
                placeholder="Type a tag and press Enter..."
                className="flex-1 bg-muted/30 border border-border/40 rounded-xl px-3.5 py-2.5 text-sm placeholder:text-muted-foreground/30 focus:outline-none focus:border-foreground/20 transition-colors"
              />
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {TAG_SUGGESTIONS.filter(
                (t) => !form.tags.includes(t)
              )
                .slice(0, 12)
                .map((tag) => (
                  <button
                    key={tag}
                    onClick={() => addTag(tag)}
                    className="px-2 py-0.5 rounded-full bg-muted/50 text-[11px] text-muted-foreground/60 hover:bg-muted hover:text-foreground transition-colors"
                  >
                    + {tag}
                  </button>
                ))}
            </div>
          </section>

          {/* Social Links */}
          <section>
            <h3 className="text-xs font-medium text-muted-foreground/60 uppercase tracking-wider mb-3">
              Social Links
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {SOCIAL_FIELDS.map((field) => (
                <div key={field.key}>
                  <label className="text-[10px] text-muted-foreground/40 mb-0.5 block">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    value={(form.links as Record<string, string>)[field.key] || ""}
                    onChange={(e) => updateLink(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full bg-muted/30 border border-border/40 rounded-lg px-3 py-2 text-xs placeholder:text-muted-foreground/30 focus:outline-none focus:border-foreground/20 transition-colors"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Work Samples */}
          <section>
            <h3 className="text-xs font-medium text-muted-foreground/60 uppercase tracking-wider mb-3">
              Work Samples
            </h3>
            {form.workSamples.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mb-3">
                {form.workSamples.map((sample, i) => (
                  <div key={i} className="relative group">
                    <img
                      src={sample.src}
                      alt={sample.alt}
                      className="w-full aspect-[4/3] object-cover rounded-lg border border-border/30"
                    />
                    <button
                      onClick={() => removeWorkSample(i)}
                      className="absolute top-1 right-1 p-1 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <input
                type="url"
                value={workSampleUrl}
                onChange={(e) => setWorkSampleUrl(e.target.value)}
                placeholder="Image URL..."
                className="flex-1 bg-muted/30 border border-border/40 rounded-lg px-3 py-2 text-xs placeholder:text-muted-foreground/30 focus:outline-none focus:border-foreground/20 transition-colors"
              />
              <input
                type="text"
                value={workSampleAlt}
                onChange={(e) => setWorkSampleAlt(e.target.value)}
                placeholder="Description"
                className="w-28 bg-muted/30 border border-border/40 rounded-lg px-3 py-2 text-xs placeholder:text-muted-foreground/30 focus:outline-none focus:border-foreground/20 transition-colors"
              />
              <button
                onClick={addWorkSample}
                disabled={!workSampleUrl}
                className="px-3 py-2 rounded-lg bg-muted/50 text-xs font-medium hover:bg-muted disabled:opacity-30 transition-colors"
              >
                Add
              </button>
            </div>
          </section>

          {/* Options */}
          <section>
            <h3 className="text-xs font-medium text-muted-foreground/60 uppercase tracking-wider mb-3">
              Options
            </h3>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.verified}
                  onChange={(e) => update("verified", e.target.checked)}
                  className="rounded"
                />
                Verified
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => update("featured", e.target.checked)}
                  className="rounded"
                />
                Featured
              </label>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 p-5 border-t border-border/30">
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-xl text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            disabled={!isValid}
            className="flex items-center gap-2 px-6 py-2 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90 disabled:opacity-30 transition-all"
          >
            <Check className="w-4 h-4" />
            {isEditing ? "Save Changes" : "Create Artist"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [customArtists, setCustomArtists] = useState<Artist[]>([]);
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingArtist, setEditingArtist] = useState<Artist | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    setArtists(getAllArtists());
    setCustomArtists(getCustomArtists());
  }, []);

  function refresh() {
    setArtists(getAllArtists());
    setCustomArtists(getCustomArtists());
  }

  function handleAdd(data: FormData) {
    addArtist(data);
    refresh();
    setShowForm(false);
  }

  function handleEdit(data: FormData) {
    if (!editingArtist) return;
    updateArtist(editingArtist.id, data);
    refresh();
    setEditingArtist(null);
  }

  function handleDelete(id: string) {
    deleteArtist(id);
    refresh();
    setDeleteConfirm(null);
  }

  const filtered = artists.filter((a) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      a.name.toLowerCase().includes(q) ||
      a.role.toLowerCase().includes(q) ||
      a.city.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q)
    );
  });

  const isMock = (id: string) => MOCK_ARTISTS.some((a) => a.id === id);

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-6">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          {
            label: "Total Artists",
            value: artists.length,
            icon: Users,
          },
          {
            label: "Custom Added",
            value: customArtists.length,
            icon: Plus,
          },
          {
            label: "Mock Data",
            value: MOCK_ARTISTS.length,
            icon: Eye,
          },
          {
            label: "Categories",
            value: CATEGORIES.length,
            icon: ChevronDown,
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-4 rounded-2xl bg-background border border-border/30"
          >
            <div className="flex items-center gap-2 text-muted-foreground/50 mb-2">
              <stat.icon className="w-4 h-4" />
              <span className="text-xs">{stat.label}</span>
            </div>
            <span className="font-[family-name:var(--font-heading)] text-2xl font-medium">
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search artists..."
            className="w-full bg-background border border-border/40 rounded-xl pl-10 pr-4 py-2.5 text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground/20 transition-colors"
          />
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity active:scale-[0.97]"
        >
          <Plus className="w-4 h-4" />
          Add Artist
        </button>
      </div>

      {/* Artist list */}
      <div className="bg-background rounded-2xl border border-border/30 overflow-hidden">
        <div className="grid grid-cols-[1fr_1fr_auto_auto] sm:grid-cols-[auto_1fr_1fr_auto_auto_auto] gap-x-4 px-5 py-3 border-b border-border/20 text-xs text-muted-foreground/50 uppercase tracking-wider font-medium">
          <span className="hidden sm:block">Photo</span>
          <span>Name</span>
          <span>Category</span>
          <span className="hidden sm:block">Location</span>
          <span>Type</span>
          <span>Actions</span>
        </div>

        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-sm text-muted-foreground/50">
              {query ? "No artists match your search." : "No artists yet."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border/15">
            {filtered.map((artist) => (
              <div
                key={artist.id}
                className="grid grid-cols-[1fr_1fr_auto_auto] sm:grid-cols-[auto_1fr_1fr_auto_auto_auto] gap-x-4 px-5 py-3 items-center hover:bg-muted/20 transition-colors"
              >
                <div className="hidden sm:block">
                  {artist.image ? (
                    <img
                      src={artist.image}
                      alt=""
                      className="w-9 h-9 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-lg bg-muted/50 flex items-center justify-center">
                      <ImageIcon className="w-4 h-4 text-muted-foreground/30" />
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate flex items-center gap-1">
                    {artist.name}
                    {artist.verified && (
                      <span className="text-amber-500 text-xs">&#10003;</span>
                    )}
                  </p>
                  <p className="text-[11px] text-muted-foreground/50 truncate">
                    {artist.role}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground/60">
                    {CATEGORIES.find((c) => c.slug === artist.category)?.label ||
                      artist.category}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <span className="text-xs text-muted-foreground/40">
                    {[artist.city, artist.state].filter(Boolean).join(", ") ||
                      "—"}
                  </span>
                </div>
                <div>
                  <span
                    className={cn(
                      "text-[10px] px-2 py-0.5 rounded-full font-medium",
                      isMock(artist.id)
                        ? "bg-muted/50 text-muted-foreground/50"
                        : "bg-emerald-100 text-emerald-700"
                    )}
                  >
                    {isMock(artist.id) ? "Mock" : "Custom"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Link
                    href={`/artists/${artist.username}`}
                    className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors"
                    title="View profile"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/40" />
                  </Link>
                  {!isMock(artist.id) && (
                    <>
                      <button
                        onClick={() => setEditingArtist(artist)}
                        className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors"
                        title="Edit"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-muted-foreground/40" />
                      </button>
                      {deleteConfirm === artist.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(artist.id)}
                            className="px-2 py-1 rounded-lg bg-destructive text-background text-[10px] font-medium"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="px-2 py-1 rounded-lg bg-muted text-[10px]"
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(artist.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-muted-foreground/40 hover:text-destructive" />
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add form modal */}
      {showForm && (
        <ArtistForm
          initial={createBlankArtist()}
          onSave={handleAdd}
          onCancel={() => setShowForm(false)}
          isEditing={false}
        />
      )}

      {/* Edit form modal */}
      {editingArtist && (
        <ArtistForm
          initial={editingArtist}
          onSave={handleEdit}
          onCancel={() => setEditingArtist(null)}
          isEditing={true}
        />
      )}
    </div>
  );
}
