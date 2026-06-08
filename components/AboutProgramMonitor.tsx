"use client";
import Image from "next/image";

export default function AboutProgramMonitor() {
  return (
    <div className="flex flex-col border border-[#2a2a2a] bg-[#111]">
      {/* Monitor header */}
      <div className="h-7 bg-[#0d0d0d] border-b border-[#222] flex items-center justify-between px-3">
        <span className="font-syne text-[9px] text-[#555] tracking-wide">
          Program: ABHILASH_CAM
        </span>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF3B3B] opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FF3B3B]" />
          </span>
          <span className="font-syne text-[9px] text-[#FF3B3B]">REC</span>
        </div>
      </div>

      {/* Photo area */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/5" }}>
        <Image
          src="/images/abhilash-photo.png"
          alt="Abhilash P"
          width={600}
          height={750}
          className="w-full h-full object-cover object-top"
        />

        {/* Scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "repeating-linear-gradient(transparent 0px, transparent 3px, rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px)",
          }}
        />

        {/* Vignette overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
          }}
        />

        {/* Corner brackets */}
        {/* Top Left */}
        <div className="absolute top-3 left-3 w-4 h-4 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-[1.5px] bg-[#FF4D00]" />
          <div className="absolute top-0 left-0 h-full w-[1.5px] bg-[#FF4D00]" />
        </div>
        {/* Top Right */}
        <div className="absolute top-3 right-3 w-4 h-4 pointer-events-none">
          <div className="absolute top-0 right-0 w-full h-[1.5px] bg-[#FF4D00]" />
          <div className="absolute top-0 right-0 h-full w-[1.5px] bg-[#FF4D00]" />
        </div>
        {/* Bottom Left */}
        <div className="absolute bottom-3 left-3 w-4 h-4 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#FF4D00]" />
          <div className="absolute bottom-0 left-0 h-full w-[1.5px] bg-[#FF4D00]" />
        </div>
        {/* Bottom Right */}
        <div className="absolute bottom-3 right-3 w-4 h-4 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-full h-[1.5px] bg-[#FF4D00]" />
          <div className="absolute bottom-0 right-0 h-full w-[1.5px] bg-[#FF4D00]" />
        </div>

        {/* Bottom gradient fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
          style={{
            background: "linear-gradient(transparent 0%, #0d0d0d 100%)",
          }}
        />
      </div>

      {/* Monitor footer */}
      <div className="h-9 bg-[#0d0d0d] border-t border-[#222] flex items-center justify-between px-3">
        <span className="font-syne text-[9px] text-[#555]">00:00:00:00</span>

        {/* Animated playhead */}
        <div className="w-[35%] h-[3px] bg-[#2a2a2a] relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 bg-[#FF4D00] animate-playhead" />
        </div>

        <span className="font-syne text-[9px] text-[#555]">1920×1080</span>
      </div>

      {/* Name plate */}
      <div className="pt-3.5 px-3 pb-3">
        <div className="font-syne text-[12px] text-[var(--text-primary)] tracking-[0.3em] uppercase">
          ABHILASH P
        </div>
        <div className="font-syne text-[9px] text-[#FF4D00] tracking-wide mt-0.5">
          Video Editor &amp; Motion Designer
        </div>
      </div>
    </div>
  );
}
