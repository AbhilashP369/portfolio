"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";

/**
 * INTRO VIDEO SOURCE
 * Cloudinary video URL with subtitles
 */
const DEFAULT_VIDEO_URL =
  "https://res.cloudinary.com/dq8z7ztfd/video/upload/v1795552908/withsub_mnazn8.mp4";
const DEFAULT_POSTER_URL =
  "https://res.cloudinary.com/dq8z7ztfd/video/upload/so_2,w_1280,c_fill,f_jpg,q_80/v1795552908/withsub_mnazn8.jpg";

function formatTimecode(seconds: number): string {
  if (!seconds || isNaN(seconds) || !isFinite(seconds)) return "00:00:00:00";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const f = Math.floor((seconds % 1) * 24); // 24fps frames
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}:${String(f).padStart(2, "0")}`;
}

export default function IntroVideoSection({
  videoUrl = DEFAULT_VIDEO_URL,
  posterUrl = DEFAULT_POSTER_URL,
}: {
  videoUrl?: string;
  posterUrl?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showGuides, setShowGuides] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCenterIcon, setShowCenterIcon] = useState(true);
  const [showFsControls, setShowFsControls] = useState(true);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hideFsTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isInteractingRef = useRef(false);

  // Show cursor + fullscreen controls on mouse activity; hide after idle
  const handleFsMouseActivity = useCallback(() => {
    if (!isFullscreen) return;
    setShowFsControls(true);
    if (hideFsTimerRef.current) clearTimeout(hideFsTimerRef.current);
    if (isPlaying) {
      hideFsTimerRef.current = setTimeout(() => {
        setShowFsControls(false);
      }, 2500);
    }
  }, [isFullscreen, isPlaying]);

  // When paused in fullscreen always show controls
  useEffect(() => {
    if (!isFullscreen) return;
    if (!isPlaying) {
      setShowFsControls(true);
      if (hideFsTimerRef.current) clearTimeout(hideFsTimerRef.current);
    } else {
      hideFsTimerRef.current = setTimeout(() => setShowFsControls(false), 2500);
    }
    return () => {
      if (hideFsTimerRef.current) clearTimeout(hideFsTimerRef.current);
    };
  }, [isPlaying, isFullscreen]);

  // Reset controls visibility when entering/leaving fullscreen
  useEffect(() => {
    setShowFsControls(true);
    if (hideFsTimerRef.current) clearTimeout(hideFsTimerRef.current);
  }, [isFullscreen]);

  // Play / Pause toggle
  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.muted = isMuted;
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
          }
        });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isMuted]);

  // Handle cursor moving over the video canvas: reveal pause icon then fade
  const handleCanvasMouseMove = () => {
    setShowCenterIcon(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    if (isPlaying) {
      hideTimerRef.current = setTimeout(() => {
        setShowCenterIcon(false);
      }, 1800);
    }
    handleFsMouseActivity();
  };

  const handleCanvasMouseLeave = () => {
    if (isPlaying) {
      setShowCenterIcon(false);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      hideTimerRef.current = setTimeout(() => {
        setShowCenterIcon(false);
      }, 1200);
    } else {
      setShowCenterIcon(true);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    }
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [isPlaying]);

  // Time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // Loaded metadata
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 0);
    }
  };

  // Timeline scrub
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    videoRef.current.currentTime = pos * (duration || 0);
    setCurrentTime(videoRef.current.currentTime);
  };

  // Step frames (1 frame at 24fps ~ 0.0416s)
  const stepFrame = useCallback((frames: number) => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    setIsPlaying(false);
    videoRef.current.currentTime = Math.max(
      0,
      Math.min(duration, videoRef.current.currentTime + frames * (1 / 24))
    );
  }, [duration]);

  // Toggle Mute
  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted && volume === 0) {
      setVolume(0.7);
      videoRef.current.volume = 0.7;
    }
  }, [isMuted, volume]);

  // Adjust Volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      if (val === 0) {
        videoRef.current.muted = true;
        setIsMuted(true);
      } else if (isMuted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };

  // Toggle Fullscreen — handles desktop (div fullscreen) and iOS Safari (video webkitEnterFullscreen)
  const toggleFullscreen = useCallback(() => {
    // Type helpers
    type DocFs = {
      fullscreenElement?: Element;
      webkitFullscreenElement?: Element;
      exitFullscreen?: () => Promise<void>;
      webkitExitFullscreen?: () => void;
    };
    type ElemFs = {
      requestFullscreen?: () => Promise<void>;
      webkitRequestFullscreen?: () => void;
      focus?: () => void;
    };
    type VideoIOS = HTMLVideoElement & {
      webkitEnterFullscreen?: () => void;
      webkitExitFullscreen?: () => void;
      webkitDisplayingFullscreen?: boolean;
    };

    const doc = document as unknown as DocFs;
    const isFs = !!(doc.fullscreenElement || doc.webkitFullscreenElement);

    if (!isFs) {
      // Try div-level fullscreen (desktop + Android Chrome)
      const container = playerContainerRef.current as unknown as ElemFs | null;
      if (container?.requestFullscreen) {
        container.requestFullscreen().then(() => container.focus?.()).catch(() => {});
        return;
      }
      if (container?.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
        container.focus?.();
        return;
      }
      // iOS Safari fallback: fullscreen the <video> element directly
      const vid = videoRef.current as VideoIOS | null;
      if (vid?.webkitEnterFullscreen) {
        // Must be playing or paused — iOS requires a user gesture
        vid.webkitEnterFullscreen();
        setIsFullscreen(true);
        return;
      }
    } else {
      if (doc.exitFullscreen) {
        doc.exitFullscreen().catch(() => {});
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
      }
    }
  }, []);

  // Fullscreen change listeners (desktop + Android + iOS video events)
  useEffect(() => {
    const handleFsChange = () => {
      const isFs = !!(
        document.fullscreenElement ||
        (document as unknown as { webkitFullscreenElement?: Element }).webkitFullscreenElement ||
        (document as unknown as { mozFullScreenElement?: Element }).mozFullScreenElement ||
        (document as unknown as { msFullscreenElement?: Element }).msFullscreenElement
      );
      setIsFullscreen(isFs);
      setShowCenterIcon(true);
      if (isFs && playerContainerRef.current) {
        playerContainerRef.current.focus();
      }
    };

    // iOS: listen on the <video> element for webkit fullscreen events
    const handleIosBeginFs = () => {
      setIsFullscreen(true);
      setShowCenterIcon(true);
    };
    const handleIosEndFs = () => {
      setIsFullscreen(false);
      setShowCenterIcon(true);
    };

    document.addEventListener("fullscreenchange", handleFsChange);
    document.addEventListener("webkitfullscreenchange", handleFsChange);
    document.addEventListener("mozfullscreenchange", handleFsChange);
    document.addEventListener("MSFullscreenChange", handleFsChange);

    const vid = videoRef.current;
    if (vid) {
      vid.addEventListener("webkitbeginfullscreen", handleIosBeginFs);
      vid.addEventListener("webkitendfullscreen", handleIosEndFs);
    }

    return () => {
      document.removeEventListener("fullscreenchange", handleFsChange);
      document.removeEventListener("webkitfullscreenchange", handleFsChange);
      document.removeEventListener("mozfullscreenchange", handleFsChange);
      document.removeEventListener("MSFullscreenChange", handleFsChange);
      if (vid) {
        vid.removeEventListener("webkitbeginfullscreen", handleIosBeginFs);
        vid.removeEventListener("webkitendfullscreen", handleIosEndFs);
      }
    };
  }, []);

  // Global & Fullscreen Keyboard Controls (Space = Play/Pause, F = Fullscreen, M = Mute, Arrow Keys = Scrub)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName?.toLowerCase();
      if (activeTag === "input" || activeTag === "textarea") return;

      const isFs = !!(
        document.fullscreenElement ||
        (document as unknown as { webkitFullscreenElement?: Element }).webkitFullscreenElement ||
        isFullscreen
      );

      if (isFs || isInteractingRef.current) {
        if (e.code === "Space" || e.key === " " || e.key === "k" || e.key === "K") {
          e.preventDefault();
          togglePlay();
        } else if (e.key === "f" || e.key === "F") {
          e.preventDefault();
          toggleFullscreen();
        } else if (e.key === "m" || e.key === "M") {
          e.preventDefault();
          toggleMute();
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          stepFrame(-5);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          stepFrame(5);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, togglePlay, toggleFullscreen, toggleMute, stepFrame]);

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <section
      ref={sectionRef}
      id="intro-video"
      className="relative w-full py-16 px-4 flex flex-col gap-6"
      data-cursor-label="WATCH"
    >
      {/* Section label & heading */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="font-mono text-xs text-amber tracking-widest uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
            001 / INTRO SHOWREEL
          </span>

          <div className="font-mono text-[10px] text-muted flex items-center gap-3">
            <span className="text-amber">FORMAT: 4K UHD</span>
            <span>·</span>
            <span>24.000 FPS</span>
            <span>·</span>
            <span className="text-primary">REC.709</span>
          </div>
        </div>

        <h2 className="text-5xl md:text-7xl font-bebas text-primary uppercase tracking-wider">
          Source Monitor: Intro Video
        </h2>
        <p className="font-syne text-[10px] text-[var(--text-muted)] tracking-[0.2em] uppercase">
          Director&apos;s Cut · Visual Rhythm · Sound Design · Motion
        </p>
      </div>

      {/* Main Premiere Pro Source Monitor Window */}
      <motion.div
        ref={playerContainerRef}
        tabIndex={0}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onMouseMove={() => {
          isInteractingRef.current = true;
          handleFsMouseActivity();
        }}
        onTouchStart={() => {
          isInteractingRef.current = true;
          handleFsMouseActivity();
        }}
        onMouseEnter={() => {
          isInteractingRef.current = true;
        }}
        onMouseLeave={() => {
          isInteractingRef.current = false;
        }}
        style={{
          cursor: isFullscreen && isPlaying && !showFsControls ? "none" : "default",
        }}
        className={`w-full bg-[#0E0E0E] flex flex-col shadow-[0_12px_45px_rgba(0,0,0,0.85)] outline-none ${
          isFullscreen
            ? "h-screen w-screen justify-between border-0 p-0 overflow-hidden"
            : "border border-[#2a2a2a] overflow-hidden"
        }`}
      >
        {/* Floating Exit-Fullscreen button — top-right, only in fullscreen */}
        {isFullscreen && (
          <motion.button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleFullscreen();
            }}
            animate={{ opacity: showFsControls ? 1 : 0, y: showFsControls ? 0 : -12 }}
            transition={{ duration: 0.25 }}
            aria-label="Exit fullscreen"
            title="Exit Fullscreen (F / Esc)"
            className="absolute top-4 right-4 z-50 flex items-center gap-2 bg-black/70 backdrop-blur-md border border-[#444] hover:border-amber hover:text-amber text-[#aaa] px-3 py-2 rounded-lg transition-colors shadow-xl cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
            </svg>
            <span className="font-mono text-[11px] tracking-wider">EXIT</span>
          </motion.button>
        )}

        {/* Panel header bar — macOS window controls */}
        <div className="h-8 shrink-0 bg-[#111] border-b border-[#2a2a2a] flex items-center justify-between px-4 select-none">
          {/* macOS dots */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
            </div>
            <span className="font-syne text-[10px] text-[#666] tracking-wide ml-2 hidden sm:inline">
              Source: INTRO_SHOWREEL_WITHSUB.mp4
            </span>
          </div>

          {/* Timecode Header & REC badge */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isPlaying ? "bg-[#FF3B3B] animate-pulse" : "bg-[#555]"}`} />
              <span className="font-mono text-[10px] text-[#FF3B3B] font-bold tracking-widest">
                {isPlaying ? "LIVE PLAYBACK" : "STANDBY"}
              </span>
            </div>

            <div className="font-mono text-[11px] text-amber font-extrabold tracking-widest bg-black/60 border border-[#2a2a2a] px-2.5 py-0.5 rounded">
              {formatTimecode(currentTime)}
            </div>
          </div>
        </div>

        {/* Video Canvas & Audio Meter Container */}
        <div
          className={`flex flex-col lg:flex-row w-full bg-black ${
            isFullscreen ? "flex-1 min-h-0 overflow-hidden" : ""
          }`}
        >
          {/* Video Screen Area */}
          <div
            className={`relative flex-1 bg-black flex items-center justify-center overflow-hidden ${
              isFullscreen ? "h-full w-full" : "aspect-video"
            }`}
            onClick={togglePlay}
            onMouseMove={handleCanvasMouseMove}
            onMouseLeave={handleCanvasMouseLeave}
            onTouchEnd={(e) => {
              e.preventDefault();
              togglePlay();
            }}
          >
            <video
              ref={videoRef}
              src={videoUrl}
              poster={posterUrl}
              playsInline
              // @ts-expect-error webkit-playsinline is non-standard iOS attr
              webkitPlaysInline="true"
              muted={isMuted}
              preload="metadata"
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
              className="w-full h-full object-contain cursor-pointer pointer-events-auto"
            />

            {/* Safe Area Guides Overlay */}
            {showGuides && (
              <div className="absolute inset-0 pointer-events-none select-none">
                {/* Action Safe (90%) */}
                <div className="absolute inset-[5%] border border-dashed border-amber/20" />
                {/* Title Safe (80%) */}
                <div className="absolute inset-[10%] border border-dotted border-amber/15" />
                {/* Center Crosshair */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 pointer-events-none opacity-40">
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-amber" />
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-amber" />
                </div>
                {/* Corner Frame Marks */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-amber/50" />
                <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-amber/50" />
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-amber/50" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-amber/50" />
              </div>
            )}

            {/* Scanline CRT overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                background:
                  "repeating-linear-gradient(transparent 0px, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)",
              }}
            />

            {/* Large Center Play / Pause Floating Overlay */}
            <motion.div
              initial={false}
              animate={{
                opacity: !isPlaying ? 1 : showCenterIcon ? 1 : 0,
                scale: isPlaying ? (showCenterIcon ? 1 : 0.85) : 1,
              }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                aria-label={isPlaying ? "Pause video" : "Play video"}
                className="pointer-events-auto cursor-pointer w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/60 backdrop-blur-md border border-amber/50 flex items-center justify-center shadow-[0_0_30px_rgba(232,160,69,0.3)] transition-transform hover:scale-110 active:scale-95"
              >
                {isPlaying ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#E8A045">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="#E8A045" className="translate-x-0.5">
                    <polygon points="6 3 20 12 6 21 6 3" />
                  </svg>
                )}
              </button>
            </motion.div>
          </div>

          {/* Side Audio VU Meters (Premiere Pro style) */}
          <div className="hidden lg:flex w-24 shrink-0 bg-[#0B0B0B] border-l border-[#222] p-3 flex-col justify-between select-none">
            <span className="font-mono text-[9px] text-[#555] text-center tracking-wider">
              AUDIO CH
            </span>

            <div className="flex justify-center gap-2 h-44 my-auto">
              {/* Left Channel */}
              <div className="w-3 bg-[#111] border border-[#222] relative flex items-end overflow-hidden">
                <motion.div
                  className="w-full bg-gradient-to-t from-green-500 via-amber to-red-500 origin-bottom"
                  animate={{
                    height: isPlaying
                      ? ["45%", "85%", "60%", "92%", "30%", "78%", "52%"]
                      : "8%",
                  }}
                  transition={{
                    duration: 0.7,
                    repeat: isPlaying ? Infinity : 0,
                    repeatType: "mirror",
                    ease: "linear",
                  }}
                />
              </div>

              {/* Right Channel */}
              <div className="w-3 bg-[#111] border border-[#222] relative flex items-end overflow-hidden">
                <motion.div
                  className="w-full bg-gradient-to-t from-green-500 via-amber to-red-500 origin-bottom"
                  animate={{
                    height: isPlaying
                      ? ["40%", "80%", "65%", "88%", "25%", "82%", "48%"]
                      : "8%",
                  }}
                  transition={{
                    duration: 0.65,
                    repeat: isPlaying ? Infinity : 0,
                    repeatType: "mirror",
                    ease: "linear",
                    delay: 0.08,
                  }}
                />
              </div>
            </div>

            <div className="flex justify-center gap-2 font-mono text-[8px] text-[#555]">
              <span className="w-3 text-center">L</span>
              <span className="w-3 text-center">R</span>
            </div>
          </div>
        </div>

        {/* Timeline Scrubber Bar */}
        <motion.div
          animate={isFullscreen ? { opacity: showFsControls ? 1 : 0 } : { opacity: 1 }}
          transition={{ duration: 0.3 }}
          ref={progressRef}
          onClick={handleSeek}
          className="relative w-full h-3 shrink-0 bg-[#141414] border-y border-[#222] cursor-pointer group/seek flex items-center overflow-hidden select-none"
        >
          {/* Ruler tick notches */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              background:
                "repeating-linear-gradient(to right, #FFF 0px, #FFF 1px, transparent 1px, transparent 20px)",
            }}
          />

          {/* Filled Progress Bar */}
          <div
            className="h-full bg-gradient-to-r from-amber to-[#FF4D00] relative"
            style={{ width: `${progressPercent}%` }}
          >
            {/* Playhead marker */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_8px_rgba(232,160,69,0.9)] translate-x-1/2" />
          </div>
        </motion.div>

        {/* Transport Controls & Deck Footer */}
        <motion.div
          animate={isFullscreen ? { opacity: showFsControls ? 1 : 0, y: showFsControls ? 0 : 10 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="h-12 shrink-0 bg-[#101010] px-4 flex items-center justify-between gap-2 select-none"
        >
          {/* Left: Step frame, Play/Pause, Timecode */}
          <div className="flex items-center gap-2">
            {/* Step Back 1 Frame */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                stepFrame(-1);
              }}
              title="Step Back 1 Frame"
              className="w-8 h-8 rounded bg-[#181818] border border-[#2a2a2a] flex items-center justify-center text-[#888] hover:text-white hover:border-amber transition-colors shrink-0"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 19 2 12 11 5 11 19" />
                <line x1="18" y1="5" x2="18" y2="19" />
              </svg>
            </button>

            {/* Play / Pause Primary Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              title={isPlaying ? "Pause (Space)" : "Play (Space)"}
              aria-label={isPlaying ? "Pause video" : "Play video"}
              className="w-10 h-8 rounded bg-amber text-black font-bold flex items-center justify-center hover:bg-[#ffb050] transition-colors shadow-[0_0_12px_rgba(232,160,69,0.35)] shrink-0 cursor-pointer"
            >
              {isPlaying ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="translate-x-0.5">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </button>

            {/* Step Forward 1 Frame */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                stepFrame(1);
              }}
              title="Step Forward 1 Frame"
              className="w-8 h-8 rounded bg-[#181818] border border-[#2a2a2a] flex items-center justify-center text-[#888] hover:text-white hover:border-amber transition-colors shrink-0"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="13 5 22 12 13 19 13 5" />
                <line x1="6" y1="5" x2="6" y2="19" />
              </svg>
            </button>

            {/* Timecode: Current / Total */}
            <div className="font-mono text-[10px] sm:text-[11px] text-[#888] ml-2 hidden sm:flex items-center gap-1.5 bg-[#141414] border border-[#262626] px-2.5 py-1 rounded shrink-0">
              <span className="text-primary font-bold">{formatTimecode(currentTime)}</span>
              <span className="text-[#444]">/</span>
              <span className="text-[#666]">{formatTimecode(duration)}</span>
            </div>
          </div>

          {/* Right: Audio Volume Slider, Safe Guides, Fullscreen */}
          <div className="flex items-center gap-2">
            {/* Interactive Volume Group */}
            <div className="flex items-center gap-2 bg-[#181818] border border-[#2a2a2a] px-2.5 py-1 rounded transition-colors hover:border-amber/40 shrink-0">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMute();
                }}
                title={isMuted || volume === 0 ? "Unmute Audio (M)" : "Mute Audio (M)"}
                className="text-[#888] hover:text-amber transition-colors flex items-center shrink-0 cursor-pointer"
              >
                {isMuted || volume === 0 ? (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="1" y1="1" x2="23" y2="23" />
                    <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
                    <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                    <line x1="8" y1="23" x2="16" y2="23" />
                  </svg>
                ) : volume < 0.5 ? (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                ) : (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                )}
              </button>

              {/* Volume Slider Bar */}
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                aria-label="Volume Slider"
                className="w-16 sm:w-20 h-1 bg-[#2a2a2a] rounded-lg appearance-none cursor-pointer accent-[#E8A045]"
                title={`Volume: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
              />

              <span className="font-mono text-[9px] text-[#777] w-6 text-right select-none hidden sm:inline">
                {Math.round((isMuted ? 0 : volume) * 100)}%
              </span>
            </div>

            {/* Toggle Guides */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowGuides(!showGuides);
              }}
              title="Toggle Safe Margins Grid"
              className={`w-8 h-8 rounded border flex items-center justify-center transition-colors shrink-0 cursor-pointer ${
                showGuides
                  ? "bg-amber/15 border-amber/50 text-amber"
                  : "bg-[#181818] border-[#2a2a2a] text-[#777] hover:text-white"
              }`}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <rect x="7" y="7" width="10" height="10" />
              </svg>
            </button>

            {/* Fullscreen */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleFullscreen();
              }}
              title="Toggle Fullscreen (F)"
              className="w-8 h-8 rounded bg-[#181818] border border-[#2a2a2a] flex items-center justify-center text-[#888] hover:text-white hover:border-amber transition-colors shrink-0 cursor-pointer"
            >
              {isFullscreen ? (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                </svg>
              ) : (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              )}
            </button>
          </div>
        </motion.div>

        {/* Section footer bar */}
        <motion.div
          animate={isFullscreen ? { opacity: showFsControls ? 1 : 0 } : { opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="h-7 shrink-0 bg-[#111] border-t border-[#2a2a2a] flex items-center justify-between px-4 select-none"
        >
          <span className="font-syne text-[9px] text-[#444] hidden sm:block">
            Clip: INTRO_SEQUENCE_PREVIEW
          </span>
          <span className="font-syne text-[9px] text-[#444]">
            Cloudinary Ready · Drop URL Anytime
          </span>
          <span className="font-syne text-[9px] text-[#28C840] flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#28C840] opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#28C840]" />
            </span>
            Ready for Playback
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
