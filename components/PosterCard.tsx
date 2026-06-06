"use client";
import { CreativeWorkItem } from "../data/creativeWork";

export default function PosterCard({ 
  item, 
  onView 
}: { 
  item: CreativeWorkItem & { type: "poster" },
  onView: () => void
}) {
  const isGradient = item.image.startsWith("linear-gradient") || item.image.startsWith("radial-gradient");

  return (
    <div className="w-full flex flex-col bg-panel border border-border group overflow-hidden cursor-pointer" onClick={onView}>
      {/* Media Container */}
      <div className="relative w-full aspect-[3/4] md:aspect-[4/3] overflow-hidden bg-black">
        {/* Tag Pill */}
        <div className="absolute top-4 left-4 z-30 pointer-events-none">
          <div className="bg-primary text-void px-2 py-1 font-mono text-[9px] uppercase tracking-widest">
            POSTER DESIGN
          </div>
        </div>

        {/* Poster Image */}
        {isGradient ? (
          <div className="w-full h-full flex items-center justify-center font-serif text-ivory/50 text-xl md:text-3xl text-center px-4" style={{ background: item.image }}>
            {item.title}
          </div>
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-20">
          <div className="bg-white text-black px-4 py-2 rounded-full font-mono text-xs tracking-widest flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            VIEW 
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
          </div>
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="p-4 flex flex-col gap-1 border-t border-border">
        <h3 className="font-serif text-[1.1rem] text-primary">{item.title}</h3>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] text-amber uppercase tracking-widest">{item.category}</span>
          <span className="text-muted text-[10px]">•</span>
          <span className="font-mono text-[9px] text-muted tracking-widest">{item.year}</span>
        </div>
      </div>
    </div>
  );
}
