"use client";
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Html } from "@react-three/drei";
import * as THREE from "three";
import { APAC_MARKETS } from "@/lib/data";
import { projectAPAC } from "@/lib/geo";
import type { DeviceTier } from "@/lib/useClient";

/* Two tones only: gold carries the hub and the active market, muted steel
   carries everything at rest, so selection stays legible. */
const MUTED = "#7F91AC";
const GOLD = "#C9A040";
const SPAN_X = 2.15;
const SPAN_Z = 1.55;

/** Real coordinates → world position on the tilted plane. */
function worldPos(lat: number, lng: number) {
  const p = projectAPAC(lat, lng);
  return new THREE.Vector3(p.x * SPAN_X, 0, -p.y * SPAN_Z);
}

const NODES = APAC_MARKETS.map((m) => ({
  ...m,
  pos: worldPos(m.lat, m.lng),
  h: m.hub ? 0.34 : 0.2,
}));
const HUB = NODES.find((n) => n.hub)!;

/* ---------- ground plane ---------- */

function GridPlane() {
  const geo = useMemo(() => {
    const verts: number[] = [];
    const cols: number[] = [];
    const nx = 26, nz = 20;
    const base = new THREE.Color(MUTED);

    const push = (a: THREE.Vector3, b: THREE.Vector3) => {
      for (const v of [a, b]) {
        verts.push(v.x, v.y, v.z);
        // Fade toward the edges by darkening into the background.
        const d = Math.min(1, Math.hypot(v.x / SPAN_X, v.z / SPAN_Z) / 1.25);
        const f = Math.pow(1 - d, 1.7) * 0.5;
        cols.push(base.r * f, base.g * f, base.b * f);
      }
    };

    for (let i = 0; i <= nx; i++) {
      const x = -SPAN_X + (i / nx) * SPAN_X * 2;
      push(new THREE.Vector3(x, 0, -SPAN_Z), new THREE.Vector3(x, 0, SPAN_Z));
    }
    for (let j = 0; j <= nz; j++) {
      const z = -SPAN_Z + (j / nz) * SPAN_Z * 2;
      push(new THREE.Vector3(-SPAN_X, 0, z), new THREE.Vector3(SPAN_X, 0, z));
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    g.setAttribute("color", new THREE.Float32BufferAttribute(cols, 3));
    return g;
  }, []);

  return (
    <lineSegments geometry={geo} frustumCulled={false}>
      <lineBasicMaterial vertexColors transparent opacity={0.6} depthWrite={false} />
    </lineSegments>
  );
}

/** Contour rings radiating from Singapore — reads as reach, not decoration. */
function Contours() {
  const rings = [0.45, 0.85, 1.3, 1.8];
  return (
    <group position={[HUB.pos.x, 0.001, HUB.pos.z]}>
      {rings.map((r, i) => (
        <mesh key={r} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[r, r + 0.004, 96]} />
          <meshBasicMaterial color={GOLD} transparent opacity={0.16 - i * 0.03} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- links ---------- */

function Links({ active, tier }: { active: string; tier: DeviceTier }) {
  const arcs = useMemo(
    () =>
      NODES.filter((n) => !n.hub).map((n) => {
        const a = HUB.pos.clone().setY(HUB.h);
        const b = n.pos.clone().setY(n.h);
        const mid = a.clone().lerp(b, 0.5);
        mid.y += 0.28 + a.distanceTo(b) * 0.14;
        const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
        return { code: n.code, curve, pts: curve.getPoints(tier === "low" ? 20 : 40) };
      }),
    [tier]
  );

  const signal = useRef<THREE.Mesh>(null);
  const activeArc = arcs.find((a) => a.code === active);

  useFrame(({ clock }) => {
    if (!signal.current || !activeArc) return;
    const u = (clock.elapsedTime * 0.3) % 1;
    signal.current.position.copy(activeArc.curve.getPoint(u));
    const s = 0.018 + Math.sin(u * Math.PI) * 0.016;
    signal.current.scale.setScalar(s / 0.018);
  });

  return (
    <group>
      {arcs.map((a) => {
        const on = a.code === active;
        return (
          <Line
            key={a.code}
            points={a.pts}
            color={on ? GOLD : MUTED}
            lineWidth={on ? 1.8 : 0.9}
            transparent
            opacity={on ? 0.95 : 0.26}
            depthWrite={false}
          />
        );
      })}
      {activeArc && (
        <mesh ref={signal}>
          <sphereGeometry args={[0.018, 10, 10]} />
          <meshBasicMaterial color="#FFE6A8" />
        </mesh>
      )}
    </group>
  );
}

/* ---------- nodes ---------- */

function Nodes({ active, onSelect }: { active: string; onSelect: (c: string) => void }) {
  const ring = useRef<THREE.Mesh>(null);
  const activeNode = NODES.find((n) => n.code === active) ?? HUB;

  useFrame(({ clock }) => {
    if (!ring.current) return;
    const t = (clock.elapsedTime * 0.7) % 1;
    ring.current.scale.setScalar(0.6 + t * 1.5);
    (ring.current.material as THREE.MeshBasicMaterial).opacity = (1 - t) * 0.5;
  });

  return (
    <group>
      {/* Selection pulse on the ground under the active node */}
      <mesh ref={ring} position={[activeNode.pos.x, 0.004, activeNode.pos.z]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.075, 0.088, 48]} />
        <meshBasicMaterial color={GOLD} transparent side={THREE.DoubleSide} depthWrite={false} />
      </mesh>

      {NODES.map((n) => {
        const on = n.code === active;
        const color = n.hub || on ? GOLD : MUTED;
        return (
          <group key={n.code} position={n.pos}>
            {/* Stem */}
            <mesh position={[0, n.h / 2, 0]}>
              <cylinderGeometry args={[0.0035, 0.0035, n.h, 6]} />
              <meshBasicMaterial color={color} transparent opacity={on ? 0.85 : 0.4} />
            </mesh>
            {/* Footprint */}
            <mesh position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <circleGeometry args={[on ? 0.042 : 0.028, 24]} />
              <meshBasicMaterial color={color} transparent opacity={0.28} depthWrite={false} />
            </mesh>
            {/* Marker */}
            <mesh
              position={[0, n.h, 0]}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(n.code);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = "pointer";
              }}
              onPointerOut={() => {
                document.body.style.cursor = "";
              }}
            >
              <sphereGeometry args={[on ? 0.036 : 0.024, 16, 16]} />
              <meshBasicMaterial color={color} />
            </mesh>

            <Html
              position={[0, n.h + 0.1, 0]}
              center
              pointerEvents="none"
              style={{ pointerEvents: "none", userSelect: "none" }}
            >
              <div
                className="type-technical whitespace-nowrap transition-colors duration-300"
                style={{ color: on ? "#E0C780" : "rgba(148,163,184,0.72)", fontSize: 9 }}
              >
                {n.code}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

/* ---------- camera rig ---------- */

function Rig({ active, reduced }: { active: string; reduced: boolean }) {
  const node = NODES.find((n) => n.code === active) ?? HUB;
  const target = useRef(new THREE.Vector3(0, 0, 0));
  const look = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(({ camera }, delta) => {
    // Drift ~30% toward the selected market: a considered reframing, not a fly-to.
    target.current.set(node.pos.x * 0.3, 1.05, 2.95 + node.pos.z * 0.16);
    look.current.set(node.pos.x * 0.34, node.h * 0.5, node.pos.z * 0.3);
    const k = reduced ? 1 : Math.min(1, delta * 2.2);
    camera.position.lerp(target.current, k);
    camera.lookAt(look.current);
  });
  return null;
}

export default function APACScene({
  active,
  onSelect,
  tier,
  reduced,
  running,
}: {
  active: string;
  onSelect: (c: string) => void;
  tier: DeviceTier;
  reduced: boolean;
  running: boolean;
}) {
  return (
    <Canvas
      frameloop={running ? "always" : "demand"}
      dpr={tier === "high" ? [1, 2] : [1, 1.5]}
      gl={{ antialias: tier !== "low", alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 1.05, 2.95], fov: 40 }}
      style={{ background: "transparent" }}
    >
      <group rotation={[0, -0.12, 0]}>
        <GridPlane />
        <Contours />
        <Links active={active} tier={tier} />
        <Nodes active={active} onSelect={onSelect} />
      </group>
      <Rig active={active} reduced={reduced} />
    </Canvas>
  );
}
