import { type Book } from '@/data/media';
import { cn } from '@/lib/cn';

/**
 * A book's cover, standing on its shelf line: every cover keeps its own shape, bottoms aligned.
 * The cover is placed absolutely so its max height resolves against the frame in every browser
 * (Safari ignores percentage heights on a flex child inside an aspect-ratio box).
 */
export function BookCover({ book, className }: { book: Book; onNavy?: boolean; className?: string }) {
  return (
    <div className={cn('relative aspect-[4/5]', className)}>
      <img
        src={book.cover}
        alt={`${book.title} by Emmanuel Iren, cover`}
        loading="lazy"
        className="absolute bottom-0 left-1/2 max-h-full max-w-full -translate-x-1/2 rounded-[3px] object-contain shadow-[0_24px_48px_-12px_rgba(0,0,0,0.65)] ring-1 ring-white/10"
      />
    </div>
  );
}
