"use client";

import { fadeInUp, hoverScale, motionTransition, staggerContainer, viewportOnce } from "@/lib/motion/variants";
import type { PortfolioContent } from "@/types/landing";
import { motion } from "framer-motion";
import Image from "next/image";

type SectionPortfolioProps = {
  content: PortfolioContent;
};

export function SectionPortfolio({ content }: SectionPortfolioProps) {
  if (content.items.length === 0) {
    return null;
  }

  return (
    <section className="py-24 px-10" id="portfolio">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-center text-white text-4xl font-bold leading-tight tracking-[-0.015em] mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={motionTransition.default}
        >
          {content.heading}
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {content.items.map((item) => (
            <motion.div
              key={item.id}
              className="group relative overflow-hidden bg-ate9-gray"
              variants={fadeInUp}
              whileHover={hoverScale}
            >
              <motion.div
                className="relative w-full h-full"
                whileHover={{ y: -4 }}
                transition={motionTransition.fast}
              >
                <Image
                  alt={item.title}
                  className="w-full h-full object-cover"
                  src={item.imageUrl}
                  width={400}
                  height={300}
                />
                <div className="absolute inset-0 bg-black/50"></div>
                <motion.div
                  className="absolute bottom-0 left-0 p-6"
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={motionTransition.fast}
                >
                  <h3 className="text-white text-2xl font-bold">{item.title}</h3>
                </motion.div>
                <motion.div
                  className="absolute inset-0 border-2 border-transparent"
                  whileHover={{ borderColor: "rgb(255, 3, 3)" }}
                  transition={motionTransition.fast}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
