import { ArrowUpRight, Mail } from 'lucide-react';
import Link from 'next/link';

import { ContactForm } from '@/components/contact/contact-form';
import { SimplePage } from '@/components/layout/simple-page';
import { getContactTopics } from '@/content/contact';
import { localizePath, type Lang } from '@/lib/i18n/lang';
import { supportMailto } from '@/lib/mailto';
import { ctaLinks, siteConfig } from '@/lib/site-config';

const COPY: Record<
  Lang,
  {
    eyebrow: string;
    title: string;
    description: string;
    emailLabel: string;
    replyNote: string;
    howCanWeHelp: string;
    deletionNote: string;
    privacyLead: string;
    privacyLink: string;
  }
> = {
  en: {
    eyebrow: 'Contact',
    title: 'Contact Us',
    description:
      'Whether you’re looking for a Masjid, running one, or spotted something we should fix — we’d love to hear from you.',
    emailLabel: 'Email',
    replyNote: 'We read every message and reply as soon as we can, in shā’ Allāh.',
    howCanWeHelp: 'How can we help?',
    deletionNote:
      "To delete your account and your data, select “Privacy, your account & deletion” below and send us your request.",
    privacyLead: 'For how we handle your information, see our',
    privacyLink: 'Privacy Policy',
  },
  ur: {
    eyebrow: 'رابطہ',
    title: 'ہم سے رابطہ کریں',
    description:
      'چاہے آپ مسجد تلاش کر رہے ہوں، مسجد چلا رہے ہوں، یا کوئی ایسی چیز نظر آئی ہو جسے ہمیں ٹھیک کرنا چاہیے — ہم آپ سے سننا پسند کریں گے۔',
    emailLabel: 'ای میل',
    replyNote: 'ہم ہر پیغام پڑھتے ہیں اور جتنی جلدی ممکن ہو جواب دیتے ہیں، اِن شاء اللہ۔',
    howCanWeHelp: 'ہم کیسے مدد کر سکتے ہیں؟',
    deletionNote:
      'اپنا اکاؤنٹ اور ڈیٹا حذف کروانے کے لیے، نیچے "رازداری، آپ کا اکاؤنٹ اور حذف کرنا" منتخب کریں اور ہمیں اپنی درخواست بھیجیں۔',
    privacyLead: 'ہم آپ کی معلومات کیسے سنبھالتے ہیں، اس کے لیے دیکھیں ہماری',
    privacyLink: 'رازداری کی پالیسی',
  },
};

export function ContactPageContent({ lang, topic }: { lang: Lang; topic?: string }) {
  const copy = COPY[lang];
  const links = ctaLinks(lang);
  return (
    <SimplePage lang={lang} eyebrow={copy.eyebrow} title={copy.title} description={copy.description}>
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div>
          <a
            href={links.email}
            className="group flex items-center gap-4 rounded-[28px] border border-border bg-primary-soft/60 p-6 transition-colors hover:border-primary/40"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Mail className="size-5" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-medium uppercase tracking-[0.14em] text-subtle">
                {copy.emailLabel}
              </span>
              <span className="block truncate text-lg font-semibold tracking-[-0.02em] text-foreground">
                {siteConfig.supportEmail}
              </span>
            </span>
          </a>
          <p className="mt-4 px-2 text-sm leading-relaxed text-muted">{copy.replyNote}</p>

          <h2 className="mt-10 text-xs font-medium uppercase tracking-[0.14em] text-subtle">{copy.howCanWeHelp}</h2>
          <p className="mt-2 px-2 text-sm leading-relaxed text-muted">{copy.deletionNote}</p>
          <ul className="mt-4 space-y-3">
            {getContactTopics(lang).map(({ id, icon: Icon, title, body, subject }) => (
              <li key={id}>
                <a
                  href={supportMailto(subject)}
                  className="group flex gap-4 rounded-2xl border border-border bg-surface p-4 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-primary/35"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface-muted text-primary">
                    <Icon className="size-[18px]" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2 font-semibold tracking-[-0.01em]">
                      {title}
                      <ArrowUpRight
                        className="size-4 shrink-0 text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary rtl:group-hover:-translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted">{body}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 px-2 text-sm text-muted">
            {copy.privacyLead}{' '}
            <Link
              href={localizePath('/privacy', lang)}
              className="font-medium text-primary underline underline-offset-4"
            >
              {copy.privacyLink}
            </Link>
            .
          </p>
        </div>

        <div className="lg:pt-0">
          <ContactForm lang={lang} initialTopic={topic} />
        </div>
      </div>
    </SimplePage>
  );
}
