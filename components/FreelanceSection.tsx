"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const clients = [
  {
    name: "VACMATE",
    location: "Geelong, Australia",
    role: "Video Editor",
    metric: "15+ Videos",
    tags: ["Promotional Content", "Social Media"],
    link: "https://vacmatecleaning.com.au/",
    linkLabel: "Visit Website",
    logo: "/images/clients/Vacmate-Cleaning-Logo-1.svg",
  },
  {
    name: "FROZEN FOOD GALAXY",
    location: "Kannur, Kerala",
    role: "Graphic Designer",
    metric: "10+ Designs",
    tags: ["Social Media", "Promotional Graphics"],
    link: "https://www.justdial.com/Kannur/Frozen-Food-Galaxy-Near-Ramananda-Oil-Mill-South-Bazar-Road/9999PX497-X497-220715172038-P3A5_BZDET",
    linkLabel: "View Business",
    logo: "/images/clients/FFG-bluelogo.png",
  },
  {
    name: "NOCTICS",
    location: "India",
    role: "Video Editor",
    metric: "1 Video",
    tags: ["Shoot & Edit", "Brand Launch"],
    link: null,
    linkLabel: null,
    logo: null,
  },
  {
    name: "OTHER CLIENTS",
    location: "Kerala, India",
    role: "Creative Work",
    metric: "30+ Projects",
    tags: ["Graphic Design", "Video Editing", "Promotional Content"],
    link: null,
    linkLabel: null,
    logo: null,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function FreelanceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative w-full h-auto flex flex-col p-4 pb-0 mb-6 gap-2 overflow-hidden"
      data-cursor-label="INSPECT"
    >
      <div className="w-full bg-panel border border-[#1a1a1a] flex flex-col p-2">
        {/* Section Header */}
        <div className="font-mono text-sm text-[#E8E8E8] uppercase border-b border-[#1a1a1a] pb-1 tracking-widest mb-2 flex items-center gap-2">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FF4D00"
            strokeWidth="2"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          Clients & Collaborations
        </div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="px-3 py-2.5 border-b border-[#1a1a1a] bg-[#0a0a0a] flex flex-col sm:flex-row sm:items-center justify-between gap-1"
        >
          <h2 className="font-syne text-xs text-[#E8E8E8] font-bold tracking-wider">
            BRANDS I&apos;VE WORKED WITH
          </h2>
          <span className="font-mono text-[10px] text-[#FF4D00] tracking-widest uppercase font-medium">
            Real projects. Real clients. Real work.
          </span>
        </motion.div>

        {/* Client Rows */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col"
        >
          {clients.map((client, i) => (
            <motion.div
              key={i}
              variants={rowVariants}
              className={`group interactive relative flex items-start gap-4 px-4 py-4 hover:bg-[#111] transition-all duration-200 ${
                i !== clients.length - 1 ? "border-b border-[#1a1a1a]" : ""
              }`}
              style={{
                backgroundColor: i % 2 === 0 ? "#0B0B0B" : "#0E0E0E",
              }}
            >
              {/* Left: Logo or Orange Dot */}
              <div className="w-[38px] h-[38px] rounded bg-[#151515] border border-[#222] shrink-0 flex items-center justify-center relative overflow-hidden mt-0.5">
                {client.logo ? (
                  <Image
                    src={client.logo}
                    alt={`${client.name} logo`}
                    fill
                    className="object-contain p-1"
                  />
                ) : (
                  <div className="w-[7px] h-[7px] rounded-full bg-[#FF4D00] opacity-70 group-hover:opacity-100 transition-opacity" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                {/* Header: Name + Highlighted Metric Badge */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <h3 className="font-syne text-[15px] text-[#E8E8E8] font-extrabold tracking-wide group-hover:text-white transition-colors leading-tight">
                    {client.name}
                  </h3>

                  {/* Highlighted Metric Pill */}
                  {client.metric && (
                    <div className="font-mono text-[11px] font-extrabold text-[#FF4D00] bg-gradient-to-r from-[#FF4D00]/20 via-[#FF4D00]/12 to-[#FF4D00]/5 border border-[#FF4D00]/50 px-2.5 py-0.5 rounded-sm tracking-wider shadow-[0_0_12px_rgba(255,77,0,0.18)] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] animate-pulse" />
                      {client.metric}
                    </div>
                  )}
                </div>

                {/* Location + Role */}
                <p className="font-mono text-[10px] text-[#777] italic leading-tight">
                  {client.location} · {client.role}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-0.5">
                  {client.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="font-mono text-[9px] text-[#AAA] bg-[#141414] border border-[#222] px-2 py-0.5 rounded-sm tracking-wider group-hover:border-[#FF4D00]/40 group-hover:text-white transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Link */}
                {client.link && (
                  <a
                    href={client.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-1 interactive group/link"
                  >
                    <span className="font-mono text-[10px] text-[#FF4D00] font-bold tracking-wider group-hover/link:underline underline-offset-2">
                      {client.linkLabel} →
                    </span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="w-full text-center mt-6">
        <span className="font-mono text-[10px] text-[#555] tracking-widest">
          --- CUT ---
        </span>
      </div>
    </section>
  );
}
