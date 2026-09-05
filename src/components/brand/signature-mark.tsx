import { cn } from "@/lib/utils";

/**
 * توقيع يُرسم أمام المستخدم — مسار متجهي واحد بحركة stroke-dashoffset.
 * يُستخدم بدل صورة PNG: أخف، أدق عند التكبير، ويحترم prefers-reduced-motion.
 */
export function SignatureMark({
  className,
  color = "var(--wq-ink)",
  animate = true,
  drawOnReveal = false,
  strokeWidth = 3,
}: {
  className?: string;
  color?: string;
  animate?: boolean;
  /** يُرسم عند وصول العنصر للشاشة لا عند تحميل الصفحة */
  drawOnReveal?: boolean;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 210 90"
      className={cn("w-full", drawOnReveal && "sig-reveal", className)}
      aria-hidden
    >
      <path
        d="M8 62c14-34 24-46 31-40 6 5-4 25-11 36-6 10-2 15 6 10 9-6 16-22 22-33 5-9 10-7 9 3-1 12-6 22-1 25 6 4 15-6 21-16 5-9 11-9 12 1 1 9-2 17 3 20 6 3 14-6 20-14 5-7 11-14 16-11 5 4 1 13 6 16 4 3 12-2 20-11"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={
          animate
            ? { strokeDasharray: 520, strokeDashoffset: 520, animation: "draw 2.4s .3s ease-out forwards" }
            : undefined
        }
      />
      <path
        d="M150 74c14 4 32 3 46-2"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth - 1}
        strokeLinecap="round"
        opacity="0.7"
        style={
          animate
            ? { strokeDasharray: 90, strokeDashoffset: 90, animation: "draw 1s 2.5s ease-out forwards" }
            : undefined
        }
      />
    </svg>
  );
}
