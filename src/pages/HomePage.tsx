import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { TextLink } from '@/components/ui/TextLink';
import { MediaCard } from '@/components/ui/MediaCard';
import { DisplayHeading } from '@/components/ui/DisplayHeading';
import { CreativeAccordion } from '@/components/ui/CreativeAccordion';
import { useReveal } from '@/lib/useReveal';
import { cn } from '@/lib/cn';

const HERO_NAME = 'Apostle Emmanuel Iren';
const TEACHING_IMAGE = '/images/teachings/ee26a11e-6a6d-46ab-8ac2-7450784831e3.webp';
const ABOUT_IMAGE = '/images/about/image copy.webp';
const CREATIVE_IMAGE = '/images/creative/e5.webp';
const MINISTRY_IMAGE = '/images/ministry/e6.webp';
const TEACHING_IMAGE_2 = '/images/teachings/image copy.webp';
const TEACHING_IMAGE_3 = '/images/teachings/image copy 2.webp';

const latestTeachings = [
  {
    series: 'The Word',
    title: 'Vigour: Stewarding the Body',
    description: 'A life-changing teaching on how God calls us to honour Him through the careful stewardship of our physical bodies.',
    date: 'September 2025',
    type: 'Video',
    image: '/images/teachings/image copy 3.webp',
    imagePosition: 'center center',
    watchUrl: 'https://www.youtube.com/watch?v=iZAt3VZMJAI',
  },
  {
    series: 'The Word',
    title: "God's Good Design",
    description: "Discover the intentionality behind God's design for your life — purpose, pattern, and the beauty of His sovereign plan.",
    date: 'September 2025',
    type: 'Video',
    image: '/images/teachings/image copy 4.webp',
    imagePosition: 'center center',
    watchUrl: 'https://www.youtube.com/live/qsTHhh7f8pQ',
  },
  {
    series: 'The Word',
    title: 'The Grace of Giving',
    description: 'Understanding giving not as an obligation but as a grace — a reflection of the generosity God has already shown us.',
    date: 'September 2025',
    type: 'Video',
    image: '/images/teachings/image copy 5.webp',
    imagePosition: 'center center',
    watchUrl: 'https://youtu.be/53oy7e5CTKQ',
  },
  {
    series: 'The Word',
    title: 'The God Who Blesses',
    description: 'A powerful message on the nature of God as the One who blesses — and what it means to walk in His covenant promises.',
    date: 'September 2025',
    type: 'Video',
    image: '/images/teachings/image copy 6.webp',
    imagePosition: 'center top',
    watchUrl: 'https://youtu.be/WWDlFiYpBOY',
  },
  {
    series: 'The Word',
    title: 'Fervent in Spirit',
    description: 'Rekindling the flame of spiritual fervency and learning how to maintain a burning heart in every season of life.',
    date: 'September 2025',
    type: 'Video',
    image: '/images/teachings/image copy 7.webp',
    imagePosition: 'center top',
    watchUrl: 'https://www.youtube.com/watch?v=x71RhblDHdE',
  },
];

const ministryExpressions = [
  {
    name: 'Celebration Church International',
    description: 'A local church with a global vision, rooted in the teaching of God’s Word.',
  },
  {
    name: 'Manifest',
    description: 'A creative and worship expression for a generation seeking God with excellence.',
  },
  {
    name: 'Triumph30',
    description: 'A focused journey of prayer, fasting, and spiritual renewal.',
  },
  {
    name: 'Outburst',
    description: 'A youth and campus expression built to ignite faith and purpose.',
  },
];

/** About photo: wipes up into view while settling from a slow zoom; eases in again on hover. */
function AboutImage() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.2);

  // Observe the unclipped wrapper: a fully clipped element never reports as intersecting.
  return (
    <div ref={ref}>
      <div
        className={cn(
          'about-reveal relative aspect-[4/5] overflow-hidden rounded-soft bg-ink sm:aspect-[4/3]',
          visible && 'is-visible'
        )}
      >
        <img
          src={ABOUT_IMAGE}
          alt="Emmanuel Iren speaking on stage"
          className="about-reveal-img h-full w-full object-cover"
          style={{ objectPosition: 'center 35%' }}
          loading="eager"
          decoding="async"
        />
      </div>
    </div>
  );
}

