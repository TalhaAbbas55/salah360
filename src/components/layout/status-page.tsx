import type { ReactNode } from 'react';

import { Container } from '@/components/ui/container';
import { StarGlyph } from '@/components/ui/star-glyph';
import { GeometricPattern } from '@/components/visuals/geometric-pattern';
import type { Lang } from '@/lib/i18n/lang';

import { Footer } from './footer';
import { Logo } from './logo';
import { ThemeToggle } from './theme-toggle';

type StatusPageProps = {
  lang: Lang;
  /** The big number behind the heading, e.g. "404". */
  code: string;
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  /** The call-to-action row under the description. */
  actions: ReactNode;
  /** Optional small print under the actions, e.g. a link to the other language. */
  note?: ReactNode;
};

/**
 * Shell for the 404 and error pages: slim header, a centred message over the star lattice,
 * then the usual footer. No language menu here, since it would link to the same missing path
 * in the other language.
 */
export function StatusPage({ lang, code, eyebrow, title, description, actions, note }: StatusPageProps) {
  return (
    <>
      <header className="border-b border-border">
        <Container className="flex h-20 items-center justify-between gap-3">
          <Logo lang={lang} />
          <ThemeToggle lang={lang} />
        </Container>
      </header>
      <main id="main" className="relative overflow-hidden">
        <GeometricPattern fade="center" size={60} />
        <Container className="relative flex min-h-[70dvh] flex-col items-center justify-center py-20 text-center sm:py-28">
          <p
            aria-hidden="true"
            className="select-none bg-gradient-to-b from-primary/25 to-transparent bg-clip-text font-serif text-[clamp(7rem,28vw,15rem)] leading-none italic text-transparent"
          >
            {code}
          </p>
          <p className="-mt-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-primary sm:-mt-10">
            <StarGlyph className="size-2.5 opacity-80" />
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-2xl text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted">{description}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">{actions}</div>
          {note ? <p className="mt-8 text-sm text-subtle">{note}</p> : null}
        </Container>
      </main>
      <Footer lang={lang} />
    </>
  );
}
