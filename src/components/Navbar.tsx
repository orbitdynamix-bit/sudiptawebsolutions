import { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';

const navLinks = ['Home', 'Services', 'Projects', 'About', 'Contact'];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-xl' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-teal-500 to-accent flex items-center justify-center group-hover:scale-110 transition-transform">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">SudiptaInfotech</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-slate-300 hover:text-white transition-colors relative group text-sm font-semibold"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-xl btn-primary text-sm font-semibold transition-all"
            >
              Get Started
            </a>
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
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="block text-slate-300 hover:text-white py-2 text-sm font-semibold"
              >
                {link}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="block text-center px-5 py-2.5 rounded-xl btn-primary text-sm font-semibold"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
