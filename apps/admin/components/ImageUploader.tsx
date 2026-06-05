"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Loader2, Upload, X } from "lucide-react";

/**
 * Uploads images to Cloudflare R2 via /api/upload and tracks the resulting
 * URLs. Emits the URL list as a JSON string in a hidden input named `images`
 * so it round-trips through a plain Server Action form.
 */
export default function ImageUploader({
  initial = [],
  onChange,
}: {
  initial?: string[];
  onChange?: (urls: string[]) => void;
}) {
  const [urls, setUrls] = useState<string[]>(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onChange?.(urls);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urls]);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setBusy(true);
    setError(null);
    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        const body = new FormData();
        body.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Upload failed");
        uploaded.push(data.url);
      }
      setUrls((prev) => [...prev, ...uploaded]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function remove(url: string) {
    setUrls((prev) => prev.filter((u) => u !== url));
  }

  return (
    <div>
      <input type="hidden" name="images" value={JSON.stringify(urls)} />

      <div className="flex flex-wrap gap-3">
        {urls.map((url) => (
          <div
            key={url}
            className="relative h-24 w-32 overflow-hidden rounded-lg border border-border bg-background"
          >
            <Image src={url} alt="" fill className="object-cover" sizes="128px" />
            <button
              type="button"
              onClick={() => remove(url)}
              className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white"
              aria-label="Remove image"
            >
              <X size={14} />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="grid h-24 w-32 place-items-center rounded-lg border border-dashed border-border text-muted hover:border-accent disabled:opacity-60"
        >
          {busy ? <Loader2 className="animate-spin" size={20} /> : <Upload size={20} />}
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/avif"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      <p className="mt-2 text-xs text-muted">First image is used as the cover. Max 10MB each.</p>
    </div>
  );
}
