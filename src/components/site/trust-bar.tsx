import { Reveal } from "@/components/motion/reveal";
import { trustBadges } from "@/lib/content";

/**
 * شريط ترويسة على هيئة رأس مستند رسمي: شريط ذهبي رفيع فوقه، ثم أربعة حقول
 * مفصولة بخطوط شعرية. القيم عند 1.6rem فأكثر حتى يتجاوز الذهبي عتبة التباين
 * الخاصة بالنص الكبير فوق الحبر.
 */
export function TrustBar() {
  return (
    <section aria-label="ما يميّز وقّع" className="relative bg-abyss">
      <span aria-hidden className="block h-[3px] w-full bg-gold" />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {trustBadges.map((b, i) => (
            <Reveal
              key={b.label}
              delay={i * 0.06}
              className="flex flex-col gap-2 border-t hairline pt-4 lg:border-t-0 lg:border-e lg:pe-8 lg:pt-0 lg:last:border-e-0"
            >
              <dt className="font-mono text-[1.6rem] font-semibold leading-tight text-gold ltr-num">
                {b.value}
              </dt>
              <dd className="flex flex-col gap-1">
                <span className="text-sm font-medium text-ivory">{b.label}</span>
                <span className="text-xs leading-relaxed text-ivory/65">{b.hint}</span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
