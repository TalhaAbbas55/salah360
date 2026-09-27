/**
 * Renders the Salah360 mark (the same paths as src/app/icon.svg) to the PNGs that need a
 * raster file at a stable URL:
 *   - public/icon-192.png, public/icon-512.png  web app manifest icons (rounded tile)
 *   - public/icon-maskable-512.png              Android adaptive icon: full-bleed, mark in the safe zone
 *   - public/logo.png                           the Organization logo in structured data (Google Search)
 *
 * Run after changing the mark: `node scripts/generate-icons.mjs`
 * (uses sharp, which Next.js already installs for image optimisation).
 */
import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const GRADIENT =
  '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0a8a64"/><stop offset="1" stop-color="#04513b"/></linearGradient></defs>';
const MARK =
  '<circle cx="20" cy="21" r="12.5" fill="none" stroke="#fff" stroke-opacity=".28" stroke-width="1.4"/>' +
  '<circle cx="28.84" cy="12.16" r="2.1" fill="#e2bd72"/>' +
  '<path d="M13.6 29.5V21.2c0-3.9 2.7-6.5 6.4-9 3.7 2.5 6.4 5.1 6.4 9v8.3z" fill="#fff"/>' +
  '<path d="M17.7 29.5v-4.6c0-1.5 1-2.6 2.3-3.4 1.3.8 2.3 1.9 2.3 3.4v4.6z" fill="#05634a"/>';

/** The rounded tile from icon.svg. */
const tile = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">${GRADIENT}<rect width="40" height="40" rx="11" fill="url(#g)"/>${MARK}</svg>`;

/** Square, full-bleed background; the mark shrunk to 70% so launcher masks never crop it. */
const maskable = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">${GRADIENT}<rect width="40" height="40" fill="url(#g)"/><g transform="translate(6 6) scale(.7)">${MARK}</g></svg>`;

/** Google shows logos on a white background, so the logo is the tile on white with a margin. */
const logo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 48 48"><rect x="-4" y="-4" width="48" height="48" fill="#fff"/>${GRADIENT}<rect width="40" height="40" rx="11" fill="url(#g)"/>${MARK}</svg>`;

async function render(svg, size, file) {
  const png = await sharp(Buffer.from(svg), { density: 1200 }).resize(size, size).png({ compressionLevel: 9 }).toBuffer();
  await writeFile(new URL(`../public/${file}`, import.meta.url), png);
  console.log(`public/${file}  ${size}×${size}  ${(png.length / 1024).toFixed(1)} KB`);
}

await render(tile, 192, 'icon-192.png');
await render(tile, 512, 'icon-512.png');
await render(maskable, 512, 'icon-maskable-512.png');
await render(logo, 512, 'logo.png');
