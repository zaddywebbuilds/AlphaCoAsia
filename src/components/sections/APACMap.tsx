"use client";
import { useState } from "react";
import { APAC_MARKETS } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function APACMap() {
  const [active, setActive] = useState<string | null>("Singapore");
  const activeMarket = APAC_MARKETS.find((m) => m.country === active);

  return (
    <section className="section-py bg-[#0D1B2A]">
      <div className="container-xl">
        <SectionHeader
          eyebrow="APAC Presence"
          title="Asia Pacific Experience"
          description="Advisory and consulting engagements across Singapore and key financial markets throughout Asia."
          light
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* SVG Map */}
          <div className="relative bg-[#0A1628] rounded-2xl border border-white/8 overflow-hidden aspect-[4/3]">
            <svg viewBox="0 0 100 80" className="w-full h-full" style={{ transform: "scale(1.05)" }}>
              {/* Subtle grid */}
              <defs>
                <pattern id="mapgrid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.2" opacity="0.15" />
                </pattern>
              </defs>
              <rect width="100" height="80" fill="url(#mapgrid)" />

              {/* Connection lines from Singapore */}
              {APAC_MARKETS.filter((m) => m.country !== "Singapore").map((market) => {
                const sg = APAC_MARKETS[0];
                return (
                  <line
                    key={market.country}
                    x1={sg.x} y1={sg.y}
                    x2={market.x} y2={market.y}
                    stroke="#C9A040"
                    strokeWidth="0.4"
                    strokeDasharray="1.5 2"
                    opacity="0.3"
                  />
                );
              })}

              {/* Market dots */}
              {APAC_MARKETS.map((market) => (
                <g
                  key={market.country}
                  onClick={() => setActive(market.country)}
                  className="cursor-pointer"
                >
                  {/* Pulse ring for Singapore */}
                  {market.country === "Singapore" && (
                    <circle
                      cx={market.x} cy={market.y} r="4"
                      fill="none"
                      stroke="#C9A040"
                      strokeWidth="0.6"
                      opacity="0.4"
                    />
                  )}
                  <circle
                    cx={market.x} cy={market.y}
                    r={market.country === active ? "3" : "2"}
                    fill={market.country === active ? "#C9A040" : market.country === "Singapore" ? "#C9A040" : "#3A6FA5"}
                    opacity={market.country === active ? 1 : 0.7}
                    className="transition-all duration-200"
                  />
                  <text
                    x={market.x + 3.5} y={market.y + 1}
                    fontSize="3.5"
                    fill="white"
                    opacity="0.7"
                    fontFamily="Inter, sans-serif"
                    fontWeight="500"
                  >
                    {market.code}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Market details */}
          <div>
            <div className="grid grid-cols-3 gap-2 mb-8">
              {APAC_MARKETS.map((market) => (
                <button
                  key={market.country}
                  onClick={() => setActive(market.country)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
                    active === market.country
                      ? "bg-[#C9A040] text-white"
                      : "bg-white/6 text-slate-300 hover:bg-white/12 border border-white/10"
                  }`}
                >
                  {market.country}
                </button>
              ))}
            </div>

            {activeMarket && (
              <div className="bg-white/6 border border-white/10 rounded-2xl p-7">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-[#C9A040]" />
                  <h3 className="text-base font-semibold text-white">{activeMarket.country}</h3>
                </div>
                <p className="text-sm text-slate-400 mb-5">
                  Selected engagement categories in this market:
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeMarket.engagements.map((e) => (
                    <span
                      key={e}
                      className="px-3 py-1.5 bg-white/8 border border-white/12 rounded-full text-xs text-slate-300"
                    >
                      {e}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
