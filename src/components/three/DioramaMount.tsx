"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useDeviceTier, usePrefersReducedMotion, useWebGLSupported, useInView, usePointerNormalised } from "@/lib/useClient";

const DioramaScene = dynamic(() => import("./DioramaScene"), { ssr: false });

/** Flat skyline, shown until the scene is ready and kept when WebGL is absent. */
function StaticSkyline() {
  const bars = [
    [6, 26], [14, 44], [22, 34], [30, 58], [38, 40], [46, 72], [54, 52],
    [62, 86], [70, 60], [78, 96], [86, 68], [94, 48], [102, 62], [110, 38],
    [118, 54], [126, 30], [134, 46], [142, 24],
  ];
  return (
    <svg viewBox="0 0 150 100" preserveAspectRatio="xMidYMid slice" className="w-full h-full" aria-hidden="true">
      <defs>
        <linearGradient id="dSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16202E" />
          <stop offset="100%" stopColor="#0A1119" />
        </linearGradient>
      </defs>
      <rect width="150" height="100" fill="url(#dSky)" />
      {bars.map(([x, h], i) => (
        <rect key={i} x={x} y={78 - h * 0.62} width="7" height={h * 0.62}
          fill={i % 5 === 0 ? "#2C3542" : "#C8C5BD"} fillOpacity={i % 5 === 0 ? 0.6 : 0.22} rx="0.6" />
      ))}
      {/* Wet plaza reflection */}
      <rect y="78" width="150" height="22" fill="#0B111A" />
      {bars.map(([x, h], i) => (
        <rect key={`r${i}`} x={x} y={78} width="7" height={Math.min(18, h * 0.3)}
          fill={i % 5 === 0 ? "#2C3542" : "#C8C5BD"} fillOpacity="0.07" rx="0.6" />
      ))}
      <rect y="77.6" width="150" height="0.5" fill="#C9A040" fillOpacity="0.4" />
    </svg>
  );
}

export function DioramaMount() {
  const tier = useDeviceTier();
  const reduced = usePrefersReducedMotion();
  const webgl = useWebGLSupported();
  const { ref, inView } = useInView<HTMLDivElement>("300px");
  const { ref: pRef, pointer } = usePointerNormalised<HTMLDivElement>(reduced || tier === "low");
  const [ready, setReady] = useState(false);

  // Hand off to WebGL after first paint so the static scene owns LCP.
  useEffect(() => {
    if (webgl === true) {
      const id = window.setTimeout(() => setReady(true), 150);
      return () => window.clearTimeout(id);
    }
  }, [webgl]);

  const useWebGL = ready && webgl === true;

  return (
    <div
      ref={(n) => {
        ref.current = n;
        pRef.current = n;
      }}
      className="relative w-full h-full overflow-hidden"
    >
      <div className="scene-fallback absolute inset-0" style={{ opacity: useWebGL ? 0 : 1 }}>
        <StaticSkyline />
      </div>

      {useWebGL && (
        <div className="absolute inset-0">
          <DioramaScene tier={tier} reduced={reduced} active={inView} pointer={pointer} />
        </div>
      )}

      {/* Tilt-shift: sharp through the middle band, falling off top and bottom */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[26%] backdrop-blur-[3px] [mask-image:linear-gradient(to_bottom,black_15%,transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[30%] backdrop-blur-[4px] [mask-image:linear-gradient(to_top,black_10%,transparent)]" />
      {/* Warm haze on the horizon */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-[linear-gradient(to_bottom,rgba(201,160,64,0.05),transparent)]" />
    </div>
  );
}
