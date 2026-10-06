import { cn } from '@/lib/cn';

interface ChapterMarkerProps {
  label: string;
  /** Two-digit chapter number, e.g. "01". */
  number?: string;
  tone?: 'dark' | 'light' | 'gold';
  centered?: boolean;
  className?: string;
}

/** Section opener: a chapter number and label over a hairline rule, like a book's chapter head. */
export function ChapterMarker({ label, number, tone = 'dark', centered, className }: ChapterMarkerProps) {
  const light = tone === 'light';
  const gold = tone === 'gold';

  return (
    <div
      className={cn(
        'mb-5 flex max-w-[22.5rem] items-baseline gap-3.5 border-b pb-3.5',
        light ? 'border-brand' : gold ? 'border-cream/45' : 'border-line',
        centered && 'mx-auto justify-center',
        className
      )}
    >
      {number && (
        <span className={cn('text-[0.8125rem] font-semibold tabular-nums', gold ? 'text-ink' : 'text-accent')}>
          {number}
        </span>
      )}
      <span className={cn('text-eyebrow uppercase tracking-[0.2em]', light ? 'text-mist' : gold ? 'text-cream' : number ? 'text-ash' : 'text-accent')}>
        {label}
      </span>
    </div>
  );
}
