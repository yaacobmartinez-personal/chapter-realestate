"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollObserver() {
  const pathname = usePathname();

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    // Wait for page transition to complete (450ms animation + buffer)
    const timer = setTimeout(() => {
      const targets = document.querySelectorAll("[data-reveal]:not(.revealed), [data-stagger]:not(.revealed)");

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed");
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
      );

      targets.forEach((el) => {
        // Check if element is already in viewport and reveal immediately
        const rect = el.getBoundingClientRect();
        const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
        if (inViewport) {
          el.classList.add("revealed");
        } else {
          observer?.observe(el);
        }
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
