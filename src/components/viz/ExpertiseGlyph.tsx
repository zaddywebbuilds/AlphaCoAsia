"use client";

/* Each discipline is drawn as the actual professional artifact a practitioner
   would recognise — a risk heat map, a loss distribution, a solvency fan chart,
   capital adequacy columns — not abstract line art. Every diagram draws itself
   in on arrival then holds a slow continuous life. All motion stops under
   prefers-reduced-motion. */

type Props = { id: string; active: boolean; className?: string };

const CYAN = "#38BDF8";
const GOLD = "#C9A040";
const WARM = "#FFE6A8";
const EASE = "cubic-bezier(0.22,1,0.36,1)";

/** Draw-on: pathLength=1 normalises every path to one dashoffset value. */
function draw(active: boolean, delay = 0) {
  return {
    pathLength: 1,
    strokeDasharray: 1,
    strokeDashoffset: active ? 0 : 1,
    transition: `stroke-dashoffset 1.05s ${EASE} ${delay}s`,
  } as const;
}

function fade(active: boolean, delay = 0, to = 1) {
  return {
    opacity: active ? to : 0,
    transition: `opacity .6s ${EASE} ${delay}s`,
  };
}

function grow(active: boolean, delay = 0) {
  return {
    transform: `scaleY(${active ? 1 : 0})`,
    transformOrigin: "bottom",
    transformBox: "fill-box" as const,
    transition: `transform .75s ${EASE} ${delay}s`,
  };
}

const delay = (s: number) => ({ animationDelay: `${s}s` });

/** A signal that rides a path exactly, via offset-path. */
function Signal({ d, dur = 3.4, wait = 0, color = WARM, r = 2 }: { d: string; dur?: number; wait?: number; color?: string; r?: number }) {
  return (
    <circle r={r} fill={color} className="g-travel"
      style={{ offsetPath: `path('${d}')`, animationDuration: `${dur}s`, animationDelay: `${wait}s` }} />
  );
}

const AXIS = { stroke: "currentColor", strokeWidth: 0.8, opacity: 0.35 };
const LABEL = { fontFamily: "Inter, sans-serif", fontSize: 5.2, letterSpacing: 0.6, fill: "currentColor", opacity: 0.55 } as const;

/* ------------------------------------------------------------------
   ERM — 5x5 risk heat map (likelihood x impact), the standard ERM artifact
   ------------------------------------------------------------------ */
function ERM(a: boolean) {
  const X0 = 36, Y0 = 12, W = 21, H = 13;
  const cells = [];
  for (let j = 0; j < 5; j++) {
    for (let i = 0; i < 5; i++) {
      const score = (5 - j) * (i + 1);
      const hot = score >= 15;
      const mid = score >= 8 && score < 15;
      cells.push({ i, j, score, hot, mid });
    }
  }
  // Three plotted risks sitting in the upper-right (high likelihood, high impact)
  const plotted = [{ i: 3, j: 1 }, { i: 4, j: 0 }, { i: 2, j: 2 }];

  return (
    <>
      {cells.map(({ i, j, hot, mid }, k) => (
        <rect key={k} x={X0 + i * W} y={Y0 + j * H} width={W - 1.4} height={H - 1.4} rx="1"
          fill={hot ? GOLD : CYAN} fillOpacity={hot ? 0.3 : mid ? 0.16 : 0.07}
          stroke={hot ? GOLD : CYAN} strokeWidth="0.5" strokeOpacity={hot ? 0.55 : 0.22}
          style={fade(a, 0.04 * (i + j))} />
      ))}

      {/* Plotted risks */}
      {plotted.map((p, k) => (
        <g key={k} className="g-node" style={{ ...fade(a, 0.55 + k * 0.12), ...delay(k * 0.7) }}>
          <circle cx={X0 + p.i * W + (W - 1.4) / 2} cy={Y0 + p.j * H + (H - 1.4) / 2} r="3.4"
            fill="none" stroke={WARM} strokeWidth="1.1" />
          <circle cx={X0 + p.i * W + (W - 1.4) / 2} cy={Y0 + p.j * H + (H - 1.4) / 2} r="1.4" fill={WARM} />
        </g>
      ))}

      {/* Axes */}
      <line x1={X0 - 3} y1={Y0} x2={X0 - 3} y2={Y0 + 5 * H - 1.4} {...AXIS} style={draw(a, 0.1)} />
      <line x1={X0 - 3} y1={Y0 + 5 * H - 1.4} x2={X0 + 5 * W - 1.4} y2={Y0 + 5 * H - 1.4} {...AXIS} style={draw(a, 0.15)} />
      <text x={-46} y={9} transform="rotate(-90)" {...LABEL} style={fade(a, 0.7, 0.55)}>IMPACT</text>
      <text x={X0} y={92} {...LABEL} style={fade(a, 0.7, 0.55)}>LIKELIHOOD</text>
    </>
  );
}

