import { useState, type FormEvent } from 'react';
import { cn } from '@/lib/utils';
import {
  GraduationCap,
  Briefcase,
  BookOpen,
  Award,
  Upload,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Home,
  IdCard,
  Camera,
  FileText,
  MapPin,
} from 'lucide-react';
import { Link } from 'react-router-dom';

/* ─────────────────────────────────────────────
   Constants
   ───────────────────────────────────────────── */

const SUBJECT_OPTIONS = [
  { label: 'BCA Subjects', value: 'bca' },
  { label: 'MCA Subjects', value: 'mca' },
  { label: 'BBA (IT/Systems)', value: 'bba' },
  { label: 'B.Sc Computer Science', value: 'bsc-cs' },
  { label: 'B.Tech Computer Science', value: 'btech-cs' },
  { label: 'Diploma in Computer Applications', value: 'dca' },
  { label: 'Other Computer-Related Courses', value: 'other' },
];

const BENEFITS = [
  { icon: GraduationCap, text: 'Teach passionate students eager to learn' },
  { icon: Award, text: 'Competitive pay with flexible scheduling' },
  { icon: Briefcase, text: 'Access to modern teaching tools and labs' },
  { icon: BookOpen, text: 'Continuous professional development support' },
];

/* ─────────────────────────────────────────────
   Page
   ───────────────────────────────────────────── */

