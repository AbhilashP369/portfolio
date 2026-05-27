"use client";
import { motion, useScroll, useTransform, useInView, useAnimationControls } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Waveform from "./Waveform";

export default function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scrollPlayheadX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const playheadControls = useAnimationControls();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault(); // Prevent page scroll
        if (isPlaying) {
          playheadControls.stop();
          setIsPlaying(false);
        } else {
          setIsPlaying(true);
          playheadControls.start({
            left: ["0%", "100%"],
            transition: { duration: 5, ease: "linear" }
          }).then(() => setIsPlaying(false));
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, playheadControls]);

  const tracks = [
    { type: 'V3', name: 'Video Editing', color: 'bg-blue-500/20 border-blue-500/50', items: [{ name: 'Premiere Pro', w: '30%', ml: '5%' }, { name: 'CapCut', w: '25%', ml: '10%' }] },
    { type: 'V2', name: 'Motion Graphics', color: 'bg-purple-500/20 border-purple-500/50', items: [{ name: 'After Effects', w: '40%', ml: '15%' }] },
    { type: 'V1', name: 'Design', color: 'bg-pink-500/20 border-pink-500/50', items: [{ name: 'Photoshop', w: '20%', ml: '0%' }, { name: 'Illustrator', w: '25%', ml: '5%' }] },
    { type: 'divider' },
    { type: 'A1', name: 'Color Grading', color: 'bg-green-500/20 border-green-500/50', isAudio: true, items: [{ name: 'Lumetri Color', w: '50%', ml: '10%' }] },
    { type: 'A2', name: 'Audio Sync', color: 'bg-emerald-500/20 border-emerald-500/50', isAudio: true, items: [{ name: 'Sound Design', w: '35%', ml: '25%' }] },
  ];

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col p-4 pb-20 gap-2 overflow-hidden"
      data-cursor-label="SCRUB"
    >
      <div className="flex gap-2 items-center mb-2">
        <h2 className="font-mono text-sm text-primary uppercase border-b border-border pb-1 tracking-widest">Timeline_Sequence_01</h2>
      </div>

      <div className="flex-1 bg-panel border border-border flex flex-col relative overflow-hidden">
        {/* Timeline Ruler */}
        <div className="h-6 bg-raised border-b border-border flex items-end px-16 relative">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="flex-1 border-l border-border h-2 flex items-end pl-1 pb-1">
              <span className="text-[8px] font-mono text-muted">00:00:{i.toString().padStart(2, '0')}:00</span>
            </div>
          ))}
          
          {/* Playhead */}
          <motion.div 
            className="absolute top-0 bottom-[-1000px] w-[1px] bg-red-500 z-30 pointer-events-none"
            style={{ left: scrollPlayheadX }}
            animate={playheadControls}
          >
            <div className="absolute top-0 -left-1.5 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-red-500" />
          </motion.div>
        </div>

        {/* Tracks */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {tracks.map((track, i) => {
            if (track.type === 'divider') {
              return <div key={i} className="h-2 bg-deep border-y border-border" />;
            }
            return (
              <div key={i} className="flex h-20 border-b border-border relative">
                {/* Track Header */}
                <div className="w-16 md:w-32 flex-shrink-0 bg-raised border-r border-border flex flex-col justify-center px-2 py-1 z-10">
                  <div className="flex justify-between items-center text-xs font-mono text-muted mb-1">
                    <span className="font-bold">{track.type}</span>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 border border-border flex items-center justify-center text-[6px]">M</div>
                      <div className="w-2 h-2 border border-border flex items-center justify-center text-[6px]">S</div>
                    </div>
                  </div>
                  <div className="text-[10px] font-sans text-dim truncate">{track.name}</div>
                </div>

                {/* Track Content */}
                <div className="flex-1 relative flex items-center group">
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(to_right,transparent,transparent_49px,var(--border)_50px)] opacity-20 pointer-events-none" />
                  
                  {track.items?.map((item, j) => (
                    <TrackClip key={j} item={item} color={track.color} isAudio={track.isAudio} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TrackClip({ item, color, isAudio }: { item: any, color: string, isAudio?: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{ scaleY: 1.04, borderTopColor: "var(--amber)", zIndex: 20 }}
      className={`h-[90%] border-t border-l border-r rounded-sm relative flex flex-col justify-start overflow-hidden interactive ml-2 ${color}`}
      style={{ width: item.w, marginLeft: item.ml }}
    >
      <div className="px-2 py-1 text-[10px] font-mono text-primary truncate z-10 bg-black/40">
        [Fx] {item.name}
      </div>
      {isAudio && (
        <div className="absolute inset-0 top-6 bottom-1 flex items-center">
          <Waveform />
        </div>
      )}
    </motion.div>
  );
}
