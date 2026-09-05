import { SigningSequence } from "@/components/brand/signing-sequence";
import { StoreBadges } from "@/components/brand/store-badges";
import { hero, ui } from "@/lib/content";

/**
 * دمج الاتجاهين المختارين: إضاءة الاتجاه «أ» بوصفها نظام المشهد، والجهاز
 * الحيّ من الاتجاه «ج» بوصفه بطل الصورة.
 *
 * العنوان والنص الفرعي بلا حركة دخول عمدًا: أي عنصر يبدأ بشفافية صفر
 * يُستبعد من قياس LCP حتى يظهر، وهذان أكبر نصّين في الصفحة.
 */
export function Hero() {
  return (
    <section id="download" className="relative overflow-hidden bg-abyss pb-24 pt-32 sm:pt-40">
      {/* مصدر الضوء: كتلة ذهبية تتنفّس وتنزاح ببطء */}
      <div
        aria-hidden
        className="fx-drift pointer-events-none absolute -top-1/4 start-[-10%] size-[46rem] rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--wq-gold) 30%, transparent), transparent 72%)",
        }}
      />
      <div
        aria-hidden
        className="fx-pulse pointer-events-none absolute bottom-[-24%] end-[-8%] size-[34rem] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--wq-ink) 92%, transparent), transparent 70%)",
        }}
      />
      {/* تعتيم الأطراف */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(125% 95% at 50% 50%, transparent 30%, color-mix(in oklab, #000 68%, transparent) 100%)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-y-20 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-x-16">
        <div className="flex flex-col items-start">
          <p className="fx-line flex items-center gap-3" style={{ animationDelay: "0.05s" }}>
            <span aria-hidden className="h-px w-10 bg-gold" />
            <span
              className="font-mono text-[0.66rem] uppercase text-ivory/70"
              style={{ letterSpacing: "0.26em" }}
            >
              {hero.eyebrow}
            </span>
          </p>

          <h1 className="mt-8 text-[2.9rem] font-bold leading-[1.14] tracking-[-0.01em] text-ivory sm:text-[3.6rem] lg:text-[4rem]">
            {hero.titleLead}
            <br />
            <span className="text-gold">{hero.titleAccent}</span>
          </h1>

          <p className="mt-8 max-w-[42ch] text-base leading-[2] text-ivory/70 sm:text-[1.06rem]">
            {hero.subtitle}
          </p>

          <div className="fx-line mt-10" style={{ animationDelay: "0.5s" }}>
            <StoreBadges />
          </div>

          <ul
            className="fx-line mt-10 flex flex-wrap items-center gap-x-7 gap-y-3"
            style={{ animationDelay: "0.64s" }}
          >
            {ui.heroProof.map((text) => (
              <li key={text} className="flex items-center gap-2 text-sm text-ivory/70">
                <span aria-hidden className="size-1 rounded-full bg-gold" />
                {text}
              </li>
            ))}
          </ul>
        </div>

        {/* قصة التوقيع: مسح، ثم توقيع، ثم ختم، ثم إرسال — تتكرّر أمام الزائر */}
        <div className="relative flex justify-center lg:justify-end">
          <SigningSequence />
        </div>

      </div>
    </section>
  );
}
