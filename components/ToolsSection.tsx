"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SoftwareIcon from "./SoftwareIcon";
import KeyframeGrowth from "./KeyframeGrowth";

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
      className="relative w-full min-h-screen flex flex-col lg:flex-row p-4 pb-20 gap-2 overflow-hidden"
      data-cursor-label="INSPECT"
    >
      <div className="flex-1 bg-panel border border-border flex flex-col p-2">
        <div className="font-mono text-sm text-primary uppercase border-b border-border pb-1 tracking-widest mb-4 flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
          Effect Controls
        </div>
        
        <div className="flex flex-col gap-6 overflow-y-auto pr-2">
          <ControlGroup title="fx Software Proficiency" items={tools} isSoftware={true} />
          <div className="h-px bg-border w-full" />
          <ControlGroup title="fx Core Skills" items={skills} isSoftware={false} />
        </div>
      </div>
      
      <div className="flex flex-col w-full lg:w-[35%] h-[220px] md:h-[280px] lg:h-auto shrink-0 z-10">
        <KeyframeGrowth />
      </div>
    </section>
  );
}

function ControlGroup({ title, items, isSoftware }: { title: string, items: { name: string; value: number }[], isSoftware: boolean }) {
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
              {isSoftware ? (
                <SoftwareIcon name={item.name} className="w-3.5 h-3.5 text-muted group-hover:text-primary transition-colors" />
              ) : (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted group-hover:text-primary transition-colors"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              )}
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
