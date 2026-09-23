import { type ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface EyebrowProps {
  children: ReactNode;
  className?: string;
  tone?: 'gold' | 'burgundy' | 'stone' | 'olive' | 'rust' | 'copper';
  numbered?: string;
  centered?: boolean;
}

export function Eyebrow({ children, className, tone = 'gold', numbered, centered }: EyebrowProps) {
  const toneClass = {
    gold: 'text-gold',
    burgundy: 'text-burgundy',
    stone: 'text-stone',
    olive: 'text-olive',
    rust: 'text-rust',
    copper: 'text-copper',
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
        <span
          className={cn(
            'h-px w-8',
            {
              gold: 'bg-gold/40',
              burgundy: 'bg-burgundy/40',
              rust: 'bg-rust/40',
              copper: 'bg-copper/40',
              stone: 'bg-stone/40',
              olive: 'bg-stone/40',
            }[tone]
          )}
        />
      )}
    </div>
  );
}
