"use client";

import type { PortfolioContent } from "@/types/landing";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type SectionPortfolioProps = {
  content: PortfolioContent;
};

export function SectionPortfolio({ content }: SectionPortfolioProps) {
  if (content.items.length === 0) {
    return null;
  }

  return (
    <section
      className="bg-background-light dark:bg-background-dark"
      id="portfolio"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <h2 className="text-3xl font-bold leading-tight tracking-tighter text-text-headings dark:text-white md:text-4xl">
            {content.heading}
          </h2>
          <p className="max-w-2xl text-lg text-text-body dark:text-gray-300">
            {content.subheading}
          </p>
        </motion.div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {content.items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group flex flex-col gap-4"
            >
              <div className="overflow-hidden rounded-xl">
                <Image
                  className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  src={item.imageUrl}
                  alt={item.title}
                  width={600}
                  height={400}
                />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-bold text-text-headings dark:text-white">
                  {item.title}
                </h3>
                <p className="text-text-body dark:text-gray-300">
                  {item.description}
                </p>
                {item.linkUrl && (
                  <Link
                    href={item.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center text-sm font-medium text-primary hover:underline"
                  >
                    View site
                    <span className="material-symbols-outlined ml-1 text-base">
                      open_in_new
                    </span>
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

