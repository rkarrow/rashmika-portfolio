import { NextResponse } from 'next/server';
import { connectToDatabase, getLocalProjects, saveLocalProjects } from '@/lib/db';
import Project from '@/models/Project';
import { isUserAdmin } from '@/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const db = await connectToDatabase();

    if (db) {
      const project = await Project.findOne({
        $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { slug: id }, { id: id }],
      }).lean();

      if (project) {
        return NextResponse.json({
          success: true,
          data: { ...project, id: (project as any)._id.toString() },
        });
      }
    }

    const local = getLocalProjects();
    const found = local.find((p) => p.id === id || p.slug === id);
    if (!found) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: found });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Error fetching project' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!isUserAdmin()) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const updates = await request.json();

    const db = await connectToDatabase();
    if (db) {
      try {
        const updated = await Project.findOneAndUpdate(
          { $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { slug: id }, { id: id }] },
          { $set: updates },
          { new: true }
        ).lean();

        if (updated) {
          return NextResponse.json({
            success: true,
            data: { ...updated, id: (updated as any)._id.toString() },
          });
        }
      } catch (err: any) {
        console.warn('MongoDB update failed, falling back to local storage:', err.message);
      }
    }

    const local = getLocalProjects();
    const index = local.findIndex((p) => p.id === id || p.slug === id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    local[index] = { ...local[index], ...updates };
    saveLocalProjects(local);

    return NextResponse.json({ success: true, data: local[index] });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Error updating project' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!isUserAdmin()) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const db = await connectToDatabase();

    if (db) {
      try {
        await Project.findOneAndDelete({
          $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { slug: id }, { id: id }],
        });
      } catch (err: any) {
        console.warn('MongoDB delete failed:', err.message);
      }
    }

    const local = getLocalProjects();
    const filtered = local.filter((p) => p.id !== id && p.slug !== id);
    saveLocalProjects(filtered);

    return NextResponse.json({ success: true, message: 'Project deleted successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Error deleting project' },
      { status: 500 }
    );
  }
}
