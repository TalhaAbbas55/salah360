import type { NextConfig } from "next";

/**
 * The Salah360 backend, e.g. https://api.salah360.net. Server-side only, read when the
 * site is built/started. Unset (local dev), the rewrite below is simply not added.
 */
const apiUrl = process.env.SALAH360_API_URL?.replace(/\/+$/, "");

const nextConfig: NextConfig = {
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
