import { type ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface EyebrowProps {
  children: ReactNode;
  className?: string;
  tone?: 'gold' | 'burgundy' | 'stone' | 'olive';
  numbered?: string;
  centered?: boolean;
}

export function Eyebrow({ children, className, tone = 'gold', numbered, centered }: EyebrowProps) {
  const toneClass = {
    gold: 'text-gold',
    burgundy: 'text-burgundy',
    stone: 'text-stone',
    olive: 'text-olive',
  }[tone];

  return (
    <div className={cn('flex items-center gap-3', centered && 'justify-center', className)}>
      {numbered && (
        <span className={cn('text-eyebrow font-sans tabular-nums', toneClass)}>
          {numbered}
        </span>
      )}
      <span className={cn('text-eyebrow font-sans uppercase tracking-widest', toneClass)}>
        {children}
      </span>
      {!centered && (
        <span className={cn('h-px w-8', tone === 'gold' ? 'bg-gold/40' : tone === 'burgundy' ? 'bg-burgundy/40' : 'bg-stone/40')} />
      )}
    </div>
  );
}
