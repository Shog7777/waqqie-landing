"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

type RevealProps = {
  children: ReactNode;
  /** تأخير بالثواني لبناء تتابع بصري داخل القسم */
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
};

/**
 * ظهور تدريجي عند الوصول للعنصر.
 *
 * ملاحظتان مهمتان:
 * 1) يُلغى الأثر بالكامل إذا فعّل المستخدم "تقليل الحركة" في نظامه.
 * 2) IntersectionObserver قد "يفوته" عنصرٌ مرّ بين إطارين عند التمرير السريع
 *    أو القفز عبر رابط داخلي، فيبقى مخفيًا للأبد. لذلك نضيف حارسًا يُظهر
 *    أي عنصر تجاوزته الشاشة بالفعل بدل ترك المحتوى غير مرئي.
 */
export function Reveal({ children, delay = 0, y = 20, className, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [skipped, setSkipped] = useState(false);
  const shown = inView || skipped;

  useEffect(() => {
    if (shown) return;
    const check = () => {
      const el = ref.current;
      if (el && el.getBoundingClientRect().bottom < 0) setSkipped(true);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [shown]);

  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  // العنصر يتغيّر حسب `as`، لكن أنواع الـ ref في motion تتحد فقط عند تثبيت نوع واحد.
  const Tag = motion[as] as typeof motion.div;

  return (
    <Tag
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.6, delay: skipped && !inView ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
