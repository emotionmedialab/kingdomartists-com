import { MOCK_ARTISTS, CATEGORIES } from "./mock-data";
import type { Artist } from "./mock-data";

const STORAGE_KEY = "ka_custom_artists";

function generateId() {
  return "custom_" + Math.random().toString(36).substring(2, 10);
}

function generateUsername(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "")
    .substring(0, 20);
}

export function getCustomArtists(): Artist[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCustomArtists(artists: Artist[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(artists));
}

export function getAllArtists(): Artist[] {
  return [...MOCK_ARTISTS, ...getCustomArtists()];
}

export function getArtistByUsername(username: string): Artist | undefined {
  return getAllArtists().find((a) => a.username === username);
}

export function addArtist(data: Omit<Artist, "id" | "username" | "joinedAt">): Artist {
  const artist: Artist = {
    ...data,
    id: generateId(),
    username: generateUsername(data.name),
    joinedAt: new Date().toISOString(),
  };

  // Ensure unique username
  const all = getAllArtists();
  let username = artist.username;
  let suffix = 1;
  while (all.some((a) => a.username === username)) {
    username = artist.username + suffix;
    suffix++;
  }
  artist.username = username;

  const custom = getCustomArtists();
  custom.push(artist);
  saveCustomArtists(custom);
  return artist;
}

export function updateArtist(id: string, data: Partial<Artist>): Artist | null {
  const custom = getCustomArtists();
  const idx = custom.findIndex((a) => a.id === id);
  if (idx === -1) return null;
  custom[idx] = { ...custom[idx], ...data };
  saveCustomArtists(custom);
  return custom[idx];
}

export function deleteArtist(id: string): boolean {
  const custom = getCustomArtists();
  const idx = custom.findIndex((a) => a.id === id);
  if (idx === -1) return false;
  custom.splice(idx, 1);
  saveCustomArtists(custom);
  return true;
}

export function createBlankArtist(): Omit<Artist, "id" | "username" | "joinedAt"> {
  return {
    name: "",
    role: "",
    category: "",
    tags: [],
    city: "",
    state: "",
    country: "US",
    from: "",
    bio: "",
    image: "",
    banner: "",
    verified: false,
    featured: false,
    links: {},
    workSamples: [],
  };
}

export { CATEGORIES };
export type { Artist };
