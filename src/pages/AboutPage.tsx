import About from '../components/About';

export default function AboutPage() {
  return (
    <main className="pt-24">
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6">
            <article className="surface rounded-2xl p-7">
              <h2 className="text-2xl font-bold text-white mb-3">Who We Are</h2>
              <p className="text-slate-300 leading-relaxed">
                SUDIPTA WEB SOLUTIONS is a Kolkata-based software company delivering web, mobile, cloud and training solutions.
                We focus on practical engineering, measurable outcomes, and long-term support partnerships.
              </p>
            </article>
            <article className="surface rounded-2xl p-7">
              <h2 className="text-2xl font-bold text-white mb-3">How We Work</h2>
              <p className="text-slate-300 leading-relaxed">
                We start with discovery, define the scope clearly, execute in agile sprints, and keep communication transparent.
                Every delivery includes performance, maintainability and business-readiness.
              </p>
            </article>
          </div>
        </div>
      </section>
      <About />
    </main>
  );
}
