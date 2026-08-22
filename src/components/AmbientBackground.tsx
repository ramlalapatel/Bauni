import React, { useMemo } from 'react';
import { motion } from 'motion/react';

interface Particle {
  id: number;
  type: 'heart' | 'sparkle' | 'petal' | 'star';
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  rotate: number;
}

export const AmbientBackground: React.FC = () => {
  const particles: Particle[] = useMemo(() => {
    const items: Particle[] = [];
    const types: Particle['type'][] = ['heart', 'sparkle', 'petal', 'star'];
    for (let i = 0; i < 24; i++) {
      items.push({
        id: i,
        type: types[i % types.length],
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 14 + 10,
        duration: Math.random() * 8 + 12,
        delay: Math.random() * 6,
        rotate: Math.random() * 360,
      });
    }
    return items;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Warm multi-layer dreamy gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fff7f5] via-[#fdf2f4] to-[#fef6e9]" />

      {/* Soft color glows: blush pink, soft gold, subtle deep maroon ambient mist */}
      <div className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] rounded-full bg-rose-200/35 blur-3xl" />
      <div className="absolute top-[35%] -right-[15%] w-[60vw] h-[60vw] rounded-full bg-amber-100/45 blur-3xl" />
      <div className="absolute -bottom-[10%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-[#881337]/5 blur-3xl" />

      {/* Floating ambient particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute text-rose-300/40 will-change-transform"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size}px`,
          }}
          animate={{
            y: ['0px', '-40px', '0px'],
            x: ['0px', '20px', '-10px', '0px'],
            rotate: [p.rotate, p.rotate + 45, p.rotate - 30, p.rotate],
            opacity: [0.25, 0.6, 0.3, 0.25],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        >
          {p.type === 'heart' && (
            <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
          {p.type === 'sparkle' && (
            <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="currentColor" className="text-amber-400/45">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          )}
          {p.type === 'petal' && (
            <span className="opacity-40 text-pink-300">🌸</span>
          )}
          {p.type === 'star' && (
            <span className="opacity-30 text-amber-300">✨</span>
          )}
        </motion.div>
      ))}

      {/* Subtle organic noise/grain overlay */}
      <div 
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
