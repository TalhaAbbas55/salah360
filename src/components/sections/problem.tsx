import { Container } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { SerifAccent } from '@/components/ui/serif-accent';
import { getProblems } from '@/content/problems';
import type { Lang } from '@/lib/i18n/lang';

/** First three cards take a third of the row, the last two take half, on large screens. */
const SPANS = ['lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-3', 'lg:col-span-3'];

const COPY: Record<Lang, { eyebrow: string; title: React.ReactNode; description: string }> = {
  en: {
    eyebrow: 'The problem',
    title: (
      <>
        Finding a Masjid <SerifAccent>Shouldn’t</SerifAccent> Be Difficult.
      </>
    ),
    description: 'Everyday moments where the information you need is scattered, outdated or simply out of reach.',
  },
  ur: {
    eyebrow: 'مسئلہ',
    title: (
      <>
        مسجد تلاش کرنا <SerifAccent>مشکل</SerifAccent> نہیں ہونا چاہیے۔
      </>
    ),
    description: 'روزمرہ کے وہ لمحات جہاں آپ کو درکار معلومات بکھری ہوئی، پرانی، یا محض دسترس سے باہر ہوتی ہیں۔',
  },
};

export function Problem({ lang }: { lang: Lang }) {
  const copy = COPY[lang];
  const problems = getProblems(lang);
  return (
    <section
      aria-labelledby="problem-title"
      className="relative border-t border-border bg-surface-muted/40 py-24 sm:py-32"
    >
      <Container>
        <SectionHeading id="problem-title" eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {problems.map(({ icon: Icon, label, title, body }, index) => (
            <li key={label} className={`${SPANS[index]} ${index === 4 ? 'sm:col-span-2 lg:col-span-3' : ''}`}>
              <Reveal delay={index * 0.06} className="h-full">
                <article className="group relative h-full overflow-hidden rounded-3xl border border-border bg-surface p-7 transition-[border-color,transform,box-shadow] duration-300 card-shadow hover:-translate-y-1 hover:border-primary/35 sm:p-8">
                  <div
                    aria-hidden="true"
                    className="absolute -right-12 -top-12 size-40 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-2xl bg-primary-soft text-primary-ink transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="text-xs font-medium uppercase tracking-[0.14em] text-subtle">{label}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em]">{title}</h3>
                  <p className="mt-2.5 leading-relaxed text-muted">{body}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
