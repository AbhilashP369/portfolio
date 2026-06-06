"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SoftwareIcon from "./SoftwareIcon";

export default function ArtLightbox({ isOpen, onClose, item, slideLeft, slideRight }: { isOpen: boolean, onClose: () => void, item: any, slideLeft?: () => void, slideRight?: () => void }) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && slideLeft) slideLeft();
      if (e.key === "ArrowRight" && slideRight) slideRight();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose, slideLeft, slideRight]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/95 backdrop-blur-sm cursor-pointer"
          />

          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white z-50 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>

          {/* Navigation Buttons */}
          {slideLeft && (
            <button 
              onClick={(e) => { e.stopPropagation(); slideLeft(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white z-50 transition-colors hidden md:flex"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
          )}
          {slideRight && (
            <button 
              onClick={(e) => { e.stopPropagation(); slideRight(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white z-50 transition-colors hidden md:flex"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          )}

          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative z-10 w-full max-w-[90vw] h-[90vh] flex flex-col items-center justify-center"
          >
            <div className="flex-1 w-full relative flex items-center justify-center overflow-hidden mb-6">
              {item.image.startsWith("linear-gradient") ? (
                <div className="w-full max-w-4xl aspect-video flex items-center justify-center text-[var(--ivory)] font-serif italic text-3xl md:text-5xl border border-[var(--border)]" style={{ background: item.image }}>
                  {item.title}
                </div>
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
              )}
            </div>
            
            <div className="w-full max-w-3xl flex flex-col items-center justify-center text-center gap-2 shrink-0">
              <h2 className="font-bebas text-4xl md:text-6xl text-[var(--ivory)] tracking-wide">{item.title}</h2>
              <div className="flex gap-4 font-mono text-[11px] text-[var(--muted)] uppercase tracking-widest mt-1 items-center">
                <span className="flex items-center gap-1.5">
                  <SoftwareIcon name={item.medium} className="w-3.5 h-3.5" />
                  {item.medium}
                </span>
                <span>•</span>
                <span>{item.year}</span>
              </div>
              <p className="text-[var(--muted)] text-xs md:text-sm uppercase tracking-widest mt-2 font-sans max-w-[500px]">
                {item.description}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
