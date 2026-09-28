'use client';

import { RotateCw } from 'lucide-react';
import { useEffect } from 'react';

import { StatusPage } from '@/components/layout/status-page';
import { ButtonLink } from '@/components/ui/button-link';
import { localizePath, type Lang } from '@/lib/i18n/lang';

const COPY: Record<
  Lang,
  { eyebrow: string; title: string; description: string; retry: string; home: string }
> = {
  en: {
    eyebrow: 'Something went wrong',
    title: 'This page didn’t load properly.',
    description: 'Please try again in a moment. If it keeps happening, head back home and let us know.',
    retry: 'Try again',
    home: 'Back to home',
  },
  ur: {
    eyebrow: 'کچھ غلط ہو گیا',
    title: 'یہ صفحہ ٹھیک سے لوڈ نہیں ہوا۔',
    description: 'براہِ کرم کچھ دیر بعد دوبارہ کوشش کریں۔ اگر مسئلہ برقرار رہے تو ہوم پیج پر واپس جائیں اور ہمیں بتائیں۔',
    retry: 'دوبارہ کوشش کریں',
    home: 'ہوم پیج پر واپس',
  },
};

/** The error boundary UI for both language trees (see `app/(en)/error.tsx`, `app/(ur)/error.tsx`). */
export function ErrorPageContent({
  lang,
  error,
  retry,
}: {
  lang: Lang;
  error: Error & { digest?: string };
  retry: () => void;
}) {
  const copy = COPY[lang];
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <StatusPage
      lang={lang}
      code="500"
      eyebrow={copy.eyebrow}
      title={copy.title}
      description={copy.description}
      actions={
        <>
          <button
            type="button"
            onClick={retry}
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-[15px] font-medium tracking-[-0.01em] text-primary-foreground shadow-[0_8px_24px_-8px_var(--glow),inset_0_1px_0_rgb(255_255_255/0.18)] transition-[background-color,transform] duration-200 hover:bg-primary-strong active:scale-[0.98] sm:h-13 sm:px-7"
          >
            <RotateCw className="size-4 transition-transform group-hover:rotate-45" aria-hidden="true" />
            {copy.retry}
          </button>
          <ButtonLink href={localizePath('/', lang)} variant="secondary" size="lg">
            {copy.home}
          </ButtonLink>
        </>
      }
    />
  );
}
