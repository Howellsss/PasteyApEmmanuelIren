import { Play, Clock } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Reveal } from './Reveal';

interface VideoCardProps {
  image: string;
  title: string;
  channel?: string;
  duration?: string;
  className?: string;
}

export function VideoCard({
  image,
  title,
  channel,
  duration,
  className,
}: VideoCardProps) {
  return (
    <Reveal className={cn('group cursor-pointer', className)}>
      <div className="relative overflow-hidden rounded-soft aspect-video bg-charcoal/5 mb-4">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out-quart group-hover:scale-[1.03]"
          style={{ objectPosition: 'center top' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-pill bg-soft-white/90 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-burgundy">
            <Play className="w-6 h-6 text-charcoal group-hover:text-soft-white ml-1 transition-colors duration-500" fill="currentColor" />
          </div>
        </div>
        {duration && (
          <span className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-pill bg-charcoal/80 backdrop-blur-sm text-soft-white text-meta font-sans">
            <Clock className="w-3 h-3" />
            {duration}
          </span>
        )}
      </div>
      <h3 className="font-display text-lg leading-snug text-charcoal group-hover:text-burgundy transition-colors duration-300 text-balance">
        {title}
      </h3>
      {channel && <p className="text-meta text-stone mt-1.5">{channel}</p>}
    </Reveal>
  );
}
