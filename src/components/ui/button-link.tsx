import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'on-band' | 'on-band-outline';
type Size = 'md' | 'lg';

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-primary text-primary-foreground shadow-[0_8px_24px_-8px_var(--glow),inset_0_1px_0_rgb(255_255_255/0.18)] hover:bg-primary-strong dark:hover:bg-primary-strong',
  secondary: 'border border-border-strong bg-surface text-foreground hover:border-primary/50 hover:bg-surface-muted',
  ghost: 'text-foreground hover:bg-surface-muted',
  'on-band': 'bg-band-foreground text-band hover:bg-white',
  'on-band-outline': 'border border-white/20 text-band-foreground hover:border-white/40 hover:bg-white/5',
};

const SIZES: Record<Size, string> = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-[15px] sm:h-13 sm:px-7',
};

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, 'className'> & {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

/** Every call to action is a link (anchors, mailto), so this is the site's only "button" style. */
export function ButtonLink({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonLinkProps) {
  return (
    <Link
      {...props}
      className={`group inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[-0.01em] transition-[background-color,border-color,transform,box-shadow] duration-200 active:scale-[0.98] ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
    >
      {children}
    </Link>
  );
}
