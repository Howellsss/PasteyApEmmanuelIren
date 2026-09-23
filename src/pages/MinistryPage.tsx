import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  ArrowRight,
  BookOpen,
  Users,
  Calendar,
  Music2,
  PenLine,
  Sparkles,
} from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { ChapterMarker } from '@/components/ui/ChapterMarker';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TextLink } from '@/components/ui/TextLink';
import { Button } from '@/components/ui/Button';

const MINISTRY_IMAGE = '/images/ministry/e6.jpeg';
const ABOUT_IMAGE = '/images/about/image.png';
const CREATIVE_IMAGE = '/images/creative/e5.jpeg';
const TEACHING_IMAGE = '/images/teachings/ee26a11e-6a6d-46ab-8ac2-7450784831e3.png';

const IMG_CCI = 'IMAGE_REQUIRED — CCI';
const IMG_MANIFEST = 'IMAGE_REQUIRED — Manifest';
const IMG_TRIUMPH30 = 'IMAGE_REQUIRED — Triumph30';
const IMG_OUTBURST = 'IMAGE_REQUIRED — Outburst';
const IMG_EMMANUEL_MINISTERING = 'IMAGE_REQUIRED — Emmanuel ministering';

const ministryThemes = [
  {
    title: 'The Word',
    description:
      'Teaching scripture with clarity and depth is the foundation of every expression.',
  },
  {
    title: 'Discipleship',
    description:
      'Forming believers through daily devotionals, mentorship, and the 100 Days of Discipleship.',
  },
  {
    title: 'Purpose',
    description:
      'Calling every believer to discover, develop, and deploy their God-given purpose.',
  },
  {
    title: 'Culture',
    description:
      'Engaging film, music, and media as territory for the gospel, not territory to retreat from.',
  },
  {
    title: 'Leadership',
    description:
      'Equipping leaders within CCI and beyond, including the PFN Youth Wing presidency.',
  },
  {
    title: 'Gospel Advancement',
    description:
      'From a campus fellowship to 30 branches across four countries — the work keeps reaching further.',
  },
];

