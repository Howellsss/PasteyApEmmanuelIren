import { type ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';

interface TextLinkProps {
  children: ReactNode;
  href?: string;
  className?: string;
  tone?: 'burgundy' | 'gold' | 'charcoal' | 'rust' | 'copper';
  withArrow?: boolean;
}

export function TextLink({
  children,
  href = '#',
  className,
  tone = 'burgundy',
  withArrow = true,
}: TextLinkProps) {
  const toneClass = {
    burgundy: 'text-burgundy hover:text-burgundy-dark',
    gold: 'text-gold-dark hover:text-gold',
    charcoal: 'text-charcoal hover:text-burgundy',
    rust: 'text-rust hover:text-rust-dark',
    copper: 'text-copper hover:text-cream',
  }[tone];

  return (
    <a
      href={href}
      className={cn(
        'group inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-300 focus:outline-none focus-visible:underline focus-visible:underline-offset-4',
        toneClass,
        className
      )}
    >
      {children}
      {withArrow && (
        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </a>
  );
}
