/** Globe colors come from CSS tokens (globals.css) so the canvas follows the site theme. */
export type GlobePalette = {
  dot: string;
  dotAlpha: number;
  marker: string;
  accent: string;
};

function channel(styles: CSSStyleDeclaration, name: string, fallback: string): string {
  return styles.getPropertyValue(name).trim() || fallback;
}

export function readGlobePalette(): GlobePalette {
  const styles = getComputedStyle(document.documentElement);
  return {
    dot: channel(styles, '--globe-dot', '4 120 87'),
    dotAlpha: Number.parseFloat(channel(styles, '--globe-dot-alpha', '0.5')) || 0.5,
    marker: channel(styles, '--globe-marker', '4 120 87'),
    accent: channel(styles, '--globe-accent', '168 124 48'),
  };
}

/** `rgb(r g b / a)` from a space-separated channel token. */
export function rgba(channels: string, alpha: number): string {
  return `rgb(${channels} / ${alpha})`;
}
