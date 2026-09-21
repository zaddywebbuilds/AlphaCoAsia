"use client";
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";
import type { DeviceTier } from "@/lib/useClient";

/* A miniature Singapore-style model city: matte architectural volumes on a wet
   reflective plaza under soft overcast light. Built as real geometry so it has
   genuine depth and parallax rather than being a picture of depth. */

const WARM_WHITE = "#E9E7E2";
const STONE = "#C8C5BD";
const SLATE = "#2C3542";
const GOLD = "#C9A040";

/** Deterministic PRNG — the same city every render, which static export needs. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Block = { x: number; z: number; w: number; d: number; h: number; kind: 0 | 1 | 2 };

function buildCity(tier: DeviceTier): Block[] {
  const rnd = mulberry32(20260921);
  const blocks: Block[] = [];
  const cell = 1.15;
  const cols = tier === "low" ? 15 : 21;
  const rows = tier === "low" ? 8 : 11;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      // Leave avenue gutters so roads read between the blocks.
      if (i % 4 === 3 || j % 3 === 2) continue;

      const x = (i - (cols - 1) / 2) * cell;
      const z = (j - (rows - 1) / 2) * cell - 1.2;

      // Density and height fall off from the centre, the way a CBD does.
      const dist = Math.hypot(x / 9, (z + 0.5) / 5.5);
      const core = Math.max(0, 1 - dist);
      if (rnd() > 0.5 + core * 0.5) continue;

      const h = 0.22 + Math.pow(core, 1.5) * 2.5 * (0.45 + rnd() * 0.85);
      const r = rnd();
      const kind: 0 | 1 | 2 = r > 0.9 ? 2 : r > 0.62 ? 1 : 0;

      blocks.push({
        x: x + (rnd() - 0.5) * 0.12,
        z: z + (rnd() - 0.5) * 0.12,
        w: cell * (0.5 + rnd() * 0.3),
        d: cell * (0.5 + rnd() * 0.3),
        h,
        kind,
      });
    }
  }
  return blocks;
}

function Buildings({ blocks, kind, color, emissive, tier }: {
  blocks: Block[]; kind: 0 | 1 | 2; color: string; emissive?: string; tier: DeviceTier;
}) {
  const set = useMemo(() => blocks.filter((b) => b.kind === kind), [blocks, kind]);
  const ref = useRef<THREE.InstancedMesh>(null);

  useMemo(() => {
    if (!ref.current) return;
    const m = new THREE.Matrix4();
    set.forEach((b, i) => {
      m.compose(
        new THREE.Vector3(b.x, b.h / 2, b.z),
        new THREE.Quaternion(),
        new THREE.Vector3(b.w, b.h, b.d)
      );
      ref.current!.setMatrixAt(i, m);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  }, [set]);

  if (!set.length) return null;

  return (
    <instancedMesh
      ref={(n) => {
        if (!n) return;
        ref.current = n;
        const m = new THREE.Matrix4();
        set.forEach((b, i) => {
          m.compose(
            new THREE.Vector3(b.x, b.h / 2, b.z),
            new THREE.Quaternion(),
            new THREE.Vector3(b.w, b.h, b.d)
          );
          n.setMatrixAt(i, m);
        });
        n.instanceMatrix.needsUpdate = true;
      }}
      args={[undefined, undefined, set.length]}
      castShadow={tier === "high"}
      receiveShadow={tier === "high"}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={color}
        roughness={emissive ? 0.35 : 0.78}
        metalness={emissive ? 0.25 : 0.05}
        emissive={emissive ?? "#000000"}
        emissiveIntensity={emissive ? 0.3 : 0}
      />
    </instancedMesh>
  );
}

/** Warm light strips along the avenues — the accent that reads as a lit model. */
function Avenues({ tier }: { tier: DeviceTier }) {
  const strips = useMemo(() => {
    const out: { x: number; z: number; w: number; d: number }[] = [];
    for (let i = -1; i <= 1; i++) out.push({ x: i * 4.6, z: -1.2, w: 0.05, d: 9.5 });
    for (let j = -1; j <= 1; j++) out.push({ x: 0, z: j * 3.45 - 1.2, w: 17, d: 0.05 });
    return out;
  }, []);
  if (tier === "low") return null;
  return (
    <group>
      {strips.map((s, i) => (
        <mesh key={i} position={[s.x, 0.012, s.z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[s.w, s.d]} />
          <meshBasicMaterial color={GOLD} transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

function Ground({ tier }: { tier: DeviceTier }) {
  if (tier === "low") {
    return (
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#0C121B" roughness={0.35} metalness={0.5} />
      </mesh>
    );
  }
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[60, 60]} />
      <MeshReflectorMaterial
        resolution={tier === "high" ? 1024 : 512}
        mixBlur={1.1}
        mixStrength={26}
        blur={[260, 80]}
        depthScale={1.1}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.3}
        mirror={0.55}
        color="#0B111A"
        roughness={0.72}
        metalness={0.42}
      />
    </mesh>
  );
}

function Rig({ reduced, pointer }: {
  reduced: boolean;
  pointer: React.RefObject<{ x: number; y: number; tx: number; ty: number }>;
}) {
  const target = useMemo(() => new THREE.Vector3(0, 0.95, -1.8), []);
  useFrame(({ camera, clock }, delta) => {
    const p = pointer.current;
    if (p) {
      p.x += (p.tx - p.x) * Math.min(1, delta * 2.2);
      p.y += (p.ty - p.y) * Math.min(1, delta * 2.2);
    }
    const drift = reduced ? 0 : Math.sin(clock.elapsedTime * 0.1) * 0.9;
    camera.position.set(
      drift + (p?.x ?? 0) * 1.1,
      3.5 - (p?.y ?? 0) * 0.5,
      10.6
    );
    camera.lookAt(target);
  });
  return null;
}

export default function DioramaScene({
  tier,
  reduced,
  active,
  pointer,
}: {
  tier: DeviceTier;
  reduced: boolean;
  active: boolean;
  pointer: React.RefObject<{ x: number; y: number; tx: number; ty: number }>;
}) {
  const blocks = useMemo(() => buildCity(tier), [tier]);

  return (
    <Canvas
      frameloop={active ? "always" : "demand"}
      shadows={tier === "high"}
      dpr={tier === "high" ? [1, 1.8] : [1, 1.4]}
      gl={{ antialias: tier !== "low", alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 3.5, 10.6], fov: 26 }}
      style={{ background: "transparent" }}
    >
      {/* Soft overcast key, cool sky bounce, warm ground bounce */}
      <hemisphereLight args={["#B6D0EA", "#4A3E28", 2.9]} />
      <ambientLight intensity={1.05} color="#CFDCE9" />
      <directionalLight
        position={[5.5, 8, 4]}
        intensity={2.3}
        color="#FFF4DE"
        castShadow={tier === "high"}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
        shadow-bias={-0.0008}
      />
      <directionalLight position={[-6, 4, -5]} intensity={0.5} color="#6FA8D8" />

      <Ground tier={tier} />
      <Avenues tier={tier} />
      <Buildings blocks={blocks} kind={0} color={WARM_WHITE} tier={tier} />
      <Buildings blocks={blocks} kind={1} color={STONE} tier={tier} />
      <Buildings blocks={blocks} kind={2} color={SLATE} emissive={GOLD} tier={tier} />

      {/* Near plane must clear the model — the camera sits ~17 units out. */}
      <fog attach="fog" args={["#111A26", 30, 62]} />
      <Rig reduced={reduced} pointer={pointer} />
    </Canvas>
  );
}
