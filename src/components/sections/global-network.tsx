import { Container } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { SerifAccent } from '@/components/ui/serif-accent';
import { WorldNetworkMap } from '@/components/visuals/world-network-map';
import { getNetworkRegions } from '@/content/regions';
import type { Lang } from '@/lib/i18n/lang';

const COPY: Record<Lang, { eyebrow: string; title: React.ReactNode; description: string }> = {
  en: {
    eyebrow: 'The vision',
    title: (
      <>
        Connecting Masjids <SerifAccent className="text-primary">Across the World.</SerifAccent>
      </>
    ),
    description:
      'Built with a vision to connect Masjids worldwide — from Lahore to London, Makkah to Toronto — so that wherever a Muslim stands, the nearest Jamaat is easy to find.',
  },
  ur: {
    eyebrow: 'ویژن',
    title: (
      <>
        دنیا بھر کی مساجد کو <SerifAccent className="text-primary">آپس میں جوڑتے ہوئے۔</SerifAccent>
      </>
    ),
    description:
      'دنیا بھر کی مساجد کو جوڑنے کے ویژن کے ساتھ بنایا گیا — لاہور سے لندن، مکہ سے ٹورنٹو تک — تاکہ جہاں بھی کوئی مسلمان کھڑا ہو، قریب ترین جماعت آسانی سے مل سکے۔',
  },
};

export function GlobalNetwork({ lang }: { lang: Lang }) {
  const copy = COPY[lang];
  return (
    <section aria-labelledby="network-title" className="relative overflow-hidden border-t border-border py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 size-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)] opacity-60"
      />
      <Container className="relative">
        <SectionHeading
          id="network-title"
          align="center"
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />
        <Reveal delay={0.1} className="mt-14 sm:mt-20">
          <WorldNetworkMap lang={lang} />
        </Reveal>
        <ul aria-hidden="true" className="mt-10 flex flex-wrap justify-center gap-2 md:hidden">
          {getNetworkRegions(lang).map((region) => (
            <li
              key={region.label}
              className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted"
            >
              {region.label}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
