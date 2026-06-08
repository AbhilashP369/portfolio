"use client";
import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

export default function StatCounter({
  end,
  suffix = "",
  label,
  duration = 1.5,
}: {
  end: number;
  suffix?: string;
  label: string;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = (now - startTime) / (duration * 1000);
      const progress = Math.min(elapsed, 1);
      // easeOut curve
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * end);
      setCount(current);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, end, duration]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center p-4 border border-[#222] bg-[#111]"
    >
      <span className="font-syne text-[22px] text-[#FF4D00] leading-none">
        {count}{suffix}
      </span>
      <span className="font-syne text-[8px] text-[#555] uppercase tracking-[0.15em] mt-1">
        {label}
      </span>
    </div>
  );
}
