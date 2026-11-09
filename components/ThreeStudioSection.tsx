'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Box, Sparkles, Layers, Cpu, Orbit } from 'lucide-react';

const ThreeModelViewer = dynamic(() => import('./ThreeModelViewer'), { ssr: false });

export default function ThreeStudioSection() {
  const [selectedAsset, setSelectedAsset] = useState<'cyber-orb' | 'crystal' | 'torus'>('cyber-orb');

  const assets = [
    {
      id: 'cyber-orb',
      title: 'Cyber Kinetic Core',
      desc: 'Real-time hard surface cyber core with organic displacement and metallic reflection map.',
      tools: 'Maya • Unreal Engine',
    },
    {
      id: 'crystal',
      title: 'Quantum Crystal Artifact',
      desc: 'Refractive geometric crystal with chromatic dispersion, transmission physics & sub-surface scattering.',
      tools: 'Maya • Three.js PBR',
    },
    {
      id: 'torus',
      title: 'Holographic Torus Accelerator',
      desc: 'Kinetic particle accelerator torus with orbital dual rings and neon energy pulse.',
      tools: 'Unreal Engine • VFX',
    },
  ];

  return (
    <section id="3d-studio" className="py-24 relative overflow-hidden bg-slate-950/60 border-y border-white/5">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            <Orbit className="w-3.5 h-3.5 animate-spin" />
            <span>Interactive 3D Engine</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Real-Time 3D Viewport Studio
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Inspect Rashmika&apos;s 3D assets in real-time. Rotate 360°, zoom in on hard-surface geometry, switch wireframe mesh mode, and experience Maya &amp; Unreal Engine assets directly inside your browser.
          </p>
        </div>

        {/* Studio Grid: 3D Viewport on Left/Top, Asset Selector & Controls on Right/Bottom */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main 3D Viewport */}
          <div className="lg:col-span-8">
            <ThreeModelViewer
              modelType={selectedAsset}
              title={assets.find((a) => a.id === selectedAsset)?.title}
              className="h-[460px] sm:h-[540px]"
            />
          </div>

          {/* Asset Selection Cards */}
          <div className="lg:col-span-4 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Select 3D Preset to Inspect</span>
            </div>

            {assets.map((asset) => {
              const isSelected = selectedAsset === asset.id;
              return (
                <button
                  key={asset.id}
                  onClick={() => setSelectedAsset(asset.id as any)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                    isSelected
                      ? 'bg-surface-elevated border-cyan-400 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-400/50'
                      : 'bg-surface/50 border-white/5 hover:border-white/20 hover:bg-surface'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`font-bold text-sm sm:text-base ${isSelected ? 'text-cyan-400' : 'text-white'}`}>
                      {asset.title}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                      {asset.tools}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-2">
                    {asset.desc}
                  </p>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-300">
                    <Sparkles className="w-3 h-3" />
                    <span>{isSelected ? 'Active in Viewport' : 'Click to Load in 3D'}</span>
                  </div>
                </button>
              );
            })}

            {/* Note on uploading custom 3D files */}
            <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 text-xs text-purple-200/90 leading-relaxed">
              <span className="font-semibold text-purple-300 block mb-1">💡 Real .GLB / .GLTF 3D Support:</span>
              Through the built-in Admin CMS, you can upload actual 3D model files (<code className="text-cyan-300">.glb</code>) exported from Maya or Blender, and they will load automatically in this 3D viewport!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
