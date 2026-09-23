import { Container } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { SerifAccent } from '@/components/ui/serif-accent';
import { NotificationStack } from '@/components/visuals/notification-stack';
import { getCommunityChannels } from '@/content/notifications';
import type { Lang } from '@/lib/i18n/lang';

const COPY: Record<Lang, { eyebrow: string; title: React.ReactNode; description: string }> = {
  en: {
    eyebrow: 'Community',
    title: (
      <>
        Hear from your Masjid <SerifAccent className="text-primary">the moment it matters.</SerifAccent>
      </>
    ),
    description:
      'Follow a Masjid and its updates come straight to your phone — the ones that affect your day, not a stream of noise.',
  },
  ur: {
    eyebrow: 'کمیونٹی',
    title: (
      <>
        اپنی مسجد کی خبر <SerifAccent className="text-primary">عین وقت پر پائیں۔</SerifAccent>
      </>
    ),
    description:
      'کسی مسجد کو فالو کریں اور اس کی اپڈیٹس سیدھا آپ کے فون تک پہنچیں — وہی جو آپ کے دن پر اثر ڈالیں، شور کا ایک سلسلہ نہیں۔',
  },
};

export function Community({ lang }: { lang: Lang }) {
  const copy = COPY[lang];
  return (
    <section
      aria-labelledby="community-title"
      className="relative border-t border-border bg-surface-muted/40 py-24 sm:py-32"
    >
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            id="community-title"
            eyebrow={copy.eyebrow}
            title={copy.title}
            description={copy.description}
          />
          <dl className="mt-10 divide-y divide-border border-y border-border">
            {getCommunityChannels(lang).map((channel, index) => (
              <Reveal
                key={channel.title}
                delay={index * 0.07}
                className="grid gap-1 py-5 sm:grid-cols-[180px_1fr] sm:gap-6"
              >
                <dt className="font-semibold tracking-[-0.01em]">{channel.title}</dt>
                <dd className="leading-relaxed text-muted">{channel.body}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
        <div className="mx-auto w-full max-w-[460px]">
          <NotificationStack lang={lang} />
        </div>
      </Container>
    </section>
  );
}
