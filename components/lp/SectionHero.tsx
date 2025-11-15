"use client";

import { Button } from "@/components/ui/button";
import type { HeroContent } from "@/types/landing";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type SectionHeroProps = {
  content: HeroContent;
};

export function SectionHero({ content }: SectionHeroProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-32">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-6 text-center lg:text-left"
        >
          <h1 className="text-4xl font-bold leading-tight tracking-tighter text-text-headings dark:text-white md:text-6xl">
            {content.heading}
          </h1>
          <p className="text-lg text-text-body dark:text-gray-300">
            {content.subheading}
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <Link href={content.ctaLink}>
                <span className="truncate">{content.ctaLabel}</span>
              </Link>
            </Button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="flex items-center justify-center"
        >
          <div className="aspect-square w-full max-w-md rounded-xl bg-gray-100 dark:bg-gray-800">
            <Image
              alt="Dynamic visual representing the core product/service"
              className="h-full w-full rounded-xl object-cover"
              src={content.imageUrl}
              width={400}
              height={400}
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

