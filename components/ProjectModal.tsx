'use client';

import React from 'react';
import { ProjectItem } from '@/lib/initialData';
import { X, ExternalLink, Calendar, User, Layers, Box, Play, Sparkles } from 'lucide-react';
import ThreeModelViewer from './ThreeModelViewer';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div
        className="relative w-full max-w-4xl bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <span className="text-xs px-2.5 py-1 rounded-full uppercase tracking-wider font-mono font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              {project.categoryLabel}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide truncate max-w-md">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Section: 3D Viewport OR Video Player OR High-Res Image */}
        <div className="w-full bg-black/60 relative">
          {project.category === '3d' ? (
            <div className="p-4 sm:p-6">
              <ThreeModelViewer
                modelUrl={project.modelUrl}
                modelType={project.modelType || 'cyber-orb'}
                title={project.title}
                className="h-[380px] sm:h-[480px]"
              />
            </div>
          ) : project.videoUrl ? (
            <div className="aspect-video w-full bg-black">
              {project.videoUrl.includes('youtube.com') || project.videoUrl.includes('youtu.be') ? (
                <iframe
                  src={
                    project.videoUrl.includes('embed')
                      ? project.videoUrl
                      : `https://www.youtube.com/embed/${project.videoUrl.split('v=')[1]?.split('&')[0] || ''}`
                  }
                  title={project.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : project.videoUrl.includes('vimeo.com') ? (
                <iframe
                  src={project.videoUrl}
                  title={project.title}
                  className="w-full h-full border-0"
                  allowFullScreen
                />
              ) : (
                <video
                  src={project.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          ) : (
            <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>

        {/* Content & Details Section */}
        <div className="p-6 space-y-6">
          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-400 border-b border-white/10 pb-4">
            {project.client && (
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-cyan-400" />
                <span>Client / Org: <strong className="text-white">{project.client}</strong></span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-purple-400" />
              <span>Year: <strong className="text-white">{project.year}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-pink-400" />
              <span>Category: <strong className="text-white">{project.categoryLabel}</strong></span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 font-mono mb-2">
              Project Overview
            </h4>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Software / Tools Used */}
          {project.software && project.software.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Software & Tools
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.software.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1 text-xs rounded-lg bg-surface-elevated text-cyan-300 border border-cyan-500/20 font-mono font-medium"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Additional Gallery if available */}
          {project.gallery && project.gallery.length > 1 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono mb-3">
                Project Gallery
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {project.gallery.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-video rounded-lg overflow-hidden border border-white/10 bg-slate-950 group"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={`${project.title} ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
