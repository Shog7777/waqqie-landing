"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** شريط تقدّم ذهبي رفيع — نفس العنصر المستخدم في دليل الهوية الرسمي. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[100] h-[2px] origin-[100%_50%] bg-gold"
    />
  );
}
