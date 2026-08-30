import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * ظهور تدريجي **بـ CSS خالص** — لمحتوى ما فوق الطية.
 *
 * لماذا لا نستخدم `Reveal`؟ لأنه يبدأ من `opacity: 0` وينتظر تحميل JS
 * وترطيب React قبل أن يُظهر العنصر، وهذا يؤخّر مقياس LCP تأخيرًا كبيرًا
 * (قِيس 5.2s قبل هذا التغيير). حركة CSS تبدأ مع أول رسم للصفحة،
 * فيُحتسب العنصر مرسومًا فورًا. تُلغى الحركة تلقائيًا مع prefers-reduced-motion.
 */
export function Rise({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={cn("rise", className)} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
}
