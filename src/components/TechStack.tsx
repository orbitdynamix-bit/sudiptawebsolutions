import type { IconType } from 'react-icons';
import {
  SiGooglecloud,
  SiDocker,
  SiFigma,
  SiFlutter,
  SiGo,
  SiGraphql,
  SiKubernetes,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiTerraform,
  SiTypescript,
} from 'react-icons/si';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

type Tech = {
  name: string;
  icon: IconType;
  color: string;
};

const techs: Tech[] = [
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E' },
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'Go', icon: SiGo, color: '#00ADD8' },
  { name: 'Google Cloud', icon: SiGooglecloud, color: '#4285F4' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED' },
  { name: 'Kubernetes', icon: SiKubernetes, color: '#326CE5' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'Redis', icon: SiRedis, color: '#DC382D' },
  { name: 'GraphQL', icon: SiGraphql, color: '#E10098' },
  { name: 'Terraform', icon: SiTerraform, color: '#7B42BC' },
  { name: 'Flutter', icon: SiFlutter, color: '#02569B' },
  { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
];

export default function TechStack() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0">
        <div className="absolute top-12 right-0 w-[360px] h-[360px] bg-primary/8 rounded-full blur-[120px]" />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14">
          <span className="section-kicker">Technology</span>
          <h2 className="section-title font-bold">
            Official <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="section-description">
            We ship with modern, battle-tested tools across product, platform, and cloud.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {techs.map((tech, index) => (
            <article
              key={tech.name}
              className={`glass rounded-2xl p-4 card-hover text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className="mx-auto mb-3 w-11 h-11 rounded-xl surface flex items-center justify-center border border-dark-border/80">
                <tech.icon className="w-6 h-6" style={{ color: tech.color }} />
              </div>
              <p className="text-xs md:text-sm font-semibold text-slate-200">{tech.name}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