export function MinistryPage() {
  return (
    <div className="min-h-screen bg-ink">
      {/* HERO */}
      <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-24 overflow-hidden">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
            <div className="lg:col-span-8">
              <Reveal>
                <Eyebrow className="mb-6">
                  Ministry
                </Eyebrow>
                <h1 className="font-sans text-5xl sm:text-6xl lg:text-8xl font-extrabold leading-[0.98] text-cream text-balance tracking-[-0.04em] mb-8">
                  One Calling.<br />Many Expressions.
                </h1>
              </Reveal>
            </div>
            <div className="lg:col-span-4">
              <Reveal delay={120}>
                <p className="text-lg text-ash leading-relaxed text-pretty">
                  Emmanuel Iren's ministry extends across teaching, discipleship,
                  church leadership, prayer, music, culture, and Gospel advancement —
                  each expression carrying the same calling to a different context.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CCI — LARGE FEATURED EXPRESSION */}
      <section className="pb-16 lg:pb-24">
        <div className="container-wide">
          <Reveal variant="scale">
            <article className="grid grid-cols-1 lg:grid-cols-12 rounded-soft overflow-hidden bg-ink-2 text-cream">
              <div className="relative lg:col-span-8 aspect-[16/10] lg:aspect-auto min-h-[24rem] overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center bg-surface">
                  <span className="text-ash text-sm text-center px-6">
                    {IMG_CCI}
                  </span>
                </div>
              </div>
              <div className="lg:col-span-4 p-8 sm:p-10 lg:p-14 flex flex-col justify-center">
                <ChapterMarker number="01" label="The Church" />
                <h2 className="font-sans font-extrabold uppercase leading-[1.05] sm:leading-[1.05] lg:leading-[1.05] tracking-[-0.02em] text-balance text-3xl sm:text-4xl lg:text-[2.5rem] text-cream mb-5">
                  Celebration Church International
                </h2>
                <p className="text-white/65 leading-relaxed mb-8">
                  The founding ministry. Established in 2012 and renamed in 2014, CCI
                  is the local church at the centre of everything — with 30 branches
                  across Nigeria, the United Kingdom, Canada, and the United States,
                  and a global membership exceeding 100,000.
                </p>
                <div className="flex flex-wrap gap-4 text-meta text-white/50">
                  <span>Founded 2012</span>
                  <span className="w-1 h-1 rounded-pill bg-accent" />
                  <span>30 Branches</span>
                  <span className="w-1 h-1 rounded-pill bg-accent" />
                  <span>4 Countries</span>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* MANIFEST — SPLIT LAYOUT */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <Reveal variant="scale">
                <div className="relative aspect-[4/5] max-w-lg overflow-hidden rounded-soft bg-surface">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-ash text-sm text-center px-6">
                      {IMG_MANIFEST}
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <Reveal delay={100}>
                <ChapterMarker number="02" label="Bible Course" />
                <h2 className="font-sans font-extrabold uppercase leading-[1.05] sm:leading-[1.05] lg:leading-[1.05] tracking-[-0.02em] text-balance text-3xl sm:text-4xl lg:text-[2.5rem] text-cream mb-6">
                  Manifest
                </h2>
                <p className="text-lg text-ash leading-relaxed mb-8 text-pretty">
                  An interdenominational Bible course designed to take believers deeper
                  into scripture, regardless of church background. Manifest creates a
                  space for rigorous, accessible teaching that complements the local
                  church.
                </p>
                <TextLink>Learn more about Manifest</TextLink>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* TRIUMPH30 — IMAGE-LED, OVERLAPPING */}
      <section className="py-20 lg:py-32">
        <div className="container-wide">
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-7 relative">
              <Reveal variant="scale">
                <div className="relative aspect-[16/10] overflow-hidden rounded-soft bg-surface">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-ash text-sm text-center px-6">
                      {IMG_TRIUMPH30}
                    </span>
                  </div>
                </div>
              </Reveal>
              {/* Overlapping smaller image — offset on desktop */}
              <div className="hidden lg:block absolute -bottom-8 -right-8 w-40 h-52 rounded-soft overflow-hidden border-4 border-line shadow-lg shadow-black/30 bg-surface">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-ash text-xs text-center px-2">
                    {IMG_EMMANUEL_MINISTERING}
                  </span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal delay={100}>
                <ChapterMarker number="03" label="Devotional" />
                <h2 className="font-sans font-extrabold uppercase leading-[1.05] sm:leading-[1.05] lg:leading-[1.05] tracking-[-0.02em] text-balance text-3xl sm:text-4xl lg:text-[2.5rem] text-cream mb-6">
                  Triumph30
                </h2>
                <p className="text-lg text-ash leading-relaxed mb-6 text-pretty">
                  A daily devotional platform building a culture of prayer and Bible
                  study. Through daily write-ups and live devotionals streamed to a
                  global audience, Triumph30 partners with believers to develop a
                  consistent, rooted devotional life.
                </p>
                <div className="flex flex-wrap gap-4 text-meta text-ash">
                  <span>Daily Devotionals</span>
                  <span className="w-1 h-1 rounded-pill bg-accent" />
                  <span>Live Prayer</span>
                  <span className="w-1 h-1 rounded-pill bg-accent" />
                  <span>Global Reach</span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* OUTBURST — TYPOGRAPHY-LED DARK SECTION */}
      <section className="py-24 lg:py-36 bg-ink-2 text-cream overflow-hidden">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <Reveal>
                <ChapterMarker number="04" label="Music &amp; Creative" />
                <h2 className="font-sans font-extrabold uppercase leading-[1.05] sm:leading-[1.05] lg:leading-[1.05] tracking-[-0.02em] text-balance text-3xl sm:text-4xl lg:text-[2.5rem] text-cream mb-6">
                  Outburst
                </h2>
                <p className="text-lg text-white/65 leading-relaxed mb-8 text-pretty">
                  The music and creative expression born from the church choir. Through
                  Outburst Music Group, the ministry carries the message through worship
                  songs, live albums, and recordings — including Kerygma, Apostolos:
                  Sounds of Transition, and Spirituals.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['Kerygma', 'Apostolos', 'Spirituals'].map((album) => (
                    <span
                      key={album}
                      className="px-4 py-2 rounded-pill border border-white/15 text-sm text-white/70"
                    >
                      {album}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <Reveal variant="scale" delay={100}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-soft bg-white/5">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/30 text-sm text-center px-6">
                      {IMG_OUTBURST}
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* MINISTRY THEMES — RECURRENT AREAS */}
      <section className="py-24 lg:py-36">
        <div className="container-editorial">
          <SectionHeader
            numbered="05"
            eyebrow="Recurrent Themes"
           
            title="The same emphases, across every expression."
            description="Not official core values, but documented and observable areas that surface repeatedly across Emmanuel's teaching, leadership, and creative output."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line mt-14 rounded-soft overflow-hidden">
            {ministryThemes.map((theme, i) => (
              <Reveal
                key={theme.title}
                delay={(i % 3) * 80}
                className="bg-ink p-8 lg:p-10 group hover:bg-surface transition-colors duration-300"
              >
                <span className="font-display text-5xl text-accent tabular-nums leading-none block mb-4">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-2xl text-cream mb-3 leading-tight">
                  {theme.title}
                </h3>
                <p className="text-ash leading-relaxed text-pretty">
                  {theme.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING STATEMENT */}
      <section className="py-24 lg:py-36 bg-bone">
        <div className="container-editorial text-center">
          <Reveal>
            <ChapterMarker tone="light" label="One Calling" centered className="mb-8" />
            <h2 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-7xl leading-[0.98] tracking-[-0.04em] text-ink text-balance">
              Different platforms.<br />
              Same conviction.<br />
              <span className="text-accent">One Gospel.</span>
            </h2>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 lg:pb-36">
        <div className="container-editorial">
          <Reveal variant="scale">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <Link
                to="/teaching"
                className="group relative overflow-hidden rounded-soft bg-ink-2 text-cream p-10 lg:p-14 min-h-[16rem] flex flex-col justify-between border-t-2 border-accent hover:bg-line transition-colors duration-500"
              >
                <BookOpen className="w-6 h-6 text-accent mb-6" />
                <div>
                  <h3 className="font-display text-3xl mb-3 leading-tight">
                    Explore Teaching
                  </h3>
                  <p className="text-white/60 leading-relaxed max-w-xs">
                    Sermons, series, and conversations for the journey of faith.
                  </p>
                </div>
                <ArrowUpRight className="absolute top-10 right-10 w-6 h-6 text-white/30 group-hover:text-accent transition-colors duration-500" />
              </Link>
              <Link
                to="/invite"
                className="group relative overflow-hidden rounded-soft border border-line bg-ink text-cream p-10 lg:p-14 min-h-[16rem] flex flex-col justify-between hover:border-accent transition-colors duration-500"
              >
                <Calendar className="w-6 h-6 text-accent mb-6" />
                <div>
                  <h3 className="font-display text-3xl mb-3 leading-tight">
                    Invite Emmanuel
                  </h3>
                  <p className="text-ash leading-relaxed max-w-xs">
                    Bring the word to your city, your church, or your event.
                  </p>
                </div>
                <ArrowUpRight className="absolute top-10 right-10 w-6 h-6 text-ash group-hover:text-accent transition-colors duration-500" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
