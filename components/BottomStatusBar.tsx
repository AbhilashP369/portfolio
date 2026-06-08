"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function BottomStatusBar() {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0, f: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime({
        h: now.getHours(),
        m: now.getMinutes(),
        s: now.getSeconds(),
        f: Math.floor(now.getMilliseconds() / 41.67) // 24fps
      });
    }, 41); // update approx every frame
    
    return () => clearInterval(interval);
  }, []);

  const format = (num: number) => num.toString().padStart(2, '0');

  return (
    <motion.div
      initial={{ y: 30 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
      className="fixed bottom-0 left-0 right-0 h-8 bg-panel border-t border-border flex items-center justify-between px-4 z-40 font-mono text-[11px] text-muted select-none"
    >
      <div className="flex items-center gap-4">
        <span>Project: ABHILASH_MASTER</span>
        <span className="hidden sm:inline">|</span>
        <span className="hidden sm:inline">Resolution: 1920x1080</span>
        <span className="hidden sm:inline">|</span>
        <span className="hidden sm:inline">FPS: 24.00 DF</span>
      </div>
      
      <div 
        className="font-syne text-[11px] transition-colors"
        style={{ 
          color: '#FF4D00', 
          textShadow: '0 0 8px rgba(255, 77, 0, 0.4)' 
        }}
      >
        {format(time.h)}:{format(time.m)}:{format(time.s)}:{format(time.f)}
      </div>
    </motion.div>
  );
}
