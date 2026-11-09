import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'creative-secret-key-2026';
const COOKIE_NAME = 'admin_token';

export function signAdminToken(): string {
  return jwt.sign({ role: 'admin', timestamp: Date.now() }, JWT_SECRET, {
    expiresIn: '7d',
  });
}

export function verifyAdminToken(token: string): boolean {
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch (e) {
    return false;
  }
}

export function isUserAdmin(): boolean {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return false;
    return verifyAdminToken(token);
  } catch {
    return false;
  }
}

export { COOKIE_NAME };
