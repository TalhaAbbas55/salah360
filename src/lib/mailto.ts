import { siteConfig } from './site-config';

/** A mailto: link to Salah360 support with the subject (and optionally body) filled in. */
export function supportMailto(subject: string, body?: string): string {
  const params = new URLSearchParams({ subject });
  if (body) params.set('body', body);
  // URLSearchParams encodes spaces as "+", which some mail apps show literally.
  return `mailto:${siteConfig.supportEmail}?${params.toString().replace(/\+/g, '%20')}`;
}
