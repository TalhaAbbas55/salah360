'use client';

import { useEffect, useRef } from 'react';

import { GLOBE_ARCS, GLOBE_PLACES } from '@/content/regions';
import { readGlobePalette } from '@/lib/globe/globe-palette';
import { createGlobeRenderer } from '@/lib/globe/globe-renderer';
import type { Lang } from '@/lib/i18n/lang';

const GLOBE_LABEL: Record<Lang, string> = {
  en: 'A slowly rotating globe with glowing Masjid markers connected across Pakistan, the Middle East, Europe, the Americas, Africa and Asia.',
  ur: 'ایک آہستہ گھومتا ہوا گلوب جس میں پاکستان، مشرقِ وسطیٰ، یورپ، امریکہ، افریقہ اور ایشیا میں چمکتے ہوئے مسجد کے نشانات آپس میں جڑے ہیں۔',
};

/** Start facing Pakistan and the Gulf; tilted so the northern hemisphere, where most arcs are, faces us. */
const START_SPIN = (-58 * Math.PI) / 180;
const SPIN_SPEED = 0.07; // radians per second: a full turn in about 90 seconds.
const DRAG_SENSITIVITY = 0.006;
const MAX_DPR = 2;

/**
 * Tilt and roll drift slowly around the base tilt, each on its own period, so the globe
 * gently tumbles in three dimensions instead of only spinning flat around the vertical axis.
 * Amplitudes are kept small — a wobble, not a somersault — to stay calm and premium.
 */
const TILT_BASE = 0.38;
const TILT_WOBBLE = 0.1;
const TILT_PERIOD_S = 17;
const ROLL_WOBBLE = 0.08;
const ROLL_PERIOD_S = 12;
const ROLL_PHASE = 1.7;

/** How far a drag can pitch the globe away from TILT_BASE, so it can't be dragged edge-on or upside down. */
const TILT_DRAG_RANGE = 0.95;
const FRICTION = 0.94;

/**
 * The hero globe. Canvas 2D instead of WebGL: a few thousand dots are cheap to draw, it works
 * on every phone, and it adds no 3D library to the bundle. It pauses while off-screen or in a
 * background tab, can be spun by dragging, and stays still when reduced motion is requested.
 */
export function Globe({ lang, className = '' }: { lang: Lang; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = createGlobeRenderer(canvas, {
      markers: GLOBE_PLACES,
      arcs: GLOBE_ARCS,
    });
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let palette = readGlobePalette();
    let spin = START_SPIN;
    let spinVelocity = 0;
    // Manual pitch, added on top of the automatic tilt wobble. Persists after a drag, the same
    // way spin keeps going from wherever the last drag left it — it only decays via momentum.
    let tiltOffset = 0;
    let tiltVelocity = 0;
    let time = 0;
    let landOpacity = 0;
    let landLoaded = false;
    let frame = 0;
    let lastTimestamp = 0;
    let onScreen = true;
    let dragging: {
      x: number;
      y: number;
      spin: number;
      tiltOffset: number;
      lastX: number;
      lastY: number;
      lastTime: number;
    } | null = null;
    let disposed = false;

    const clampTiltOffset = (value: number) => Math.min(TILT_DRAG_RANGE, Math.max(-TILT_DRAG_RANGE, value));

    const render = () =>
      renderer.draw(
        {
          spin,
          tilt: TILT_BASE + Math.sin((time / TILT_PERIOD_S) * Math.PI * 2) * TILT_WOBBLE + tiltOffset,
          roll: Math.sin((time / ROLL_PERIOD_S) * Math.PI * 2 + ROLL_PHASE) * ROLL_WOBBLE,
          time,
          landOpacity: reducedMotion.matches ? (landLoaded ? 1 : 0) : landOpacity,
        },
        palette,
      );

    const shouldAnimate = () =>
      onScreen &&
      !document.hidden &&
      (!reducedMotion.matches || dragging !== null || spinVelocity !== 0 || tiltVelocity !== 0);

    const tick = (timestamp: number) => {
      frame = 0;
      const delta = lastTimestamp ? Math.min((timestamp - lastTimestamp) / 1000, 0.05) : 0;
      lastTimestamp = timestamp;
      if (!reducedMotion.matches) time += delta;

      if (!dragging) {
        if (Math.abs(spinVelocity) > 0.0005) {
          spin += spinVelocity * delta * 60;
          spinVelocity *= FRICTION;
        } else {
          spinVelocity = 0;
          if (!reducedMotion.matches) spin += SPIN_SPEED * delta;
        }
        if (Math.abs(tiltVelocity) > 0.0005) {
          tiltOffset = clampTiltOffset(tiltOffset + tiltVelocity * delta * 60);
          tiltVelocity *= FRICTION;
        } else {
          tiltVelocity = 0;
        }
      }
      if (landLoaded && landOpacity < 1) landOpacity = Math.min(1, landOpacity + delta * 1.6);

      render();
      if (shouldAnimate()) frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (frame || !shouldAnimate()) return;
      lastTimestamp = 0;
      frame = requestAnimationFrame(tick);
    };

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      renderer.setSize(width, height, Math.min(window.devicePixelRatio || 1, MAX_DPR));
      render();
    };

    // Land data lives in its own chunk so it never delays the page's first paint.
    import('@/lib/geo/land-points').then(({ LAND_POINTS }) => {
      if (disposed) return;
      renderer.setLand(LAND_POINTS);
      landLoaded = true;
      render();
      start();
    });

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      start();
    });
    visibility.observe(canvas);

    const onVisibilityChange = () => start();
    document.addEventListener('visibilitychange', onVisibilityChange);

    // Follow theme switches (data-theme on <html>) and system theme changes.
    const refreshPalette = () => {
      palette = readGlobePalette();
      render();
    };
    const themeObserver = new MutationObserver(refreshPalette);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    reducedMotion.addEventListener('change', start);

    const onPointerDown = (event: PointerEvent) => {
      canvas.setPointerCapture(event.pointerId);
      dragging = {
        x: event.clientX,
        y: event.clientY,
        spin,
        tiltOffset,
        lastX: event.clientX,
        lastY: event.clientY,
        lastTime: event.timeStamp,
      };
      spinVelocity = 0;
      tiltVelocity = 0;
      start();
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      spin = dragging.spin + (event.clientX - dragging.x) * DRAG_SENSITIVITY;
      // Dragging down tilts the near side down (pulling the globe towards you), the way turning
      // a ball with a fingertip feels — so tiltOffset grows with downward movement.
      tiltOffset = clampTiltOffset(dragging.tiltOffset + (event.clientY - dragging.y) * DRAG_SENSITIVITY);
      const elapsed = Math.max(event.timeStamp - dragging.lastTime, 1);
      spinVelocity = (((event.clientX - dragging.lastX) * DRAG_SENSITIVITY) / elapsed) * 16;
      tiltVelocity = (((event.clientY - dragging.lastY) * DRAG_SENSITIVITY) / elapsed) * 16;
      dragging.lastX = event.clientX;
      dragging.lastY = event.clientY;
      dragging.lastTime = event.timeStamp;
      if (reducedMotion.matches) render();
    };
    const onPointerUp = () => {
      dragging = null;
      if (reducedMotion.matches) {
        spinVelocity = 0;
        tiltVelocity = 0;
      }
      start();
    };
    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerUp);

    resize();
    start();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibility.disconnect();
      themeObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      reducedMotion.removeEventListener('change', start);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={GLOBE_LABEL[lang]}
      className={`size-full cursor-grab touch-none active:cursor-grabbing ${className}`}
    />
  );
}
