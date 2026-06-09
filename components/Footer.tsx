"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full bg-[#080808] border-t border-[#1a1a1a] flex flex-col items-center justify-center min-h-[auto] md:h-[56px] px-[20px] md:px-[40px] py-[16px] md:py-0 z-50 cursor-none interactive"
    >
      {/* RENDER BAR */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#1a1a1a]">
        <motion.div
          initial={{ width: "0%" }}
          animate={mounted ? { width: "100%" } : { width: "0%" }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          className="h-full"
          style={{
            background: "linear-gradient(to right, #FF4D00 0%, #FF6B2B 50%, #28C840 100%)",
            boxShadow: "0 0 8px rgba(255, 77, 0, 0.2)"
          }}
        />
      </div>

      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-[6px] md:gap-0">
        
        {/* LEFT SIDE */}
        <div className="flex items-center gap-1">
          <span className="font-mono text-[9px] text-[#ccc]">Designed & Built by</span>
          <span 
            onClick={scrollToTop}
            className="font-mono text-[10px] text-[#FF4D00] hover:text-[#ffffff] transition-colors duration-300 cursor-pointer interactive tracking-[0.1em]"
          >
            ABHILASH P
          </span>
        </div>

        {/* CENTER */}
        <div className="font-mono text-[9px] text-[#333] hidden md:block">
          © 2026 All Rights Reserved
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-[16px]">
          <span className="font-mono text-[9px] text-[#333] hidden md:block">
            V1.0 — Portfolio_Master.prproj
          </span>
          <a 
            href="mailto:369abhilash@gmail.com"
            className="group flex items-center gap-1.5 cursor-pointer interactive"
          >
            <div className="w-[5px] h-[5px] rounded-full bg-[#28C840] animate-pulse" />
            <span className="font-mono text-[9px] text-[#28C840] group-hover:underline">
              Available for Hire
            </span>
          </a>
        </div>

        {/* MOBILE ONLY: CENTER COPY */}
        <div className="font-mono text-[9px] text-[#333] block md:hidden order-2 mt-[2px]">
          © 2026 All Rights Reserved
        </div>

      </div>
    </motion.footer>
  );
}
