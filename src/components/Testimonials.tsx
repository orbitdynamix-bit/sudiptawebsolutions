import { Star } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const testimonials = [
  {
    name: 'Michael Roberts',
    role: 'CEO, FinTech Innovations',
    text: 'SUDIPTA WEB SOLUTIONS transformed our legacy system into a fast and scalable platform. Delivery quality and communication were excellent.',
    gradient: 'from-blue-500 to-indigo-500',
    initials: 'MR',
  },
  {
    name: 'Jessica Wang',
    role: 'Founder, HealthBridge',
    text: 'The mobile app shipped on schedule and user retention improved in the first month. Their UX detail is strong.',
    gradient: 'from-teal-500 to-emerald-500',
    initials: 'JW',
  },
  {
    name: 'Robert Kline',
    role: 'CTO, LogiChain',
    text: 'The AI workflow and dashboard architecture were exactly what we needed. They are practical engineering partners.',
    gradient: 'from-amber-500 to-orange-500',
    initials: 'RK',
  },
  {
    name: 'Priya Sharma',
    role: 'VP Engineering, DataVault',
    text: 'Their DevOps implementation reduced deployment friction and improved release confidence for our team.',
    gradient: 'from-green-500 to-teal-500',
    initials: 'PS',
  },
  {
    name: 'Arjun Mehta',
    role: 'Director, EduScale',
    text: 'Corporate training sessions on C++, Java and DBMS were highly effective and well-structured for our junior engineers.',
    gradient: 'from-fuchsia-500 to-violet-500',
    initials: 'AM',
  },
  {
    name: 'Sanjana Roy',
    role: 'Marketing Lead, PixelCart',
    text: 'Their Digital Marketing and SEO execution improved our organic traffic and generated consistent inquiry leads.',
    gradient: 'from-lime-500 to-emerald-500',
    initials: 'SR',
  },
];

export default function Testimonials() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="reviews" className="py-24 relative">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
      </div>
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14">
          <span className="section-kicker">Testimonials</span>
          <h2 className="section-title font-bold">
            Client <span className="gradient-text">Reviews</span>
          </h2>
          <p className="section-description">
            4.9/5 average rating across software delivery, SEO execution and corporate training engagements.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {testimonials.map((review, index) => (
            <article
              key={review.name}
              className={`surface rounded-2xl p-6 border-2 border-dark-border card-hover ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${review.gradient} flex items-center justify-center text-sm font-bold text-white`}>
                    {review.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{review.name}</p>
                    <p className="text-xs text-slate-300">{review.role}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={`${review.name}-${i}`} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-slate-200 leading-relaxed">{review.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
