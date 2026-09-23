import { useState } from 'react';
import { cn } from '@/lib/cn';
import {
  BookOpen,
  Music2,
  Film,
  Users,
  Mic,
} from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { ChapterMarker } from '@/components/ui/ChapterMarker';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CTASection } from '@/components/ui/CTASection';
import { InteractiveTimeline, type TimelineMilestone } from '@/components/ui/InteractiveTimeline';

const PORTRAIT_HERO = '/images/hero/image copy.webp';
const ABOUT_IMAGE = '/images/about/image.webp';
const TEACHING_IMAGE = '/images/teachings/ee26a11e-6a6d-46ab-8ac2-7450784831e3.webp';
const CREATIVE_IMAGE = '/images/creative/e5.webp';
const MINISTRY_IMAGE = '/images/ministry/e6.webp';
const TEACHING_IMAGE_2 = '/images/teachings/image copy.webp';
const TEACHING_IMAGE_3 = '/images/teachings/image copy 2.webp';

const CAMPUS_IMG = TEACHING_IMAGE_2;
const WORSHIP_IMG = TEACHING_IMAGE;
const CONGREGATION_IMG = MINISTRY_IMAGE;
const BOOK_IMG = TEACHING_IMAGE_3;
const MUSIC_IMG = CREATIVE_IMAGE;
const FILM_IMG = TEACHING_IMAGE_2;
const LEADERSHIP_IMG = TEACHING_IMAGE_3;
const FAMILY_IMG = ABOUT_IMAGE;

const milestones: TimelineMilestone[] = [
  {
    year: '2008',
    title: 'The Seed on Campus',
    description:
      'As an undergraduate at Covenant University, Emmanuel Iren starts Triumphal Youth Fellowship — a small campus gathering that would grow far beyond the university walls.',
    image: CAMPUS_IMG,
  },
  {
    year: '2011',
    title: 'Building Technology Degree',
    description:
      'Graduates from Covenant University with a Bachelor of Science in Building Technology, having already laid the groundwork for a ministry that would define the next decade.',
    image: ABOUT_IMAGE,
  },
  {
    year: '2012',
    title: 'Life Triumphal Church',
    description:
      'On 11 November 2012, the fellowship becomes Life Triumphal Church, opening its doors in Lagos as a full-time local church.',
    image: WORSHIP_IMG,
  },
  {
    year: '2014',
    title: 'Celebration Church International',
    description:
      'Life Triumphal Church is renamed Celebration Church International (CCI), reflecting a growing vision and a congregation that has outgrown its original walls.',
    image: CONGREGATION_IMG,
  },
  {
    year: '2017',
    title: 'Kerygma — The First Album',
    description:
      'Outburst Music Group releases Kerygma, the debut live album. Music becomes a defining expression of the ministry alongside the preached word.',
    image: MUSIC_IMG,
  },
  {
    year: '2022',
    title: 'Apostolos: Sounds of Transition',
    description:
      'The second album, featuring Sinach, Nosa, and Judikay, peaks among the top 10 on Apple Music and signals a widening creative reach.',
    image: TEACHING_IMAGE,
  },
  {
    year: '2024',
    title: 'What About Us — Film Debut',
    description:
      'Emmanuel Iren makes his debut as executive producer with the feature film What About Us, released nationwide on 12 July.',
    image: FILM_IMG,
  },
  {
    year: '2025',
    title: 'PFN Youth Wing President',
    description:
      'Inaugurated as President of the Pentecostal Fellowship of Nigeria (PFN) Youth Wing, a four-year role serving leaders across the nation.',
    image: LEADERSHIP_IMG,
  },
];

const ministryThemes = [
  {
    number: '01',
    title: 'The Word',
    description:
      'Teaching scripture with clarity and depth is the foundation of everything. His sermons are known for working through passages carefully, making doctrine accessible without diluting it.',
  },
  {
    number: '02',
    title: 'Discipleship',
    description:
      'The 100 Days of Discipleship (100DOD) online programme, daily Triumph30 devotionals, and mentorship pathways all reflect a commitment to forming believers, not merely informing them.',
  },
  {
    number: '03',
    title: 'Purpose',
    description:
      'A recurring message across his teaching: that every believer is called to discover, develop, and deploy their God-given purpose with intentionality.',
  },
  {
    number: '04',
    title: 'Culture',
    description:
      'Engaging contemporary culture — film, music, media, and conversation — as territory for the gospel rather than something to retreat from.',
  },
  {
    number: '05',
    title: 'Leadership',
    description:
      'Equipping leaders within CCI and beyond, including his role as PFN Youth Wing President, reflects a burden to raise a generation of spiritually grounded leaders.',
  },
  {
    number: '06',
    title: 'Gospel Advancement',
    description:
      'From campus fellowships to a church with 30 branches across four countries, the work is driven by a mandate to see the gospel reach further, faster.',
  },
];

