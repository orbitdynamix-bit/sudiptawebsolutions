import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  BookOpen,
  ArrowRight,
  Clock,
  CheckCircle2,
  ArrowLeft,
  Home,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   Custom SVG Tech Icons
   ───────────────────────────────────────────── */

function PythonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 8c-8 0-14 2-14 6v8c0 4 6 6 14 6s14-2 14-6v-8c0-4-6-6-14-6z" fill="url(#pyGrad1)" />
      <path d="M18 14h-4c-4 0-8 4-8 10v8c0 6 4 10 8 10h4" stroke="url(#pyGrad2)" strokeWidth="4" strokeLinecap="round" />
      <path d="M46 14h4c4 0 8 4 8 10v8c0 6-4 10-8 10h-4" stroke="url(#pyGrad2)" strokeWidth="4" strokeLinecap="round" />
      <circle cx="26" cy="14" r="2" fill="#0f172a" />
      <circle cx="38" cy="50" r="2" fill="#0f172a" />
      <defs>
        <linearGradient id="pyGrad1" x1="18" y1="8" x2="46" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2dd4bf" />
          <stop offset="1" stopColor="#0d9488" />
        </linearGradient>
        <linearGradient id="pyGrad2" x1="6" y1="14" x2="58" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2dd4bf" />
          <stop offset="1" stopColor="#14b8a6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function HtmlCssIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 12l4 36 16 6 16-6 4-36H12z" stroke="url(#htmlGrad)" strokeWidth="3" strokeLinejoin="round" />
      <path d="M20 22h24M21 32h22M22 42l10 3 10-3" stroke="url(#htmlGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <linearGradient id="htmlGrad" x1="12" y1="12" x2="52" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f97316" />
          <stop offset="1" stopColor="#ea580c" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function JavaScriptIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="8" width="48" height="48" rx="8" stroke="url(#jsGrad)" strokeWidth="3" />
      <path d="M24 44V28" stroke="url(#jsGrad)" strokeWidth="3" strokeLinecap="round" />
      <path d="M36 44c0-6 8-4 8-12" stroke="url(#jsGrad)" strokeWidth="3" strokeLinecap="round" />
      <defs>
        <linearGradient id="jsGrad" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#facc15" />
          <stop offset="1" stopColor="#eab308" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function CppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 10c-12 0-22 10-22 22s10 22 22 22 22-10 22-22" stroke="url(#cppGrad)" strokeWidth="4" strokeLinecap="round" />
      <path d="M32 22v20" stroke="url(#cppGrad)" strokeWidth="4" strokeLinecap="round" />
      <path d="M22 32h20" stroke="url(#cppGrad)" strokeWidth="4" strokeLinecap="round" />
      <path d="M44 26h8M44 38h8M48 22v20" stroke="url(#cppGrad)" strokeWidth="3" strokeLinecap="round" />
      <defs>
        <linearGradient id="cppGrad" x1="10" y1="10" x2="54" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60a5fa" />
          <stop offset="1" stopColor="#2563eb" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function JavaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 14c-4 8-8 14-8 20s6 14 16 14 16-8 16-14" stroke="url(#javaGrad)" strokeWidth="3" strokeLinecap="round" />
      <path d="M20 48c4 4 20 4 24 0M22 54c6 4 18 4 24 0" stroke="url(#javaGrad)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="44" cy="20" r="4" fill="url(#javaGrad)" />
      <defs>
        <linearGradient id="javaGrad" x1="16" y1="14" x2="48" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f87171" />
          <stop offset="1" stopColor="#dc2626" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ReactIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="32" rx="18" ry="7" stroke="url(#reactGrad)" strokeWidth="2.5" />
      <ellipse cx="32" cy="32" rx="18" ry="7" stroke="url(#reactGrad)" strokeWidth="2.5" transform="rotate(60 32 32)" />
      <ellipse cx="32" cy="32" rx="18" ry="7" stroke="url(#reactGrad)" strokeWidth="2.5" transform="rotate(120 32 32)" />
      <circle cx="32" cy="32" r="4" fill="url(#reactGrad)" />
      <defs>
        <linearGradient id="reactGrad" x1="14" y1="14" x2="50" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38bdf8" />
          <stop offset="1" stopColor="#0ea5e9" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function DatabaseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="18" rx="18" ry="8" stroke="url(#dbGrad)" strokeWidth="3" />
      <path d="M14 18v20c0 4.4 8 8 18 8s18-3.6 18-8V18" stroke="url(#dbGrad)" strokeWidth="3" />
      <path d="M14 30c0 4.4 8 8 18 8s18-3.6 18-8" stroke="url(#dbGrad)" strokeWidth="3" />
      <defs>
        <linearGradient id="dbGrad" x1="14" y1="10" x2="50" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a78bfa" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function CloudIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M46 46c6.6 0 12-5.4 12-12s-5.4-12-12-12c-.6 0-1.2 0-1.8.1C42.6 14.6 35.1 8 26 8c-10.5 0-19 8.5-19 19 0 .8.1 1.6.2 2.4C3.3 31.2 0 35.5 0 40.5 0 47.9 6.1 54 14 54h32" stroke="url(#cloudGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M40 54l6 6 10-10" stroke="url(#cloudGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <linearGradient id="cloudGrad" x1="0" y1="8" x2="64" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c084fc" />
          <stop offset="1" stopColor="#9333ea" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function BrainIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 18c-6 2-10 8-10 14s4 12 10 14" stroke="url(#brainGrad)" strokeWidth="3" strokeLinecap="round" />
      <path d="M44 18c6 2 10 8 10 14s-4 12-10 14" stroke="url(#brainGrad)" strokeWidth="3" strokeLinecap="round" />
      <path d="M24 14c4-4 12-4 16 0" stroke="url(#brainGrad)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="32" cy="28" r="3" fill="url(#brainGrad)" />
      <circle cx="24" cy="34" r="2" fill="url(#brainGrad)" />
      <circle cx="40" cy="34" r="2" fill="url(#brainGrad)" />
      <path d="M28 44h8" stroke="url(#brainGrad)" strokeWidth="3" strokeLinecap="round" />
      <defs>
        <linearGradient id="brainGrad" x1="14" y1="14" x2="50" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f472b6" />
          <stop offset="1" stopColor="#db2777" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 6L10 16v14c0 16 9.4 24.6 22 28 12.6-3.4 22-12 22-28V16L32 6z" stroke="url(#shieldGrad)" strokeWidth="3" strokeLinejoin="round" />
      <path d="M22 32l8 8 14-14" stroke="url(#shieldGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <linearGradient id="shieldGrad" x1="10" y1="6" x2="54" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#34d399" />
          <stop offset="1" stopColor="#059669" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function CodeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 20l-12 12 12 12" stroke="url(#codeGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M44 20l12 12-12 12" stroke="url(#codeGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M36 14l-8 36" stroke="url(#codeGrad)" strokeWidth="3" strokeLinecap="round" />
      <defs>
        <linearGradient id="codeGrad" x1="8" y1="14" x2="56" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22d3ee" />
          <stop offset="1" stopColor="#0891b2" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function TerminalIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="12" width="48" height="40" rx="6" stroke="url(#termGrad)" strokeWidth="3" />
      <path d="M16 24l8 8-8 8" stroke="url(#termGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 40h12" stroke="url(#termGrad)" strokeWidth="3" strokeLinecap="round" />
      <defs>
        <linearGradient id="termGrad" x1="8" y1="12" x2="56" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor="#94a3b8" />
          <stop offset="1" stopColor="#475569" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const techStack = [
  { name: 'Python', Icon: PythonIcon },
  { name: 'HTML & CSS', Icon: HtmlCssIcon },
  { name: 'JavaScript', Icon: JavaScriptIcon },
  { name: 'C / C++', Icon: CppIcon },
  { name: 'Java / OOP', Icon: JavaIcon },
  { name: 'React', Icon: ReactIcon },
  { name: 'SQL & DBMS', Icon: DatabaseIcon },
  { name: 'Cloud', Icon: CloudIcon },
  { name: 'Machine Learning', Icon: BrainIcon },
  { name: 'Cybersecurity', Icon: ShieldIcon },
  { name: 'Full Stack', Icon: CodeIcon },
  { name: 'DevOps', Icon: TerminalIcon },
];

/* ─────────────────────────────────────────────
   Data
   ───────────────────────────────────────────── */

interface Subject {
  name: string;
  description: string;
}

interface HigherCourse {
  title: string;
  duration: string;
  subjects: Subject[];
}

const schoolClasses = [
  { grade: 'Class VIII', topics: ['Computer Basics', 'MS Office', 'Internet Fundamentals', 'Scratch Programming'] },
  { grade: 'Class IX', topics: ['Programming Logic', 'HTML & CSS', 'Python Basics', 'Cyber Safety'] },
  { grade: 'Class X', topics: ['Advanced Python', 'Database Intro', 'Web Development', 'Project Work'] },
  { grade: 'Class XI', topics: ['C++ Programming', 'Data Structures', 'SQL Fundamentals', 'Computer Networks'] },
  { grade: 'Class XII', topics: ['Java/OOP', 'Algorithms', 'DBMS', 'Final Year Project'] },
];

const higherCourses: HigherCourse[] = [
  {
    title: 'BCA',
    duration: '3 Years',
    subjects: [
      { name: 'Programming in C', description: 'Fundamentals of procedural programming' },
      { name: 'Data Structures', description: 'Arrays, linked lists, trees, graphs' },
      { name: 'Database Management', description: 'SQL, normalization, transactions' },
      { name: 'Operating Systems', description: 'Process management, memory, file systems' },
      { name: 'Web Technologies', description: 'HTML, CSS, JavaScript, React' },
      { name: 'Software Engineering', description: 'SDLC, Agile, testing methodologies' },
    ],
  },
  {
    title: 'MCA',
    duration: '2 Years',
    subjects: [
      { name: 'Advanced Algorithms', description: 'Dynamic programming, greedy, NP-complete' },
      { name: 'Machine Learning', description: 'Supervised & unsupervised learning, neural networks' },
      { name: 'Cloud Computing', description: 'AWS, Azure, containerization, microservices' },
      { name: 'Big Data Analytics', description: 'Hadoop, Spark, data pipelines' },
      { name: 'Cybersecurity', description: 'Network security, cryptography, ethical hacking' },
      { name: 'Full Stack Development', description: 'React, Node.js, MongoDB, DevOps' },
    ],
  },
];

  /* ─────────────────────────────────────────────
   Sub-components
   ───────────────────────────────────────────── */

function SchoolCard({ grade, topics }: { grade: string; topics: string[] }) {
  return (
    <div className="surface rounded-xl p-4 card-hover">
      <div className="mb-2 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
          <BookOpen className="h-4 w-4 text-primary-light" />
        </div>
        <h4 className="font-display text-base font-semibold text-white">{grade}</h4>
      </div>
      <ul className="space-y-1">
        {topics.map((topic) => (
          <li key={topic} className="flex items-start gap-1.5 text-xs text-slate-300/80">
            <CheckCircle2 className="mt-0.5 h-3 w-3 flex-shrink-0 text-primary-light" />
            {topic}
          </li>
        ))}
      </ul>
    </div>
  );
}

function HigherCourseCard({ course }: { course: HigherCourse }) {
  return (
    <div className="surface rounded-2xl overflow-hidden p-4 sm:p-5">
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent/15">
          <GraduationCap className="h-5 w-5 text-accent" />
        </div>
        <div className="min-w-0">
          <h4 className="font-display text-lg font-semibold text-white">{course.title}</h4>
          <span className="flex items-center gap-1.5 text-xs text-slate-400">
            <Clock className="h-3 w-3 flex-shrink-0" />
            {course.duration}
          </span>
        </div>
      </div>

      {/* Subjects — always visible */}
      <div className="grid gap-2 sm:grid-cols-2">
        {course.subjects.map((sub) => (
          <div
            key={sub.name}
            className="rounded-lg bg-dark-light/60 p-3 border border-dark-border/50"
          >
            <h5 className="mb-0.5 text-sm font-semibold text-primary-light break-words">{sub.name}</h5>
            <p className="text-xs text-slate-400 break-words">{sub.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Page
   ───────────────────────────────────────────── */

export default function ComputerAcademyPage() {
  return (
    <main className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      {/* ── Back to Home ── */}
      <div className="mb-4">
        <Link
          to="/"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-dark-border bg-dark-card/60 px-4 py-2.5 text-sm text-slate-300 transition-all hover:border-primary/40 hover:text-white sm:w-auto"
        >
          <ArrowLeft className="h-4 w-4" />
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
      </div>

      {/* ── New Hero: Tech Stack Visual ── */}
      <section className="mb-12 rounded-3xl border border-dark-border bg-dark-card p-6 sm:p-8 lg:p-10">
        <div className="text-center">
          <span className="section-kicker">Bharat Computer Academy</span>
          <h1 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl break-words">
            Learn the Skills That{' '}
            <span className="gradient-text">Power the Future</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-300/80 sm:text-base break-words">
            Master real-world programming, databases, cloud, and AI with hands-on training built for school students and college aspirants.
          </p>
        </div>

        {/* Tech Stack Grid */}
        <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:gap-4">
          {techStack.map(({ name, Icon }) => (
            <div
              key={name}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-dark-border bg-dark-light/40 p-3 transition-all hover:border-primary/40 hover:bg-dark-light/70"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-dark-card p-1.5 sm:h-12 sm:w-12 sm:p-2">
                <Icon className="h-full w-full" />
              </div>
              <span className="text-center text-[10px] font-medium text-slate-300 sm:text-xs break-words leading-tight">
                {name}
              </span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href="tel:9007673274"
            className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold"
          >
            <ArrowRight className="h-4 w-4" />
            Free Counselling
          </a>
          <Link
            to="/computer-academy/register-teacher"
            className="btn-secondary inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold"
          >
            Register as Teacher
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ── Programs Section: School (Row-wise) ── */}
      <section className="mb-14">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="section-kicker">School Programs</span>
            <h2 className="mt-1 font-display text-xl font-bold text-white sm:text-2xl">
              Class VIII to XII
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-slate-300/70">
              Build strong foundations in computer science from school level with practical, project-based learning.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {schoolClasses.map((cls) => (
            <SchoolCard key={cls.grade} grade={cls.grade} topics={cls.topics} />
          ))}
        </div>
      </section>

      {/* ── Programs Section: College (Row-wise) ── */}
      <section className="mb-14">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="section-kicker">Higher Education</span>
            <h2 className="mt-1 font-display text-xl font-bold text-white sm:text-2xl">
              BCA & MCA
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-slate-300/70">
              Advance your career with in-depth coaching for bachelor and master level computer applications.
            </p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {higherCourses.map((course) => (
            <HigherCourseCard key={course.title} course={course} />
          ))}
        </div>
      </section>

      {/* ── Free Counselling CTA ── */}
      <section className="rounded-2xl border border-dark-border bg-gradient-to-r from-primary/10 via-dark-card to-accent/5 p-6 sm:p-8 text-center">
        <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
          Get Free Career Counselling
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-slate-300/80">
          Confused about which path to choose? Talk to our counsellors for personalized guidance on courses, colleges, and career options.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <a
            href="tel:9007673274"
            className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold"
          >
            <ArrowRight className="h-4 w-4" />
            Call for Free Counselling
          </a>
          <Link
            to="/"
            className="btn-secondary inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </section>

    </main>
  );
}
