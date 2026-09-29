import { siteConfig } from '@/lib/site-config';

/**
 * Digital Asset Links: proves to Android that this site and the Salah360 app belong
 * together, so shared https://www.salah360.net/masjid|events|janazah/… links open the
 * app directly (the app's intent filters use autoVerify).
 *
 * ANDROID_CERT_SHA256: the SHA-256 fingerprint(s) of the app's signing certificate,
 * comma-separated. With Play App Signing, take it from Play Console → Test and release →
 * App integrity → App signing key certificate (add the EAS upload key's too for internal
 * builds: `eas credentials`). Unset, the list is empty and links simply open this site.
 */
export function GET() {
  const fingerprints = (process.env.ANDROID_CERT_SHA256 ?? '')
    .split(',')
    .map((value) => value.trim().toUpperCase())
    .filter((value) => /^([0-9A-F]{2}:){31}[0-9A-F]{2}$/.test(value));

  const statements = fingerprints.length
    ? [
        {
          relation: ['delegate_permission/common.handle_all_urls'],
          target: { namespace: 'android_app', package_name: siteConfig.androidPackage, sha256_cert_fingerprints: fingerprints },
        },
      ]
    : [];

  return Response.json(statements, { headers: { 'Cache-Control': 'public, max-age=3600' } });
}
