"use client";

import { useEffect, useRef } from "react";

/**
 * شريط تقدّم ذهبي رفيع — نفس العنصر المستخدم في دليل الهوية الرسمي.
 * يكتب على `transform` مباشرة داخل `requestAnimationFrame` بدل تحريك حالة React،
 * فلا إعادة رسم لشجرة المكوّنات عند كل بكسل تمرير.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      el.style.transform = `scaleX(${progress})`;
    };

    const onScroll = () => {
      frame ||= requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-x-0 top-0 z-[100] h-[2px] origin-[100%_50%] scale-x-0 bg-gold"
    />
  );
}
