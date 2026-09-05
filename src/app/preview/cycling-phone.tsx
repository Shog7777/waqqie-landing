"use client";

import { useEffect, useState } from "react";

import { PhoneFrame } from "@/components/brand/phone-frame";
import { SignScreen, StampScreen, SuccessScreen } from "@/components/brand/screens";
import { screens as screenCopy } from "@/lib/content";
import { cn } from "@/lib/utils";

const flow = [
  { Screen: SignScreen, caption: screenCopy[2].title },
  { Screen: StampScreen, caption: screenCopy[3].title },
  { Screen: SuccessScreen, caption: screenCopy[4].title },
];

/**
 * الجهاز الأوسط يمشي في رحلة المنتج تلقائيًا: توقيع، ثم ختم، ثم نجاح.
 * يتوقّف عند تفعيل «تقليل الحركة» ويبقى على الشاشة الأولى.
 */
export function CyclingPhone({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => setIndex((v) => (v + 1) % flow.length), 3400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={cn("flex flex-col items-center gap-5", className)}>
      <div className="relative">
        <PhoneFrame label="رحلة التوقيع في تطبيق وقّع" className="w-[232px] sm:w-[258px]">
          <div className="relative size-full">
            {flow.map(({ Screen }, i) => (
              <div
                key={i}
                aria-hidden={i !== index}
                className={cn(
                  "absolute inset-0 transition-opacity duration-700",
                  i === index ? "opacity-100" : "opacity-0",
                )}
              >
                <Screen />
              </div>
            ))}
          </div>
        </PhoneFrame>
      </div>

      <div className="flex items-center gap-2">
        {flow.map((f, i) => (
          <span
            key={f.caption}
            aria-hidden
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              i === index ? "w-7 bg-gold" : "w-1.5 bg-ivory/25",
            )}
          />
        ))}
      </div>
      <p className="text-sm text-ivory/70">{flow[index].caption}</p>
    </div>
  );
}
