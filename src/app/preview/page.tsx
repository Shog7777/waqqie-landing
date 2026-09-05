import type { Metadata } from "next";

import { DateStamp } from "@/components/brand/date-stamp";
import { PhoneFrame } from "@/components/brand/phone-frame";
import { SignScreen, StampScreen, SuccessScreen } from "@/components/brand/screens";
import { SignatureMark } from "@/components/brand/signature-mark";
import { StoreBadges } from "@/components/brand/store-badges";
import { hero, site, ui } from "@/lib/content";

export const metadata: Metadata = {
  title: "اتجاهات التصميم",
  robots: { index: false, follow: false },
};

/**
 * صفحة اختيار: ثلاث معالجات مختلفة للقسم الافتتاحي، كلها داكنة وملتزمة
 * بلوحة الهوية وخطوطها واتجاهها. تُحذف بعد اختيار اتجاه واحد.
 */
export default function PreviewPage() {
  return (
    <main className="min-h-dvh bg-ink">
      <header className="border-b border-ivory/10 bg-abyss px-6 py-8">
        <div className="mx-auto max-w-6xl">
          <p
            className="font-mono text-[0.65rem] uppercase text-gold"
            style={{ letterSpacing: "0.3em" }}
          >
            Waqqie · Direction study
          </p>
          <h1 className="mt-3 text-2xl font-bold text-ivory">ثلاثة اتجاهات للقسم الافتتاحي</h1>
          <p className="mt-3 max-w-[60ch] text-sm leading-[2] text-ivory/70">
            كلها بنفس الألوان والخطوط والنصوص. الفرق في الفكرة البصرية وحدها.
            اختاري واحدًا وأبني عليه الصفحة كاملة.
          </p>
        </div>
      </header>

      <DirectionLabel letter="أ" name="الإضاءة" note="المشهد يُبنى بالضوء: مصدر ذهبي واحد، ظلال طويلة، حافة مضيئة على الجهاز، ومساحة سالبة كريمة." />
      <DirectionA />

      <DirectionLabel letter="ب" name="الطباعة" note="العنوان نفسه هو الصورة: حجم ضخم على شبكة أعمدة ذهبية ظاهرة، والجهاز صغير موضوع بدقة على تقاطع الشبكة." />
      <DirectionB />

      <DirectionLabel letter="ج" name="المنتج الحيّ" note="الجهاز في المركز والتفاعل في أول شاشة: الزائر يجرّب الختم قبل أن يقرأ عن الميزة." />
      <DirectionC />

      <footer className="border-t border-ivory/10 bg-abyss px-6 py-10 text-center">
        <p className="text-sm text-ivory/70">
          قولي «أ» أو «ب» أو «ج» وأبني الصفحة كلها على الاتجاه المختار.
        </p>
      </footer>
    </main>
  );
}

function DirectionLabel({
  letter,
  name,
  note,
}: {
  letter: string;
  name: string;
  note: string;
}) {
  return (
    <div className="border-y border-ivory/10 bg-abyss px-6 py-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-2">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-[1.7rem] font-semibold leading-none text-gold">
            {letter}
          </span>
          <span className="text-lg font-semibold text-ivory">{name}</span>
        </div>
        <p className="max-w-[70ch] text-sm leading-[1.9] text-ivory/70">{note}</p>
      </div>
    </div>
  );
}

/* ================================================================== */
/* أ — الإضاءة                                                         */
/* ================================================================== */

