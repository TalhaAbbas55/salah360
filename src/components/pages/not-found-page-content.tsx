import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { StatusPage } from '@/components/layout/status-page';
import { ButtonLink } from '@/components/ui/button-link';
import { SerifAccent } from '@/components/ui/serif-accent';
import { localizePath, type Lang } from '@/lib/i18n/lang';
import { ctaLinks } from '@/lib/site-config';

const COPY: Record<
  Lang,
  { eyebrow: string; title: React.ReactNode; description: string; home: string; contact: string }
> = {
  en: {
    eyebrow: 'Page not found',
    title: (
      <>
        This path doesn&rsquo;t lead to a <SerifAccent className="text-primary">Masjid.</SerifAccent>
      </>
    ),
    description:
      'The page you were looking for has moved or never existed. Head back home to find nearby Masjids and Jamaat times.',
    home: 'Back to home',
    contact: 'Contact us',
  },
  ur: {
    eyebrow: 'صفحہ نہیں ملا',
    title: (
      <>
        یہ راستہ کسی <SerifAccent className="text-primary">مسجد</SerifAccent> تک نہیں جاتا۔
      </>
    ),
    description:
      'آپ جو صفحہ تلاش کر رہے تھے وہ منتقل ہو چکا ہے یا موجود ہی نہیں۔ قریبی مساجد اور جماعت کے اوقات کے لیے ہوم پیج پر واپس جائیں۔',
    home: 'ہوم پیج پر واپس',
    contact: 'ہم سے رابطہ کریں',
  },
};

const OTHER_LANGUAGE: Record<Lang, { lang: Lang; label: string }> = {
  en: { lang: 'ur', label: 'اردو ہوم پیج' },
  ur: { lang: 'en', label: 'English home page' },
};

/** The 404 page (see `app/global-not-found.tsx`). */
export function NotFoundPageContent({ lang }: { lang: Lang }) {
  const copy = COPY[lang];
  const other = OTHER_LANGUAGE[lang];
  const HomeIcon = lang === 'ur' ? ArrowRight : ArrowLeft;
  return (
    <StatusPage
      lang={lang}
      code="404"
      eyebrow={copy.eyebrow}
      title={copy.title}
      description={copy.description}
      actions={
        <>
          <ButtonLink href={localizePath('/', lang)} size="lg">
            <HomeIcon className="size-4 transition-transform group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5" aria-hidden="true" />
            {copy.home}
          </ButtonLink>
          <ButtonLink href={ctaLinks(lang).contactPage} variant="secondary" size="lg">
            {copy.contact}
          </ButtonLink>
        </>
      }
      note={
        <Link
          href={localizePath('/', other.lang)}
          lang={other.lang}
          className="underline decoration-border-strong underline-offset-4 transition-colors hover:text-foreground"
        >
          {other.label}
        </Link>
      }
    />
  );
}
