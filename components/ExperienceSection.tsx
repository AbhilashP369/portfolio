"use client";
import { motion } from "framer-motion";

export default function ExperienceSection() {
  const experiences = [
    {
      title: "Freelance Video Editor & Graphic Designer",
      duration: "2024–Present",
      details: [
        "Short-form reels & social media videos",
        "Motion graphics and visual effects",
        "Photo editing, retouching, color enhancement",
        "Social media creatives and thumbnails"
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section 
      className="relative w-full min-h-screen flex flex-col p-4 pb-20 gap-2 overflow-hidden"
      data-cursor-label="INSPECT"
    >
      <div className="flex-1 bg-panel border border-border flex flex-col p-2">
        <div className="font-mono text-sm text-primary uppercase border-b border-border pb-1 tracking-widest mb-4 flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          Render Queue
        </div>
        
        <div className="flex flex-col border border-border bg-deep h-full">
          {/* Header */}
          <div className="flex border-b border-border bg-raised font-mono text-[10px] text-muted p-2">
            <div className="w-8 text-center">#</div>
            <div className="flex-1">Comp Name</div>
            <div className="w-32 hidden md:block">Duration</div>
            <div className="w-32 hidden md:block">Status</div>
          </div>
          
          {/* Rows */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col"
          >
            {experiences.map((exp, i) => (
              <motion.div 
                key={i} 
                variants={rowVariants}
                whileHover={{ borderLeftColor: "var(--amber)", backgroundColor: "var(--bg-raised)" }}
                className="flex flex-col border-b border-border border-l-4 border-l-transparent interactive cursor-none group transition-colors"
              >
                <div className="flex p-2 items-center font-sans text-xs">
                  <div className="w-8 text-center text-muted font-mono">{i + 1}</div>
                  <div className="flex-1 text-primary font-bold">{exp.title}</div>
                  <div className="w-32 text-muted font-mono hidden md:block">{exp.duration}</div>
                  <div className="w-32 text-green-tc font-mono hidden md:block">Rendering...</div>
                </div>
                
                <div className="flex pl-10 pr-2 pb-2">
                  <ul className="text-[11px] text-muted font-mono list-none flex flex-col gap-1">
                    {exp.details.map((detail, j) => (
                      <li key={j} className="flex gap-2">
                        <span className="text-amber">›</span> {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
