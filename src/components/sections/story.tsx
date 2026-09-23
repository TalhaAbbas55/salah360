import { Container } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { SerifAccent } from '@/components/ui/serif-accent';
import { ARCH_PATH } from '@/components/visuals/arch';
import { GeometricPattern } from '@/components/visuals/geometric-pattern';
import { MasjidSilhouette } from '@/components/visuals/masjid-silhouette';
import type { Lang } from '@/lib/i18n/lang';
import { siteConfig } from '@/lib/site-config';

const ARCH_MASK = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 120' preserveAspectRatio='none'><path d='${ARCH_PATH}'/></svg>`,
)}") center / 100% 100% no-repeat`;

type StoryCopy = {
  quote: string;
  eyebrow: string;
  title: React.ReactNode;
  paragraphs: readonly [string, string, string];
  builtBy: string;
  founderRole: string;
};

const COPY: Record<Lang, StoryCopy> = {
  en: {
    quote: '“Finding a nearby Masjid and its prayer schedule shouldn’t be difficult.”',
    eyebrow: 'Why Salah360 exists',
    title: (
      <>
        It Started With a <SerifAccent className="text-primary">Simple</SerifAccent> Problem.
      </>
    ),
    paragraphs: [
      'There were times when I missed Salah with Jamaat simply because I didn’t know where the nearest Masjid was, or what time the prayer was being held.',
      'While traveling or visiting an unfamiliar place, finding a nearby Masjid and its prayer schedule shouldn’t be difficult.',
      'Salah360 was created to make that experience simple — helping people find their Masjid, stay connected with it, and never miss the opportunity to pray with Jamaat.',
    ],
    builtBy: `Built by ${siteConfig.founder}`,
    founderRole: 'Founder, Salah360',
  },
  ur: {
    quote: '"قریبی مسجد اور اس کا نماز کا شیڈول تلاش کرنا مشکل نہیں ہونا چاہیے۔"',
    eyebrow: 'Salah360 کیوں بنایا گیا',
    title: (
      <>
        ایک <SerifAccent className="text-primary">سادہ</SerifAccent> مسئلے سے شروعات ہوئی۔
      </>
    ),
    paragraphs: [
      'کئی بار ایسا ہوا کہ میں صرف اس لیے جماعت کے ساتھ نماز نہ پڑھ سکا کیونکہ مجھے معلوم نہیں تھا کہ قریب ترین مسجد کہاں ہے، یا نماز کس وقت ہو رہی ہے۔',
      'سفر کے دوران یا کسی اجنبی جگہ پر، قریبی مسجد اور اس کا نماز کا شیڈول تلاش کرنا مشکل نہیں ہونا چاہیے۔',
      'Salah360 اسی تجربے کو آسان بنانے کے لیے بنایا گیا — لوگوں کو ان کی مسجد تلاش کرنے، اس سے جڑے رہنے، اور جماعت کے ساتھ نماز پڑھنے کا موقع کبھی نہ کھونے میں مدد دینے کے لیے۔',
    ],
    builtBy: siteConfig.founder,
    founderRole: 'بانی، Salah360',
  },
};

/** Why Salah360 exists, in the founder's words. Anchor for "About". */
export function Story({ lang }: { lang: Lang }) {
  const copy = COPY[lang];
  return (
    <section id="about" aria-labelledby="story-title" className="relative py-24 sm:py-32">
      <Container className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal className="relative mx-auto w-full max-w-[400px] lg:max-w-none">
          <div
            className="relative aspect-[5/6] overflow-hidden bg-band text-band-foreground"
            style={{ mask: ARCH_MASK, WebkitMask: ARCH_MASK }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,#0d5a42_0%,transparent_60%)]" />
            <div className="absolute inset-0 text-[rgb(255_255_255/0.06)] [--pattern:currentColor]">
              <GeometricPattern fade="top" size={44} />
            </div>
            <div className="absolute inset-x-0 top-[28%] px-10 text-center sm:px-14">
              <p className="font-serif text-[1.65rem] italic leading-[1.25] text-band-foreground sm:text-[1.9rem]">
                {copy.quote}
              </p>
            </div>
            <MasjidSilhouette className="absolute inset-x-[12%] bottom-0 text-[#0a3d2e] [&_.text-background]:text-band" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-band-deep/80 to-transparent" />
          </div>
          <div
            aria-hidden="true"
            className="absolute -inset-3 -z-10 rounded-[50%_50%_1.5rem_1.5rem/40%_40%_1.5rem_1.5rem] bg-[radial-gradient(closest-side,var(--glow),transparent)] blur-2xl"
          />
        </Reveal>

        <div>
          <SectionHeading id="story-title" eyebrow={copy.eyebrow} title={copy.title} />
          <Reveal delay={0.1} className="mt-8 space-y-5 text-pretty text-[17px] leading-[1.75] text-muted">
            <p>{copy.paragraphs[0]}</p>
            <p>{copy.paragraphs[1]}</p>
            <p className="text-foreground">{copy.paragraphs[2]}</p>
          </Reveal>
          <Reveal delay={0.2} className="mt-10 flex items-center gap-4 border-t border-border pt-7">
            <span
              aria-hidden="true"
              className="flex size-12 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold tracking-wide text-primary-ink"
            >
              TA
            </span>
            <span>
              <span className="block font-medium">{copy.builtBy}</span>
              <span className="block text-sm text-subtle">{copy.founderRole}</span>
            </span>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
