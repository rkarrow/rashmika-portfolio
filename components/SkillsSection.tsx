'use client';

import React from 'react';
import { Film, Box, Palette, Cpu, CheckCircle2, Award, Globe2 } from 'lucide-react';

export default function SkillsSection() {
  const skillCategories = [
    {
      title: 'Motion & Video Editing',
      icon: Film,
      accent: 'cyan',
      skills: [
        { name: 'Adobe After Effects', level: 'Advanced / Broadcast' },
        { name: 'Adobe Premiere Pro', level: 'Advanced Editing & Color' },
        { name: 'CapCut Pro', level: 'Fast-Paced Social Edits' },
      ],
    },
    {
      title: '3D & Real-Time Production',
      icon: Box,
      accent: 'purple',
      skills: [
        { name: 'Autodesk Maya', level: '3D Modeling & Animation' },
        { name: 'Unreal Engine', level: 'Real-Time Environments & Lighting' },
        { name: 'Three.js / WebGL', level: 'Interactive Web 3D' },
      ],
    },
    {
      title: 'Graphic Design & UI/UX',
      icon: Palette,
      accent: 'pink',
      skills: [
        { name: 'Adobe Photoshop', level: 'Matte Painting & Compositing' },
        { name: 'Adobe Illustrator', level: 'Vector Graphics & Branding' },
        { name: 'Adobe InDesign', level: 'Print & Publication Layout' },
        { name: 'CorelDRAW', level: 'Vector & Signage Design' },
        { name: 'Figma / Adobe XD', level: 'UI / UX Wireframing' },
        { name: 'Canva', level: 'Rapid Marketing Assets' },
      ],
    },
    {
      title: 'AI Video & Next-Gen Tools',
      icon: Cpu,
      accent: 'amber',
      skills: [
        { name: 'Google Flow (AI Video)', level: 'Generative Video Pipelines' },
        { name: 'AI Image & Texture Gen', level: 'Diffusion & Procedural Art' },
        { name: 'Interactive Media', level: 'SLIIT Undergraduate Studies' },
      ],
    },
  ];

  const strengths = [
    'Motion Design Direction',
    'Broadcast TV Standards',
    'Kinetic Typography',
    '3D Asset Modeling',
    'Color Grading & Audio Sync',
    'AI-Assisted Video Synthesis',
    'Teamwork & Communication',
    'Time Management & Deadlines',
  ];

  return (
    <section id="skills" className="py-24 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono">
          <Award className="w-3.5 h-3.5" />
          <span>Technical Toolkit</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Software &amp; Creative Mastery
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Specialized in high-end industry software across broadcast motion graphics, video post-production, 3D real-time engines, and AI creative workflows.
        </p>
      </div>

      {/* Grid of 4 skill boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {skillCategories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.title}
              className="p-6 rounded-2xl bg-surface border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-surface-elevated border border-white/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-base font-bold text-white mb-4">{cat.title}</h3>
                <ul className="space-y-3">
                  {cat.skills.map((s) => (
                    <li key={s.name} className="flex flex-col">
                      <span className="text-sm font-medium text-slate-200">{s.name}</span>
                      <span className="text-[11px] font-mono text-cyan-400/80">{s.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Strengths & Languages Bar */}
      <div className="p-6 sm:p-8 rounded-2xl bg-surface-elevated/70 border border-cyan-500/20 backdrop-blur-md grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-8 space-y-4">
          <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400">
            Professional Strengths
          </h4>
          <div className="flex flex-wrap gap-2.5">
            {strengths.map((str) => (
              <span
                key={str}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-slate-200"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                {str}
              </span>
            ))}
          </div>
        </div>

        <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8 space-y-2">
          <h4 className="text-xs font-mono uppercase tracking-widest text-purple-400 flex items-center gap-1.5">
            <Globe2 className="w-3.5 h-3.5" /> Languages
          </h4>
          <p className="text-sm text-slate-200 font-mono">
            • English (Fluent) <br />
            • Sinhala (Native) <br />
            • Tamil (Working)
          </p>
        </div>
      </div>
    </section>
  );
}
