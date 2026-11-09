import { NextResponse } from 'next/server';
import { connectToDatabase, getLocalProjects, saveLocalProjects } from '@/lib/db';
import Project from '@/models/Project';
import { isUserAdmin } from '@/lib/auth';
import { ProjectItem } from '@/lib/initialData';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    const db = await connectToDatabase();

    if (db) {
      const query: any = {};
      if (category && category !== 'all') {
        query.category = category;
      }
      if (featured === 'true') {
        query.featured = true;
      }

      const projects = await Project.find(query).sort({ order: 1, createdAt: -1 }).lean();
      if (projects && projects.length > 0) {
        const formatted = projects.map((p: any) => ({
          ...p,
          id: p._id.toString(),
        }));
        return NextResponse.json({ success: true, source: 'mongodb', data: formatted });
      }
    }

    // Fallback to local storage
    let local = getLocalProjects();
    if (category && category !== 'all') {
      local = local.filter((p) => p.category === category);
    }
    if (featured === 'true') {
      local = local.filter((p) => p.featured);
    }

    return NextResponse.json({ success: true, source: 'local', data: local });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Error fetching projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const isAdmin = isUserAdmin();
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin access required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      title,
      slug,
      category,
      categoryLabel,
      description,
      client,
      year,
      software,
      thumbnail,
      videoUrl,
      modelUrl,
      modelType,
      gallery,
      featured,
    } = body;

    if (!title || !category || !thumbnail) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields (title, category, thumbnail)' },
        { status: 400 }
      );
    }

    const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const newProjectData: ProjectItem = {
      id: `proj-${Date.now()}`,
      title,
      slug: generatedSlug,
      category,
      categoryLabel: categoryLabel || (
        category === 'motion' ? 'Motion Graphics' :
        category === 'video' ? 'Video Editing' :
        category === '3d' ? '3D Works' : 'Graphic Design'
      ),
      description: description || '',
      client: client || '',
      year: year || new Date().getFullYear().toString(),
      software: Array.isArray(software) ? software : [],
      thumbnail,
      videoUrl: videoUrl || '',
      modelUrl: modelUrl || '',
      modelType: modelType || 'cyber-orb',
      gallery: Array.isArray(gallery) ? gallery : [thumbnail],
      featured: Boolean(featured),
      order: 0,
    };

    const db = await connectToDatabase();
    if (db) {
      try {
        const created = await Project.create({
          ...newProjectData,
        });
        return NextResponse.json({
          success: true,
          message: 'Project created in MongoDB',
          data: { ...newProjectData, id: created._id.toString() },
        });
      } catch (err: any) {
        console.warn('MongoDB creation failed, writing to local storage fallback:', err.message);
      }
    }

    // Fallback: save to local json
    const existing = getLocalProjects();
    existing.unshift(newProjectData);
    saveLocalProjects(existing);

    return NextResponse.json({
      success: true,
      message: 'Project saved successfully',
      data: newProjectData,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Error creating project' },
      { status: 500 }
    );
  }
}
