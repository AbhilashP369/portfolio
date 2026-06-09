"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function KeyframeGrowth() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });
  const keyframes = [
    { x: 0, y: 95, year: "2019", title: "BCA Started", color: "#FF4D00", align: "bottom-[12px] left-[12px] text-left" },
    { x: 28.57, y: 80, year: "2021", title: "Discovered Editing", color: "#FF4D00", align: "top-[12px] left-[12px] text-left" },
    { x: 42.86, y: 62, year: "2022", title: "Premiere Pro", color: "#FF4D00", align: "bottom-[12px] right-[12px] text-right" },
    { x: 57.14, y: 42, year: "2023", title: "MCA + After Effects", color: "#FF4D00", align: "top-[12px] left-[12px] text-left" },
    { x: 71.43, y: 22, year: "2024", title: "Freelance Launch", color: "#FF4D00", align: "bottom-[12px] right-[12px] text-right" },
    { x: 100, y: 5, year: "2026", title: "Ready to Work", color: "#28C840", align: "top-[12px] right-[12px] text-right" },
  ];

  const timelineYears = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];
  
  const curvePath = "M 0 95 C 14.28 95, 14.28 80, 28.57 80 C 35.71 80, 35.71 62, 42.86 62 C 50 62, 50 42, 57.14 42 C 64.28 42, 64.28 22, 71.43 22 C 85.71 22, 85.71 5, 100 5";
  const fillPath = `M 0 100 L 0 95 C 14.28 95, 14.28 80, 28.57 80 C 35.71 80, 35.71 62, 42.86 62 C 50 62, 50 42, 57.14 42 C 64.28 42, 64.28 22, 71.43 22 C 85.71 22, 85.71 5, 100 5 L 100 100 Z`;

  return (
    <div className="flex flex-col w-full h-full bg-[#0a0a0a] border border-[#2a2a2a] relative interactive cursor-none">
      {/* HEADER */}
      <div className="flex flex-col border-b border-[#2a2a2a] px-4 py-[10px] shrink-0">
        <div className="font-mono text-[10px] text-[#888] tracking-widest flex items-center gap-2">
          <span className="text-[#FF4D00] text-[8px]">◆</span> KEYFRAME INTERPOLATION
        </div>
        <div className="font-mono text-[9px] text-[#555] mt-0.5">Creative Growth Curve</div>
      </div>

      {/* GRAPH AREA */}
      <div className="flex-1 relative p-[20px] pb-[30px] pl-[30px]" ref={containerRef}>
        
        {/* Y AXIS */}
        <div className="absolute left-2 top-0 bottom-[30px] flex flex-col justify-between py-[20px] pointer-events-none">
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 -rotate-90 font-mono text-[8px] text-[#444] tracking-widest whitespace-nowrap">
            SKILL LEVEL
          </div>
          {["100", "75", "50", "25", "0"].map((lbl, i) => (
            <div key={i} className="font-mono text-[7px] text-[#333] h-0 flex items-center justify-end w-[12px]">
              {lbl}
            </div>
          ))}
        </div>

        {/* X AXIS */}
        <div className="absolute left-[30px] right-[20px] bottom-1 flex justify-between pointer-events-none">
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[-4px] font-mono text-[8px] text-[#444] tracking-widest whitespace-nowrap">
            TIMELINE
          </div>
        </div>

        <div className="relative w-full h-full">
          {/* GRID LINES */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-full border-t border-[#1a1a1a]" />
            ))}
          </div>
          <div className="absolute inset-0 pointer-events-none">
            {timelineYears.map((year, i) => {
              const xPos = (i / 7) * 100;
              return (
                <div key={year} className="absolute top-0 bottom-0 border-l border-[#1a1a1a]" style={{ left: `${xPos}%` }}>
                  <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-mono text-[7px] text-[#333]">
                    {year}
                  </span>
                </div>
              );
            })}
          </div>

          {/* SVG GRAPH */}
          <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="curveFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,77,0,0.08)" />
                <stop offset="100%" stopColor="rgba(255,77,0,0)" />
              </linearGradient>
            </defs>

            {/* Area Fill */}
            <motion.path
              d={fillPath}
              fill="url(#curveFill)"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1, delay: 1 }}
            />

            {/* Glow Path */}
            <motion.path
              d={curvePath}
              fill="none"
              stroke="#FF4D00"
              strokeWidth="6"
              strokeOpacity="0.15"
              style={{ filter: "blur(4px)" }}
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />

            {/* Main Path */}
            <motion.path
              d={curvePath}
              fill="none"
              stroke="#FF4D00"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>

          {/* KEYFRAMES */}
          {keyframes.map((kf, i) => (
            <div 
              key={i}
              className="absolute group z-20 cursor-none interactive"
              style={{ left: `${kf.x}%`, top: `${kf.y}%`, transform: 'translate(-50%, -50%)' }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => setHoveredIdx(i)}
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ 
                  type: "spring", stiffness: 300, damping: 20, 
                  delay: 2 * (kf.x / 100) // Appears as curve reaches it
                }}
                className="w-[8px] h-[8px] md:w-[10px] md:h-[10px] rotate-45"
                style={{ 
                  backgroundColor: kf.color, 
                  border: `1.5px solid ${kf.color}`,
                  boxShadow: `0 0 6px ${kf.color}99`
                }}
              />

              {/* PERMANENT LABEL */}
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
                transition={{ 
                  duration: 0.3, 
                  delay: (2 * (kf.x / 100)) + 0.2
                }}
                className={`absolute ${kf.align} w-max max-w-[120px] pointer-events-none z-30 flex flex-col`}
              >
                <div className="font-mono text-[8px] text-[#FF4D00] leading-none mb-1">{kf.year}</div>
                <div className="font-mono text-[9px] text-[#fffff0] leading-tight">{kf.title}</div>
              </motion.div>
            </div>
          ))}

          {/* CURRENT POSITION INDICATOR */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 2.2, duration: 0.5 }}
            className="absolute top-0 bottom-0 z-10 pointer-events-none"
            style={{ left: '100%' }}
          >
            <div className="absolute inset-y-0 w-[1px] bg-[#FF4D00]" style={{ animation: "pulseOpacity 1s infinite" }} />
            <div className="absolute top-2 left-2 font-mono text-[9px] text-[#FF4D00] whitespace-nowrap" style={{ animation: "pulseOpacity 1s infinite" }}>
              ▶ NOW
            </div>
          </motion.div>
        </div>
      </div>

      {/* BOTTOM STATUS BAR */}
      <div className="h-[24px] bg-[#111111] border-t border-[#2a2a2a] flex items-center justify-between px-3 shrink-0">
        <span className="font-mono text-[8px] text-[#555]">6 Keyframes</span>
        <span className="font-mono text-[8px] text-[#555]">Bezier Interpolation</span>
        <span className="font-mono text-[8px] text-[#FF4D00]">2019 → 2026</span>
      </div>

      <style jsx global>{`
        @keyframes pulseOpacity {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
