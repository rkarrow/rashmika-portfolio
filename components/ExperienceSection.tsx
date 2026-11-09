'use client';

import React from 'react';
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle } from 'lucide-react';

export default function ExperienceSection() {
  const experiences = [
    {
      role: 'Intern - Motion Graphics & Video',
      company: 'Swarnaavahini Television',
      period: 'Present',
      type: 'Broadcast Media',
      bullets: [
        'Creating high-impact broadcast motion graphics and edited video content for national television and digital channels.',
        'Working extensively with After Effects, Premiere Pro, and cutting-edge generative AI video tools like Google Flow.',
        'Collaborating with creative directors, sound engineers, and producers to meet strict broadcast deadlines.',
      ],
    },
    {
      role: 'Motion Graphic Designer / Video Editor',
      company: 'Dahamaya Creation',
      period: '6 Months',
      type: 'Creative Agency',
      bullets: [
        'Designed animated title sequences, 3D/2D logo animations, and promotional commercials for corporate clients.',
        'Edited fast-paced video content for social media, brand campaigns, and live events.',
        'Maintained high delivery speed while preserving audio fidelity and precise color grading.',
      ],
    },
    {
      role: 'Graphic Designer',
      company: 'Cebit Computers',
      period: '2023 – 2024',
      type: 'Brand & Marketing',
      bullets: [
        'Designed promotional posters, marketing banners, social media creatives, and print advertisements.',
        'Created cohesive branding identities aligning with business goals using Photoshop, Illustrator, and InDesign.',
      ],
    },
  ];

  const education = [
    {
      degree: 'BSc (Hons) in Interactive Media',
      institution: 'Sri Lanka Institute of Information Technology (SLIIT)',
      period: '2023 – Present',
      highlight: 'GPA: 3.0',
    },
    {
      degree: 'NVQ Level 4 Certified in Graphic Design',
      institution: 'National Apprentice and Industrial Training Authority (NAITA)',
      period: '2022',
      highlight: 'National Certification',
    },
    {
      degree: 'Diploma in English',
      institution: 'Kakirawa English Academy',
      period: '2021',
      highlight: 'Professional Fluency',
    },
    {
      degree: 'G.C.E. Advanced Level & Ordinary Level',
      institution: 'Ministry of Education, Sri Lanka',
      period: 'Passed (2021 & 2018)',
      highlight: 'Academic Foundation',
    },
  ];

  return (
    <section id="experience" className="py-24 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Work Experience */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Career Journey</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Work Experience
            </h2>
          </div>

          <div className="space-y-6 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:via-purple-500 before:to-transparent">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-10">
                {/* Node Dot */}
                <div className="absolute left-1.5 top-1.5 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400" />

                <div className="p-6 rounded-2xl bg-surface border border-white/10 hover:border-cyan-500/30 transition">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {exp.period}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{exp.type}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                  <div className="text-cyan-400 font-mono text-xs mb-3">{exp.company}</div>

                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                    {exp.bullets.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Education & Qualifications */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Academic Track</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Education
            </h2>
          </div>

          <div className="space-y-4">
            {education.map((edu, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl bg-surface border border-white/10 hover:border-purple-500/30 transition flex flex-col justify-between"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-mono text-purple-400">{edu.period}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                    {edu.highlight}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white">{edu.degree}</h3>
                <p className="text-xs text-slate-400 mt-1">{edu.institution}</p>
              </div>
            ))}
          </div>

          {/* Quick CV Download Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/40 to-purple-950/40 border border-cyan-500/30 text-center space-y-3">
            <h4 className="text-sm font-bold text-white">Need Rashmika&apos;s Full Curriculum Vitae?</h4>
            <p className="text-xs text-slate-300">
              Download the official resume document with detailed verified credentials and project archives.
            </p>
            <a
              href="/cv/rashmika-cv.png"
              download="Rashmika-Kavindu-CV.png"
              className="inline-block px-5 py-2.5 rounded-xl font-mono text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition shadow-md shadow-cyan-400/20"
            >
              Download Complete Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
