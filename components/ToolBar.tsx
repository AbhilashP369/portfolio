"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const tools = [
  { abbr: "Pr", name: "Premiere Pro", pct: 95, bg: "#9999FF", abbrBg: "#00005B" },
  { abbr: "Ae", name: "After Effects", pct: 85, bg: "#9999FF", abbrBg: "#00005B" },
  { abbr: "Ps", name: "Photoshop", pct: 80, bg: "#31A8FF", abbrBg: "#001E36" },
  { abbr: "Ai", name: "Illustrator", pct: 75, bg: "#FF9A00", abbrBg: "#330000" },
  { abbr: "CC", name: "CapCut", pct: 90, bg: "#000", abbrBg: "#000" },
];

export default function ToolBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="flex flex-col">
      {tools.map((tool, i) => (
        <div
          key={tool.abbr}
          className="flex items-center gap-3 h-8 border-b border-[#1a1a1a] px-1"
        >
          {/* Icon */}
          <div
            className="w-5 h-5 flex items-center justify-center shrink-0"
            style={{ backgroundColor: tool.abbrBg, border: `1px solid ${tool.bg}` }}
          >
            <span className="font-syne text-[8px] text-white leading-none">
              {tool.abbr}
            </span>
          </div>

          {/* Name */}
          <span className="font-syne text-[10px] text-[#aaa] w-24 shrink-0 truncate">
            {tool.name}
          </span>

          {/* Progress bar */}
          <div className="flex-1 h-1 bg-[#1a1a1a] relative">
            <motion.div
              className="absolute inset-y-0 left-0 bg-[#FF4D00]"
              initial={{ width: 0 }}
              animate={isInView ? { width: `${tool.pct}%` } : { width: 0 }}
              transition={{
                duration: 1,
                ease: "easeOut",
                delay: i * 0.1,
              }}
            />
          </div>

          {/* Percentage */}
          <span className="font-syne text-[9px] text-[#FF4D00] w-8 text-right shrink-0">
            {tool.pct}%
          </span>
        </div>
      ))}
    </div>
  );
}
