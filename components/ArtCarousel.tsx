"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ArtCard from "./ArtCard";
import ArtLightbox from "./ArtLightbox";

export default function ArtCarousel({ items }: { items: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Reset index when items (filters) change
  useEffect(() => {
    setCurrentIndex(0);
  }, [items]);

  const slideLeft = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const slideRight = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation for carousel
  useEffect(() => {
    if (selectedItem) return; // Disable if lightbox is open
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") slideLeft();
      if (e.key === "ArrowRight") slideRight();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItem, items.length]);

  if (!items || items.length === 0) return null;

  return (
    <div className="w-full flex flex-col items-center">
      {/* Gallery Cards Container */}
      <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
        
        <AnimatePresence initial={false} custom={direction}>
          {items.map((item, idx) => {
            // Determine relative position
            let offset = idx - currentIndex;
            if (offset < -1) offset += items.length;
            if (offset > 1) offset -= items.length;

            // Only render center, left, and right cards
            if (Math.abs(offset) > 1 && items.length > 3) return null;

            const isCenter = offset === 0;

            return (
              <motion.div
                key={item.id}
                custom={direction}
                initial={{ 
                  x: `${direction > 0 ? 100 : -100}%`,
                  scale: 0.85,
                  opacity: 0,
                  zIndex: 0
                }}
                animate={{
                  x: `${offset * 100}%`,
                  scale: isCenter ? 1 : 0.85,
                  opacity: isCenter ? 1 : 0.6,
                  zIndex: isCenter ? 30 : 10,
                  pointerEvents: isCenter ? "auto" : "none"
                }}
                exit={{
                  x: `${direction > 0 ? -100 : 100}%`,
                  scale: 0.85,
                  opacity: 0,
                  zIndex: 0
                }}
                transition={{ type: "spring", stiffness: 250, damping: 28 }}
                className="absolute flex items-center justify-center"
              >
                <motion.div
                  drag={isCenter ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(e, { offset: dragOffset, velocity }) => {
                    const swipe = dragOffset.x;
                    if (swipe < -50 || velocity.x < -500) slideRight();
                    else if (swipe > 50 || velocity.x > 500) slideLeft();
                  }}
                  className="w-full h-full flex items-center justify-center"
                  style={{ touchAction: isCenter ? "none" : "auto" }}
                >
                  <ArtCard item={item} onClick={() => setSelectedItem(item)} />
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>

      </div>

      {/* Navigation Controls (Minimal Gallery Style) */}
      <div className="flex items-center gap-8 mt-12 z-20">
        <button 
          onClick={slideLeft}
          className="text-[var(--muted)] hover:text-[var(--ember)] transition-colors p-2"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5M5 12L12 19M5 12L12 5"/></svg>
        </button>

        <div className="flex items-center gap-3">
          {items.map((_, idx) => (
            <div 
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`rounded-full cursor-pointer transition-all duration-500 ${
                idx === currentIndex ? "w-8 h-1.5 bg-[var(--ember)]" : "w-1.5 h-1.5 bg-[var(--muted)]/50 hover:bg-[var(--muted)]"
              }`}
            />
          ))}
        </div>

        <button 
          onClick={slideRight}
          className="text-[var(--muted)] hover:text-[var(--ember)] transition-colors p-2"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12H19M19 12L12 5M19 12L12 19"/></svg>
        </button>
      </div>

      {/* Lightbox */}
      {selectedItem && (
        <ArtLightbox 
          isOpen={!!selectedItem} 
          onClose={() => setSelectedItem(null)} 
          item={selectedItem}
          slideLeft={() => {
            const currentIdx = items.findIndex(i => i.id === selectedItem.id);
            const prevIdx = currentIdx === 0 ? items.length - 1 : currentIdx - 1;
            setSelectedItem(items[prevIdx]);
          }}
          slideRight={() => {
            const currentIdx = items.findIndex(i => i.id === selectedItem.id);
            const nextIdx = currentIdx === items.length - 1 ? 0 : currentIdx + 1;
            setSelectedItem(items[nextIdx]);
          }}
        />
      )}
    </div>
  );
}
