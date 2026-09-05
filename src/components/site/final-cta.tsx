import { SignatureMark } from "@/components/brand/signature-mark";
import { StoreBadges } from "@/components/brand/store-badges";
import { Reveal } from "@/components/motion/reveal";
import { finalCta, site } from "@/lib/content";

/**
 * الخاتمة بأقوى إضاءة في الصفحة: كتلة ضوء واحدة خلف الدعوة، وتوقيع يُرسم
 * على خط ذهبي أسفلها.
 */
export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-abyss py-28 sm:py-36">
      <div
        aria-hidden
        className="fx-drift pointer-events-none absolute -top-1/4 start-1/2 size-[44rem] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--wq-gold) 26%, transparent), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 45%, transparent 30%, color-mix(in oklab, #000 62%, transparent) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <Reveal className="flex flex-col items-center">
          <span
            className="font-mono text-[0.66rem] uppercase text-ivory/70"
            style={{ letterSpacing: "0.3em" }}
          >
            {site.latin}
          </span>

          <h2 className="mt-7 max-w-[18ch] text-[2.1rem] font-bold leading-[1.3] text-ivory sm:text-[2.7rem]">
            {finalCta.title}
          </h2>

          <p className="mt-6 max-w-[50ch] text-base leading-[2] text-ivory/70">
            {finalCta.body}
          </p>

          <StoreBadges className="mt-10 justify-center" />

          <div className="mt-16 w-[min(20rem,100%)]">
            <SignatureMark
              color="var(--wq-gold)"
              strokeWidth={2.5}
              className="h-14 translate-y-1"
              animate={false}
            />
            <div className="border-b hairline-gold" />
            <p className="mt-4 text-sm font-semibold text-gold">{site.tagline}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
