import { cn } from "@/lib/utils";

/**
 * شارات المتاجر — نسخة أحادية اللون مبنية داخليًا لتلتزم بقاعدة الهوية:
 * "لا تستخدم الأخضر كلون أساسي في أي مكان غير زر واتساب" (الفصل 11).
 */
function AppleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-7 shrink-0 fill-current" aria-hidden>
      <path d="M17.05 12.04c-.03-2.6 2.12-3.85 2.22-3.91-1.21-1.77-3.09-2.01-3.76-2.04-1.6-.16-3.12.94-3.93.94-.81 0-2.06-.92-3.39-.9-1.74.03-3.35 1.01-4.25 2.57-1.81 3.14-.46 7.79 1.3 10.34.86 1.25 1.89 2.65 3.24 2.6 1.3-.05 1.79-.84 3.36-.84 1.57 0 2.01.84 3.38.81 1.4-.02 2.28-1.27 3.13-2.53.99-1.45 1.4-2.85 1.42-2.92-.03-.01-2.72-1.04-2.75-4.12M14.6 4.6c.71-.87 1.19-2.07 1.06-3.27-1.02.04-2.26.68-3 1.54-.66.77-1.24 2-1.08 3.18 1.14.09 2.3-.58 3.02-1.45" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-6 shrink-0 fill-current" aria-hidden>
      <polygon points="3,2 3,22 13.2,12" opacity="0.95" />
      <polygon points="3,2 17.4,9.4 13.2,12" opacity="0.7" />
      <polygon points="3,22 17.4,14.6 13.2,12" opacity="0.55" />
      <polygon points="17.4,9.4 21,12 17.4,14.6 13.2,12" opacity="0.85" />
    </svg>
  );
}

type BadgeProps = {
  store: "apple" | "google";
  className?: string;
};

export function StoreBadge({ store, className }: BadgeProps) {
  const isApple = store === "apple";

  return (
    <a
      href="#"
      aria-label={isApple ? "حمّل وقّع من App Store" : "حمّل وقّع من Google Play"}
      className={cn(
        "group inline-flex items-center gap-3 rounded-xl border border-ivory/15 bg-abyss/60 px-4 py-2.5",
        "text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/50 hover:bg-abyss/80",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
        className,
      )}
    >
      {isApple ? <AppleGlyph /> : <PlayGlyph />}
      <span className="flex flex-col items-start leading-tight">
        <span className="text-[0.65rem] text-ivory/60">
          {isApple ? "حمّله من" : "احصل عليه من"}
        </span>
        <span className="font-mono text-sm font-semibold tracking-wide">
          {isApple ? "App Store" : "Google Play"}
        </span>
      </span>
    </a>
  );
}

export function StoreBadges({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <StoreBadge store="apple" />
      <StoreBadge store="google" />
    </div>
  );
}
