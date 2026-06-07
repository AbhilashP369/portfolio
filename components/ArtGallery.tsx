"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { artworks } from "@/data/artworks";
import ArtCarousel from "./ArtCarousel";

const FILTERS = ["ALL", "POSTERS", "PAINTINGS", "DIGITAL ART"];

export default function ArtGallery() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filteredArtworks = activeFilter === "ALL" 
    ? artworks 
    : artworks.filter(art => art.category === activeFilter);

  return (
    <section ref={ref} className="relative w-full py-24 flex flex-col gap-12 overflow-hidden bg-[var(--deep)]" id="art-gallery">
      
      {/* Section Header */}
      <motion.div 
        initial={{ y: 40, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="px-4 md:px-12 flex flex-col gap-2 z-20 items-center text-center"
      >
        <span className="font-mono text-xs text-[var(--ember)] tracking-widest uppercase">
          006 / ART & DESIGN
        </span>
        <h2 className="text-5xl md:text-7xl font-bebas text-[var(--ivory)] uppercase tracking-wider">
          Posters & Paintings
        </h2>
        <p className="font-sans text-xs md:text-sm text-[var(--muted)] tracking-widest uppercase mt-2">
          Digital Art · Illustration · Poster Design · Painting
        </p>
      </motion.div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 px-4 z-20">
        {FILTERS.map((filter, index) => (
          <motion.button
            key={filter}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            onClick={() => setActiveFilter(filter)}
            className={`font-mono text-[10px] tracking-widest uppercase px-5 py-2 rounded-full border-[0.5px] transition-all duration-300 ${
              activeFilter === filter 
                ? "bg-[var(--ember)] border-[var(--ember)] text-[var(--void)]" 
                : "bg-transparent border-[var(--line)] text-[var(--muted)] hover:border-[var(--ember)] hover:text-[var(--ember)]"
            }`}
          >
            {filter}
          </motion.button>
        ))}
      </div>

      {/* Carousel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <ArtCarousel items={filteredArtworks} />
      </motion.div>

      {/* Instagram Link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex justify-center mt-4 px-4 z-20"
      >
        <a 
          href="https://www.instagram.com/_abhilazh__/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center gap-3 px-6 py-3 border border-border bg-black/40 hover:bg-raised hover:border-[var(--ember)] transition-all duration-300 font-sans text-sm text-[var(--ivory)] hover:text-[var(--ember)] uppercase tracking-widest cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          See more on Instagram
        </a>
      </motion.div>

    </section>
  );
}
