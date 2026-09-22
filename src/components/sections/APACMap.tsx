"use client";
import { useState } from "react";
import { APAC_MARKETS } from "@/lib/data";
import { APAC_VIEW, APAC_LAND, toMap } from "@/lib/apacMap";
import { usePrefersReducedMotion } from "@/lib/useClient";

/* Natural Earth country outlines for the region, so the section shows Asia
   Pacific rather than an abstract plane. Markets sit on their real coordinates. */

/** Country polygons that correspond to an engagement market. Hong Kong has no
 *  separate landmass at this scale; its marker carries it. */
const LAND_FOR_CODE: Record<string, string> = {
  SG: "Singapore",
  MY: "Malaysia",
  ID: "Indonesia",
  VN: "Vietnam",
  MM: "Myanmar",
  KH: "Cambodia",
  TW: "Taiwan",
  BN: "Brunei",
};

const ENGAGED = new Set(Object.values(LAND_FOR_CODE));

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/* Label offsets, hand-placed: Singapore, KL, Phnom Penh and Ho Chi Minh City
   sit close enough at this scale that default placement collides. */
const LABEL: Record<string, { dx: number; dy: number }> = {
  SG: { dx: 0, dy: 34 },
  MY: { dx: -34, dy: -18 },
  KH: { dx: -30, dy: -18 },
  VN: { dx: 34, dy: -18 },
  ID: { dx: 0, dy: 34 },
  MM: { dx: 0, dy: -18 },
  HK: { dx: 34, dy: -18 },
  TW: { dx: 0, dy: -18 },
  BN: { dx: 34, dy: 8 },
};

const CHIP_W = 30;
const CHIP_H = 20;

const NODES = APAC_MARKETS.map((m) => ({
  ...m,
  ...toMap(m.lat, m.lng),
  flag: `${BASE}/media/flags/${m.code.toLowerCase()}.svg`,
  count: m.engagements.length,
}));
const HUB = NODES.find((n) => n.hub)!;

