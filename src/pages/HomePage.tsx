import {
  ArrowUpRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Headphones,
  MapPin,
  Play,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Player from '@vimeo/player';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { TextLink } from '@/components/ui/TextLink';
import { MediaCard } from '@/components/ui/MediaCard';
import { CTASection } from '@/components/ui/CTASection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CreativeAccordion } from '@/components/ui/CreativeAccordion';

const HERO_NAME = 'Apostle Emmanuel Iren';
const TEACHING_IMAGE = '/images/teachings/ee26a11e-6a6d-46ab-8ac2-7450784831e3.png';
const ABOUT_IMAGE = '/images/about/image copy.png';
const CREATIVE_IMAGE = '/images/creative/e5.jpeg';
const MINISTRY_IMAGE = '/images/ministry/e6.jpeg';
const TEACHING_IMAGE_2 = '/images/teachings/image copy.png';
const TEACHING_IMAGE_3 = '/images/teachings/image copy 2.png';

const latestTeachings = [
  {
    series: 'The Word',
    title: 'Vigour: Stewarding the Body',
    description: 'A life-changing teaching on how God calls us to honour Him through the careful stewardship of our physical bodies.',
    date: 'September 2025',
    type: 'Video',
    image: '/images/teachings/image copy 3.png',
    imagePosition: 'center center',
    watchUrl: 'https://www.youtube.com/watch?v=iZAt3VZMJAI',
  },
  {
    series: 'The Word',
    title: "God's Good Design",
    description: "Discover the intentionality behind God's design for your life — purpose, pattern, and the beauty of His sovereign plan.",
    date: 'September 2025',
    type: 'Video',
    image: '/images/teachings/image copy 4.png',
    imagePosition: 'center center',
    watchUrl: 'https://www.youtube.com/live/qsTHhh7f8pQ',
  },
  {
    series: 'The Word',
    title: 'The Grace of Giving',
    description: 'Understanding giving not as an obligation but as a grace — a reflection of the generosity God has already shown us.',
    date: 'September 2025',
    type: 'Video',
    image: '/images/teachings/image copy 5.png',
    imagePosition: 'center center',
    watchUrl: 'https://youtu.be/53oy7e5CTKQ',
  },
  {
    series: 'The Word',
    title: 'The God Who Blesses',
    description: 'A powerful message on the nature of God as the One who blesses — and what it means to walk in His covenant promises.',
    date: 'September 2025',
    type: 'Video',
    image: '/images/teachings/image copy 6.png',
    imagePosition: 'center top',
    watchUrl: 'https://youtu.be/WWDlFiYpBOY',
  },
  {
    series: 'The Word',
    title: 'Fervent in Spirit',
    description: 'Rekindling the flame of spiritual fervency and learning how to maintain a burning heart in every season of life.',
    date: 'September 2025',
    type: 'Video',
    image: '/images/teachings/image copy 7.png',
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

export function HomePage() {
  const [typedHeroName, setTypedHeroName] = useState('');
  const [hasFinishedIntro, setHasFinishedIntro] = useState(false);
  const [activeTeachingIndex, setActiveTeachingIndex] = useState(0);
  const [isTeachingPaused, setIsTeachingPaused] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const heroPlayerRef = useRef<Player | null>(null);
  const heroIframeRef = useRef<HTMLIFrameElement | null>(null);
  const HERO_VIDEO_CUTOFF = 28;

  useEffect(() => {
    if (hasFinishedIntro) return;

    let characterIndex = 0;
    const typeInterval = window.setInterval(() => {
      characterIndex += 1;
      setTypedHeroName(HERO_NAME.slice(0, characterIndex));

      if (characterIndex === HERO_NAME.length) {
        window.clearInterval(typeInterval);
        setHasFinishedIntro(true);
      }
    }, 150);

    return () => window.clearInterval(typeInterval);
  }, [hasFinishedIntro]);

  useEffect(() => {
    if (!heroIframeRef.current) return;

    const player = new Player(heroIframeRef.current);
    heroPlayerRef.current = player;

    player.on('loaded', () => {
      player.setMuted(true).catch(() => {});
      player.play().catch(() => {});
    });

    player.on('playing', () => {
      setIsVideoReady(true);
    });

    player.on('timeupdate', (data: { seconds: number }) => {
      if (data.seconds >= HERO_VIDEO_CUTOFF) {
        player.setCurrentTime(0).then(() => {
          player.play().catch(() => {});
        }).catch(() => {});
      }
    });

    const readyFallback = window.setTimeout(() => setIsVideoReady(true), 8000);

    return () => {
      window.clearTimeout(readyFallback);
      player.destroy().catch(() => {});
    };
  }, []);

  useEffect(() => {
    if (isTeachingPaused) return;

    const teachingTimer = window.setInterval(() => {
      setActiveTeachingIndex((index) => (index + 1) % latestTeachings.length);
    }, 3800);

    return () => window.clearInterval(teachingTimer);
  }, [isTeachingPaused]);

  return (
    <div className="min-h-screen bg-ivory">
      <section className="relative min-h-screen flex items-end overflow-hidden bg-ink">
        <div className="absolute inset-0 overflow-hidden bg-ink">
          <iframe
            ref={heroIframeRef}
            src="https://player.vimeo.com/video/1229309895?autoplay=1&loop=1&autopause=0&controls=0&title=0&byline=0&portrait=0&badge=0&dnt=1&pip=0&keyboard=0&muted=1"
            allow="autoplay; fullscreen; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            title="What an explosive time in the word we had on sunday!"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-0"
            style={{
              width: 'max(100%, calc(100vh * 16 / 9))',
              height: 'max(100%, calc(100vw * 9 / 16))',
            }}
          />
          <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-20 w-56 bg-gradient-to-l from-ink/80 via-ink/35 to-transparent" />
          <div
            aria-hidden="true"
            className={`absolute inset-0 bg-ink z-10 transition-opacity duration-1000 ${isVideoReady ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-transparent to-transparent" />
        <div className="relative w-full px-6 sm:px-8 lg:px-16 pb-16 lg:pb-24 pt-32 flex justify-center text-center">
          <Reveal className="w-full max-w-4xl flex flex-col items-center">
            <div className="mb-8 flex items-center justify-center gap-4">
              <span aria-hidden="true" className="h-0.5 w-10 bg-rust sm:w-14" />
              <span className="text-eyebrow font-sans uppercase tracking-widest text-cream">
                Apostle · Teacher · Author
              </span>
              <span aria-hidden="true" className="h-0.5 w-10 bg-rust sm:w-14" />
            </div>
            <h1 className="font-sans text-5xl sm:text-6xl lg:text-8xl font-extrabold leading-[0.98] text-cream text-balance mb-8 tracking-[-0.04em] min-h-[0.98em]">
              {typedHeroName}
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-taupe leading-relaxed max-w-2xl mb-10 text-pretty font-light">
              A teaching minister, author, songwriter, and founder of Celebration Church International.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Link to="/teaching">
                <Button variant="rust" size="lg" withArrow className="rounded-pill">
                  Explore Teachings
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline-dark" size="lg" className="rounded-pill">
                  Discover Emmanuel
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-onyx py-20 text-cream lg:py-28">
        <div className="container-wide">
          <div className="mb-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <Reveal>
              <div className="mb-5 flex items-center gap-4">
                <span className="h-px w-14 bg-rust-light/70" />
                <span className="text-eyebrow uppercase tracking-[0.2em] text-rust-light">Teachings</span>
              </div>
              <h2 className="max-w-3xl font-sans text-4xl font-extrabold uppercase leading-[0.98] tracking-[-0.04em] text-cream sm:text-5xl lg:text-7xl">
                Latest <span className="text-rust-light">Teachings</span>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <Link to="/teaching">
                <TextLink tone="rust-light">Browse the library</TextLink>
              </Link>
            </Reveal>
          </div>

          <Reveal variant="scale">
            <article className="grid overflow-hidden rounded-soft border border-graphite bg-[#1a1a1a] lg:grid-cols-[0.92fr_1.08fr]">
              <div className="order-2 flex min-h-[28rem] flex-col border-t border-graphite p-8 sm:p-10 lg:order-1 lg:min-h-[34rem] lg:border-t-0 lg:border-r lg:border-graphite lg:p-12">
                <div className="flex-1 space-y-5 lg:flex lg:flex-col lg:justify-center">
                  <p className="text-eyebrow uppercase tracking-[0.16em] text-rust-light">{latestTeachings[activeTeachingIndex].series}</p>
                  <h3 className="max-w-lg font-display text-3xl leading-[1.1] text-cream sm:text-4xl">
                    {latestTeachings[activeTeachingIndex].title}
                  </h3>
                  <p className="max-w-md text-sm font-light leading-7 text-taupe">
                    {latestTeachings[activeTeachingIndex].description}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-meta text-taupe">
                    <span>{latestTeachings[activeTeachingIndex].date}</span>
                    <span className="h-1 w-1 rounded-pill bg-rust-light/60" />
                    <span>{latestTeachings[activeTeachingIndex].type}</span>
                  </div>
                  <div className="pt-2">
                    <a
                      href={latestTeachings[activeTeachingIndex].watchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline-dark" size="md" withArrow>
                        Watch Now
                      </Button>
                    </a>
                  </div>
                </div>
                <div className="mt-10 flex items-center justify-between border-t border-graphite pt-6">
                  <div className="flex items-center gap-5" role="tablist" aria-label="Latest teachings">
                    {latestTeachings.map((teaching, index) => (
                      <button
                        key={teaching.title}
                        type="button"
                        role="tab"
                        aria-selected={activeTeachingIndex === index}
                        aria-label={`Show ${teaching.title}`}
                        onClick={() => setActiveTeachingIndex(index)}
                        className={`relative pb-2 text-xs tracking-[0.12em] transition-colors ${activeTeachingIndex === index ? 'text-rust-light' : 'text-white/25 hover:text-white/60'}`}
                      >
                        {String(index + 1).padStart(2, '0')}
                        <span className={`absolute bottom-0 left-0 h-px bg-rust-light transition-all duration-300 ${activeTeachingIndex === index ? 'w-full' : 'w-0'}`} />
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      aria-label="Previous teaching"
                      onClick={() => setActiveTeachingIndex((index) => (index - 1 + latestTeachings.length) % latestTeachings.length)}
                      className="flex h-9 w-9 items-center justify-center text-white/45 transition-colors hover:text-rust-light"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      aria-label="Next teaching"
                      onClick={() => setActiveTeachingIndex((index) => (index + 1) % latestTeachings.length)}
                      className="flex h-9 w-9 items-center justify-center text-white/45 transition-colors hover:text-rust-light"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
              <div
                className="order-1 relative min-h-[24rem] overflow-hidden bg-[#0a0a0a] lg:order-2 lg:min-h-[34rem]"
                onMouseEnter={() => setIsTeachingPaused(true)}
                onMouseLeave={() => setIsTeachingPaused(false)}
                onFocus={() => setIsTeachingPaused(true)}
                onBlur={() => setIsTeachingPaused(false)}
              >
                <img
                  key={latestTeachings[activeTeachingIndex].image}
                  src={latestTeachings[activeTeachingIndex].image}
                  alt={`Apostle Emmanuel Iren — ${latestTeachings[activeTeachingIndex].title}`}
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
                  style={{ objectPosition: latestTeachings[activeTeachingIndex].imagePosition }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/20 via-transparent to-transparent" />
                <a
                  href={latestTeachings[activeTeachingIndex].watchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Watch ${latestTeachings[activeTeachingIndex].title}`}
                  className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-black/40 text-white backdrop-blur-sm transition-transform duration-300 hover:scale-110 hover:border-white"
                >
                  <Play className="ml-1 h-6 w-6" fill="currentColor" />
                </a>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="py-24 lg:py-36" style={{ backgroundColor: '#E8DFD2' }}>
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <Reveal variant="scale">
                <div className="relative aspect-[4/5] lg:aspect-[3/4] max-w-none overflow-hidden rounded-soft">
                  <img
                    src={ABOUT_IMAGE}
                    alt="Emmanuel Iren speaking on stage"
                    className="w-full h-full object-cover bg-charcoal transition-transform duration-700 ease-out-quart hover:scale-[1.02]"
                    style={{ objectPosition: 'center center' }}
                    loading="eager"
                  />
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-5 lg:col-start-9">
              <Reveal delay={100}>
                <Eyebrow tone="rust" className="mb-6">About Emmanuel</Eyebrow>
                <h2 className="font-display text-3xl lg:text-5xl leading-[1.1] text-ink text-balance mb-6">
                  A life given to Christ and His purpose.
                </h2>
                <div className="space-y-5 text-umber leading-relaxed">
                  <p>
                    Apostle Emmanuel Iren is the founder and lead pastor of Celebration Church International, a teacher of God’s Word, author, songwriter, and ministry leader.
                  </p>
                  <p>
                    His work brings together sound teaching, creative expression, and a deep commitment to helping people live their faith with clarity and purpose.
                  </p>
                </div>
                <Link to="/about" className="inline-block mt-8">
                  <TextLink tone="rust">Read His Story</TextLink>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32" style={{ backgroundColor: '#F6F2EB' }}>
        <div className="container-editorial">
          <SectionHeader
            eyebrow="Teaching"
            title="Teach the word. Live the word."
            tone="rust"
            titleClassName="text-ink"
            descriptionClassName="text-umber"
            description="Sermons and conversations for the questions, decisions, and ordinary days that make up a life of faith."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 mt-14">
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
          <Reveal className="mt-12">
            <Link to="/teaching">
              <TextLink tone="rust">Explore Teachings</TextLink>
            </Link>
          </Reveal>
        </div>
      </section>

      <CreativeAccordion />

      <section className="py-20 lg:py-32 bg-walnut text-cream overflow-hidden">
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
            <div className="lg:col-span-6 lg:order-1">
              <Reveal>
                <Eyebrow tone="rust-lighter" className="mb-6">Ministry</Eyebrow>
                <h2 className="font-display text-4xl lg:text-6xl leading-[1.05] text-balance mb-6">
                  One calling. Many expressions.
                </h2>
                <p className="text-taupe leading-relaxed max-w-xl mb-10">
                  A growing family of ministry expressions, each carrying the same invitation to know Christ, live purposefully, and make Him known.
                </p>
                <div className="border-t border-bark">
                  {ministryExpressions.map((expression, index) => (
                    <div key={expression.name} className="grid grid-cols-[2.5rem_1fr] gap-4 py-5 border-b border-bark">
                      <span className="text-meta text-rust-lighter">0{index + 1}</span>
                      <div>
                        <h3 className="font-display text-xl text-taupe mb-1">{expression.name}</h3>
                        <p className="text-sm text-taupe leading-relaxed max-w-md">{expression.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/ministry" className="inline-block mt-8">
                  <TextLink tone="rust-lighter">Explore Ministry</TextLink>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-36" style={{ backgroundColor: '#E8DFD2' }}>
        <div className="container-editorial">
          <SectionHeader
            eyebrow="Events"
            tone="rust"
            titleClassName="text-ink"
            title="Where Apostle Emmanuel Iren is ministering."
          />
          <Reveal variant="scale" className="mt-14">
            <article className="grid grid-cols-1 lg:grid-cols-12 rounded-soft overflow-hidden bg-cream border border-stone/20">
              <div className="lg:col-span-7 aspect-[4/5] lg:aspect-auto min-h-[20rem] overflow-hidden">
                <img
                  src={TEACHING_IMAGE}
                  alt="Emmanuel Iren ministering at an event"
                  className="w-full h-full object-cover image-warm"
                  style={{ objectPosition: 'center top' }}
                />
              </div>
              <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
                <Eyebrow tone="rust" className="mb-5">Upcoming Event</Eyebrow>
                <h3 className="font-display text-3xl leading-tight text-ink mb-6">Triumph30 — Lagos</h3>
                <div className="space-y-3 text-sm text-umber mb-8">
                  <p className="flex items-center gap-3"><Calendar className="w-4 h-4 text-rust" /> Saturday, October 18, 2026</p>
                  <p className="flex items-center gap-3"><MapPin className="w-4 h-4 text-rust" /> Eko Hotels, Lagos</p>
                  <p className="text-eyebrow uppercase tracking-widest text-rust pl-7">Prayer & Worship Gathering</p>
                </div>
                <Link to="/events">
                  <Button variant="rust" size="md" withArrow className="rounded-pill">Details & Registration</Button>
                </Link>
              </div>
            </article>
          </Reveal>
          <Reveal className="mt-10">
            <Link to="/events">
              <TextLink tone="rust">View All Events</TextLink>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="py-20 lg:py-28" style={{ backgroundColor: '#F6F2EB' }}>
        <div className="container-editorial">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <Reveal>
              <Eyebrow tone="rust" className="mb-5">Current Content</Eyebrow>
              <h2 className="font-display text-3xl lg:text-5xl leading-[1.1] text-ink">A curated continuation.</h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-sm text-umber max-w-xs leading-relaxed">Teaching, conversation, and worship for the week you are living.</p>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Link to="/teaching" className="group p-6 rounded-soft bg-ink text-cream min-h-[16rem] flex flex-col justify-between hover:bg-rust transition-colors duration-500">
              <div className="flex items-center justify-between"><Play className="w-5 h-5 text-rust-light group-hover:text-cream transition-colors duration-500" /><span className="text-meta uppercase tracking-widest text-white/50">YouTube</span></div>
              <div><h3 className="font-display text-2xl mb-2">Led by the Spirit</h3><p className="text-sm text-white/60">A short teaching for the journey.</p></div>
            </Link>
            <Link to="/teaching" className="group p-6 rounded-soft border border-white/15 bg-walnut min-h-[16rem] flex flex-col justify-between hover:bg-rust hover:border-rust transition-colors duration-500">
              <div className="flex items-center justify-between"><Headphones className="w-5 h-5 text-rust-lighter group-hover:text-cream transition-colors duration-500" /><span className="text-meta uppercase tracking-widest text-white/50 group-hover:text-white/70 transition-colors duration-500">Podcast</span></div>
              <div><h3 className="font-display text-2xl text-cream mb-2">The Creative Calling</h3><p className="text-sm text-white/60 group-hover:text-white/80 transition-colors duration-500">A conversation about making with purpose.</p></div>
            </Link>
            <Link to="/ministry" className="group overflow-hidden rounded-soft min-h-[16rem] bg-sand p-6 flex flex-col justify-between hover:bg-rust transition-colors duration-500">
              <div className="flex justify-end"><ArrowUpRight className="w-5 h-5 text-rust group-hover:text-cream transition-colors duration-500" /></div>
              <div><span className="text-meta uppercase tracking-widest text-rust group-hover:text-cream transition-colors duration-500">Social Highlight</span><h3 className="font-display text-2xl text-ink group-hover:text-cream transition-colors duration-500 mt-2">Make room for the work.</h3></div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-28 lg:py-44" style={{ backgroundColor: '#3B2F27' }}>
        <div className="container-editorial text-center">
          <Reveal>
            <p className="text-eyebrow uppercase tracking-[0.3em] text-rust-lighter mb-8">The Invitation</p>
            <h2 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-7xl leading-[0.98] tracking-[-0.04em] text-cream text-balance">
              Know Christ.<br />
              Live purposefully.<br />
              Make Him known.
            </h2>
          </Reveal>
        </div>
      </section>

      <section className="pb-20 lg:pb-28" style={{ backgroundColor: '#3B2F27' }}>
        <div className="container-editorial">
          <CTASection
            eyebrow="Invite Emmanuel"
            title="Bring the word to your city, your church, your event."
            description="Submit an invitation for a speaking engagement, conference, or interview."
            primaryLabel="Invite Emmanuel"
            secondaryLabel="Contact Directly"
            variant="ink"
          />
        </div>
      </section>
    </div>
  );
}
