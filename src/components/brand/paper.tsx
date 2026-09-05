import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * ورقة مستند حقيقية فوق أرضية الحبر.
 *
 * دليل الهوية يمنع الأبيض الخالص ويأمر باستخدام Warm Ivory، ويعتمد نسخة شعار
 * معكوسة «خلفية فاتحة، نص داكن، للمستندات المطبوعة والورق الرسمي» — فالورق
 * هنا استعمال منصوص عليه لا خروج عن اللوحة.
 *
 * الورقة الخلفية المائلة تعطي إحساس الرزمة، والشريط الذهبي أعلاها هو نفسه
 * «الشريط الذهبي» الذي ينصّ الدليل على وضعه أسفل أي ترويسة رسمية.
 */
export function PaperSheet({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden
        className="absolute inset-x-3 -bottom-2 top-2 -rotate-[0.9deg] rounded-[3px] bg-[color-mix(in_oklab,var(--wq-ivory)_74%,var(--wq-ink))] shadow-[0_26px_60px_-28px_rgba(0,0,0,.75)]"
      />
      <div className="relative overflow-hidden rounded-[3px] bg-ivory shadow-[0_44px_100px_-40px_rgba(0,0,0,.8)]">
        <span aria-hidden className="block h-[3px] w-full bg-gold" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 top-[3px]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, color-mix(in oklab, var(--wq-ink) 6%, transparent) 0 1px, transparent 1px 38px)",
          }}
        />
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}

/**
 * ختم دائري مطبوع بالذهبي. عنصر زخرفي بحت (`aria-hidden`) لأن الذهبي فوق
 * الورق يعطي 2.18:1 ولا يصلح لأي نص يُقرأ.
 */
export function Seal({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={cn("pointer-events-none select-none", className)}
    >
      <g fill="none" stroke="var(--wq-gold)" strokeWidth="1.4" opacity="0.55">
        <circle cx="60" cy="60" r="52" />
        <circle cx="60" cy="60" r="45" strokeDasharray="2 5" />
      </g>
      <text
        x="60"
        y="57"
        textAnchor="middle"
        fill="var(--wq-gold)"
        opacity="0.62"
        style={{ font: "700 26px var(--font-plex-arabic), sans-serif" }}
      >
        وقّع
      </text>
      <text
        x="60"
        y="76"
        textAnchor="middle"
        fill="var(--wq-gold)"
        opacity="0.5"
        style={{
          font: "500 8px var(--font-jetbrains), monospace",
          letterSpacing: "3px",
        }}
      >
        SIGNED
      </text>
    </svg>
  );
}
