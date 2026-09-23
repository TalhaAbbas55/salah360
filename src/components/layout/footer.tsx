import { Mail } from 'lucide-react';
import Link from 'next/link';

import { Container } from '@/components/ui/container';
import { StarGlyph } from '@/components/ui/star-glyph';
import { getFooterLinks } from '@/content/navigation';
import { ctaLinks, SITE_COPY, siteConfig } from '@/lib/site-config';
import type { Lang } from '@/lib/i18n/lang';

import { Logo } from './logo';

const COPY: Record<
  Lang,
  { blurb: string; explore: string; footerNav: string; contact: string; founder: string; rights: string; care: string }
> = {
  en: {
    blurb:
      'Helping Muslims find Masjids, know prayer times and stay connected with their community — wherever they are.',
    explore: 'Explore',
    footerNav: 'Footer',
    contact: 'Contact',
    founder: 'Founder',
    rights: 'All rights reserved.',
    care: 'Built with care for the Muslim community.',
  },
  ur: {
    blurb: 'مسلمانوں کو مساجد تلاش کرنے، نماز کے اوقات جاننے اور اپنی کمیونٹی سے جڑے رہنے میں مدد — جہاں بھی ہوں۔',
    explore: 'براؤز کریں',
    footerNav: 'فوٹر',
    contact: 'رابطہ',
    founder: 'بانی',
    rights: 'جملہ حقوق محفوظ ہیں۔',
    care: 'مسلم کمیونٹی کے لیے خلوص کے ساتھ بنایا گیا۔',
  },
};

export function Footer({ lang }: { lang: Lang }) {
  const year = new Date().getFullYear();
  const copy = COPY[lang];
  const links = ctaLinks(lang);
  return (
    <footer className="relative border-t border-border bg-surface-muted/40">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Logo lang={lang} />
          <p className="mt-5 font-serif text-2xl italic text-foreground">{SITE_COPY[lang].tagline}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{copy.blurb}</p>
        </div>

        <nav aria-label={copy.footerNav}>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-subtle">{copy.explore}</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            {getFooterLinks(lang).map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-muted transition-colors hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-subtle">{copy.contact}</p>
          <a
            href={links.email}
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            <Mail className="size-4 text-primary" aria-hidden="true" />
            {siteConfig.supportEmail}
          </a>
          <p className="mt-6 text-sm text-muted">
            {copy.founder} <span className="text-foreground">{siteConfig.founder}</span>
          </p>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-subtle sm:flex-row">
          <p>
            © {year} {siteConfig.name}. {copy.rights}
          </p>
          <p className="inline-flex items-center gap-2">
            <StarGlyph className="size-2.5 text-gold" />
            {copy.care}
          </p>
        </Container>
      </div>
    </footer>
  );
}
