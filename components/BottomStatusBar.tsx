"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function BottomStatusBar() {
  const [dropFrame, setDropFrame] = useState(false);
  const [time, setTime] = useState({ h: 0, m: 0, s: 0, f: 0 });

  useEffect(() => {
    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      
      // Timecode flicker (randomly add 2 frames every 8-20s approx)
      if (Math.random() < 0.005) {
        setDropFrame(true);
        frame += 2;
        setTimeout(() => setDropFrame(false), 50); // flicker duration 1 frame
      }
      
      setTime({
        h: Math.floor(frame / (30 * 60 * 60)),
        m: Math.floor(frame / (30 * 60)) % 60,
        s: Math.floor(frame / 30) % 60,
        f: frame % 30
      });
    }, 1000 / 30); // 30 fps approximation
    
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
        <span className="hidden sm:inline">FPS: 29.97 DF</span>
      </div>
      
      <div className={`font-mono text-lg transition-colors ${dropFrame ? 'text-amber' : 'text-green-tc'}`}>
        {format(time.h)}:{format(time.m)}:{format(time.s)}:{format(time.f)}
      </div>
    </motion.div>
  );
}
