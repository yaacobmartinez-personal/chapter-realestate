"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

interface PropertyCarouselProps {
  images: string[];
  address: string;
  tag: string;
}

export default function PropertyCarousel({ images, address, tag }: PropertyCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const dragStartX = useRef<number | null>(null);

  const go = useCallback(
    (dir: 1 | -1) => {
      setDirection(dir);
      setCurrent((prev) => (prev + dir + images.length) % images.length);
    },
    [images.length]
  );

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "Escape") setLightbox(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [go]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  const transition = { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] };

  return (
    <>
      {/* ── Main Carousel ─────────────────────────────────────────────────── */}
      <section className="bg-black">
        <div className="relative h-[62vh] md:h-[72vh] overflow-hidden select-none"
          onPointerDown={(e) => { dragStartX.current = e.clientX; }}
          onPointerUp={(e) => {
            if (dragStartX.current === null) return;
            const delta = e.clientX - dragStartX.current;
            if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1);
            dragStartX.current = null;
          }}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
              className="absolute inset-0"
            >
              <Image
                fill
                src={images[current]}
                alt={`${address} — photo ${current + 1}`}
                className="object-cover"
                sizes="100vw"
                priority={current === 0}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            </motion.div>
          </AnimatePresence>

          {/* Tag + counter */}
          <div className="absolute top-6 left-6 flex items-center gap-3 z-10">
            <span className="bg-black text-white text-xs tracking-widest uppercase px-3 py-1.5 font-light">
              {tag}
            </span>
          </div>
          <div className="absolute top-6 right-6 flex items-center gap-3 z-10">
            <button
              onClick={() => setLightbox(true)}
              className="bg-black/50 hover:bg-black text-white p-2 backdrop-blur-sm transition-colors"
              aria-label="Open fullscreen gallery"
            >
              <ZoomIn size={16} />
            </button>
            <span className="bg-black/50 text-white text-xs font-light tracking-widest px-3 py-2 backdrop-blur-sm">
              {current + 1} / {images.length}
            </span>
          </div>

          {/* Prev / Next arrows */}
          <button
            onClick={() => go(-1)}
            className="absolute left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center bg-black/40 hover:bg-black text-white backdrop-blur-sm transition-colors group"
            aria-label="Previous photo"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={() => go(1)}
            className="absolute right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center bg-black/40 hover:bg-black text-white backdrop-blur-sm transition-colors group"
            aria-label="Next photo"
          >
            <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Bottom progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20 z-10">
            <motion.div
              className="h-full bg-[#c8a96e]"
              animate={{ width: `${((current + 1) / images.length) * 100}%` }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* ── Thumbnail strip ───────────────────────────────────────────────── */}
        <div className="flex gap-2 px-6 lg:px-8 py-4 max-w-7xl mx-auto overflow-x-auto scrollbar-none">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`relative flex-shrink-0 h-16 w-24 overflow-hidden transition-all duration-200 ${
                i === current
                  ? "ring-1 ring-[#c8a96e] opacity-100"
                  : "opacity-40 hover:opacity-70"
              }`}
              aria-label={`Go to photo ${i + 1}`}
            >
              <Image fill src={img} alt="" className="object-cover" sizes="96px" />
            </button>
          ))}
        </div>
      </section>

      {/* ── Lightbox ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black flex flex-col"
            onPointerDown={(e) => { dragStartX.current = e.clientX; }}
            onPointerUp={(e) => {
              if (dragStartX.current === null) return;
              const delta = e.clientX - dragStartX.current;
              if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1);
              dragStartX.current = null;
            }}
          >
            {/* Lightbox header */}
            <div className="flex items-center justify-between px-6 py-4 flex-shrink-0">
              <span className="text-xs text-gray-400 font-light tracking-widest">
                {address}
              </span>
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-400 font-light">
                  {current + 1} / {images.length}
                </span>
                <button
                  onClick={() => setLightbox(false)}
                  className="text-white hover:text-[#c8a96e] transition-colors"
                  aria-label="Close"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* Lightbox image */}
            <div className="relative flex-1 overflow-hidden">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={transition}
                  className="absolute inset-0 flex items-center justify-center p-6"
                >
                  <div className="relative w-full h-full">
                    <Image
                      fill
                      src={images[current]}
                      alt={`${address} — photo ${current + 1}`}
                      className="object-contain"
                      sizes="100vw"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              <button
                onClick={() => go(-1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center border border-white/20 hover:border-white text-white transition-colors group"
                aria-label="Previous"
              >
                <ChevronLeft size={22} className="group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={() => go(1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center border border-white/20 hover:border-white text-white transition-colors group"
                aria-label="Next"
              >
                <ChevronRight size={22} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Lightbox thumbnails */}
            <div className="flex gap-2 px-6 py-4 overflow-x-auto scrollbar-none flex-shrink-0 justify-center">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`relative flex-shrink-0 h-14 w-20 overflow-hidden transition-all duration-200 ${
                    i === current ? "ring-1 ring-[#c8a96e] opacity-100" : "opacity-35 hover:opacity-60"
                  }`}
                >
                  <Image fill src={img} alt="" className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
