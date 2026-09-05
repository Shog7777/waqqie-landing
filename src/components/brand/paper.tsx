import type { ReactNode } from "react";

import { site } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * ورقة مستند فوق أرضية الحبر، مصفوفة كصفحة في دليل مطبوع: شريط ذهبي أعلاها،
 * ترويسة جارية تحمل الشعار ورقم الصفحة، ثم المتن، ثم تذييل بخط فاصل.
 *
 * هذا التصميم مأخوذ حرفيًا من دليل الهوية نفسه، فهو مستند A4 صفحاته مبنية
 * بـ `.p-head` و`.p-foot` على هذا النحو. والدليل يمنع الأبيض الخالص ويأمر
 * باستخدام Warm Ivory، ويعتمد نسخة شعار معكوسة «للمستندات المطبوعة والورق
 * الرسمي»، فالورق استعمال منصوص عليه لا خروج عن اللوحة.
 *
 * التباين فوق الورق: الحبر 8.96:1 للمتن، وCard Teal 10.9:1 للأرقام، والذهبي
 * 2.18:1 فلا يحمل أي نص يُقرأ — يقتصر على الشريط والختم والخطوط.
 */
export function PaperSheet({
  children,
  page,
  chapter,
  className,
  stacked = true,
}: {
  children: ReactNode;
  /** رقم الصفحة كما يظهر في التذييل */
  page?: string;
  /** تسمية الفصل في الترويسة الجارية */
  chapter?: string;
  className?: string;
  /** ورقة ثانية مائلة خلفها تعطي إحساس الرزمة */
  stacked?: boolean;
}) {
  return (
    <div className={cn("relative", className)}>
      {stacked ? (
        <div
          aria-hidden
          className="absolute inset-x-4 -bottom-2.5 top-3 -rotate-[0.7deg] rounded-[3px] bg-[color-mix(in_oklab,var(--wq-ivory)_72%,var(--wq-ink))] shadow-[0_24px_56px_-26px_rgba(0,0,0,.7)]"
        />
      ) : null}

      <div className="relative overflow-hidden rounded-[3px] bg-ivory shadow-[0_48px_110px_-44px_rgba(0,0,0,.85)]">
        <span aria-hidden className="block h-[3px] w-full bg-gold" />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 top-[3px]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, color-mix(in oklab, var(--wq-ink) 5%, transparent) 0 1px, transparent 1px 40px)",
          }}
        />

        <div className="relative px-6 pb-10 pt-7 sm:px-12 sm:pb-12 sm:pt-9">
          {chapter ? (
            <div className="mb-9 flex items-end justify-between border-b border-ink/15 pb-4">
              <div className="flex flex-col leading-none">
                <span className="text-lg font-bold text-ink">{site.name}</span>
                <span
                  className="mt-1.5 font-mono text-[0.52rem] text-ink/70"
                  style={{ letterSpacing: "0.4em" }}
                >
                  {site.latin}
                </span>
              </div>
              <span
                className="font-mono text-[0.6rem] uppercase text-ink/70"
                style={{ letterSpacing: "0.2em" }}
              >
                {chapter}
              </span>
            </div>
          ) : null}

          {children}

          {page ? (
            <div className="mt-10 flex items-center justify-between border-t border-ink/12 pt-3">
              <span className="font-mono text-[0.55rem] text-ink/55">
                {site.name} | {site.latin}
              </span>
              <span className="font-mono text-[0.6rem] text-ink/70 ltr-num">{page}</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/**
 * ختم دائري مطبوع. زخرفي بحت (`aria-hidden`) لأن الذهبي فوق الورق
 * يعطي 2.18:1 ولا يصلح لنص يُقرأ.
 */
export function Seal({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={cn("pointer-events-none select-none", className)}
    >
      <g fill="none" stroke="var(--wq-gold)" strokeWidth="1.3" opacity="0.5">
        <circle cx="60" cy="60" r="53" />
        <circle cx="60" cy="60" r="46" strokeDasharray="2 5" />
      </g>
      <text
        x="60"
        y="57"
        textAnchor="middle"
        fill="var(--wq-gold)"
        opacity="0.6"
        style={{ font: "700 26px var(--font-plex-arabic), sans-serif" }}
      >
        وقّع
      </text>
      <text
        x="60"
        y="77"
        textAnchor="middle"
        fill="var(--wq-gold)"
        opacity="0.48"
        style={{ font: "500 8px var(--font-jetbrains), monospace", letterSpacing: "3px" }}
      >
        SIGNED
      </text>
    </svg>
  );
}

/** خطوط متن وهمية داخل الأوراق التوضيحية. */
export function PaperLines({
  widths = [100, 92, 78, 96, 64],
  className,
}: {
  widths?: number[];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2.5", className)} aria-hidden>
      {widths.map((w, i) => (
        <span
          key={i}
          className="h-[3px] rounded-full bg-ink/12"
          style={{ width: `${w}%` }}
        />
      ))}
    </div>
  );
}
