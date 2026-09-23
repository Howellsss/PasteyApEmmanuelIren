import { type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { ChapterMarker } from './ChapterMarker';

interface DisplayHeadingProps {
  eyebrow: string;
  /** Chapter number shown before the eyebrow, e.g. "01". */
  number?: string;
  title: ReactNode;
  /** Trailing words set in the accent, e.g. "Teachings" in "Latest Teachings". */
  accent?: string;
  /** dark: the default near-black sections; light: the bone chapter. */
  tone?: 'dark' | 'light';
  size?: 'lg' | 'md' | 'sm';
  align?: 'left' | 'center';
  className?: string;
}

// md (~40px on desktop) is the standard section heading; lg is kept for the closing statement.
const SIZES = {
  lg: 'text-3xl sm:text-4xl lg:text-[3.5rem]',
  md: 'text-3xl sm:text-4xl lg:text-[2.5rem]',
  sm: 'text-3xl lg:text-4xl',
};

/** Section heading: numbered chapter marker over a bold, uppercase title with an accent ending. */
export function DisplayHeading({
  eyebrow,
  number,
  title,
  accent,
  tone = 'dark',
  size = 'md',
  align = 'left',
  className,
}: DisplayHeadingProps) {
  const centered = align === 'center';

  return (
    <div className={cn(centered && 'text-center', className)}>
      <ChapterMarker label={eyebrow} number={number} tone={tone} centered={centered} />
      <h2
        className={cn(
          'font-sans font-extrabold leading-[1.02] sm:leading-[1.02] lg:leading-[1.02] tracking-[-0.04em] text-balance',
          SIZES[size],
          tone === 'light' ? 'text-ink' : 'text-cream',
          centered ? 'mx-auto max-w-4xl' : 'max-w-3xl'
        )}
      >
        {title}
        {accent && <> <span className="text-brand">{accent}</span></>}
      </h2>
    </div>
  );
}