/* ------------------------------------------------------------------
   Actuarial — loss distribution with fitted curve and a VaR percentile
   ------------------------------------------------------------------ */
function Actuarial(a: boolean) {
  const base = 78, x0 = 26;
  const bars = [6, 14, 28, 46, 62, 58, 44, 30, 19, 11, 6, 3];
  const bw = 9.4;
  const curve = "M 26 76 C 44 74 48 22 74 20 C 100 18 112 62 150 74";
  const varX = 112;

  return (
    <>
      <line x1={x0 - 4} y1={base} x2={152} y2={base} {...AXIS} style={draw(a, 0.1)} />
      <line x1={x0 - 4} y1={14} x2={x0 - 4} y2={base} {...AXIS} style={draw(a, 0.12)} />

      {bars.map((h, i) => (
        <rect key={i} x={x0 + i * bw} y={base - h * 0.85} width={bw - 2} height={h * 0.85}
          fill={x0 + i * bw >= varX ? GOLD : CYAN} fillOpacity={x0 + i * bw >= varX ? 0.42 : 0.2}
          className="g-bar" style={{ ...grow(a, i * 0.035), ...delay(i * 0.12) }} />
      ))}

      <path d={curve} fill="none" stroke={CYAN} strokeWidth="1.5" strokeLinecap="round"
        opacity="0.9" style={draw(a, 0.3)} />

      {/* Percentile / VaR marker */}
      <line x1={varX} y1={16} x2={varX} y2={base} stroke={GOLD} strokeWidth="1.1"
        strokeDasharray="3 2.5" className="g-flow" style={draw(a, 0.8)} />
      <text x={varX + 3} y={22} {...LABEL} fill={GOLD} style={fade(a, 1.0, 0.9)}>VaR 99.5%</text>

      {a && <Signal d={curve} dur={4.6} color={WARM} r={2.2} />}
      <text x={x0} y={92} {...LABEL} style={fade(a, 0.9, 0.55)}>AGGREGATE LOSS</text>
    </>
  );
}

/* ------------------------------------------------------------------
   ORSA — forward solvency projection fan against the capital requirement
   ------------------------------------------------------------------ */
function ORSA(a: boolean) {
  const base = 78, x0 = 28;
  const upper = "M 28 52 C 62 44 96 26 148 14";
  const lower = "M 28 52 C 62 58 96 58 148 56";
  const central = "M 28 52 C 62 50 96 42 148 34";

  return (
    <>
      <line x1={x0 - 4} y1={base} x2={152} y2={base} {...AXIS} style={draw(a, 0.1)} />
      <line x1={x0 - 4} y1={10} x2={x0 - 4} y2={base} {...AXIS} style={draw(a, 0.12)} />

      {/* Confidence envelope */}
      <path d={`${upper} L 148 56 C 96 58 62 58 28 52 Z`} fill={CYAN} fillOpacity="0.13"
        style={fade(a, 0.55)} className="g-breathe" />
      <path d={upper} fill="none" stroke={CYAN} strokeWidth="0.9" opacity="0.5" style={draw(a, 0.35)} />
      <path d={lower} fill="none" stroke={CYAN} strokeWidth="0.9" opacity="0.5" style={draw(a, 0.4)} />
      <path d={central} fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" style={draw(a, 0.25)} />

      {/* Capital requirement threshold */}
      <line x1={x0} y1={66} x2={150} y2={66} stroke={WARM} strokeWidth="1"
        strokeDasharray="4 3" className="g-flow" style={draw(a, 0.7)} />
      <text x={x0 + 2} y={73} {...LABEL} fill={WARM} style={fade(a, 0.95, 0.85)}>CAPITAL REQUIREMENT</text>

      {a && <Signal d={central} dur={4.8} color={WARM} r={2.3} />}
      <text x={x0} y={92} {...LABEL} style={fade(a, 0.9, 0.55)}>PROJECTION HORIZON</text>
    </>
  );
}

