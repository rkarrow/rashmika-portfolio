import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Rashmika Kavindu | Motion Graphic Designer, Video Editor & 3D Artist',
  description:
    'Creative portfolio of Rashmika Kavindu - specializing in broadcast motion graphics, commercial video editing, 3D modeling with Maya & Unreal Engine, and modern graphic design.',
  keywords: [
    'Rashmika Kavindu',
    'Motion Graphics',
    'Video Editor',
    '3D Artist',
    'Maya',
    'Unreal Engine',
    'After Effects',
    'Premiere Pro',
    'Sri Lanka',
    'SLIIT',
  ],
  authors: [{ name: 'Rashmika Kavindu' }],
  openGraph: {
    title: 'Rashmika Kavindu | Motion Graphics & 3D Portfolio',
    description: 'Explore interactive 3D works, broadcast motion graphics, and video editing portfolio.',
    images: ['/images/rashmika-avatar.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-background text-foreground antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
