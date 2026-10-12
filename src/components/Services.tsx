import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import { services } from '../data/services';

interface ServicesProps {
  limit?: number;
  showAllLink?: boolean;
}

export default function Services({ limit, showAllLink = false }: ServicesProps) {
  const visibleServices = typeof limit === 'number' ? services.slice(0, limit) : services;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return (
    <section id="services" className="pt-24 pb-14 relative">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="section-kicker">What We Do</span>
          <h2 className="section-title font-bold">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="section-description">
            End-to-end software development solutions tailored to accelerate your digital transformation.
          </p>
        </div>

        <div className="mx-auto w-[94%] sm:w-[90%] lg:w-full">
          <ScrollStack
            className="h-auto overflow-visible"
            useWindowScroll
            itemDistance={isMobile ? 40 : 64}
            itemScale={isMobile ? 0.018 : 0.022}
            itemStackDistance={isMobile ? 16 : 24}
            stackPosition={isMobile ? '18%' : '24%'}
            scaleEndPosition={isMobile ? '12%' : '10%'}
            baseScale={isMobile ? 0.94 : 0.9}
            rotationAmount={isMobile ? 0 : 0.12}
            blurAmount={0}
          >
            {visibleServices.map((service, index) => (
              <ScrollStackItem
                key={service.slug}
                itemClassName="h-auto min-h-[228px] lg:min-h-[208px] my-5 p-0 glass border border-dark-border/70 shadow-[0_22px_48px_rgba(3,9,18,0.42)]"
              >
                <Link to={`/services/${service.slug}`} className="group block h-full w-full rounded-[34px] p-6 lg:p-8">
                  <div className="flex items-start justify-between gap-5 mb-5">
                    <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <service.icon className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] lg:text-xs tracking-[0.18em] uppercase text-slate-400 mb-1">Service</div>
                      <div className="text-xl lg:text-2xl font-extrabold text-slate-200 leading-none">
                        {(index + 1).toString().padStart(2, '0')}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-slate-300 text-sm lg:text-base leading-relaxed mb-5 max-w-3xl">{service.desc}</p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {service.tools.slice(0, 4).map((tool) => (
                      <span
                        key={tool}
                        className="px-2.5 py-1 rounded-lg text-[11px] lg:text-sm text-slate-200 bg-dark-light/80 border border-dark-border/80"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  <div className="inline-flex items-center gap-2 text-emerald-300 text-sm lg:text-base font-semibold group-hover:text-emerald-200 transition-colors">
                    Explore Service
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>

        {showAllLink && (
          <div className="mt-6 flex justify-center">
            <Link to="/services" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-secondary font-semibold">
              View All Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
