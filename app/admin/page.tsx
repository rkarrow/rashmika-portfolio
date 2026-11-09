'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ProjectItem } from '@/lib/initialData';
import {
  Plus,
  Trash2,
  Edit,
  Eye,
  LogOut,
  Upload,
  Layers,
  Box,
  Film,
  Sparkles,
  MessageSquare,
  Check,
  X,
  ExternalLink,
  ShieldCheck,
  Star,
  RefreshCw,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'projects' | 'messages'>('projects');
  const [editingProject, setEditingProject] = useState<Partial<ProjectItem> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string>('');

  // Check auth
  useEffect(() => {
    async function checkAuthAndLoad() {
      try {
        const res = await fetch('/api/auth/check');
        const data = await res.json();
        if (!data.authenticated) {
          router.push('/admin/login');
          return;
        }

        // Fetch projects & messages
        await loadProjects();
        await loadMessages();
      } catch (err) {
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    }
    checkAuthAndLoad();
  }, [router]);

  async function loadProjects() {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (data.success) {
        setProjects(data.data);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function loadMessages() {
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      if (data.success) {
        setMessages(data.data);
      }
    } catch (e) {
      console.error(e);
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const openNewProjectModal = () => {
    setEditingProject({
      title: '',
      slug: '',
      category: '3d',
      categoryLabel: '3D Works',
      description: '',
      client: '',
      year: new Date().getFullYear().toString(),
      software: ['Maya', 'Unreal Engine'],
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
      videoUrl: '',
      modelUrl: '',
      modelType: 'cyber-orb',
      gallery: [],
      featured: false,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (p: ProjectItem) => {
    setEditingProject({ ...p });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        loadProjects();
      }
    } catch (e) {
      alert('Failed to delete project');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetField: 'thumbnail' | 'modelUrl') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setEditingProject((prev) => ({
          ...prev,
          [targetField]: data.url,
        }));
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch (err: any) {
      alert('Upload error: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title || !editingProject?.thumbnail) {
      alert('Please provide at least a title and thumbnail image');
      return;
    }

    setSaveStatus('Saving...');
    try {
      const isUpdating = Boolean(editingProject.id);
      const url = isUpdating ? `/api/projects/${editingProject.id}` : '/api/projects';
      const method = isUpdating ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProject),
      });

      const data = await res.json();
      if (data.success) {
        setSaveStatus('Saved!');
        setIsModalOpen(false);
        loadProjects();
      } else {
        alert(data.error || 'Failed to save project');
      }
    } catch (err: any) {
      alert('Error saving project: ' + err.message);
    } finally {
      setSaveStatus('');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-cyan-400 font-mono text-sm">
        <RefreshCw className="w-5 h-5 animate-spin mr-2" />
        Verifying secure credentials...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white flex flex-col">
      {/* Admin Top Bar */}
      <header className="border-b border-cyan-500/20 bg-surface px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold font-mono">
            RK
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              Rashmika Portfolio Studio
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                CMS
              </span>
            </h1>
            <p className="text-[11px] text-slate-400 font-mono">Motion, Video, 3D &amp; Graphic Manager</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-cyan-400 transition"
          >
            <span>View Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 border border-white/10 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Statistics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="p-4 rounded-xl bg-surface border border-white/10">
            <div className="text-xs font-mono text-slate-400">Total Projects</div>
            <div className="text-2xl font-black text-white mt-1">{projects.length}</div>
          </div>
          <div className="p-4 rounded-xl bg-surface border border-cyan-500/20">
            <div className="text-xs font-mono text-cyan-400">Motion Graphics</div>
            <div className="text-2xl font-black text-cyan-300 mt-1">
              {projects.filter((p) => p.category === 'motion').length}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-surface border border-purple-500/20">
            <div className="text-xs font-mono text-purple-400">3D Real-Time</div>
            <div className="text-2xl font-black text-purple-300 mt-1">
              {projects.filter((p) => p.category === '3d').length}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-surface border border-blue-500/20">
            <div className="text-xs font-mono text-blue-400">Video Edits</div>
            <div className="text-2xl font-black text-blue-300 mt-1">
              {projects.filter((p) => p.category === 'video').length}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-surface border border-pink-500/20">
            <div className="text-xs font-mono text-pink-400">Graphic Designs</div>
            <div className="text-2xl font-black text-pink-300 mt-1">
              {projects.filter((p) => p.category === 'graphic').length}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-surface border border-emerald-500/20">
            <div className="text-xs font-mono text-emerald-400">Client Inquiries</div>
            <div className="text-2xl font-black text-emerald-300 mt-1">{messages.length}</div>
          </div>
        </div>

        {/* Tab & Action Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition ${
                activeTab === 'projects'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-surface text-slate-400 hover:text-white'
              }`}
            >
              Projects Catalog ({projects.length})
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition ${
                activeTab === 'messages'
                  ? 'bg-purple-500 text-white font-bold'
                  : 'bg-surface text-slate-400 hover:text-white'
              }`}
            >
              Client Inquiries ({messages.length})
            </button>
          </div>

          {activeTab === 'projects' && (
            <button
              onClick={openNewProjectModal}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-md shadow-cyan-500/20 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Project / 3D Asset</span>
            </button>
          )}
        </div>

        {/* Tab Content: Projects List */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl bg-surface border border-white/10 overflow-hidden flex flex-col justify-between group hover:border-cyan-500/40 transition"
              >
                <div className="relative aspect-video bg-black overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-950/80 text-cyan-300 border border-white/10">
                      {p.categoryLabel}
                    </span>
                  </div>
                  {p.featured && (
                    <div className="absolute top-3 right-3 text-amber-400 bg-slate-950/80 p-1 rounded-full border border-white/10">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-2 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400">{p.year}</span>
                    <span className="text-[10px] font-mono text-slate-400">{p.client}</span>
                  </div>
                  <h3 className="font-bold text-white text-base truncate">{p.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{p.description}</p>
                </div>

                <div className="p-4 pt-0 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(p)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-cyan-400 transition"
                      title="Edit Project"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 transition"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">ID: {p.id.slice(0, 8)}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content: Messages List */}
        {activeTab === 'messages' && (
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-12 text-slate-500 font-mono text-xs">
                No client inquiries received yet.
              </div>
            ) : (
              messages.map((m: any) => (
                <div
                  key={m.id || m._id}
                  className="p-5 rounded-2xl bg-surface border border-white/10 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2">
                    <div>
                      <span className="text-sm font-bold text-white mr-2">{m.name}</span>
                      <a
                        href={`mailto:${m.email}`}
                        className="text-xs font-mono text-cyan-400 hover:underline"
                      >
                        {m.email}
                      </a>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      {new Date(m.createdAt).toLocaleString()}
                    </span>
                  </div>
                  {m.subject && (
                    <div className="text-xs font-semibold text-purple-300 font-mono">
                      Subject: {m.subject}
                    </div>
                  )}
                  <p className="text-sm text-slate-300 whitespace-pre-wrap">{m.message}</p>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      {/* Create / Edit Project Modal */}
      {isModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Box className="w-5 h-5 text-cyan-400" />
                {editingProject.id ? 'Edit Project' : 'Upload New Creative Work / 3D Asset'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4 max-h-[75vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    placeholder="e.g. Swarnaavahini Motion Package"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Category *</label>
                  <select
                    value={editingProject.category || '3d'}
                    onChange={(e) => {
                      const cat = e.target.value as any;
                      setEditingProject({
                        ...editingProject,
                        category: cat,
                        categoryLabel:
                          cat === 'motion'
                            ? 'Motion Graphics'
                            : cat === 'video'
                            ? 'Video Editing'
                            : cat === '3d'
                            ? '3D Works'
                            : 'Graphic Design',
                      });
                    }}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:border-cyan-400"
                  >
                    <option value="motion">Motion Graphics</option>
                    <option value="3d">3D Works</option>
                    <option value="video">Video Editing</option>
                    <option value="graphic">Graphic Design</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Client / Studio</label>
                  <input
                    type="text"
                    value={editingProject.client || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                    placeholder="e.g. Swarnaavahini / Dahamaya Creation"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Year</label>
                  <input
                    type="text"
                    value={editingProject.year || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                    placeholder="2024"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Description / Scope *</label>
                <textarea
                  rows={3}
                  required
                  value={editingProject.description || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  placeholder="Overview of visual storytelling, tools used, client goals..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-sm resize-none"
                />
              </div>

              {/* Software tags */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Software Used (comma separated)
                </label>
                <input
                  type="text"
                  value={editingProject.software ? editingProject.software.join(', ') : ''}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      software: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  placeholder="After Effects, Premiere Pro, Maya, Unreal Engine"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-sm"
                />
              </div>

              {/* Media: Thumbnail Image */}
              <div className="space-y-2 p-4 rounded-xl bg-slate-950/60 border border-white/10">
                <label className="block text-xs font-mono text-cyan-400 font-semibold uppercase">
                  Thumbnail Image *
                </label>
                <input
                  type="text"
                  required
                  value={editingProject.thumbnail || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, thumbnail: e.target.value })}
                  placeholder="Image URL or upload file below"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs mb-2"
                />
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer px-3 py-1.5 rounded-lg text-xs font-mono bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Upload Image File</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, 'thumbnail')}
                    />
                  </label>
                  {uploading && <span className="text-xs text-cyan-400 font-mono">Uploading...</span>}
                </div>
              </div>

              {/* Category-Specific Inputs */}
              {(editingProject.category === 'video' || editingProject.category === 'motion') && (
                <div className="space-y-2 p-4 rounded-xl bg-slate-950/60 border border-blue-500/20">
                  <label className="block text-xs font-mono text-blue-400 font-semibold uppercase">
                    Video URL (YouTube Embed / Vimeo / MP4)
                  </label>
                  <input
                    type="text"
                    value={editingProject.videoUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, videoUrl: e.target.value })}
                    placeholder="https://www.youtube.com/embed/..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs"
                  />
                </div>
              )}

              {editingProject.category === '3d' && (
                <div className="space-y-3 p-4 rounded-xl bg-slate-950/60 border border-purple-500/20">
                  <label className="block text-xs font-mono text-purple-400 font-semibold uppercase">
                    3D Model Configuration (Interactive WebGL)
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="text-[11px] font-mono text-slate-400 block mb-1">
                        Preset 3D Geometry
                      </span>
                      <select
                        value={editingProject.modelType || 'cyber-orb'}
                        onChange={(e) => setEditingProject({ ...editingProject, modelType: e.target.value as any })}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-white text-xs"
                      >
                        <option value="cyber-orb">Cyber Kinetic Core</option>
                        <option value="crystal">Quantum Crystal</option>
                        <option value="torus">Torus Accelerator</option>
                      </select>
                    </div>

                    <div>
                      <span className="text-[11px] font-mono text-slate-400 block mb-1">
                        Or Upload .GLB / .GLTF 3D File
                      </span>
                      <label className="cursor-pointer w-full px-3 py-1.5 rounded-lg text-xs font-mono bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 flex items-center justify-center gap-1.5">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Choose .glb File</span>
                        <input
                          type="file"
                          accept=".glb,.gltf"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, 'modelUrl')}
                        />
                      </label>
                    </div>
                  </div>

                  {editingProject.modelUrl && (
                    <div className="text-[11px] font-mono text-emerald-400 break-all">
                      Uploaded 3D file: {editingProject.modelUrl}
                    </div>
                  )}
                </div>
              )}

              {/* Featured toggle */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={Boolean(editingProject.featured)}
                  onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                  className="rounded border-white/10 bg-slate-950 text-cyan-500 focus:ring-0"
                />
                <label htmlFor="featuredCheck" className="text-xs font-mono text-slate-300">
                  Feature this project on homepage spotlight
                </label>
              </div>

              {/* Actions */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-mono bg-white/5 text-slate-300 hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-mono text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition shadow-md shadow-cyan-400/20"
                >
                  {saveStatus || (editingProject.id ? 'Update Project' : 'Publish Project')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
