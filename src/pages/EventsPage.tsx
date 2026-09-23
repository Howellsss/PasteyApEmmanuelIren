import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight, ArrowUpRight, Clock } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { TextLink } from '@/components/ui/TextLink';
import { cn } from '@/lib/cn';

const TEACHING_IMAGE = '/images/teachings/ee26a11e-6a6d-46ab-8ac2-7450784831e3.png';
const ABOUT_IMAGE = '/images/about/image.png';
const CREATIVE_IMAGE = '/images/creative/e5.jpeg';
const MINISTRY_IMAGE = '/images/ministry/e6.jpeg';

const IMG_FEATURED = 'IMAGE_REQUIRED — Featured event artwork';
const IMG_EVENT_1 = 'IMAGE_REQUIRED — Upcoming event 1';
const IMG_EVENT_2 = 'IMAGE_REQUIRED — Upcoming event 2';
const IMG_PAST_1 = 'IMAGE_REQUIRED — Past event 1';
const IMG_PAST_2 = 'IMAGE_REQUIRED — Past event 2';

interface UpcomingEvent {
  day: string;
  month: string;
  year: string;
  title: string;
  location: string;
  venue: string;
  role: string;
  image: string;
  hasVerifiedInfo: boolean;
}

const upcomingEvents: UpcomingEvent[] = [
  {
    day: '--',
    month: '---',
    year: '----',
    title: 'Event Information Required',
    location: 'Location to be confirmed',
    venue: 'Venue to be confirmed',
    role: 'Speaker',
    image: IMG_EVENT_1,
    hasVerifiedInfo: false,
  },
  {
    day: '--',
    month: '---',
    year: '----',
    title: 'Event Information Required',
    location: 'Location to be confirmed',
    venue: 'Venue to be confirmed',
    role: 'Speaker',
    image: IMG_EVENT_2,
    hasVerifiedInfo: false,
  },
];

interface PastEvent {
  year: string;
  title: string;
  location: string;
  description: string;
  image: string;
  hasVerifiedInfo: boolean;
}

const pastEvents: PastEvent[] = [
  {
    year: '2026',
    title: 'Meltdown — Film Premiere',
    location: 'Nationwide release',
    description:
      'Emmanuel Iren served as executive producer on his second feature film, addressing mental health, family trauma, and unresolved anger.',
    image: IMG_PAST_1,
    hasVerifiedInfo: true,
  },
  {
    year: '2024',
    title: 'What About Us — Film Premiere',
    location: 'Nationwide release',
    description:
      'Debut feature film as executive producer, released in cinemas on 12 July 2024.',
    image: IMG_PAST_2,
    hasVerifiedInfo: true,
  },
];

