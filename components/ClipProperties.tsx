"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const metadata = [
  { key: "Name", value: "Abhilash P" },
  { key: "Role", value: "Video Editor" },
  { key: "Location", value: "Kannur, Kerala" },
  { key: "Experience", value: "Fresher / Freelancer" },
  { key: "Education", value: "MCA — CIT Kannur" },
  { key: "Availability", value: "Immediate", green: true },
  { key: "Format", value: "Freelance / Full-Time" },
];

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 h-8 border-b border-[#222] px-1">
      <span className="text-[10px] text-[#888] font-syne">▶ {title}</span>
    </div>
  );
}

export default function ClipProperties() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="flex flex-col gap-0">
      {/* SECTION 1 — Biography */}
      <SectionHeader title="Biography" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="px-2 py-3 border-b border-[#1a1a1a]"
      >
        <p className="font-syne text-[11px] text-[#aaa] leading-[1.8]">
          Self-taught freelance video editor and motion designer. I craft cinematic
          wedding films, high-energy ads, and short-form content that captivates. 
          Based in Kannur, Kerala — passionate about turning raw footage into 
          visual stories that leave a lasting impact.
        </p>
      </motion.div>

      {/* SECTION 2 — Metadata */}
      <SectionHeader title="Metadata" />
      <div className="flex flex-col">
        {metadata.map((row, i) => (
          <motion.div
            key={row.key}
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ duration: 0.3, delay: 0.05 * i }}
            className="flex items-center h-7 border-b border-[#1a1a1a]"
            style={{
              backgroundColor: i % 2 === 0 ? "#0E0E0E" : "#111111",
            }}
          >
            <span className="font-syne text-[9px] text-[#555] w-[35%] px-2 truncate">
              {row.key}
            </span>
            <span
              className={`font-syne text-[10px] w-[65%] px-2 truncate flex items-center gap-1.5 ${
                row.green ? "text-[#28C840]" : "text-[#ccc]"
              }`}
            >
              {row.green && (
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#28C840] opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#28C840]" />
                </span>
              )}
              {row.value}
            </span>
          </motion.div>
        ))}
      </div>

      {/* SECTION 3 — Specialties */}
      <SectionHeader title="Specialties" />
      <div className="grid grid-cols-2 gap-px bg-[#222] border-b border-[#1a1a1a]">
        <div className="flex items-center justify-center p-5 border border-[#222] bg-[#111] hover:bg-[#1a1a1a] transition-colors">
          <span className="font-syne text-[11px] text-[#FF4D00] uppercase tracking-widest text-center">Freelance +</span>
        </div>
        <div className="flex items-center justify-center p-5 border border-[#222] bg-[#111] hover:bg-[#1a1a1a] transition-colors">
          <span className="font-syne text-[11px] text-[#FF4D00] uppercase tracking-widest text-center">Weddings +</span>
        </div>
        <div className="flex items-center justify-center p-5 border border-[#222] bg-[#111] hover:bg-[#1a1a1a] transition-colors">
          <span className="font-syne text-[11px] text-[#FF4D00] uppercase tracking-widest text-center">Ads & Reels</span>
        </div>
        <div className="flex items-center justify-center p-5 border border-[#222] bg-[#111] hover:bg-[#1a1a1a] transition-colors">
          <span className="font-syne text-[11px] text-[#FF4D00] uppercase tracking-widest text-center">Cinematic +</span>
        </div>
      </div>
    </div>
  );
}
