"use client";
import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { APAC_MARKETS } from "@/lib/data";
import { latLngToVec3, greatCircle, fibonacciSphere, graticuleRing } from "@/lib/geo";
import type { DeviceTier } from "@/lib/useClient";

const R = 1;
const DATA = new THREE.Color("#38BDF8");
const GOLD = new THREE.Color("#C9A040");
const HUB = APAC_MARKETS.find((m) => m.hub)!;

/* ---------- point shell ----------
   Custom shader rather than PointsMaterial: it gives round points and a
   view-depth fade, so the far hemisphere reads as behind the near one. */

function PointShell({ count }: { count: number }) {
  const dpr = useThree((s) => s.viewport.dpr) || 1;

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(fibonacciSphere(count, R), 3));
    return g;
  }, [count]);

  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: {
          // uSize is in CSS pixels at the sphere's centre distance (~3 units).
          uSize: { value: 2.5 },
          uDpr: { value: 1 },
          uColor: { value: DATA.clone() },
          uOpacity: { value: 0.85 },
        },
        vertexShader: `
          uniform float uSize;
          uniform float uDpr;
          varying float vFade;
          void main() {
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            vFade = smoothstep(-2.4, 0.5, mv.z);
            gl_PointSize = uSize * uDpr * (3.0 / -mv.z);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          uniform float uOpacity;
          varying float vFade;
          void main() {
            vec2 c = gl_PointCoord - 0.5;
            float d = dot(c, c);
            if (d > 0.25) discard;
            float a = smoothstep(0.25, 0.04, d);
            gl_FragColor = vec4(uColor, a * uOpacity * mix(0.08, 1.0, vFade));
          }
        `,
      }),
    []
  );

  useMemo(() => {
    mat.uniforms.uDpr.value = dpr;
  }, [mat, dpr]);

  return <points geometry={geo} material={mat} frustumCulled={false} />;
}

/* ---------- graticule ---------- */

function Graticule() {
  const geo = useMemo(() => {
    const verts: number[] = [];
    const push = (pts: THREE.Vector3[]) => {
      for (let i = 0; i < pts.length - 1; i++) {
        verts.push(pts[i].x, pts[i].y, pts[i].z, pts[i + 1].x, pts[i + 1].y, pts[i + 1].z);
      }
    };
    [-60, -30, 0, 30, 60].forEach((lat) => push(graticuleRing("lat", lat, R * 1.001, 72)));
    for (let lng = -180; lng < 180; lng += 30) push(graticuleRing("lng", lng, R * 1.001, 72));
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    return g;
  }, []);
  return (
    <lineSegments geometry={geo} frustumCulled={false}>
      <lineBasicMaterial color="#1E9FD8" transparent opacity={0.085} depthWrite={false} />
    </lineSegments>
  );
}

/* ---------- atmosphere ----------
   Fresnel shell on the back faces: bright only at the rim, so the sphere reads
   as having volume and air around it rather than being a flat disc of dots. */

function Atmosphere() {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        uniforms: { uColor: { value: new THREE.Color("#38BDF8") } },
        vertexShader: `
          varying vec3 vN; varying vec3 vV;
          void main() {
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            vN = normalize(normalMatrix * normal);
            vV = normalize(-mv.xyz);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          varying vec3 vN; varying vec3 vV;
          void main() {
            float f = pow(1.0 - abs(dot(vN, vV)), 5.0);
            gl_FragColor = vec4(uColor, f * 0.85);
          }
        `,
      }),
    []
  );
  return (
    <mesh material={mat}>
      <sphereGeometry args={[R * 1.07, 64, 64]} />
    </mesh>
  );
}

/* ---------- market nodes ---------- */

function glowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.25, "rgba(255,255,255,0.55)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  t.needsUpdate = true;
  return t;
}

