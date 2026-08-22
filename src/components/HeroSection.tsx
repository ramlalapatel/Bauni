import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowDown, MapPin, HeartHandshake } from 'lucide-react';
import { FRIENDSHIP_STATS } from '../data/memories';

interface HeroSectionProps {
  onExplore: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore }) => {
  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 sm:px-6 pt-12 pb-16 text-center">
      {/* Top Floating Badge */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-rose-200/90 shadow-sm text-rose-900 text-xs sm:text-sm font-medium mb-6 backdrop-blur-sm"
      >
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#881337]"></span>
        </span>
        <span className="font-sans">For my coaching-days partner-in-crime</span>
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
      </motion.div>

      {/* Main Name in Script Typography */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        {/* Subtle background glow circle behind name */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-rose-300/30 rounded-full blur-3xl -z-10" />
        
        <h1 className="text-6xl sm:text-8xl md:text-9xl font-script font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#881337] via-[#b91c1c] to-[#d97706] drop-shadow-sm tracking-wide py-2 select-none">
          Khushi
        </h1>
      </motion.div>

      {/* Warm Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-4 max-w-xl text-base sm:text-xl text-stone-700 font-serif italic leading-relaxed px-4"
      >
        &ldquo;A little something from your coaching-days partner-in-crime, crafted with endless memories, spicy street food cravings, and nostalgia.&rdquo;
      </motion.p>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mt-8 sm:mt-10"
      >
        <button
          id="explore-memories-btn"
          onClick={onExplore}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#881337] via-rose-700 to-[#9f1239] text-white font-medium text-base shadow-xl shadow-rose-900/25 hover:shadow-rose-900/40 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          <span>Take me through our memories</span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-lg"
          >
            →
          </motion.span>
          <div className="absolute inset-0 rounded-full border border-white/30 pointer-events-none" />
        </button>
      </motion.div>

      {/* Friendship Quick Stats Strip */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="mt-14 w-full max-w-2xl grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 px-2"
      >
        {FRIENDSHIP_STATS.map((stat, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-sm flex flex-col items-center justify-center text-center transition-all hover:bg-white/90"
          >
            <span className="text-xl sm:text-2xl mb-1">{stat.icon}</span>
            <span className="text-xs text-stone-500 font-medium">{stat.label}</span>
            <span className="text-sm sm:text-base font-semibold text-rose-950 font-sans mt-0.5">
              {stat.value}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Down indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mt-10 text-rose-800/60 cursor-pointer flex flex-col items-center gap-1"
        onClick={onExplore}
      >
        <span className="text-[11px] font-sans tracking-wider uppercase font-semibold">Scroll down</span>
        <ArrowDown className="w-4 h-4" />
      </motion.div>
    </section>
  );
};
