import { StoreBadges } from "@/components/brand/store-badges";
import { SignatureMark } from "@/components/brand/signature-mark";
import { Reveal } from "@/components/motion/reveal";
import { finalCta, site } from "@/lib/content";

/**
 * الخاتمة كذيل مستند رسمي: شريط ذهبي، ثم الدعوة، ثم كتلة توقيع مطابقة
 * لتلك التي فُتحت بها الصفحة. الصفحة تبدأ بتوقيع وتنتهي به.
 */
export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-abyss">
      <span aria-hidden className="block h-[3px] w-full bg-gold" />
      <div aria-hidden className="ruled pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative mx-auto max-w-5xl px-4 py-24 sm:px-6 sm:py-28">
        <Reveal className="flex flex-col items-center text-center">
          <span
            className="font-mono text-[0.66rem] uppercase text-ivory/60"
            style={{ letterSpacing: "0.3em" }}
          >
            {site.latin}
          </span>

          <h2 className="mt-6 max-w-[20ch] text-[1.9rem] font-bold leading-[1.35] text-ivory sm:text-[2.3rem]">
            {finalCta.title}
          </h2>

          <p className="mt-5 max-w-[52ch] text-base leading-[2] text-ivory/70">
            {finalCta.body}
          </p>

          <StoreBadges className="mt-9 justify-center" />

          <div className="mt-14 w-[min(20rem,100%)]">
            <SignatureMark
              color="var(--wq-gold)"
              strokeWidth={2.5}
              className="h-14 translate-y-1"
              animate={false}
            />
            <div className="border-b hairline-gold" />
            <p className="mt-3 text-sm font-semibold text-gold">{site.tagline}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
