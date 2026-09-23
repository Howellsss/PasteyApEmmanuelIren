import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Reveal } from './Reveal';
import { Eyebrow } from './Eyebrow';

interface EventCardProps {
  date: string;
  day: string;
  month: string;
  title: string;
  location: string;
  time?: string;
  status?: 'upcoming' | 'past';
  className?: string;
}

export function EventCard({
  date,
  day,
  month,
  title,
  location,
  time,
  status = 'upcoming',
  className,
}: EventCardProps) {
  return (
    <Reveal className={cn('group', className)}>
      <article className="flex flex-col sm:flex-row gap-5 sm:gap-8 p-6 rounded-soft border border-line hover:border-line transition-colors duration-300 bg-surface/30">
        <div className="flex-shrink-0 flex sm:flex-col items-center sm:items-start gap-3 sm:gap-1">
          <div className="flex flex-col items-center justify-center w-16 h-16 rounded-soft bg-ink-2 text-cream">
            <span className="text-eyebrow uppercase tracking-widest text-accent">{month}</span>
            <span className="font-display text-2xl leading-none">{day}</span>
          </div>
          <span className="text-meta text-ash hidden sm:block">{date}</span>
        </div>
        <div className="flex-1">
          <Eyebrow tone={status === 'past' ? 'stone' : 'burgundy'} className="mb-2">
            {status === 'past' ? 'Past Event' : 'Upcoming'}
          </Eyebrow>
          <h3 className="font-display text-xl leading-snug text-cream group-hover:text-accent transition-colors duration-300 mb-3">
            {title}
          </h3>
          <div className="flex flex-wrap items-center gap-4 text-meta text-ash">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {location}
            </span>
            {time && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {time}
              </span>
            )}
          </div>
          <a
            href="#"
            className="group/link mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent transition-colors duration-300"
          >
            {status === 'past' ? 'View Recap' : 'Register'}
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
          </a>
        </div>
      </article>
    </Reveal>
  );
}