/* ------------------------------------------------------------------
   RBC — capital adequacy: available capital against required risk charges
   ------------------------------------------------------------------ */
function RBC(a: boolean) {
  const base = 76;
  const avail = [
    { h: 30, c: GOLD, o: 0.5 },
    { h: 18, c: GOLD, o: 0.3 },
    { h: 12, c: GOLD, o: 0.18 },
  ];
  const req = [
    { h: 20, c: CYAN, o: 0.4 },
    { h: 14, c: CYAN, o: 0.28 },
    { h: 10, c: CYAN, o: 0.18 },
  ];
  const col = (segs: { h: number; c: string; o: number }[], x: number, d0: number) => {
    let y = base;
    return segs.map((s, i) => {
      y -= s.h;
      return (
        <rect key={i} x={x} y={y} width="30" height={s.h - 1.2} rx="1"
          fill={s.c} fillOpacity={s.o} stroke={s.c} strokeWidth="0.6" strokeOpacity={s.o + 0.3}
          className="g-bar" style={{ ...grow(a, d0 + i * 0.1), ...delay(i * 0.35) }} />
      );
    });
  };
  const availTop = base - 60;
  const reqTop = base - 44;

  return (
    <>
      <line x1={22} y1={base} x2={150} y2={base} {...AXIS} style={draw(a, 0.1)} />

      {col(avail, 40, 0.15)}
      {col(req, 102, 0.3)}

      {/* Solvency ratio bracket between the two columns */}
      <line x1={70} y1={availTop} x2={96} y2={availTop} stroke={WARM} strokeWidth="0.9"
        strokeDasharray="3 2" className="g-flow" style={draw(a, 0.8)} />
      <line x1={132} y1={reqTop} x2={150} y2={reqTop} stroke={CYAN} strokeWidth="0.9"
        strokeDasharray="3 2" className="g-flow" style={draw(a, 0.85)} />
      <text x={74} y={availTop - 3} {...LABEL} fill={WARM} style={fade(a, 1, 0.9)}>RATIO</text>

      <text x={38} y={88} {...LABEL} style={fade(a, 0.9, 0.55)}>AVAILABLE</text>
      <text x={102} y={88} {...LABEL} style={fade(a, 0.95, 0.55)}>REQUIRED</text>

      {a && <Signal d={`M 55 ${base} L 55 ${availTop}`} dur={3.4} color={WARM} r={2} />}
    </>
  );
}

/* ------------------------------------------------------------------
   Regulatory — licence application process flow with progress
   ------------------------------------------------------------------ */
