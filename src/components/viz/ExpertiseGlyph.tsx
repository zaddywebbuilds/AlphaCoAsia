"use client";

/* Each discipline is composed as a full-bleed panel graphic — the artifact fills
   its frame and crops at the edges rather than floating as a thumbnail. Forms
   are large, strokes are heavy, and labels are few and set at a readable size.
   Rendered with preserveAspectRatio="slice", so the viewBox is kept close to the
   host panel's aspect and all type stays inside SAFE_TOP..SAFE_BOTTOM.
   Every diagram draws in on arrival then holds slow continuous motion. */

type Props = { id: string; active: boolean; className?: string };

const CYAN = "#38BDF8";
const GOLD = "#C9A040";
const WARM = "#FFE6A8";
const VIOLET = "#7B6FE8";
const EASE = "cubic-bezier(0.22,1,0.36,1)";

const W = 200;
const H = 92;
/* Type must stay inside this band or the slice crop will clip it. */
const SAFE_TOP = 8;
const SAFE_BOTTOM = 86;

function draw(active: boolean, delay = 0) {
  return {
    pathLength: 1,
    strokeDasharray: 1,
    strokeDashoffset: active ? 0 : 1,
    transition: `stroke-dashoffset 1.1s ${EASE} ${delay}s`,
  } as const;
}

function fade(active: boolean, delay = 0, to = 1) {
  return { opacity: active ? to : 0, transition: `opacity .65s ${EASE} ${delay}s` };
}

function grow(active: boolean, delay = 0) {
  return {
    transform: `scaleY(${active ? 1 : 0})`,
    transformOrigin: "bottom",
    transformBox: "fill-box" as const,
    transition: `transform .8s ${EASE} ${delay}s`,
  };
}

const delay = (s: number) => ({ animationDelay: `${s}s` });

function Signal({ d, dur = 3.6, wait = 0, color = WARM, r = 3 }: { d: string; dur?: number; wait?: number; color?: string; r?: number }) {
  return (
    <circle r={r} fill={color} className="g-travel"
      style={{ offsetPath: `path('${d}')`, animationDuration: `${dur}s`, animationDelay: `${wait}s` }} />
  );
}

/** One label, set as a design element rather than chart furniture. */
function Tag({ x, y, children, color = "currentColor", op = 0.62, size = 7.5, anchor = "start", active, d = 0 }: {
  x: number; y: number; children: string; color?: string; op?: number; size?: number;
  anchor?: "start" | "middle" | "end"; active: boolean; d?: number;
}) {
  return (
    <text x={x} y={y} textAnchor={anchor} fill={color}
      fontFamily="Inter, sans-serif" fontSize={size} fontWeight={600} letterSpacing="1.1"
      style={fade(active, d, op)}>
      {children}
    </text>
  );
}

/* ==================================================================
   ERM — risk heat map, cells filling and bleeding off the frame
   ================================================================== */