export function EventsPage() {
  return (
    <div className="min-h-screen bg-ivory">
      {/* HERO */}
      <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-24 overflow-hidden">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
            <div className="lg:col-span-8">
              <Reveal>
                <Eyebrow tone="burgundy" className="mb-6">
                  Events
                </Eyebrow>
                <h1 className="font-sans text-5xl sm:text-6xl lg:text-8xl font-extrabold leading-[0.98] text-charcoal text-balance tracking-[-0.04em] mb-8">
                  Where Emmanuel Is Ministering
                </h1>
              </Reveal>
            </div>
            <div className="lg:col-span-4">
              <Reveal delay={120}>
                <p className="text-lg text-charcoal/70 leading-relaxed text-pretty">
                  Upcoming gatherings, speaking engagements, and appearances — in
                  person and online. Details will be posted as events are confirmed.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED EVENT */}
      <section className="pb-16 lg:pb-24">
        <div className="container-wide">
          <Reveal variant="scale">
            <article className="grid grid-cols-1 lg:grid-cols-12 rounded-soft overflow-hidden bg-charcoal text-soft-white">
              {/* Image / artwork */}
              <div className="relative lg:col-span-7 aspect-[16/10] lg:aspect-auto min-h-[24rem] overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-charcoal/20 to-charcoal/40">
                  <div className="text-center px-6">
                    <Calendar className="w-10 h-10 text-gold/40 mx-auto mb-4" />
                    <span className="text-stone/60 text-sm">
                      {IMG_FEATURED}
                    </span>
                  </div>
                </div>
              </div>
              {/* Content */}
              <div className="lg:col-span-5 p-8 sm:p-10 lg:p-14 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-5">
                  <span className="px-3 py-1 rounded-pill bg-gold/20 text-gold text-meta font-sans uppercase tracking-widest">
                    Featured
                  </span>
                  <span className="text-meta text-white/50 uppercase tracking-widest">
                    Upcoming
                  </span>
                </div>
                <h2 className="font-display text-3xl lg:text-4xl leading-tight mb-5 text-balance">
                  Event Information Required
                </h2>
                <p className="text-white/55 leading-relaxed mb-8">
                  Verified event details — including date, location, venue, and
                  Emmanuel's role — will appear here once confirmed.
                </p>
                <div className="space-y-3 text-sm text-white/50 mb-8">
                  <p className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-gold" />
                    Date to be confirmed
                  </p>
                  <p className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gold" />
                    Venue to be confirmed
                  </p>
                  <p className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-gold" />
                    Time to be confirmed
                  </p>
                </div>
                <div>
                  <Button
                    variant="secondary"
                    size="md"
                    className="border-white/20 text-soft-white hover:bg-soft-white hover:text-charcoal opacity-50 cursor-not-allowed"
                  >
                    Details Coming Soon
                  </Button>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="py-16 lg:py-24">
        <div className="container-editorial">
          <SectionHeader
            eyebrow="Upcoming"
            tone="burgundy"
            title="On the schedule."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
            {upcomingEvents.map((event, i) => (
              <Reveal key={i} delay={i * 80} className="group">
                <article className="flex flex-col rounded-soft overflow-hidden border border-stone/25 bg-soft-white/30 hover:border-stone/40 transition-colors duration-300">
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-charcoal/5">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-stone/40 text-xs text-center px-4">
                        {event.image}
                      </span>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-6 flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center justify-center w-14 h-14 rounded-soft bg-charcoal text-soft-white flex-shrink-0">
                        <span className="text-eyebrow uppercase tracking-widest text-gold">
                          {event.month}
                        </span>
                        <span className="font-display text-lg leading-none">
                          {event.day}
                        </span>
                      </div>
                      <div>
                        <Eyebrow tone="stone" className="mb-1">
                          {event.role}
                        </Eyebrow>
                        <h3 className="font-display text-lg leading-snug text-charcoal">
                          {event.title}
                        </h3>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-meta text-stone pl-1">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {event.location}
                      </span>
                    </div>
                    <span className="text-sm text-stone/60 italic">
                      Awaiting verified event details
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PAST EVENTS */}
      <section className="py-20 lg:py-32 bg-soft-white">
        <div className="container-editorial">
          <SectionHeader
            eyebrow="Archive"
            title="Looking back."
            description="A selection of past events and appearances, drawn from verified public information."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-14">
            {pastEvents.map((event, i) => (
              <Reveal key={i} delay={i * 80} className="group">
                <article className="flex flex-col sm:flex-row gap-6 rounded-soft overflow-hidden border border-stone/20 bg-ivory hover:border-stone/40 transition-colors duration-300">
                  {/* Image */}
                  <div className="relative sm:w-2/5 aspect-[4/3] sm:aspect-auto overflow-hidden bg-charcoal/5 flex-shrink-0">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-stone/40 text-xs text-center px-4">
                        {event.image}
                      </span>
                    </div>
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-pill bg-charcoal/80 backdrop-blur-sm text-soft-white text-meta font-sans uppercase tracking-widest">
                      {event.year}
                    </span>
                  </div>
                  {/* Content */}
                  <div className="flex-1 p-6 sm:py-6 sm:pr-8 flex flex-col justify-center">
                    <Eyebrow tone="stone" className="mb-3">
                      Past Event
                    </Eyebrow>
                    <h3 className="font-display text-xl leading-snug text-charcoal mb-3">
                      {event.title}
                    </h3>
                    <p className="text-sm text-charcoal/60 leading-relaxed mb-4">
                      {event.description}
                    </p>
                    <div className="flex items-center gap-1.5 text-meta text-stone">
                      <MapPin className="w-3.5 h-3.5" />
                      {event.location}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SPEAKING / INVITATION CTA */}
      <section className="py-24 lg:py-36 bg-charcoal text-soft-white overflow-hidden">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8">
              <Reveal>
                <Eyebrow tone="gold" className="mb-6">
                  Speaking Engagements
                </Eyebrow>
                <h2 className="font-display text-3xl lg:text-5xl leading-[1.1] text-balance mb-6">
                  Want to invite Emmanuel to minister at your gathering?
                </h2>
                <p className="text-lg text-white/65 leading-relaxed max-w-xl text-pretty">
                  Submit an invitation for a speaking engagement, conference, or
                  interview. Each request is reviewed carefully.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal delay={100}>
                <Link to="/invite">
                  <Button
                    variant="secondary"
                    size="lg"
                    withArrow
                    className="border-white/20 text-soft-white hover:bg-soft-white hover:text-charcoal rounded-pill w-full sm:w-auto"
                  >
                    Invite Emmanuel
                  </Button>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
