import { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const categories = ['All', 'Web', 'Mobile', 'AI'];

const projects = [
  { title: 'FinFlow Dashboard', category: 'Web', desc: 'Real-time financial analytics platform with interactive charts and AI-powered insights.', tags: ['React', 'Node.js', 'PostgreSQL', 'D3.js'], image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { title: 'HealthPulse App', category: 'Mobile', desc: 'Health tracking mobile app with wearable device integration and personalized recommendations.', tags: ['React Native', 'Firebase', 'HealthKit'], image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { title: 'SmartRecruit AI', category: 'AI', desc: 'AI-powered recruitment platform that screens resumes and matches candidates using NLP.', tags: ['Python', 'TensorFlow', 'FastAPI', 'React'], image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { title: 'EcoTrack Platform', category: 'Web', desc: 'Carbon footprint tracking SaaS for enterprises with real-time monitoring dashboards.', tags: ['Next.js', 'Prisma', 'AWS', 'Stripe'], image: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  { title: 'DeliverEase', category: 'Mobile', desc: 'Last-mile delivery app with real-time GPS tracking, route optimization, and driver management.', tags: ['Flutter', 'Go', 'MongoDB', 'Maps API'], image: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { title: 'VisionSense', category: 'AI', desc: 'Computer vision platform for manufacturing quality control with 99.5% defect detection accuracy.', tags: ['PyTorch', 'OpenCV', 'Docker', 'React'], image: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
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
              key={project.title}
              className={`group rounded-2xl surface overflow-hidden card-hover ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Image Placeholder */}
              <div className="relative h-48 overflow-hidden" style={{ background: project.image }}>
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
                <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                <p className="text-slate-300 text-sm mb-4 leading-relaxed">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
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
