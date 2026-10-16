import { type ReactNode } from 'react';
import { useReveal } from '@/lib/useReveal';
import { cn } from '@/lib/cn';

interface MediaRevealProps {
  children: ReactNode;
  /** The side of the layout the image sits on; it slides in from there. 'none' only zooms (backgrounds). */
  from?: 'left' | 'right' | 'none';
  /** Layout classes for the static wrapper (grid placement, order). */
  className?: string;
  /** Classes for the moving frame (aspect ratio, rounding, background). */
  frameClassName?: string;
}

/**
 * Image entrance used down the home page: the frame slides in from its side while the picture,
 * given the `media-reveal-img` class, settles from a slow zoom.
 */
export function MediaReveal({ children, from = 'left', className, frameClassName }: MediaRevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.2);

  // Observe the static wrapper so the moving frame's offset does not affect when it triggers.
  return (
    <div ref={ref} className={className}>
      <div
        className={cn(
          'media-reveal relative overflow-hidden',
          from === 'right' && 'from-right',
          from === 'none' && 'from-none',
          visible && 'is-visible',
          frameClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
