import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { ChapterMarker } from '@/components/ui/ChapterMarker';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';

const TEACHING_IMAGE = '/images/teachings/ee26a11e-6a6d-46ab-8ac2-7450784831e3.webp';

interface ScheduledEvent {
  day: string;
  month: string;
  title: string;
  place: string;
  detail: string;
}

// Only confirmed engagements belong here; the list shows a "more dates" row after them.
const upcomingEvents: ScheduledEvent[] = [
  {
    day: '18',
    month: 'Oct 2026',
    title: 'Triumph30 — Lagos',
    place: 'Eko Hotels, Lagos',
    detail: 'Prayer & Worship Gathering',
  },
];

interface PastEvent {
  year: string;
  title: string;
  location: string;
  description: string;
}

const pastEvents: PastEvent[] = [
  {
    year: '2026',
    title: 'Meltdown — Film Premiere',
    location: 'Nationwide release',
    description:
      'Emmanuel Iren served as executive producer on his second feature film, addressing mental health, family trauma, and unresolved anger.',
  },
  {
    year: '2024',
    title: 'What About Us — Film Premiere',
    location: 'Nationwide release',
    description: 'Debut feature film as executive producer, released in cinemas on 12 July 2024.',
  },
];

export function EventsPage() {
  return (
    <div className="min-h-screen bg-ink">
      {/* HERO */}
      <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-24 overflow-hidden">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
            <div className="lg:col-span-8">
              <Reveal>
                <Eyebrow className="mb-6">
                  Events
                </Eyebrow>
                <h1 className="font-sans text-5xl sm:text-6xl lg:text-8xl font-extrabold leading-[0.98] text-cream text-balance tracking-[-0.04em] mb-8">
                  Where Emmanuel Is Ministering
                </h1>
              </Reveal>
            </div>
            <div className="lg:col-span-4">
              <Reveal delay={120}>
                <p className="text-lg text-ash leading-relaxed text-pretty">
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
            <article className="grid grid-cols-1 lg:grid-cols-12 border-t-2 border-brand">
              <div className="relative lg:col-span-7 aspect-[16/10] lg:aspect-auto lg:min-h-[28rem] overflow-hidden rounded-soft lg:mt-8">
                <img
                  src={TEACHING_IMAGE}
                  alt="Emmanuel Iren ministering"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: 'center 25%' }}
                />
              </div>
              <div className="lg:col-span-5 py-8 lg:py-12 lg:pl-14 flex flex-col justify-center">
                <p className="mb-5 text-eyebrow uppercase tracking-[0.16em] text-accent">Next gathering</p>
                <h2 className="font-sans font-extrabold leading-[1.02] sm:leading-[1.02] lg:leading-[1.02] tracking-[-0.04em] text-3xl lg:text-[2.5rem] text-cream mb-5 text-balance">
                  Triumph30 — Lagos
                </h2>
                <p className="text-ash leading-relaxed mb-8">
                  A prayer and worship gathering with Apostle Emmanuel Iren.
                </p>
                <div className="space-y-3 text-sm text-ash mb-8">
                  <p className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-accent" />
                    Saturday, October 18, 2026
                  </p>
                  <p className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-accent" />
                    Eko Hotels, Lagos
                  </p>
                </div>
                <div>
                  <Link to="/contact">
                    <Button variant="primary" size="md" withArrow>
                      Enquire About This Event
                    </Button>
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* UPCOMING EVENTS — schedule list */}
      <section className="py-14 md:py-16 lg:py-24">
        <div className="container-editorial">
          <SectionHeader numbered="01" eyebrow="Upcoming" title="On the schedule." />
          <Reveal className="mt-10 border-t border-line">
            {upcomingEvents.map((event) => (
              <div
                key={event.title}
                className="grid grid-cols-[5rem_1fr] items-center gap-x-6 gap-y-3 border-b border-line py-6 sm:grid-cols-[7rem_1fr_auto] sm:gap-x-8"
              >
                <div>
                  <p className="font-sans text-4xl font-extrabold leading-none text-cream">{event.day}</p>
                  <p className="mt-1.5 text-eyebrow uppercase tracking-[0.16em] text-accent">{event.month}</p>
                </div>
                <div>
                  <h3 className="font-display text-xl text-cream">{event.title}</h3>
                  <p className="mt-1 text-sm text-ash">
                    {event.place} · {event.detail}
                  </p>
                </div>
                <Link
                  to="/contact"
                  className="group col-span-2 inline-flex items-center gap-1.5 text-sm font-medium text-cream hover:text-accent transition-colors duration-300 sm:col-span-1"
                >
                  Enquire <ArrowRight className="h-3.5 w-3.5 text-accent transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
            <div className="grid grid-cols-[5rem_1fr] items-center gap-x-6 border-b border-line py-6 sm:grid-cols-[7rem_1fr_auto] sm:gap-x-8">
              <p className="font-sans text-4xl font-extrabold leading-none text-line" aria-hidden="true">+</p>
              <div>
                <h3 className="font-display text-xl text-cream">More dates are being confirmed</h3>
                <p className="mt-1 text-sm text-ash">New engagements are announced here first.</p>
              </div>
              <Link
                to="/invite"
                className="group col-span-2 inline-flex items-center gap-1.5 text-sm font-medium text-cream hover:text-accent transition-colors duration-300 sm:col-span-1"
              >
                Invite Emmanuel <ArrowRight className="h-3.5 w-3.5 text-accent transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PAST EVENTS — year-led archive */}
      <section className="py-14 md:py-16 lg:py-24 bg-ink-2">
        <div className="container-editorial">
          <SectionHeader
            numbered="02"
            eyebrow="Archive"
            title="Looking back."
            description="A selection of past events and appearances, drawn from verified public information."
          />
          <div className="mt-10 border-t border-line">
            {pastEvents.map((event, i) => (
              <Reveal
                key={event.title}
                delay={i * 80}
                className="grid grid-cols-1 gap-3 border-b border-line py-8 sm:grid-cols-[7rem_1fr] sm:gap-8"
              >
                <p className="font-sans text-4xl font-extrabold leading-none text-brand">{event.year}</p>
                <div>
                  <h3 className="font-display text-xl text-cream">{event.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ash">{event.description}</p>
                  <p className="mt-3 flex items-center gap-1.5 text-meta text-ash">
                    <MapPin className="w-3.5 h-3.5" />
                    {event.location}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SPEAKING / INVITATION CTA */}
      <section className="py-24 lg:py-36 bg-bone overflow-hidden">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8">
              <Reveal>
                <ChapterMarker tone="light" number="03" label="Speaking Engagements" />
                <h2 className="font-sans font-extrabold leading-[1.02] sm:leading-[1.02] lg:leading-[1.02] tracking-[-0.04em] text-balance text-3xl sm:text-4xl lg:text-[2.5rem] text-ink mb-6">
                  Want to invite Emmanuel to minister at your gathering?
                </h2>
                <p className="text-lg text-umber leading-relaxed max-w-xl text-pretty">
                  Submit an invitation for a speaking engagement, conference, or
                  interview. Each request is reviewed carefully.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal delay={100}>
                <Link to="/invite">
                  <Button
                    variant="primary-light"
                    size="lg"
                    withArrow
                    className="w-full sm:w-auto"
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
