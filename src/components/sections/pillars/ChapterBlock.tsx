'use client';

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export function ChapterBlock({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div data-chapter className={cn('relative px-5 py-[clamp(4rem,9vh,6.5rem)] lg:px-10', className)}>
      <div className="mx-auto w-full max-w-[1500px]">{children}</div>
    </div>
  );
}