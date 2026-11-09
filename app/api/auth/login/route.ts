import { NextResponse } from 'next/server';
import { signAdminToken, COOKIE_NAME } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const expectedUser = process.env.ADMIN_USERNAME || 'rashmika';
    const expectedPass = process.env.ADMIN_PASSWORD || 'rashmika2026';

    if (username === expectedUser && password === expectedPass) {
      const token = signAdminToken();

      const response = NextResponse.json({
        success: true,
        message: 'Authenticated successfully',
      });

      response.cookies.set({
        name: COOKIE_NAME,
        value: token,
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        sameSite: 'lax',
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: 'Invalid username or password' },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}
