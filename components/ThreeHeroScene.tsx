'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FloatingCyberMesh() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  const outerRingRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.2;
      meshRef.current.rotation.y = t * 0.3;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = t * -0.25;
      ringRef.current.rotation.z = t * 0.15;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.y = t * 0.18;
      outerRingRef.current.rotation.z = t * -0.12;
    }
  });

  return (
    <group scale={1.15}>
      {/* Central Organic Distorted Core */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.3, 3]} />
          <MeshDistortMaterial
            color="#00f0ff"
            emissive="#004466"
            roughness={0.15}
            metalness={0.9}
            distort={0.35}
            speed={2}
          />
        </mesh>
      </Float>

      {/* Cybernetic Wireframe Ring 1 */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.0, 0.03, 16, 64]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#6d28d9"
          emissiveIntensity={1.5}
          wireframe
        />
      </mesh>

      {/* Cybernetic Wireframe Ring 2 */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[2.4, 0.02, 16, 64]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00b4d8"
          emissiveIntensity={1.2}
          wireframe
        />
      </mesh>
    </group>
  );
}

function Starfield() {
  const count = 300;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null!);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#38bdf8"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function ThreeHeroScene() {
  return (
    <div className="w-full h-full min-h-[360px] md:min-h-[460px] relative pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00f0ff" />
        <pointLight position={[-10, -5, -5]} intensity={1.8} color="#8b5cf6" />
        <pointLight position={[0, 5, -2]} intensity={1.2} color="#ec4899" />
        
        <Starfield />
        <FloatingCyberMesh />
      </Canvas>
    </div>
  );
}
