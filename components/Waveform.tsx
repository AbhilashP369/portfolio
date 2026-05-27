"use client";
import { motion } from "framer-motion";

export default function Waveform() {
  const bars = 40;
  
  return (
    <div className="flex items-center h-8 gap-[1px] w-full px-2 opacity-80">
      {[...Array(bars)].map((_, i) => (
        <motion.div
          key={i}
          className="flex-1 bg-amber-dim opacity-70"
          animate={{
            scaleY: [
              0.2 + Math.random() * 0.3, 
              0.5 + Math.random() * 0.5, 
              0.2 + Math.random() * 0.3,
              0.6 + Math.random() * 0.4,
              0.3 + Math.random() * 0.2,
            ]
          }}
          transition={{
            duration: 1 + Math.random() * 0.5,
            repeat: Infinity,
            repeatType: "mirror",
            delay: Math.random() * 2
          }}
          style={{ originY: 0.5 }}
        />
      ))}
    </div>
  );
}
