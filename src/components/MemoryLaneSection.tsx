import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles, Upload, Image as ImageIcon, X, Heart, Eye } from 'lucide-react';
import { PolaroidPhoto } from '../types';
import { INITIAL_PHOTOS } from '../data/memories';

export const MemoryLaneSection: React.FC = () => {
  const [photos, setPhotos] = useState<PolaroidPhoto[]>(() => {
    const saved = localStorage.getItem('khushi_custom_photos');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return INITIAL_PHOTOS.map((p) => ({
          ...p,
          customImage: parsed[p.id] || p.customImage,
        }));
      } catch {
        return INITIAL_PHOTOS;
      }
    }
    return INITIAL_PHOTOS;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<PolaroidPhoto | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadTargetId, setUploadTargetId] = useState<string | null>(null);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && uploadTargetId) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        const updated = photos.map((p) =>
          p.id === uploadTargetId ? { ...p, customImage: base64 } : p
        );
        setPhotos(updated);

        // Save to localStorage
        const customMap: Record<string, string> = {};
        updated.forEach((p) => {
          if (p.customImage) customMap[p.id] = p.customImage;
        });
        localStorage.setItem('khushi_custom_photos', JSON.stringify(customMap));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = (photoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setUploadTargetId(photoId);
    fileInputRef.current?.click();
  };

  const currentPhoto = photos[currentIndex];

  return (
    <section id="memory-lane" className="py-16 sm:py-24 px-4 sm:px-6 relative z-10">
      {/* Hidden file input for photo uploads */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />

      <div className="max-w-4xl mx-auto text-center">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-100/80 border border-rose-200 text-[#881337] text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Chapter 01 : Memory Lane</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-stone-900 mb-3">
          Our Polaroid Scrapbook
        </h2>
        <p className="text-stone-600 font-sans text-sm sm:text-base max-w-lg mx-auto mb-10">
          Four snapshots of laughter, street food adventures, and memories from our coaching days.
        </p>

        {/* Carousel View Container for Mobile & Desktop */}
        <div className="relative flex flex-col items-center justify-center min-h-[460px] sm:min-h-[520px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhoto.id}
              initial={{ opacity: 0, x: 50, scale: 0.94, rotate: 0 }}
              animate={{ opacity: 1, x: 0, scale: 1, rotate: currentPhoto.rotation }}
              exit={{ opacity: 0, x: -50, scale: 0.94, rotate: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setSelectedPhoto(currentPhoto)}
              className="relative w-full max-w-[320px] sm:max-w-[360px] cursor-pointer group select-none"
            >
              {/* Cute Washi Tape Decor on Top */}
              <div className={`washi-tape ${currentIndex % 2 === 1 ? 'washi-tape-gold' : ''}`} />

              {/* Polaroid Frame */}
              <div className="polaroid-card p-4 sm:p-5 rounded-lg border border-stone-200/70 pb-6 sm:pb-7">
                {/* Photo Image Frame */}
                <div className="relative aspect-[4/4.5] w-full overflow-hidden rounded bg-stone-100 border border-stone-200 shadow-inner">
                  <img
                    src={currentPhoto.customImage || currentPhoto.defaultImage}
                    alt={currentPhoto.caption}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                  />
                  
                  {/* Photo badge date */}
                  <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-md bg-stone-900/60 backdrop-blur-md text-[11px] font-sans text-white font-medium">
                    {currentPhoto.date}
                  </div>

                  {/* Hover Overlay info */}
                  <div className="absolute inset-0 bg-stone-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
                    <span className="px-3 py-1.5 rounded-full bg-white/90 text-stone-900 text-xs font-medium shadow-md flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-rose-600" />
                      <span>Tap to read note</span>
                    </span>
                  </div>
                </div>

                {/* Handwritten Style Caption */}
                <div className="mt-4 text-center px-2">
                  <p className="font-handwriting text-2xl sm:text-3xl text-stone-800 tracking-wide leading-snug">
                    {currentPhoto.caption}
                  </p>
                  <p className="text-[11px] text-stone-400 font-sans mt-1">
                    {currentPhoto.tag}
                  </p>
                </div>

                {/* Quick replace photo button for personal customization */}
                <div className="mt-3 pt-3 border-t border-dashed border-stone-200 flex justify-between items-center text-[11px] text-stone-500">
                  <button
                    type="button"
                    onClick={(e) => triggerUpload(currentPhoto.id, e)}
                    className="hover:text-rose-700 font-sans flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Upload className="w-3 h-3" />
                    <span>Upload your photo</span>
                  </button>
                  <span className="font-sans text-stone-400">
                    {currentIndex + 1} of {photos.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              aria-label="Previous memory"
              className="w-12 h-12 rounded-full bg-white/90 border border-rose-200 shadow-md text-stone-700 hover:text-[#881337] hover:bg-rose-50 flex items-center justify-center active:scale-95 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Pagination Dots */}
            <div className="flex gap-2">
              {photos.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    idx === currentIndex
                      ? 'w-8 bg-[#881337]'
                      : 'w-2.5 bg-rose-200 hover:bg-rose-300'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Next memory"
              className="w-12 h-12 rounded-full bg-white/90 border border-rose-200 shadow-md text-stone-700 hover:text-[#881337] hover:bg-rose-50 flex items-center justify-center active:scale-95 transition-all cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Gallery Grid Quick Strip */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {photos.map((photo, idx) => (
            <button
              key={photo.id}
              onClick={() => {
                setCurrentIndex(idx);
                setSelectedPhoto(photo);
              }}
              className={`p-2 rounded-xl bg-white border text-left transition-all cursor-pointer group ${
                idx === currentIndex
                  ? 'border-[#881337] shadow-md ring-2 ring-rose-300/50'
                  : 'border-stone-200/80 hover:border-rose-300'
              }`}
            >
              <div className="aspect-square rounded-lg overflow-hidden bg-stone-100 mb-2">
                <img
                  src={photo.customImage || photo.defaultImage}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <p className="text-[11px] font-handwriting text-stone-700 truncate font-semibold">
                {photo.caption}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Expanded Modal for Reading Memory Story */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-stone-100 overflow-hidden"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 text-stone-500 hover:text-stone-800 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-stone-100 mb-4">
                <img
                  src={selectedPhoto.customImage || selectedPhoto.defaultImage}
                  alt={selectedPhoto.caption}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-rose-800 font-medium">
                  <span>{selectedPhoto.date}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-100">
                    {selectedPhoto.tag}
                  </span>
                </div>

                <h3 className="text-2xl font-handwriting font-bold text-stone-900">
                  {selectedPhoto.caption}
                </h3>

                <p className="text-stone-600 font-sans text-sm leading-relaxed bg-rose-50/50 p-4 rounded-2xl border border-rose-100/60">
                  {selectedPhoto.memoryStory}
                </p>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={(e) => triggerUpload(selectedPhoto.id, e)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Your Own Photo</span>
                  </button>
                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="py-2.5 px-5 rounded-xl bg-[#881337] text-white text-xs font-medium hover:bg-rose-900 cursor-pointer transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
