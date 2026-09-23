import { ArrowLeft, ArrowRight, Check, ShieldCheck } from 'lucide-react';

import { ButtonLink } from '@/components/ui/button-link';
import { Container } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { SerifAccent } from '@/components/ui/serif-accent';
import { DashboardMockup } from '@/components/visuals/dashboard-mockup';
import { GeometricPattern } from '@/components/visuals/geometric-pattern';
import { getMasjidBenefits } from '@/content/masjids';
import type { Lang } from '@/lib/i18n/lang';

const COPY: Record<
  Lang,
  {
    eyebrow: string;
    title: React.ReactNode;
    description: string;
    comingSoon: string;
    howItWorks: string;
    verifiedLead: string;
    verifiedBody: string;
    dashboardCaption: string;
  }
> = {
  en: {
    eyebrow: 'For Masjids',
    title: (
      <>
        Give Your Masjid a <SerifAccent className="text-[#e2bd72]">Digital Home.</SerifAccent>
      </>
    ),
    description:
      'Salah360 helps Masjids create their online identity and stay connected with the people they serve — the regulars, the neighbours, and the travellers passing through.',
    comingSoon: 'Coming soon',
    howItWorks: 'How it works',
    verifiedLead: 'Every Masjid is verified.',
    verifiedBody:
      'Admins submit a photo and phone number, and the Salah360 team reviews each request before an admin can publish prayer times, events or alerts — so followers can trust what they see.',
    dashboardCaption: 'Useful for Muslims and Masjid Admins alike.',
  },
  ur: {
    eyebrow: 'مساجد کے لیے',
    title: (
      <>
        اپنی مسجد کو ایک <SerifAccent className="text-[#e2bd72]">ڈیجیٹل گھر</SerifAccent> دیں۔
      </>
    ),
    description:
      'Salah360 مساجد کو اپنی آن لائن شناخت بنانے اور ان لوگوں سے جڑے رہنے میں مدد دیتا ہے جن کی وہ خدمت کرتی ہیں — باقاعدہ نمازی، پڑوسی، اور گزرتے ہوئے مسافر۔',
    comingSoon: 'جلد آ رہا ہے',
    howItWorks: 'یہ کیسے کام کرتا ہے',
    verifiedLead: 'ہر مسجد تصدیق شدہ ہے۔',
    verifiedBody:
      'ایڈمنز ایک تصویر اور فون نمبر جمع کراتے ہیں، اور Salah360 ٹیم ہر درخواست کا جائزہ لیتی ہے اس سے پہلے کہ ایڈمن نماز کے اوقات، پروگرامز یا اطلاعات شائع کر سکے — تاکہ فالورز جو دیکھیں اس پر بھروسہ کر سکیں۔',
    dashboardCaption: 'مسلمانوں اور مسجد ایڈمنز دونوں کے لیے مفید۔',
  },
};

/** The Masjid Admin pitch, on the always-dark emerald band in both themes. */
export function ForMasjids({ lang }: { lang: Lang }) {
  const copy = COPY[lang];
  const HowItWorksIcon = lang === 'ur' ? ArrowLeft : ArrowRight;
  return (
    <section
      id="for-masjids"
      aria-labelledby="masjids-title"
      className="relative overflow-hidden bg-band py-24 text-band-foreground sm:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_85%_10%,#0e5c44_0%,transparent_60%),radial-gradient(50%_50%_at_0%_100%,rgb(214_174_98/0.1),transparent_70%)]" />
        <div className="absolute inset-0 text-white/[0.045] [--pattern:currentColor]">
          <GeometricPattern fade="top-right" size={64} />
        </div>
      </div>

      <Container className="relative">
        <div className="grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              id="masjids-title"
              onBand
              eyebrow={copy.eyebrow}
              title={copy.title}
              description={copy.description}
            />

            <ul className="mt-10 grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
              {getMasjidBenefits(lang).map((benefit, index) => (
                <li key={benefit.title}>
                  <Reveal delay={index * 0.04} className="flex items-start gap-3 text-[15px]">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#34d399]/15 text-[#6ee7b7]">
                      <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                    </span>
                    <span>
                      {benefit.title}
                      {benefit.comingSoon ? (
                        <span className="ms-2 whitespace-nowrap rounded-full bg-[#d6ae62]/15 px-2 py-0.5 text-[10px] font-medium text-[#e6c88a]">
                          {copy.comingSoon}
                        </span>
                      ) : null}
                    </span>
                  </Reveal>
                </li>
              ))}
            </ul>

            <Reveal delay={0.2} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#how-it-works" variant="on-band" size="lg">
                {copy.howItWorks}
                <HowItWorksIcon
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </ButtonLink>
            </Reveal>

            <Reveal
              delay={0.25}
              className="mt-8 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-band-muted"
            >
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-[#6ee7b7]" aria-hidden="true" />
              <p>
                <span className="font-medium text-band-foreground">{copy.verifiedLead}</span> {copy.verifiedBody}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1} y={28} className="lg:sticky lg:top-28">
            <DashboardMockup lang={lang} />
            <p className="mt-4 text-center text-xs text-band-muted">{copy.dashboardCaption}</p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
