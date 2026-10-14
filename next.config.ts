import type { NextConfig } from "next";

/**
 * The Salah360 backend, e.g. https://api.salah360.net. Server-side only, read when the
 * site is built/started. Unset (local dev), the rewrite below is simply not added.
 */
const apiUrl = process.env.BACKEND_API_URL?.replace(/\/+$/, "");

const nextConfig: NextConfig = {
  experimental: {
    // Lets app/global-not-found.tsx render the 404 page; the two root layouts ((en) and (ur))
    // leave no single layout for a regular not-found.tsx.
    globalNotFound: true,
  },
  async headers() {
    return [
      // Baseline hardening for every page. Deliberately no Content-Security-Policy: it
      // would also land on the proxied /verify-admin page and could replace the stricter
      // one the backend sends there (and the inline theme/JSON-LD scripts need nonces first).
      {
        source: '/:path*',
        headers: [
          // No other site may frame these pages (clickjacking).
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // The site uses none of these; a compromised script couldn't either.
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      // The admin verification page (proxied below) carries a one-time token: keep it out
      // of search results even if a crawler finds the link. robots.ts also disallows it.
      { source: '/verify-admin', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
    ];
  },
  async rewrites() {
    if (!apiUrl) return [];
    return [
      // The WhatsApp masjid admin verification button opens
      // https://salah360.net/verify-admin?token=… (the URL is fixed in the approved
      // WhatsApp template). The backend renders that page, so proxy it there; the
      // ?token query string is passed through, and the page's Confirm form POSTs back to
      // this same URL, which is proxied the same way.
      {
        source: "/verify-admin",
        destination: `${apiUrl}/masjid-admin/verify/confirm`,
      },
    ];
  },
};

export default nextConfig;