const beyondPulpit = [
  {
    title: 'Books',
    icon: BookOpen,
    description:
      'Author of Leading Seeks You, Purposefully, Saving Grace, LoveCode, Am I Being Fooled?, and Pray Book — each making the life of faith practical.',
    image: BOOK_IMG,
  },
  {
    title: 'Music',
    icon: Music2,
    description:
      'President of Outburst Music Group. Albums include Kerygma, Apostolos: Sounds of Transition, and Spirituals, featuring collaborations with Sinach, Nosa, and Judikay.',
    image: MUSIC_IMG,
  },
  {
    title: 'Film',
    icon: Film,
    description:
      'Executive producer of What About Us (2024) and Meltdown (2026), bringing stories of faith, mental health, and family to the cinema.',
    image: FILM_IMG,
  },
  {
    title: 'Media',
    icon: Mic,
    description:
      'A growing YouTube channel carrying sermons, the 100 Days of Discipleship, and Triumph30 daily devotionals to a global audience.',
    image: TEACHING_IMAGE,
  },
  {
    title: 'Leadership',
    icon: Users,
    description:
      'Founder and Lead Pastor of CCI with 30 branches across Nigeria, the UK, Canada, and the USA. President of the PFN Youth Wing from 2025.',
    image: LEADERSHIP_IMG,
  },
];

const currentExpressions = [
  {
    name: 'Celebration Church International',
    description:
      'The local church at the centre of everything — 30 branches across Nigeria, the United Kingdom, Canada, and the United States, with a global membership exceeding 100,000.',
  },
  {
    name: 'Manifest',
    description:
      'An interdenominational Bible course designed to take believers deeper into scripture, regardless of church background.',
  },
  {
    name: 'Triumph30',
    description:
      'A daily devotional platform building a culture of prayer and Bible study, with live devotionals streamed to a global audience.',
  },
  {
    name: 'Outburst',
    description:
      'A music group and youth expression born from the church choir, carrying the message through worship songs, albums, and live recordings.',
  },
  {
    name: 'Teaching & Media',
    description:
      'Sermons, the 100 Days of Discipleship, films, and books — each a channel through which the same teaching reaches people wherever they are.',
  },
];

