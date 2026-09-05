import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * علامة فصل في مستند: رقم الفصل في الهامش، خط يمتدّ إلى آخر العمود، ثم
 * العنوان. تعمل على أرضيتين، ولكل أرضية لوحتها.
 *
 * فوق الحبر: الذهبي يعطي 4.11:1، وهي كافية للنص الكبير لا الصغير، فالرقم
 * وحده ذهبي عند 1.6rem فأكثر والباقي عاجي عند 8.96:1.
 * فوق الورق: الذهبي 2.18:1 فلا يحمل نصًا إطلاقًا، والرقم بـ Card Teal 10.9:1.
 */
export function SectionHeading({
  num,
  eyebrow,
  titleLead,
  titleAccent,
  description,
  align = "start",
  tone = "ink",
  className,
}: {
  num: string;
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  description?: string;
  align?: "start" | "center";
  tone?: "ink" | "paper";
  className?: string;
}) {
  const onPaper = tone === "paper";

  return (
    <div className={cn("flex flex-col", className)}>
      <Reveal>
        <div
          className={cn(
            "flex items-baseline gap-4 border-b pb-3",
            onPaper ? "border-ink/20" : "hairline-gold",
            align === "center" && "justify-center",
          )}
        >
          <span
            aria-hidden
            className={cn(
              "font-mono text-[1.7rem] font-semibold leading-none ltr-num",
              onPaper ? "text-card" : "text-gold",
            )}
          >
            {num}
          </span>
          <span
            className={cn(
              "font-mono text-[0.68rem] uppercase",
              onPaper ? "text-ink/70" : "text-ivory/70",
            )}
            style={{ letterSpacing: "0.28em" }}
          >
            {eyebrow}
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <h2
          className={cn(
            "mt-8 max-w-[18ch] text-[1.9rem] font-bold leading-[1.32] sm:text-[2.35rem]",
            onPaper ? "text-ink" : "text-ivory",
            align === "center" && "mx-auto max-w-[22ch] text-center",
          )}
        >
          {titleLead} {titleAccent}
        </h2>
      </Reveal>

      {description ? (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "mt-5 max-w-[54ch] text-[1.02rem] leading-[2]",
              onPaper ? "text-ink/80" : "text-ivory/70",
              align === "center" && "mx-auto text-center",
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
