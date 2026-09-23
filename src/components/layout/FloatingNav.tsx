import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
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
          scrolled ? 'w-[calc(100%-3rem)] max-w-[72rem]' : 'w-[calc(100%-3rem)] max-w-[72rem]'
        )}
      >
        <div
          className={cn(
            'flex min-h-[72px] items-center justify-between rounded-pill px-3 transition-all duration-500 ease-out-quart',
            scrolled
              ? 'bg-charcoal/90 backdrop-blur-xl shadow-lg shadow-charcoal/10 border border-white/10'
              : 'bg-charcoal/40 backdrop-blur-md border border-white/10'
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
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal',
                      isActive
                        ? 'text-soft-white'
                        : 'text-white/70 hover:text-soft-white'
                    )
                  }
                >
                  {({ isActive }) => (
                    <span className="group/link relative inline-block">
                      {item.label}
                      <span
                        className={cn(
                          'absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-px bg-gold transition-all duration-300',
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
                'hidden lg:inline-flex items-center px-5 py-2 mr-2 text-sm font-medium rounded-button transition-all duration-300',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal',
                isActive
                  ? 'bg-gold text-charcoal'
                  : 'bg-burgundy text-soft-white hover:bg-burgundy-dark'
              )
            }
          >
            Contact
          </NavLink>

          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden flex items-center justify-center w-11 h-11 mr-2 text-soft-white rounded-pill hover:bg-white/10 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
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
          className="absolute inset-0 bg-charcoal/95 backdrop-blur-xl"
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={cn(
            'absolute right-0 top-0 bottom-0 w-full max-w-sm bg-ivory flex flex-col transition-transform duration-500 ease-out-quart',
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-stone/30">
            <span className="font-display text-lg text-charcoal">Menu</span>
            <button
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center w-10 h-10 text-charcoal rounded-pill hover:bg-charcoal/5 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-burgundy"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <ul className="flex flex-col py-4 overflow-y-auto">
            {[...NAV_ITEMS, { label: 'Contact', path: '/contact' }].map((item, index) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-baseline gap-4 px-6 py-3.5 text-lg font-display transition-colors duration-300',
                      isActive ? 'text-burgundy' : 'text-charcoal hover:text-burgundy'
                    )
                  }
                >
                  <span className="text-meta font-sans text-stone tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
