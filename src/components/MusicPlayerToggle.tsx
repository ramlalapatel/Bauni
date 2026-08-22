import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ambientMusic } from '../utils/audio';

export const MusicPlayerToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleMusic = () => {
    const active = ambientMusic.toggle();
    setIsPlaying(active);
  };

  useEffect(() => {
    // Show a gentle hint after 2 seconds
    const timer = setTimeout(() => {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 5000);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            className="hidden sm:flex items-center px-3 py-1.5 rounded-full bg-stone-900/80 backdrop-blur-md text-white text-[11px] font-sans font-medium shadow-md pointer-events-none"
          >
            <span>{isPlaying ? 'Melody playing 🎵' : 'Tap for nostalgic melody ✨'}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        id="ambient-music-toggle"
        onClick={toggleMusic}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Toggle ambient background music"
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md border transition-all cursor-pointer ${
          isPlaying
            ? 'bg-[#881337] text-white border-rose-300 ring-2 ring-rose-400/40 shadow-rose-900/30'
            : 'bg-white/85 text-stone-700 border-rose-200 hover:bg-rose-50 shadow-stone-900/10'
        }`}
      >
        {isPlaying ? (
          <div className="relative flex items-center justify-center">
            <Volume2 className="w-5 h-5 text-amber-200" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          </div>
        ) : (
          <VolumeX className="w-5 h-5 text-stone-400" />
        )}
      </motion.button>
    </div>
  );
};
