"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [toast, setToast] = useState<{ show: boolean, message: string }>({ show: false, message: "" });
  const [downloadState, setDownloadState] = useState<"idle" | "downloading" | "downloaded">("idle");

  const showToast = (message: string) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 2500);
  };

  const handleQueueClick = () => {
    const text = `Abhilash P | Video Editor\n369abhilash@gmail.com\n+91 9946664218\nabhilash369.vercel.app`;
    navigator.clipboard.writeText(text);
    showToast("Contact details copied ✓");
  };

  const handleEmailCopy = () => {
    navigator.clipboard.writeText("369abhilash@gmail.com");
    showToast("Email copied ✓");
  };

  const handlePhoneCopy = () => {
    navigator.clipboard.writeText("+91 9946664218");
    showToast("Phone number copied ✓");
  };

  const handleDownload = () => {
    if (downloadState !== "idle") return;
    setDownloadState("downloading");
    
    // Simulate progress
    const startTime = Date.now();
    const duration = 1500;
    
    const animateProgress = () => {
      const elapsed = Date.now() - startTime;
      
      if (elapsed < duration) {
        requestAnimationFrame(animateProgress);
      } else {
        setDownloadState("downloaded");
        
        // Trigger download
        const a = document.createElement("a");
        a.href = "/abhilash-resume.pdf";
        a.download = "abhilash-resume.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        setTimeout(() => setDownloadState("idle"), 1000);
      }
    };
    
    requestAnimationFrame(animateProgress);
  };

  const flickerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: [0, 0.4, 1, 0.7, 1],
      transition: { duration: 0.4 }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const, staggerChildren: 0.04 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -8 },
    visible: { opacity: 1, x: 0 }
  };

  // SVG Icons
  const CopyIcon = <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>;
  const PinIcon = <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="#FF4D00" stroke="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>;
  const InstagramIcon = <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;
  const LinkedInIcon = <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>;
  const BehanceIcon = (
    <div className="flex items-center justify-center w-[14px] h-[14px] border-[1.5px] border-current rounded-[3px] font-bold text-[9px] leading-none pt-[1px]">
      Bē
    </div>
  );

  return (
    <section 
      className="relative w-full min-h-screen flex items-center justify-center p-4 pb-20 overflow-hidden"
      data-cursor-label="EXPORT"
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 bg-[#1a1a1a] border border-[#FF4D00] px-4 py-2 z-50 flex items-center shadow-[0_0_15px_rgba(255,77,0,0.2)]"
          >
            <span className="font-syne text-[11px] text-[#fffff0]">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="w-full max-w-2xl bg-[#0E0E0E] border border-[#222] shadow-2xl flex flex-col relative"
      >
        {/* Panel Header */}
        <motion.div 
          variants={flickerVariants}
          className="h-8 bg-[#111] border-b border-[#222] flex items-center justify-between px-4 font-syne text-[10px] text-[#888] uppercase tracking-wider"
        >
          <span>Export Settings</span>
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4D00] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF4D00]" />
          </span>
        </motion.div>
        
        <div className="flex flex-col md:flex-row p-4 gap-6">
          {/* Left Column - Fields */}
          <div className="flex-1 flex flex-col gap-3">
            
            <motion.div variants={itemVariants} className="flex flex-col gap-1">
              <span className="text-[8px] font-syne text-[#555] uppercase tracking-wide">Format:</span>
              <div className="h-8 border border-[#2a2a2a] bg-[#1a1a1a] px-[10px] flex items-center text-[10px] font-syne text-[#ccc] hover:border-[#FF4D00] transition-colors rounded-none show-cursor">
                H.264
              </div>
              <div className="flex items-center gap-2 mt-1 px-[10px]">
                <span className="text-[8px] font-syne text-[#555] uppercase tracking-wide">PRESET:</span>
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  <motion.span 
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inline-flex h-full w-full rounded-full bg-[#28C840] opacity-50" 
                  />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#28C840]" />
                </span>
                <span className="font-syne text-[10px] text-[#28C840]">Available for Hire</span>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex flex-col gap-1 group">
              <span className="text-[8px] font-syne text-[#555] uppercase tracking-wide">Output Name:</span>
              <a 
                href="https://abhilash369.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-8 border border-[#2a2a2a] bg-[#1a1a1a] px-[10px] flex items-center text-[10px] font-syne text-[#ccc] group-hover:border-[#FF4D00] group-hover:text-[#FF4D00] group-hover:underline transition-colors rounded-none show-cursor"
              >
                abhilash369.vercel.app
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-1 group">
              <span className="text-[8px] font-syne text-[#555] uppercase tracking-wide">Email:</span>
              <div 
                onClick={handleEmailCopy}
                className="h-8 border border-[#2a2a2a] bg-[#1a1a1a] px-[10px] flex items-center justify-between text-[10px] font-syne text-[#ccc] hover:border-[#FF4D00] transition-colors rounded-none show-cursor"
              >
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=369abhilash@gmail.com" target="_blank" rel="noopener noreferrer" className="w-full">369abhilash@gmail.com</a>
                <span className="text-[#555] group-hover:text-[#FF4D00] transition-colors">{CopyIcon}</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-1 group">
              <span className="text-[8px] font-syne text-[#555] uppercase tracking-wide">Phone:</span>
              <div 
                onClick={handlePhoneCopy}
                className="h-8 border border-[#2a2a2a] bg-[#1a1a1a] px-[10px] flex items-center justify-between text-[10px] font-syne text-[#ccc] hover:border-[#FF4D00] transition-colors rounded-none show-cursor"
              >
                <a href="tel:+919946664218" className="w-full">+91 9946664218</a>
                <span className="text-[#555] group-hover:text-[#FF4D00] transition-colors">{CopyIcon}</span>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex flex-col gap-1 group">
              <span className="text-[8px] font-syne text-[#555] uppercase tracking-wide">Instagram:</span>
              <a 
                href="https://www.instagram.com/_abhilazh__/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="h-8 border border-[#2a2a2a] bg-[#1a1a1a] px-[10px] flex items-center gap-2 text-[10px] font-syne text-[#ccc] hover:border-[#FF4D00] hover:text-[#FF4D00] transition-colors rounded-none show-cursor"
              >
                {InstagramIcon}
                @_abhilazh__
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-1 group">
              <span className="text-[8px] font-syne text-[#555] uppercase tracking-wide">LinkedIn:</span>
              <a 
                href="https://www.linkedin.com/in/abhilash-p-39b40a353/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="h-8 border border-[#2a2a2a] bg-[#1a1a1a] px-[10px] flex items-center gap-2 text-[10px] font-syne text-[#ccc] hover:border-[#FF4D00] hover:text-[#FF4D00] transition-colors rounded-none show-cursor"
              >
                {LinkedInIcon}
                in/abhilash-p-39b40a353
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-1 group">
              <span className="text-[8px] font-syne text-[#555] uppercase tracking-wide">Behance:</span>
              <a 
                href="https://www.behance.net/abhilash369" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="h-8 border border-[#2a2a2a] bg-[#1a1a1a] px-[10px] flex items-center gap-2 text-[10px] font-syne text-[#ccc] hover:border-[#FF4D00] hover:text-[#FF4D00] transition-colors rounded-none show-cursor"
              >
                {BehanceIcon}
                behance.net/abhilash369
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-1">
              <span className="text-[8px] font-syne text-[#555] uppercase tracking-wide">Location:</span>
              <div className="h-8 border border-[#2a2a2a] bg-[#1a1a1a] px-[10px] flex items-center gap-2 text-[10px] font-syne text-[#ccc] hover:border-[#FF4D00] transition-colors rounded-none show-cursor">
                {PinIcon}
                Kannur, Kerala, India
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-1">
              <span className="text-[8px] font-syne text-[#555] uppercase tracking-wide">Role:</span>
              <div className="h-8 border border-[#2a2a2a] bg-[#1a1a1a] px-[10px] flex items-center text-[10px] font-syne text-[#ccc] hover:border-[#FF4D00] transition-colors rounded-none show-cursor">
                Video Editor · Motion Designer
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-1">
              <span className="text-[8px] font-syne text-[#555] uppercase tracking-wide">Duration:</span>
              <div className="h-8 border border-[#2a2a2a] bg-[#1a1a1a] px-[10px] flex items-center text-[10px] font-syne text-[#ccc] hover:border-[#FF4D00] transition-colors rounded-none show-cursor">
                00:00:00:00 (Freelancer)
              </div>
            </motion.div>

          </div>
          
          {/* Right Column - Photo & Buttons */}
          <div className="w-full md:w-56 flex flex-col gap-3 shrink-0">
            
            {/* Program Monitor Photo Box */}
            <motion.div 
              variants={itemVariants} 
              className="w-full bg-[#0a0a0a] border border-[#222] flex flex-col"
            >
              <motion.div 
                variants={flickerVariants}
                className="h-5 bg-[#111] border-b border-[#222] flex items-center justify-between px-2"
              >
                <span className="font-syne text-[8px] text-[#555]">Program: ABHILASH_CAM</span>
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4D00] opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FF4D00]" />
                </span>
              </motion.div>

              <div className="relative w-full bg-[#111] overflow-hidden flex items-center justify-center" style={{ aspectRatio: "4/5" }}>
                <Image
                  src="/images/abhilash-photo.png"
                  alt="Abhilash P"
                  fill
                  className="object-cover object-[center_top] z-0"
                />
                
                {/* Overlays */}
                <div 
                  className="absolute inset-0 z-10 pointer-events-none opacity-40 mix-blend-overlay"
                  style={{
                    backgroundImage: `repeating-linear-gradient(transparent 0px, transparent 3px, rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px)`
                  }}
                />
                <div 
                  className="absolute inset-0 z-10 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)`
                  }}
                />
                
                {/* Corner Brackets */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-[1.5px] border-l-[1.5px] border-[#FF4D00] z-20 pointer-events-none opacity-80" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-[1.5px] border-r-[1.5px] border-[#FF4D00] z-20 pointer-events-none opacity-80" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-[1.5px] border-l-[1.5px] border-[#FF4D00] z-20 pointer-events-none opacity-80" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-[1.5px] border-r-[1.5px] border-[#FF4D00] z-20 pointer-events-none opacity-80" />
              </div>

              <div className="h-5 bg-[#111] border-t border-[#222] flex items-center justify-center px-2">
                <span className="font-syne text-[8px] text-[#555]">00:00:00:00 ▶ 1920×1080</span>
              </div>
            </motion.div>
            
            {/* Buttons */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { delay: 0.5, duration: 0.4 } 
                }
              }} 
              className="mt-auto flex flex-col gap-2"
            >
              <button 
                onClick={handleQueueClick}
                className="h-8 bg-[#111] border border-[#2a2a2a] font-syne text-[10px] text-[#ccc] hover:bg-[#1a1a1a] hover:border-[#555] transition-colors show-cursor"
              >
                Add to Queue
              </button>

              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=369abhilash@gmail.com&su=Freelance%20Video%20Editing%20Inquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 bg-[#111] border border-[#2a2a2a] font-syne text-[10px] text-[#ccc] hover:bg-[#1a1a1a] hover:border-[#FF4D00] hover:text-[#FF4D00] transition-colors show-cursor flex items-center justify-center"
              >
                Send Email
              </a>
              
              <motion.button 
                onClick={handleDownload}
                whileInView={{ boxShadow: ["0 0 0px rgba(255,77,0,0)", "0 0 20px rgba(255,77,0,0.3)", "0 0 0px rgba(255,77,0,0)"] }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.8, duration: 1 }}
                className="relative h-8 bg-[#FF4D00] text-[#0E0E0E] font-syne text-[10px] font-bold hover:bg-[#ff5d15] transition-colors overflow-hidden flex items-center justify-center show-cursor"
              >
                <AnimatePresence mode="wait">
                  {downloadState === "idle" && (
                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      Download Resume.pdf
                    </motion.span>
                  )}
                  {downloadState === "downloading" && (
                    <motion.div key="downloading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <svg className="animate-spin h-3 w-3 text-[#0E0E0E]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Downloading...
                    </motion.div>
                  )}
                  {downloadState === "downloaded" && (
                    <motion.span key="downloaded" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[#28C840] drop-shadow-md">
                      ✓ Downloaded!
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Progress Bar */}
                {downloadState === "downloading" && (
                  <div className="absolute bottom-0 left-0 h-[2px] bg-[#0E0E0E] w-full origin-left opacity-30">
                    <motion.div 
                      className="h-full bg-white"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, ease: "linear" }}
                    />
                  </div>
                )}
              </motion.button>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </section>
  );
}