function ERM(a: boolean) {
  const COLS = 6, ROWS = 4;
  const cw = 37, ch = 27, x0 = -10, y0 = -7;
  const cells: { i: number; j: number; t: number }[] = [];
  for (let j = 0; j < ROWS; j++) for (let i = 0; i < COLS; i++) {
    // Severity rises toward the top-right corner.
    cells.push({ i, j, t: (i / (COLS - 1)) * 0.55 + ((ROWS - 1 - j) / (ROWS - 1)) * 0.45 });
  }
  const plotted = [{ i: 4, j: 0 }, { i: 3, j: 1 }, { i: 5, j: 1 }];
  const cx = (i: number) => x0 + i * cw + cw / 2 - 1.5;
  const cy = (j: number) => y0 + j * ch + ch / 2 - 1.5;

  return (
    <>
      {cells.map(({ i, j, t }, k) => {
        const hot = t > 0.66, mid = t > 0.38;
        return (
          <rect key={k} x={x0 + i * cw} y={y0 + j * ch} width={cw - 3} height={ch - 3} rx="2"
            fill={hot ? GOLD : CYAN} fillOpacity={hot ? 0.3 + (t - 0.66) * 0.5 : mid ? 0.14 : 0.055}
            stroke={hot ? GOLD : CYAN} strokeWidth="0.8" strokeOpacity={hot ? 0.6 : 0.2}
            style={fade(a, 0.03 * (i + j))} />
        );
      })}

      {plotted.map((p, k) => (
        <g key={k} style={fade(a, 0.5 + k * 0.12)}>
          <circle cx={cx(p.i)} cy={cy(p.j)} r="11" fill="none" stroke={WARM} strokeWidth="1.4"
            className="g-ring" style={{ transformBox: "view-box", transformOrigin: `${cx(p.i)}px ${cy(p.j)}px` }} />
          <circle cx={cx(p.i)} cy={cy(p.j)} r="6.5" fill="none" stroke={WARM} strokeWidth="1.8" />
          <circle cx={cx(p.i)} cy={cy(p.j)} r="2.8" fill={WARM} className="g-node" style={delay(k * 0.6)} />
        </g>
      ))}

      {/* Severity direction, as a design mark rather than an axis */}
      <g style={fade(a, 0.85, 0.6)}>
        <line x1="10" y1="80" x2="50" y2="80" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 46 76 L 51 80 L 46 84" fill="none" stroke="currentColor" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <Tag x={10} y={72} active={a} d={0.9}>SEVERITY</Tag>
    </>
  );
}

/* ==================================================================
   Actuarial — loss distribution, curve spanning the full width
   ================================================================== */
function Actuarial(a: boolean) {
  const base = 88;
  const bars = [4, 8, 15, 26, 40, 54, 63, 58, 47, 35, 25, 16, 10, 6, 3];
  const bw = 14.2;
  const curve = "M -6 84 C 26 82 34 22 78 16 C 122 10 138 72 206 82";
  const varX = 136;

  return (
    <>
      {bars.map((h, i) => {
        const x = -6 + i * bw;
        const past = x >= varX;
        return (
          <rect key={i} x={x} y={base - h} width={bw - 3} height={h} rx="1.5"
            fill={past ? GOLD : CYAN} fillOpacity={past ? 0.5 : 0.22}
            className="g-bar" style={{ ...grow(a, i * 0.03), ...delay(i * 0.1) }} />
        );
      })}

      <path d={curve} fill="none" stroke={CYAN} strokeWidth="2.6" strokeLinecap="round"
        opacity="0.95" style={draw(a, 0.25)} />

      <line x1={varX} y1={22} x2={varX} y2={base} stroke={GOLD} strokeWidth="1.8"
        strokeDasharray="5 4" className="g-flow" style={draw(a, 0.75)} />
      <Tag x={varX + 6} y={32} color={GOLD} op={0.95} size={8} active={a} d={0.95}>VaR 99.5%</Tag>

      {a && <Signal d={curve} dur={4.8} r={3.2} />}
      <line x1={-6} y1={base} x2={206} y2={base} stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
    </>
  );
}

/* ==================================================================
   ORSA — solvency projection fan against the capital requirement
   ================================================================== */
function ORSA(a: boolean) {
  const upper = "M -6 56 C 52 46 110 22 206 10";
  const lower = "M -6 56 C 52 66 110 64 206 58";
  const central = "M -6 56 C 52 54 110 42 206 32";
  const req = 74;

  return (
    <>
      <path d={`${upper} L 206 58 C 110 64 52 66 -6 56 Z`} fill={CYAN} fillOpacity="0.15"
        className="g-breathe" style={fade(a, 0.45)} />
      <path d={upper} fill="none" stroke={CYAN} strokeWidth="1.4" opacity="0.5" style={draw(a, 0.3)} />
      <path d={lower} fill="none" stroke={CYAN} strokeWidth="1.4" opacity="0.5" style={draw(a, 0.35)} />
      <path d={central} fill="none" stroke={GOLD} strokeWidth="2.8" strokeLinecap="round" style={draw(a, 0.2)} />

      <line x1={-6} y1={req} x2={206} y2={req} stroke={WARM} strokeWidth="1.8"
        strokeDasharray="6 4" className="g-flow" style={draw(a, 0.7)} />
      <Tag x={10} y={84} color={WARM} op={0.9} active={a} d={0.9}>CAPITAL REQUIREMENT</Tag>

      {a && <Signal d={central} dur={5} r={3.4} />}
    </>
  );
}

