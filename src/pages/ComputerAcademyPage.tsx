import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  BookOpen,
  Users,
  Monitor,
  ArrowRight,
  ChevronDown,
  Clock,
  CheckCircle2,
  Laptop,
  ArrowLeft,
  Home,
} from 'lucide-react';

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

function FeaturePill({
  icon: Icon,
  label,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  accent: 'teal' | 'orange';
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold',
        accent === 'teal'
          ? 'border-primary/30 bg-primary/10 text-primary-light'
          : 'border-accent/30 bg-accent/10 text-accent',
      )}
    >
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}

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

function HigherCourseCard({ course, defaultOpen }: { course: HigherCourse; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  const subjects = course.subjects;

  return (
    <div className="surface rounded-2xl overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-4 sm:p-5 text-left"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15">
            <GraduationCap className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h4 className="font-display text-base font-semibold text-white">{course.title}</h4>
            <span className="flex items-center gap-1.5 text-xs text-slate-400">
              <Clock className="h-3 w-3" />
              {course.duration}
            </span>
          </div>
        </div>
        <ChevronDown
          className={cn(
            'h-5 w-5 text-slate-400 transition-transform duration-300',
            open && 'rotate-180',
          )}
        />
      </button>

      {/* Subjects */}
      <div
        className={cn(
          'grid transition-all duration-300',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="grid gap-2 border-t border-dark-border p-4 sm:grid-cols-2">
            {subjects.map((sub) => (
              <div
                key={sub.name}
                className="rounded-lg bg-dark-light/60 p-3 border border-dark-border/50 card-hover"
              >
                <h5 className="mb-0.5 text-sm font-semibold text-primary-light">{sub.name}</h5>
                <p className="text-xs text-slate-400">{sub.description}</p>
              </div>
            ))}
          </div>
        </div>
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
          className="inline-flex items-center gap-2 rounded-xl border border-dark-border bg-dark-card/60 px-4 py-2 text-sm text-slate-300 transition-all hover:border-primary/40 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
      </div>

      {/* ── Unified Hero ── */}
      <div className="mb-10 overflow-hidden rounded-3xl border border-dark-border bg-gradient-to-br from-dark-card via-dark-card to-primary/10">
        <div className="grid items-center gap-6 p-6 sm:p-8 lg:grid-cols-5 lg:gap-8">
          {/* Left: Content */}
          <div className="lg:col-span-3">
            <span className="section-kicker">Computer Academy</span>
            <h1 className="mt-2 font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
              Shape Your Future in{' '}
              <span className="gradient-text">Tech</span>
            </h1>
            <p className="mt-2 max-w-lg text-sm text-slate-300/80">
              From school-level computer fundamentals to advanced BCA &amp; MCA programs — we
              guide every student toward a successful career in technology.
            </p>

            {/* Feature pills */}
            <div className="mt-4 flex flex-wrap gap-2">
              <FeaturePill icon={Monitor} label="School Level: Class VIII–XII" accent="teal" />
              <FeaturePill icon={Users} label="Free Counselling for Higher Study" accent="orange" />
            </div>

            {/* CTAs */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a
                href="#book-demo"
                className="btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all hover:scale-105 active:scale-95"
              >
                Book Free Demo Class
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/computer-academy/register-teacher"
                className="btn-secondary inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all hover:border-primary/50"
              >
                Register as Teacher
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-accent/20 blur-[60px]" />
              <div className="relative flex h-32 w-32 items-center justify-center rounded-3xl bg-white/5 backdrop-blur border border-white/10 sm:h-36 sm:w-36">
                <Laptop className="h-14 w-14 text-white/80 sm:h-16 sm:w-16" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Register as Teacher CTA ── */}
      <div className="mb-10 rounded-2xl border border-dark-border bg-gradient-to-r from-dark-card via-dark-card to-accent/5 p-5 sm:flex sm:items-center sm:justify-between sm:p-6">
        <div className="mb-3 sm:mb-0">
          <h3 className="font-display text-base font-bold text-white sm:text-lg">
            Are You an Educator?
          </h3>
          <p className="mt-0.5 text-sm text-slate-300/80">
            Join our academy as an instructor. Teach BCA, MCA, BBA, and computer-related subjects.
          </p>
        </div>
        <Link
          to="/computer-academy/register-teacher"
          className="btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold whitespace-nowrap transition-all hover:scale-105 active:scale-95"
        >
          Register as Teacher
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

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

        <div className="grid gap-4 md:grid-cols-2">
          {higherCourses.map((course, i) => (
            <HigherCourseCard key={course.title} course={course} defaultOpen={i === 0} />
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="rounded-2xl border border-dark-border bg-gradient-to-r from-primary/10 via-dark-card to-accent/5 p-6 sm:p-8 text-center">
        <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
          Start Your Learning Journey
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-slate-300/80">
          Book a free demo class or speak with our counsellors to choose the right track for you.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#book-demo"
            className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all hover:scale-105 active:scale-95"
          >
            Book Free Demo Class
            <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            to="/"
            className="btn-secondary inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all hover:border-primary/50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </section>

    </main>
  );
}
