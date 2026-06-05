"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

/** Read-only carousel mirroring the public PropertyCarousel, for the editor preview. */
export default function PreviewCarousel({
  images,
  tag,
  alt,
}: {
  images: string[];
  tag?: string;
  alt: string;
}) {
  const [current, setCurrent] = useState(0);

  // Clamp index if images shrink (e.g. removed an upload).
  useEffect(() => {
    if (current > images.length - 1) setCurrent(Math.max(0, images.length - 1));
  }, [images.length, current]);

  if (images.length === 0) {
    return (
      <div className="grid aspect-[4/3] place-items-center bg-background text-sm text-muted">
        No image yet
      </div>
    );
  }

  const go = (dir: 1 | -1) =>
    setCurrent((p) => (p + dir + images.length) % images.length);

  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-black select-none">
      <Image
        key={images[current]}
        src={images[current]}
        alt={alt}
        fill
        className="object-cover"
        sizes="700px"
        unoptimized
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

      {tag && (
        <span className="absolute left-4 top-4 bg-black px-3 py-1.5 text-xs font-light uppercase tracking-widest text-white">
          {tag}
        </span>
      )}

      {images.length > 1 && (
        <>
          <span className="absolute right-4 top-4 bg-black/50 px-3 py-1.5 text-xs font-light tracking-widest text-white backdrop-blur-sm">
            {current + 1} / {images.length}
          </span>

          <button
            type="button"
            onClick={() => go(-1)}
            className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center bg-black/40 text-white backdrop-blur-sm hover:bg-black"
            aria-label="Previous photo"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center bg-black/40 text-white backdrop-blur-sm hover:bg-black"
            aria-label="Next photo"
          >
            <ChevronRight size={20} />
          </button>

          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20">
            <div
              className="h-full bg-accent transition-[width] duration-300"
              style={{ width: `${((current + 1) / images.length) * 100}%` }}
            />
          </div>
        </>
      )}
    </div>
  );
}