/* ==================================================================
   RBC — available capital against required risk charges
   ================================================================== */
function RBC(a: boolean) {
  const base = 96;
  const availSegs = [38, 22, 16];
  const reqSegs = [26, 18, 12];
  const stack = (segs: number[], x: number, c: string, d0: number) => {
    let y = base;
    return segs.map((h, i) => {
      y -= h;
      return (
        <rect key={i} x={x} y={y} width="54" height={h - 3} rx="2"
          fill={c} fillOpacity={0.5 - i * 0.14} stroke={c} strokeWidth="1.1" strokeOpacity={0.8 - i * 0.18}
          className="g-bar" style={{ ...grow(a, d0 + i * 0.1), ...delay(i * 0.35) }} />
      );
    });
  };
  const availTop = base - availSegs.reduce((s, v) => s + v, 0);
  const reqTop = base - reqSegs.reduce((s, v) => s + v, 0);

  return (
    <>
      {stack(availSegs, 26, GOLD, 0.15)}
      {stack(reqSegs, 120, CYAN, 0.3)}

      {/* Headroom bracket between the two columns */}
      <line x1={84} y1={availTop} x2={112} y2={availTop} stroke={WARM} strokeWidth="1.4"
        strokeDasharray="4 3" className="g-flow" style={draw(a, 0.8)} />
      <line x1={112} y1={availTop} x2={112} y2={reqTop} stroke={WARM} strokeWidth="1.4"
        strokeDasharray="4 3" className="g-flow" style={draw(a, 0.9)} />

      <Tag x={26} y={14} color={GOLD} op={0.9} active={a} d={0.85}>AVAILABLE</Tag>
      <Tag x={120} y={34} color={CYAN} op={0.85} active={a} d={0.95}>REQUIRED</Tag>

      {a && <Signal d={`M 53 ${base} L 53 ${availTop}`} dur={3.6} r={3} />}
    </>
  );
}

/* ==================================================================
   Regulatory — MAS licence pathway, chevrons spanning the full width
   ================================================================== */
function Regulatory(a: boolean) {
  const stages = ["PREP", "SUBMIT", "REVIEW", "IPA", "LICENCE"];
  // Sized so the first and last stage labels both stay inside the frame.
  const w = 39, gap = 2, x0 = -2, y = 26, h = 40;
  const track = `M ${x0 + 10} ${y + h / 2} L ${x0 + 4 * (w + gap) + w} ${y + h / 2}`;

  return (
    <>
      {stages.map((s, i) => {
        const x = x0 + i * (w + gap);
        const done = i < 3;
        return (
          <g key={s} style={fade(a, 0.1 + i * 0.11)}>
            <path
              d={`M ${x} ${y} L ${x + w - 10} ${y} L ${x + w} ${y + h / 2} L ${x + w - 10} ${y + h} L ${x} ${y + h} L ${x + 10} ${y + h / 2} Z`}
              fill={done ? GOLD : CYAN} fillOpacity={done ? 0.28 : 0.07}
              stroke={done ? GOLD : CYAN} strokeWidth="1.4" strokeOpacity={done ? 0.9 : 0.35}
              className={done ? undefined : "g-blink"} style={done ? undefined : delay(i * 0.5)} />
            <text x={x + w / 2} y={y + h / 2 + 3} textAnchor="middle"
              fontFamily="Inter, sans-serif" fontSize="7" fontWeight={600} letterSpacing="0.6"
              fill={done ? GOLD : "currentColor"} opacity={done ? 1 : 0.5}>
              {s}
            </text>
          </g>
        );
      })}
      {a && <Signal d={track} dur={4.4} r={3.4} />}
    </>
  );
}

