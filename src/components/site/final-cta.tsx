import { GoldGlow, NodePattern } from "@/components/brand/pattern";
import { StoreBadges } from "@/components/brand/store-badges";
import { Reveal } from "@/components/motion/reveal";
import { finalCta, site } from "@/lib/content";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-gold/25 bg-card px-6 py-16 text-center sm:px-16">
            <NodePattern className="opacity-50" />
            <GoldGlow className="start-1/2 top-[-40%] size-[560px] -translate-x-1/2 opacity-70" />

            <div className="relative flex flex-col items-center gap-6">
              <span
                className="font-mono text-[0.7rem] uppercase text-gold"
                style={{ letterSpacing: "0.3em" }}
              >
                {site.latin}
              </span>

              <h2 className="max-w-2xl text-3xl font-bold leading-[1.3] text-ivory sm:text-4xl">
                {finalCta.title}
              </h2>

              <p className="max-w-xl text-base leading-[2] text-ivory/65">{finalCta.body}</p>

              <StoreBadges className="mt-2 justify-center" />

              <span aria-hidden className="gold-divider mt-4 h-px w-40" />

              {/* اللمسة الخطية محجوزة لشاشة نجاح التوقيع وحدها (قاعدة 16) — هنا نص عادي */}
              <p className="text-lg font-semibold text-gold/85">توقيعك، بثقة</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