export default function RegisterTeacherPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  if (submitted) {
    return (
      <main className="relative z-10 mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-4 pb-24 pt-40 text-center">
        <div className="glass rounded-3xl p-10 sm:p-14">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/20">
            <CheckCircle2 className="h-10 w-10 text-primary-light" />
          </div>
          <h2 className="mb-3 font-display text-2xl font-bold text-white sm:text-3xl">
            Registration Submitted!
          </h2>
          <p className="mb-8 text-slate-300/80">
            Thank you for your interest in joining Bharat Computer Academy. Our team will review your
            application and reach out within 2–3 business days.
          </p>
          <Link
            to="/computer-academy"
            className="btn-secondary inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Academy
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-6 sm:px-6 lg:px-8">
      {/* Back links */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/computer-academy"
          className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl border border-dark-border bg-dark-card/60 px-4 py-2 text-sm text-slate-300 transition-all hover:border-primary/40 hover:text-white"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
      </div>

      {/* Header */}
      <div className="mb-12 text-center">
        <span className="section-kicker">Bharat Computer Academy</span>
        <h1 className="section-title gradient-text">Register as a Teacher</h1>
        <p className="section-description">
          Share your expertise and shape the next generation of tech talent. We welcome
          educators from all computer science disciplines.
        </p>
      </div>

      {/* Split layout */}
      <div className="grid gap-8 lg:grid-cols-5">
        {/* Left: Benefits */}
        <div className="lg:col-span-2">
          <div className="glass sticky top-28 rounded-2xl p-6 sm:p-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15">
                <Sparkles className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-display text-lg font-semibold text-white">
                Why Teach With Us?
              </h3>
            </div>
            <ul className="space-y-4">
              {BENEFITS.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-4 w-4 text-primary-light" />
                  </div>
                  <span className="text-sm text-slate-200/80">{text}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-xl bg-dark-card/60 p-4 border border-dark-border/40">
              <p className="text-xs leading-relaxed text-slate-400">
                &ldquo;Bharat Computer Academy gave me the platform to reach students who are
                genuinely curious about technology. The support from the team is
                outstanding.&rdquo;
                <br />
                <span className="mt-2 block font-semibold text-slate-300">
                  — Ananya S., Senior Instructor
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 sm:p-8">
            <h3 className="mb-6 font-display text-xl font-semibold text-white">
              Teacher Registration Form
            </h3>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* Full Name */}
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-slate-300">
                  Full Name <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Dr. John Doe"
                  className="w-full rounded-xl border border-dark-border bg-dark-light/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">
                  Email Address <span className="text-accent">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="teacher@example.com"
                  className="w-full rounded-xl border border-dark-border bg-dark-light/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">
                  Phone Number <span className="text-accent">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  className="w-full rounded-xl border border-dark-border bg-dark-light/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
                />
              </div>

              {/* Address - Street */}
              <div className="sm:col-span-2">
                <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-300">
                  <MapPin className="h-3.5 w-3.5 text-accent" />
                  Address <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="House/Flat, Street, Locality"
                  className="w-full rounded-xl border border-dark-border bg-dark-light/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
                />
              </div>

              {/* City / State / Pin */}
              <div>
                <input
                  type="text"
                  required
                  placeholder="City"
                  className="w-full rounded-xl border border-dark-border bg-dark-light/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
                />
              </div>
              <div>
                <input
                  type="text"
                  required
                  placeholder="State"
                  className="w-full rounded-xl border border-dark-border bg-dark-light/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
                />
              </div>
              <div className="sm:col-span-2">
                <input
                  type="text"
                  required
                  placeholder="PIN Code"
                  className="w-full rounded-xl border border-dark-border bg-dark-light/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
                />
              </div>

              {/* Experience */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">
                  Teaching Experience (years) <span className="text-accent">*</span>
                </label>
                <select
                  required
                  defaultValue=""
                  className="w-full rounded-xl border border-dark-border bg-dark-light/80 px-4 py-3 text-sm text-white focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors appearance-none"
                  style={{
                    backgroundImage:
                      'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 fill=%27%2364748b%27 viewBox=%270 0 16 16%27%3E%3Cpath d=%27M4.646 5.646a.5.5 0 0 1 .708 0L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z%27/%3E%3C/svg%3E")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    paddingRight: '2.5rem',
                  }}
                >
                  <option value="" disabled>
                    Select experience
                  </option>
                  <option value="0-2">0–2 years</option>
                  <option value="3-5">3–5 years</option>
                  <option value="6-10">6–10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>

              {/* Subject Expertise */}
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-slate-300">
                  Subject Expertise (select all that apply){' '}
                  <span className="text-accent">*</span>
                </label>
                <select
                  required
                  multiple
                  className="w-full rounded-xl border border-dark-border bg-dark-light/80 px-4 py-3 text-sm text-white focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
                  style={{ minHeight: '7rem' }}
                >
                  {SUBJECT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-slate-500">
                  Hold Cmd/Ctrl to select multiple subjects
                </p>
              </div>

              {/* Highest Qualification */}
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-slate-300">
                  Highest Qualification <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. M.Tech in Computer Science, Ph.D."
                  className="w-full rounded-xl border border-dark-border bg-dark-light/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
                />
              </div>

              {/* ── Document Uploads ── */}
              <div className="sm:col-span-2 mt-2">
                <p className="mb-3 text-sm font-semibold text-slate-200">Upload Documents</p>
              </div>

              {/* Aadhar Card */}
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-300">
                  <IdCard className="h-3.5 w-3.5 text-accent" />
                  Aadhar Card <span className="text-accent">*</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    required
                    accept="image/*,.pdf"
                    className="w-full rounded-xl border border-dark-border bg-dark-light/80 px-4 py-8 text-sm text-slate-400 file:mr-4 file:rounded-lg file:border-0 file:bg-primary/15 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-light hover:file:bg-primary/25 focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
                  />
                  <Upload className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 h-5 w-5 text-slate-500" />
                </div>
                <p className="mt-1 text-xs text-slate-500">Front & back side (image or PDF)</p>
              </div>

              {/* Passport Photo */}
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-300">
                  <Camera className="h-3.5 w-3.5 text-accent" />
                  Passport Size Photo <span className="text-accent">*</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    required
                    accept="image/*"
                    className="w-full rounded-xl border border-dark-border bg-dark-light/80 px-4 py-8 text-sm text-slate-400 file:mr-4 file:rounded-lg file:border-0 file:bg-primary/15 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-light hover:file:bg-primary/25 focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
                  />
                  <Upload className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 h-5 w-5 text-slate-500" />
                </div>
                <p className="mt-1 text-xs text-slate-500">Recent passport size photograph</p>
              </div>

              {/* Final Marksheet */}
              <div className="sm:col-span-2">
                <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-300">
                  <FileText className="h-3.5 w-3.5 text-accent" />
                  Final Marksheet <span className="text-accent">*</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    required
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="w-full rounded-xl border border-dark-border bg-dark-light/80 px-4 py-8 text-sm text-slate-400 file:mr-4 file:rounded-lg file:border-0 file:bg-primary/15 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-light hover:file:bg-primary/25 focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
                  />
                  <Upload className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 h-5 w-5 text-slate-500" />
                </div>
                <p className="mt-1 text-xs text-slate-500">Highest degree marksheet</p>
              </div>

              {/* Cover Note */}
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-slate-300">
                  Why do you want to teach at Bharat Computer Academy?
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your teaching philosophy and why you'd be a great fit..."
                  className="w-full resize-none rounded-xl border border-dark-border bg-dark-light/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={cn(
                'btn-primary mt-8 w-full rounded-xl py-3.5 text-sm font-semibold tracking-wide transition-all',
                loading ? 'cursor-not-allowed opacity-70' : 'hover:scale-[1.02] active:scale-95',
              )}
            >
              {loading ? 'Submitting...' : 'Submit Registration'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
