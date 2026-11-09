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
    const isVercel = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME;

    // On Vercel / serverless: convert directly to Base64 Data URL so it never touches read-only filesystem
    if (isVercel || file.size < 5 * 1024 * 1024) {
      const mimeType = file.type || 'application/octet-stream';
      const base64 = buffer.toString('base64');
      const dataUri = `data:${mimeType};base64,${base64}`;

      return NextResponse.json({
        success: true,
        url: dataUri,
        filename: file.name,
        size: file.size,
      });
    }

    // Local development fallback: write to public/uploads
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

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
