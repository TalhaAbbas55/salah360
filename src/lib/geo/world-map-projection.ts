/**
 * Must match the bounds used for public/world-dots.svg in scripts/generate-geo-data.mjs,
 * so markers land on the right dots.
 */
export const WORLD_MAP_BOUNDS = { minLat: -56, maxLat: 76 } as const;

/** Equirectangular lat/lng → percentage position on the world-dots map. */
export function projectToMap(lat: number, lng: number): { x: number; y: number } {
  const { minLat, maxLat } = WORLD_MAP_BOUNDS;
  return {
    x: ((lng + 180) / 360) * 100,
    y: ((maxLat - lat) / (maxLat - minLat)) * 100,
  };
}

/** The map's width / height, for a matching aspect-ratio box. */
export const WORLD_MAP_ASPECT = 360 / (WORLD_MAP_BOUNDS.maxLat - WORLD_MAP_BOUNDS.minLat);
