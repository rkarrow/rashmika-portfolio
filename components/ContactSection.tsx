'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Copy, Check, ExternalLink, Github, Linkedin } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const copyEmail = () => {
    navigator.clipboard.writeText('Rashmikak217@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setStatusMsg(data.message || 'Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setStatusMsg(data.error || 'Failed to send message');
      }
    } catch (e: any) {
      setStatus('error');
      setStatusMsg(e.message || 'Network error');
    }
  };

  return (
    <section id="contact" className="py-24 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Info Column */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
              <Mail className="w-3.5 h-3.5" />
              <span>Let&apos;s Collaborate</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Start a Creative Project
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Have a motion graphic, 3D modeling, commercial video editing, or graphic design project in mind? Reach out directly or send a message below.
            </p>
          </div>

          {/* Direct Contact Cards */}
          <div className="space-y-4">
            {/* Email Card */}
            <div className="p-4 rounded-xl bg-surface border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400">Direct Email</div>
                  <a
                    href="mailto:Rashmikak217@gmail.com"
                    className="text-sm font-semibold text-white hover:text-cyan-400 transition"
                  >
                    Rashmikak217@gmail.com
                  </a>
                </div>
              </div>
              <button
                onClick={copyEmail}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition"
                title="Copy Email"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone Card */}
            <div className="p-4 rounded-xl bg-surface border border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-mono text-slate-400">Call / WhatsApp</div>
                <a
                  href="tel:0742952857"
                  className="text-sm font-semibold text-white hover:text-purple-400 transition"
                >
                  074 295 2857
                </a>
              </div>
            </div>

            {/* Location Card */}
            <div className="p-4 rounded-xl bg-surface border border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-mono text-slate-400">Location</div>
                <div className="text-sm font-semibold text-white">Pittugala, Malabe, Sri Lanka</div>
              </div>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="pt-2 flex items-center gap-3">
            <a
              href="https://linkedin.com/in/rashmika-kavindu-475095334"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface border border-white/10 text-xs font-mono text-slate-300 hover:text-white hover:border-cyan-500/40 transition"
            >
              <Linkedin className="w-4 h-4 text-cyan-400" />
              <span>LinkedIn</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>

            <a
              href="https://github.com/rkarrow"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface border border-white/10 text-xs font-mono text-slate-300 hover:text-white hover:border-purple-500/40 transition"
            >
              <Github className="w-4 h-4 text-purple-400" />
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
          </div>
        </div>

        {/* Message Form Column */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="p-8 rounded-2xl bg-surface border border-cyan-500/20 backdrop-blur-md shadow-2xl space-y-6"
          >
            <h3 className="text-xl font-bold text-white mb-2">Send an Instant Message</h3>

            {status === 'success' && (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span>{statusMsg}</span>
              </div>
            )}

            {status === 'error' && (
              <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs sm:text-sm flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <span>{statusMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Kasun Perera"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                Project Subject
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Motion Graphics / 3D Asset / Video Editing"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                Project Details / Message *
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell me about your project scope, deadlines, and requirements..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition disabled:opacity-50"
            >
              {status === 'loading' ? (
                <span>Transmitting Message...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Project Inquiry</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
