/**
 * Where the contact form posts (lib/contact-api.ts). This route hands the message to the
 * backend's `POST /contact`, which emails it to the support inbox, and adds the one thing
 * a browser can't: the key the backend insists on (CONTACT_FORM_SECRET, the same value
 * in the backend's environment). The key stays on this server, so the backend can only
 * be reached through this website. A plain rewrite in next.config.ts could not add it.
 *
 * Server-only environment, read on each request:
 *   BACKEND_API_URL      the backend, e.g. https://api.salah360.net
 *   CONTACT_FORM_SECRET  the shared key (`openssl rand -hex 32`)
 */

/** A message is at most 5,000 characters; this leaves room for Urdu text and the other fields. */
const MAX_BODY_BYTES = 32_000;

const BACKEND_TIMEOUT_MS = 15_000;

/** The outcomes the form tells apart (lib/contact-api.ts); anything else is "couldn't send". */
const PASSED_THROUGH = new Set([204, 400, 429]);

const empty = (status: number) => new Response(null, { status, headers: { 'Cache-Control': 'no-store' } });

/**
 * True when the request was made by a page of this very site. Browsers put the calling
 * page's origin on every POST and no web page can change it, so this stops other websites
 * from posting here through their visitors. It does not stop a script, which can type any
 * Origin it likes: against those, the backend's rate limits are what count.
 */
function isFromThisSite(request: Request): boolean {
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!isFromThisSite(request)) return empty(403);
  if (!request.headers.get('content-type')?.startsWith('application/json')) return empty(400);

  const apiUrl = process.env.BACKEND_API_URL?.replace(/\/+$/, '');
  const secret = process.env.CONTACT_FORM_SECRET;
  if (!apiUrl || !secret) {
    console.error('[contact] BACKEND_API_URL or CONTACT_FORM_SECRET is not set; the message was not sent');
    return empty(503);
  }

  const body = await request.text();
  if (new TextEncoder().encode(body).length > MAX_BODY_BYTES) return empty(400);

  try {
    const response = await fetch(`${apiUrl}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Contact-Key': secret },
      body,
      cache: 'no-store',
      signal: AbortSignal.timeout(BACKEND_TIMEOUT_MS),
    });
    if (PASSED_THROUGH.has(response.status)) return empty(response.status);
    console.error(`[contact] The backend answered ${response.status}`);
    return empty(503);
  } catch (error) {
    console.error('[contact] Could not reach the backend', error);
    return empty(503);
  }
}
