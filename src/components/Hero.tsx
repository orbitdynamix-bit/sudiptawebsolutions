import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import LightPillar from './LightPillar';

export default function Hero() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <section id="home" className="relative min-h-[88vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <LightPillar
            topColor="#2dd4bf"
            bottomColor="#fb923c"
            intensity={0.85}
            rotationSpeed={0.24}
            pillarWidth={2.8}
            pillarHeight={0.42}
            noiseIntensity={0.25}
            pillarRotation={-8}
            quality="medium"
            className="opacity-75 pointer-events-none"
            mixBlendMode="screen"
          />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/18 rounded-full blur-[100px] animate-float-delay" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] bg-sky-500/10 rounded-full blur-[150px]" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />


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
            <Link
              to="/contact"
              className="group flex items-center gap-2 px-8 py-4 rounded-xl btn-primary font-semibold text-lg transition-all animate-pulse-glow"
            >
              Start Your Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/services"
              className="group flex items-center gap-2 px-8 py-4 rounded-xl btn-secondary font-semibold text-lg transition-all"
            >
              <Play className="w-5 h-5 text-accent" />
              View Services
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full border-y border-dark-border/70 bg-dark-light/55 backdrop-blur-xl">
        <div className="w-full grid grid-cols-1 sm:grid-cols-3">
          {[
            { value: '50+', label: 'Projects' },
            { value: '40+', label: 'Clients' },
            { value: '99%', label: 'Satisfaction' },
          ].map((stat) => (
            <div key={stat.label} className="py-8 px-6 text-center border-b sm:border-b-0 sm:border-r last:border-r-0 border-dark-border/70">
              <div className="text-4xl md:text-5xl font-black gradient-text leading-none">{stat.value}</div>
              <div className="text-base md:text-lg font-extrabold text-white tracking-wide mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