function Nodes() {
  const tex = useMemo(glowTexture, []);
  const hubRef = useRef<THREE.Sprite>(null);

  useFrame(({ clock }) => {
    if (!hubRef.current) return;
    const s = 0.3 + Math.sin(clock.elapsedTime * 1.9) * 0.05;
    hubRef.current.scale.setScalar(s);
  });

  return (
    <group>
      {APAC_MARKETS.map((m) => {
        const p = latLngToVec3(m.lat, m.lng, R * 1.012);
        const color = m.hub ? GOLD : DATA;
        return (
          <group key={m.code} position={p}>
            <mesh>
              <sphereGeometry args={[m.hub ? 0.027 : 0.017, 14, 14]} />
              <meshBasicMaterial color={color} />
            </mesh>
            <sprite ref={m.hub ? hubRef : undefined} scale={m.hub ? 0.3 : 0.17}>
              <spriteMaterial
                map={tex}
                color={color}
                transparent
                opacity={m.hub ? 0.9 : 0.62}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
              />
            </sprite>
          </group>
        );
      })}
    </group>
  );
}

/* ---------- connection arcs + travelling signals ---------- */

function Arcs({ tier }: { tier: DeviceTier }) {
  const curves = useMemo(
    () =>
      APAC_MARKETS.filter((m) => !m.hub).map((m) => ({
        code: m.code,
        pts: greatCircle(HUB, m, R * 1.01, tier === "low" ? 28 : 56),
      })),
    [tier]
  );

  const signalCurves = useMemo(
    () => curves.map((c) => new THREE.CatmullRomCurve3(c.pts)),
    [curves]
  );

  const tex = useMemo(glowTexture, []);
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    group.current.children.forEach((child, i) => {
      // Stagger each signal so they never pulse in lockstep.
      const u = (t * 0.16 + i * 0.137) % 1;
      const p = signalCurves[i].getPoint(u);
      child.position.copy(p);
      const fade = Math.sin(u * Math.PI);
      (child as THREE.Sprite).scale.setScalar(0.05 + fade * 0.045);
      ((child as THREE.Sprite).material as THREE.SpriteMaterial).opacity = fade * 0.9;
    });
  });

  return (
    <group>
      {curves.map((c) => (
        <Line
          key={c.code}
          points={c.pts}
          color="#38BDF8"
          lineWidth={tier === "high" ? 1.1 : 0.9}
          transparent
          opacity={0.34}
          depthWrite={false}
        />
      ))}
      <group ref={group}>
        {curves.map((c) => (
          <sprite key={`s-${c.code}`}>
            <spriteMaterial
              map={tex}
              color="#8FE3FF"
              transparent
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </sprite>
        ))}
      </group>
    </group>
  );
}

/* ---------- scene ---------- */

function Scene({
  tier,
  reduced,
  pointer,
}: {
  tier: DeviceTier;
  reduced: boolean;
  pointer: React.RefObject<{ x: number; y: number; tx: number; ty: number }>;
}) {
  const world = useRef<THREE.Group>(null);
  const count = tier === "high" ? 4200 : tier === "mid" ? 2600 : 1300;

  // Tilt so Asia Pacific faces the viewer: rotate the hub to screen centre.
  const baseY = useMemo(() => -((HUB.lng + 180) * Math.PI) / 180 - Math.PI / 2, []);

  useFrame((_, delta) => {
    if (!world.current) return;
    const p = pointer.current;
    if (p) {
      // Ease toward the pointer target — parallax, never a snap.
      p.x += (p.tx - p.x) * Math.min(1, delta * 2.6);
      p.y += (p.ty - p.y) * Math.min(1, delta * 2.6);
    }
    if (!reduced) world.current.rotation.y += delta * 0.035;
    const px = p?.x ?? 0;
    const py = p?.y ?? 0;
    world.current.rotation.x = 0.32 + py * 0.10;
    world.current.position.x = px * 0.10;
  });

  return (
    <group ref={world} rotation={[0.32, baseY, 0.12]}>
      <Atmosphere />
      <PointShell count={count} />
      <Graticule />
      <Arcs tier={tier} />
      <Nodes />
    </group>
  );
}

export default function NetworkGlobe({
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
  return (
    <Canvas
      // "demand" still paints one frame, so a paused scene reads as frozen, not blank.
      frameloop={active ? "always" : "demand"}
      dpr={tier === "high" ? [1, 2] : [1, 1.5]}
      gl={{ antialias: tier !== "low", alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 3.25], fov: 42 }}
      style={{ background: "transparent" }}
    >
      <Scene tier={tier} reduced={reduced} pointer={pointer} />
    </Canvas>
  );
}