function Regulatory(a: boolean) {
  const stages = ["PREP", "SUBMIT", "REVIEW", "IPA", "LICENCE"];
  const w = 27, gap = 1.5, x0 = 12, y = 30, h = 26;
  const track = `M ${x0} ${y + h / 2} L ${x0 + 5 * (w + gap) - gap} ${y + h / 2}`;

  return (
    <>
      {stages.map((s, i) => {
        const x = x0 + i * (w + gap);
        const done = i < 3;
        return (
          <g key={s} style={fade(a, 0.1 + i * 0.12)}>
            {/* Chevron stage */}
            <path
              d={`M ${x} ${y} L ${x + w - 6} ${y} L ${x + w} ${y + h / 2} L ${x + w - 6} ${y + h} L ${x} ${y + h} L ${x + 6} ${y + h / 2} Z`}
              fill={done ? GOLD : CYAN} fillOpacity={done ? 0.26 : 0.08}
              stroke={done ? GOLD : CYAN} strokeWidth="0.9" strokeOpacity={done ? 0.85 : 0.4}
              className={done ? undefined : "g-blink"} style={done ? undefined : delay(i * 0.5)} />
            <text x={x + w / 2} y={y + h / 2 + 2} textAnchor="middle"
              fontFamily="Inter, sans-serif" fontSize="4.6" letterSpacing="0.5"
              fill={done ? GOLD : "currentColor"} opacity={done ? 0.95 : 0.5}>
              {s}
            </text>
          </g>
        );
      })}
      <line x1={x0} y1={y + h + 8} x2={x0 + 3 * (w + gap) - gap} y2={y + h + 8}
        stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" style={draw(a, 0.7)} />
      <line x1={x0 + 3 * (w + gap) - gap} y1={y + h + 8} x2={x0 + 5 * (w + gap) - gap} y2={y + h + 8}
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.18" style={draw(a, 0.75)} />
      <text x={x0} y={y - 6} {...LABEL} style={fade(a, 0.85, 0.55)}>MAS LICENCE PATHWAY</text>
      {a && <Signal d={track} dur={4.2} color={WARM} r={2.4} />}
    </>
  );
}

/* ------------------------------------------------------------------
   AML/CFT — transaction screening funnel into alerts and escalation
   ------------------------------------------------------------------ */
function AML(a: boolean) {
  const feeds = [16, 26, 36, 46, 56, 66];
  const gateX = 74;
  const esc = `M ${gateX + 12} 40 L 132 26`;

  return (
    <>
      {/* Inbound transaction flows */}
      {feeds.map((y, i) => (
        <line key={y} x1={10} y1={y + 6} x2={gateX - 10} y2={40} stroke="currentColor"
          strokeWidth="0.7" opacity="0.26" strokeDasharray="2.5 2.5"
          className="g-flow" style={{ ...draw(a, i * 0.05), ...delay(i * 0.2) }} />
      ))}
      {feeds.map((y, i) => (
        <circle key={`d${y}`} cx={10} cy={y + 6} r="1.8" fill={CYAN}
          className="g-node" style={{ ...fade(a, 0.2 + i * 0.05), ...delay(i * 0.33) }} />
      ))}

      {/* Screening gate */}
      <path d={`M ${gateX - 10} 22 L ${gateX + 12} 30 L ${gateX + 12} 50 L ${gateX - 10} 58 Z`}
        fill={CYAN} fillOpacity="0.12" stroke={CYAN} strokeWidth="1" strokeOpacity="0.55"
        style={fade(a, 0.4)} />
      <text x={gateX + 1} y={16} textAnchor="middle" {...LABEL} style={fade(a, 0.65, 0.6)}>SCREENING</text>

      {/* Cleared vs escalated */}
      <line x1={gateX + 12} y1={48} x2={132} y2={58} stroke="currentColor" strokeWidth="0.8"
        opacity="0.28" strokeDasharray="2.5 2.5" className="g-flow" style={draw(a, 0.6)} />
      <path d={esc} fill="none" stroke={GOLD} strokeWidth="1.6" style={draw(a, 0.65)} />

      <circle cx={132} cy={58} r="2.6" fill={CYAN} opacity="0.6" style={fade(a, 0.85, 0.6)} />
      <text x={138} y={60} {...LABEL} style={fade(a, 0.9, 0.5)}>CLEAR</text>

      <circle cx={132} cy={26} r="4" fill={GOLD} className="g-node" style={fade(a, 0.9)} />
      <circle cx={132} cy={26} r="8" fill="none" stroke={GOLD} strokeWidth="0.9"
        className="g-ring" style={{ transformBox: "view-box", transformOrigin: "132px 26px" }} />
      <text x={124} y={13} {...LABEL} fill={GOLD} style={fade(a, 0.95, 0.9)}>ESCALATE</text>

      {a && <Signal d={esc} dur={2.8} color={WARM} r={2.2} />}
    </>
  );
}

