import { PaperSheet, Seal } from "@/components/brand/paper";
import { SignatureMark } from "@/components/brand/signature-mark";
import { StoreBadges } from "@/components/brand/store-badges";
import { Reveal } from "@/components/motion/reveal";
import { finalCta, site } from "@/lib/content";
import { formatStamp } from "@/lib/format";

const signedOn = formatStamp("hijri", "eastern");

/**
 * الصفحة الأخيرة من الوثيقة: الدعوة، ثم كتلة توقيع مطابقة لتلك التي فُتحت
 * بها الصفحة، وختم. الصفحة تبدأ بتوقيع وتنتهي به.
 */
export function FinalCta() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Reveal>
          <PaperSheet chapter="الخاتمة" page="٠٣">
            <div className="relative flex flex-col items-center py-6 text-center sm:py-10">
              <Seal className="pointer-events-none absolute -top-4 end-0 size-24 rotate-[8deg] sm:size-28" />

              <h2 className="max-w-[18ch] text-[1.9rem] font-bold leading-[1.35] text-ink sm:text-[2.35rem]">
                {finalCta.title}
              </h2>

              <p className="mt-5 max-w-[48ch] text-[1.02rem] leading-[2] text-ink/80">
                {finalCta.body}
              </p>

              <div className="mt-10 rounded-xl bg-ink px-6 py-6 sm:px-9">
                <StoreBadges className="justify-center" />
              </div>

              <div className="mt-14 w-[min(20rem,100%)]">
                <SignatureMark
                  color="var(--wq-ink)"
                  strokeWidth={2.4}
                  className="h-14 translate-y-1"
                  animate={false}
                />
                <div className="border-b border-ink/30" />
                <div className="mt-2 flex items-baseline justify-between gap-6 font-mono text-[0.6rem] text-ink/70">
                  <span style={{ letterSpacing: "0.16em" }}>{site.latin}</span>
                  <span className="ltr-num">
                    {signedOn.numeric} {signedOn.suffix}
                  </span>
                </div>
                <p className="mt-5 text-sm font-semibold text-ink">{site.tagline}</p>
              </div>
            </div>
          </PaperSheet>
        </Reveal>
      </div>
    </section>
  );
}
