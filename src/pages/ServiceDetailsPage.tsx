import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { services } from '../data/services';

export default function ServiceDetailsPage() {
  const { slug } = useParams();
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return (
      <main className="pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Service not found</h1>
          <p className="text-slate-300 mb-8">The requested service route does not exist.</p>
          <Link to="/services" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-secondary">
            <ArrowLeft className="h-4 w-4" />
            Back to Services
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/services" className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to all services
        </Link>

        <div className="surface rounded-3xl p-8 md:p-12">
          <div className={`inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} items-center justify-center mb-6`}>
            <service.icon className="h-8 w-8 text-white" />
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{service.title}</h1>
          <p className="text-lg text-slate-300 mb-8 max-w-4xl">{service.longDesc}</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold text-white mb-4">What You Get</h2>
              <ul className="space-y-3">
                {service.highlights.map((item) => (
                  <li key={item} className="text-slate-300 flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4">Technology Stack</h2>
              <div className="flex flex-wrap gap-2">
                {service.tools.map((tool) => (
                  <span key={tool} className="px-3 py-1 rounded-lg bg-dark-light border border-dark-border text-slate-200 text-sm">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            {service.slug === 'corporate-training' ? (
              <div className="mt-2">
                <p className="text-slate-300 text-base mb-2">
                  Interested in our Corporate Training program? Connect with us directly —
                </p>
                <a
                  href="tel:9007673274"
                  className="text-2xl font-bold text-white hover:text-teal-300 transition-colors"
                >
                  📞 9007673274
                </a>
              </div>
            ) : (
              <>
                <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-primary font-semibold">
                  For Project Query
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/contact" className="inline-flex px-6 py-3 rounded-xl btn-secondary font-semibold">
                  Book Appointment
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
