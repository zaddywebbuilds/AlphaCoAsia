import * as THREE from "three";

const DEG = Math.PI / 180;

/** Lat/long to a point on a sphere of the given radius. */
export function latLngToVec3(lat: number, lng: number, radius = 1) {
  const phi = (90 - lat) * DEG;
  const theta = (lng + 180) * DEG;
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

/** Great-circle arc between two lat/long pairs, lifted off the surface so the
 *  path reads as a connection rather than a scratch on the sphere. Arc height
 *  scales with angular distance, the way flight-path maps do. */
export function greatCircle(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
  radius = 1,
  segments = 48
) {
  const start = latLngToVec3(a.lat, a.lng, radius);
  const end = latLngToVec3(b.lat, b.lng, radius);
  const angle = start.angleTo(end);
  const lift = radius * (0.06 + angle * 0.16);

  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const p = new THREE.Vector3().copy(start).lerp(end, t);
    // Re-project onto the sphere, then raise by a sine profile.
    p.normalize().multiplyScalar(radius + Math.sin(t * Math.PI) * lift);
    pts.push(p);
  }
  return pts;
}

/** Evenly distributed points on a sphere (Fibonacci lattice).
 *  Used for the globe's point-cloud shell — uniform, no polar clumping. */
export function fibonacciSphere(count: number, radius = 1) {
  const pts = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const th = golden * i;
    pts[i * 3] = Math.cos(th) * r * radius;
    pts[i * 3 + 1] = y * radius;
    pts[i * 3 + 2] = Math.sin(th) * r * radius;
  }
  return pts;
}

/** A latitude or longitude ring, for the graticule. */
export function graticuleRing(
  kind: "lat" | "lng",
  value: number,
  radius = 1,
  segments = 96
) {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * 360 - 180;
    pts.push(kind === "lat" ? latLngToVec3(value, t, radius) : latLngToVec3(t / 2, value, radius));
  }
  return pts;
}

/** APAC viewport used by the flat network plane. */
export const APAC_BOUNDS = { lngMin: 93, lngMax: 125, latMin: -10, latMax: 28 };

/** Equirectangular projection into a normalised -1..1 plane.
 *  Truthful relative positions without needing coastline geometry. */
export function projectAPAC(lat: number, lng: number) {
  const { lngMin, lngMax, latMin, latMax } = APAC_BOUNDS;
  return {
    x: ((lng - lngMin) / (lngMax - lngMin)) * 2 - 1,
    y: ((lat - latMin) / (latMax - latMin)) * 2 - 1,
  };
}
