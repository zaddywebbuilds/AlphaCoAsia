"use client";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion, useDeviceTier, useInView } from "@/lib/useClient";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const POSTER = `${BASE}/media/hero-poster.jpg`;
const SRC = `${BASE}/media/hero.mp4`;

/** The footage as a surface: a clean framed panel at full clarity. No grade and
 *  nothing laid over it, so it reads sharp rather than as a murky backdrop.
 *  Poster carries it on low-tier devices and under reduced motion. */
export function HeroVideo({ className = "" }: { className?: string }) {
  const el = useRef<HTMLVideoElement>(null);
  const reduced = usePrefersReducedMotion();
  const tier = useDeviceTier();
  const { ref, inView } = useInView<HTMLDivElement>("200px");
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (reduced || tier === "low" || !inView) return;
    const id = window.setTimeout(() => setPlay(true), 350);
    return () => window.clearTimeout(id);
  }, [reduced, tier, inView]);

  useEffect(() => {
    const v = el.current;
    if (!v || !play) return;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [play, inView]);

  useEffect(() => {
    const v = el.current;
    if (!v) return;
    const onVis = () => {
      if (document.hidden) v.pause();
      else if (play && inView) v.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [play, inView]);

  return (
    <div ref={ref} className={`relative overflow-hidden bg-[#050A12] ${className}`}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${POSTER})` }}
        aria-hidden="true"
      />
      {play && (
        <video
          ref={el}
          className="absolute inset-0 w-full h-full object-cover"
          poster={POSTER}
          src={SRC}
          muted
          loop
          playsInline
          preload="none"
          tabIndex={-1}
          aria-label="Singapore central business district"
        />
      )}
      <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.10] rounded-[inherit]" />
    </div>
  );
}
