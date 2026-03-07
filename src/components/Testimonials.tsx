import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  { name: 'Michael Roberts', role: 'CEO, FinTech Innovations', text: 'SudiptaInfotech transformed our legacy system into a modern, scalable platform. Their technical expertise and project management were outstanding. Delivery was on time and exceeded expectations.', rating: 5, gradient: 'from-blue-500 to-indigo-500', initials: 'MR' },
  { name: 'Jessica Wang', role: 'Founder, HealthBridge', text: 'The mobile app they built for us has over 100K downloads and a 4.8-star rating. Their attention to UX detail and performance optimization is unmatched. Highly recommend!', rating: 5, gradient: 'from-teal-500 to-emerald-500', initials: 'JW' },
  { name: 'Robert Kline', role: 'CTO, LogiChain', text: 'Working with SudiptaInfotech on our AI-powered logistics platform was a game-changer. They brought innovative solutions we hadn\'t even considered. True technology partners.', rating: 5, gradient: 'from-amber-500 to-orange-500', initials: 'RK' },
  { name: 'Priya Sharma', role: 'VP Engineering, DataVault', text: 'Their DevOps team helped us reduce deployment time by 90% and infrastructure costs by 40%. Professional, knowledgeable, and always available when we needed them.', rating: 5, gradient: 'from-green-500 to-teal-500', initials: 'PS' },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const prev = () => { setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length); setIsAutoPlaying(false); };
  const next = () => { setCurrent((c) => (c + 1) % testimonials.length); setIsAutoPlaying(false); };

  const t = testimonials[current];

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="section-kicker">Testimonials</span>
          <h2 className="section-title font-bold">
            Client <span className="gradient-text">Reviews</span>
          </h2>
        </div>

        <div className="relative glass rounded-2xl p-8 md:p-12">
          <Quote className="w-12 h-12 text-primary/20 mb-6" />
          
          <div className="min-h-[200px] flex flex-col justify-between">
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8 italic">
              "{t.text}"
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-lg font-bold text-white`}>
                  {t.initials}
                </div>
                <div>
                  <div className="font-bold text-white">{t.name}</div>
                  <div className="text-sm text-slate-300">{t.role}</div>
                </div>
              </div>
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-dark-border">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrent(i); setIsAutoPlaying(false); }}
                  className={`w-3 h-3 rounded-full transition-all ${i === current ? 'bg-primary w-8' : 'bg-dark-border hover:bg-slate-500'}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={prev} className="w-10 h-10 rounded-xl bg-dark-card border border-dark-border flex items-center justify-center text-slate-300 hover:text-white hover:border-accent/60 transition-all">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={next} className="w-10 h-10 rounded-xl bg-dark-card border border-dark-border flex items-center justify-center text-slate-300 hover:text-white hover:border-accent/60 transition-all">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
