"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PosterLightbox({ 
  isOpen, 
  image, 
  onClose 
}: { 
  isOpen: boolean, 
  image: string | null, 
  onClose: () => void 
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const isGradient = image?.startsWith("linear-gradient") || image?.startsWith("radial-gradient");

  return (
    <AnimatePresence>
      {isOpen && image && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-12 backdrop-blur-sm"
          onClick={onClose}
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors z-[101]"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>

          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl h-full max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {isGradient ? (
              <div className="w-full h-full max-h-[90vh] aspect-[3/4] max-w-[65vh] shadow-2xl" style={{ background: image }} />
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img 
                src={image} 
                alt="Poster Fullscreen" 
                className="max-w-full max-h-[90vh] object-contain shadow-2xl"
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