/* ==================================================================
   AML/CFT — screening funnel into escalation
   ================================================================== */
function AML(a: boolean) {
  const feeds = [8, 22, 36, 50, 64, 78];
  const gx = 84;
  const esc = `M ${gx + 22} 44 L 196 22`;

  return (
    <>
      {feeds.map((y, i) => (
        <line key={y} x1={-8} y1={y} x2={gx - 18} y2={47} stroke="currentColor"
          strokeWidth="1.1" opacity="0.26" strokeDasharray="4 3"
          className="g-flow" style={{ ...draw(a, i * 0.05), ...delay(i * 0.2) }} />
      ))}
      {feeds.map((y, i) => (
        <circle key={`d${y}`} cx={-2} cy={y} r="3" fill={CYAN}
          className="g-node" style={{ ...fade(a, 0.2 + i * 0.05), ...delay(i * 0.33) }} />
      ))}

      <path d={`M ${gx - 18} 16 L ${gx + 22} 34 L ${gx + 22} 62 L ${gx - 18} 80 Z`}
        fill={CYAN} fillOpacity="0.14" stroke={CYAN} strokeWidth="1.6" strokeOpacity="0.6"
        style={fade(a, 0.4)} />
      <Tag x={gx + 2} y={12} anchor="middle" active={a} d={0.6}>SCREENING</Tag>

      <line x1={gx + 22} y1={56} x2={196} y2={74} stroke="currentColor" strokeWidth="1.2"
        opacity="0.28" strokeDasharray="4 3" className="g-flow" style={draw(a, 0.6)} />
      <path d={esc} fill="none" stroke={GOLD} strokeWidth="2.4" style={draw(a, 0.65)} />

      <circle cx={176} cy={24} r="6.5" fill={GOLD} className="g-node" style={fade(a, 0.9)} />
      <circle cx={176} cy={24} r="14" fill="none" stroke={GOLD} strokeWidth="1.4"
        className="g-ring" style={{ transformBox: "view-box", transformOrigin: "176px 24px" }} />
      <Tag x={196} y={46} anchor="end" color={GOLD} op={0.95} active={a} d={0.95}>ESCALATE</Tag>

      {a && <Signal d={esc} dur={2.9} r={3.2} />}
    </>
  );
}

/* ==================================================================
   Insurtech — platform stack, layers bleeding off both edges
   ================================================================== */
function Insurtech(a: boolean) {
  const layers = [
    { label: "CHANNELS", mods: 4, accent: false },
    { label: "API LAYER", mods: 1, accent: true },
    { label: "POLICY CORE", mods: 3, accent: false },
    { label: "DATA", mods: 2, accent: false },
  ];
  const x0 = -10, w = 220, h = 17, gap = 4, top = 7;

  return (
    <>
      {layers.map((L, i) => {
        const y = top + i * (h + gap);
        return (
          <g key={L.label} style={fade(a, 0.1 + i * 0.11)}>
            <rect x={x0} y={y} width={w} height={h} rx="2.5"
              fill={L.accent ? GOLD : CYAN} fillOpacity={L.accent ? 0.2 : 0.07}
              stroke={L.accent ? GOLD : CYAN} strokeWidth="1.3" strokeOpacity={L.accent ? 0.85 : 0.32} />
            {Array.from({ length: L.mods }).map((_, m) => {
              const inner = 176;
              const mw = (inner - (L.mods - 1) * 6) / L.mods;
              return (
                <rect key={m} x={12 + m * (mw + 6)} y={y + 4} width={mw} height={h - 8} rx="1.5"
                  fill={L.accent ? GOLD : CYAN} fillOpacity={L.accent ? 0.32 : 0.16}
                  className="g-blink" style={delay((i * 4 + m) * 0.18)} />
              );
            })}
            <text x={16} y={y + h / 2 + 2.6}
              fontFamily="Inter, sans-serif" fontSize="7" fontWeight={600} letterSpacing="1"
              fill={L.accent ? GOLD : "currentColor"} opacity={L.accent ? 0.95 : 0.55}>
              {L.label}
            </text>
          </g>
        );
      })}
      {[0, 1, 2].map((i) => {
        const y = top + i * (h + gap) + h;
        return (
          <line key={i} x1={160} y1={y} x2={160} y2={y + gap} stroke={GOLD} strokeWidth="1.6"
            strokeDasharray="3 2" opacity="0.65" className="g-flow"
            style={{ ...draw(a, 0.5 + i * 0.08), ...delay(i * 0.25) }} />
        );
      })}
      {a && <Signal d={`M 160 ${top + h} L 160 ${top + 3 * (h + gap)}`} dur={2.9} r={2.6} />}
    </>
  );
}

