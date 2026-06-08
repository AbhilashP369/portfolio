"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AboutProgramMonitor from "./AboutProgramMonitor";
import ClipProperties from "./ClipProperties";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      className="relative w-full py-16 px-4 flex flex-col gap-6"
      id="about"
      data-cursor-label="PROPERTIES"
    >
      {/* Section label & heading */}
      <div className="flex flex-col gap-2">
        <span className="font-mono text-xs text-amber tracking-widest uppercase">
          002 / ABOUT
        </span>
        <h2 className="text-5xl md:text-7xl font-bebas text-primary uppercase tracking-wider">
          Project Settings
        </h2>
        <p className="font-syne text-[10px] text-[var(--text-muted)] tracking-[0.2em] uppercase">
          Director · Editor · Designer
        </p>
      </div>

      {/* Main panel container */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full border border-[#2a2a2a] bg-[#0E0E0E] flex flex-col"
      >
        {/* Panel header bar — macOS window controls */}
        <div className="h-8 bg-[#111] border-b border-[#2a2a2a] flex items-center justify-between px-4">
          {/* macOS dots */}
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          </div>

          {/* Center title */}
          <span className="font-syne text-[10px] text-[#666] tracking-wide hidden md:block">
            Properties — ABHILASH_P.prproj
          </span>

          {/* Close */}
          <span className="font-syne text-[12px] text-[#555] hover:text-primary transition-colors interactive">
            ×
          </span>
        </div>

        {/* Two column layout */}
        <div className="flex flex-col md:flex-row gap-0">
          {/* Left column — Program Monitor (45%) */}
          <div className="w-full md:w-[45%] p-5 md:border-r border-[#2a2a2a]">
            {/* Monitor flicker animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={
                isInView
                  ? { opacity: [0, 0.3, 1, 0.7, 1] }
                  : { opacity: 0 }
              }
              transition={{ duration: 0.5, ease: "linear" }}
            >
              <AboutProgramMonitor />
            </motion.div>
          </div>

          {/* Right column — Clip Properties (55%) */}
          <div className="w-full md:w-[55%] overflow-y-auto">
            <ClipProperties />
          </div>
        </div>

        {/* Section footer bar */}
        <div className="h-7 bg-[#111] border-t border-[#2a2a2a] flex items-center justify-between px-4">
          <span className="font-syne text-[9px] text-[#444] hidden sm:block">
            Project: ABHILASH_MASTER
          </span>
          <span className="font-syne text-[9px] text-[#444]">
            Kerala, India · 11.87°N 75.37°E
          </span>
          <span className="font-syne text-[9px] text-[#28C840] flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#28C840] opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#28C840]" />
            </span>
            Available for Work
          </span>
        </div>
      </motion.div>
    </section>
  );
}
