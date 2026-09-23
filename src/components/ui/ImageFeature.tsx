import { cn } from '@/lib/cn';
import { Reveal } from './Reveal';

type ImageTreatment = 'natural' | 'monochrome' | 'warm' | 'dark-overlay';

interface ImageFeatureProps {
  src: string;
  alt: string;
  treatment?: ImageTreatment;
  ratio?: 'portrait' | 'landscape' | 'square' | 'wide' | 'cinematic';
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}

const ratioClass = {
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  square: 'aspect-square',
  wide: 'aspect-[16/9]',
  cinematic: 'aspect-[21/9]',
};

const treatmentClass: Record<ImageTreatment, string> = {
  natural: '',
  monochrome: 'image-monochrome',
  warm: 'image-warm',
  'dark-overlay': '',
};

export function ImageFeature({
  src,
  alt,
  treatment = 'natural',
  ratio = 'landscape',
  className,
  imgClassName,
  priority = false,
}: ImageFeatureProps) {
  return (
    <Reveal
      variant="scale"
      className={cn('relative overflow-hidden rounded-soft bg-charcoal/5', ratioClass[ratio], className)}
    >
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        className={cn(
          'w-full h-full object-cover transition-transform duration-700 ease-out-quart',
          treatmentClass[treatment],
          imgClassName
        )}
      />
      {treatment === 'dark-overlay' && (
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/10 to-transparent" />
      )}
    </Reveal>
  );
}
