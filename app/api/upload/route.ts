import { NextResponse } from 'next/server';
import { isUserAdmin } from '@/lib/auth';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    if (!isUserAdmin()) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Clean filename
    const ext = path.extname(file.name) || '';
    const safeBase = path.basename(file.name, ext).replace(/[^a-zA-Z0-9-_]/g, '_');
    const filename = `${Date.now()}-${safeBase}${ext}`;
    const filePath = path.join(uploadDir, filename);

    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;
    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
      size: file.size,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'File upload failed' },
      { status: 500 }
    );
  }
}
