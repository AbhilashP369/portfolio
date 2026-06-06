"use client";
import SoftwareIcon from "./SoftwareIcon";

export type ArtItem = { id: number; title: string; category: string; description: string; image: string; medium: string; year: string; orientation?: string };

export default function ArtCard({ item, onClick }: { item: ArtItem, onClick: () => void }) {
  const isGradient = item.image.startsWith("linear-gradient");
  
  // Set dimensions based on orientation flag, or let it default
  const isPortrait = item.orientation === "portrait";

  return (
    <div 
      className={`relative group cursor-pointer overflow-hidden border-[0.5px] border-[var(--border)] hover:border-[var(--ember)] transition-colors duration-500 bg-[#0a0a0a] ${
        isPortrait ? 'w-[300px] h-[420px]' : 'w-[420px] h-[300px]'
      } max-w-[85vw] mx-auto`}
      onClick={onClick}
    >
      {/* Inner Mat Border Effect */}
      <div className="absolute inset-1 border-4 border-[#F2EDE6]/5 z-10 pointer-events-none mix-blend-screen" />

      {/* Image Layer */}
      <div className="absolute inset-0 w-full h-full">
        {isGradient ? (
          <div className="w-full h-full flex items-center justify-center text-[var(--ivory)] font-serif italic text-center p-4 transition-transform duration-700 group-hover:scale-105" style={{ background: item.image }}>
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
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 flex flex-col justify-end p-6 z-20">
        
        <div className="flex flex-col gap-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-100">
          <h3 className="font-bebas text-2xl text-[var(--ivory)] leading-none tracking-wide">{item.title}</h3>
          
          <div className="flex items-center gap-2 mt-1">
            <span className="font-mono text-[10px] text-[var(--ember)] uppercase tracking-widest flex items-center gap-1">
              <SoftwareIcon name={item.medium} className="w-3 h-3" />
              {item.medium}
            </span>
            <span className="text-[var(--muted)] text-[8px]">•</span>
            <span className="font-mono text-[10px] text-[var(--muted)] uppercase tracking-widest">{item.year}</span>
          </div>
        </div>

        {/* View Full Button */}
        <div className="mt-6 self-start transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">
          <span className="inline-block font-mono text-[10px] text-[var(--ivory)] uppercase tracking-widest border-[0.5px] border-[var(--ember)] px-4 py-2 hover:bg-[var(--ember)] hover:text-[var(--void)] transition-colors duration-300">
            VIEW FULL ↗
          </span>
        </div>
      </div>
    </div>
  );
}
