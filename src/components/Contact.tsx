import { useState } from 'react';
import { BriefcaseBusiness, CalendarCheck2, CheckCircle2, Mail, MapPin, Phone, Send } from 'lucide-react';
import { services } from '../data/services';
import { apiPost } from '../lib/api';

type QueryForm = {
  name: string;
  email: string;
  service: string;
  message: string;
};

type AppointmentForm = {
  fullName: string;
  company: string;
  preferredDate: string;
  mode: 'Online' | 'Offline';
  notes: string;
};

export default function Contact() {
  const [queryForm, setQueryForm] = useState<QueryForm>({
    name: '',
    email: '',
    service: '',
    message: '',
  });
  const [appointmentForm, setAppointmentForm] = useState<AppointmentForm>({
    fullName: '',
    company: '',
    preferredDate: '',
    mode: 'Online',
    notes: '',
  });
  const [querySubmitted, setQuerySubmitted] = useState(false);
  const [appointmentSubmitted, setAppointmentSubmitted] = useState(false);
  const [querySubmitting, setQuerySubmitting] = useState(false);
  const [appointmentSubmitting, setAppointmentSubmitting] = useState(false);
  const [queryError, setQueryError] = useState('');
  const [appointmentError, setAppointmentError] = useState('');

  const vacancies = [
    'Frontend Developer (React + TypeScript)',
    'Digital Marketing & SEO Executive',
    'Corporate Trainer (C/C++/Java/Python/DBMS)',
  ];

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'sudiptawebsolution@gmail.com', color: 'from-blue-500 to-cyan-500' },
    { icon: Phone, label: 'Phone', value: '9007673274', color: 'from-teal-500 to-emerald-500' },
    { icon: MapPin, label: 'Address', value: 'Jadavpur, Kolkata, PIN - 700075', color: 'from-amber-500 to-orange-500' },
  ];

  const submitProjectQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryForm.name || !queryForm.email || !queryForm.service || !queryForm.message) return;
    setQuerySubmitting(true);
    setQueryError('');

    try {
      await apiPost('/project-queries', queryForm);
      setQuerySubmitted(true);
      setTimeout(() => setQuerySubmitted(false), 2500);
      setQueryForm({ name: '', email: '', service: '', message: '' });
    } catch (error) {
      setQueryError(error instanceof Error ? error.message : 'Could not submit query.');
    } finally {
      setQuerySubmitting(false);
    }
  };

  const submitAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appointmentForm.fullName || !appointmentForm.preferredDate || !appointmentForm.notes) return;
    setAppointmentSubmitting(true);
    setAppointmentError('');

    try {
      await apiPost('/appointments', appointmentForm);
      setAppointmentSubmitted(true);
      setTimeout(() => setAppointmentSubmitted(false), 2500);
      setAppointmentForm({ fullName: '', company: '', preferredDate: '', mode: 'Online', notes: '' });
    } catch (error) {
      setAppointmentError(error instanceof Error ? error.message : 'Could not submit appointment.');
    } finally {
      setAppointmentSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="section-kicker">Contact</span>
          <h2 className="section-title font-bold">
            For Project <span className="gradient-text">Query & Appointment</span>
          </h2>
          <p className="section-description">
            Share your requirement, book an appointment, or apply for open positions at SUDIPTA WEB SOLUTIONS.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <aside className="space-y-6">
            {contactInfo.map((item) => (
              <div key={item.label} className="flex items-center gap-4 p-6 rounded-2xl surface card-hover">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-slate-400">{item.label}</div>
                  <div className="text-white font-medium">{item.value}</div>
                </div>
              </div>
            ))}

            <div className="surface rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <BriefcaseBusiness className="w-5 h-5 text-accent" />
                <h3 className="text-white font-bold">Career Openings</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                {vacancies.map((job) => (
                  <li key={job} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                    {job}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-slate-300 mt-4">
                Send CV to: <span className="text-white font-semibold">sudiptawebsolution@gmail.com</span>
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20">
              <h4 className="text-white font-bold mb-2">Book Appointment</h4>
              <p className="text-slate-200 text-sm">
                Book a 30-minute technical call to discuss architecture, pricing and timeline for your project.
              </p>
            </div>
          </aside>

          <div className="lg:col-span-2 grid xl:grid-cols-2 gap-6">
            <form onSubmit={submitProjectQuery} className="rounded-2xl glass p-6 space-y-4">
              <h3 className="text-xl font-bold text-white">For Project Query</h3>
              <input
                value={queryForm.name}
                onChange={(e) => setQueryForm((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-xl bg-dark-card border border-dark-border text-white placeholder-slate-500 focus:outline-none focus:border-primary"
              />
              <input
                type="email"
                value={queryForm.email}
                onChange={(e) => setQueryForm((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="Your email"
                className="w-full px-4 py-3 rounded-xl bg-dark-card border border-dark-border text-white placeholder-slate-500 focus:outline-none focus:border-primary"
              />
              <select
                value={queryForm.service}
                onChange={(e) => setQueryForm((prev) => ({ ...prev, service: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-dark-card border border-dark-border text-white focus:outline-none focus:border-primary"
              >
                <option value="">Select service</option>
                {services.map((service) => (
                  <option key={service.slug} value={service.title}>
                    {service.title}
                  </option>
                ))}
              </select>
              <textarea
                rows={4}
                value={queryForm.message}
                onChange={(e) => setQueryForm((prev) => ({ ...prev, message: e.target.value }))}
                placeholder="Tell us about your project requirement"
                className="w-full px-4 py-3 rounded-xl bg-dark-card border border-dark-border text-white placeholder-slate-500 focus:outline-none focus:border-primary resize-none"
              />
              <button
                type="submit"
                disabled={querySubmitting}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl btn-primary font-semibold disabled:opacity-60"
              >
                <Send className="w-4 h-4" />
                {querySubmitting ? 'Sending...' : 'Send Query'}
              </button>
              {queryError && <p className="text-rose-300 text-sm">{queryError}</p>}
              {querySubmitted && (
                <p className="text-emerald-300 text-sm flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Query submitted successfully.
                </p>
              )}
            </form>

            <form onSubmit={submitAppointment} className="rounded-2xl glass p-6 space-y-4">
              <h3 className="text-xl font-bold text-white">Book Appointment</h3>
              <input
                value={appointmentForm.fullName}
                onChange={(e) => setAppointmentForm((prev) => ({ ...prev, fullName: e.target.value }))}
                placeholder="Full name"
                className="w-full px-4 py-3 rounded-xl bg-dark-card border border-dark-border text-white placeholder-slate-500 focus:outline-none focus:border-primary"
              />
              <input
                value={appointmentForm.company}
                onChange={(e) => setAppointmentForm((prev) => ({ ...prev, company: e.target.value }))}
                placeholder="Company / Organization"
                className="w-full px-4 py-3 rounded-xl bg-dark-card border border-dark-border text-white placeholder-slate-500 focus:outline-none focus:border-primary"
              />
              <input
                type="date"
                value={appointmentForm.preferredDate}
                onChange={(e) => setAppointmentForm((prev) => ({ ...prev, preferredDate: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-dark-card border border-dark-border text-white focus:outline-none focus:border-primary"
              />
              <select
                value={appointmentForm.mode}
                onChange={(e) => setAppointmentForm((prev) => ({ ...prev, mode: e.target.value as 'Online' | 'Offline' }))}
                className="w-full px-4 py-3 rounded-xl bg-dark-card border border-dark-border text-white focus:outline-none focus:border-primary"
              >
                <option value="Online">Online Meeting</option>
                <option value="Offline">Offline Meeting</option>
              </select>
              <textarea
                rows={3}
                value={appointmentForm.notes}
                onChange={(e) => setAppointmentForm((prev) => ({ ...prev, notes: e.target.value }))}
                placeholder="What do you want to discuss?"
                className="w-full px-4 py-3 rounded-xl bg-dark-card border border-dark-border text-white placeholder-slate-500 focus:outline-none focus:border-primary resize-none"
              />
              <button
                type="submit"
                disabled={appointmentSubmitting}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl btn-secondary font-semibold disabled:opacity-60"
              >
                <CalendarCheck2 className="w-4 h-4" />
                {appointmentSubmitting ? 'Submitting...' : 'Confirm Appointment'}
              </button>
              {appointmentError && <p className="text-rose-300 text-sm">{appointmentError}</p>}
              {appointmentSubmitted && (
                <p className="text-emerald-300 text-sm flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Appointment request sent.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
