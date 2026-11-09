import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { initialProjects, ProjectItem } from './initialData';

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
  // eslint-disable-next-line no-var
  var inMemoryProjects: ProjectItem[] | undefined;
  // eslint-disable-next-line no-var
  var inMemoryMessages: any[] | undefined;
}

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectToDatabase(): Promise<typeof mongoose | null> {
  const uri = process.env.MONGODB_URI;
  if (!uri || uri.trim() === '') {
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

    cached.promise = mongoose.connect(uri, opts).then((mongooseInstance) => {
      return mongooseInstance;
    }).catch((err) => {
      console.warn('MongoDB connection failed on Vercel:', err.message);
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

// Serverless-safe writable storage (using /tmp on Vercel / Lambda)
function getStoragePaths() {
  const isVercel = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME;
  const baseDir = isVercel ? os.tmpdir() : path.join(process.cwd(), 'data');
  return {
    baseDir,
    projectsFile: path.join(baseDir, 'projects.json'),
    messagesFile: path.join(baseDir, 'messages.json'),
  };
}

export function getLocalProjects(): ProjectItem[] {
  if (global.inMemoryProjects && global.inMemoryProjects.length > 0) {
    return global.inMemoryProjects;
  }

  const { projectsFile } = getStoragePaths();
  try {
    if (fs.existsSync(projectsFile)) {
      const content = fs.readFileSync(projectsFile, 'utf-8');
      const parsed = JSON.parse(content);
      global.inMemoryProjects = parsed;
      return parsed;
    }
  } catch (e) {
    // ignore
  }

  global.inMemoryProjects = [...initialProjects];
  return global.inMemoryProjects;
}

export function saveLocalProjects(projects: ProjectItem[]): void {
  global.inMemoryProjects = projects;
  const { baseDir, projectsFile } = getStoragePaths();
  try {
    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir, { recursive: true });
    }
    fs.writeFileSync(projectsFile, JSON.stringify(projects, null, 2), 'utf-8');
  } catch (err: any) {
    console.warn('Could not write to disk, using in-memory store:', err.message);
  }
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
  if (global.inMemoryMessages) {
    return global.inMemoryMessages;
  }

  const { messagesFile } = getStoragePaths();
  try {
    if (fs.existsSync(messagesFile)) {
      const content = fs.readFileSync(messagesFile, 'utf-8');
      const parsed = JSON.parse(content);
      global.inMemoryMessages = parsed;
      return parsed;
    }
  } catch (e) {
    // ignore
  }

  global.inMemoryMessages = [];
  return global.inMemoryMessages;
}

export function saveLocalMessage(msg: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>): ContactMessage {
  const list = getLocalMessages();
  const newMsg: ContactMessage = {
    ...msg,
    id: `msg-${Date.now()}`,
    createdAt: new Date().toISOString(),
    read: false,
  };
  list.unshift(newMsg);
  global.inMemoryMessages = list;

  const { baseDir, messagesFile } = getStoragePaths();
  try {
    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir, { recursive: true });
    }
    fs.writeFileSync(messagesFile, JSON.stringify(list, null, 2), 'utf-8');
  } catch (err: any) {
    console.warn('Could not write messages to disk:', err.message);
  }

  return newMsg;
}
