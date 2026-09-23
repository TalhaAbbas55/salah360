'use client';

import { m, type HTMLMotionProps } from 'motion/react';
import type { ReactNode } from 'react';

type RevealProps = Omit<HTMLMotionProps<'div'>, 'children'> & {
  children: ReactNode;
  delay?: number;
  /** Vertical distance to travel, in px. */
  y?: number;
};

const EASE = [0.22, 1, 0.36, 1] as const;

/** Fades content up once it scrolls into view. Server-rendered children pass straight through. */
export function Reveal({ children, delay = 0, y = 18, ...props }: RevealProps) {
  return (
    <m.div
      data-reveal
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      {...props}
    >
      {children}
    </m.div>
  );
}
