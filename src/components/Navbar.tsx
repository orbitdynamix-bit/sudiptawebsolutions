import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Computer Academy', to: '/computer-academy' },
  { label: 'Corporate Training', to: '/services/corporate-training' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const close = () => setIsOpen(false);
    window.addEventListener('resize', close);
    return () => window.removeEventListener('resize', close);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-xl' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to={location.pathname.startsWith('/computer-academy') ? '/computer-academy' : '/'} className="group">
            {location.pathname.startsWith('/computer-academy') ? (
              <>
                <span className="block text-lg sm:text-xl font-black tracking-[0.12em] text-white group-hover:text-teal-200 transition-colors">
                  BHARAT COMPUTER ACADEMY
                </span>
                <span className="block text-[10px] sm:text-xs tracking-[0.28em] text-slate-400 uppercase">
                  Learn | Grow | Excel
                </span>
              </>
            ) : (
              <>
                <span className="block text-lg sm:text-xl font-black tracking-[0.12em] text-white group-hover:text-teal-200 transition-colors">
                  SUDIPTA WEB SOLUTIONS
                </span>
                <span className="block text-[10px] sm:text-xs tracking-[0.28em] text-slate-400 uppercase">
                  Software | SEO | Training
                </span>
              </>
            )}
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `group text-sm font-semibold transition-colors relative ${
                    isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
            <Link
              to="/computer-academy"
              className="px-5 py-2.5 rounded-xl btn-primary text-sm font-semibold transition-all"
            >
              Free Demo Class
            </Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2 rounded-lg border border-dark-border/80 bg-dark-light/60">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden glass border-t border-dark-border">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block py-2 text-sm font-semibold ${isActive ? 'text-white' : 'text-slate-300 hover:text-white'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/computer-academy"
              onClick={() => setIsOpen(false)}
              className="block text-center px-5 py-2.5 rounded-xl btn-primary text-sm font-semibold"
            >
              Free Demo Class
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