/* ------------------------------------------------------------------
   Insurtech — platform stack architecture
   ------------------------------------------------------------------ */
function Insurtech(a: boolean) {
  const layers = [
    { label: "CHANNELS", mods: 4, accent: false },
    { label: "API LAYER", mods: 1, accent: true },
    { label: "POLICY CORE", mods: 3, accent: false },
    { label: "DATA", mods: 2, accent: false },
  ];
  const x0 = 30, w = 116, h = 15, gap = 5;

  return (
    <>
      {layers.map((L, i) => {
        const y = 10 + i * (h + gap);
        return (
          <g key={L.label} style={fade(a, 0.1 + i * 0.12)}>
            <rect x={x0} y={y} width={w} height={h} rx="2"
              fill={L.accent ? GOLD : CYAN} fillOpacity={L.accent ? 0.18 : 0.07}
              stroke={L.accent ? GOLD : CYAN} strokeWidth="0.9" strokeOpacity={L.accent ? 0.8 : 0.35} />
            {/* Modules inside the layer */}
            {Array.from({ length: L.mods }).map((_, m) => {
              const mw = (w - 8 - (L.mods - 1) * 4) / L.mods;
              return (
                <rect key={m} x={x0 + 4 + m * (mw + 4)} y={y + 4} width={mw} height={h - 8} rx="1"
                  fill={L.accent ? GOLD : CYAN} fillOpacity={L.accent ? 0.3 : 0.16}
                  className="g-blink" style={delay((i * 4 + m) * 0.18)} />
              );
            })}
            <text x={x0 - 3} y={y + h / 2 + 1.8} textAnchor="end"
              fontFamily="Inter, sans-serif" fontSize="4.4" letterSpacing="0.4"
              fill={L.accent ? GOLD : "currentColor"} opacity={L.accent ? 0.9 : 0.5}>
              {L.label}
            </text>
          </g>
        );
      })}

      {/* Inter-layer connectors */}
      {[0, 1, 2].map((i) => {
        const y = 10 + i * (h + gap) + h;
        return (
          <line key={i} x1={88} y1={y} x2={88} y2={y + gap} stroke={GOLD} strokeWidth="1"
            strokeDasharray="2 2" opacity="0.6" className="g-flow" style={{ ...draw(a, 0.5 + i * 0.08), ...delay(i * 0.25) }} />
        );
      })}
      {a && <Signal d={`M 88 ${10 + h} L 88 ${10 + 3 * (h + gap)}`} dur={2.8} color={WARM} r={1.9} />}
    </>
  );
}

/* ------------------------------------------------------------------
   Market Entry — market prioritisation matrix, the standard entry artifact
   ------------------------------------------------------------------ */