/* ==================================================================
   Market Entry — market prioritisation matrix filling the frame
   ================================================================== */
function MarketEntry(a: boolean) {
  const markets = [
    { c: "SG", x: 0.84, y: 0.88, hub: true },
    { c: "HK", x: 0.68, y: 0.7, hub: false },
    { c: "MY", x: 0.58, y: 0.48, hub: false },
    { c: "ID", x: 0.26, y: 0.76, hub: false },
    { c: "VN", x: 0.34, y: 0.4, hub: false },
  ];
  const px = (v: number) => -4 + v * 208;
  const py = (v: number) => 88 - v * 74;
  const midY = py(0.5);

  return (
    <>
      {/* Priority quadrant */}
      <rect x={100} y={-4} width={108} height={midY + 4} fill={GOLD} fillOpacity="0.13" style={fade(a, 0.25)} />
      <line x1={100} y1={-4} x2={100} y2={96} stroke="currentColor" strokeWidth="1"
        opacity="0.22" strokeDasharray="5 4" style={draw(a, 0.15)} />
      <line x1={-6} y1={midY} x2={206} y2={midY} stroke="currentColor" strokeWidth="1"
        opacity="0.22" strokeDasharray="5 4" style={draw(a, 0.2)} />

      {markets.map((m, i) => (
        <g key={m.c} style={fade(a, 0.4 + i * 0.1)}>
          {m.hub && (
            <circle cx={px(m.x)} cy={py(m.y)} r="15" fill="none" stroke={GOLD} strokeWidth="1.4"
              className="g-ring" style={{ transformBox: "view-box", transformOrigin: `${px(m.x)}px ${py(m.y)}px` }} />
          )}
          <circle cx={px(m.x)} cy={py(m.y)} r={m.hub ? 7 : 4.8} fill={m.hub ? GOLD : CYAN}
            className="g-node" style={delay(i * 0.5)} />
          <text x={px(m.x)} y={py(m.y) + (m.hub ? 21 : 17)} textAnchor="middle"
            fontFamily="Inter, sans-serif" fontSize={m.hub ? 8.5 : 7.5} fontWeight={600} letterSpacing="0.8"
            fill={m.hub ? GOLD : "currentColor"} opacity={m.hub ? 1 : 0.6}>
            {m.c}
          </text>
        </g>
      ))}
      <Tag x={196} y={84} anchor="end" color={GOLD} op={0.9} active={a} d={0.9}>PRIORITY MARKETS</Tag>
    </>
  );
}

/* ==================================================================
   Financial Modelling — waterfall bridge across the full width
   ================================================================== */
