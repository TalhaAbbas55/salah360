import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { Container } from '@/components/ui/container';
import { StarGlyph } from '@/components/ui/star-glyph';
import { GeometricPattern } from '@/components/visuals/geometric-pattern';
import { localizePath, type Lang } from '@/lib/i18n/lang';

import { Footer } from './footer';
import { LanguageMenu } from './language-menu';
import { Logo } from './logo';
import { ScrollTopButton } from './scroll-top-button';
import { ThemeToggle } from './theme-toggle';

const BACK_TO_HOME: Record<Lang, string> = { en: 'Back to home', ur: 'ہوم پیج پر واپس' };

type SimplePageProps = {
  lang: Lang;
  eyebrow: string;
  title: string;
  description?: ReactNode;
  /** Small line under the description, e.g. "Last updated …". */
  meta?: ReactNode;
  children: ReactNode;
};

/** Shell for secondary pages (Privacy, Contact, Terms): slim header, page intro, content, footer. */
export function SimplePage({ lang, eyebrow, title, description, meta, children }: SimplePageProps) {
  const BackIcon = lang === 'ur' ? ArrowRight : ArrowLeft;
  return (
    <>
      <header className="border-b border-border">
        <Container className="flex h-20 items-center justify-between gap-3">
          <Logo lang={lang} />
          <div className="flex items-center gap-1">
            <Link
              href={localizePath('/', lang)}
              aria-label={BACK_TO_HOME[lang]}
              className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
            >
              <BackIcon className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline" aria-hidden="true">
                {BACK_TO_HOME[lang]}
              </span>
            </Link>
            <div className="ms-1 flex items-center gap-0.5 border-s border-border ps-2">
              <LanguageMenu lang={lang} />
              <ThemeToggle lang={lang} />
            </div>
          </div>
        </Container>
      </header>
      <main id="main">
        <div className="relative overflow-hidden border-b border-border">
          <GeometricPattern fade="top-right" size={60} />
          <Container className="relative py-16 sm:py-24">
            <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-primary">
              <StarGlyph className="size-2.5 opacity-80" />
              {eyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">{title}</h1>
            {description ? (
              <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted">{description}</p>
            ) : null}
            {meta ? <p className="mt-6 text-sm text-subtle">{meta}</p> : null}
          </Container>
        </div>
        <Container className="py-14 sm:py-20">{children}</Container>
      </main>
      <Footer lang={lang} />
      <ScrollTopButton lang={lang} />
    </>
  );
}
