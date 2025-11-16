"use client";

import { Button } from "@/components/ui/button";
import { motionTransition } from "@/lib/motion/variants";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

export function SiteHeader() {
  const { scrollY } = useScroll();
  
  // y のアニメーションを削除し、opacity + scale のみに変更
  // position: fixed と transform の競合を避けるため、y は使用しない
  const headerOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const headerScale = useTransform(scrollY, [0, 100], [0.97, 1]);

  const handleSmoothScroll = (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>,
    targetId: string
  ) => {
    event.preventDefault();
    const element = document.querySelector(targetId);
    if (element instanceof HTMLElement) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between whitespace-nowrap bg-transparent px-10 py-4"
      style={{
        opacity: headerOpacity,
        scale: headerScale,
      }}
      // initial と animate は削除し、useTransform のみで制御
      transition={{
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1], // easeOut
      }}
    >
      <motion.div
        className="flex items-center gap-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, ...motionTransition.fast }}
      >
        <div className="size-5 text-ate9-red">
          <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6 6H42L36 24L42 42H6L12 24L6 6Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em]">
          ATE9
        </h2>
      </motion.div>
      <nav className="flex flex-1 items-center justify-end gap-8">
        {["Hero", "About", "Mission", "Services", "Portfolio"].map((label, index) => {
          const href = `#${label.toLowerCase()}`;
          return (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.15 + index * 0.05,
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1], // easeOut
              }}
            >
              <Link
                href={href}
                onClick={(event) => handleSmoothScroll(event, href)}
                className="relative text-white text-sm font-medium leading-normal transition-colors hover:text-ate9-red"
              >
                {label}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-ate9-red"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{
                    duration: 0.3,
                    ease: [0.25, 0.1, 0.25, 1], // easeOut
                  }}
                />
              </Link>
            </motion.div>
          );
        })}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.4,
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1], // easeOut
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-9 px-4 bg-ate9-red text-white text-sm font-bold leading-normal tracking-[0.015em] transition-colors hover:bg-ate9-red-dark"
            onClick={(event) => handleSmoothScroll(event, "#contact")}
          >
            <span className="truncate">Contact</span>
          </Button>
        </motion.div>
      </nav>
    </motion.header>
  );
}
