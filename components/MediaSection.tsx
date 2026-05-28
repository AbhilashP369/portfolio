"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function MediaSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const mediaItems = [
    { title: "Commercial_Edit_v3.mp4", duration: "00:00:30:00", color: "from-blue-900 to-deep" },
    { title: "Music_Video_Master.mp4", duration: "00:03:45:12", color: "from-purple-900 to-deep" },
    { title: "Documentary_Trailer.mp4", duration: "00:01:15:00", color: "from-amber-dim to-deep" },
    { title: "VFX_Breakdown.mp4", duration: "00:00:45:20", color: "from-green-900 to-deep" },
    { title: "Social_Media_Reel.mp4", duration: "00:00:15:00", color: "from-pink-900 to-deep" },
    { title: "Color_Grade_Showreel.mp4", duration: "00:02:10:05", color: "from-indigo-900 to-deep" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <section 
      className="relative w-full min-h-screen flex flex-col p-4 pb-20 gap-2 overflow-hidden"
      data-cursor-label="PLAY"
    >
      <div className="flex-1 bg-panel border border-border flex flex-col p-2">
        <div className="font-mono text-sm text-primary uppercase border-b border-border pb-1 tracking-widest mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>
            Media Browser: Selected Works
          </div>
          <div className="flex gap-4 text-[10px] text-muted">
            <span className="interactive cursor-none hover:text-primary">Thumbnail View</span>
            <span className="interactive cursor-none hover:text-primary">List View</span>
          </div>
        </div>
        
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-2 overflow-y-auto"
        >
          {mediaItems.map((item, i) => (
            <MediaCard key={i} item={item} variants={itemVariants} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function MediaCard({ item, variants }: { item: { title: string; duration: string; color: string }, variants: import("framer-motion").Variants }) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <motion.div
      variants={variants}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="flex flex-col bg-deep border border-border group interactive cursor-none relative"
    >
      <div className={`aspect-video w-full relative overflow-hidden bg-gradient-to-br ${item.color}`}>
        {/* Placeholder grid for video look */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.02)_10px,rgba(255,255,255,0.02)_20px)] pointer-events-none" />
        
        {/* Timecode overlay */}
        <div className="absolute bottom-2 right-2 bg-black/70 px-1 font-mono text-[10px] text-primary">
          {item.duration}
        </div>
        
        {/* Play Button Overlay (visible on hover) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isHovering ? 1 : 0, scale: isHovering ? 1 : 0.8 }}
          className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all"
        >
          <div className="w-12 h-12 rounded-full border-2 border-amber flex items-center justify-center text-amber">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </div>
        </motion.div>
        
        {/* Mock progress bar on hover */}
        <motion.div 
          initial={{ width: "0%" }}
          animate={{ width: isHovering ? "100%" : "0%" }}
          transition={{ duration: 4, ease: "linear" }}
          className="absolute bottom-0 left-0 h-1 bg-amber"
        />
      </div>
      
      <div className="p-2 border-t border-border flex items-center justify-between group-hover:bg-raised transition-colors">
        <span className="font-sans text-xs text-primary truncate">{item.title}</span>
        <div className="w-2 h-2 rounded-full bg-border group-hover:bg-green-tc transition-colors" />
      </div>
    </motion.div>
  );
}
