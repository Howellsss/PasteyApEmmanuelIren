import { type ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface DisplayHeadingProps {
  eyebrow: string;
  title: ReactNode;
  /** Trailing words set in the accent red, e.g. "Teachings" in "Latest Teachings". */
  accent?: string;
  /** Background the heading sits on; picks a red that stays readable on it. */
  tone?: 'light' | 'dark' | 'brown';
  size?: 'lg' | 'md' | 'sm';
  align?: 'left' | 'center';
  className?: string;
}

const TONES = {
  light: { line: 'bg-rust/70', label: 'text-rust', title: 'text-ink', accent: 'text-rust' },
  dark: { line: 'bg-rust-light/70', label: 'text-rust-light', title: 'text-cream', accent: 'text-rust-light' },
  brown: { line: 'bg-rust-lighter/70', label: 'text-rust-lighter', title: 'text-cream', accent: 'text-rust-lighter' },
};

// md (~40px on desktop) is the standard section heading; lg is kept for the closing statement.
const SIZES = {
  lg: 'text-3xl sm:text-4xl lg:text-5xl',
  md: 'text-3xl sm:text-4xl lg:text-[2.5rem]',
  sm: 'text-3xl lg:text-4xl',
};

/** Section heading in the "Latest Teachings" style: ruled eyebrow over a bold, uppercase, two-tone title. */
export function DisplayHeading({
  eyebrow,
  title,
  accent,
  tone = 'light',
  size = 'md',
  align = 'left',
  className,
}: DisplayHeadingProps) {
  const colors = TONES[tone];
  const centered = align === 'center';

  return (
    <div className={cn(centered && 'text-center', className)}>
      <div className={cn('mb-4 flex items-center gap-4', centered && 'justify-center')}>
        <span className={cn('h-px w-14', colors.line)} />
        <span className={cn('text-eyebrow uppercase tracking-[0.2em]', colors.label)}>{eyebrow}</span>
        {centered && <span className={cn('h-px w-14', colors.line)} />}
      </div>
      <h2
        className={cn(
          'font-sans font-extrabold uppercase leading-[1.05] tracking-[-0.02em] text-balance',
          SIZES[size],
          colors.title,
          centered ? 'mx-auto max-w-4xl' : 'max-w-3xl'
        )}
      >
        {title}
        {accent && <> <span className={colors.accent}>{accent}</span></>}
      </h2>
    </div>
  );
}
