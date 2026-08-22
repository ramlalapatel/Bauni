import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Sparkles, KeyRound, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ambientMusic } from '../utils/audio';

interface LockScreenProps {
  onUnlock: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [shake, setShake] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPass = password.trim().toLowerCase();

    if (cleanPass === 'bauni') {
      setIsUnlocking(true);
      setErrorMsg(null);
      
      // Celebratory burst & pleasant chime
      ambientMusic.playConfettiChime();
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#f472b6', '#fb7185', '#fbbf24', '#881337', '#fef08a'],
      });

      // Smooth transition timeout
      setTimeout(() => {
        onUnlock();
      }, 700);
    } else {
      setShake(true);
      setErrorMsg("Try again, you know this one 😉");
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.08, filter: 'blur(10px)' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Soft blurred background */}
      <div className="absolute inset-0 bg-stone-900/20 backdrop-blur-md" />

      {/* Decorative floating elements */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/40 backdrop-blur-md border border-white/60 text-xs text-rose-900/80 font-medium tracking-wide shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '8s' }} />
        <span>Personal Surprise Vault</span>
      </div>

      {/* Glassmorphism card */}
      <motion.div
        id="lock-screen-card"
        className="relative w-full max-w-md rounded-3xl p-7 sm:p-9 glass-panel shadow-2xl overflow-hidden border border-white/90"
        initial={{ y: 20, opacity: 0, scale: 0.95 }}
        animate={
          isUnlocking
            ? { scale: 1.05, opacity: 0.2, filter: 'blur(4px)' }
            : shake
            ? { x: [-8, 8, -6, 6, -3, 3, 0], scale: 1, opacity: 1 }
            : { y: 0, opacity: 1, scale: 1 }
        }
        transition={{ duration: shake ? 0.4 : 0.5, ease: 'easeOut' }}
      >
        {/* Top subtle highlight gradient */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-rose-300 via-amber-300 to-rose-400" />

        {/* Lock Icon */}
        <div className="flex justify-center mb-5">
          <motion.div
            className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-100 via-amber-50 to-rose-50 border border-rose-200/80 flex items-center justify-center text-rose-800 shadow-inner"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Lock className="w-7 h-7 text-[#881337]" />
          </motion.div>
        </div>

        {/* Header Text */}
        <div className="text-center space-y-2 mb-7">
          <h1 className="text-2xl sm:text-3xl font-display font-semibold text-stone-900 tracking-tight">
            This page is just for you, Khushi 🔒
          </h1>
          <p className="text-sm text-stone-600 font-sans leading-relaxed">
            Enter the secret code to open your coaching memories
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              id="password-input"
              type="text"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errorMsg) setErrorMsg(null);
              }}
              placeholder="Enter your secret nickname..."
              autoFocus
              className="w-full px-5 py-3.5 pl-11 rounded-2xl bg-white/90 border border-rose-200/80 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-400/40 focus:border-rose-400 text-center font-medium shadow-sm transition-all"
            />
            <KeyRound className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-rose-400/70" />
          </div>

          {/* Warm feedback message */}
          <AnimatePresence mode="wait">
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="px-3 py-2 rounded-xl bg-amber-50/90 border border-amber-200/80 text-amber-900 text-xs font-medium text-center flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>{errorMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Unlock Button */}
          <motion.button
            id="unlock-button"
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#881337] via-rose-700 to-[#9f1239] text-white font-medium shadow-lg shadow-rose-900/20 flex items-center justify-center gap-2 text-sm sm:text-base hover:brightness-110 transition-all cursor-pointer"
          >
            <span>Unlock Memories</span>
            <Sparkles className="w-4 h-4 text-amber-200" />
          </motion.button>
        </form>

        {/* Hint toggle */}
        <div className="mt-5 text-center">
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="text-xs text-rose-800/75 hover:text-[#881337] underline decoration-dotted underline-offset-4 cursor-pointer transition-colors"
          >
            {showHint ? 'Hide hint' : 'Need a little hint? 😉'}
          </button>

          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 text-xs text-stone-600 bg-rose-50/70 p-2.5 rounded-xl border border-rose-100/80 text-center overflow-hidden"
              >
                💡 Hint: 5 letters, starts with <b>B</b> — your special nickname from coaching days!
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer gentle note */}
        <div className="mt-6 pt-4 border-t border-rose-100/70 flex items-center justify-center gap-1.5 text-[11px] text-stone-500">
          <span>Made with love & street-food memories</span>
          <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
        </div>
      </motion.div>
    </motion.div>
  );
};
