import { useCallback, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface ViewerPhoto {
  src: string;
  alt: string;
}

interface PhotoViewerProps {
  photos: ViewerPhoto[];
  index: number | null;
  onChange: (index: number | null) => void;
}

/**
 * Full-screen photo viewer shared by the Gallery and The Irens: Escape closes, the arrow keys
 * and a sideways swipe move between photographs, and the page behind does not scroll.
 */
export function PhotoViewer({ photos, index, onChange }: PhotoViewerProps) {
  const touchX = useRef<number | null>(null);

  const step = useCallback(
    (delta: number) => onChange(index === null ? index : (index + delta + photos.length) % photos.length),
    [index, onChange, photos.length]
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onChange(null);
      if (event.key === 'ArrowRight') step(1);
      if (event.key === 'ArrowLeft') step(-1);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [index, onChange, step]);

  if (index === null) return null;
  const photo = photos[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm sm:p-10"
      onTouchStart={(event) => {
        touchX.current = event.touches[0].clientX;
      }}
      onTouchEnd={(event) => {
        if (touchX.current === null) return;
        const dx = event.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
      }}
    >
      <button type="button" className="absolute inset-0" aria-label="Close" onClick={() => onChange(null)} />
      <img
        key={photo.src}
        src={photo.src}
        alt={photo.alt}
        className="viewer-photo relative max-h-full max-w-full rounded-soft object-contain shadow-2xl shadow-black/60"
      />
      <button
        type="button"
        onClick={() => onChange(null)}
        aria-label="Close"
        className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-ink text-cream hover:bg-ink-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:right-6 sm:top-6"
      >
        <X className="h-5 w-5" />
      </button>
      {[
        { delta: -1, label: 'Previous photograph', Icon: ChevronLeft, side: 'left-3 sm:left-6' },
        { delta: 1, label: 'Next photograph', Icon: ChevronRight, side: 'right-3 sm:right-6' },
      ].map(({ delta, label, Icon, side }) => (
        <button
          key={label}
          type="button"
          onClick={() => step(delta)}
          aria-label={label}
          className={cn(
            'absolute top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-ink/80 text-cream hover:bg-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-accent',
            side
          )}
        >
          <Icon className="h-6 w-6" />
        </button>
      ))}
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-ash tabular-nums">
        {index + 1} / {photos.length}
      </p>
    </div>
  );
}
