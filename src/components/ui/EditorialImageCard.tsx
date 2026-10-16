import { cn } from '@/lib/cn';
import { Reveal } from './Reveal';
import { Eyebrow } from './Eyebrow';

interface EditorialImageCardProps {
  image: string;
  alt: string;
  caption?: string;
  credit?: string;
  treatment?: 'natural' | 'monochrome' | 'warm';
  ratio?: 'portrait' | 'landscape' | 'square' | 'wide';
  className?: string;
}

const ratioClass = {
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  square: 'aspect-square',
  wide: 'aspect-[16/9]',
};

const treatmentClass = {
  natural: '',
  monochrome: 'image-monochrome',
  warm: 'image-warm',
};

export function EditorialImageCard({
  image,
  alt,
  caption,
  credit,
  treatment = 'natural',
  ratio = 'landscape',
  className,
}: EditorialImageCardProps) {
  return (
    <Reveal variant="scale" className={cn('group', className)}>
      <figure>
        <div className={cn('overflow-hidden rounded-soft bg-surface', ratioClass[ratio])}>
          <img
            src={image}
            alt={alt}
            loading="lazy"
            className={cn(
              'w-full h-full object-cover transition-transform duration-700 ease-out-quart group-hover:scale-[1.02]',
              treatmentClass[treatment]
            )}
          />
        </div>
        {(caption || credit) && (
          <figcaption className="flex items-start justify-between gap-4 mt-3">
            {caption && (
              <p className="text-sm text-ash leading-relaxed max-w-md">{caption}</p>
            )}
            {credit && (
              <Eyebrow tone="muted" className="flex-shrink-0">
                {credit}
              </Eyebrow>
            )}
          </figcaption>
        )}
      </figure>
    </Reveal>
  );
}
