import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Navigation, Sparkles, Send, HeartHandshake, Coffee, PhoneCall } from 'lucide-react';
import { ambientMusic } from '../utils/audio';

export const LongDistanceSection: React.FC = () => {
  const [hugSent, setHugSent] = useState(false);
  const [callReminderSet, setCallReminderSet] = useState(false);

  const handleSendHug = () => {
    ambientMusic.playConfettiChime();
    setHugSent(true);
    setTimeout(() => {
      setHugSent(false);
    }, 4000);
  };

  return (
    <section id="long-distance" className="py-16 sm:py-24 px-4 sm:px-6 relative z-10">
      <div className="max-w-3xl mx-auto">
        {/* Chapter Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-100/80 border border-rose-200 text-[#881337] text-xs font-semibold uppercase tracking-wider mb-3">
            <Navigation className="w-3.5 h-3.5" />
            <span>Chapter 03 : Different Cities, Same Us</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-stone-900 mb-3">
            Now That You&apos;re Far Away
          </h2>
          <p className="text-stone-600 font-sans text-sm sm:text-base max-w-md mx-auto">
            A gentle reminder that distance can&apos;t dilute a friendship forged over physics formulas and spicy momos.
          </p>
        </div>

        {/* Long Distance Letter Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl p-7 sm:p-10 glass-panel border border-white/90 shadow-xl overflow-hidden"
        >
          {/* Subtle maroon / rose accent corner glow */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-rose-200/40 rounded-full blur-2xl" />
          <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-amber-200/40 rounded-full blur-2xl" />

          {/* Interactive Distance Compass Banner */}
          <div className="mb-8 p-4 rounded-2xl bg-white/70 border border-rose-100/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100/80 flex items-center justify-center text-rose-800">
                <MapPin className="w-5 h-5 text-[#881337]" />
              </div>
              <div>
                <p className="text-xs text-stone-500 font-sans font-medium">From Coaching Class Benches</p>
                <p className="text-sm font-semibold text-stone-900 font-sans">Different Cities, Infinite Shared Jokes</p>
              </div>
            </div>

            <div className="px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-xs font-semibold text-[#881337] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Bond Status: Unbreakable</span>
            </div>
          </div>

          {/* Sincere Letter Paragraphs */}
          <div className="space-y-4 text-stone-700 font-sans text-sm sm:text-base leading-relaxed">
            <p className="font-serif italic text-lg sm:text-xl text-[#881337] leading-relaxed">
              &ldquo;Coaching days turned into different cities, but Bauni is still Bauni.&rdquo;
            </p>

            <p>
              We don&apos;t get to sprint across the street for emergency golgappe anymore, or pass handwritten doodle notes during boring lectures. Our daily routines are filled with new places, different pin codes, and busy schedules.
            </p>

            <p>
              Yet, whenever we pick up the phone, whether it&apos;s a five-minute rant or a two-hour weekend gossip session, it feels like we never left those wooden benches. You still know exactly what I mean before I even finish the sentence.
            </p>

            <p className="bg-rose-50/70 p-4 rounded-2xl border border-rose-100 text-stone-800 font-medium">
              Thank you for being my constant, my confidante, and my favorite person to laugh until our ribs ache with. No number of kilometers changes who we are.
            </p>
          </div>

          {/* Action Row */}
          <div className="mt-8 pt-6 border-t border-rose-100/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                id="send-virtual-hug-btn"
                onClick={handleSendHug}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#881337] to-rose-700 text-white font-medium text-xs sm:text-sm shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95"
              >
                <HeartHandshake className="w-4 h-4 text-rose-200" />
                <span>Send a Virtual Hug to Bauni</span>
              </button>

              <button
                onClick={() => setCallReminderSet(!callReminderSet)}
                className="px-4 py-3 rounded-2xl bg-white border border-rose-200 text-stone-700 hover:text-rose-900 font-medium text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <PhoneCall className="w-4 h-4 text-amber-600" />
                <span>{callReminderSet ? 'Call Reminder: Active 📞' : 'Remind Me to Call'}</span>
              </button>
            </div>

            <div className="text-xs text-stone-500 font-handwriting text-xl text-center sm:text-right">
              ~ Always your coaching partner ✨
            </div>
          </div>

          {/* Feedback popup after sending hug */}
          <AnimatePresence>
            {hugSent && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mt-4 p-3 rounded-xl bg-gradient-to-r from-rose-100 to-amber-100 border border-rose-200 text-stone-800 text-xs font-medium text-center flex items-center justify-center gap-2"
              >
                <span>✨ Hug delivered across the miles! Bauni received infinite warmth.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