export function APACMap() {
  const [active, setActive] = useState("SG");
  const reduced = usePrefersReducedMotion();
  const market = APAC_MARKETS.find((m) => m.code === active)!;
  const activeLand = LAND_FOR_CODE[active];
  const activeNode = NODES.find((n) => n.code === active)!;

  return (
    <section className="relative section-py bg-[#05090F] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_40%_45%,#0C1728_0%,#05090F_72%)]" />
      <div className="absolute inset-0 tex-grid-fine opacity-30" />

      <div className="container-xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#C9A040]" />
              <span className="type-technical text-[#C9A040]">APAC Network</span>
            </div>
            <h2
              className="font-display text-white leading-[1.08]"
              style={{ fontSize: "clamp(1.9rem, 3.6vw, 3.1rem)", fontWeight: 600, letterSpacing: "-0.025em" }}
            >
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Map */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl border border-white/[0.08] overflow-hidden bg-[#070D18]">
              <svg
                viewBox={`0 0 ${APAC_VIEW.w} ${APAC_VIEW.h}`}
                className="w-full h-auto block"
                role="group"
                aria-label="Asia Pacific engagement markets"
              >
                <defs>
                  <linearGradient id="landFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2A4368" />
                    <stop offset="100%" stopColor="#1D3050" />
                  </linearGradient>
                  <radialGradient id="seaGlow" cx="42%" cy="48%" r="60%">
                    <stop offset="0%" stopColor="#0E1B30" />
                    <stop offset="100%" stopColor="#070D18" />
                  </radialGradient>
                </defs>

                <rect width={APAC_VIEW.w} height={APAC_VIEW.h} fill="url(#seaGlow)" />

                {/* Graticule */}
                <g stroke="#C9A040" strokeOpacity="0.06" strokeWidth="1">
                  {[0, 10, 20].map((lat) => {
                    const y = toMap(lat, 0).y;
                    return <line key={`la${lat}`} x1="0" y1={y} x2={APAC_VIEW.w} y2={y} />;
                  })}
                  {[100, 110, 120, 130].map((lng) => {
                    const x = toMap(0, lng).x;
                    return <line key={`lo${lng}`} x1={x} y1="0" x2={x} y2={APAC_VIEW.h} />;
                  })}
                </g>

                {/* Land */}
                {APAC_LAND.map((c) => {
                  const engaged = ENGAGED.has(c.name);
                  const isActive = c.name === activeLand;
                  return (
                    <path
                      key={c.name}
                      d={c.d}
                      fill={isActive ? "rgba(201,160,64,0.30)" : engaged ? "url(#landFill)" : "#182740"}
                      stroke={isActive ? "#C9A040" : engaged ? "#3E5E8C" : "#26395A"}
                      strokeWidth={isActive ? 1.8 : 1}
                      strokeOpacity={isActive ? 1 : engaged ? 0.8 : 0.6}
                      style={{ transition: "fill .45s ease, stroke .45s ease" }}
                    />
                  );
                })}

                {/* Engagement routes from Singapore, weighted by engagement count */}
                {NODES.filter((n) => !n.hub).map((n) => {
                  const on = n.code === active;
                  const mx = (HUB.x + n.x) / 2;
                  const my = (HUB.y + n.y) / 2 - Math.hypot(n.x - HUB.x, n.y - HUB.y) * 0.24;
                  return (
                    <path
                      key={n.code}
                      d={`M ${HUB.x} ${HUB.y} Q ${mx} ${my} ${n.x} ${n.y}`}
                      fill="none"
                      stroke={on ? "#C9A040" : "#7F91AC"}
                      strokeOpacity={on ? 0.9 : 0.26}
                      strokeWidth={on ? 3 : 0.9 + n.count * 0.45}
                      strokeDasharray={on ? undefined : "6 6"}
                      style={{ transition: "stroke .4s ease, stroke-opacity .4s ease" }}
                    />
                  );
                })}

                {/* Markets — the flag is the marker, the badge is the engagement count */}
                {NODES.map((n) => {
                  const on = n.code === active;
                  const off = LABEL[n.code] ?? { dx: 0, dy: -18 };
                  const cx = n.x - CHIP_W / 2;
                  const cy = n.y - CHIP_H / 2;
                  return (
                    <g
                      key={n.code}
                      onClick={() => setActive(n.code)}
                      style={{ cursor: "pointer" }}
                      role="button"
                      aria-label={`${n.country} — ${n.count} engagement categories`}
                    >
                      <circle cx={n.x} cy={n.y} r="26" fill="transparent" />

                      {on && (
                        <rect
                          x={cx - 7} y={cy - 7} width={CHIP_W + 14} height={CHIP_H + 14} rx="7"
                          fill="none" stroke="#C9A040" strokeWidth="1.6" strokeOpacity="0.5"
                          className={reduced ? undefined : "anim-node"}
                        />
                      )}

                      <rect
                        x={cx - 2} y={cy - 2} width={CHIP_W + 4} height={CHIP_H + 4} rx="4.5"
                        fill={on ? "#C9A040" : "#0B1424"}
                        stroke={on ? "#C9A040" : "#3A4D6B"} strokeWidth="1"
                        style={{ transition: "fill .3s ease, stroke .3s ease" }}
                      />
                      <image
                        href={n.flag}
                        x={cx} y={cy} width={CHIP_W} height={CHIP_H}
                        preserveAspectRatio="xMidYMid slice"
                        clipPath={`inset(0 round 3)`}
                        opacity={on || n.hub ? 1 : 0.82}
                      />

                      {/* Engagement count */}
                      <circle
                        cx={cx + CHIP_W + 3} cy={cy - 1} r="8.5"
                        fill={on ? "#221805" : "#C9A040"}
                        stroke={on ? "#C9A040" : "none"} strokeWidth="1"
                      />
                      <text
                        x={cx + CHIP_W + 3} y={cy + 2.5} textAnchor="middle"
                        fontFamily="Inter, sans-serif" fontSize="11" fontWeight={700}
                        fill={on ? "#E8D9A8" : "#221805"}
                      >
                        {n.count}
                      </text>

                      <text
                        x={n.x + off.dx} y={n.y + off.dy} textAnchor="middle"
                        fontFamily="Inter, sans-serif" fontSize="15" fontWeight={600} letterSpacing="1.2"
                        fill={on || n.hub ? "#E8D9A8" : "#9DB0C9"}
                        style={{ transition: "fill .3s ease" }}
                      >
                        {n.code}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A040] anim-node" />
                <span className="type-technical text-slate-400">
                  Engagement Markets · {APAC_MARKETS.length}
                </span>
              </div>
              {/* Hidden on phones: at 375px the legend wraps and collides with
                  the city label, and the panel below already names the categories. */}
              <div className="absolute bottom-4 left-4 right-4 hidden sm:flex items-center justify-between gap-4 pointer-events-none">
                <div className="flex items-center gap-2">
                  <span className="w-[17px] h-[17px] rounded-full bg-[#C9A040] text-[#221805] text-[10px] font-bold flex items-center justify-center shrink-0">
                    n
                  </span>
                  <span className="type-technical text-slate-500">Engagement categories</span>
                </div>
                <span className="type-technical text-slate-600">{activeNode.city}</span>
              </div>
            </div>
          </div>

          {/* Data panel */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-3 gap-1.5 mb-6">
              {APAC_MARKETS.map((m) => (
                <button
                  key={m.code}
                  onClick={() => setActive(m.code)}
                  aria-pressed={active === m.code}
                  className={`px-3 py-2.5 rounded-lg text-left transition-all duration-300 border ${
                    active === m.code
                      ? "bg-[linear-gradient(135deg,#E8D9A8,#C9A040_60%)] border-[#C9A040] text-[#221805]"
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
