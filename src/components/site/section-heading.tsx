import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * ترويسة قسم على هيئة علامة فصل في مستند رسمي: رقم البند في الهامش، وخط
 * شعري يمتدّ إلى آخر العمود، ثم العنوان.
 *
 * لماذا الرقم ذهبي والعنوان عاجي: الذهبي فوق Deep Ink Teal يعطي 4.11:1، وهي
 * نسبة كافية للنص الكبير (عتبة 3:1) لا للصغير. الرقم عند 1.6rem بوزن عريض
 * يتجاوزها بأمان، بينما يبقى نص العنوان والوصف عاجيًا عند 8.96:1.
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
  /** رقم البند كما يظهر في الهامش */
  num: string;
  /** تسمية الفصل اللاتينية */
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
            className="font-mono text-[1.6rem] font-semibold leading-none text-gold ltr-num"
            aria-hidden
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
            "mt-7 max-w-[19ch] text-[1.75rem] font-bold leading-[1.35] text-ivory sm:text-[2.1rem]",
            align === "center" && "mx-auto max-w-[24ch] text-center",
          )}
        >
          {titleLead} {titleAccent}
        </h2>
      </Reveal>

      {description ? (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "mt-4 max-w-[52ch] text-base leading-[2] text-ivory/70",
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
