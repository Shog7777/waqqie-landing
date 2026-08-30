import { Reveal } from "@/components/motion/reveal";
import { trustBadges } from "@/lib/content";

const brandWords = [
  "عربي أوّلًا",
  "RTL أصيل",
  "واتساب-متكامل",
  "تصميم دقيق",
  "سرعة الجوال",
  "خصوصية على الجهاز",
  "رؤية 2030",
];

export function TrustBar() {
  return (
    <section aria-label="ما يميّز وقّع" className="relative border-y border-ivory/10 bg-abyss/40">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <dl className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
          {trustBadges.map((b, i) => (
            <Reveal key={b.label} delay={i * 0.07}>
              <div className="flex flex-col gap-1.5 border-e border-ivory/10 pe-6 last:border-e-0 max-lg:[&:nth-child(2n)]:border-e-0">
                <dt className="text-xl font-bold text-gold ltr-num sm:text-2xl">{b.value}</dt>
                <dd className="text-sm font-medium text-ivory">{b.label}</dd>
                <p className="text-xs leading-relaxed text-ivory/45">{b.hint}</p>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>

      {/* شريط كلمات الهوية */}
      {/* الشريط نفسه يسير من اليسار إلى اليمين، لذا يُثبّت اتجاهه LTR
          حتى لا يبدأ محتواه خارج الشاشة داخل صفحة RTL. */}
      <div
        dir="ltr"
        className="relative overflow-hidden border-t border-ivory/10 py-3 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
      >
        <div className="flex w-max motion-safe:animate-marquee">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
              {brandWords.map((w) => (
                <li
                  key={w}
                  className="flex items-center gap-6 whitespace-nowrap px-6 text-sm text-ivory/40"
                >
                  <span className="size-1 rounded-full bg-gold/60" />
                  {w}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
