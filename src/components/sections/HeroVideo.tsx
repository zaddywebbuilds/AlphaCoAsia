"use client";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion, useDeviceTier, useInView } from "@/lib/useClient";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const POSTER = `${BASE}/media/hero-poster.jpg`;
const SRC = `${BASE}/media/hero.mp4`;

/** Footage presented as a surface: a framed pane inside the hero console, shown
 *  at full clarity rather than washed behind type. The poster carries the pane
 *  on low-tier devices and under reduced motion. */
export function HeroVideo() {
  const el = useRef<HTMLVideoElement>(null);
  const reduced = usePrefersReducedMotion();
  const tier = useDeviceTier();
  const { ref, inView } = useInView<HTMLDivElement>("200px");
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (reduced || tier === "low" || !inView) return;
    const id = window.setTimeout(() => setPlay(true), 400);
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
    <div ref={ref} className="relative w-full h-full overflow-hidden bg-[#05090F]">
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
          aria-label="Singapore central business district and Marina Bay"
        />
      )}
      {/* Just enough scrim for the caption rail to sit on */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(to_top,rgba(5,9,15,0.92),transparent)]" />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.06]" />
    </div>
  );
}
