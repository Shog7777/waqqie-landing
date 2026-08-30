import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * ترويسة قسم موحّدة — تسمية تقنية بخط JetBrains Mono متبوعة بخط ذهبي متلاشٍ،
 * وهو نفس نمط `.sec` في دليل الهوية الرسمي.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "start" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      <Reveal>
        <span className="flex items-center gap-3">
          <span
            className="font-mono text-[0.7rem] uppercase text-gold"
            style={{ letterSpacing: "0.25em" }}
          >
            {eyebrow}
          </span>
          <span
            aria-hidden
            className="h-px w-14 bg-[linear-gradient(to_left,color-mix(in_oklab,var(--wq-gold)_60%,transparent),transparent)]"
          />
        </span>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="max-w-2xl text-3xl font-bold leading-[1.25] text-ivory sm:text-4xl">
          {title}
        </h2>
      </Reveal>

      {description ? (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "max-w-2xl text-base leading-relaxed text-ivory/70",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
