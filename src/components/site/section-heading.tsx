import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * ترويسة قسم: رقم الفصل في الهامش، خط ذهبي يمتدّ إلى آخر العمود، ثم العنوان.
 *
 * الذهبي فوق الحبر يعطي 4.11:1، وهي نسبة كافية للنص الكبير لا الصغير، فالرقم
 * وحده ذهبي عند 1.7rem والباقي عاجي عند 8.96:1.
 */
export function SectionHeading({
  num,
  eyebrow,
  titleLead,
  titleAccent,
  description,
  align = "start",
  className,
}: {
  num: string;
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  description?: string;
  align?: "start" | "center";
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      <Reveal>
        <div
          className={cn(
            "flex items-baseline gap-4 border-b hairline-gold pb-3",
            align === "center" && "justify-center",
          )}
        >
          <span
            aria-hidden
            className="font-mono text-[1.7rem] font-semibold leading-none text-gold ltr-num"
          >
            {num}
          </span>
          <span
            className="font-mono text-[0.68rem] uppercase text-ivory/70"
            style={{ letterSpacing: "0.28em" }}
          >
            {eyebrow}
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <h2
          className={cn(
            "mt-8 max-w-[18ch] text-[1.9rem] font-bold leading-[1.32] text-ivory sm:text-[2.35rem]",
            align === "center" && "mx-auto max-w-[22ch] text-center",
          )}
        >
          {titleLead} <span className="text-gold">{titleAccent}</span>
        </h2>
      </Reveal>

      {description ? (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "mt-5 max-w-[54ch] text-[1.02rem] leading-[2] text-ivory/70",
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
