"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function TopMenuBar() {
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink((b) => !b);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.15, duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 h-8 bg-panel border-b border-border flex items-center justify-between px-4 z-40 font-mono text-[11px] text-muted select-none"
    >
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-primary">
          <span className="text-amber">Pr</span>
          <span>Abhilash_Portfolio_V1.prproj</span>
        </div>
        <div className="hidden sm:flex gap-4">
          <span className="hover:text-primary transition-colors cursor-none interactive">File</span>
          <span className="hover:text-primary transition-colors cursor-none interactive">Edit</span>
          <span className="hover:text-primary transition-colors cursor-none interactive">Clip</span>
          <span className="hover:text-primary transition-colors cursor-none interactive">Sequence</span>
          <span className="hover:text-primary transition-colors cursor-none interactive">Markers</span>
          <span className="hover:text-primary transition-colors cursor-none interactive">Graphics</span>
          <span className="hover:text-primary transition-colors cursor-none interactive">Window</span>
          <span className="hover:text-primary transition-colors cursor-none interactive">Help</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span>CPU:</span>
          <div className="flex gap-[2px] h-3 items-end">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-amber-dim"
                animate={{
                  height: ["20%", "80%", "40%", "100%", "30%", "70%", "20%"][i % 7]
                }}
                transition={{
                  duration: 0.5 + i * 0.1,
                  repeat: Infinity,
                  repeatType: "mirror"
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full bg-red-500 ${blink ? 'opacity-100' : 'opacity-30'}`} />
          <span className="text-red-500 font-bold">REC</span>
        </div>
      </div>
    </motion.div>
  );
}
