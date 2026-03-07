import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Process from './components/Process';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-dark text-slate-200 overflow-x-hidden relative">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute top-64 -right-20 h-80 w-80 rounded-full bg-accent/18 blur-[140px]" />
        <div className="absolute bottom-24 left-12 h-64 w-64 rounded-full bg-sky-500/10 blur-[110px]" />
      </div>
      <Navbar />
      <Hero />
      <Services />
      <Projects />
      <TechStack />
      <Process />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
