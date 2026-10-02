import { ArrowLeft, ArrowRight, BookOpen, Building2, Check, MapPin, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

import { Container } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { SerifAccent } from '@/components/ui/serif-accent';
import { GeometricPattern } from '@/components/visuals/geometric-pattern';
import type { Lang } from '@/lib/i18n/lang';
import { ctaLinks } from '@/lib/site-config';

type CardKey = 'features' | 'forMasjids' | 'about';

type CardCopy = { label: string; title: React.ReactNode; body: string; points: readonly string[]; link: string };

const CARD_KEYS: readonly CardKey[] = ['features', 'forMasjids', 'about'];

const CARD_ICONS: Record<CardKey, LucideIcon> = { features: MapPin, forMasjids: Building2, about: BookOpen };

/**
 * How each card is drawn. The For Masjids card is the featured one: it sits on the
 * always-dark emerald band, like the For Masjids page it leads to, and carries that page's
 * headline. The band's colors are the same in both themes, so it needs no dark variant.
 */
const CARD_STYLES = {
  plain: {
    card: 'border-border bg-surface card-shadow hover:border-primary/35',
    icon: 'bg-primary-soft text-primary-ink group-hover:bg-primary group-hover:text-primary-foreground',
    label: 'text-subtle',
    title: 'text-xl tracking-[-0.02em]',
    body: 'text-muted',
    check: 'bg-primary-soft text-primary-ink',
    link: 'text-primary',
  },
  band: {
    card: 'border-[#e2bd72]/30 bg-band text-band-foreground card-shadow-lg hover:border-[#e2bd72]/70',
    icon: 'bg-white/10 text-[#6ee7b7] group-hover:bg-[#e2bd72] group-hover:text-band',
    label: 'text-[#7fd8b3]',
    title: 'text-[1.75rem] leading-[1.12] tracking-[-0.035em]',
    body: 'text-band-muted',
    check: 'bg-[#34d399]/15 text-[#6ee7b7]',
    link: 'text-[#e2bd72]',
  },
} as const;

const COPY: Record<
  Lang,
  { eyebrow: string; title: React.ReactNode; description: string; cards: Record<CardKey, CardCopy> }
> = {
  en: {
    eyebrow: 'What Salah360 is for',
    title: (
      <>
        One app that keeps you <SerifAccent className="text-primary">close to your Masjid.</SerifAccent>
      </>
    ),
    description:
      'Salah360 shows you the Masjids around you and the Azan and Jamaat times each one publishes, and tells you when something changes. Masjids use the same app to keep their community informed.',
    cards: {
      features: {
        label: 'For Muslims',
        title: 'Find a Masjid and its Jamaat times',
        body: 'See the Masjids near you on a map, check today’s Azan and Jamaat times, and follow the ones you pray at.',
        points: [
          'Nearby Masjids, up to 20 km away',
          'Times published by the Masjid itself',
          'Alerts for time changes, events and Janazah',
        ],
        link: 'See all features',
      },
      forMasjids: {
        label: 'For Masjids',
        // The For Masjids page's own headline (sections/for-masjids.tsx): keep the two the same.
        title: (
          <>
            Give Your Masjid a <SerifAccent className="text-[#e2bd72]">Digital Home.</SerifAccent>
          </>
        ),
        body: 'A verified profile where you publish prayer times, events and Janazah alerts that reach your followers straight away.',
        points: [
          'Verify over WhatsApp, or with a photo',
          'Publish Azan and Jamaat times',
          'Send events and Janazah alerts to followers',
        ],
        link: 'How Masjids join',
      },
      about: {
        label: 'About',
        title: 'Why Salah360 exists',
        body: 'It began with Jamaats missed in unfamiliar places. Read the story and the vision behind the app.',
        points: [
          'The problem it solves',
          'How it brings everything into one place',
          'The vision: Masjids connected worldwide',
        ],
        link: 'Read our story',
      },
    },
  },
  ur: {
    eyebrow: 'Salah360 کس لیے ہے',
    title: (
      <>
        ایک ایپ جو آپ کو <SerifAccent className="text-primary">اپنی مسجد سے جوڑے رکھے۔</SerifAccent>
      </>
    ),
    description:
      'Salah360 آپ کو آس پاس کی مساجد اور ہر مسجد کے اپنے شائع کردہ اذان اور جماعت کے اوقات دکھاتا ہے، اور کوئی تبدیلی ہو تو آپ کو اطلاع دیتا ہے۔ مساجد اسی ایپ سے اپنی کمیونٹی کو باخبر رکھتی ہیں۔',
    cards: {
      features: {
        label: 'مسلمانوں کے لیے',
        title: 'مسجد اور اس کی جماعت کے اوقات تلاش کریں',
        body: 'اپنے قریب کی مساجد نقشے پر دیکھیں، آج کے اذان اور جماعت کے اوقات معلوم کریں، اور جن مساجد میں آپ نماز پڑھتے ہیں انہیں فالو کریں۔',
        points: [
          'قریبی مساجد، 20 کلومیٹر دور تک',
          'اوقات جو مسجد خود شائع کرتی ہے',
          'اوقات کی تبدیلی، پروگرامز اور نمازِ جنازہ کی اطلاعات',
        ],
        link: 'تمام خصوصیات دیکھیں',
      },
      forMasjids: {
        label: 'مساجد کے لیے',
        title: (
          <>
            اپنی مسجد کو ایک <SerifAccent className="text-[#e2bd72]">ڈیجیٹل گھر</SerifAccent> دیں۔
          </>
        ),
        body: 'ایک تصدیق شدہ پروفائل، جہاں سے آپ نماز کے اوقات، پروگرامز اور نمازِ جنازہ کی اطلاعات شائع کریں جو فوراً آپ کے فالورز تک پہنچیں۔',
        points: [
          'واٹس ایپ سے، یا تصویر بھیج کر تصدیق',
          'اذان اور جماعت کے اوقات شائع کریں',
          'فالورز کو پروگرامز اور نمازِ جنازہ کی اطلاعات بھیجیں',
        ],
        link: 'مساجد کیسے شامل ہوتی ہیں',
      },
      about: {
        label: 'تعارف',
        title: 'Salah360 کیوں بنایا گیا',
        body: 'آغاز اجنبی جگہوں پر چھوٹ جانے والی جماعتوں سے ہوا۔ ایپ کے پیچھے کی کہانی اور ویژن پڑھیں۔',
        points: [
          'وہ مسئلہ جو یہ حل کرتا ہے',
          'یہ سب کچھ ایک جگہ کیسے لاتا ہے',
          'ویژن: دنیا بھر کی مساجد آپس میں جڑی ہوئی',
        ],
        link: 'ہماری کہانی پڑھیں',
      },
    },
  },
};

/**
 * The home page's second and last section: what the app is for, in one statement, and a
 * card into each of the pages that go into detail (Features, For Masjids, About).
 */
export function Purpose({ lang }: { lang: Lang }) {
  const copy = COPY[lang];
  const links = ctaLinks(lang);
  const LinkArrow = lang === 'ur' ? ArrowLeft : ArrowRight;
  return (
    <section id="purpose" aria-labelledby="purpose-title" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          id="purpose-title"
          align="center"
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />

        <ul className="mt-14 grid gap-4 lg:grid-cols-3">
          {CARD_KEYS.map((key, index) => {
            const card = copy.cards[key];
            const Icon = CARD_ICONS[key];
            const featured = key === 'forMasjids';
            const style = CARD_STYLES[featured ? 'band' : 'plain'];
            return (
              <li key={key}>
                <Reveal delay={index * 0.08} className="h-full">
                  <article
                    className={`group relative isolate flex h-full flex-col overflow-hidden rounded-3xl border p-7 transition-[border-color,transform] duration-300 hover:-translate-y-1 sm:p-8 ${style.card}`}
                  >
                    {featured ? (
                      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
                        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_100%_0%,#0e5c44_0%,transparent_65%),radial-gradient(70%_50%_at_0%_100%,rgb(214_174_98/0.12),transparent_70%)]" />
                        <div className="absolute inset-0 text-white/[0.06] [--pattern:currentColor]">
                          <GeometricPattern fade="top-right" size={48} />
                        </div>
                      </div>
                    ) : null}
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex size-11 items-center justify-center rounded-2xl transition-colors duration-300 ${style.icon}`}
                      >
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className={`text-xs font-medium uppercase tracking-[0.14em] ${style.label}`}>
                        {card.label}
                      </span>
                    </div>
                    <h3 className={`mt-6 text-balance font-semibold ${style.title}`}>
                      {/* The link's ::after covers the card, so the whole card is clickable. */}
                      <Link href={links[key]} className="after:absolute after:inset-0 after:rounded-3xl">
                        {card.title}
                      </Link>
                    </h3>
                    <p className={`mt-2.5 leading-relaxed ${style.body}`}>{card.body}</p>
                    <ul className="mt-6 space-y-2.5 text-[15px]">
                      {card.points.map((point) => (
                        <li key={point} className="flex items-start gap-3">
                          <span
                            className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${style.check}`}
                          >
                            <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                          </span>
                          {point}
                        </li>
                      ))}
                    </ul>
                    <p
                      aria-hidden="true"
                      className={`mt-auto inline-flex items-center gap-2 pt-8 text-sm font-medium ${style.link}`}
                    >
                      {card.link}
                      <LinkArrow className="size-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                    </p>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
