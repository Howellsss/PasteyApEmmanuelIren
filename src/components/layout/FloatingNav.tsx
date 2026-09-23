import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';
import { cn } from '@/lib/cn';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Teaching', path: '/teaching' },
  { label: 'Ministry', path: '/ministry' },
  { label: 'Events', path: '/events' },
  { label: 'Invite', path: '/invite' },
];

export function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={cn(
          'fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out-quart',
          'w-[calc(100%-2rem)] max-w-[80rem]'
        )}
      >
        <div
          className={cn(
            'flex min-h-[80px] items-center justify-between rounded-pill px-3 transition-all duration-500 ease-out-quart',
            // Glass: see-through fill with a light blur, and a visible edge so the container still reads.
            'backdrop-blur-[6px] border border-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]',
            scrolled ? 'bg-ink/40' : 'bg-white/5'
          )}
        >
          <ul className="hidden lg:flex flex-1 items-center justify-evenly gap-1 px-4">
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    cn(
                      'relative px-3.5 py-2 text-sm font-medium rounded-pill transition-all duration-300',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink',
                      isActive
                        ? 'text-cream'
                        : 'text-white/70 hover:text-cream'
                    )
                  }
                >
                  {({ isActive }) => (
                    <span className="group/link relative inline-block">
                      {item.label}
                      <span
                        className={cn(
                          'absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-px bg-accent transition-all duration-300',
                          isActive
                            ? 'w-4 opacity-100'
                            : 'w-0 opacity-0 group-hover/link:w-4 group-hover/link:opacity-100'
                        )}
                      />
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Contact CTA — contained within the nav */}
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              cn(
                'hidden lg:inline-flex items-center px-5 py-2 mr-2 text-sm font-medium rounded-xl transition-all duration-300',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink',
                isActive
                  ? 'bg-brand-dark text-cream'
                  : 'bg-brand text-cream hover:bg-brand-dark'
              )
            }
          >
            Contact
          </NavLink>

          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden flex items-center justify-center w-11 h-11 mr-2 text-cream rounded-pill hover:bg-white/10 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          'fixed inset-0 z-50 lg:hidden transition-all duration-500 ease-out-quart',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <div
          className="absolute inset-0 bg-ink-2/95 backdrop-blur-xl"
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={cn(
            'absolute right-0 top-0 bottom-0 w-full max-w-sm bg-ink flex flex-col transition-transform duration-500 ease-out-quart',
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-line">
            <span className="text-eyebrow uppercase tracking-[0.2em] text-ash">Menu</span>
            <button
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center w-10 h-10 text-cream rounded-pill hover:bg-surface transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <ul className="flex flex-col px-6 py-4 overflow-y-auto">
            {[...NAV_ITEMS, { label: 'Contact', path: '/contact' }].map((item, index) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-baseline gap-4 border-b border-line py-4 font-sans text-2xl font-extrabold tracking-[-0.03em] transition-colors duration-300 focus:outline-none focus-visible:text-accent',
                      isActive ? 'text-accent' : 'text-cream hover:text-accent'
                    )
                  }
                >
                  <span className="text-[0.8125rem] font-semibold tabular-nums tracking-normal text-accent">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-auto border-t border-line p-6">
            <NavLink
              to="/invite"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2.5 rounded-button bg-cream px-6 py-4 text-base font-semibold text-ink transition-colors duration-300 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Invite Emmanuel <ArrowRight className="h-4 w-4 text-accent" />
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
