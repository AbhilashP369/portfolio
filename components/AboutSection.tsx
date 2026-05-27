"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  };

  const cards = [
    { title: "VFX_Reel_2024.mp4", duration: "00:01:24:12", type: "Video" },
    { title: "Color_Grade_Before_After.prproj", duration: "--:--:--:--", type: "Project" },
    { title: "Motion_Graphics_Pack.mogrt", duration: "00:00:15:00", type: "Graphic" },
    { title: "SFX_Impact_Whoosh.wav", duration: "00:00:02:14", type: "Audio" },
  ];

  return (
    <section 
      className="relative w-full min-h-screen flex flex-col p-4 pb-20 gap-2 overflow-hidden justify-center"
      data-cursor-label="INSPECT"
    >
      <div className="flex-1 bg-panel border border-border flex flex-col p-2 max-h-[80vh]">
        <div className="font-mono text-sm text-primary uppercase border-b border-border pb-1 tracking-widest mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
            Project Bin: PORTFOLIO_ASSETS
          </div>
          <div className="flex gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted hover:text-primary interactive"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber interactive"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
          </div>
        </div>
        
        <div className="flex gap-4 items-center mb-4 text-xs font-mono text-muted border-b border-border pb-2">
          <div className="w-4"></div>
          <div className="flex-1 cursor-none interactive hover:text-primary">Name</div>
          <div className="w-24 hidden md:block cursor-none interactive hover:text-primary">Media Duration</div>
          <div className="w-24 hidden md:block cursor-none interactive hover:text-primary">Media Type</div>
        </div>
        
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col gap-1 overflow-y-auto"
        >
          {cards.map((card, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ borderColor: "var(--amber)", backgroundColor: "var(--bg-raised)" }}
              className="flex gap-4 items-center p-2 border border-border bg-deep interactive cursor-none group transition-colors"
            >
              <div className="w-4 text-amber">
                {card.type === "Video" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>}
                {card.type === "Audio" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>}
                {card.type === "Project" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>}
                {card.type === "Graphic" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 22 22 22"></polygon></svg>}
              </div>
              <div className="flex-1 font-sans text-xs text-primary group-hover:text-amber transition-colors">{card.title}</div>
              <div className="w-24 hidden md:block font-mono text-[10px] text-muted">{card.duration}</div>
              <div className="w-24 hidden md:block font-mono text-[10px] text-muted">{card.type}</div>
            </motion.div>
          ))}
          
          <div className="mt-4 p-4 border border-border bg-deep text-muted text-xs font-mono text-center">
            Double-click to open in Source Monitor
          </div>
        </motion.div>
      </div>
    </section>
  );
}
