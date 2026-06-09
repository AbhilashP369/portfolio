"use client";
import { motion } from "framer-motion";
import SoftwareIcon from "./SoftwareIcon";

export default function ExperienceSection() {
  const experiences = [
    {
      title: "Freelance Video Editor",
      status: "Rendering...",
      statusColor: "#FF4D00",
      date: "2024–Present",
      details: [
        "Short-form reels & social media videos",
        "Motion graphics and visual effects",
        "Photo editing, retouching, color enhancement"
      ],
      software: ["Premiere Pro", "After Effects", "Photoshop"]
    },
    {
      title: "Wedding Cinematography",
      status: "Done",
      statusColor: "#28C840",
      date: "2023-2024",
      details: [
        "Cinematic wedding films and highlights",
        "Color grading and audio sync",
        "Same-day edits for social media"
      ],
      software: ["Premiere Pro", "After Effects", "Photoshop"]
    },
    {
      title: "Brand Content & Ads",
      status: "Done",
      statusColor: "#28C840",
      date: "2023-2024",
      details: [
        "Product launch videos and reels",
        "Social media ad creatives",
        "Thumbnail and poster design"
      ],
      software: ["Premiere Pro", "Photoshop", "Illustrator"]
    },
    {
      title: "Academic Projects — MCA",
      status: "Done",
      statusColor: "#28C840",
      date: "2019-2025",
      details: [
        "Technical projects with creative output",
        "UI/UX design and motion concepts",
        "Visual storytelling and documentation"
      ],
      software: ["Photoshop", "Illustrator"]
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
      className="relative w-full h-auto flex flex-col p-4 pb-0 mb-6 gap-2 overflow-hidden"
      data-cursor-label="INSPECT"
    >
      <div className="w-full bg-panel border border-[#1a1a1a] flex flex-col p-2">
        <div className="font-mono text-sm text-[#E8E8E8] uppercase border-b border-[#1a1a1a] pb-1 tracking-widest mb-2 flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          Render Queue
        </div>
        
        <div className="flex flex-col border border-[#1a1a1a] bg-deep h-auto">
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
                className={`flex flex-col py-[12px] px-[16px] ${
                  i !== experiences.length - 1 ? 'border-b border-[#1a1a1a]' : ''
                } interactive group hover:bg-[#111] transition-colors`}
              >
                <div className="flex items-start">
                  <div className="font-mono text-[11px] text-[#555] w-[24px] shrink-0 pt-0.5">
                    {i + 1}
                  </div>
                  
                  <div className="flex-1 flex flex-col gap-1.5">
                    <div className="flex justify-between items-center w-full flex-wrap gap-2">
                      <h3 className="font-mono text-[12px] text-[#ccc] font-medium leading-none flex-1">
                        {exp.title}
                      </h3>
                      <div className="flex items-center gap-4 shrink-0">
                        <span className="font-mono text-[9px] text-[#555] min-w-[100px] text-right">
                          {exp.date}
                        </span>
                        <span 
                          className="font-mono text-[10px] min-w-[100px] text-right flex items-center justify-end gap-1.5"
                          style={{ color: exp.statusColor }}
                        >
                          {exp.status === 'Rendering...' && (
                            <span className="flex items-center gap-[2px]">
                              <span className="w-1 h-1 bg-[#FF4D00] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                              <span className="w-1 h-1 bg-[#FF4D00] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                              <span className="w-1 h-1 bg-[#FF4D00] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </span>
                          )}
                          {exp.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-end pl-[24px]">
                      <ul className="flex flex-col list-none gap-0.5 mt-1">
                        {exp.details.map((detail, j) => (
                          <li key={j} className="font-mono text-[10px] text-[#555] leading-[1.8] flex items-center gap-2">
                            <span className="text-[#FF4D00]">›</span> {detail}
                          </li>
                        ))}
                      </ul>
                      
                      <div className="flex gap-[6px] shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
                        {exp.software.map((sw, k) => (
                          <div 
                            key={k} 
                            title={sw}
                            className="hover:scale-110 transition-transform interactive"
                          >
                            <SoftwareIcon name={sw} className="w-[18px] h-[18px]" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="w-full text-center mt-6">
        <span className="font-mono text-[10px] text-[#555] tracking-widest">--- CUT ---</span>
      </div>
    </section>
  );
}
