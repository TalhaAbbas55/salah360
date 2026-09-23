import type { ReactNode } from 'react';

import type { Lang } from '@/lib/i18n/lang';

export type LegalSection = { id: string; title: string; body: ReactNode };

const ON_THIS_PAGE: Record<Lang, string> = { en: 'On this page', ur: 'اس صفحے پر' };

/**
 * A long legal document: a sticky table of contents beside numbered sections on large
 * screens, and a plain list above the sections on smaller ones.
 */
export function LegalDocument({ lang, sections }: { lang: Lang; sections: readonly LegalSection[] }) {
  return (
    <div className="grid gap-12 lg:grid-cols-[240px_1fr] lg:gap-16">
      <nav aria-label={ON_THIS_PAGE[lang]} className="lg:sticky lg:top-8 lg:self-start">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-subtle">{ON_THIS_PAGE[lang]}</p>
        <ol className="mt-4 space-y-1 text-sm">
          {sections.map((section, index) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="flex gap-3 rounded-lg px-2 py-1.5 text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
              >
                <span className="w-5 shrink-0 tabular-nums text-subtle">{index + 1}.</span>
                {section.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="max-w-3xl">
        {sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-title`}
            className="border-b border-border py-10 first:pt-0 last:border-b-0"
          >
            <h2 id={`${section.id}-title`} className="flex gap-3 text-2xl font-semibold tracking-[-0.03em]">
              <span className="font-serif font-normal italic text-primary">{index + 1}.</span>
              {section.title}
            </h2>
            <div className="legal-prose mt-5">{section.body}</div>
          </section>
        ))}
      </div>
    </div>
  );
}
