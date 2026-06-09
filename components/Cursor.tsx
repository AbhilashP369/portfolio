"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [label, setLabel] = useState("");
  const [mounted, setMounted] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Outer ring spring configuration (80ms lag feel)
  const springConfig = { stiffness: 150, damping: 18 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Contextual hover labels
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest('[data-cursor]');
      
      if (interactiveEl) {
        setIsHovering(true);
        const cursorLabel = interactiveEl.getAttribute('data-cursor-label');
        if (cursorLabel) {
          setLabel(cursorLabel);
        } else {
          setLabel("");
        }
      } else if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('.interactive')
      ) {
        setIsHovering(true);
        setLabel("");
      } else {
        setIsHovering(false);
        setLabel("");
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible || !mounted) return null;

  const cursorContent = (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 2147483647 }}>
      {/* Inner Dot - Instant follow */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-amber rounded-full"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Outer Ring - Spring physics */}
      <motion.div
        className="fixed top-0 left-0 border rounded-full flex items-center justify-center"
        style={{
          x: smoothMouseX,
          y: smoothMouseY,
          width: 28,
          height: 28,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: isHovering ? "white" : "var(--amber)",
        }}
        animate={{
          scale: isClicking ? 0.6 : isHovering ? 1.57 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />

      {/* Contextual Label */}
      <motion.div
        className="fixed top-0 left-0 ml-6 mt-6 font-mono text-[10px] text-amber tracking-widest whitespace-nowrap"
        style={{
          x: smoothMouseX,
          y: smoothMouseY,
        }}
        animate={{
          opacity: label ? 1 : 0,
          y: label ? 0 : 4,
        }}
      >
        {label}
      </motion.div>
    </div>
  );

  return createPortal(cursorContent, document.body);
}

