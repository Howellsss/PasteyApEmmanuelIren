import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary/secondary sit on dark grounds; -light on the navy chapter; ink/on-gold on the gold band. */
  variant?: 'primary' | 'secondary' | 'ghost' | 'primary-light' | 'secondary-light' | 'brand' | 'quiet' | 'ink' | 'on-gold';
  size?: 'md' | 'lg';
  children: ReactNode;
  withArrow?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  withArrow = false,
  ...props
}: ButtonProps) {
  const base =
    'group inline-flex items-center justify-center gap-2.5 font-sans font-medium rounded-button transition-colors duration-300 ease-out-quart focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-cream text-ink font-semibold hover:bg-white',
    secondary: 'bg-transparent text-cream border border-cream/30 hover:border-cream',
    ghost: 'bg-transparent text-cream hover:text-accent',
    'primary-light': 'bg-cream text-ink font-semibold hover:bg-white',
    'secondary-light': 'bg-transparent text-cream border border-cream/30 hover:border-cream',
    // Hero pair: gold fill, and a quiet dark outline beside it.
    brand: 'bg-brand text-cream hover:bg-brand-dark',
    quiet: 'bg-transparent text-cream border border-bark hover:border-cream',
    // The gold band: an ink button and a cream outline.
    ink: 'bg-ink text-cream font-semibold hover:bg-ink-2',
    'on-gold': 'bg-transparent text-cream border border-cream/70 hover:border-cream',
  };

  const sizes = {
    md: 'px-6 py-3 text-sm',
    lg: 'px-7 py-4 text-base',
  };

  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
      {withArrow && (
        <ArrowRight
          className={cn(
            'w-4 h-4 transition-transform duration-300 group-hover:translate-x-1',
            variant === 'brand' ? 'text-cream' : 'text-accent'
          )}
        />
      )}
    </button>
  );
}
