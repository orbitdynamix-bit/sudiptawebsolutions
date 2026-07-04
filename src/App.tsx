import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { useEffect, useMemo } from 'react';
import { Navigate, Route, Routes, useLocation, matchPath } from 'react-router-dom';
import { services } from './data/services';
import { applySeo, type SeoMeta } from './lib/seo';
import AboutPage from './pages/AboutPage';
import AdminPage from './pages/AdminPage';
import ComputerAcademyPage from './pages/ComputerAcademyPage';
import ContactPage from './pages/ContactPage';
import HomePage from './pages/HomePage';
import RegisterTeacherPage from './pages/RegisterTeacherPage';
import ReviewsPage from './pages/ReviewsPage';
import ServiceDetailsPage from './pages/ServiceDetailsPage';
import ServicesPage from './pages/ServicesPage';

function getSeoMeta(pathname: string): SeoMeta {
  const globalKeywords = [
    'SUDIPTA WEB SOLUTIONS PVT LTD',
    'software development',
    'web development',
    'mobile app development',
    'cloud solutions',
    'digital marketing',
    'seo services',
    'corporate training',
    'kolkata',
  ];

  if (pathname === '/') {
    return {
      title: 'Software, SEO & Corporate Training Company',
      description:
        'sudiptawebsolutions delivers web and mobile development, cloud solutions, SEO growth, and corporate training programs.',
      pathname,
      keywords: globalKeywords,
    };
  }

  if (pathname === '/services') {
    return {
      title: 'Software and Marketing Services',
      description:
        'Explore our services across web development, mobile apps, cloud architecture, AI solutions, DevOps, design, SEO, and training.',
      pathname,
      keywords: [...globalKeywords, 'devops', 'ui ux design', 'ai ml solutions'],
    };
  }

  if (pathname.startsWith('/services/')) {
    const slug = pathname.split('/')[2];
    const service = services.find((item) => item.slug === slug);

    if (service) {
      return {
        title: `${service.title} Services`,
        description: service.longDesc,
        pathname,
        keywords: [...globalKeywords, ...service.tools.map((tool) => tool.toLowerCase()), service.slug],
        ogType: 'article',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: service.title,
          description: service.longDesc,
          areaServed: 'IN',
          provider: {
            '@type': 'Organization',
            name: 'sudiptawebsolutions',
            url: 'https://sudiptawebsolutions.com',
          },
        },
      };
    }
  }

  if (pathname === '/about') {
    return {
      title: 'About Our Team',
      description:
        'Learn how sudiptawebsolutions plans, builds, and supports practical software, SEO, and training outcomes for business teams.',
      pathname,
      keywords: [...globalKeywords, 'about software company', 'engineering team'],
    };
  }

  if (pathname === '/reviews') {
    return {
      title: 'Client Reviews and Testimonials',
      description:
        'Read client testimonials about delivery quality, communication, and technical outcomes from sudiptawebsolutions projects.',
      pathname,
      keywords: [...globalKeywords, 'customer testimonials', 'client reviews'],
    };
  }

  if (pathname === '/contact') {
    return {
      title: 'Contact for Project Query and Appointments',
      description:
        'Contact sudiptawebsolutions for project queries, service consultation, appointment booking, and corporate training discussions.',
      pathname,
      keywords: [...globalKeywords, 'contact software company', 'book appointment'],
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact sudiptawebsolutions',
        url: `https://sudiptawebsolutions.com${pathname}`,
      },
    };
  }

  if (pathname === '/computer-academy') {
    return {
      title: 'Bharat Computer Academy — School to Higher Education',
      description:
        'Bharat Computer Academy offers school-level computer fundamentals (Class VIII–XII), BCA, MCA programs, and free career counselling. Call us for guidance.',
      pathname,
      keywords: [
        'bharat computer academy',
        'computer academy',
        'computer classes',
        'BCA coaching',
        'MCA coaching',
        'school computer tuition',
        'free counselling',
        'kolkata',
      ],
    };
  }

  if (pathname === '/computer-academy/register-teacher') {
    return {
      title: 'Register as a Teacher — Bharat Computer Academy',
      description:
        'Join Bharat Computer Academy as an instructor. Teach BCA, MCA, BBA, and computer-related subjects. Submit your credentials and start teaching.',
      pathname,
      keywords: [
        'bharat computer academy',
        'teacher registration',
        'computer teacher job',
        'BCA MCA instructor',
        'teach computer science',
        'kolkata',
      ],
    };
  }

  if (pathname === '/admin') {
    return {
      title: 'Admin Leads Dashboard',
      description: 'Protected admin dashboard for reviewing captured project leads.',
      pathname,
      noIndex: true,
      keywords: ['admin', 'leads dashboard'],
    };
  }

  return {
    title: 'Software Development Company',
    description:
      'sudiptawebsolutions provides software engineering, SEO, and technical training services for startups and growing teams.',
    pathname,
    keywords: globalKeywords,
  };
}

export default function App() {
  const location = useLocation();
  const seoMeta = useMemo(() => getSeoMeta(location.pathname), [location.pathname]);

  // Hide header and footer on computer-academy routes for customer retention
  const hideLayout = !!matchPath('/computer-academy', location.pathname) || !!matchPath('/computer-academy/register-teacher', location.pathname);

  useEffect(() => {
    applySeo(seoMeta);
  }, [seoMeta]);

  return (
    <div className="min-h-screen bg-dark text-slate-200 overflow-x-hidden relative">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute top-64 -right-20 h-80 w-80 rounded-full bg-accent/18 blur-[140px]" />
        <div className="absolute bottom-24 left-12 h-64 w-64 rounded-full bg-sky-500/10 blur-[110px]" />
      </div>
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetailsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/computer-academy" element={<ComputerAcademyPage />} />
        <Route path="/computer-academy/register-teacher" element={<RegisterTeacherPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!hideLayout && <Footer />}
    </div>
  );
}
