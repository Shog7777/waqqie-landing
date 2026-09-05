import { Reveal } from "@/components/motion/reveal";
import { trustBadges } from "@/lib/content";

/**
 * شريط مضغوط بين المشهد الافتتاحي وبقية الصفحة.
 *
 * كان ثلاثة أسطر لكل حقل فامتدّ ارتفاعه أكثر من اللازم؛ صار الرقم والتسمية
 * على سطر واحد والتفصيل تحتهما بحجم أصغر. والحركة شعاع يمرّ على الشريط الذهبي
 * أعلاه، وهي نفس لغة الإضاءة في المشهد الافتتاحي.
 *
 * الأرقام عند 1.35rem بوزن عريض تتجاوز عتبة التباين الخاصة بالنص الكبير.
 */
export function TrustBar() {
  return (
    <section aria-label="ما يميّز وقّع" className="relative overflow-hidden bg-abyss">
      <div aria-hidden className="relative h-[3px] w-full overflow-hidden bg-gold/45">
        <span className="fx-travel absolute inset-y-0 w-1/4 bg-[linear-gradient(to_left,transparent,var(--wq-gold),transparent)]" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-28"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, color-mix(in oklab, var(--wq-gold) 10%, transparent), transparent 72%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-7 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustBadges.map((b, i) => (
            <Reveal
              key={b.label}
              delay={i * 0.06}
              className="flex flex-col gap-1 lg:border-e lg:hairline lg:pe-8 lg:last:border-e-0"
            >
              <dt className="flex flex-wrap items-baseline gap-x-2.5">
                <span className="font-mono text-[1.35rem] font-bold leading-none text-gold ltr-num">
                  {b.value}
                </span>
                <span className="text-sm font-medium text-ivory">{b.label}</span>
              </dt>
              <dd className="text-[0.72rem] leading-relaxed text-ivory/65">{b.hint}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
