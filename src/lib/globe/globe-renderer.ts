import { greatCircleArc, rotate, toVector, type Vec3 } from './globe-math';
import { rgba, type GlobePalette } from './globe-palette';

export type GlobeMarker = { lat: number; lng: number };

export type GlobeScene = {
  markers: readonly GlobeMarker[];
  /** Pairs of marker indexes to connect with an arc. */
  arcs: readonly (readonly [number, number])[];
};

export type GlobeView = {
  spin: number;
  tilt: number;
  /** Screen-plane rotation: the third axis that makes the globe tumble rather than just spin. */
  roll: number;
  /** Seconds, drives pulses and the dots travelling along arcs. */
  time: number;
  /** 0–1, fades the land dots in once their data has loaded. */
  landOpacity: number;
};

const ARC_SEGMENTS = 48;
const ARC_LIFT = 0.16;
const ARC_TRAVEL_SECONDS = 4.2;
/**
 * How front-facing a point must be to draw. Arcs lift well above the sphere's surface, so a
 * lenient cutoff near the horizon lets a lifted point's (x, y) land far from the sphere's rim
 * while barely counting as "visible" — a short stray-looking mark, disconnected from the rest
 * of the arc. Matching the markers' stricter cutoff keeps arcs confidently on the front side.
 */
const ARC_VISIBLE_Z = 0.05;
/** Drops a visible run this short: a horizon-grazing sliver, not a meaningful arc segment. */
const ARC_MIN_SEGMENT_POINTS = 4;

/**
 * Draws the dotted globe onto a 2D canvas: land dots, glowing Masjid markers and arcs with a
 * light travelling along them. Everything is pre-computed as unit vectors once, so a frame is
 * just rotate → project → draw, which stays smooth on phones.
 */
