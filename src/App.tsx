/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AmbientBackground } from './components/AmbientBackground';
import { LockScreen } from './components/LockScreen';
import { HeroSection } from './components/HeroSection';
import { MemoryLaneSection } from './components/MemoryLaneSection';
import { GolgappeMomosDiaries } from './components/GolgappeMomosDiaries';
import { LongDistanceSection } from './components/LongDistanceSection';
import { FinalRevealSection } from './components/FinalRevealSection';
import { MusicPlayerToggle } from './components/MusicPlayerToggle';
import { Sparkles, Lock } from 'lucide-react';
import { ambientMusic } from './utils/audio';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleExplore = () => {
    const memoryLaneEl = document.getElementById('memory-lane');
    if (memoryLaneEl) {
      memoryLaneEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setIsUnlocked(false);
      ambientMusic.stop();
    }, 400);
  };

  const handleRelock = () => {
    setIsUnlocked(false);
    ambientMusic.stop();
  };

  return (
    <div className="relative min-h-screen font-sans selection:bg-rose-200 selection:text-rose-900">
      {/* Ambient background particles, gradients & grain texture */}
      <AmbientBackground />

      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          /* Password Lock Gate */
          <LockScreen key="lock-screen" onUnlock={() => setIsUnlocked(true)} />
        ) : (
          /* Main Experience (Homepage & Story) */
          <motion.main
            key="unlocked-experience"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 overflow-x-hidden"
          >
            {/* Top Subtle Sticky Bar */}
            <header className="sticky top-0 z-40 px-4 py-3">
              <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-2 rounded-full glass-panel border border-white/80 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="font-script text-2xl text-[#881337] font-bold">Khushi</span>
                  <span className="text-[11px] font-medium text-stone-500 font-sans hidden sm:inline-block">
                    • My Bauni & Coaching Partner
                  </span>
                </div>

                <nav className="flex items-center gap-1 sm:gap-2">
                  <button
                    onClick={() => {
                      document.getElementById('memory-lane')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-white/60 cursor-pointer transition-colors"
                  >
                    Memories
                  </button>
                  <button
                    onClick={() => {
                      document.getElementById('street-food-diaries')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-white/60 cursor-pointer transition-colors"
                  >
                    Diaries
                  </button>
                  <button
                    onClick={() => {
                      document.getElementById('final-reveal')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium text-rose-800 hover:text-[#881337] hover:bg-rose-50 cursor-pointer transition-colors font-semibold"
                  >
                    Bauni ✨
                  </button>
                  <button
                    onClick={handleRelock}
                    title="Lock screen again"
                    className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer ml-1 transition-colors"
                  >
                    <Lock className="w-3.5 h-3.5" />
                  </button>
                </nav>
              </div>
            </header>

            {/* 1. Opening Screen */}
            <HeroSection onExplore={handleExplore} />

            {/* 2. Memory Lane / Polaroid Gallery */}
            <MemoryLaneSection />

            {/* 3. Golgappe & Momos Diaries */}
            <GolgappeMomosDiaries />

            {/* 4. Now That You're Far Away */}
            <LongDistanceSection />

            {/* 5. Final Screen: Bauni Calligraphy Reveal & Confetti */}
            <FinalRevealSection onReplay={handleReplay} />

            {/* Ambient Sound / Melody toggle */}
            <MusicPlayerToggle />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
