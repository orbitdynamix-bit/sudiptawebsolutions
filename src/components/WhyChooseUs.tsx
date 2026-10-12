import { useScrollAnimation } from '../hooks/useScrollAnimation';

const reasons = [
  {
    id: '11',
    title: 'TOP DIGITAL EXPERTISE',
    description: 'Use the power of the best digital marketing company in Kolkata.',
  },
  {
    id: '22',
    title: 'AWARD-WINNING WEBSITE DESIGN',
    description: 'Crafting visually stunning and user-friendly websites.',
  },
  {
    id: '33',
    title: 'COMPELLING BRAND IDENTITY',
    description: 'Make a lasting impression with impactful designs that tell your brand story.',
  },
  {
    id: '44',
    title: 'CUTTING-EDGE TECHNOLOGY',
    description: 'Reach users with innovative and user-friendly technology for your unique needs.',
  },
  {
    id: '55',
    title: 'ONE-STOP SHOP',
    description: 'From website to digital marketing, enjoy the convenience of having everything.',
  },
  {
    id: '66',
    title: 'RESULTS-DRIVEN APPROACH',
    description: 'Track your progress with detailed reports and celebrate your success stories with us.',
  },
];

export default function WhyChooseUs() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-[440px] h-[440px] bg-primary/8 rounded-full blur-[130px]" />
      </div>
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14">
          <span className="section-kicker">Why Choose Us</span>
          <h2 className="section-title font-bold">
            Why <span className="gradient-text">Choose Us</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <article
              key={reason.id}
              className={`glass rounded-2xl p-7 card-hover ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <div className="text-3xl font-black text-accent mb-3">{reason.id}</div>
              <h3 className="text-lg font-extrabold text-white leading-tight mb-3">{reason.title}</h3>
              <p className="text-slate-300 leading-relaxed">{reason.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
