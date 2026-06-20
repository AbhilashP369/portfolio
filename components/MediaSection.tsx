"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import SoftwareIcon from "./SoftwareIcon";

/* ─────────────────────────────────────────────────────────
   PROJECT DATA — add / remove entries to update the grid.
   Videos hosted on Cloudinary CDN.
   ───────────────────────────────────────────────────────── */
interface Project {
  url: string;             // Cloudinary video URL
  title: string;           // display title
  category: string;        // Short-Form · Commercial etc.
  description: string;     // shown in modal
  software: string[];      // tools used
  year: string;
}

const projects: Project[] = [
  {
    url: "https://res.cloudinary.com/dq8z7ztfd/video/upload/v1780727352/vacmate_p1tbmb.mp4",
    title: "Vacmate Edit",
    category: "Short-Form · Social Media",
    description:
      "Punchy social media edit with fast cuts, trendy transitions, and bold typography. Built for Instagram and YouTube Shorts.",
    software: ["Premiere Pro", "CapCut", "After Effects"],
    year: "2026",
  },
  {
    url: "https://res.cloudinary.com/dq8z7ztfd/video/upload/v1781938581/messi_i9czni.mp4",
    title: "Messi Tribute Edit",
    category: "Short-Form · Sports",
    description:
      "A high-energy sports tribute edit celebrating Lionel Messi, beat-synced with impact sound effects and tracking graphics.",
    software: ["Premiere Pro", "After Effects"],
    year: "2026",
  },
  {
    url: "https://res.cloudinary.com/dq8z7ztfd/video/upload/v1781938683/ormakalmotionvideo_dga9yz.mp4",
    title: "Ormakal Motion Video",
    category: "Motion Graphics · Cinematic",
    description:
      "A nostalgic and cinematic motion video blending storytelling elements, custom typography, and rich sound design.",
    software: ["Premiere Pro", "After Effects"],
    year: "2026",
  },
  {
    url: "https://res.cloudinary.com/dq8z7ztfd/video/upload/f_mp4/v1780727043/cenimaticreel_mc98ht.mov",
    title: "Cinematic Reel",
    category: "Showreel · Cinematic",
    description:
      "A curated showreel showcasing cinematic editing chops — colour grading, smooth transitions, and storytelling through visuals.",
    software: ["Premiere Pro", "DaVinci Resolve", "After Effects"],
    year: "2026",
  },
  {
    url: "https://res.cloudinary.com/dq8z7ztfd/video/upload/v1780727007/1flash_ftp9eb.mp4",
    title: "Flash Edit",
    category: "Short-Form · Reel",
    description:
      "Quick-cut flash edit with rapid transitions, beat-synced drops, and high-impact visuals designed to stop the scroll.",
    software: ["Premiere Pro", "After Effects"],
    year: "2025",
  },
  {
    url: "https://res.cloudinary.com/dq8z7ztfd/video/upload/v1781939393/IMG_2899_hb1a1z.mp4",
    title: "Vacmate Talk",
    category: "Short-Form · Creative",
    description:
      "A creative short-form film with stylized cuts, mood-driven transitions, and dynamic color grading.",
    software: ["Premiere Pro", "After Effects"],
    year: "2026",
  },
  {
    url: "https://res.cloudinary.com/dq8z7ztfd/video/upload/v1780728201/halogrmtrip_1_nwn8j4.mp4",
    title: "Hologram Trip",
    category: "VFX · Motion Graphics",
    description:
      "A VFX-heavy visual trip blending holographic effects with real-world footage. Experimental editing with glitch art and motion design.",
    software: ["After Effects", "Premiere Pro", "Photoshop"],
    year: "2025",
  },
  {
    url: "https://res.cloudinary.com/dq8z7ztfd/video/upload/v1780727013/finaltripv_cmxxg4.mp4",
    title: "Final Trip Edit",
    category: "Cinematic · Travel",
    description:
      "A cinematic travel film capturing scenic landscapes and candid moments. Warm tones, atmospheric sound design, and smooth gimbal footage.",
    software: ["Premiere Pro", "After Effects"],
    year: "2026",
  },
  {
    url: "https://res.cloudinary.com/dq8z7ztfd/video/upload/f_mp4/v1780727327/uniyarchapainting_cirics.mov",
    title: "Uniyarcha Painting",
    category: "Art · Visual Story",
    description:
      "A visual storytelling piece documenting the creation of a traditional painting. Macro close-ups, time-lapses, and meditative pacing.",
    software: ["Premiere Pro", "DaVinci Resolve"],
    year: "2026",
  },
  {
    url: "https://res.cloudinary.com/dq8z7ztfd/video/upload/v1780727189/vinus_joz4te.mp4",
    title: "Vinus Film",
    category: "Long-Form · Cinematic",
    description:
      "A longer-form cinematic piece with narrative depth. Carefully graded footage, layered sound design, and intentional pacing.",
    software: ["Premiere Pro", "DaVinci Resolve", "After Effects"],
    year: "2026",
  },
  {
    url: "https://res.cloudinary.com/dq8z7ztfd/video/upload/v1780727838/starrynight_ddezcz.mp4",
    title: "Starry Night",
    category: "Cinematic · Visual Art",
    description:
      "A mesmerising visual piece inspired by the night sky. Time-lapses, light painting, and ethereal motion set to ambient soundscapes.",
    software: ["Premiere Pro", "After Effects", "Photoshop"],
    year: "2026",
  },
  {
    url: "https://res.cloudinary.com/dq8z7ztfd/video/upload/v1780733335/gravity0_dtpoa4.mp4",
    title: "Gravity",
    category: "Cinematic · Experimental",
    description:
      "An experimental visual study of weightlessness and motion. High-contrast grading, fluid speed-ramping, and atmospheric sound design.",
    software: ["Premiere Pro", "After Effects"],
    year: "2026",
  },
  {
    url: "https://res.cloudinary.com/dq8z7ztfd/video/upload/f_mp4/v1780727394/promotioncollege_event_cyyai1.mov",
    title: "College Event Promo",
    category: "Promotional · Event",
    description:
      "High-energy promotional video for a college cultural event. Dynamic editing, crowd shots, and event branding packaged for social media.",
    software: ["Premiere Pro", "Photoshop", "CapCut"],
    year: "2026",
  },
  {
    url: "https://res.cloudinary.com/dq8z7ztfd/video/upload/v1780727397/semm_vcjh35.mp4",
    title: "Seminar Highlight",
    category: "Short-Form · Event",
    description:
      "Tight seminar highlight reel capturing keynote moments, audience reactions, and behind-the-scenes energy.",
    software: ["Premiere Pro", "After Effects"],
    year: "2025",
  },
];

