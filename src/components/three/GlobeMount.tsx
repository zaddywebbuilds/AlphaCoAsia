"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { APAC_MARKETS } from "@/lib/data";
import { useDeviceTier, usePrefersReducedMotion, useWebGLSupported, useInView, usePointerNormalised } from "@/lib/useClient";

const NetworkGlobe = dynamic(() => import("./NetworkGlobe"), { ssr: false });

/** Static globe — paints instantly, carries the composition on its own, and is
 *  the permanent state when WebGL is unavailable or motion is reduced. */
function StaticGlobe() {
  const cx = 160, cy = 160, r = 120;
  const proj = (lat: number, lng: number) => {
    // Orthographic, centred on the Singapore meridian.
    const p = ((lng - 104) * Math.PI) / 180;
    const t = (lat * Math.PI) / 180;
    return { x: cx + r * Math.cos(t) * Math.sin(p), y: cy - r * Math.sin(t), back: Math.cos(t) * Math.cos(p) < 0 };
  };
  const hub = APAC_MARKETS.find((m) => m.hub)!;
  const h = proj(hub.lat, hub.lng);

  return (
    <svg viewBox="0 0 320 320" className="w-full h-full" aria-hidden="true">
      <defs>
        <radialGradient id="gAtmo" cx="50%" cy="50%" r="50%">
          <stop offset="70%" stopColor="#38BDF8" stopOpacity="0" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.20" />
        </radialGradient>
        <radialGradient id="gCore" cx="42%" cy="36%" r="70%">
          <stop offset="0%" stopColor="#12263D" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#05090F" stopOpacity="0.95" />
        </radialGradient>
      </defs>

      <circle cx={cx} cy={cy} r={r + 18} fill="url(#gAtmo)" />
      <circle cx={cx} cy={cy} r={r} fill="url(#gCore)" stroke="#1E9FD8" strokeOpacity="0.28" strokeWidth="0.75" />

      {/* Graticule */}
      {[-60, -30, 0, 30, 60].map((lat) => {
        const y = cy - r * Math.sin((lat * Math.PI) / 180);
        const rx = r * Math.cos((lat * Math.PI) / 180);
        return <ellipse key={lat} cx={cx} cy={y} rx={rx} ry={rx * 0.17} fill="none" stroke="#1E9FD8" strokeOpacity="0.16" strokeWidth="0.6" />;
      })}
      {[-75, -50, -25, 0, 25, 50, 75].map((o) => (
        <ellipse key={o} cx={cx} cy={cy} rx={Math.abs(r * Math.sin((o * Math.PI) / 180))} ry={r} fill="none" stroke="#1E9FD8" strokeOpacity="0.13" strokeWidth="0.6" />
      ))}

      {/* Connections from Singapore */}
      {APAC_MARKETS.filter((m) => !m.hub).map((m) => {
        const p = proj(m.lat, m.lng);
        if (p.back) return null;
        const mx = (h.x + p.x) / 2, my = (h.y + p.y) / 2;
        const lift = 0.22;
        const qx = mx + (mx - cx) * lift, qy = my + (my - cy) * lift;
        return <path key={m.code} d={`M ${h.x} ${h.y} Q ${qx} ${qy} ${p.x} ${p.y}`} fill="none" stroke="#38BDF8" strokeOpacity="0.38" strokeWidth="0.8" />;
      })}

      {/* Market nodes */}
      {APAC_MARKETS.map((m) => {
        const p = proj(m.lat, m.lng);
        if (p.back) return null;
        return (
          <g key={m.code}>
            {m.hub && <circle cx={p.x} cy={p.y} r="7" fill="#C9A040" opacity="0.22" />}
            <circle cx={p.x} cy={p.y} r={m.hub ? 3.4 : 2.1} fill={m.hub ? "#C9A040" : "#38BDF8"} />
          </g>
        );
      })}
    </svg>
  );
}

export function GlobeMount() {
  const tier = useDeviceTier();
  const reduced = usePrefersReducedMotion();
  const webgl = useWebGLSupported();
  const { ref, inView } = useInView<HTMLDivElement>("300px");
  const { ref: pRef, pointer } = usePointerNormalised<HTMLDivElement>(reduced || tier === "low");
  const [ready, setReady] = useState(false);

  // Hand off to WebGL only after first paint, so the static scene owns LCP.
  useEffect(() => {
    if (webgl === true && tier !== "low") {
      const id = window.setTimeout(() => setReady(true), 120);
      return () => window.clearTimeout(id);
    }
  }, [webgl, tier]);

  const useWebGL = ready && webgl === true && tier !== "low";

  return (
    <div
      ref={(n) => {
        ref.current = n;
        pRef.current = n;
      }}
      className="relative w-full h-full"
    >
      <div
        className="scene-fallback absolute inset-0 flex items-center justify-center"
        style={{ opacity: useWebGL ? 0 : 1 }}
      >
        <StaticGlobe />
      </div>

      {useWebGL && (
        <div className="absolute inset-0">
          <NetworkGlobe tier={tier} reduced={reduced} active={inView} pointer={pointer} />
        </div>
      )}
    </div>
  );
}
