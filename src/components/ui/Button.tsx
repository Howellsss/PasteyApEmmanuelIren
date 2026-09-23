import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'gold' | 'rust' | 'outline-dark';
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
    'group inline-flex items-center justify-center gap-2 font-sans font-medium rounded-button transition-all duration-300 ease-out-quart focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-burgundy text-soft-white hover:bg-burgundy-dark focus-visible:ring-burgundy active:bg-burgundy-dark/90',
    secondary:
      'bg-transparent text-charcoal border border-charcoal/20 hover:border-charcoal hover:bg-charcoal hover:text-soft-white focus-visible:ring-charcoal',
    ghost:
      'bg-transparent text-charcoal hover:text-burgundy focus-visible:ring-burgundy',
    gold:
      'bg-transparent text-gold-dark border border-gold/40 hover:bg-gold hover:text-charcoal focus-visible:ring-gold',
    rust:
      'bg-rust text-cream hover:bg-rust-dark focus-visible:ring-rust active:bg-rust-dark/90',
    'outline-dark':
      'bg-transparent text-cream border border-bark hover:border-cream hover:bg-cream hover:text-ink focus-visible:ring-copper',
  };

  const sizes = {
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
      {withArrow && (
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </button>
  );
}
