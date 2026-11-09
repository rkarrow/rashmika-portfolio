'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { ArrowDown, Box, Sparkles, Film, Palette, Compass, Mail, ExternalLink } from 'lucide-react';

// Dynamic import for Three.js Hero Scene to avoid SSR issues
const ThreeHeroScene = dynamic(() => import('./ThreeHeroScene'), { ssr: false });

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background Radial Glow Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/15 via-purple-600/15 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute -top-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Copy & Actions */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-elevated/80 border border-cyan-500/30 backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-cyan-300">
              Available for Freelance & Studio Projects
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h2 className="text-xs sm:text-sm font-mono tracking-[0.25em] text-cyan-400 uppercase">
              Creative Portfolio
            </h2>
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.08]">
              RASHMIKA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500">
                KAVINDU
              </span>
            </h1>
          </div>

          {/* Disciplines Chips */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              <Film className="w-3.5 h-3.5 text-cyan-400" /> Motion Graphics
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20">
              <Box className="w-3.5 h-3.5 text-purple-400" /> 3D Works & Maya
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-pink-500/10 text-pink-300 border border-pink-500/20">
              <Palette className="w-3.5 h-3.5 text-pink-400" /> Graphic Design
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-blue-500/10 text-blue-300 border border-blue-500/20">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" /> Video Editing & AI
            </span>
          </div>

          {/* Bio statement */}
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Interactive Media undergraduate at <span className="text-cyan-400 font-semibold">SLIIT</span> and creative Motion Graphic Designer, Video Editor, and 3D Artist. Experienced with Swarnaavahini broadcast, Dahamaya Creation, and Cebit Computers crafting high-impact visual stories.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            <a
              href="#works"
              className="px-6 py-3 rounded-xl font-mono text-xs uppercase tracking-wider font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5"
            >
              Explore Portfolio
            </a>

            <a
              href="#3d-studio"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-xs uppercase tracking-wider font-semibold bg-surface-elevated hover:bg-slate-800 text-white border border-cyan-500/30 transition-all transform hover:-translate-y-0.5 shadow-md shadow-purple-500/10"
            >
              <Box className="w-4 h-4 text-cyan-400" />
              <span>Launch 3D Studio</span>
            </a>

            <a
              href="#contact"
              className="flex items-center gap-2 px-5 py-3 rounded-xl font-mono text-xs uppercase tracking-wider text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition"
            >
              <Mail className="w-4 h-4 text-purple-400" />
              <span>Get in Touch</span>
            </a>
          </div>

          {/* Key Stats Bar */}
          <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10 max-w-lg mx-auto lg:mx-0">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono">3+</div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">Years Creative Exp</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-purple-400 font-mono">4</div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">Core Disciplines</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-pink-400 font-mono">100%</div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">Passion & Precision</div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 3D Canvas with Rashmika's Avatar Card */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          {/* 3D Kinetic Scene Canvas */}
          <div className="w-full relative rounded-3xl bg-surface/50 border border-white/10 backdrop-blur-xl p-4 overflow-hidden shadow-2xl">
            <div className="w-full h-80 sm:h-96">
              <ThreeHeroScene />
            </div>

            {/* Profile Avatar Card Overlay */}
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/30 backdrop-blur-md flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-950">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/rashmika-avatar.png"
                    alt="Rashmika Kavindu"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-white truncate">Rashmika Kavindu</h4>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">PRO</span>
                </div>
                <p className="text-xs text-slate-400 truncate">
                  Pittugala, Malabe • SLIIT Undergrad
                </p>
                <div className="text-[10px] text-cyan-400 font-mono flex items-center gap-1 mt-0.5">
                  <span>Maya</span> • <span>Unreal</span> • <span>After Effects</span> • <span>Premiere</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
