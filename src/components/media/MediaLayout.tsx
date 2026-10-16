/* The frame shared by every Media page: heading, section menu and the "More from Media" links. */
import { Link, NavLink } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { DisplayHeading } from '@/components/ui/DisplayHeading';
import { Reveal } from '@/components/ui/Reveal';
import { mediaSections } from '@/data/media';
import { cn } from '@/lib/cn';

export function MediaHero({ title, accent, intro }: { title: string; accent?: string; intro: string }) {
  return (
    <section className="pt-32 pb-10 lg:pt-44 lg:pb-14">
      <div className="container-wide">
        <Reveal variant="left">
          <div className="mb-6 flex items-center gap-4">
            <span aria-hidden="true" className="h-0.5 w-10 bg-brand" />
            <span className="text-eyebrow uppercase tracking-[0.2em] text-accent">Media</span>
          </div>
          <h1 className="font-display text-5xl leading-[0.98] tracking-[-0.01em] text-cream text-balance sm:text-6xl lg:text-7xl">
            {title}
            {accent && (
              <>
                {' '}
                <span className="text-brand">{accent}</span>
              </>
            )}
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-ash text-pretty sm:text-xl">{intro}</p>
        </Reveal>
      </div>
    </section>
  );
}

/** A quiet row of the Media sections under each page's heading. */
export function MediaSubnav() {
  return (
    <nav aria-label="Media sections" className="border-y border-line">
      <div className="container-wide">
        <ul className="scrollbar-thin -mx-1 flex gap-1 overflow-x-auto py-3">
          {mediaSections.map((section) => (
            <li key={section.path} className="flex-shrink-0">
              <NavLink
                to={section.path}
                end
                className={({ isActive }) =>
                  cn(
                    'block rounded-pill px-4 py-2 text-sm transition-colors duration-300',
                    isActive ? 'bg-surface text-cream' : 'text-ash hover:text-cream'
                  )
                }
              >
                {section.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

/** The page's one navy chapter: the other Media sections. */
export function MoreFromMedia({ current }: { current: string }) {
  const others = mediaSections.filter((s) => s.path !== current && s.path !== '/media');
  return (
    <section className="bg-navy py-14 md:py-16 lg:py-24">
      <div className="container-wide">
        <Reveal variant="left" className="mb-10">
          <DisplayHeading eyebrow="Keep exploring" title="More from" accent="Media." tone="light" />
        </Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((section, index) => (
            <Reveal key={section.path} variant="right" delay={index * 100}>
              <Link
                to={section.path}
                className="group flex h-full min-h-[10rem] flex-col justify-between rounded-soft border-t-2 border-brand bg-navy-2 p-6 transition-colors duration-300 hover:bg-[#062b3e]"
              >
                <ArrowUpRight className="h-5 w-5 self-end text-mist transition-colors duration-300 group-hover:text-accent" />
                <div>
                  <h3 className="font-display text-xl text-cream">{section.label}</h3>
                  <p className="mt-1 text-sm text-mist">{section.blurb}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
