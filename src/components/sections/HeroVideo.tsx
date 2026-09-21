"use client";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion, useDeviceTier, useInView } from "@/lib/useClient";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const POSTER = `${BASE}/media/hero-poster.jpg`;
const SRC = `${BASE}/media/hero.mp4`;

/** Full-bleed hero plate. The footage carries the whole frame; scrims are shaped
 *  so the headline column stays legible while the right side of the scene reads
 *  at full clarity. Poster carries it on low-tier devices and reduced motion. */
export function HeroVideo() {
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
    <div ref={ref} className="absolute inset-0 overflow-hidden bg-[#050A12]" aria-hidden="true">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${POSTER})` }}
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
        />
      )}

      {/* Headline scrim — heavy at the left, clearing by mid-frame */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(5,10,18,0.985)_0%,rgba(5,10,18,0.96)_30%,rgba(5,10,18,0.86)_46%,rgba(5,10,18,0.52)_62%,rgba(5,10,18,0.14)_82%,transparent_100%)]" />
      {/* Nav and rail scrims */}
      <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(to_bottom,rgba(5,10,18,0.85),transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-[linear-gradient(to_top,rgba(5,10,18,0.96),transparent)]" />
      {/* Warm horizon lift, tying the footage to the gold palette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_78%_38%,rgba(201,160,64,0.10),transparent_70%)]" />
    </div>
  );
}