export function AboutPage() {
  const [activeTheme, setActiveTheme] = useState(0);

  return (
    <div className="min-h-screen bg-ink">
      {/* PAGE HERO */}
      <section className="relative min-h-[80vh] flex items-end overflow-hidden bg-ink-2">
        <div className="absolute inset-0">
          <img
            src={PORTRAIT_HERO}
            alt="Apostle Emmanuel Iren"
            className="h-full w-full object-cover"
            style={{ objectPosition: 'center top' }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-ink/50" />
        <div className="relative w-full px-6 sm:px-8 lg:px-16 pb-16 lg:pb-24 pt-32">
          <div className="container-wide">
            <Reveal className="max-w-3xl">
              <Eyebrow className="mb-6">
                About Emmanuel Iren
              </Eyebrow>
              <h1 className="font-sans text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.02] text-cream text-balance tracking-[-0.04em] mb-6">
                About Emmanuel Iren
              </h1>
              <p className="text-lg sm:text-xl text-white/85 leading-relaxed max-w-2xl font-light text-pretty">
                A Nigerian preacher, gospel songwriter, and founder of Celebration
                Church International — teaching the word, creating with purpose, and
                building a generation to live authentic Christian lives.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* THE JOURNEY */}
      <section className="py-24 lg:py-36">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
            <div className="lg:col-span-7">
              <Reveal>
                <ChapterMarker number="01" label="The Journey" />
                <h2 className="font-sans font-extrabold uppercase leading-[1.05] sm:leading-[1.05] lg:leading-[1.05] tracking-[-0.02em] text-balance text-3xl sm:text-4xl lg:text-[2.5rem] text-cream">
                  From a campus fellowship to a global church.
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal delay={120}>
                <p className="text-lg text-ash leading-relaxed text-pretty">
                  The story of Emmanuel Iren's ministry is one of steady, faithful
                  growth — from a small gathering of students to a church with branches
                  across four countries.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="space-y-6 max-w-3xl">
            <Reveal>
              <p className="text-lg text-ash leading-relaxed">
                In 2008, as an undergraduate at Covenant University in Ota, Nigeria,
                Emmanuel Iren started a Christian campus fellowship called the
                Triumphal Youth Fellowship. What began as a student gathering soon grew
                beyond the campus walls, drawing young people from surrounding
                communities and laying the foundation for what would become a
                full-time ministry.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-lg text-ash leading-relaxed">
                On 11 November 2012, the fellowship became Life Triumphal Church,
                opening its doors in Lagos. Two years later, in 2014, it was renamed
                Celebration Church International — a name that reflected a widening
                vision and a congregation that had outgrown its original walls.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <p className="text-lg text-ash leading-relaxed">
                In the years since, CCI has grown to over 100,000 members across 30
                branches in Nigeria, the United Kingdom, Canada, and the United States.
                Alongside the local church, Emmanuel Iren has built creative and
                discipleship platforms — music, film, books, daily devotionals — that
                carry the same teaching to a global audience. In June 2025, he was
                inaugurated as President of the Pentecostal Fellowship of Nigeria (PFN)
                Youth Wing, a position he holds for four years.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* INTERACTIVE TIMELINE */}
      <section className="py-20 lg:py-32 bg-surface">
        <div className="container-wide">
          <SectionHeader
            numbered="02"
            eyebrow="Milestones"
           
            title="A timeline of the work."
            description="Tap a year to explore the moments that shaped the journey — from a campus fellowship to a global ministry."
          />
          <Reveal variant="scale" className="mt-14">
            <InteractiveTimeline milestones={milestones} />
          </Reveal>
        </div>
      </section>

      {/* THE CALLING */}
      <section className="py-28 lg:py-44 bg-ink-2 text-cream overflow-hidden">
        <div className="container-editorial">
          <Reveal>
            <ChapterMarker number="03" label="The Calling" className="mb-8" />
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8">
              <Reveal>
                <h2 className="font-sans font-extrabold uppercase leading-[1.05] sm:leading-[1.05] lg:leading-[1.05] tracking-[-0.02em] text-balance text-3xl sm:text-4xl lg:text-[3.25rem] text-cream">
                  To teach the word faithfully, to create with purpose, and to build
                  people who will carry the message forward.
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-4">
              <Reveal delay={120}>
                <p className="text-lg text-white/65 leading-relaxed text-pretty">
                  The mandate is simple and unwavering: that the word of God, taught
                  with clarity and lived with integrity, has the power to transform not
                  just individuals but entire communities. Every expression of the
                  ministry — the church, the music, the books, the films — flows from
                  this single conviction.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* MINISTRY THEMES */}
      <section className="py-24 lg:py-36">
        <div className="container-editorial">
          <SectionHeader
            numbered="04"
            eyebrow="The Ministry"
            title="Recurrent themes in the work."
            description="Not official core values, but documented and observable areas that surface repeatedly across his teaching, leadership, and creative output."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16">
            {/* Theme list */}
            <div className="lg:col-span-5">
              <div className="border-t border-line">
                {ministryThemes.map((theme, i) => (
                  <button
                    key={theme.number}
                    onClick={() => setActiveTheme(i)}
                    className="group w-full text-left grid grid-cols-[2.5rem_1fr] gap-4 py-6 border-b border-line transition-colors duration-300"
                  >
                    <span
                      className={
                        'text-meta font-sans tabular-nums transition-colors duration-300 ' +
                        (activeTheme === i ? 'text-accent' : 'text-ash')
                      }
                    >
                      {theme.number}
                    </span>
                    <div>
                      <h3
                        className={
                          'font-display text-2xl leading-tight transition-colors duration-300 ' +
                          (activeTheme === i ? 'text-cream' : 'text-ash')
                        }
                      >
                        {theme.title}
                      </h3>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Active theme detail */}
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="sticky top-24">
                <div
                  key={activeTheme}
                  className="reveal-from-right"
                >
                  <span className="font-display text-7xl lg:text-8xl text-brand tabular-nums leading-none block mb-4">
                    {ministryThemes[activeTheme].number}
                  </span>
                  <h3 className="font-display text-3xl lg:text-4xl text-cream mb-6 leading-tight">
                    {ministryThemes[activeTheme].title}
                  </h3>
                  <p className="text-lg text-ash leading-relaxed text-pretty">
                    {ministryThemes[activeTheme].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BEYOND THE PULPIT */}
      <section className="py-24 lg:py-36 bg-surface overflow-hidden">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end mb-14">
            <div className="lg:col-span-7">
              <Reveal>
                <ChapterMarker number="05" label="Beyond the Pulpit" />
                <h2 className="font-sans font-extrabold uppercase leading-[1.05] sm:leading-[1.05] lg:leading-[1.05] tracking-[-0.02em] text-balance text-3xl sm:text-4xl lg:text-[2.5rem] text-cream">
                  The message travels through pages, melodies, and stories.
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal delay={100}>
                <p className="text-ash leading-relaxed text-pretty">
                  Books, music, film, media, and leadership — each a different medium
                  carrying the same conviction that faith is not just believed but
                  lived, and that the creative gifts of God's people are meant to be
                  deployed with excellence.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Cinematic grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {beyondPulpit.map((item, i) => {
              const Icon = item.icon;
              const isLarge = i === 0 || i === 4;
              return (
                <Reveal
                  key={item.title}
                  delay={i * 80}
                  variant="scale"
                  className={cn(
                    'group relative overflow-hidden rounded-soft bg-ink-2',
                    isLarge ? 'lg:row-span-2 min-h-[24rem]' : 'min-h-[20rem]',
                  )}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 transition-all duration-700 ease-out-quart group-hover:opacity-40 group-hover:scale-105"
                    style={{ objectPosition: 'center top' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />
                  <div className="relative h-full p-6 sm:p-8 flex flex-col justify-between text-cream">
                    <div className="flex items-center justify-between">
                      <Icon className="w-6 h-6 text-accent" />
                      <span className="text-meta uppercase tracking-widest text-white/40">
                        0{i + 1}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-display text-2xl lg:text-3xl mb-3 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-sm text-white/70 leading-relaxed max-w-xs">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAMILY */}
      <section className="py-24 lg:py-36 bg-bone">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <Reveal variant="scale">
                <div className="relative aspect-[4/3] overflow-hidden rounded-soft">
                  <img
                    src={FAMILY_IMG}
                    alt="Family at sunset"
                    loading="lazy"
                    className="w-full h-full object-cover image-warm"
                    style={{ objectPosition: 'center top' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent" />
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal delay={100}>
                <ChapterMarker tone="light" number="06" label="Family" />
                <h2 className="font-sans font-extrabold uppercase leading-[1.05] sm:leading-[1.05] lg:leading-[1.05] tracking-[-0.02em] text-balance text-3xl sm:text-4xl lg:text-[2.5rem] text-ink mb-6">
                  A life grounded in home.
                </h2>
                <div className="space-y-4 text-umber leading-relaxed">
                  <p>
                    Emmanuel Iren married Laju Iren (née Arenyeka) in November 2014.
                    Together they are parents to three daughters and one son.
                  </p>
                  <p>
                    The family remains a quiet foundation beneath the public work — a
                    reminder that the ministry, for all its reach, is carried by a man
                    who is also a husband and a father.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CURRENT EXPRESSION */}
      <section className="py-24 lg:py-36 bg-ink-2 text-cream overflow-hidden">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end mb-14">
            <div className="lg:col-span-7">
              <Reveal>
                <ChapterMarker number="07" label="Where the Ministry Is Today" />
                <h2 className="font-sans font-extrabold uppercase leading-[1.05] sm:leading-[1.05] lg:leading-[1.05] tracking-[-0.02em] text-balance text-3xl sm:text-4xl lg:text-[2.5rem] text-cream">
                  One calling, many expressions — all still growing.
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal delay={100}>
                <p className="text-white/65 leading-relaxed text-pretty">
                  Emmanuel Iren's personal ministry and the platforms of CCI are
                  inseparable. Each expression carries the same teaching to a different
                  context — the local church, the creative, the student, and the
                  searcher.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="border-t border-white/15">
            {currentExpressions.map((expr, i) => (
              <Reveal key={expr.name}>
                <div className="grid grid-cols-[2.5rem_1fr] gap-4 sm:gap-8 py-6 border-b border-white/15 group hover:bg-white/5 transition-colors duration-300 px-2 -mx-2 rounded-subtle">
                  <span className="text-meta text-accent tabular-nums pt-1">
                    0{i + 1}
                  </span>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                    <h3 className="font-display text-xl lg:text-2xl leading-tight">
                      {expr.name}
                    </h3>
                    <p className="text-sm text-white/55 leading-relaxed max-w-md sm:text-right">
                      {expr.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 lg:py-36">
        <div className="container-editorial">
          <CTASection
            eyebrow="Continue"
            title="Explore His Teachings"
            description="Sermons, conversations, and devotionals for the questions, decisions, and ordinary days that make up a life of faith."
            primaryLabel="Explore Teachings"
            primaryTo="/teaching"
            secondaryLabel="View Events"
            secondaryTo="/events"
          />
        </div>
      </section>
    </div>
  );
}