function MarketEntry(a: boolean) {
  const X0 = 30, Y0 = 12, W = 118, H = 62;
  // x = ease of entry, y = market attractiveness (higher is up)
  const markets = [
    { c: "SG", x: 0.82, y: 0.88, hub: true },
    { c: "MY", x: 0.62, y: 0.55, hub: false },
    { c: "HK", x: 0.7, y: 0.72, hub: false },
    { c: "ID", x: 0.3, y: 0.78, hub: false },
    { c: "VN", x: 0.38, y: 0.46, hub: false },
  ];
  const px = (v: number) => X0 + v * W;
  const py = (v: number) => Y0 + (1 - v) * H;

  return (
    <>
      {/* Quadrants */}
      <rect x={X0} y={Y0} width={W} height={H} fill={CYAN} fillOpacity="0.04"
        stroke={CYAN} strokeWidth="0.5" strokeOpacity="0.2" style={fade(a, 0.1)} />
      <rect x={X0 + W / 2} y={Y0} width={W / 2} height={H / 2} fill={GOLD} fillOpacity="0.12"
        style={fade(a, 0.3)} />
      <line x1={X0 + W / 2} y1={Y0} x2={X0 + W / 2} y2={Y0 + H} stroke="currentColor"
        strokeWidth="0.6" opacity="0.25" strokeDasharray="3 3" style={draw(a, 0.2)} />
      <line x1={X0} y1={Y0 + H / 2} x2={X0 + W} y2={Y0 + H / 2} stroke="currentColor"
        strokeWidth="0.6" opacity="0.25" strokeDasharray="3 3" style={draw(a, 0.25)} />

      {/* Plotted markets */}
      {markets.map((m, i) => (
        <g key={m.c} className="g-node" style={{ ...fade(a, 0.45 + i * 0.1), ...delay(i * 0.55) }}>
          {m.hub && (
            <circle cx={px(m.x)} cy={py(m.y)} r="7" fill="none" stroke={GOLD} strokeWidth="0.9"
              className="g-ring" style={{ transformBox: "view-box", transformOrigin: `${px(m.x)}px ${py(m.y)}px` }} />
          )}
          <circle cx={px(m.x)} cy={py(m.y)} r={m.hub ? 4 : 2.8}
            fill={m.hub ? GOLD : CYAN} />
          <text x={px(m.x) + (m.hub ? 7 : 5)} y={py(m.y) + 2}
            fontFamily="Inter, sans-serif" fontSize="4.8" letterSpacing="0.5"
            fill={m.hub ? GOLD : "currentColor"} opacity={m.hub ? 0.95 : 0.6}>
            {m.c}
          </text>
        </g>
      ))}

      {/* Axes */}
      <line x1={X0} y1={Y0 + H} x2={X0 + W} y2={Y0 + H} {...AXIS} style={draw(a, 0.15)} />
      <line x1={X0} y1={Y0} x2={X0} y2={Y0 + H} {...AXIS} style={draw(a, 0.18)} />
      <text x={-74} y={9} transform="rotate(-90)" {...LABEL} style={fade(a, 0.85, 0.55)}>ATTRACTIVENESS</text>
      <text x={X0} y={92} {...LABEL} style={fade(a, 0.85, 0.55)}>EASE OF ENTRY</text>
    </>
  );
}

/* ------------------------------------------------------------------
   Financial Modelling — waterfall bridge, the standard modelling output
   ------------------------------------------------------------------ */
function Modelling(a: boolean) {
  const base = 76, x0 = 22, bw = 20, gap = 5;
  // value, isTotal
  const steps = [
    { from: 0, to: 34, total: true },
    { from: 34, to: 50, total: false, up: true },
    { from: 50, to: 38, total: false, up: false },
    { from: 38, to: 54, total: false, up: true },
    { from: 0, to: 54, total: true },
  ];
  const y = (v: number) => base - v;

  return (
    <>
      <line x1={x0 - 4} y1={base} x2={152} y2={base} {...AXIS} style={draw(a, 0.1)} />

      {steps.map((s, i) => {
        const x = x0 + i * (bw + gap);
        const top = y(Math.max(s.from, s.to));
        const h = Math.abs(s.to - s.from);
        const c = s.total ? GOLD : s.up ? CYAN : "#7B6FE8";
        return (
          <g key={i}>
            <rect x={x} y={top} width={bw} height={h} rx="1"
              fill={c} fillOpacity={s.total ? 0.42 : 0.26}
              stroke={c} strokeWidth="0.7" strokeOpacity={s.total ? 0.85 : 0.5}
              className="g-bar" style={{ ...grow(a, 0.1 + i * 0.12), ...delay(i * 0.3) }} />
            {/* Bridge connector to the next step */}
            {i < steps.length - 1 && (
              <line x1={x + bw} y1={y(s.to)} x2={x + bw + gap} y2={y(s.to)}
                stroke="currentColor" strokeWidth="0.7" opacity="0.35" strokeDasharray="2 2"
                className="g-flow" style={{ ...draw(a, 0.5 + i * 0.1), ...delay(i * 0.2) }} />
            )}
          </g>
        );
      })}

      <text x={x0} y={88} {...LABEL} style={fade(a, 0.85, 0.55)}>OPENING</text>
      <text x={x0 + 4 * (bw + gap) - 4} y={88} {...LABEL} style={fade(a, 0.9, 0.55)}>CLOSING</text>
      {a && <Signal d={`M ${x0} ${y(34)} L 152 ${y(54)}`} dur={4.2} color={WARM} r={2} />}
    </>
  );
}

