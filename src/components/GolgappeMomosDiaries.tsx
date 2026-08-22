import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Utensils, Flame, BookOpen, Smile, ChevronDown } from 'lucide-react';
import { DIARY_ENTRIES } from '../data/memories';
import { ambientMusic } from '../utils/audio';

export const GolgappeMomosDiaries: React.FC = () => {
  const [activeDiaryId, setActiveDiaryId] = useState<string | null>(null);
  const [golgappeCount, setGolgappeCount] = useState(0);
  const [floatingPuri, setFloatingPuri] = useState<{ id: number; x: number; y: number }[]>([]);

  const handlePuriClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    ambientMusic.playGolgappePop();
    setGolgappeCount((prev) => prev + 1);

    const rect = e.currentTarget.getBoundingClientRect();
    const newPuri = {
      id: Date.now(),
      x: e.clientX - rect.left + (Math.random() * 40 - 20),
      y: e.clientY - rect.top,
    };

    setFloatingPuri((prev) => [...prev.slice(-8), newPuri]);

    setTimeout(() => {
      setFloatingPuri((prev) => prev.filter((p) => p.id !== newPuri.id));
    }, 1200);
  };

  return (
    <section id="street-food-diaries" className="py-16 sm:py-24 px-4 sm:px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-100/80 border border-amber-200 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>🥟 Chapter 02 : Sacred Street Food</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-stone-900 mb-3">
            Our Golgappe & Momos Diaries
          </h2>
          <p className="text-stone-600 font-sans text-sm sm:text-base max-w-lg mx-auto">
            Coaching classes were tough, but the post-class food runs made everything worth it.
          </p>
        </div>

        {/* Fun Food Doodled Box: Teekha Golgappe Counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 p-6 rounded-3xl bg-gradient-to-r from-amber-50/90 via-rose-50/90 to-amber-50/90 border-2 border-dashed border-amber-200/90 shadow-sm relative overflow-hidden text-center"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <span className="text-xs font-semibold text-amber-900 uppercase tracking-wider flex items-center gap-1.5 justify-center sm:justify-start">
                <Flame className="w-4 h-4 text-amber-600" />
                <span>The Sacred Extra-Teekha Ritual</span>
              </span>
              <h3 className="text-xl font-display font-semibold text-stone-800 mt-1">
                Virtual Golgappe & Momos Tracker
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">
                Tap to crunch a fresh golgappa for Bauni!
              </p>
            </div>

            <div className="relative">
              <motion.button
                onClick={handlePuriClick}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.92 }}
                className="relative px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-medium text-sm shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer transition-all"
              >
                <span className="text-lg">🥟</span>
                <span>Crunch a Golgappa ({golgappeCount})</span>
              </motion.button>

              {/* Floating food icons animation */}
              {floatingPuri.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 1, y: 0, scale: 0.8 }}
                  animate={{ opacity: 0, y: -60, scale: 1.4, x: (Math.random() - 0.5) * 40 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="absolute pointer-events-none text-2xl font-bold text-amber-600 font-handwriting"
                  style={{ left: `${p.x}px`, top: `${p.y}px` }}
                >
                  ✨ 🥟 +1 Crispy!
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Diary Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DIARY_ENTRIES.map((entry, idx) => {
            const isExpanded = activeDiaryId === entry.id;

            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative flex flex-col rounded-3xl bg-white/85 backdrop-blur-md border border-rose-100/90 shadow-lg shadow-rose-900/5 hover:shadow-rose-900/10 transition-all overflow-hidden group"
              >
                {/* Diary Header Accent */}
                <div className="p-6 pb-4 flex items-start justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-100 to-amber-100 border border-rose-200/60 flex items-center justify-center text-xl shadow-inner">
                    {entry.iconType === 'golgappe' && '🥟'}
                    {entry.iconType === 'momos' && '🥟🥢'}
                    {entry.iconType === 'coaching' && '📝'}
                    {entry.iconType === 'tea' && '☕'}
                  </div>

                  <span className="text-[11px] font-medium text-rose-800 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
                    {entry.tag}
                  </span>
                </div>

                {/* Body Content */}
                <div className="px-6 pb-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-display font-semibold text-stone-900 mb-2">
                      {entry.title}
                    </h3>
                    
                    <p className="text-stone-600 font-sans text-xs sm:text-sm leading-relaxed">
                      {isExpanded ? entry.fullStory : entry.preview}
                    </p>
                  </div>

                  {/* Quoted note in handwriting */}
                  <div className="mt-4 pt-4 border-t border-dashed border-stone-200">
                    <p className="font-handwriting text-lg text-[#881337] leading-snug">
                      {entry.favoriteFoodQuote}
                    </p>
                  </div>

                  {/* Toggle Read Full Story */}
                  <button
                    onClick={() => setActiveDiaryId(isExpanded ? null : entry.id)}
                    className="mt-4 text-xs font-semibold text-[#881337] hover:text-rose-900 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>{isExpanded ? 'Show less' : 'Read full diary entry'}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Small warm footer banner */}
        <div className="mt-10 p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-white text-center text-xs text-stone-600 font-sans max-w-xl mx-auto flex items-center justify-center gap-2 shadow-sm">
          <span>🌶️ Note: No one will ever understand our exact spicy chutney ratio like we do.</span>
        </div>
      </div>
    </section>
  );
};
