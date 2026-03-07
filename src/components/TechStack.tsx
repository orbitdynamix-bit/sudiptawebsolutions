import { useScrollAnimation } from '../hooks/useScrollAnimation';

const techs = [
  { name: 'React', color: '#61DAFB' },
  { name: 'Next.js', color: '#ffffff' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'Node.js', color: '#339933' },
  { name: 'Python', color: '#3776AB' },
  { name: 'Go', color: '#00ADD8' },
  { name: 'AWS', color: '#FF9900' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'Kubernetes', color: '#326CE5' },
  { name: 'PostgreSQL', color: '#4169E1' },
  { name: 'MongoDB', color: '#47A248' },
  { name: 'Redis', color: '#DC382D' },
  { name: 'GraphQL', color: '#E10098' },
  { name: 'Terraform', color: '#844FBA' },
  { name: 'Flutter', color: '#02569B' },
  { name: 'Figma', color: '#F24E1E' },
];

function TechBadge({ name, color }: { name: string; color: string }) {
  return (
    <div className="flex-shrink-0 flex items-center gap-3 px-6 py-3 mx-3 rounded-xl surface hover:border-primary/40 transition-all cursor-default group">
      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-slate-300 font-medium text-sm group-hover:text-white transition-colors whitespace-nowrap">{name}</span>
    </div>
  );
}

export default function TechStack() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 relative overflow-hidden">
      <div ref={ref} className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="text-center mb-16 px-4">
          <span className="section-kicker">Technology</span>
          <h2 className="section-title font-bold">
            Our <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="section-description">
            We use industry-leading technologies to build robust, scalable solutions.
          </p>
        </div>

        {/* Marquee Row 1 */}
        <div className="relative mb-4">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-dark to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-dark to-transparent z-10" />
          <div className="flex animate-marquee">
            {[...techs, ...techs].map((tech, i) => (
              <TechBadge key={`${tech.name}-${i}`} {...tech} />
            ))}
          </div>
        </div>

        {/* Marquee Row 2 (reversed) */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-dark to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-dark to-transparent z-10" />
          <div className="flex animate-marquee" style={{ animationDirection: 'reverse', animationDuration: '35s' }}>
            {[...techs.slice().reverse(), ...techs.slice().reverse()].map((tech, i) => (
              <TechBadge key={`r-${tech.name}-${i}`} {...tech} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
