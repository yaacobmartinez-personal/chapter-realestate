import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { createClient } from "@/lib/supabase/server";
import { storage } from "@/lib/storage";
import { optimizeImage } from "@/lib/images/optimize";

// sharp is a native module — keep this handler off the edge runtime.
export const runtime = "nodejs";

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);

/**
 * Key prefixes inside the storage bucket. Allowlisted rather than taken
 * verbatim from the client so a caller can't write outside these folders.
 */
const FOLDERS = new Set([
  "properties",
  "rentals",
  "agents",
  "resources",
  "leadership",
  "buyer-guide",
]);
const DEFAULT_FOLDER = "properties";

export async function POST(request: NextRequest) {
  // Auth guard — only signed-in admins may upload.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (!ALLOWED.has(file.type)) {
    return NextResponse.json({ error: "Unsupported file type" }, { status: 415 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File too large (max 10MB)" }, { status: 413 });
  }

  const requested = String(form.get("folder") ?? "");
  const folder = FOLDERS.has(requested) ? requested : DEFAULT_FOLDER;

  try {
    // Shrink before storing: what we upload is what visitors download, since
    // the public site serves images unoptimized.
    const image = await optimizeImage(Buffer.from(await file.arrayBuffer()));
    const key = `${folder}/${randomUUID()}.${image.ext}`;

    const { url } = await storage.upload({
      body: image.body,
      key,
      contentType: image.contentType,
    });

    console.log(
      `Uploaded ${key}: ${kb(image.originalBytes)} → ${kb(image.body.byteLength)} ` +
        `(${Math.round((1 - image.body.byteLength / image.originalBytes) * 100)}% smaller, ` +
        `${image.width}×${image.height})`,
    );

    return NextResponse.json({ url });
  } catch (err) {
    console.error("Upload failed:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

function kb(bytes: number): string {
  return `${Math.round(bytes / 1024)}KB`;
}