function Modelling(a: boolean) {
  const base = 88, x0 = -4, bw = 34, gap = 7;
  const steps = [
    { from: 0, to: 38, total: true },
    { from: 38, to: 54, up: true },
    { from: 54, to: 42, up: false },
    { from: 42, to: 60, up: true },
    { from: 0, to: 60, total: true },
  ];
  const y = (v: number) => base - v;

  return (
    <>
      {steps.map((s, i) => {
        const x = x0 + i * (bw + gap);
        const top = y(Math.max(s.from, s.to));
        const h = Math.abs(s.to - s.from);
        const c = s.total ? GOLD : s.up ? CYAN : VIOLET;
        return (
          <g key={i}>
            <rect x={x} y={top} width={bw} height={h} rx="2"
              fill={c} fillOpacity={s.total ? 0.45 : 0.28}
              stroke={c} strokeWidth="1.2" strokeOpacity={s.total ? 0.9 : 0.55}
              className="g-bar" style={{ ...grow(a, 0.1 + i * 0.11), ...delay(i * 0.3) }} />
            {i < steps.length - 1 && (
              <line x1={x + bw} y1={y(s.to)} x2={x + bw + gap} y2={y(s.to)}
                stroke="currentColor" strokeWidth="1.1" opacity="0.4" strokeDasharray="3 2"
                className="g-flow" style={{ ...draw(a, 0.5 + i * 0.1), ...delay(i * 0.2) }} />
            )}
          </g>
        );
      })}
      <line x1={-6} y1={base} x2={206} y2={base} stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
      <Tag x={4} y={18} active={a} d={0.85}>OPENING</Tag>
      <Tag x={196} y={18} anchor="end" color={GOLD} op={0.9} active={a} d={0.95}>CLOSING</Tag>
    </>
  );
}

/* ==================================================================
   Training — competency radar, current capability against target
   ================================================================== */
function Training(a: boolean) {
  const CX = 100, CY = 48, RX = 56, RY = 30;
  const axes = ["ERM", "RBC", "ORSA", "AML", "ACT"];
  const pt = (i: number, v: number) => {
    const ang = (-90 + i * 72) * (Math.PI / 180);
    return { x: CX + Math.cos(ang) * RX * v, y: CY + Math.sin(ang) * RY * v };
  };
  const poly = (vals: number[]) => vals.map((v, i) => { const p = pt(i, v); return `${p.x},${p.y}`; }).join(" ");
  const target = [0.96, 0.9, 0.96, 0.88, 0.92];
  const current = [0.6, 0.46, 0.7, 0.52, 0.58];

  return (
    <>
      {[0.35, 0.68, 1].map((r, k) => (
        <polygon key={r} points={poly([r, r, r, r, r])} fill="none"
          stroke="currentColor" strokeWidth="0.9" opacity={0.2} style={fade(a, 0.05 * k)} />
      ))}
      {axes.map((_, i) => {
        const p = pt(i, 1);
        return <line key={i} x1={CX} y1={CY} x2={p.x} y2={p.y} stroke="currentColor"
          strokeWidth="0.9" opacity="0.2" style={draw(a, 0.1 + i * 0.04)} />;
      })}

      <polygon points={poly(target)} fill={GOLD} fillOpacity="0.1"
        stroke={GOLD} strokeWidth="1.6" strokeOpacity="0.7" strokeDasharray="5 3"
        className="g-flow" style={fade(a, 0.4)} />

      <polygon points={poly(current)} fill={CYAN} fillOpacity="0.28"
        stroke={CYAN} strokeWidth="2.2" className="g-breathe" style={fade(a, 0.6)} />
      {current.map((v, i) => {
        const p = pt(i, v);
        return <circle key={i} cx={p.x} cy={p.y} r="3.4" fill={CYAN}
          className="g-node" style={{ ...fade(a, 0.7 + i * 0.06), ...delay(i * 0.5) }} />;
      })}

      {axes.map((label, i) => {
        const p = pt(i, 1.22);
        return (
          <text key={label} x={p.x} y={p.y + 2.6} textAnchor="middle"
            fontFamily="Inter, sans-serif" fontSize="7.5" fontWeight={600} letterSpacing="0.8"
            fill="currentColor" opacity="0.6" style={fade(a, 0.8, 0.6)}>
            {label}
          </text>
        );
      })}
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
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={`${className ?? ""} ${active ? "" : "glyph-idle"}`}
      aria-hidden="true"
      fill="none"
      strokeLinecap="round"
    >
      {render(active)}
    </svg>
  );
}
