import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * سطح مضاء بدل البطاقة ذات الحد. الحدّ الرفيع حول البطاقات هو أكثر ما يجعل
 * الصفحة تبدو قالبية، فالعمق هنا يأتي من الظل ومن خط ضوء رفيع على الحافة
 * العليا، كأن ضوء المشهد يلامسها.
 */
export function Surface({
  children,
  className,
  glow = false,
}: {
  children: ReactNode;
  className?: string;
  /** هالة ذهبية داخلية للسطح المميّز */
  glow?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-card/85 shadow-[0_28px_70px_-34px_rgba(0,0,0,.85)]",
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute inset-x-8 top-0 h-px bg-[linear-gradient(to_left,transparent,color-mix(in_oklab,var(--wq-ivory)_22%,transparent),transparent)]"
      />
      {glow ? (
        <span
          aria-hidden
          className="pointer-events-none absolute -top-24 start-1/2 size-56 -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in oklab, var(--wq-gold) 20%, transparent), transparent 70%)",
          }}
        />
      ) : null}
      <div className="relative">{children}</div>
    </div>
  );
}

/**
 * إضاءة القسم: كتلة ضوء ذهبية تتنفّس وتنزاح ببطء، وتعتيم متدرّج عند الأطراف.
 * هي نفسها لغة الإضاءة في المشهد الافتتاحي، مطبّقة على الصفحة كلها.
 */
export function SectionLight({
  position = "top",
  className,
}: {
  position?: "top" | "start" | "end";
  className?: string;
}) {
  const place =
    position === "start"
      ? "-top-1/3 start-[-12%]"
      : position === "end"
        ? "-top-1/4 end-[-12%]"
        : "-top-1/3 start-1/2 -translate-x-1/2";

  // الغلاف يقصّ الضوء بنفسه، فلا يعتمد على أن يكون القسم الأب `overflow-hidden`.
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className={cn(
          "fx-drift absolute size-[40rem] rounded-full opacity-70",
          place,
          className,
        )}
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--wq-gold) 22%, transparent), transparent 72%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(125% 95% at 50% 45%, transparent 32%, color-mix(in oklab, #000 55%, transparent) 100%)",
        }}
      />
    </div>
  );
}
