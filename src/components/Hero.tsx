import { ArrowRight, Play } from 'lucide-react';

export default function Hero() {
  const currentYear = new Date().getFullYear();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/18 rounded-full blur-[100px] animate-float-delay" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] bg-sky-500/10 rounded-full blur-[150px]" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      {/* Floating Code Blocks */}
      <div className="absolute top-32 left-10 glass rounded-lg p-3 text-xs text-emerald-300 font-mono animate-float opacity-50 hidden lg:block">
        <span className="text-orange-300">const</span> app = <span className="text-cyan-300">deploy</span>();
      </div>
      <div className="absolute top-48 right-16 glass rounded-lg p-3 text-xs text-blue-300 font-mono animate-float-delay opacity-50 hidden lg:block">
        <span className="text-amber-300">async</span> <span className="text-teal-300">build</span>() {"{"} ... {"}"}
      </div>
      <div className="absolute bottom-40 left-20 glass rounded-lg p-3 text-xs text-cyan-400 font-mono animate-float opacity-40 hidden lg:block">
        npm run <span className="text-emerald-300">production</span> ✓
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-slate-300 mb-8">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Open for {currentYear} build partnerships
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight mb-6">
          We Engineer
          <br />
          <span className="gradient-text">Revenue-Ready Products</span>
          <br />
          For Modern Teams
        </h1>

        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
          From concept to launch, we design and ship high-performance web, mobile, and AI platforms
          built to grow your business and reduce operational drag.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="group flex items-center gap-2 px-8 py-4 rounded-xl btn-primary font-semibold text-lg transition-all animate-pulse-glow"
          >
            Start Your Project
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#projects"
            className="group flex items-center gap-2 px-8 py-4 rounded-xl btn-secondary font-semibold text-lg transition-all"
          >
            <Play className="w-5 h-5 text-accent" />
            View Our Work
          </a>
        </div>

        {/* Stats Bar */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { value: '150+', label: 'Projects' },
            { value: '50+', label: 'Clients' },
            { value: '99%', label: 'Satisfaction' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