function DirectionA() {
  return (
    <section className="relative overflow-hidden bg-abyss py-24 sm:py-32">
      {/* مصدر ضوء واحد أعلى اليمين، وتعتيم عند الأطراف */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(75% 55% at 78% 8%, color-mix(in oklab, var(--wq-gold) 26%, transparent), transparent 62%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 55%, transparent 35%, color-mix(in oklab, #000 62%, transparent) 100%)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-y-20 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-x-16">
        <div className="flex flex-col items-start">
          <p className="flex items-center gap-3">
            <span aria-hidden className="h-px w-10 bg-gold" />
            <span
              className="font-mono text-[0.66rem] uppercase text-ivory/70"
              style={{ letterSpacing: "0.26em" }}
            >
              {hero.eyebrow}
            </span>
          </p>

          <h2 className="mt-8 text-[2.9rem] font-bold leading-[1.14] tracking-[-0.01em] text-ivory sm:text-[3.6rem] lg:text-[4rem]">
            {hero.titleLead}
            <br />
            <span className="text-gold">{hero.titleAccent}</span>
          </h2>

          <p className="mt-8 max-w-[42ch] text-base leading-[2] text-ivory/70 sm:text-[1.06rem]">
            {hero.subtitle}
          </p>

          <StoreBadges className="mt-10" />

          <ul className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3">
            {ui.heroProof.map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm text-ivory/65">
                <span aria-hidden className="size-1 rounded-full bg-gold" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* الجهاز بحافة مضيئة وظل طويل */}
        <div className="relative flex justify-center lg:justify-end">
          <div
            aria-hidden
            className="absolute -inset-x-10 bottom-[-8%] h-24 rounded-[50%]"
            style={{
              background:
                "radial-gradient(closest-side, color-mix(in oklab, #000 70%, transparent), transparent)",
            }}
          />
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-6 rounded-[3rem]"
              style={{
                background:
                  "radial-gradient(closest-side, color-mix(in oklab, var(--wq-gold) 22%, transparent), transparent 72%)",
              }}
            />
            <div className="relative rotate-[-3deg] drop-shadow-[0_50px_70px_rgba(0,0,0,.75)]">
              <PhoneFrame label="معاينة الاتجاه أ" className="w-[262px] sm:w-[288px]">
                <SignScreen />
              </PhoneFrame>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* ب — الطباعة                                                         */
/* ================================================================== */

function DirectionB() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 sm:py-32">
      {/* شبكة أعمدة ذهبية ظاهرة يجلس عليها النص */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mx-auto max-w-6xl px-4 sm:px-6"
      >
        <div className="grid h-full grid-cols-6 gap-x-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="border-e border-gold/12 last:border-e-0" />
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-baseline justify-between border-b border-gold/25 pb-4">
          <span
            className="font-mono text-[0.62rem] uppercase text-ivory/70"
            style={{ letterSpacing: "0.28em" }}
          >
            {site.latin} · {hero.eyebrow}
          </span>
          <span className="font-mono text-[0.62rem] text-ivory/55 ltr-num">٠١ / ٠٦</span>
        </div>

        {/* العنوان هو الصورة */}
        <h2 className="mt-10 text-[3.1rem] font-bold leading-[1.05] tracking-[-0.02em] text-ivory sm:text-[4.6rem] lg:text-[5.6rem]">
          {hero.titleLead}
        </h2>
        <h2 className="text-[3.1rem] font-bold leading-[1.05] tracking-[-0.02em] text-gold sm:text-[4.6rem] lg:text-[5.6rem]">
          {hero.titleAccent}
        </h2>

        <div className="mt-12 grid gap-x-10 gap-y-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="w-[min(24rem,100%)]">
              <SignatureMark
                color="var(--wq-gold)"
                strokeWidth={2.5}
                className="h-14 translate-y-1"
              />
              <div className="border-b border-gold/40" />
            </div>

            <p className="mt-8 max-w-[44ch] text-base leading-[2] text-ivory/70">
              {hero.subtitle}
            </p>

            <StoreBadges className="mt-9" />
          </div>

          {/* الجهاز صغير، موضوع على تقاطع الشبكة */}
          <div className="justify-self-start lg:justify-self-end">
            <PhoneFrame label="معاينة الاتجاه ب" className="w-[188px] sm:w-[206px]">
              <SuccessScreen />
            </PhoneFrame>
          </div>
        </div>

        <ul className="mt-14 grid gap-y-3 border-t border-gold/25 pt-5 sm:grid-cols-3">
          {ui.heroProof.map((t, i) => (
            <li key={t} className="flex items-baseline gap-3 text-sm text-ivory/70">
              <span className="font-mono text-[0.62rem] text-gold/80 ltr-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ================================================================== */
/* ج — المنتج الحيّ                                                     */
/* ================================================================== */

function DirectionC() {
  return (
    <section className="relative overflow-hidden bg-abyss py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 60% at 50% 0%, color-mix(in oklab, var(--wq-ink) 92%, transparent), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6">
        <p className="flex items-center justify-center gap-3">
          <span aria-hidden className="h-px w-10 bg-gold" />
          <span
            className="font-mono text-[0.66rem] uppercase text-ivory/70"
            style={{ letterSpacing: "0.26em" }}
          >
            {hero.eyebrow}
          </span>
          <span aria-hidden className="h-px w-10 bg-gold" />
        </p>

        <h2 className="mx-auto mt-8 max-w-[16ch] text-[2.6rem] font-bold leading-[1.18] text-ivory sm:text-[3.3rem]">
          {hero.titleLead} <span className="text-gold">{hero.titleAccent}</span>
        </h2>

        <p className="mx-auto mt-6 max-w-[48ch] text-base leading-[2] text-ivory/70">
          {hero.subtitle}
        </p>

        <StoreBadges className="mt-9 justify-center" />

        {/* ثلاثة أجهزة، الأوسط أكبر، وتحتها التفاعل الحقيقي */}
        <div className="mt-16 flex items-end justify-center gap-4 sm:gap-6">
          <div className="hidden rotate-[-6deg] opacity-70 sm:block">
            <PhoneFrame label="الماسح" className="w-[168px]">
              <StampScreen />
            </PhoneFrame>
          </div>
          <div className="drop-shadow-[0_40px_60px_rgba(0,0,0,.7)]">
            <PhoneFrame label="لوحة التوقيع" className="w-[224px] sm:w-[248px]">
              <SignScreen />
            </PhoneFrame>
          </div>
          <div className="hidden rotate-[6deg] opacity-70 sm:block">
            <PhoneFrame label="شاشة النجاح" className="w-[168px]">
              <SuccessScreen />
            </PhoneFrame>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-md rounded-xl border border-ivory/10 bg-ink p-6 text-start">
          <p className="mb-4 text-center text-xs text-ivory/65">
            جرّبها الآن — الختم يتغيّر مباشرة
          </p>
          <DateStamp />
        </div>
      </div>
    </section>
  );
}
