import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Stars, RoundedBox } from '@react-three/drei';
import { useRef } from 'react';

function Youtube3DLogo() {
  // YouTube red: #FF0000
  // White triangle
  // Glossy effect
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <RoundedBox
        args={[1.6, 1.1, 0.25]} // width, height, depth
        radius={0.25}
        smoothness={8}
        position={[0, 0, 0]}
      >
        <meshPhysicalMaterial
          color="#FF0000"
          roughness={0.08}
          metalness={0.9}
          clearcoat={1}
          clearcoatRoughness={0.03}
          reflectivity={1}
        />
      </RoundedBox>
      {/* White triangle, flush and pointing right */}
      <mesh position={[0.08, 0, 0.13]} rotation={[Math.PI / 2, Math.PI / 2, 0]}>
        <coneGeometry args={[0.32, 0.01, 3]} />
        <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={1.5} />
      </mesh>
    </Float>
  );
}

function WireframeRing({ color, radius, speed, axis = 'z', lightColor }) {
  const ref = useRef();
  useFrame((state, delta) => {
    if (axis === 'z') {
      ref.current.rotation.z += speed * delta;
    } else if (axis === 'x') {
      ref.current.rotation.x += speed * delta;
    } else if (axis === 'y') {
      ref.current.rotation.y += speed * delta;
    }
  });
  // Place a point light on the ring, rotating with it
  return (
    <group ref={ref}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.03, 32, 128]} />
        <meshBasicMaterial color={color} wireframe={true} />
      </mesh>
      {/* Neon point light moves with the ring */}
      <pointLight position={[radius, 0, 0]} intensity={2} color={lightColor || color} distance={4} decay={2} />
    </group>
  );
}

function NeonLinesSVG() {
  // Animated SVG neon lines (not a grid)
  const lines = Array.from({ length: 4 }).map((_, i) => {
    const y = 10 + i * 80;
    const dur = 8 + Math.random() * 6;
    const color = i % 2 === 0 ? '#a21caf' : '#00fff7';
    return (
      <polyline
        key={i}
        points={`0,${y} 1000,${y + 60}`}
        stroke={color}
        strokeWidth="3"
        opacity="0.13"
      >
        <animate
          attributeName="opacity"
          values="0.13;0.4;0.13"
          dur={`${dur}s`}
          repeatCount="indefinite"
          begin={`${i * 1.2}s`}
        />
      </polyline>
    );
  });
  return (
    <svg className="absolute inset-0 w-full h-full z-0" style={{ pointerEvents: 'none' }} viewBox="0 0 1000 600">
      {lines}
    </svg>
  );
}

function NeonSpotlights() {
  // Two SVG ellipses with blur for neon spotlights at the top
  return (
    <svg className="absolute left-0 top-0 w-full h-full z-0" style={{ pointerEvents: 'none' }}>
      <defs>
        <filter id="blur1" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="40" />
        </filter>
      </defs>
      <ellipse cx="30%" cy="0" rx="180" ry="60" fill="#2d6bff" opacity="0.25" filter="url(#blur1)" />
      <ellipse cx="70%" cy="0" rx="180" ry="60" fill="#f25bb4" opacity="0.25" filter="url(#blur1)" />
    </svg>
  );
}

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 z-0 bg-black">
      <NeonSpotlights />
      <NeonLinesSVG />
      <Canvas camera={{ position: [0, 0, 4], fov: 60 }} style={{ background: 'black' }}>
        <ambientLight intensity={1.2} />
        {/* Neon ring lights */}
        <pointLight position={[0, 0, 2]} intensity={2.2} color="#2d6bff" distance={4} decay={2} />
        <pointLight position={[0, 0, -2]} intensity={1.7} color="#f25bb4" distance={4} decay={2} />
        <Stars radius={30} depth={60} count={120} factor={2} fade speed={2} />
        <WireframeRing color="#2d6bff" radius={1.9} speed={-0.09} axis="x" lightColor="#2d6bff" />
        <WireframeRing color="#f25bb4" radius={1.5} speed={0.12} axis="z" lightColor="#f25bb4" />
        <Youtube3DLogo />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
      </Canvas>
      <div className="absolute inset-0 pointer-events-none" />
    </div>
  );
} 