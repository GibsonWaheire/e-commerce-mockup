import { useState } from 'react';
import Section from '../components/Section.jsx';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', order: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email is required';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSent(true);
    setForm({ name: '', email: '', subject: '', order: '', message: '' });
    setTimeout(() => setSent(false), 2500);
  };

  return (
    <Section>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-balance">Contact Us</h1>
        <p className="text-gray-600 mb-8">We usually reply within 24 hours. You can also reach us on WhatsApp.</p>

        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input id="name" value={form.name} onChange={(e)=>setForm(f=>({...f,name:e.target.value}))}
              aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-err' : undefined}
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2" />
            {errors.name && <p id="name-err" className="text-sm text-red-600 mt-1">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input id="email" type="email" value={form.email} onChange={(e)=>setForm(f=>({...f,email:e.target.value}))}
              aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-err' : undefined}
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2" />
            {errors.email && <p id="email-err" className="text-sm text-red-600 mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
            <input id="subject" value={form.subject} onChange={(e)=>setForm(f=>({...f,subject:e.target.value}))}
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2" />
          </div>
          <div>
            <label htmlFor="order" className="block text-sm font-medium text-gray-700">Order # (optional)</label>
            <input id="order" value={form.order} onChange={(e)=>setForm(f=>({...f,order:e.target.value}))}
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea id="message" rows={5} value={form.message} onChange={(e)=>setForm(f=>({...f,message:e.target.value}))}
              aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-err' : undefined}
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2" />
            {errors.message && <p id="message-err" className="text-sm text-red-600 mt-1">{errors.message}</p>}
          </div>
          <div className="flex items-center gap-3">
            <button className="btn btn-primary">Send Message</button>
            <a href="https://wa.me/15551234567" target="_blank" rel="noreferrer" className="btn btn-outline">WhatsApp</a>
            {sent && <span className="text-green-600">Message sent!</span>}
          </div>
        </form>
      </div>
    </Section>
  );
}
