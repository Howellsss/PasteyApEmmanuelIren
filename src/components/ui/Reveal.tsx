import { type ReactNode, type CSSProperties } from 'react';
import { useReveal } from '@/lib/useReveal';
import { cn } from '@/lib/cn';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: 'up' | 'scale' | 'fade' | 'left' | 'right';
  as?: 'div' | 'section' | 'article' | 'li' | 'span' | 'p';
}

export function Reveal({
  children,
  className,
  delay = 0,
  variant = 'up',
  as: Tag = 'div',
}: RevealProps) {
  const { ref, visible } = useReveal();

  const hiddenClass = {
    up: 'reveal-hidden',
    scale: 'reveal-scale-hidden',
    fade: 'opacity-0',
    left: 'reveal-left-hidden',
    right: 'reveal-right-hidden',
  }[variant];
  const visibleClass = {
    up: 'reveal-visible',
    scale: 'reveal-scale-visible',
    fade: 'opacity-100',
    left: 'reveal-side-visible',
    right: 'reveal-side-visible',
  }[variant];

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
