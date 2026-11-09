'use client';

import React, { useState, useEffect } from 'react';
import { ProjectItem, initialProjects } from '@/lib/initialData';
import ProjectModal from './ProjectModal';
import { Box, Play, Eye, Sparkles, Filter, Layers } from 'lucide-react';

export default function PortfolioSection() {
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          setProjects(data.data);
        }
      } catch (e) {
        console.warn('Could not fetch projects API, using default data:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const categories = [
    { id: 'all', label: 'All Works' },
    { id: 'motion', label: 'Motion Graphics' },
    { id: '3d', label: '3D Works' },
    { id: 'video', label: 'Video Editing' },
    { id: 'graphic', label: 'Graphic Design' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="works" className="py-24 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-elevated border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Featured Projects &amp; Works
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
            Explore commercial broadcast packages, interactive 3D assets, cinematic promo edits, and brand visuals crafted with precision.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-surface-elevated/70 border border-white/10 backdrop-blur">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProjects.map((project) => {
          const is3D = project.category === '3d';
          const isVideo = project.category === 'video' || (project.category === 'motion' && project.videoUrl);

          return (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-surface border border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className={`text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full backdrop-blur-md border ${
                      is3D
                        ? 'bg-purple-900/70 border-purple-400/40 text-purple-200'
                        : project.category === 'motion'
                        ? 'bg-cyan-900/70 border-cyan-400/40 text-cyan-200'
                        : project.category === 'video'
                        ? 'bg-blue-900/70 border-blue-400/40 text-blue-200'
                        : 'bg-pink-900/70 border-pink-400/40 text-pink-200'
                    }`}
                  >
                    {project.categoryLabel}
                  </span>
                </div>

                {/* Interactive Action Icon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-slate-900/80 backdrop-blur border border-cyan-400 text-cyan-300 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform shadow-lg shadow-cyan-500/30">
                    {is3D ? (
                      <Box className="w-6 h-6 animate-pulse" />
                    ) : isVideo ? (
                      <Play className="w-6 h-6 fill-cyan-400 text-cyan-400 ml-0.5" />
                    ) : (
                      <Eye className="w-6 h-6" />
                    )}
                  </div>
                </div>

                {/* Year Badge */}
                <div className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-300 bg-slate-950/70 px-2 py-0.5 rounded border border-white/10">
                  {project.year}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  {project.client && (
                    <div className="text-[11px] font-mono text-cyan-400/90 uppercase tracking-wider">
                      {project.client}
                    </div>
                  )}
                  <h3 className="font-bold text-white text-base sm:text-lg group-hover:text-cyan-300 transition line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Software tags */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                  {project.software.slice(0, 3).map((tool) => (
                    <span
                      key={tool}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5"
                    >
                      {tool}
                    </span>
                  ))}
                  {project.software.length > 3 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 text-slate-500">
                      +{project.software.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Viewport for Selected Project */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
