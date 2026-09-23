/** Pure sphere math for the hero globe. No DOM, so it's easy to reason about and test. */

export type Vec3 = [number, number, number];

const DEG = Math.PI / 180;

/** Unit vector for a lat/lng: y points to the north pole, z towards the viewer at lng 0. */
export function toVector(lat: number, lng: number): Vec3 {
  const phi = lat * DEG;
  const lambda = lng * DEG;
  return [Math.cos(phi) * Math.sin(lambda), Math.sin(phi), Math.cos(phi) * Math.cos(lambda)];
}

/**
 * Spins around the polar axis, tilts towards the viewer, then rolls in the screen plane.
 * Three axes rather than one is what makes the globe read as a physical object tumbling in
 * space, instead of a flat disc spinning left-to-right. Writes into `out` to avoid allocations.
 */
export function rotate(x: number, y: number, z: number, spin: number, tilt: number, roll: number, out: Vec3): Vec3 {
  const cs = Math.cos(spin);
  const ss = Math.sin(spin);
  const x1 = x * cs + z * ss;
  const z1 = -x * ss + z * cs;
  const ct = Math.cos(tilt);
  const st = Math.sin(tilt);
  const y2 = y * ct - z1 * st;
  const z2 = y * st + z1 * ct;
  const cr = Math.cos(roll);
  const sr = Math.sin(roll);
  out[0] = x1 * cr - y2 * sr;
  out[1] = x1 * sr + y2 * cr;
  out[2] = z2;
  return out;
}

/**
 * Points along the great circle between two unit vectors, lifted off the surface in the middle
 * so the arc reads as a flight path rather than a line painted on the globe.
 */
export function greatCircleArc(a: Vec3, b: Vec3, segments: number, lift: number): Vec3[] {
  const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const omega = Math.acos(dot);
  const sinOmega = Math.sin(omega) || 1;
  const points: Vec3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const wa = Math.sin((1 - t) * omega) / sinOmega;
    const wb = Math.sin(t * omega) / sinOmega;
    const height = 1 + Math.sin(t * Math.PI) * lift * omega;
    points.push([(a[0] * wa + b[0] * wb) * height, (a[1] * wa + b[1] * wb) * height, (a[2] * wa + b[2] * wb) * height]);
  }
  return points;
}
