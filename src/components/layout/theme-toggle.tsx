'use client';

import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/components/providers/theme-provider';
import type { Lang } from '@/lib/i18n/lang';

const LABEL: Record<Lang, (next: 'light' | 'dark') => string> = {
  en: (next) => `Switch to ${next} theme`,
  ur: (next) => (next === 'dark' ? 'تاریک تھیم پر جائیں' : 'روشن تھیم پر جائیں'),
};

export function ThemeToggle({ lang }: { lang: Lang }) {
  const { resolved, setPreference } = useTheme();
  const next = resolved === 'dark' ? 'light' : 'dark';
  return (
    <button
      type="button"
      onClick={() => setPreference(next)}
      aria-label={LABEL[lang](next)}
      className="relative inline-flex size-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
    >
      <Sun
        className="size-[18px] rotate-0 scale-100 transition-transform duration-300 dark:-rotate-90 dark:scale-0"
        aria-hidden="true"
      />
      <Moon
        className="absolute size-[18px] rotate-90 scale-0 transition-transform duration-300 dark:rotate-0 dark:scale-100"
        aria-hidden="true"
      />
    </button>
  );
}
