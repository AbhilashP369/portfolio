"use client";
import { useState, useEffect } from "react";
import { motion, PanInfo } from "framer-motion";
import { creativeWork } from "../data/creativeWork";
import BeforeAfterCard from "./BeforeAfterCard";
import PosterCard from "./PosterCard";
import PosterLightbox from "./PosterLightbox";

export default function CreativeWork() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % creativeWork.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + creativeWork.length) % creativeWork.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxImage) return; // Don't swipe carousel if lightbox is open
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxImage]);

  const handleDragEnd = (e: any, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  return (
    <section className="relative w-full p-4 flex flex-col gap-8 pt-12 pb-20 overflow-hidden" id="creative-work">
      {/* Section Header */}
      <div className="flex flex-col gap-2 relative z-10">
        <span className="font-mono text-xs text-amber tracking-widest uppercase">
          004 / CREATIVE WORK
        </span>
        <h2 className="text-3xl md:text-5xl font-serif text-primary uppercase tracking-wider">
          Edits & Design
        </h2>
        <p className="font-serif text-lg text-muted">
          Photo Editing · Color Grading · Posters · Graphics
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full flex flex-col items-center justify-center py-12">
        
        {/* Navigation Arrows */}
        <button 
          onClick={handlePrev}
          className="absolute left-2 md:left-8 z-40 w-12 h-12 bg-deep border border-border rounded-full flex items-center justify-center text-ivory hover:border-amber hover:text-amber transition-all duration-300 shadow-xl"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>

        <button 
          onClick={handleNext}
          className="absolute right-2 md:right-8 z-40 w-12 h-12 bg-deep border border-border rounded-full flex items-center justify-center text-ivory hover:border-amber hover:text-amber transition-all duration-300 shadow-xl"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>

        {/* Cards Wrapper */}
        <div className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center">
          {creativeWork.map((item, index) => {
            // Calculate offset. Use shortest path for wrap-around effect.
            const length = creativeWork.length;
            let offset = (index - activeIndex) % length;
            if (offset > Math.floor(length / 2)) offset -= length;
            if (offset < -Math.floor(length / 2)) offset += length;

            const isCenter = offset === 0;
            const xOffset = offset * 85; // 85% width shift per item
            
            // Do not render items that are too far away to save performance
            if (Math.abs(offset) > 2) return null;

            return (
              <motion.div
                key={item.id}
                animate={{
                  x: `${xOffset}%`,
                  scale: isCenter ? 1 : 0.92,
                  opacity: isCenter ? 1 : 0.5,
                  filter: isCenter ? "blur(0px)" : "blur(2px)",
                  zIndex: isCenter ? 30 : 20 - Math.abs(offset),
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  mass: 1
                }}
                drag={isCenter ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                className="absolute w-[85vw] md:w-[60vw] max-w-4xl"
              >
                {/* Click shield for inactive items so they can be clicked to navigate */}
                {!isCenter && (
                  <div 
                    className="absolute inset-0 z-50 cursor-pointer" 
                    onClick={() => {
                      if (offset > 0) handleNext();
                      if (offset < 0) handlePrev();
                    }}
                  />
                )}
                
                {item.type === "beforeafter" ? (
                  <BeforeAfterCard item={item as any} />
                ) : (
                  <PosterCard 
                    item={item as any} 
                    onView={() => setLightboxImage((item as any).image)} 
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Dots */}
        <div className="flex gap-2 items-center mt-12 z-20">
          {creativeWork.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === activeIndex ? "w-6 bg-amber" : "w-2 bg-border hover:bg-muted"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <PosterLightbox 
        isOpen={!!lightboxImage} 
        image={lightboxImage} 
        onClose={() => setLightboxImage(null)} 
      />
    </section>
  );
}
