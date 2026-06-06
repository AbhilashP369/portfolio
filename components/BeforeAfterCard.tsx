"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { CreativeWorkItem } from "../data/creativeWork";

export default function BeforeAfterCard({ item }: { item: CreativeWorkItem & { type: "beforeafter" } }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.stopPropagation(); // Prevent carousel swipe
    handleMove(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.stopPropagation(); // Prevent carousel swipe
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  const isGradient = item.beforeImage.startsWith("linear-gradient") || item.beforeImage.startsWith("radial-gradient");

  return (
    <div className="w-full flex flex-col bg-panel border border-border group overflow-hidden">
      {/* Media Container */}
      <div 
        ref={containerRef}
        className="relative w-full aspect-[3/4] md:aspect-[4/3] overflow-hidden select-none cursor-ew-resize bg-black interactive"
        onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); e.stopPropagation(); }}
        onTouchStart={(e) => { setIsDragging(true); handleMove(e.touches[0].clientX); e.stopPropagation(); }}
        onMouseMove={onMouseMove}
        onTouchMove={onTouchMove}
      >
        {/* Tag Pill */}
        <div className="absolute top-4 left-4 z-30 pointer-events-none">
          <div className="bg-amber text-void px-2 py-1 font-mono text-[9px] uppercase tracking-widest">
            PHOTO EDIT
          </div>
        </div>

        {/* Base Layer: Determines container aspect ratio using the After image (invisible) */}
        {isGradient ? (
          <div className="w-full h-full pointer-events-none" style={{ background: item.afterImage }} />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img 
            src={item.afterImage} 
            alt="Base Size" 
            className="w-full h-full block pointer-events-none opacity-0 object-cover" 
          />
        )}

        {/* Before Image (Absolute background) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none bg-black">
          {isGradient ? (
            <div className="absolute inset-0 flex items-center justify-center font-serif text-ivory/50 text-xl md:text-3xl" style={{ background: item.beforeImage }}>
              {item.title}
            </div>
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img 
              src={item.beforeImage} 
              alt="Before" 
              className="w-full h-full object-contain" 
            />
          )}
        </div>
        
        {/* Before Label */}
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 z-10 pointer-events-none hidden md:block">
          <span className="font-mono text-[11px] text-white tracking-widest uppercase">Before</span>
        </div>

        {/* After Image (Clipped Overlay) */}
        <div 
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ 
            clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`
          }}
        >
          {isGradient ? (
            <div className="w-full h-full" style={{ background: item.afterImage }} />
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img 
              src={item.afterImage} 
              alt="After" 
              className="absolute inset-0 w-full h-full object-contain bg-black" 
            />
          )}
        </div>
        
        {/* After Label */}
        <div className="absolute bottom-4 right-4 bg-amber/90 backdrop-blur-md px-3 py-1 rounded-full border border-amber z-10 shadow-[0_0_10px_rgba(232,160,69,0.3)] pointer-events-none hidden md:block">
          <span className="font-mono text-[11px] text-white tracking-widest uppercase">After</span>
        </div>

        {/* Slider Line & Handle */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_5px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          <motion.div 
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ delay: 0.5, duration: 0.5, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-lg border border-black/10"
          >
            <div className="flex gap-1 text-black/60 items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="p-4 flex flex-col gap-1 border-t border-border">
        <h3 className="font-serif text-[1.1rem] text-primary">{item.title}</h3>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] text-amber uppercase tracking-widest">{item.category}</span>
          <span className="text-muted text-[10px]">•</span>
          <span className="font-mono text-[9px] text-muted tracking-widest">{item.year}</span>
        </div>
      </div>
    </div>
  );
}
