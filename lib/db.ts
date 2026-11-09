import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { initialProjects, ProjectItem } from './initialData';

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectToDatabase(): Promise<typeof mongoose | null> {
  if (!MONGODB_URI || MONGODB_URI.trim() === '') {
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    }).catch((err) => {
      console.warn('MongoDB connection failed, falling back to local file storage:', err.message);
      return null as unknown as typeof mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    return null;
  }

  return cached.conn;
}

// Local File-based persistence fallback
const DATA_DIR = path.join(process.cwd(), 'data');
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function getLocalProjects(): ProjectItem[] {
  ensureDataDir();
  if (!fs.existsSync(PROJECTS_FILE)) {
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(initialProjects, null, 2), 'utf-8');
    return initialProjects;
  }
  try {
    const content = fs.readFileSync(PROJECTS_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    return initialProjects;
  }
}

export function saveLocalProjects(projects: ProjectItem[]): void {
  ensureDataDir();
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2), 'utf-8');
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export function getLocalMessages(): ContactMessage[] {
  ensureDataDir();
  if (!fs.existsSync(MESSAGES_FILE)) {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify([], null, 2), 'utf-8');
    return [];
  }
  try {
    const content = fs.readFileSync(MESSAGES_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    return [];
  }
}

export function saveLocalMessage(msg: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>): ContactMessage {
  ensureDataDir();
  const list = getLocalMessages();
  const newMsg: ContactMessage = {
    ...msg,
    id: `msg-${Date.now()}`,
    createdAt: new Date().toISOString(),
    read: false,
  };
  list.unshift(newMsg);
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(list, null, 2), 'utf-8');
  return newMsg;
}
