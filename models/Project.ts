import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  category: 'motion' | 'video' | '3d' | 'graphic';
  categoryLabel: string;
  description: string;
  client?: string;
  year: string;
  software: string[];
  thumbnail: string;
  videoUrl?: string;
  modelUrl?: string;
  modelType?: 'glb' | 'cyber-orb' | 'crystal' | 'scifi-ring' | 'torus';
  gallery: string[];
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: {
      type: String,
      required: true,
      enum: ['motion', 'video', '3d', 'graphic'],
    },
    categoryLabel: { type: String, required: true },
    description: { type: String, required: true },
    client: { type: String },
    year: { type: String, default: '2024' },
    software: [{ type: String }],
    thumbnail: { type: String, required: true },
    videoUrl: { type: String },
    modelUrl: { type: String },
    modelType: { type: String, default: 'cyber-orb' },
    gallery: [{ type: String }],
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
