"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";

export default function HeroSection() {
  const [, setIsHovering] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Subtle 3D perspective shift on center panel
  const rotateX = useTransform(mouseY, [-300, 300], [0.5, -0.5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-0.5, 0.5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  return (
    <section 
      className="relative w-full h-screen flex flex-col md:flex-row items-center justify-center p-4 pt-10 pb-10 gap-2 overflow-hidden"
      data-cursor-label="PLAY"
    >
      {/* Left Panel: Project Bin Mockup */}
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.5, ease: "easeOut" }}
        className="hidden md:flex flex-col w-1/4 h-[80vh] bg-panel border border-border p-2"
      >
        <div className="font-mono text-[10px] text-muted border-b border-border pb-1 mb-2">Project: Bin 1</div>
        <div className="flex flex-col gap-1">
          <div className="h-6 bg-raised border border-border flex items-center px-2 text-[10px] font-mono interactive">Sequence_01.prproj</div>
          <div className="h-6 bg-raised border border-border flex items-center px-2 text-[10px] font-mono interactive">Intro_Draft_v2.mp4</div>
          <div className="h-6 bg-raised border border-border flex items-center px-2 text-[10px] font-mono interactive">B_Roll_Footage/</div>
          <div className="h-6 bg-raised border border-border flex items-center px-2 text-[10px] font-mono interactive">Audio_SFX/</div>
        </div>
      </motion.div>

      {/* Center Panel: Program Monitor */}
      <motion.div
        initial={{ opacity: 0, filter: "blur(8px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ delay: 0.45, duration: 0.8, ease: "easeOut" }}
        className="relative flex-1 w-full md:w-1/2 h-[80vh] bg-panel border border-border flex items-center justify-center perspective-[1000px]"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          mouseX.set(0);
          mouseY.set(0);
        }}
      >
        <motion.div 
          className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
          style={{ rotateX, rotateY }}
        >
          {/* Safe Area Guides */}
          <div className="absolute inset-8 border border-border opacity-30 pointer-events-none" />
          <div className="absolute inset-16 border border-border opacity-20 pointer-events-none" />
          
          <div className="absolute top-2 left-2 font-mono text-[10px] text-muted">Program: ABHILASH_MASTER</div>
          
          <div className="relative z-10 flex flex-col items-center">
            {/* Glitch text effect container */}
            <div className="relative">
              <motion.h1 
                className="font-bebas text-7xl md:text-9xl text-primary tracking-wider"
                animate={{
                  textShadow: [
                    "0px 0px 0px rgba(0,0,0,0)",
                    "2px 0px 0px rgba(255,0,0,0.8), -2px 0px 0px rgba(0,255,255,0.8)",
                    "-2px 0px 0px rgba(255,0,0,0.8), 2px 0px 0px rgba(0,255,255,0.8)",
                    "0px 0px 0px rgba(0,0,0,0)"
                  ]
                }}
                transition={{
                  duration: 0.2,
                  delay: 1.2,
                  times: [0, 0.3, 0.6, 1]
                }}
              >
                <motion.span
                  className="inline-block origin-center"
                  animate={{ scale: [1, 1.025] }}
                  transition={{ duration: 10, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                >
                  ABHILASH P
                </motion.span>
              </motion.h1>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="mt-4 font-mono text-sm md:text-base text-amber tracking-widest text-center"
            >
              Turning Frames Into Emotion
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.5 }}
              className="mt-8 font-sans text-muted text-xs md:text-sm text-center max-w-md uppercase tracking-[0.2em]"
            >
              Video Editor & Motion Designer
              <br/>
              Kannur, Kerala, India
            </motion.div>
          </div>

          {/* Transport Controls Mockup */}
          <div className="absolute bottom-4 flex gap-4 text-muted items-center justify-center w-full">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="interactive hover:text-amber transition-colors"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="interactive hover:text-amber transition-colors"><polygon points="11 19 2 12 11 5 11 19"></polygon><polygon points="22 19 13 12 22 5 22 19"></polygon></svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="interactive text-primary hover:text-amber transition-colors"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="interactive hover:text-amber transition-colors"><polygon points="13 19 22 12 13 5 13 19"></polygon><polygon points="2 19 11 12 2 5 2 19"></polygon></svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="interactive hover:text-amber transition-colors"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>
          </div>
        </motion.div>
      </motion.div>

      {/* Right Panel: Audio Meters / Metadata */}
      <motion.div
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.5, ease: "easeOut" }}
        className="hidden md:flex flex-col w-1/4 h-[80vh] bg-panel border border-border p-2"
      >
        <div className="font-mono text-[10px] text-muted border-b border-border pb-1 mb-2">Metadata</div>
        <div className="font-mono text-[10px] text-muted flex flex-col gap-2">
          <div className="flex justify-between"><span>Format:</span> <span className="text-primary">ProRes 422 HQ</span></div>
          <div className="flex justify-between"><span>Color Space:</span> <span className="text-primary">Rec.709</span></div>
          <div className="flex justify-between"><span>Audio:</span> <span className="text-primary">48000 Hz, Stereo</span></div>
        </div>
        
        <div className="mt-auto">
          <div className="font-mono text-[10px] text-muted border-b border-border pb-1 mb-2">Audio Meters</div>
          <div className="flex h-48 gap-1 justify-center">
            {/* L Channel */}
            <div className="relative w-4 bg-deep border border-border flex items-end overflow-hidden">
              <motion.div 
                className="w-full bg-gradient-to-t from-green-500 via-amber to-red-500 origin-bottom"
                animate={{ height: ["40%", "85%", "60%", "90%", "30%", "75%", "50%"] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
              />
              <div className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent,transparent_2px,var(--bg-deep)_2px,var(--bg-deep)_4px)] pointer-events-none" />
            </div>
            {/* R Channel */}
            <div className="relative w-4 bg-deep border border-border flex items-end overflow-hidden">
              <motion.div 
                className="w-full bg-gradient-to-t from-green-500 via-amber to-red-500 origin-bottom"
                animate={{ height: ["35%", "80%", "55%", "95%", "25%", "80%", "45%"] }}
                transition={{ duration: 0.7, repeat: Infinity, repeatType: "mirror", ease: "linear", delay: 0.1 }}
              />
              <div className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent,transparent_2px,var(--bg-deep)_2px,var(--bg-deep)_4px)] pointer-events-none" />
            </div>
          </div>
          <div className="flex gap-1 justify-center mt-1 text-[8px] font-mono text-muted">
            <span className="w-4 text-center">L</span>
            <span className="w-4 text-center">R</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
