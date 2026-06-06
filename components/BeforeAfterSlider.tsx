"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function BeforeAfterSlider({ beforeImage, afterImage }: { beforeImage: string, afterImage: string }) {
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
    handleMove(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
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

  const beforeStyle = beforeImage.startsWith("linear-gradient") || beforeImage.startsWith("radial-gradient")
    ? { background: beforeImage }
    : { backgroundImage: `url(${beforeImage})` };

  const afterStyle = afterImage.startsWith("linear-gradient") || afterImage.startsWith("radial-gradient")
    ? { background: afterImage }
    : { backgroundImage: `url(${afterImage})` };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[4/3] sm:aspect-square md:aspect-[4/3] overflow-hidden select-none cursor-ew-resize bg-panel border border-border interactive"
      onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); }}
      onTouchStart={(e) => { setIsDragging(true); handleMove(e.touches[0].clientX); }}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
    >
      {/* Before Image (Background) */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center pointer-events-none"
        style={beforeStyle}
      />
      
      {/* Before Label */}
      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 z-10 pointer-events-none">
        <span className="font-mono text-[11px] text-white tracking-widest uppercase">Before</span>
      </div>

      {/* After Image (Clipped) */}
      <div 
        className="absolute inset-0 h-full bg-cover bg-center pointer-events-none"
        style={{ 
          clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`,
          ...afterStyle
        }}
      />
      
      {/* After Label */}
      <div className="absolute top-3 right-3 bg-amber/90 backdrop-blur-md px-3 py-1 rounded-full border border-amber z-10 shadow-[0_0_10px_rgba(232,160,69,0.3)] pointer-events-none">
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
  );
}
