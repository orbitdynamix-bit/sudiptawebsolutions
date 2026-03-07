import { useState } from 'react';
import { Code2, Github, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';

const footerLinks = {
  Company: ['About Us', 'Careers', 'Blog', 'Press'],
  Services: ['Web Development', 'Mobile Apps', 'Cloud Solutions', 'AI & ML'],
  Resources: ['Documentation', 'Case Studies', 'Tech Stack', 'Open Source'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'],
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="border-t border-dark-border bg-dark-light/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-teal-500 to-accent flex items-center justify-center">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">SudiptaInfotech</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-sm">
              Building the future of digital experiences. We transform ideas into powerful, scalable software solutions.
            </p>
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
                  <li key={link}>
                    <a href="#" className="text-slate-300 text-sm hover:text-white transition-colors">
                      {link}
                    </a>
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
              <h4 className="text-xl font-bold text-white mb-1">Stay in the loop</h4>
              <p className="text-slate-300 text-sm">Get the latest insights on tech, engineering, and product updates.</p>
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
                    placeholder="Enter your email"
                    className="px-4 py-3 rounded-xl bg-dark-card border border-dark-border text-white placeholder-slate-600 focus:outline-none focus:border-primary transition-colors w-full md:w-72"
                  />
                  <button type="submit" className="px-6 py-3 rounded-xl btn-primary font-semibold transition-opacity flex items-center gap-2 whitespace-nowrap">
                    Subscribe <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-dark-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">© {currentYear} SudiptaInfotech. All rights reserved.</p>
          <p className="text-slate-600 text-xs">Built with React, TypeScript and Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
