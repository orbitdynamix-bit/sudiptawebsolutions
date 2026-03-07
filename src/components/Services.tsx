import { Globe, Smartphone, Cloud, Brain, Settings, Palette } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const services = [
  { icon: Globe, title: 'Web Development', desc: 'Full-stack web applications with React, Next.js, and Node.js. Blazing-fast, SEO-optimized, and scalable.', color: 'from-blue-500 to-cyan-500' },
  { icon: Smartphone, title: 'Mobile Apps', desc: 'Cross-platform mobile apps with React Native and Flutter. Native performance, single codebase.', color: 'from-teal-500 to-emerald-500' },
  { icon: Cloud, title: 'Cloud Solutions', desc: 'AWS, GCP & Azure infrastructure. Auto-scaling, CI/CD pipelines, and serverless architectures.', color: 'from-cyan-500 to-teal-500' },
  { icon: Brain, title: 'AI & ML', desc: 'Intelligent solutions powered by machine learning, NLP, and computer vision. Data-driven decisions.', color: 'from-amber-500 to-orange-500' },
  { icon: Settings, title: 'DevOps', desc: 'Docker, Kubernetes, and Terraform. Automated deployments, monitoring, and infrastructure as code.', color: 'from-green-500 to-emerald-500' },
  { icon: Palette, title: 'UI/UX Design', desc: 'User-centered design with Figma. Wireframes, prototypes, and design systems that delight users.', color: 'from-orange-500 to-red-500' },
];

export default function Services() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="services" className="py-24 relative">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
      </div>
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="section-kicker">What We Do</span>
          <h2 className="section-title font-bold">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="section-description">
            End-to-end software development solutions tailored to accelerate your digital transformation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`group p-8 rounded-2xl surface card-hover ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <service.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-slate-300 leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
