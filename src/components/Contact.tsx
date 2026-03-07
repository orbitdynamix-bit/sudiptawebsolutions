import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Invalid email format';
    if (!formData.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'hello@sudiptainfotech.com', color: 'from-blue-500 to-cyan-500' },
    { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567', color: 'from-teal-500 to-emerald-500' },
    { icon: MapPin, label: 'Location', value: 'San Francisco, CA', color: 'from-amber-500 to-orange-500' },
  ];

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="section-kicker">Contact</span>
          <h2 className="section-title font-bold">
            Let's <span className="gradient-text">Talk</span>
          </h2>
          <p className="section-description">
            Have a project in mind? We'd love to hear about it. Send us a message and we'll get back within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((item) => (
              <div key={item.label} className="flex items-center gap-4 p-6 rounded-2xl surface card-hover">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-slate-500">{item.label}</div>
                  <div className="text-white font-medium">{item.value}</div>
                </div>
              </div>
            ))}

            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20">
              <h4 className="text-white font-bold mb-2">Free Consultation</h4>
              <p className="text-slate-300 text-sm">Book a free 30-minute discovery call to discuss your project requirements.</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="h-full flex items-center justify-center rounded-2xl glass p-12">
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-slate-300">We'll get back to you within 24 hours.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-2xl glass p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Name *</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl bg-dark-card border ${errors.name ? 'border-red-500' : 'border-dark-border'} text-white placeholder-slate-600 focus:outline-none focus:border-primary transition-colors`}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Email *</label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl bg-dark-card border ${errors.email ? 'border-red-500' : 'border-dark-border'} text-white placeholder-slate-600 focus:outline-none focus:border-primary transition-colors`}
                      placeholder="john@company.com"
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Subject</label>
                  <input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-dark-card border border-dark-border text-white placeholder-slate-600 focus:outline-none focus:border-primary transition-colors"
                    placeholder="Project inquiry"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-3 rounded-xl bg-dark-card border ${errors.message ? 'border-red-500' : 'border-dark-border'} text-white placeholder-slate-600 focus:outline-none focus:border-primary transition-colors resize-none`}
                    placeholder="Tell us about your project..."
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl btn-primary font-semibold text-lg transition-opacity"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
