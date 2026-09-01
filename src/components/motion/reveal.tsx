"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* مراقب مشترك واحد لكل عناصر الصفحة بدل مراقب لكل عنصر                 */
/* ------------------------------------------------------------------ */

/**
 * العناصر التي لم تظهر بعد. نحتفظ بها لأن `IntersectionObserver` وحده
 * لا يكفي: عند التمرير السريع قد يقفز العنصر من أسفل الشاشة إلى أعلاها
 * بين إطارين، فلا يتقاطع مع الشاشة في أي لقطة ولا يُطلق المراقب أي حدث —
 * ويبقى العنصر مخفيًا للأبد. الحارس أدناه يعالج هذه الحالة.
 */
const pending = new Set<Element>();

let observer: IntersectionObserver | null = null;
let guardAttached = false;
let timer: ReturnType<typeof setTimeout> | undefined;

function show(el: Element) {
  el.classList.add("is-visible");
  pending.delete(el);
  observer?.unobserve(el);
  if (pending.size === 0) detachGuard();
}

/**
 * يُظهر أي عنصر تجاوزته الشاشة فعلًا دون أن يلتقطه المراقب.
 *
 * يعمل **بعد توقّف التمرير** لا أثناءه: `getBoundingClientRect` تُجبر
 * المتصفح على إعادة حساب التخطيط، وتنفيذها لعشرات العناصر في كل إطار
 * تمرير يخنق الخيط الرئيسي (قِيس ارتفاع TBT من 110ms إلى 600ms قبل هذا).
 * التأجيل غير مرئي للمستخدم لأن العناصر المقصودة خرجت من الشاشة أصلًا.
 */
function sweep() {
  timer = undefined;
  for (const el of [...pending]) {
    if (el.getBoundingClientRect().bottom < 0) show(el);
  }
}

function onScroll() {
  if (timer) clearTimeout(timer);
  timer = setTimeout(sweep, 150);
}

function attachGuard() {
  if (guardAttached) return;
  guardAttached = true;
  window.addEventListener("scroll", onScroll, { passive: true });
}

function detachGuard() {
  if (!guardAttached) return;
  guardAttached = false;
  window.removeEventListener("scroll", onScroll);
  if (timer) {
    clearTimeout(timer);
    timer = undefined;
  }
}

function getObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) show(entry.target);
      }
    },
    { rootMargin: "-80px" },
  );
  return observer;
}

/* ------------------------------------------------------------------ */

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
 * ومع تعطيل JS، يُلغي `<noscript>` في التخطيط إخفاء العناصر بالكامل.
 */
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // العنصر المرسوم يتغيّر حسب `as`، لكن نوع الـ ref يُثبَّت على div ليتّحد النوعان.
  const Tag = as as "div";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // ظاهر أصلًا عند التركيب (أو تجاوزته الشاشة) → يظهر فورًا.
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.classList.add("is-visible");
      return;
    }

    pending.add(el);
    getObserver().observe(el);
    attachGuard();

    return () => {
      pending.delete(el);
      observer?.unobserve(el);
      if (pending.size === 0) detachGuard();
    };
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
