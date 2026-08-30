import { cn } from "@/lib/utils";

type LogoProps = {
  /** 01 الأساسية (نص فاتح) · 03 نسخة التمييز (الاسم العربي ذهبي) */
  variant?: "primary" | "accent";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: { ar: "text-lg", en: "text-[0.5rem]", rule: "w-8" },
  md: { ar: "text-2xl", en: "text-[0.6rem]", rule: "w-[50px]" },
  lg: { ar: "text-4xl", en: "text-[0.7rem]", rule: "w-[50px]" },
} as const;

/**
 * شعار وقّع — ثلاثة عناصر تعمل كوحدة واحدة (دليل الهوية، الفصل 02):
 * الاسم العربي + خط فاصل ذهبي 1px بطول ثابت + الاسم اللاتيني بتباعد 7px.
 */
export function Logo({ variant = "primary", size = "md", className }: LogoProps) {
  const s = sizes[size];

  return (
    <span className={cn("inline-flex flex-col items-center leading-none", className)}>
      <span
        className={cn(
          "font-bold tracking-tight",
          s.ar,
          variant === "accent" ? "text-gold" : "text-ivory",
        )}
      >
        وقّع
      </span>
      <span aria-hidden className={cn("my-1 h-px bg-gold", s.rule)} />
      <span
        className={cn("font-mono font-medium text-gold", s.en)}
        style={{ letterSpacing: "0.44em", paddingInlineStart: "0.44em" }}
      >
        WAQQIE
      </span>
    </span>
  );
}