/* ─────────────────────────────────────────────────────────
   HELPERS
   ───────────────────────────────────────────────────────── */
function formatDuration(seconds: number): string {
  if (!seconds || isNaN(seconds) || !isFinite(seconds)) return "00:00:00:00";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const f = Math.floor((seconds % 1) * 24); // 24fps "frames"
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}:${String(f).padStart(2, "0")}`;
}

/** Generate a Cloudinary thumbnail URL from a video URL */
function getThumbUrl(url: string): string {
  // Insert transformation: grab frame at 2s, 600px wide, JPG format
  return url.replace(/\/upload\/(f_mp4\/)?/, "/upload/so_2,w_600,c_fill,f_jpg,q_80/");
}

/* ─────────────────────────────────────────────────────────
   MAIN SECTION
   ───────────────────────────────────────────────────────── */
export default function MediaSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <section
        className="relative w-full min-h-screen flex flex-col p-4 pb-20 gap-2 overflow-hidden"
        data-cursor-label="PLAY"
      >
        <div className="flex-1 bg-panel border border-border flex flex-col p-2">
          {/* Header Bar */}
          <div className="font-mono text-sm text-primary uppercase border-b border-border pb-1 tracking-widest mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
                <line x1="7" y1="2" x2="7" y2="22" />
                <line x1="17" y1="2" x2="17" y2="22" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <line x1="2" y1="7" x2="7" y2="7" />
                <line x1="2" y1="17" x2="7" y2="17" />
                <line x1="17" y1="17" x2="22" y2="17" />
                <line x1="17" y1="7" x2="22" y2="7" />
              </svg>
              Media Browser: Selected Works
            </div>
            <div className="flex gap-4 text-[10px] text-muted">
              <span className="interactive cursor-none hover:text-primary">Thumbnail View</span>
              <span className="interactive cursor-none hover:text-primary">List View</span>
            </div>
          </div>

          {/* Grid */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2 overflow-y-auto"
          >
            {projects.map((project, i) => (
              <MediaCard
                key={i}
                project={project}
                variants={itemVariants}
                onClick={() => setActiveProject(project)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Program Monitor Modal */}
      <AnimatePresence>
        {activeProject && (
          <ProgramMonitor
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ─────────────────────────────────────────────────────────
   MEDIA CARD — Cloudinary thumbnail + video preview on hover
   ───────────────────────────────────────────────────────── */
function MediaCard({
  project,
  variants,
  onClick,
}: {
  project: Project;
  variants: import("framer-motion").Variants;
  onClick: () => void;
}) {
  const [isHovering, setIsHovering] = useState(false);
  const [duration, setDuration] = useState<string>("--:--:--:--");
  const videoRef = useRef<HTMLVideoElement>(null);
  const thumbUrl = getThumbUrl(project.url);

  const handleMetadata = useCallback(() => {
    if (videoRef.current && videoRef.current.duration) {
      setDuration(formatDuration(videoRef.current.duration));
    }
  }, []);

  useEffect(() => {
    if (videoRef.current && videoRef.current.readyState >= 1) {
      handleMetadata();
    }
  }, [handleMetadata]);

  /* Play preview on hover, pause on leave */
  useEffect(() => {
    if (!videoRef.current) return;
    if (isHovering) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isHovering]);

  return (
    <motion.div
      variants={variants}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={onClick}
      className="flex flex-col bg-deep border border-border group interactive cursor-none relative transition-shadow duration-300 hover:shadow-[0_0_16px_rgba(232,160,69,0.25)] hover:border-amber"
    >
      <div className="aspect-video w-full relative overflow-hidden bg-deep">
        {/* Static Cloudinary thumbnail */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbUrl}
          alt={project.title}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHovering ? "opacity-0" : "opacity-100"}`}
        />

        {/* Video preview — loads & plays only on hover */}
        <video
          ref={videoRef}
          src={project.url}
          preload="metadata"
          crossOrigin="anonymous"
          muted
          playsInline
          loop
          onLoadedMetadata={handleMetadata}
          onDurationChange={handleMetadata}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHovering ? "opacity-100" : "opacity-0"}`}
        />

        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 font-mono text-[10px] text-primary z-10">
          {duration}
        </div>

        {/* Scanline pattern overlay */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent,transparent_2px,rgba(0,0,0,0.15)_2px,rgba(0,0,0,0.15)_4px)] pointer-events-none opacity-30" />

        {/* Play button overlay on hover */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isHovering ? 1 : 0,
            scale: isHovering ? 1 : 0.8,
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
        >
          <div className="w-14 h-14 border-2 border-amber flex items-center justify-center text-amber bg-black/30" style={{ borderRadius: "50%" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <polygon points="6 3 20 12 6 21 6 3" />
            </svg>
          </div>
        </motion.div>

        {/* Progress bar sweep on hover */}
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: isHovering ? "100%" : "0%" }}
          transition={{ duration: 3, ease: "linear" }}
          className="absolute bottom-0 left-0 h-[3px] bg-amber z-20"
        />
      </div>

      {/* File info bar */}
      <div className="p-2.5 border-t border-border flex items-center justify-between group-hover:bg-raised transition-colors">
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="font-mono text-xs text-primary truncate">{project.title}</span>
          <span className="font-mono text-[10px] text-muted truncate">{project.category}</span>
        </div>
        <div className="w-2 h-2 bg-border group-hover:bg-green-tc transition-colors shrink-0 ml-2" style={{ borderRadius: "50%" }} />
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   PROGRAM MONITOR — fullscreen modal with video player
   ───────────────────────────────────────────────────────── */
function ProgramMonitor({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("00:00:00:00");
  const [totalDuration, setTotalDuration] = useState("00:00:00:00");
  const [progress, setProgress] = useState(0);
  const [aspectRatio, setAspectRatio] = useState(16 / 9);
  const isPortrait = aspectRatio < 1;

  /* ESC to close */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === " ") {
        e.preventDefault();
        togglePlayback();
      }
      if (e.key === "f") handleFullscreen();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose]);

  const togglePlayback = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (!videoRef.current) return;
    setCurrentTime(formatDuration(videoRef.current.currentTime));
    setProgress(
      (videoRef.current.currentTime / videoRef.current.duration) * 100
    );
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      setTotalDuration(formatDuration(videoRef.current.duration));
      const w = videoRef.current.videoWidth;
      const h = videoRef.current.videoHeight;
      if (w && h) setAspectRatio(w / h);
    }
  }, []);

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    videoRef.current.currentTime = ratio * videoRef.current.duration;
  }, []);

  const handleFullscreen = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if ((videoRef.current as HTMLVideoElement & { webkitEnterFullscreen?: () => void }).webkitEnterFullscreen) {
      (videoRef.current as HTMLVideoElement & { webkitEnterFullscreen: () => void }).webkitEnterFullscreen();
    }
  }, []);

  return (
    <motion.div
      key="program-monitor-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[110] flex items-start justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8 overflow-y-auto cursor-none"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 30 }}
        transition={{ type: "spring", damping: 30, stiffness: 350 }}
        onClick={(e) => e.stopPropagation()}
        className={`bg-panel border border-border flex flex-col my-auto transition-all duration-300 ${
          isPortrait ? "w-full max-w-md" : "w-full max-w-5xl"
        }`}
      >
        {/* Title Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-raised border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber">
              <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
              <line x1="7" y1="2" x2="7" y2="22" />
              <line x1="17" y1="2" x2="17" y2="22" />
              <line x1="2" y1="12" x2="22" y2="12" />
            </svg>
            <span className="font-mono text-xs text-primary uppercase tracking-widest">
              Program Monitor
            </span>
            <span className="font-mono text-[10px] text-muted ml-2">
              {project.title}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {/* Fullscreen Button */}
            <button
              onClick={handleFullscreen}
              className="w-7 h-7 flex items-center justify-center text-muted hover:text-amber hover:bg-border transition-colors interactive"
              title="Fullscreen"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
              </svg>
            </button>
            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center text-muted hover:text-primary hover:bg-border transition-colors interactive"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Video Area — actual aspect ratio */}
        <div
          className="relative w-full bg-black interactive flex items-center justify-center"
          style={{ aspectRatio: String(aspectRatio) }}
          onClick={togglePlayback}
        >
          <video
            ref={videoRef}
            src={project.url}
            preload="metadata"
            crossOrigin="anonymous"
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onDurationChange={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            className="w-full h-full object-contain"
          />

          {/* Center play button when paused */}
          <AnimatePresence>
            {!isPlaying && (
              <motion.div
                key="play-overlay"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="w-16 h-16 border-2 border-amber flex items-center justify-center text-amber bg-black/40" style={{ borderRadius: "50%" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <polygon points="6 3 20 12 6 21 6 3" />
                  </svg>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Scanline overlay */}
          <div className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)] pointer-events-none opacity-20" />
        </div>

        {/* Transport Controls */}
        <div className="bg-raised border-t border-border px-4 py-2 flex flex-col gap-2 shrink-0">
          {/* Progress Bar */}
          <div
            ref={progressRef}
            className="w-full h-2 bg-deep border border-border relative interactive group"
            onClick={handleSeek}
          >
            <motion.div
              className="absolute top-0 left-0 h-full bg-amber"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-amber border border-amber opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `${progress}%`, transform: `translateX(-50%) translateY(-50%)`, borderRadius: "50%" }}
            />
          </div>

          <div className="flex items-center justify-between">
            {/* Playback Controls */}
            <div className="flex items-center gap-3">
              {/* Skip Back */}
              <button
                onClick={() => { if (videoRef.current) videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5); }}
                className="text-muted hover:text-primary transition-colors interactive"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 19 2 12 11 5 11 19" />
                  <polygon points="22 19 13 12 22 5 22 19" />
                </svg>
              </button>

              {/* Play / Pause */}
              <button
                onClick={togglePlayback}
                className="w-9 h-9 flex items-center justify-center border border-border bg-deep text-amber hover:bg-raised hover:border-amber transition-colors interactive"
              >
                {isPlaying ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <polygon points="6 3 20 12 6 21 6 3" />
                  </svg>
                )}
              </button>

              {/* Skip Forward */}
              <button
                onClick={() => { if (videoRef.current) videoRef.current.currentTime = Math.min(videoRef.current.duration, videoRef.current.currentTime + 5); }}
                className="text-muted hover:text-primary transition-colors interactive"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="13 19 22 12 13 5 13 19" />
                  <polygon points="2 19 11 12 2 5 2 19" />
                </svg>
              </button>

              {/* Fullscreen (in controls too) */}
              <button
                onClick={handleFullscreen}
                className="text-muted hover:text-amber transition-colors interactive"
                title="Fullscreen (F)"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                  <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                  <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                  <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                </svg>
              </button>
            </div>

            {/* Timecode */}
            <div className="flex items-center gap-2 font-mono text-[11px]">
              <span className="text-amber">{currentTime}</span>
              <span className="text-muted">/</span>
              <span className="text-muted">{totalDuration}</span>
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="border-t border-border px-4 py-4 bg-panel">
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-sans text-lg text-primary mb-1">{project.title}</h3>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-[10px] text-amber uppercase tracking-widest">
                  {project.category}
                </span>
                <span className="font-mono text-[10px] text-muted">{project.year}</span>
              </div>
              <p className="font-sans text-sm text-muted leading-relaxed">{project.description}</p>
            </div>

            <div className="shrink-0 md:w-48">
              <div className="font-mono text-[10px] text-muted uppercase tracking-widest mb-2">Software</div>
              <div className="flex flex-wrap gap-1.5">
                {project.software.map((sw) => (
                  <span
                    key={sw}
                    className="flex items-center gap-1.5 px-2 py-1 bg-deep border border-border font-mono text-[10px] text-primary hover:border-amber hover:text-amber transition-colors"
                  >
                    <SoftwareIcon name={sw} className="w-3.5 h-3.5" />
                    {sw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
