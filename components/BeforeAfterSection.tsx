"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import BeforeAfterSlider from "./BeforeAfterSlider";

const beforeAfterProjects = [
  {
    id: 1,
    beforeImage: "/images/before1.JPG",
    afterImage: "/images/after1.png",
    editType: "Skin Retouching",
    caption: "Portrait enhancement for client shoot"
  },
  {
    id: 2,
    beforeImage: "/images/before2.jpeg",
    afterImage: "/images/after2.jpg",
    editType: "Color Grading",
    caption: "Cinematic grade for brand campaign"
  },
  {
    id: 3,
    beforeImage: "/images/before3.jpg",
    afterImage: "/images/after3.PNG",
    editType: "Background Removal",
    caption: "Product photo cleanup for e-commerce"
  }
];

export default function BeforeAfterSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="relative w-full p-4 flex flex-col gap-6 pt-12 pb-20" id="photo-editing">
      {/* Section Header */}
      <div className="flex flex-col gap-2">
        <span className="font-mono text-xs text-amber tracking-widest uppercase">
          004 / PHOTO EDITING
        </span>
        <h2 className="text-5xl md:text-7xl font-bebas text-primary uppercase tracking-wider">
          Before & After
        </h2>
      </div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {beforeAfterProjects.map((project) => (
          <motion.div key={project.id} variants={itemVariants} className="flex flex-col gap-3 group">
            <BeforeAfterSlider 
              beforeImage={project.beforeImage} 
              afterImage={project.afterImage} 
            />
            <div className="flex flex-col gap-1 px-1">
              <span className="font-mono text-[10px] text-amber uppercase tracking-widest">
                {project.editType}
              </span>
              <p className="font-sans text-xs text-muted uppercase tracking-widest">
                {project.caption}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
