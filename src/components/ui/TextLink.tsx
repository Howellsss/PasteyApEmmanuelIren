import { type ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';

interface TextLinkProps {
  children: ReactNode;
  href?: string;
  className?: string;
  /** accent: red link; plain: cream link with a red arrow; light: ink link for the bone chapter. */
  tone?: 'accent' | 'plain' | 'light';
  withArrow?: boolean;
}

const TONES = {
  accent: 'text-accent hover:text-cream',
  plain: 'text-cream hover:text-accent',
  light: 'text-ink hover:text-accent',
};

export function TextLink({ children, href = '#', className, tone = 'accent', withArrow = true }: TextLinkProps) {
  const toneClass = TONES[tone];

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
        <ArrowRight className="w-3.5 h-3.5 text-accent transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </a>
  );
}
