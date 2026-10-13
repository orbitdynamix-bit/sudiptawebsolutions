import { ArrowRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HigherStudyCounsellingSection() {
  return (
    <section className="rounded-2xl border border-dark-border bg-gradient-to-r from-primary/10 via-dark-card to-accent/5 p-6 text-center sm:p-8">
      <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
        Get Free Career Counselling
      </h2>
      <p className="mx-auto mt-2 max-w-xl text-sm text-slate-300/80">
        Confused about which path to choose? Talk to our counsellors for personalized guidance on courses, colleges, and career options.
      </p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/computer-academy/free-counselling"
          className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold"
        >
          Request Free Counselling
          <ArrowRight className="h-4 w-4" />
        </Link>
        <a
          href="tel:9007673274"
          className="btn-secondary inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold"
        >
          <Phone className="h-4 w-4" />
          Call Now
        </a>
      </div>
    </section>
  );
}
