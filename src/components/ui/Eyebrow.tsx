import { type ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface EyebrowProps {
  children: ReactNode;
  className?: string;
  /** accent: small red label; muted: quiet grey label; light: for the bone chapter. */
  tone?: 'accent' | 'muted' | 'light';
  numbered?: string;
  centered?: boolean;
}

const TONES = {
  accent: 'text-accent',
  muted: 'text-ash',
  light: 'text-umber',
};

/** Small uppercase label for cards and inline metadata. Section openers use ChapterMarker. */
export function Eyebrow({ children, className, tone = 'accent', numbered, centered }: EyebrowProps) {
  const toneClass = TONES[tone];

  return (
    <div className={cn('flex items-center gap-3', centered && 'justify-center', className)}>
      {numbered && <span className="text-eyebrow font-sans font-semibold tabular-nums text-accent">{numbered}</span>}
      <span className={cn('text-eyebrow font-sans uppercase tracking-widest', toneClass)}>{children}</span>
    </div>
  );
}
