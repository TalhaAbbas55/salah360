import { SimplePage } from '@/components/layout/simple-page';
import type { Lang } from '@/lib/i18n/lang';
import { ctaLinks, siteConfig } from '@/lib/site-config';

const COPY: Record<Lang, { eyebrow: string; title: string; body: string; contactLead: string }> = {
  en: {
    eyebrow: 'Legal',
    title: 'Terms of Use',
    body: 'Salah360’s terms of use are being prepared and will be published here before the public launch.',
    contactLead: 'For any questions, please write to',
  },
  ur: {
    eyebrow: 'قانونی',
    title: 'شرائطِ استعمال',
    body: 'Salah360 کی شرائطِ استعمال تیار کی جا رہی ہیں اور عوامی لانچ سے پہلے یہاں شائع کر دی جائیں گی۔',
    contactLead: 'کسی بھی سوال کے لیے، براہِ کرم لکھیں',
  },
};

export function TermsPageContent({ lang }: { lang: Lang }) {
  const copy = COPY[lang];
  const links = ctaLinks(lang);
  return (
    <SimplePage lang={lang} eyebrow={copy.eyebrow} title={copy.title}>
      <div className="legal-prose max-w-2xl">
        <p>{copy.body}</p>
        <p>
          {copy.contactLead} <a href={links.email}>{siteConfig.supportEmail}</a>.
        </p>
      </div>
    </SimplePage>
  );
}
