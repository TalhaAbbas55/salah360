import { Container } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { SerifAccent } from '@/components/ui/serif-accent';
import { EcosystemOrbit } from '@/components/visuals/ecosystem-orbit';
import { getSolutionPillars } from '@/content/ecosystem';
import type { Lang } from '@/lib/i18n/lang';

const COPY: Record<Lang, { eyebrow: string; title: React.ReactNode; description: string }> = {
  en: {
    eyebrow: 'The solution',
    title: (
      <>
        One Place to Stay Connected With Your <SerifAccent className="text-primary">Masjid.</SerifAccent>
      </>
    ),
    description:
      'Salah360 brings Masjid discovery, prayer times, notifications and community information together — so the details that help you reach Jamaat are always in one place.',
  },
  ur: {
    eyebrow: 'حل',
    title: (
      <>
        اپنی <SerifAccent className="text-primary">مسجد</SerifAccent> سے جڑے رہنے کی ایک جگہ۔
      </>
    ),
    description:
      'Salah360 مسجد کی تلاش، نماز کے اوقات، اطلاعات اور کمیونٹی کی معلومات کو ایک جگہ اکٹھا کرتا ہے — تاکہ جماعت تک پہنچنے میں مدد دینے والی ہر تفصیل ہمیشہ ایک ہی جگہ ہو۔',
  },
};

export function Solution({ lang }: { lang: Lang }) {
  const copy = COPY[lang];
  const pillars = getSolutionPillars(lang);
  return (
    <section aria-labelledby="solution-title" className="relative overflow-hidden py-24 sm:py-32">
      <Container className="grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
        <div>
          <SectionHeading
            id="solution-title"
            eyebrow={copy.eyebrow}
            title={copy.title}
            description={copy.description}
          />
          <ol className="mt-10 space-y-3">
            {pillars.map((pillar, index) => (
              <li key={pillar.title}>
                <Reveal
                  delay={0.08 * index}
                  className="flex gap-5 rounded-2xl border border-transparent p-4 transition-colors hover:border-border hover:bg-surface"
                >
                  <span className="w-8 shrink-0 font-serif text-2xl italic leading-none text-gold">0{index + 1}</span>
                  <span>
                    <span className="block font-semibold tracking-[-0.01em]">{pillar.title}</span>
                    <span className="mt-1 block leading-relaxed text-muted">{pillar.body}</span>
                  </span>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
        <Reveal delay={0.1}>
          <EcosystemOrbit lang={lang} />
        </Reveal>
      </Container>
    </section>
  );
}
