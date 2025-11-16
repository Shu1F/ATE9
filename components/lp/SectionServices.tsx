"use client";

import { hoverScaleSubtle, motionTransition, scaleIn, staggerContainer, viewportOnce } from "@/lib/motion/variants";
import type { ServicesContent } from "@/types/landing";
import { motion } from "framer-motion";

type SectionServicesProps = {
  content: ServicesContent;
};

export function SectionServices({ content }: SectionServicesProps) {
  return (
    <section className="py-24 px-10" id="services">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-center text-white text-4xl font-bold leading-tight tracking-[-0.015em] mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={motionTransition.default}
        >
          Our Services
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {content.items.map((item) => (
            <motion.div
              key={item.id}
              className="bg-[#1a1a1a] border border-ate9-gray p-8 flex flex-col gap-3 relative overflow-hidden group"
              variants={scaleIn}
              whileHover={hoverScaleSubtle}
            >
              {/* ホバー時の背景エフェクト */}
              <motion.div
                className="absolute inset-0 bg-ate9-red-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
              
              <h3 className="text-white text-xl font-bold relative z-10">
                {item.title}
              </h3>
              
              {/* 下線アニメーション */}
              <motion.div
                className="w-10 h-0.5 bg-ate9-red relative z-10"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={viewportOnce}
                transition={{ delay: 0.2, ...motionTransition.fast }}
              />
              
              <p className="text-white/70 text-sm font-normal relative z-10">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
