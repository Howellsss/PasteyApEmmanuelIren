import { type ReactNode, type CSSProperties } from 'react';
import { useReveal } from '@/lib/useReveal';
import { cn } from '@/lib/cn';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: 'up' | 'scale' | 'fade';
  as?: 'div' | 'section' | 'article' | 'li' | 'span';
}

export function Reveal({
  children,
  className,
  delay = 0,
  variant = 'up',
  as: Tag = 'div',
}: RevealProps) {
  const { ref, visible } = useReveal();

  const hiddenClass =
    variant === 'scale' ? 'reveal-scale-hidden' : variant === 'fade' ? 'opacity-0' : 'reveal-hidden';
  const visibleClass =
    variant === 'scale' ? 'reveal-scale-visible' : variant === 'fade' ? 'opacity-100' : 'reveal-visible';

  const style: CSSProperties | undefined =
    delay > 0
      ? { transitionDelay: `${delay}ms` }
      : undefined;

  return (
    <Tag
      ref={ref as never}
      className={cn(visible ? visibleClass : hiddenClass, className)}
      style={style}
    >
      {children}
    </Tag>
  );
}
