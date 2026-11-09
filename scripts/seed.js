const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://kavirash311_db_user:eGb0dxQiCnV5zPbV@cluster0.imkgppw.mongodb.net/rashmika_portfolio?retryWrites=true&w=majority';

const ProjectSchema = new mongoose.Schema(
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

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

const initialProjects = [
  {
    title: 'Swarnaavahini Broadcast Motion Package',
    slug: 'swarnaavahini-broadcast-motion-package',
    category: 'motion',
    categoryLabel: 'Motion Graphics',
    description: 'High-energy broadcast television opener, lower thirds, stinger transitions, and animated digital promo idents created during motion graphics work at Swarnaavahini television network.',
    client: 'Swarnaavahini Television',
    year: '2024',
    software: ['After Effects', 'Premiere Pro', 'Photoshop', 'Google Flow'],
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    gallery: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
    ],
    featured: true,
    order: 1
  },
  {
    title: 'Cyber Mech Kinetic Core (Real-Time 3D)',
    slug: 'cyber-mech-kinetic-core-3d',
    category: '3d',
    categoryLabel: '3D Works',
    description: 'Interactive real-time 3D cybernetic core modeled and textured using Autodesk Maya & Unreal Engine. Features dynamic neon emission, metallic PBR shaders, and full 360-degree interactive camera orbit inspection.',
    client: 'SLIIT Interactive Media Lab',
    year: '2024',
    software: ['Maya', 'Unreal Engine', 'Substance Painter'],
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    modelType: 'cyber-orb',
    gallery: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    ],
    featured: true,
    order: 2
  },
  {
    title: 'Dahamaya Commercial Video Campaign',
    slug: 'dahamaya-commercial-video-campaign',
    category: 'video',
    categoryLabel: 'Video Editing',
    description: 'Dynamic commercial promos and social media video advertisements with fast-paced kinetic editing, color grading, sound design, and custom 2D/3D title typography.',
    client: 'Dahamaya Creation',
    year: '2024',
    software: ['Premiere Pro', 'After Effects', 'CapCut'],
    thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1200&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4',
    gallery: [
      'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1200&auto=format&fit=crop',
    ],
    featured: true,
    order: 3
  },
  {
    title: 'Futuristic Quantum Crystal Artifact',
    slug: 'futuristic-quantum-crystal-artifact',
    category: '3d',
    categoryLabel: '3D Works',
    description: 'Hard-surface geometric crystal artifact with refraction shaders, chromatic dispersion, and interactive orbit controls. Built for virtual production and 3D visual effects.',
    client: 'Personal 3D Exploration',
    year: '2024',
    software: ['Maya', 'Unreal Engine', 'Three.js'],
    thumbnail: 'https://images.unsplash.com/photo-1633493106115-62580c05988e?q=80&w=1200&auto=format&fit=crop',
    modelType: 'crystal',
    gallery: [
      'https://images.unsplash.com/photo-1633493106115-62580c05988e?q=80&w=1200&auto=format&fit=crop'
    ],
    featured: true,
    order: 4
  },
  {
    title: 'Cebit Brand Identity & Creative Design',
    slug: 'cebit-brand-identity-creative-design',
    category: 'graphic',
    categoryLabel: 'Graphic Design',
    description: 'Comprehensive brand promotional collateral, typographic posters, product packaging banners, and social media digital visuals aligned with modern corporate aesthetics.',
    client: 'Cebit Computers',
    year: '2023 - 2024',
    software: ['Photoshop', 'Illustrator', 'InDesign', 'CorelDRAW'],
    thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1200&auto=format&fit=crop',
    ],
    featured: false,
    order: 5
  },
  {
    title: 'AI-Enhanced Sci-Fi Video Flow Teaser',
    slug: 'ai-enhanced-scifi-video-flow-teaser',
    category: 'motion',
    categoryLabel: 'Motion Graphics',
    description: 'Cutting-edge AI video synthesis utilizing Google Flow and neural diffusion models integrated with After Effects compositing and 3D motion design.',
    client: 'AI Creative Lab',
    year: '2024',
    software: ['Google Flow', 'After Effects', 'Premiere Pro'],
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    gallery: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop'
    ],
    featured: false,
    order: 6
  },
  {
    title: 'Holographic Torus Accelerator 3D',
    slug: 'holographic-torus-accelerator-3d',
    category: '3d',
    categoryLabel: '3D Works',
    description: '3D Sci-Fi particle and torus accelerator designed with neon illumination, interactive lighting switches, and camera depth of field simulation.',
    client: 'SLIIT Media Showcase',
    year: '2024',
    software: ['Maya', 'Unreal Engine'],
    thumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop',
    modelType: 'torus',
    gallery: [
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop'
    ],
    featured: false,
    order: 7
  },
  {
    title: 'Creative Event Poster Series',
    slug: 'creative-event-poster-series',
    category: 'graphic',
    categoryLabel: 'Graphic Design',
    description: 'Vibrant typographic and vector poster collection exploring retro-futurism, neo-brutalism, and high-impact visual hierarchy for contemporary music and tech exhibitions.',
    client: 'Independent Exhibition',
    year: '2024',
    software: ['Illustrator', 'Photoshop', 'Figma'],
    thumbnail: 'https://images.unsplash.com/photo-1572945753563-80ac120dd66e?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1572945753563-80ac120dd66e?q=80&w=1200&auto=format&fit=crop'
    ],
    featured: false,
    order: 8
  }
];

async function seed() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 8000,
    });
    console.log('Connected to MongoDB successfully!');

    for (const proj of initialProjects) {
      await Project.findOneAndUpdate(
        { slug: proj.slug },
        { $set: proj },
        { upsert: true, new: true }
      );
    }
    console.log(`Successfully seeded ${initialProjects.length} projects to MongoDB Atlas!`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  }
}

seed();
