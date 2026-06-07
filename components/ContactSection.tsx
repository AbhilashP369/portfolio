"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section 
      className="relative w-full min-h-screen flex items-center justify-center p-4 pb-20"
      data-cursor-label="EXPORT"
    >
      <motion.div 
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="w-full max-w-2xl bg-panel border border-border shadow-2xl flex flex-col"
      >
        <div className="h-8 bg-raised border-b border-border flex items-center px-4 font-mono text-sm text-primary">
          Export Settings
        </div>
        
        <div className="flex flex-col md:flex-row p-4 gap-6">
          <div className="flex-1 flex flex-col gap-4">
            
            <motion.div variants={itemVariants} className="flex flex-col gap-1">
              <span className="text-[10px] font-mono text-muted uppercase">Format:</span>
              <div className="h-8 border border-border bg-deep px-2 flex items-center text-sm font-sans text-primary interactive cursor-none">
                H.264
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex flex-col gap-1">
              <span className="text-[10px] font-mono text-muted uppercase">Output Name:</span>
              <div className="h-8 border border-border bg-deep px-2 flex items-center text-sm font-sans text-amber interactive cursor-none">
                <a href="mailto:369abhilash@gmail.com" className="w-full h-full flex items-center">369abhilash@gmail.com</a>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-1">
              <span className="text-[10px] font-mono text-muted uppercase">Phone:</span>
              <div className="h-8 border border-border bg-deep px-2 flex items-center text-sm font-sans text-amber interactive cursor-none">
                <a href="tel:+919946664218" className="w-full h-full flex items-center">+91 9946664218</a>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex flex-col gap-1">
              <span className="text-[10px] font-mono text-muted uppercase">Instagram:</span>
              <a 
                href="https://www.instagram.com/_abhilazh__/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="h-10 border border-border bg-deep px-3 flex items-center gap-3 text-sm font-sans text-amber interactive cursor-none hover:bg-raised hover:border-amber/50 transition-all group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                @_abhilazh__
              </a>
            </motion.div>
          </div>
          
          <div className="w-full md:w-48 flex flex-col gap-2">
            <motion.div variants={itemVariants} className="h-32 border border-border bg-deep flex flex-col items-center justify-center p-2 text-center text-muted font-mono text-[10px]">
              <div className="w-full aspect-video bg-raised mb-2 border border-border flex items-center justify-center">
                <span className="text-primary font-bebas text-2xl tracking-widest">ABHILASH P</span>
              </div>
              Summary:
              1920x1080 (1.0), 29.97 fps, Progressive, Hardware Encoding
            </motion.div>
            
            <motion.div variants={itemVariants} className="mt-auto flex flex-col gap-2">
              <button className="h-8 bg-raised border border-border font-mono text-xs text-primary interactive hover:bg-border transition-colors cursor-none">
                Queue
              </button>
              <button className="h-8 bg-amber text-deep font-mono text-xs font-bold interactive hover:bg-amber-dim transition-colors cursor-none">
                <a href="mailto:369abhilash@gmail.com" className="w-full h-full flex items-center justify-center">Export</a>
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
