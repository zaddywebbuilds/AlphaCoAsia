"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { APAC_MARKETS } from "@/lib/data";
import { projectAPAC } from "@/lib/geo";
import { useDeviceTier, usePrefersReducedMotion, useWebGLSupported, useInView } from "@/lib/useClient";

const APACScene = dynamic(() => import("@/components/three/APACScene"), { ssr: false });

/* Pseudo-perspective projection shared by the static scene: the plane recedes
   toward the top, so the fallback carries the same spatial idea as the WebGL one. */
const VB = { w: 600, h: 380, cx: 300, halfW: 252, yFar: 112, depth: 196 };

function project(px: number, pz: number) {
  const d = (pz + 1) / 2; // 0 far, 1 near
  const s = 0.44 + d * 0.56;
  return { x: VB.cx + px * VB.halfW * s, y: VB.yFar + d * VB.depth, s };
}

function StaticPlane({ active }: { active: string }) {
  const nodes = APAC_MARKETS.map((m) => {
    const p = projectAPAC(m.lat, m.lng);
    return { ...m, ...project(p.x, -p.y) };
  });
  const hub = nodes.find((n) => n.hub)!;

  const zLines = Array.from({ length: 9 }, (_, i) => -1 + (i / 8) * 2);
  const xLines = Array.from({ length: 13 }, (_, i) => -1 + (i / 12) * 2);

  return (
    <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="w-full h-full" aria-hidden="true">
      <defs>
        <linearGradient id="planeFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C9A040" stopOpacity="0.03" />
          <stop offset="60%" stopColor="#C9A040" stopOpacity="0.30" />
          <stop offset="100%" stopColor="#C9A040" stopOpacity="0.46" />
        </linearGradient>
        <mask id="planeMask">
          <rect width={VB.w} height={VB.h} fill="url(#planeFade)" />
        </mask>
      </defs>

      <g mask="url(#planeMask)" stroke="#7F91AC" fill="none">
        {zLines.map((pz) => {
          const a = project(-1, pz), b = project(1, pz);
          return <line key={`z${pz}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} strokeWidth="0.7" />;
        })}
        {xLines.map((px) => {
          const a = project(px, -1), b = project(px, 1);
          return <line key={`x${px}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} strokeWidth="0.7" />;
        })}
      </g>

      {/* Reach contours from Singapore */}
      {[42, 78, 116].map((r, i) => (
        <ellipse key={r} cx={hub.x} cy={hub.y} rx={r} ry={r * 0.34} fill="none" stroke="#C9A040" strokeOpacity={0.17 - i * 0.04} strokeWidth="0.8" />
      ))}

      {/* Links */}
      {nodes.filter((n) => !n.hub).map((n) => {
        const on = n.code === active;
        const mx = (hub.x + n.x) / 2;
        const my = (hub.y + n.y) / 2 - 42;
        return (
          <path key={n.code} d={`M ${hub.x} ${hub.y} Q ${mx} ${my} ${n.x} ${n.y}`} fill="none"
            stroke={on ? "#C9A040" : "#7F91AC"} strokeOpacity={on ? 0.95 : 0.3} strokeWidth={on ? 1.8 : 0.9} />
        );
      })}

      {/* Nodes */}
      {nodes.map((n) => {
        const on = n.code === active;
        const c = n.hub || on ? "#C9A040" : "#7F91AC";
        const stem = n.hub ? 30 : 20;
        return (
          <g key={n.code}>
            <ellipse cx={n.x} cy={n.y} rx={on ? 7 : 5} ry={(on ? 7 : 5) * 0.34} fill={c} opacity="0.3" />
            <line x1={n.x} y1={n.y} x2={n.x} y2={n.y - stem} stroke={c} strokeOpacity={on ? 0.85 : 0.4} strokeWidth="1" />
            <circle cx={n.x} cy={n.y - stem} r={on ? 4.6 : 3.2} fill={c} />
            <text x={n.x} y={n.y - stem - 9} textAnchor="middle" fontSize="8.5" letterSpacing="1.6"
              fill={on ? "#E0C780" : "rgba(148,163,184,0.72)"} fontFamily="Inter, sans-serif" fontWeight="500">
              {n.code}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function APACMap() {
  const [active, setActive] = useState("SG");
  const tier = useDeviceTier();
  const reduced = usePrefersReducedMotion();
  const webgl = useWebGLSupported();
  const { ref, inView } = useInView<HTMLDivElement>("250px");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (webgl === true && tier !== "low" && inView) {
      const id = window.setTimeout(() => setReady(true), 150);
      return () => window.clearTimeout(id);
    }
  }, [webgl, tier, inView]);

  const useWebGL = ready && webgl === true && tier !== "low";
  const market = APAC_MARKETS.find((m) => m.code === active)!;

  return (
    <section className="relative section-py bg-[#05090F] overflow-hidden tex-grain">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_45%_45%,#0D2338_0%,#05090F_72%)]" />
      <div className="absolute inset-0 tex-grid-fine opacity-40" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[760px] h-[420px] rounded-full bg-[#C9A040] opacity-[0.09] blur-[140px]" />

      <div className="container-xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#C9A040]" />
              <span className="type-technical text-[#C9A040]">APAC Network</span>
            </div>
            <h2 className="font-display text-white leading-[1.08]"
              style={{ fontSize: "clamp(1.9rem, 3.6vw, 3.1rem)", fontWeight: 600, letterSpacing: "-0.025em" }}>
              Asia Pacific experience
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <div className="rule-h mb-5" />
            <p className="text-sm text-slate-400 leading-relaxed">
              Advisory and consulting engagements across Singapore and key financial markets
              throughout Asia. Select a market to view engagement categories.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Scene */}
          <div ref={ref} className="lg:col-span-7 relative">
            <div className="relative aspect-[600/380] rounded-2xl border border-white/[0.08] overflow-hidden bg-[#070D18]/60">
              <div className="scene-fallback absolute inset-0" style={{ opacity: useWebGL ? 0 : 1 }}>
                <StaticPlane active={active} />
              </div>
              {useWebGL && (
                <div className="absolute inset-0">
                  <APACScene active={active} onSelect={setActive} tier={tier} reduced={reduced} running={inView} />
                </div>
              )}
              <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A040] anim-node" />
                <span className="type-technical text-slate-500">Engagement Markets · {APAC_MARKETS.length}</span>
              </div>
            </div>
          </div>

          {/* Data panel */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-3 gap-1.5 mb-6">
              {APAC_MARKETS.map((m) => (
                <button
                  key={m.code}
                  onClick={() => setActive(m.code)}
                  aria-pressed={active === m.code}
                  className={`px-3 py-2.5 rounded-lg text-left transition-all duration-300 border ${
                    active === m.code
                      ? "bg-[#C9A040] border-[#C9A040] text-[#0A1628]"
                      : "bg-white/[0.04] border-white/[0.09] text-slate-300 hover:border-[#C9A040]/40 hover:bg-white/[0.07]"
                  }`}
                >
                  <div className="type-technical opacity-70 mb-0.5">{m.code}</div>
                  <div className="text-[12.5px] font-medium leading-tight">{m.country}</div>
                </button>
              ))}
            </div>

            <div className="panel-dim p-7">
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="font-display text-xl font-semibold text-white">{market.country}</h3>
                <span className="type-technical text-[#C9A040]">{market.code}</span>
              </div>
              <p className="type-technical text-slate-500 mb-5">{market.city}</p>

              <div className="rule-h mb-5" />

              <p className="type-technical text-slate-500 mb-3">Engagement Categories</p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {market.engagements.map((e) => (
                  <span key={e} className="px-2.5 py-1 bg-white/[0.06] border border-white/[0.10] rounded text-[11.5px] text-slate-300">
                    {e}
                  </span>
                ))}
              </div>

              <p className="text-[11.5px] text-slate-600 leading-relaxed">
                Reflects advisory experience in this market. Alpha Consultant is based in Singapore.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
