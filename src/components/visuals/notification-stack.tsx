import { LogoMark } from '@/components/layout/logo';
import { Reveal } from '@/components/ui/reveal';
import { getSampleNotifications, type SampleNotification } from '@/content/notifications';
import type { Lang } from '@/lib/i18n/lang';

import { GeometricPattern } from './geometric-pattern';

const TONES: Record<SampleNotification['tone'], string> = {
  primary: 'bg-primary text-primary-foreground',
  gold: 'bg-gold-soft text-gold',
  // Janazah: deliberately quiet — no alarm colors.
  calm: 'bg-surface-muted text-muted',
};

const WEEKDAY: Record<Lang, string> = { en: 'Friday', ur: 'جمعہ' };

/** Lock-screen style notifications, as a follower would receive them. */
export function NotificationStack({ lang }: { lang: Lang }) {
  return (
    <div className="relative overflow-hidden rounded-[32px] bg-band p-4 sm:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_20%_0%,#0f6a4d,transparent_65%),radial-gradient(60%_50%_at_100%_100%,rgb(214_174_98/0.18),transparent)]" />
      <div className="absolute inset-0 text-white/[0.05] [--pattern:currentColor]">
        <GeometricPattern fade="none" size={48} />
      </div>
      <div aria-hidden="true" className="relative pb-6 pt-4 text-center text-band-foreground">
        <p className="text-sm font-medium text-band-muted">{WEEKDAY[lang]}</p>
        <p className="text-6xl font-semibold tracking-[-0.05em] tabular-nums sm:text-7xl">1:24</p>
      </div>
      <ul className="relative space-y-3">
        {getSampleNotifications(lang).map((notification, index) => {
          const Icon = notification.icon;
          return (
            <li key={notification.kind}>
              <Reveal delay={0.15 + index * 0.18} y={24}>
                <article className="rounded-[22px] border border-white/10 bg-surface/90 p-4 backdrop-blur-xl card-shadow-lg">
                  <div className="flex items-center gap-2 text-[11px] text-subtle">
                    <LogoMark className="size-4" />
                    <span className="font-medium uppercase tracking-[0.08em]">Salah360</span>
                    <span aria-hidden="true">·</span>
                    <span>{notification.kind}</span>
                    <span className="ms-auto">{notification.time}</span>
                  </div>
                  <div className="mt-2.5 flex gap-3">
                    <span
                      className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${TONES[notification.tone]}`}
                    >
                      <Icon className="size-[18px]" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-[15px] font-semibold tracking-[-0.01em]">{notification.title}</h3>
                      <p className="mt-0.5 text-sm leading-snug text-muted">{notification.body}</p>
                      <p className="mt-1.5 text-xs text-subtle">{notification.masjid}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
