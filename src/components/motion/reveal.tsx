"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * مراقب واحد مشترك لكل عناصر الصفحة بدل مراقب لكل عنصر.
 * يُنشأ عند أول استخدام فقط، ويتوقّف عن مراقبة العنصر بمجرد ظهوره.
 */
let sharedObserver: IntersectionObserver | null = null;

function getObserver() {
  sharedObserver ??= new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    },
    { rootMargin: "-80px" },
  );
  return sharedObserver;
}

type RevealProps = {
  children: ReactNode;
  /** تأخير بالثواني لبناء تتابع بصري داخل القسم */
  delay?: number;
  className?: string;
  as?: "div" | "li";
};

/**
 * ظهور تدريجي عند الوصول للعنصر — **بلا مكتبة حركة**.
 *
 * الحركة نفسها CSS خالص (`.reveal` في globals.css)، وJS لا يفعل شيئًا
 * سوى إضافة صنف واحد. استبدال `motion` بهذا خفّض حجم الجافاسكربت
 * وأزال ترطيب عشرات المكوّنات التفاعلية التي كانت تؤخّر أول رسم.
 *
 * حالتان تُعالَجان عند التركيب:
 * 1) العنصر ظاهر أصلًا أو تجاوزته الشاشة (قفزة عبر رابط داخلي أو تمرير سريع)
 *    → يظهر فورًا، فلا يبقى محتوى مخفيًا للأبد.
 * 2) غير ذلك → يُسلَّم للمراقب المشترك.
 *
 * ومع تعطيل JS، يُلغي `<noscript>` في التخطيط إخفاء العناصر بالكامل.
 */
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // العنصر المرسوم يتغيّر حسب `as`، لكن نوع الـ ref يُثبَّت على div ليتّحد النوعان.
  const Tag = as as "div";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.classList.add("is-visible");
      return;
    }

    const observer = getObserver();
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn("reveal", className)}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}
