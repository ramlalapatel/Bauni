import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, RotateCcw, Share2, Heart, Check, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ambientMusic } from '../utils/audio';

interface FinalRevealSectionProps {
  onReplay: () => void;
}

export const FinalRevealSection: React.FC<FinalRevealSectionProps> = ({ onReplay }) => {
  const [copied, setCopied] = useState(false);
  const [noteSaved, setNoteSaved] = useState(false);
  const [userNote, setUserNote] = useState('');

  // Fire celebratory confetti burst on mount of final reveal
  useEffect(() => {
    ambientMusic.playConfettiChime();
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#881337', '#f472b6', '#f59e0b', '#fde047', '#fb7185'],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#881337', '#f472b6', '#f59e0b', '#fde047', '#fb7185'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const triggerManualBurst = () => {
    ambientMusic.playConfettiChime();
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#881337', '#f472b6', '#f59e0b', '#fef08a'],
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userNote.trim()) return;
    localStorage.setItem('khushi_personal_note', userNote);
    setNoteSaved(true);
    triggerManualBurst();
  };

  return (
    <section id="final-reveal" className="py-20 sm:py-28 px-4 sm:px-6 relative z-10 text-center">
      <div className="max-w-3xl mx-auto">
        {/* Glow backdrop behind final name */}
        <div className="relative inline-block my-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            {/* Ambient gold-maroon radiating aura */}
            <div className="absolute inset-0 bg-gradient-to-r from-rose-400/40 via-amber-300/40 to-rose-500/40 rounded-full blur-3xl -z-10 animate-gentle-pulse" />

            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#881337] block mb-2 font-sans">
              To my forever person
            </span>

            {/* Glowing calligraphy Bauni */}
            <h2 className="text-7xl sm:text-9xl font-script font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#881337] via-[#be123c] to-[#d97706] drop-shadow-md py-3 select-none">
              Bauni
            </h2>
          </motion.div>
        </div>

        {/* Heartfelt Dedication Box */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 p-7 sm:p-9 glass-panel rounded-3xl border border-white shadow-2xl relative overflow-hidden text-center"
        >
          <div className="w-12 h-12 mx-auto rounded-full bg-rose-100/90 text-[#881337] flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6" />
          </div>

          <p className="text-xl sm:text-2xl font-serif italic text-stone-800 leading-relaxed max-w-xl mx-auto">
            &ldquo;Khushi, my Bauni, my golgappe-momos partner, my person since coaching. Miles apart, still my favorite person.&rdquo;
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={triggerManualBurst}
              className="px-5 py-2.5 rounded-full bg-rose-50 hover:bg-rose-100 text-[#881337] text-xs font-semibold border border-rose-200 shadow-sm flex items-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              <span>🎉 Celebrate Our Bond</span>
            </button>
            <button
              onClick={handleCopyLink}
              className="px-5 py-2.5 rounded-full bg-white hover:bg-stone-50 text-stone-700 text-xs font-medium border border-stone-200 shadow-sm flex items-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-500" />
                  <span>Share with Khushi</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Small Memory Capsule / Add a note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 p-6 rounded-2xl bg-white/70 backdrop-blur-md border border-rose-100 max-w-md mx-auto text-left"
        >
          <h4 className="text-sm font-semibold text-stone-900 font-sans mb-1 flex items-center gap-1.5">
            <span>💌 Add a personal note or inside joke</span>
          </h4>
          <p className="text-xs text-stone-500 mb-3">
            Want to save a quick message for next time you open this?
          </p>

          {noteSaved ? (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 font-medium flex items-center justify-between">
              <span>Saved in your memories vault! ✨</span>
              <button
                onClick={() => setNoteSaved(false)}
                className="text-[11px] underline text-[#881337] cursor-pointer"
              >
                Edit
              </button>
            </div>
          ) : (
            <form onSubmit={handleSaveNote} className="space-y-2">
              <input
                type="text"
                value={userNote}
                onChange={(e) => setUserNote(e.target.value)}
                placeholder="e.g. Next time I visit, momos are on you!"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-rose-200 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
              <button
                type="submit"
                className="w-full py-2 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium cursor-pointer transition-colors"
              >
                Save to Scrapbook
              </button>
            </form>
          )}
        </motion.div>

        {/* Replay Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12"
        >
          <button
            id="replay-experience-btn"
            onClick={onReplay}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-stone-800 to-stone-900 text-white text-sm font-medium shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-amber-300" />
            <span>Replay Experience</span>
          </button>
        </motion.div>

        {/* Subtle Made with warmth footer */}
        <div className="mt-16 text-center text-xs text-stone-400 font-sans space-y-1">
          <p>Handmade for Khushi • Coaching Days & Beyond</p>
          <p className="text-[11px] text-stone-400/80">Always Bauni • Always Best Friends</p>
        </div>
      </div>
    </section>
  );
};
