import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** إطار جوال مبني بالكامل بـ CSS — لا صور خارجية، لا وزن إضافي على الصفحة. */
export function PhoneFrame({
  children,
  className,
  label,
}: {
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label ?? "معاينة واجهة تطبيق وقّع"}
      className={cn(
        "relative aspect-[9/19] w-[268px] shrink-0 rounded-[2.6rem] p-[3px]",
        "bg-[linear-gradient(160deg,color-mix(in_oklab,var(--wq-gold)_45%,transparent),color-mix(in_oklab,var(--wq-ivory)_8%,transparent)_35%,transparent_70%)]",
        "shadow-[0_40px_90px_-30px_rgba(0,0,0,.85)]",
        className,
      )}
    >
      <div className="relative size-full overflow-hidden rounded-[2.45rem] border border-abyss/80 bg-abyss">
        {/* الجزيرة الديناميكية */}
        <div className="absolute start-1/2 top-2.5 z-30 h-[22px] w-[86px] -translate-x-1/2 rounded-full bg-black rtl:translate-x-1/2" />
        <StatusBar />
        {/* الإطار كله يُعلَن كصورة واحدة عبر aria-label، فمحتواه لا يُقرأ مرتين */}
        <div aria-hidden className="relative z-10 h-[calc(100%-2.25rem)] overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="relative z-20 flex h-9 items-center justify-between px-5 pt-1.5 text-[0.62rem] text-ivory/80">
      <span className="font-mono ltr-num">9:41</span>
      <span className="flex items-center gap-1" aria-hidden>
        <svg viewBox="0 0 18 12" className="h-2.5 w-4 fill-current">
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="4.5" y="6" width="3" height="6" rx="1" />
          <rect x="9" y="3" width="3" height="9" rx="1" />
          <rect x="13.5" y="0" width="3" height="12" rx="1" opacity=".45" />
        </svg>
        <svg viewBox="0 0 24 12" className="h-2.5 w-5 fill-none stroke-current">
          <rect x="0.6" y="0.6" width="19" height="10.8" rx="3" strokeWidth="1.2" opacity=".6" />
          <rect x="2.2" y="2.2" width="13" height="7.6" rx="1.6" className="fill-current stroke-none" />
          <path d="M21.4 4v4a2 2 0 0 0 0-4z" className="fill-current stroke-none" opacity=".6" />
        </svg>
      </span>
    </div>
  );
}
