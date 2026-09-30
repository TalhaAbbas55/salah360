/**
 * Renders the Salah360 app icon (src/app/icon.svg, the brand mark on its Masjid Green tile)
 * to the PNGs that need a raster file at a stable URL:
 *   - public/icon-192.png, public/icon-512.png  web app manifest icons (rounded tile)
 *   - public/icon-maskable-512.png              Android adaptive icon: full-bleed, mark in the safe zone
 *   - public/logo.png                           the Organization logo in structured data (Google Search)
 *   - src/app/favicon.ico                       the favicon browsers and Google Search show next to the
 *                                               site name (Google wants a multiple of 48px, so 48/96/192 are in it)
 *
 * Run after changing the mark: `node scripts/generate-icons.mjs`
 * (uses sharp, which Next.js already installs for image optimisation).
 */
import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

/** The rounded tile, as drawn in icon.svg (1024×1024, mark in <g id="mark">). */
const tile = await readFile(new URL('../src/app/icon.svg', import.meta.url), 'utf8');
const [MARK] = tile.match(/<g id="mark"[\s\S]*?<\/g>/) ?? [];
if (!MARK) throw new Error('src/app/icon.svg has no <g id="mark">');
const GREEN = '#1F4A3F';

/** Square, full-bleed background; the mark shrunk to 80% so launcher masks never crop it. */
const maskable = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><rect width="1024" height="1024" fill="${GREEN}"/><g transform="translate(102.4 102.4) scale(.8)">${MARK}</g></svg>`;

/** Google shows logos on a white background, so the logo is the tile on white with a margin. */
const logo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-100 -100 1224 1224"><rect x="-100" y="-100" width="1224" height="1224" fill="#fff"/>${tile.replace(/^<svg[^>]*>|<\/svg>\s*$/g, '')}</svg>`;

function toPng(svg, size) {
  // The drawings are 1024 units wide: 144 dpi renders them at ~2048px, then they're downsized.
  return sharp(Buffer.from(svg), { density: 144 }).resize(size, size).png({ compressionLevel: 9 }).toBuffer();
}

async function render(svg, size, file) {
  const png = await toPng(svg, size);
  await writeFile(new URL(`../public/${file}`, import.meta.url), png);
  console.log(`public/${file}  ${size}×${size}  ${(png.length / 1024).toFixed(1)} KB`);
}

/** An .ico holding one PNG per size (PNG-in-ICO, supported by every current browser and Google). */
async function renderIco(svg, sizes, file) {
  const pngs = await Promise.all(sizes.map((size) => toPng(svg, size)));
  const header = Buffer.alloc(6 + 16 * sizes.length);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(sizes.length, 4);
  let offset = header.length;
  sizes.forEach((size, i) => {
    const entry = 6 + 16 * i;
    header.writeUInt8(size >= 256 ? 0 : size, entry); // width (0 means 256)
    header.writeUInt8(size >= 256 ? 0 : size, entry + 1); // height
    header.writeUInt16LE(1, entry + 4); // color planes
    header.writeUInt16LE(32, entry + 6); // bits per pixel
    header.writeUInt32LE(pngs[i].length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += pngs[i].length;
  });
  const ico = Buffer.concat([header, ...pngs]);
  await writeFile(new URL(`../${file}`, import.meta.url), ico);
  console.log(`${file}  ${sizes.join('/')}px  ${(ico.length / 1024).toFixed(1)} KB`);
}

await render(tile, 192, 'icon-192.png');
await render(tile, 512, 'icon-512.png');
await render(maskable, 512, 'icon-maskable-512.png');
await render(logo, 512, 'logo.png');
await renderIco(tile, [16, 32, 48, 96, 192], 'src/app/favicon.ico');
