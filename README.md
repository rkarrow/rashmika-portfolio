# 🚀 Rashmika Kavindu - Modern 3D & Creative Motion Portfolio

A fullstack Next.js + MongoDB + Three.js creative portfolio & CMS designed specifically for **Motion Graphics, Video Editing, 3D Real-Time Works, and Graphic Design**.

---

## ✨ Features

- **Interactive 3D Viewport Studio (Three.js & WebGL)**:
  - Real-time 3D camera controls: 360° orbit rotation, zoom, pan.
  - Wireframe mode toggle, lighting color theme selector, auto-rotation control.
  - Supports uploading custom **`.glb` / `.gltf` 3D model files** directly from Maya, Blender, or Unreal Engine.
  - Interactive preset 3D assets (Cyber Kinetic Core, Quantum Crystal Artifact, Holographic Torus Accelerator).

- **Full Project CMS & Admin Dashboard (`/admin`)**:
  - Secure authentication with session tokens.
  - Add, edit, and delete projects across **Motion Graphics**, **Video Editing**, **3D Works**, and **Graphic Design**.
  - Direct file uploader for images, videos, and `.glb` 3D models via `/api/upload`.
  - Feature projects directly to the homepage.
  - View contact form inquiries sent by clients.

- **Client Portfolio Experience**:
  - Dynamic interactive hero with real-time 3D distorted cyber mesh.
  - Category filtering: All Works, Motion Graphics, 3D Works, Video Editing, Graphic Design.
  - Project modals with embedded video players (YouTube, Vimeo, MP4) and full 3D interactive viewer.
  - Complete skills breakdown from CV (After Effects, Premiere Pro, Maya, Unreal Engine, Photoshop, Illustrator, Google Flow AI).
  - Career and education timeline (Swarnaavahini, Dahamaya Creation, Cebit Computers, SLIIT).
  - Working Contact Form saving inquiries to DB and local backup.
  - One-click CV resume download button.

---

## 🔑 Admin Credentials

- **Admin Login Route**: `http://localhost:3000/admin/login`
- **Username**: `rashmika`
- **Password**: `rashmika2026`

*(You can customize these in `.env.local`)*

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **3D Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Styling**: Tailwind CSS (Cyber Dark aesthetic)
- **Database**: MongoDB (Mongoose) + Automatic resilient fallback to JSON storage
- **Icons**: Lucide React
- **Animations**: Framer Motion

---

## ⚙️ Environment Variables (`.env.local`)

```env
# MongoDB Atlas Connection URI (Optional: If not provided, it saves locally automatically)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/rashmika_portfolio?retryWrites=true&w=majority

# Admin Credentials
ADMIN_USERNAME=rashmika
ADMIN_PASSWORD=rashmika2026
ADMIN_JWT_SECRET=super-secret-creative-jwt-key-2026

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 🚀 Running the Project

```bash
# Development server (runs on http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm start
```
