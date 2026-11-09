import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 border-t border-white/10 bg-slate-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500 font-mono">
        <div className="flex items-center gap-2">
          <span>© {new Date().getFullYear()} Rashmika Kavindu.</span>
          <span>Crafted for Motion &amp; 3D Art.</span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://linkedin.com/in/rashmika-kavindu-475095334"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/rkarrow"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition"
          >
            GitHub
          </a>
          <Link
            href="/admin"
            className="flex items-center gap-1 text-slate-400 hover:text-cyan-300 transition"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Admin CMS</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
