"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ToolsSection() {
  const tools = [
    { name: "Adobe Premiere Pro", value: 95 },
    { name: "After Effects", value: 85 },
    { name: "Photoshop", value: 80 },
    { name: "Illustrator", value: 75 },
    { name: "CapCut", value: 90 },
  ];

  const skills = [
    { name: "Video Editing", value: 95 },
    { name: "Color Grading", value: 85 },
    { name: "Audio Sync", value: 90 },
    { name: "Motion Graphics", value: 80 },
    { name: "Visual Effects", value: 75 },
    { name: "Content Creation", value: 85 },
  ];

  return (
    <section 
      className="relative w-full min-h-screen flex flex-col md:flex-row p-4 pb-20 gap-2 overflow-hidden"
      data-cursor-label="INSPECT"
    >
      <div className="flex-1 bg-panel border border-border flex flex-col p-2">
        <div className="font-mono text-sm text-primary uppercase border-b border-border pb-1 tracking-widest mb-4 flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
          Effect Controls
        </div>
        
        <div className="flex flex-col gap-6 overflow-y-auto pr-2">
          <ControlGroup title="fx Software Proficiency" items={tools} />
          <div className="h-px bg-border w-full" />
          <ControlGroup title="fx Core Skills" items={skills} />
        </div>
      </div>
      
      <div className="hidden md:flex flex-col w-1/3 bg-panel border border-border p-2">
        <div className="font-mono text-sm text-primary uppercase border-b border-border pb-1 tracking-widest mb-4">
          Keyframe Interpolation
        </div>
        <div className="flex-1 relative flex items-center justify-center p-4">
           {/* Abstract graph representation */}
           <div className="w-full h-48 border-l border-b border-border relative">
             <motion.svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
               <motion.path 
                 d="M 0 100 C 50 100, 50 0, 100 0" 
                 fill="none" 
                 stroke="var(--amber)" 
                 strokeWidth="2"
                 initial={{ pathLength: 0 }}
                 whileInView={{ pathLength: 1 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 1.5, ease: "easeInOut" }}
               />
               <circle cx="0" cy="100" r="3" fill="var(--primary)" />
               <circle cx="100" cy="0" r="3" fill="var(--primary)" />
               
               <line x1="0" y1="100" x2="50" y2="100" stroke="var(--border-lit)" strokeWidth="1" />
               <line x1="100" y1="0" x2="50" y2="0" stroke="var(--border-lit)" strokeWidth="1" />
             </motion.svg>
             <div className="absolute -bottom-5 left-0 text-[10px] font-mono text-muted">Temporal</div>
             <div className="absolute top-0 -left-12 text-[10px] font-mono text-muted -rotate-90 origin-right">Spatial</div>
           </div>
        </div>
      </div>
    </section>
  );
}

function ControlGroup({ title, items }: { title: string, items: { name: string; value: number }[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-xs font-mono text-primary font-bold cursor-none interactive">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
        {title}
      </div>
      <div className="flex flex-col gap-1 pl-4">
        {items.map((item, i) => (
          <motion.div 
            key={i}
            className="flex items-center group interactive"
            whileHover={{ backgroundColor: "var(--bg-raised)" }}
          >
            <div className="flex items-center gap-2 w-1/3">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <span className="text-[11px] font-mono text-muted group-hover:text-primary transition-colors">{item.name}</span>
            </div>
            <div className="flex-1 flex items-center gap-2 pr-2">
              <span className="text-[10px] font-mono text-amber w-6 text-right">{item.value}.0</span>
              <div className="flex-1 h-3 border border-border bg-deep overflow-hidden relative">
                <motion.div 
                  className="h-full bg-amber opacity-80"
                  initial={{ width: "0%" }}
                  animate={isInView ? { width: `${item.value}%` } : { width: "0%" }}
                  transition={{ type: "spring", stiffness: 60, damping: 12, delay: i * 0.1 }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
