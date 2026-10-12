import { useState } from 'react';
import { Github, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiPost } from '../lib/api';

const footerLinks = {
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Careers', to: '/contact' },
    { label: 'Client Reviews', to: '/reviews' },
    { label: 'Contact', to: '/contact' },
  ],
  Services: [
    { label: 'Web Development', to: '/services/web-development' },
    { label: 'Digital Marketing & SEO', to: '/services/digital-marketing-seo' },
    { label: 'Corporate Training', to: '/services/corporate-training' },
    { label: 'Cloud Solutions', to: '/services/cloud-solutions' },
  ],
  Resources: [
    { label: 'All Services', to: '/services' },
    { label: 'Book Appointment', to: '/contact' },
    { label: 'Project Query', to: '/contact' },
    { label: 'Address (Kolkata)', to: '/contact' },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [subscribeError, setSubscribeError] = useState('');
  const currentYear = new Date().getFullYear();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedEmail = email.trim();
    if (normalizedEmail) {
      setSubscribing(true);
      setSubscribeError('');

      try {
        await apiPost('/subscribers', { email: normalizedEmail });
        setSubscribed(true);
        setEmail('');
        setTimeout(() => setSubscribed(false), 3000);
      } catch (error) {
        setSubscribeError(error instanceof Error ? error.message : 'Subscription failed.');
      } finally {
        setSubscribing(false);
      }
    }
  };

  return (
    <footer className="border-t border-dark-border bg-dark-light/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="block text-xl font-black tracking-[0.12em] text-white">SUDIPTA WEB SOLUTIONS</span>
              <span className="block text-[11px] tracking-[0.28em] uppercase text-slate-400">Software | SEO | Training</span>
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-sm">
              Building scalable software, SEO growth systems and practical corporate training programs for modern teams.
            </p>
            <div className="space-y-1 mb-6 text-sm">
              <p className="text-slate-300">
                Email:{' '}
                <a href="mailto:sudiptawebsolution@gmail.com" className="text-white hover:text-teal-200 transition-colors">
                  sudiptawebsolution@gmail.com
                </a>
              </p>
              <p className="text-slate-300">
                Phone:{' '}
                <a href="tel:9007673274" className="text-white hover:text-teal-200 transition-colors">
                  9007673274
                </a>
              </p>
            </div>
            <div className="flex gap-3">
              {[Github, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <button key={i} className="w-10 h-10 rounded-xl bg-dark-card border border-dark-border flex items-center justify-center text-slate-500 hover:text-white hover:border-accent/60 transition-all">
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-slate-300 text-sm hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary/12 to-accent/12 border border-primary/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-xl font-bold text-white mb-1">Subscribe for Updates</h4>
              <p className="text-slate-300 text-sm">
                Receive service launches, vacancy updates and training schedules from SUDIPTA WEB SOLUTIONS.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-3 w-full md:w-auto">
              {subscribed ? (
                <div className="text-green-400 font-medium">✓ Subscribed successfully!</div>
              ) : (
                <>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter email for subscription"
                    className="px-4 py-3 rounded-xl bg-dark-card border border-dark-border text-white placeholder-slate-600 focus:outline-none focus:border-primary transition-colors w-full md:w-72"
                  />
                  <button
                    type="submit"
                    disabled={subscribing}
                    className="px-6 py-3 rounded-xl btn-primary font-semibold transition-opacity flex items-center gap-2 whitespace-nowrap disabled:opacity-60"
                  >
                    {subscribing ? 'Subscribing...' : 'Subscribe'} <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </form>
          </div>
          {subscribeError && <p className="text-xs text-rose-300 mt-3">{subscribeError}</p>}
          <p className="text-xs text-slate-400 mt-3">By subscribing, you agree to receive communication related to services and opportunities.</p>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-dark-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">© {currentYear} SUDIPTA WEB SOLUTIONS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
