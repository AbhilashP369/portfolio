"use client";
import { motion } from "framer-motion";

export default function EducationSection() {
  const education = [
    {
      degree: "MCA",
      school: "Chinmaya Institute of Technology, Kannur",
      duration: "2023–2025"
    },
    {
      degree: "BCA",
      school: "Sree Narayanaguru College of Advance Studies, Kannur",
      duration: "2019–2022"
    }
  ];

  return (
    <section 
      className="relative w-full min-h-[50vh] flex flex-col p-4 pb-10 gap-2 justify-center items-center overflow-hidden"
      data-cursor-label="INSPECT"
    >
      <div className="w-full max-w-3xl bg-panel border border-border flex flex-col shadow-lg">
        <div className="font-mono text-sm text-primary uppercase border-b border-border p-2 bg-raised tracking-widest flex items-center justify-between">
          <span>Project Settings</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
        </div>
        
        <div className="flex flex-col md:flex-row p-4 gap-6">
          <div className="w-1/3 border-r border-border pr-4 hidden md:block">
            <ul className="text-xs font-mono text-muted flex flex-col gap-2">
              <li className="text-primary bg-raised p-1 interactive cursor-none">Education Base</li>
              <li className="p-1 interactive cursor-none hover:text-primary">Scratch Disks</li>
              <li className="p-1 interactive cursor-none hover:text-primary">Ingest Settings</li>
            </ul>
          </div>
          
          <div className="flex-1 flex flex-col gap-6">
            {education.map((edu, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col gap-2"
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border border-amber flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-amber" />
                  </div>
                  <span className="font-mono text-xs text-primary">{edu.degree}</span>
                </div>
                
                <div className="pl-5 flex flex-col gap-1">
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                    <span className="font-sans text-xs text-muted w-20">Institution:</span>
                    <div className="h-6 bg-deep border border-border px-2 flex items-center text-xs text-primary flex-1">
                      {edu.school}
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                    <span className="font-sans text-xs text-muted w-20">Timeline:</span>
                    <div className="h-6 bg-deep border border-border px-2 flex items-center text-xs font-mono text-amber w-32">
                      {edu.duration}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="border-t border-border p-2 flex justify-end gap-2 bg-deep">
          <button className="px-4 py-1 border border-border bg-raised text-primary text-xs font-mono interactive hover:bg-border transition-colors cursor-none">Cancel</button>
          <button className="px-4 py-1 border border-border bg-amber text-deep text-xs font-mono font-bold interactive hover:bg-amber-dim transition-colors cursor-none">OK</button>
        </div>
      </div>
    </section>
  );
}
