"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SectionDots() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate which section is most visible
      // Assume each section is roughly 100vh for simplicity of dot highlighting
      const active = Math.round(scrollPosition / windowHeight);
      setActiveSection(Math.min(active, 3)); // 4 sections total
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3 pointer-events-none">
      {[0, 1, 2, 3].map((index) => (
        <motion.div
          key={index}
          className="w-1 h-1 rounded-full bg-amber"
          animate={{
            opacity: activeSection === index ? 1 : 0.2,
            scale: activeSection === index ? 1.5 : 1,
            boxShadow: activeSection === index ? "0 0 8px rgba(232, 160, 69, 0.8)" : "none"
          }}
          transition={{ duration: 0.3 }}
        />
      ))}
    </div>
  );
}
