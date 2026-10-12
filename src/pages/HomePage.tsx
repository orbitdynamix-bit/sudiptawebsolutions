import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Process from '../components/Process';
import Projects from '../components/Projects';
import TechStack from '../components/TechStack';
import Testimonials from '../components/Testimonials';
import WhyChooseUs from '../components/WhyChooseUs';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services showAllLink />
      <WhyChooseUs />
      <Projects />
      <TechStack />
      <Process />
      <Testimonials />

      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-2xl p-8 md:p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
              Have a project query? Book an appointment.
            </h2>
            <p className="text-slate-300 mb-6">
              Share your requirement and get a practical roadmap from SUDIPTA WEB SOLUTIONS.
            </p>
            <Link to="/contact" className="inline-flex px-6 py-3 rounded-xl btn-primary font-semibold">
              Book Appointment
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
