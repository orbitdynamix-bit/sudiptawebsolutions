import { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const categories = ['All', 'Web', 'Mobile', 'AI'];

type Project = {
  id: string;
  title: string;
  category: string;
  desc: string;
  tags: string[];
  image: string;
  fallback: {
    title: string;
    desc: string;
    tags: string[];
    image: string;
  };
};

const projects: Project[] = [
  {
    id: 'finflow',
    title: 'FinFlow Dashboard',
    category: 'Web',
    desc: 'Real-time financial analytics platform with interactive charts and AI-powered insights.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'D3.js'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    fallback: {
      title: 'TradeSight Console',
      desc: 'Market operations dashboard for live portfolio monitoring and team-level reporting.',
      tags: ['React', 'Express', 'PostgreSQL', 'Chart.js'],
      image: 'https://images.unsplash.com/photo-1551281044-8f9b2f69f7d1?auto=format&fit=crop&w=1200&q=80',
    },
  },
  {
    id: 'healthpulse',
    title: 'HealthPulse App',
    category: 'Mobile',
    desc: 'Health tracking mobile app with wearable device integration and personalized recommendations.',
    tags: ['React Native', 'Firebase', 'HealthKit'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    fallback: {
      title: 'CareTrack Mobile',
      desc: 'Patient wellness app for appointment reminders, daily metrics, and medication alerts.',
      tags: ['Flutter', 'Firebase', 'Analytics'],
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
    },
  },
  {
    id: 'smartrecruit',
    title: 'SmartRecruit AI',
    category: 'AI',
    desc: 'AI-powered recruitment platform that screens resumes and matches candidates using NLP.',
    tags: ['Python', 'TensorFlow', 'FastAPI', 'React'],
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80',
    fallback: {
      title: 'TalentMatch Engine',
      desc: 'Candidate intelligence suite with semantic role matching and interview scorecards.',
      tags: ['Python', 'FastAPI', 'LLM', 'React'],
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    },
  },
  {
    id: 'ecotrack',
    title: 'EcoTrack Platform',
    category: 'Web',
    desc: 'Carbon footprint tracking SaaS for enterprises with real-time monitoring dashboards.',
    tags: ['Next.js', 'Prisma', 'AWS', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=1200&q=80',
    fallback: {
      title: 'GreenOps Cloud',
      desc: 'Sustainability operations portal for emissions benchmarking and compliance insights.',
      tags: ['Next.js', 'Supabase', 'Cloud Functions'],
      image: 'https://images.unsplash.com/photo-1472145246862-b24cf25c4a36?auto=format&fit=crop&w=1200&q=80',
    },
  },
  {
    id: 'deliverease',
    title: 'DeliverEase',
    category: 'Mobile',
    desc: 'Last-mile delivery app with real-time GPS tracking, route optimization, and driver management.',
    tags: ['Flutter', 'Go', 'MongoDB', 'Maps API'],
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80',
    fallback: {
      title: 'RoutePilot',
      desc: 'Dispatch and route optimization app for urban fleet management and proof of delivery.',
      tags: ['React Native', 'Go', 'MongoDB', 'Maps'],
      image: 'https://images.unsplash.com/photo-1592833159057-6f6f06f9f74a?auto=format&fit=crop&w=1200&q=80',
    },
  },
  {
    id: 'visionsense',
    title: 'VisionSense',
    category: 'AI',
    desc: 'Computer vision platform for manufacturing quality control with 99.5% defect detection accuracy.',
    tags: ['PyTorch', 'OpenCV', 'Docker', 'React'],
    image: 'https://images.unsplash.com/photo-1581092921461-7d65ca45393a?auto=format&fit=crop&w=1200&q=80',
    fallback: {
      title: 'InspectAI Vision',
      desc: 'Factory inspection system for defect detection, alerting, and compliance traceability.',
      tags: ['PyTorch', 'OpenCV', 'Docker', 'TypeScript'],
      image: 'https://images.unsplash.com/photo-1565514158740-064f34bd6cfd?auto=format&fit=crop&w=1200&q=80',
    },
  },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [fallbackMode, setFallbackMode] = useState<Record<string, boolean>>({});
  const { ref, isVisible } = useScrollAnimation();

  const filtered = activeCategory === 'All' ? projects : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
      </div>
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="section-kicker">Portfolio</span>
          <h2 className="section-title font-bold">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-description">
            A showcase of our recent work across web, mobile, and AI domains.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'btn-primary text-white'
                  : 'surface text-slate-300 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <div
              key={project.id}
              className={`group rounded-2xl surface overflow-hidden card-hover ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={fallbackMode[project.id] ? project.fallback.image : project.image}
                  alt={fallbackMode[project.id] ? project.fallback.title : project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  onError={() => {
                    if (!fallbackMode[project.id]) {
                      setFallbackMode((prev) => ({ ...prev, [project.id]: true }));
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05080ddd] via-[#05080d66] to-transparent" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                    <ExternalLink className="w-5 h-5 text-white" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                    <Github className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="text-xs text-accent font-semibold uppercase tracking-wide mb-2">{project.category}</div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {fallbackMode[project.id] ? project.fallback.title : project.title}
                </h3>
                <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                  {fallbackMode[project.id] ? project.fallback.desc : project.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {(fallbackMode[project.id] ? project.fallback.tags : project.tags).map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-lg bg-dark-light text-xs text-slate-300 border border-dark-border">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
