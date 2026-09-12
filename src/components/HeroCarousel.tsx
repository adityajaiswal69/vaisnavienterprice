"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";

export type Slide = { href: string; image: string; caption: string };

/**
 * Three-up image carousel (one-up on phones) in the style of a supplier
 * catalogue banner. Uses native scroll-snap, so it works without JS; the
 * arrows and auto-advance are progressive enhancements.
 */
export default function HeroCarousel({ slides }: { slides: Slide[] }) {
  const track = useRef<HTMLDivElement>(null);
  const paused = useRef(false);

  const step = useCallback((dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const width = first ? first.getBoundingClientRect().width : el.clientWidth / 3;
    const max = el.scrollWidth - el.clientWidth;
    let next = el.scrollLeft + dir * width;
    // Wrap around at either end so the auto-advance never stalls.
    if (next > max + 2) next = 0;
    if (next < -2) next = max;
    el.scrollTo({ left: next, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = window.setInterval(() => {
      if (!paused.current) step(1);
    }, 4500);
    return () => window.clearInterval(id);
  }, [step]);

  return (
    <section
      className="relative bg-white"
      aria-roledescription="carousel"
      aria-label="Featured products"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onFocus={() => (paused.current = true)}
      onBlur={() => (paused.current = false)}
    >
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
        <div className="relative">
          <div
            ref={track}
            className="flex snap-x snap-mandatory gap-0.5 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {slides.map((s) => (
              <Link
                key={s.href + s.caption}
                href={s.href}
                className="group relative aspect-[4/3] w-full shrink-0 snap-start overflow-hidden bg-navy-950 sm:w-1/2 lg:w-1/3"
              >
                <Image
                  src={s.image}
                  alt={s.caption}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 bg-navy-950/75 px-4 py-3 text-center text-base font-medium text-white backdrop-blur-[2px]">
                  {s.caption}
                </span>
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous"
            className="absolute left-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-white/85 text-navy-800 shadow-md transition hover:bg-white"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
              <path d="m15 5-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next"
            className="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-white/85 text-navy-800 shadow-md transition hover:bg-white"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
              <path d="m9 5 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
