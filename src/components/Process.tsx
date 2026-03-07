import { Search, PenTool, Code, Rocket } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const steps = [
  { icon: Search, title: 'Discovery', desc: 'We analyze your requirements, market, and competitors to define the perfect strategy and roadmap.', color: 'from-blue-500 to-cyan-500' },
  { icon: PenTool, title: 'Design', desc: 'Our designers create stunning wireframes and prototypes that align with your brand and delight users.', color: 'from-teal-500 to-emerald-500' },
  { icon: Code, title: 'Develop', desc: 'Our engineers build your solution using agile methodology with regular demos and feedback cycles.', color: 'from-amber-500 to-orange-500' },
  { icon: Rocket, title: 'Deploy', desc: 'We launch your product with CI/CD pipelines, monitoring, and provide ongoing support and optimization.', color: 'from-green-500 to-teal-500' },
];

export default function Process() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
      </div>
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="section-kicker">Our Process</span>
          <h2 className="section-title font-bold">
            How We <span className="gradient-text">Work</span>
          </h2>
          <p className="section-description">
            A streamlined, transparent process that ensures quality delivery every time.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-cyan-500 via-teal-500 via-orange-500 to-emerald-500 opacity-35" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className={`relative text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 150}ms` }}
              >
                {/* Step Number */}
                <div className="text-6xl font-extrabold text-dark-border absolute -top-4 left-1/2 -translate-x-1/2 select-none">
                  0{i + 1}
                </div>

                <div className={`relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} mx-auto mb-6 flex items-center justify-center shadow-lg`}>
                  <step.icon className="w-9 h-9 text-white" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-slate-300 leading-relaxed text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