export function HomePage() {
  const [typedHeroName, setTypedHeroName] = useState('');
  const [hasFinishedIntro, setHasFinishedIntro] = useState(false);
  const [activeTeachingIndex, setActiveTeachingIndex] = useState(0);
  const [isTeachingPaused, setIsTeachingPaused] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    if (hasFinishedIntro) return;

    let characterIndex = 0;
    let typeInterval: number | undefined;
    // Short pause so the hero has faded in before the first letter appears.
    const startDelay = window.setTimeout(() => {
      typeInterval = window.setInterval(() => {
        characterIndex += 1;
        setTypedHeroName(HERO_NAME.slice(0, characterIndex));

        if (characterIndex === HERO_NAME.length) {
          window.clearInterval(typeInterval);
          setHasFinishedIntro(true);
        }
      }, 180);
    }, 700);

    return () => {
      window.clearTimeout(startDelay);
      window.clearInterval(typeInterval);
    };
  }, [hasFinishedIntro]);

  useEffect(() => {
    if (isTeachingPaused) return;

    const teachingTimer = window.setInterval(() => {
      setActiveTeachingIndex((index) => (index + 1) % latestTeachings.length);
    }, 3800);

    return () => window.clearInterval(teachingTimer);
  }, [isTeachingPaused]);

  const activeTeaching = latestTeachings[activeTeachingIndex];

  return (
    <div className="min-h-screen bg-ink">
      <section className="relative min-h-screen flex items-end overflow-hidden bg-ink">
        <div className="absolute inset-0 overflow-hidden bg-ink">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            onLoadedData={() => setIsVideoReady(true)}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/videos/hero.webm" type="video/webm" />
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          <div
            aria-hidden="true"
            className={`absolute inset-0 bg-ink z-10 transition-opacity duration-500 ${isVideoReady ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/55" />
        <div className="relative z-20 w-full px-6 sm:px-8 lg:px-16 pb-16 lg:pb-24 pt-32 flex justify-center text-center">
          <Reveal className="w-full max-w-4xl flex flex-col items-center">
            <p className="mb-8 text-eyebrow font-sans uppercase tracking-[0.3em] text-cream">
              Apostle <span className="text-accent">·</span> Teacher <span className="text-accent">·</span> Author
            </p>
            <h1 className="font-sans text-5xl sm:text-6xl lg:text-8xl font-extrabold leading-[0.98] text-cream text-balance mb-8 tracking-[-0.04em] min-h-[0.98em]">
              {typedHeroName}
              {hasFinishedIntro && <span className="text-accent">.</span>}
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-ash leading-relaxed max-w-2xl mb-10 text-pretty font-light">
              A teaching minister, author, songwriter, and founder of Celebration Church International.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <Link to="/teaching">
                <Button variant="primary" size="lg" withArrow>
                  Explore Teachings
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="secondary" size="lg">
                  Discover Emmanuel
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink py-14 md:py-16 lg:py-24">
        <div className="container-wide">
          <div className="mb-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <Reveal>
              <DisplayHeading number="01" eyebrow="Teachings" title="Latest" accent="Teachings" />
            </Reveal>
            <Reveal delay={100}>
              <Link to="/teaching">
                <TextLink tone="plain">Browse the library</TextLink>
              </Link>
            </Reveal>
          </div>

          <Reveal variant="scale">
            <article className="grid border-t-2 border-accent lg:grid-cols-[0.92fr_1.08fr]">
              <div className="order-2 flex min-h-[26rem] flex-col py-8 sm:py-10 lg:order-1 lg:min-h-[32rem] lg:py-12 lg:pr-12">
                <div className="flex-1 space-y-5 lg:flex lg:flex-col lg:justify-center">
                  <p className="text-eyebrow uppercase tracking-[0.16em] text-accent">{activeTeaching.series}</p>
                  <h3 className="max-w-lg font-display text-2xl leading-[1.15] text-cream lg:text-[1.875rem]">
                    {activeTeaching.title}
                  </h3>
                  <p className="max-w-md text-[0.9375rem] font-light leading-7 text-ash">{activeTeaching.description}</p>
                  <p className="text-meta text-ash">
                    {activeTeaching.date} <span className="text-accent">·</span> {activeTeaching.type}
                  </p>
                  <div className="pt-2">
                    <a href={activeTeaching.watchUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="secondary" size="md" withArrow>
                        Watch Now
                      </Button>
                    </a>
                  </div>
                </div>
                <div className="mt-10 flex items-center justify-between border-t border-line pt-6">
                  <div className="flex items-center gap-5" role="tablist" aria-label="Latest teachings">
                    {latestTeachings.map((teaching, index) => (
                      <button
                        key={teaching.title}
                        type="button"
                        role="tab"
                        aria-selected={activeTeachingIndex === index}
                        aria-label={`Show ${teaching.title}`}
                        onClick={() => setActiveTeachingIndex(index)}
                        className={`relative pb-2 text-xs font-semibold tabular-nums tracking-[0.12em] transition-colors ${activeTeachingIndex === index ? 'text-accent' : 'text-white/30 hover:text-white/60'}`}
                      >
                        {String(index + 1).padStart(2, '0')}
                        <span className={`absolute bottom-0 left-0 h-px bg-accent transition-all duration-300 ${activeTeachingIndex === index ? 'w-full' : 'w-0'}`} />
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      aria-label="Previous teaching"
                      onClick={() => setActiveTeachingIndex((index) => (index - 1 + latestTeachings.length) % latestTeachings.length)}
                      className="flex h-9 w-9 items-center justify-center text-white/45 transition-colors hover:text-accent"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      aria-label="Next teaching"
                      onClick={() => setActiveTeachingIndex((index) => (index + 1) % latestTeachings.length)}
                      className="flex h-9 w-9 items-center justify-center text-white/45 transition-colors hover:text-accent"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
              <div
                className="order-1 relative min-h-[24rem] overflow-hidden rounded-soft bg-surface lg:order-2 lg:mt-8 lg:min-h-[32rem]"
                onMouseEnter={() => setIsTeachingPaused(true)}
                onMouseLeave={() => setIsTeachingPaused(false)}
                onFocus={() => setIsTeachingPaused(true)}
                onBlur={() => setIsTeachingPaused(false)}
              >
                <img
                  key={activeTeaching.image}
                  src={activeTeaching.image}
                  alt={`Apostle Emmanuel Iren — ${activeTeaching.title}`}
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
                  style={{ objectPosition: activeTeaching.imagePosition }}
                />
                <a
                  href={activeTeaching.watchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Watch ${activeTeaching.title}`}
                  className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-ink backdrop-blur-sm transition-transform duration-300 hover:scale-110"
                >
                  <Play className="ml-1 h-6 w-6" fill="currentColor" />
                </a>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink-2 py-14 md:py-16 lg:py-24">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-8">
              <AboutImage />
            </div>
            <div className="lg:col-span-4">
              <Reveal>
                <DisplayHeading
                  number="02"
                  eyebrow="About Emmanuel"
                  title="A life given to Christ"
                  accent="and His purpose."
                  size="sm"
                  className="mb-6"
                />
              </Reveal>
              <div className="space-y-5 text-ash leading-relaxed">
                <Reveal delay={150} as="p">
                  Apostle Emmanuel Iren is the founder and lead pastor of Celebration Church International, a teacher of God’s Word, author, songwriter, and ministry leader.
                </Reveal>
                <Reveal delay={300} as="p">
                  His work brings together sound teaching, creative expression, and a deep commitment to helping people live their faith with clarity and purpose.
                </Reveal>
              </div>
              <Reveal delay={450}>
                <Link to="/about" className="inline-block mt-8">
                  <TextLink>Read His Story</TextLink>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink py-14 md:py-16 lg:py-24">
        <div className="container-editorial">
          <Reveal>
            <DisplayHeading number="03" eyebrow="Teaching" title="Teach the word." accent="Live the word." />
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ash text-pretty">
              Sermons and conversations for the questions, decisions, and ordinary days that make up a life of faith.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 mt-10">
            <MediaCard
              image={TEACHING_IMAGE}
              title="The Gospel of Grace — Part 4"
              meta="The Gospel of Grace · Sep 12, 2026"
              duration="42 min"
              type="Sermon"
              className="lg:col-span-8"
            />
            <MediaCard
              image={TEACHING_IMAGE_2}
              title="What It Means to Be Led by the Spirit"
              meta="Faith in Practice · Sep 05, 2026"
              duration="34 min"
              type="Teaching"
              className="lg:col-span-4"
            />
            <MediaCard
              image={TEACHING_IMAGE_3}
              title="The Creative Calling"
              meta="Conversations · Aug 29, 2026"
              duration="52 min"
              type="Podcast"
              className="lg:col-span-4"
            />
          </div>
          <Reveal className="mt-10">
            <Link to="/teaching">
              <TextLink>Explore Teachings</TextLink>
            </Link>
          </Reveal>
        </div>
      </section>

      <CreativeAccordion />

      <section className="bg-ink py-14 md:py-16 lg:py-24 overflow-hidden">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 lg:order-2">
              <Reveal variant="scale">
                <div className="relative aspect-[4/5] overflow-hidden rounded-soft">
                  <img
                    src={MINISTRY_IMAGE}
                    alt="Emmanuel Iren in ministry"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out-quart hover:scale-[1.02]"
                    style={{ objectPosition: 'center top' }}
                  />
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-7 lg:order-1">
              <Reveal>
                <DisplayHeading
                  number="05"
                  eyebrow="Ministry"
                  title="One calling."
                  accent="Many expressions."
                  className="mb-6"
                />
                <p className="text-ash leading-relaxed max-w-xl mb-8">
                  A growing family of ministry expressions, each carrying the same invitation to know Christ, live purposefully, and make Him known.
                </p>
                <div className="border-t border-line">
                  {ministryExpressions.map((expression, index) => (
                    <div key={expression.name} className="grid grid-cols-[3rem_1fr] gap-2 py-5 border-b border-line">
                      <span className="font-sans text-[1.75rem] font-extrabold leading-none text-accent">{index + 1}</span>
                      <div>
                        <h3 className="font-display text-xl text-cream mb-1">{expression.name}</h3>
                        <p className="text-sm text-ash leading-relaxed max-w-md">{expression.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/ministry" className="inline-block mt-8">
                  <TextLink>Explore Ministry</TextLink>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink-2 py-14 md:py-16 lg:py-24">
        <div className="container-editorial">
          <div className="mb-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <Reveal>
              <DisplayHeading number="06" eyebrow="Events" title="Where Apostle Emmanuel Iren" accent="is ministering." />
            </Reveal>
            <Reveal delay={100}>
              <Link to="/events">
                <TextLink tone="plain">All events</TextLink>
              </Link>
            </Reveal>
          </div>
          {/* A schedule list rather than promo cards: date, image, event, details. */}
          <Reveal className="border-t border-line">
            <Link
              to="/events"
              className="group grid grid-cols-[5rem_1fr] items-center gap-x-6 gap-y-4 border-b border-line py-6 sm:grid-cols-[7rem_12rem_1fr_auto] sm:gap-x-8"
            >
              <div>
                <p className="font-sans text-4xl font-extrabold leading-none text-cream">18</p>
                <p className="mt-1.5 text-eyebrow uppercase tracking-[0.16em] text-accent">Oct 2026</p>
              </div>
              <img
                src={TEACHING_IMAGE}
                alt="Emmanuel Iren ministering at an event"
                className="hidden h-28 w-full rounded-soft object-cover sm:block"
                style={{ objectPosition: 'center 30%' }}
              />
              <div>
                <h3 className="font-display text-xl text-cream group-hover:text-accent transition-colors duration-300">Triumph30 — Lagos</h3>
                <p className="mt-1 text-sm text-ash">Eko Hotels, Lagos · Prayer &amp; Worship Gathering</p>
              </div>
              <span className="col-span-2 inline-flex items-center gap-1.5 text-sm font-medium text-cream sm:col-span-1">
                Details &amp; Registration <ArrowRight className="h-3.5 w-3.5 text-accent transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink py-14 md:py-16 lg:py-24">
        <div className="container-editorial">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <Reveal>
              <DisplayHeading number="07" eyebrow="Current Content" title="A curated" accent="continuation." />
            </Reveal>
            <Reveal delay={100}>
              <p className="text-sm text-ash max-w-xs leading-relaxed">Teaching, conversation, and worship for the week you are living.</p>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { to: '/teaching', label: 'YouTube', title: 'Led by the Spirit', text: 'A short teaching for the journey.' },
              { to: '/teaching', label: 'Podcast', title: 'The Creative Calling', text: 'A conversation about making with purpose.' },
              { to: '/ministry', label: 'Social Highlight', title: 'Make room for the work.', text: '' },
            ].map((item) => (
              <Link
                key={item.title}
                to={item.to}
                className="group flex min-h-[15rem] flex-col justify-between rounded-soft border-t-2 border-accent bg-surface p-6 transition-colors duration-500 hover:bg-line"
              >
                <div className="flex items-center justify-between">
                  <span className="text-eyebrow uppercase tracking-[0.16em] text-accent">{item.label}</span>
                  <ArrowUpRight className="h-5 w-5 text-ash transition-colors duration-300 group-hover:text-accent" />
                </div>
                <div>
                  <h3 className="font-display text-2xl text-cream">{item.title}</h3>
                  {item.text && <p className="mt-2 text-sm text-ash">{item.text}</p>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink py-20 lg:py-32">
        <img
          src={CREATIVE_IMAGE}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
          style={{ objectPosition: 'center 30%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        <div className="container-wide relative">
          <Reveal className="max-w-3xl">
            <DisplayHeading
              number="08"
              eyebrow="The Invitation"
              title={<>Know Christ.<br />Live purposefully.<br /></>}
              accent="Make Him known."
              size="lg"
            />
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ash">
              Bring the word to your city, your church, your event. Submit an invitation for a speaking engagement, conference, or interview.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/invite">
                <Button variant="primary" size="lg" withArrow>
                  Invite Emmanuel
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="secondary" size="lg">
                  Contact Directly
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
