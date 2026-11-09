'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Box, Film, Sparkles, Download, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Works', href: '#works' },
    { label: '3D Studio', href: '#3d-studio' },
    { label: 'Skills & Tools', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/80 backdrop-blur-xl border-b border-cyan-500/15 py-3 shadow-lg shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1.5px] transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <span className="font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-lg">
                RK
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white tracking-wider text-sm sm:text-base group-hover:text-cyan-400 transition">
              RASHMIKA KAVINDU
            </span>
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
              Motion & 3D Artist
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs uppercase tracking-wider font-mono text-slate-300 hover:text-cyan-400 transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/cv/rashmika-cv.png"
            download="Rashmika-Kavindu-CV.png"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 transition"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Download CV</span>
          </a>

          <Link
            href="/admin"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition shadow-sm shadow-cyan-500/20"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Admin CMS</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-white/5 text-slate-300 hover:text-white"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-xl border-b border-cyan-500/20 px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-mono uppercase tracking-wider text-slate-300 hover:text-cyan-400 py-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            <a
              href="/cv/rashmika-cv.png"
              download="Rashmika-Kavindu-CV.png"
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-mono text-slate-200 bg-white/5 border border-white/10"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              Download CV
            </a>

            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/30"
            >
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Admin Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
