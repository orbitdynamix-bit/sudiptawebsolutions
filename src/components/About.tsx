import { useEffect, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Linkedin, Twitter, Github } from 'lucide-react';

const stats = [
  { target: 150, label: 'Projects Delivered', suffix: '+' },
  { target: 50, label: 'Happy Clients', suffix: '+' },
  { target: 8, label: 'Years Experience', suffix: '+' },
  { target: 30, label: 'Team Members', suffix: '+' },
];

const team = [
  { name: 'Alex Chen', role: 'CEO & Founder', gradient: 'from-blue-500 to-cyan-500', initials: 'AC' },
  { name: 'Sarah Miller', role: 'CTO', gradient: 'from-teal-500 to-emerald-500', initials: 'SM' },
  { name: 'David Park', role: 'Lead Designer', gradient: 'from-amber-500 to-orange-500', initials: 'DP' },
  { name: 'Emma Wilson', role: 'Lead Engineer', gradient: 'from-green-500 to-teal-500', initials: 'EW' },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-extrabold gradient-text">
        {count}{suffix}
      </div>
    </div>
  );
}

export default function About() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-24 relative">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-[120px]" />
      </div>
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="section-kicker">About Us</span>
          <h2 className="section-title font-bold">
            Who <span className="gradient-text">We Are</span>
          </h2>
          <p className="section-description">
            A passionate team of developers, designers, and innovators dedicated to building exceptional digital products.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 p-8 rounded-2xl glass">
          {stats.map((stat) => (
            <div key={stat.label}>
              <Counter target={stat.target} suffix={stat.suffix} />
              <div className="text-sm text-slate-300 mt-2 text-center">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <div
              key={member.name}
              className={`group text-center p-8 rounded-2xl surface card-hover ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${member.gradient} mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white group-hover:scale-110 transition-transform`}>
                {member.initials}
              </div>
              <h3 className="text-lg font-bold text-white">{member.name}</h3>
              <p className="text-accent text-sm mb-4">{member.role}</p>
              <div className="flex justify-center gap-3">
                {[Linkedin, Twitter, Github].map((Icon, idx) => (
                  <button key={idx} className="w-8 h-8 rounded-lg bg-dark-light border border-dark-border flex items-center justify-center text-slate-500 hover:text-white hover:border-accent/60 transition-all">
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
