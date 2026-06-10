import { createServerClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const MAX_BYTES = 8 * 1024 * 1024; // ~90s of compressed audio is well under this

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get("audio");
    if (!(file instanceof Blob) || file.size === 0) {
      return Response.json({ error: "No audio received." }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return Response.json(
        { error: "Recording is too large. Keep it under 90 seconds." },
        { status: 413 }
      );
    }

    const supabase = createServerClient();
    const ext = file.type.includes("mp4") ? "m4a" : "webm";
    const path = `${crypto.randomUUID()}.${ext}`;

    const { error } = await supabase.storage
      .from("voice-notes")
      .upload(path, file, { contentType: file.type || "audio/webm" });

    if (error) {
      console.error("Voice upload error:", error);
      return Response.json(
        { error: "Could not save your recording." },
        { status: 500 }
      );
    }

    const { data } = supabase.storage.from("voice-notes").getPublicUrl(path);
    return Response.json({ url: data.publicUrl });
  } catch {
    return Response.json(
      { error: "Could not save your recording." },
      { status: 500 }
    );
  }
}
