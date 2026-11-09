'use client';

import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, ContactShadows, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { RotateCw, Eye, Sparkles, RefreshCw, Layers } from 'lucide-react';

interface ModelViewerProps {
  modelUrl?: string;
  modelType?: 'glb' | 'cyber-orb' | 'crystal' | 'scifi-ring' | 'torus' | string;
  className?: string;
  title?: string;
}

// Custom GLTF Model Renderer with fallback
function GLTFModel({ url, wireframe }: { url: string; wireframe: boolean }) {
  const gltf = useGLTF(url);
  const modelRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.2;
    }
  });

  // Apply wireframe override if requested
  React.useEffect(() => {
    if (gltf.scene) {
      gltf.scene.traverse((child: any) => {
        if (child.isMesh && child.material) {
          child.material.wireframe = wireframe;
        }
      });
    }
  }, [gltf, wireframe]);

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      scale={1.8}
      position={[0, -0.5, 0]}
    />
  );
}

// Procedural 3D Mesh fallback when GLB file is not provided
function ProceduralMesh({
  type,
  color,
  wireframe,
}: {
  type: string;
  color: string;
  wireframe: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const secondRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.4;
    }
    if (secondRef.current) {
      secondRef.current.rotation.z += delta * 0.25;
      secondRef.current.rotation.x -= delta * 0.2;
    }
  });

  if (type === 'crystal') {
    return (
      <Float speed={2} rotationIntensity={1.2} floatIntensity={1}>
        <group>
          <mesh ref={meshRef}>
            <octahedronGeometry args={[1.5, 0]} />
            <meshPhysicalMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.25}
              roughness={0.1}
              metalness={0.2}
              transmission={0.85}
              ior={1.6}
              wireframe={wireframe}
            />
          </mesh>
          <mesh ref={secondRef} scale={1.3}>
            <octahedronGeometry args={[1.5, 1]} />
            <meshStandardMaterial
              color="#ffffff"
              wireframe
              transparent
              opacity={0.3}
            />
          </mesh>
        </group>
      </Float>
    );
  }

  if (type === 'torus') {
    return (
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1}>
        <group>
          <mesh ref={meshRef}>
            <torusKnotGeometry args={[1.1, 0.35, 128, 32, 2, 3]} />
            <meshStandardMaterial
              color={color}
              roughness={0.25}
              metalness={0.85}
              wireframe={wireframe}
            />
          </mesh>
          <mesh ref={secondRef}>
            <torusGeometry args={[1.9, 0.03, 16, 64]} />
            <meshStandardMaterial
              color="#00f0ff"
              emissive="#00f0ff"
              emissiveIntensity={0.8}
              wireframe
            />
          </mesh>
        </group>
      </Float>
    );
  }

  // Default: Cybernetic Kinetic Orb
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <group>
        <mesh ref={meshRef}>
          <dodecahedronGeometry args={[1.3, 1]} />
          <MeshDistortMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.3}
            roughness={0.2}
            metalness={0.8}
            distort={0.28}
            speed={2}
            wireframe={wireframe}
          />
        </mesh>
        <mesh ref={secondRef} scale={1.4}>
          <icosahedronGeometry args={[1.3, 1]} />
          <meshStandardMaterial
            color="#ffffff"
            wireframe
            transparent
            opacity={0.2}
          />
        </mesh>
      </group>
    </Float>
  );
}

function LoaderFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#00f0ff" wireframe />
    </mesh>
  );
}

export default function ThreeModelViewer({
  modelUrl,
  modelType = 'cyber-orb',
  className = '',
  title = '3D Real-Time Asset',
}: ModelViewerProps) {
  const [wireframe, setWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [accentColor, setAccentColor] = useState('#00f0ff');
  const controlsRef = useRef<any>(null);

  const colors = [
    { name: 'Cyan', hex: '#00f0ff' },
    { name: 'Purple', hex: '#a855f7' },
    { name: 'Pink', hex: '#ec4899' },
    { name: 'Amber', hex: '#f59e0b' },
  ];

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden bg-slate-950/80 border border-cyan-500/20 backdrop-blur-md shadow-2xl flex flex-col ${className}`}
      style={{ minHeight: '380px' }}
    >
      {/* Viewer Header */}
      <div className="absolute top-0 left-0 right-0 z-10 px-4 py-3 flex items-center justify-between border-b border-white/10 bg-slate-900/60 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-wider text-slate-300">
            {title}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
            Interactive 3D Viewport
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Wireframe Toggle */}
          <button
            onClick={() => setWireframe(!wireframe)}
            title="Toggle Wireframe Mode"
            className={`px-2 py-1 rounded text-xs flex items-center gap-1 transition ${
              wireframe
                ? 'bg-cyan-500 text-slate-950 font-semibold'
                : 'bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Wireframe</span>
          </button>

          {/* Auto Rotate Toggle */}
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            title="Toggle Auto Rotate"
            className={`px-2 py-1 rounded text-xs flex items-center gap-1 transition ${
              autoRotate
                ? 'bg-purple-600 text-white font-semibold'
                : 'bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Auto Orbit</span>
          </button>

          {/* Reset View */}
          <button
            onClick={handleResetCamera}
            title="Reset Camera"
            className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3D Canvas Area */}
      <div className="w-full h-full flex-1 relative cursor-grab active:cursor-grabbing">
        <Canvas
          camera={{ position: [0, 1.2, 4.5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[6, 8, 5]} intensity={1.5} color="#ffffff" />
          <pointLight position={[-6, -4, -4]} intensity={2} color={accentColor} />
          <pointLight position={[0, 6, 0]} intensity={1.2} color="#8b5cf6" />

          <Suspense fallback={<LoaderFallback />}>
            {modelUrl && modelUrl.endsWith('.glb') ? (
              <GLTFModel url={modelUrl} wireframe={wireframe} />
            ) : (
              <ProceduralMesh
                type={modelType}
                color={accentColor}
                wireframe={wireframe}
              />
            )}
          </Suspense>

          <ContactShadows
            position={[0, -1.8, 0]}
            opacity={0.5}
            scale={8}
            blur={2}
            far={4}
          />

          <OrbitControls
            ref={controlsRef}
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            autoRotate={autoRotate}
            autoRotateSpeed={1.8}
            minDistance={2}
            maxDistance={8}
          />
        </Canvas>

        {/* Bottom Interactive Guide & Color Bar */}
        <div className="absolute bottom-3 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          <div className="text-[11px] text-slate-400 bg-slate-900/80 backdrop-blur px-2.5 py-1 rounded-md border border-white/5 pointer-events-auto">
            🖱️ Drag to rotate • Scroll to zoom • Right-click to pan
          </div>

          {/* Color Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur px-2.5 py-1 rounded-md border border-white/5 pointer-events-auto">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span className="text-[10px] text-slate-400 mr-1 hidden sm:inline">Color:</span>
            {colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setAccentColor(c.hex)}
                className={`w-3.5 h-3.5 rounded-full transition-transform ${
                  accentColor === c.hex ? 'scale-125 ring-2 ring-white' : 'opacity-70 hover:opacity-100'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