/* ------------------------------------------------------------------
   Training — competency radar, current capability against target
   ------------------------------------------------------------------ */
function Training(a: boolean) {
  const CX = 88, CY = 44, R = 34;
  const axes = ["ERM", "RBC", "ORSA", "AML", "ACT"];
  const pt = (i: number, v: number) => {
    const ang = (-90 + i * (360 / 5)) * (Math.PI / 180);
    return { x: CX + Math.cos(ang) * R * v, y: CY + Math.sin(ang) * R * v };
  };
  const poly = (vals: number[]) => vals.map((v, i) => { const p = pt(i, v); return `${p.x},${p.y}`; }).join(" ");
  const target = [0.95, 0.9, 0.95, 0.88, 0.92];
  const current = [0.62, 0.48, 0.7, 0.55, 0.6];

  return (
    <>
      {/* Web */}
      {[0.33, 0.66, 1].map((r, k) => (
        <polygon key={r} points={poly([r, r, r, r, r])} fill="none"
          stroke="currentColor" strokeWidth="0.5" opacity={0.2} style={fade(a, 0.05 * k)} />
      ))}
      {axes.map((_, i) => {
        const p = pt(i, 1);
        return <line key={i} x1={CX} y1={CY} x2={p.x} y2={p.y} stroke="currentColor"
          strokeWidth="0.5" opacity="0.2" style={draw(a, 0.1 + i * 0.04)} />;
      })}

      {/* Target */}
      <polygon points={poly(target)} fill={GOLD} fillOpacity="0.1"
        stroke={GOLD} strokeWidth="1" strokeOpacity="0.6" strokeDasharray="3 2"
        className="g-flow" style={fade(a, 0.4)} />

      {/* Current capability */}
      <polygon points={poly(current)} fill={CYAN} fillOpacity="0.25"
        stroke={CYAN} strokeWidth="1.3" className="g-breathe" style={fade(a, 0.6)} />
      {current.map((v, i) => {
        const p = pt(i, v);
        return <circle key={i} cx={p.x} cy={p.y} r="2.2" fill={CYAN}
          className="g-node" style={{ ...fade(a, 0.7 + i * 0.06), ...delay(i * 0.5) }} />;
      })}

      {/* Axis labels */}
      {axes.map((label, i) => {
        const p = pt(i, 1.24);
        return (
          <text key={label} x={p.x} y={p.y + 1.6} textAnchor="middle"
            fontFamily="Inter, sans-serif" fontSize="4.6" letterSpacing="0.5"
            fill="currentColor" opacity="0.55" style={fade(a, 0.8, 0.55)}>
            {label}
          </text>
        );
      })}

      <text x={10} y={90} {...LABEL} fill={GOLD} style={fade(a, 0.95, 0.85)}>TARGET</text>
      <text x={46} y={90} {...LABEL} fill={CYAN} style={fade(a, 1, 0.85)}>CURRENT</text>
    </>
  );
}

const GLYPHS: Record<string, (a: boolean) => React.ReactNode> = {
  training: Training,
  "enterprise-risk-management": ERM,
  "actuarial-consulting": Actuarial,
  "orsa-advisory": ORSA,
  "risk-based-capital": RBC,
  "regulatory-licensing": Regulatory,
  "aml-cft": AML,
  "insurtech-digital": Insurtech,
  "market-entry": MarketEntry,
  "financial-modelling": Modelling,
};

export function ExpertiseGlyph({ id, active, className }: Props) {
  const render = GLYPHS[id] ?? ERM;
  return (
    <svg
      viewBox="0 0 160 100"
      className={`${className ?? ""} ${active ? "" : "glyph-idle"}`}
      aria-hidden="true"
      fill="none"
      strokeLinecap="round"
    >
      {render(active)}
    </svg>
  );
}