export function createGlobeRenderer(canvas: HTMLCanvasElement, scene: GlobeScene) {
  const context = canvas.getContext('2d', { alpha: true });
  const markerVectors = scene.markers.map((marker) => toVector(marker.lat, marker.lng));
  const arcPaths = scene.arcs.map(([from, to]) =>
    greatCircleArc(markerVectors[from], markerVectors[to], ARC_SEGMENTS, ARC_LIFT),
  );
  const scratch: Vec3 = [0, 0, 0];

  let land = new Float32Array(0);
  let width = 0;
  let height = 0;
  let pixelRatio = 1;

  function setLand(points: readonly number[]) {
    land = new Float32Array((points.length / 2) * 3);
    for (let i = 0, j = 0; i < points.length; i += 2, j += 3) {
      const [x, y, z] = toVector(points[i], points[i + 1]);
      land[j] = x;
      land[j + 1] = y;
      land[j + 2] = z;
    }
  }

  function setSize(cssWidth: number, cssHeight: number, dpr: number) {
    width = cssWidth;
    height = cssHeight;
    pixelRatio = dpr;
    canvas.width = Math.round(cssWidth * dpr);
    canvas.height = Math.round(cssHeight * dpr);
  }

  function draw(view: GlobeView, palette: GlobePalette) {
    if (!context || width === 0) return;
    const { spin, tilt, roll, time, landOpacity } = view;
    const radius = Math.min(width, height) * 0.42;
    const cx = width / 2;
    const cy = height / 2;

    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    context.clearRect(0, 0, width, height);

    // Atmosphere and sphere body.
    const halo = context.createRadialGradient(cx, cy, radius * 0.9, cx, cy, radius * 1.22);
    halo.addColorStop(0, rgba(palette.marker, 0.14));
    halo.addColorStop(1, rgba(palette.marker, 0));
    context.fillStyle = halo;
    context.beginPath();
    context.arc(cx, cy, radius * 1.22, 0, Math.PI * 2);
    context.fill();

    const body = context.createRadialGradient(cx - radius * 0.35, cy - radius * 0.4, radius * 0.1, cx, cy, radius);
    body.addColorStop(0, rgba(palette.marker, 0.1));
    body.addColorStop(1, rgba(palette.marker, 0.02));
    context.fillStyle = body;
    context.beginPath();
    context.arc(cx, cy, radius, 0, Math.PI * 2);
    context.fill();
    context.strokeStyle = rgba(palette.marker, 0.18);
    context.lineWidth = 1;
    context.stroke();

    // Land: one fill color, per-dot alpha for depth (cheaper than changing fillStyle per dot).
    if (landOpacity > 0) {
      context.fillStyle = rgba(palette.dot, 1);
      const dotSize = Math.max(1.3, radius / 140);
      for (let i = 0; i < land.length; i += 3) {
        rotate(land[i], land[i + 1], land[i + 2], spin, tilt, roll, scratch);
        const z = scratch[2];
        if (z <= 0.02) continue;
        context.globalAlpha = palette.dotAlpha * landOpacity * (0.18 + 0.82 * z);
        context.fillRect(
          cx + scratch[0] * radius - dotSize / 2,
          cy - scratch[1] * radius - dotSize / 2,
          dotSize,
          dotSize,
        );
      }
      context.globalAlpha = 1;
    }

    // Arcs, each with a light travelling from one Masjid to the other. Built as explicit
    // point runs (not one continuous path) so a run that barely peeks over the horizon can be
    // dropped outright, instead of drawing as a short stray mark near the rim.
    context.lineCap = 'round';
    context.strokeStyle = rgba(palette.accent, 0.38);
    context.lineWidth = 1.1;
    arcPaths.forEach((path, arcIndex) => {
      let run: { x: number; y: number }[] = [];
      const flushRun = () => {
        if (run.length >= ARC_MIN_SEGMENT_POINTS) {
          context.beginPath();
          run.forEach((point, i) => (i === 0 ? context.moveTo(point.x, point.y) : context.lineTo(point.x, point.y)));
          context.stroke();
        }
        run = [];
      };
      for (const point of path) {
        rotate(point[0], point[1], point[2], spin, tilt, roll, scratch);
        if (scratch[2] > ARC_VISIBLE_Z) run.push({ x: cx + scratch[0] * radius, y: cy - scratch[1] * radius });
        else flushRun();
      }
      flushRun();

      const progress = (time / ARC_TRAVEL_SECONDS + arcIndex * 0.37) % 1;
      const head = path[Math.floor(progress * ARC_SEGMENTS)];
      rotate(head[0], head[1], head[2], spin, tilt, roll, scratch);
      if (scratch[2] > ARC_VISIBLE_Z) {
        const fade = Math.sin(progress * Math.PI);
        context.fillStyle = rgba(palette.accent, 0.9 * fade);
        context.beginPath();
        context.arc(cx + scratch[0] * radius, cy - scratch[1] * radius, 1.8, 0, Math.PI * 2);
        context.fill();
      }
    });

    // Masjid markers: soft glow, pulse ring and a solid core, all fading towards the rim.
    markerVectors.forEach((vector, index) => {
      rotate(vector[0], vector[1], vector[2], spin, tilt, roll, scratch);
      const z = scratch[2];
      if (z <= 0.05) return;
      const x = cx + scratch[0] * radius;
      const y = cy - scratch[1] * radius;
      const depth = Math.min(1, z * 1.4);

      const glow = context.createRadialGradient(x, y, 0, x, y, 12);
      glow.addColorStop(0, rgba(palette.marker, 0.45 * depth));
      glow.addColorStop(1, rgba(palette.marker, 0));
      context.fillStyle = glow;
      context.beginPath();
      context.arc(x, y, 12, 0, Math.PI * 2);
      context.fill();

      const pulse = (time * 0.45 + index * 0.23) % 1;
      context.strokeStyle = rgba(palette.marker, (1 - pulse) * 0.55 * depth);
      context.lineWidth = 1;
      context.beginPath();
      context.arc(x, y, 3 + pulse * 11, 0, Math.PI * 2);
      context.stroke();

      context.fillStyle = rgba(palette.marker, depth);
      context.beginPath();
      context.arc(x, y, 2.6, 0, Math.PI * 2);
      context.fill();
      context.fillStyle = `rgb(255 255 255 / ${0.9 * depth})`;
      context.beginPath();
      context.arc(x, y, 1.1, 0, Math.PI * 2);
      context.fill();
    });
  }

  return { setLand, setSize, draw };
}

export type GlobeRenderer = ReturnType<typeof createGlobeRenderer>;
