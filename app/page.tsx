"use client";
import TopMenuBar from "@/components/TopMenuBar";
import BottomStatusBar from "@/components/BottomStatusBar";
import SectionDots from "@/components/SectionDots";
import HeroSection from "@/components/HeroSection";

import MediaSection from "@/components/MediaSection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import ArtGallery from "@/components/ArtGallery";
import SkillsSection from "@/components/SkillsSection";
import ToolsSection from "@/components/ToolsSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-deep pt-8 pb-8 flex flex-col">
      <TopMenuBar />
      <SectionDots />
      
      <div className="flex-1 w-full max-w-[1920px] mx-auto flex flex-col">
        <HeroSection />
        
        <div className="w-full h-px bg-border my-4 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-deep px-2 text-[10px] font-mono text-muted">
            --- CUT ---
          </div>
        </div>
        
        <div className="w-full h-px bg-border my-4 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-deep px-2 text-[10px] font-mono text-muted">
            --- CUT ---
          </div>
        </div>
        
        <MediaSection />
        
        <div className="w-full h-px bg-border my-4 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-deep px-2 text-[10px] font-mono text-muted">
            --- CUT ---
          </div>
        </div>

        <BeforeAfterSection />
        
        <div className="w-full h-px bg-border my-4 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-deep px-2 text-[10px] font-mono text-muted">
            --- CUT ---
          </div>
        </div>

        <ArtGallery />
        
        <div className="w-full h-px bg-border my-4 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-deep px-2 text-[10px] font-mono text-muted">
            --- CUT ---
          </div>
        </div>
        
        <SkillsSection />
        
        <div className="w-full h-px bg-border my-4 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-deep px-2 text-[10px] font-mono text-muted">
            --- CUT ---
          </div>
        </div>
        
        <ToolsSection />
        
        <div className="w-full h-px bg-border my-4 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-deep px-2 text-[10px] font-mono text-muted">
            --- CUT ---
          </div>
        </div>
        
        <ExperienceSection />
        
        <div className="w-full h-px bg-border my-4 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-deep px-2 text-[10px] font-mono text-muted">
            --- CUT ---
          </div>
        </div>
        
        <EducationSection />
        
        <div className="w-full h-px bg-border my-4 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-deep px-2 text-[10px] font-mono text-muted">
            --- CUT ---
          </div>
        </div>
        
        <ContactSection />
      </div>
      
      <BottomStatusBar />
    </main>
  );
}
