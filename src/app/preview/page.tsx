import type { Metadata } from "next";

import { CyclingPhone } from "./cycling-phone";
import { DateStamp } from "@/components/brand/date-stamp";
import { PhoneFrame } from "@/components/brand/phone-frame";
import { SignScreen, SuccessScreen } from "@/components/brand/screens";
import { SignatureMark } from "@/components/brand/signature-mark";
import { StoreBadges } from "@/components/brand/store-badges";
import { hero, site, ui } from "@/lib/content";

export const metadata: Metadata = {
  title: "اتجاهات التصميم",
  robots: { index: false, follow: false },
};

/**
 * صفحة اختيار: ثلاث معالجات للقسم الافتتاحي، كلها داكنة وبنفس اللوحة والخطوط
 * والنصوص المأخوذة من `content.ts`. الفرق في الفكرة البصرية والحركة وحدها.
 * تُحذف بعد اختيار اتجاه.
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
          <p className="mt-3 max-w-[62ch] text-sm leading-[2] text-ivory/70">
            نفس الألوان والخطوط والنصوص في الثلاثة. الفرق في الفكرة البصرية والحركة
            والإضاءة. كل الحركة تتوقّف تلقائيًا عند تفعيل «تقليل الحركة» في النظام.
          </p>
        </div>
      </header>

      <DirectionLabel
        letter="أ"
        name="الإضاءة"
        note="ضوء ذهبي حيّ يتنفّس ببطء خلف الجهاز، ولمعة تمرّ على الشاشة، وتعتيم متدرّج عند الأطراف. العنوان يظهر سطرًا بعد سطر من خلف قناع."
      />
      <DirectionA />

      <DirectionLabel
        letter="ب"
        name="الطباعة"
        note="شبكة أعمدة ذهبية ترتسم من أعلى لأسفل، ثم يظهر العنوان الضخم سطرًا بعد سطر، والكلمة الذهبية تحمل لمعة تمرّ عليها. الجهاز يطفو على تقاطع الشبكة."
      />
      <DirectionB />

      <DirectionLabel
        letter="ج"
        name="المنتج الحيّ"
        note="الجهاز الأوسط يمشي في رحلة المنتج تلقائيًا: توقيع، ثم ختم، ثم نجاح. وتحته ختم التاريخ التفاعلي الحقيقي يجرّبه الزائر بنفسه."
      />
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
        <p className="max-w-[72ch] text-sm leading-[1.9] text-ivory/70">{note}</p>
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
        className="fx-pulse pointer-events-none absolute bottom-[-20%] end-[-8%] size-[34rem] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--wq-ink) 90%, transparent), transparent 70%)",
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

          <h2 className="mt-8 text-[2.9rem] font-bold leading-[1.14] tracking-[-0.01em] text-ivory sm:text-[3.6rem] lg:text-[4rem]">
            <span className="fx-line block" style={{ animationDelay: "0.18s" }}>
              {hero.titleLead}
            </span>
            <span
              className="fx-line block text-gold"
              style={{ animationDelay: "0.34s" }}
            >
              {hero.titleAccent}
            </span>
          </h2>

          <p
            className="fx-line mt-8 max-w-[42ch] text-base leading-[2] text-ivory/70 sm:text-[1.06rem]"
            style={{ animationDelay: "0.5s" }}
          >
            {hero.subtitle}
          </p>

          <div className="fx-line mt-10" style={{ animationDelay: "0.62s" }}>
            <StoreBadges />
          </div>

          <ul
            className="fx-line mt-10 flex flex-wrap items-center gap-x-7 gap-y-3"
            style={{ animationDelay: "0.74s" }}
          >
            {ui.heroProof.map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm text-ivory/70">
                <span aria-hidden className="size-1 rounded-full bg-gold" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* الجهاز: هالة نابضة، لمعة تمرّ على الشاشة، وظل طويل تحته */}
        <div className="relative flex justify-center lg:justify-end">
          <div
            aria-hidden
            className="absolute inset-x-6 bottom-[-6%] h-20 rounded-[50%] blur-md"
            style={{
              background:
                "radial-gradient(closest-side, color-mix(in oklab, #000 78%, transparent), transparent)",
            }}
          />
          <div className="relative fx-float [--tilt:-3deg]">
            <div
              aria-hidden
              className="fx-pulse absolute -inset-8 rounded-[3.5rem]"
              style={{
                background:
                  "radial-gradient(closest-side, color-mix(in oklab, var(--wq-gold) 26%, transparent), transparent 70%)",
              }}
            />
            <div className="fx-sweep relative overflow-hidden rounded-[2.6rem] drop-shadow-[0_50px_70px_rgba(0,0,0,.8)]">
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
      {/* شبكة الأعمدة ترتسم من أعلى لأسفل */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mx-auto max-w-6xl px-4 sm:px-6"
      >
        <div className="fx-grid grid h-full grid-cols-6 gap-x-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="border-e border-gold/14 last:border-e-0"
              style={{ animationDelay: `${i * 0.09}s` }}
            />
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className="fx-line flex items-baseline justify-between border-b border-gold/25 pb-4"
          style={{ animationDelay: "0.5s" }}
        >
          <span
            className="font-mono text-[0.62rem] uppercase text-ivory/70"
            style={{ letterSpacing: "0.28em" }}
          >
            {site.latin} · {hero.eyebrow}
          </span>
          <span className="font-mono text-[0.62rem] text-ivory/60 ltr-num">٠١ / ٠٦</span>
        </div>

        {/* العنوان هو الصورة، والكلمة الذهبية تحمل لمعة */}
        <h2 className="mt-10 text-[3.1rem] font-bold leading-[1.05] tracking-[-0.02em] sm:text-[4.6rem] lg:text-[5.6rem]">
          <span
            className="fx-line block text-ivory"
            style={{ animationDelay: "0.66s" }}
          >
            {hero.titleLead}
          </span>
          <span
            className="fx-line fx-shimmer block"
            style={{ animationDelay: "0.86s" }}
          >
            {hero.titleAccent}
          </span>
        </h2>

        <div className="mt-12 grid gap-x-10 gap-y-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="fx-line w-[min(24rem,100%)]" style={{ animationDelay: "1.05s" }}>
              <SignatureMark
                color="var(--wq-gold)"
                strokeWidth={2.5}
                className="h-14 translate-y-1"
              />
              <div className="border-b border-gold/40" />
            </div>

            <p
              className="fx-line mt-8 max-w-[44ch] text-base leading-[2] text-ivory/70"
              style={{ animationDelay: "1.18s" }}
            >
              {hero.subtitle}
            </p>

            <div className="fx-line mt-9" style={{ animationDelay: "1.3s" }}>
              <StoreBadges />
            </div>
          </div>

          <div className="fx-float justify-self-start [--tilt:2deg] lg:justify-self-end">
            <PhoneFrame label="معاينة الاتجاه ب" className="w-[188px] sm:w-[206px]">
              <SuccessScreen />
            </PhoneFrame>
          </div>
        </div>

        <ul className="mt-14 grid gap-y-3 border-t border-gold/25 pt-5 sm:grid-cols-3">
          {ui.heroProof.map((t, i) => (
            <li
              key={t}
              className="fx-line flex items-baseline gap-3 text-sm text-ivory/70"
              style={{ animationDelay: `${1.4 + i * 0.1}s` }}
            >
              <span className="font-mono text-[0.62rem] text-gold ltr-num">
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
        className="fx-drift pointer-events-none absolute -top-[20%] start-1/2 size-[40rem] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--wq-gold) 20%, transparent), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6">
        <p className="fx-line flex items-center justify-center gap-3">
          <span aria-hidden className="h-px w-10 bg-gold" />
          <span
            className="font-mono text-[0.66rem] uppercase text-ivory/70"
            style={{ letterSpacing: "0.26em" }}
          >
            {hero.eyebrow}
          </span>
          <span aria-hidden className="h-px w-10 bg-gold" />
        </p>

        <h2
          className="fx-line mx-auto mt-8 max-w-[16ch] text-[2.6rem] font-bold leading-[1.18] text-ivory sm:text-[3.3rem]"
          style={{ animationDelay: "0.16s" }}
        >
          {hero.titleLead} <span className="text-gold">{hero.titleAccent}</span>
        </h2>

        <p
          className="fx-line mx-auto mt-6 max-w-[48ch] text-base leading-[2] text-ivory/70"
          style={{ animationDelay: "0.32s" }}
        >
          {hero.subtitle}
        </p>

        <div className="fx-line mt-9" style={{ animationDelay: "0.46s" }}>
          <StoreBadges className="justify-center" />
        </div>

        {/* الجهاز الأوسط يمشي في رحلة المنتج تلقائيًا */}
        <div className="mt-16 flex items-end justify-center gap-5 sm:gap-8">
          <div className="fx-float hidden opacity-60 [--tilt:-7deg] sm:block">
            <PhoneFrame label="الشاشة الرئيسية" className="w-[164px]">
              <SignScreen />
            </PhoneFrame>
          </div>

          <div className="relative">
            <div
              aria-hidden
              className="fx-pulse absolute -inset-10 rounded-full"
              style={{
                background:
                  "radial-gradient(closest-side, color-mix(in oklab, var(--wq-gold) 22%, transparent), transparent 70%)",
              }}
            />
            <CyclingPhone className="relative drop-shadow-[0_44px_64px_rgba(0,0,0,.75)]" />
          </div>

          <div className="fx-float hidden opacity-60 [--tilt:7deg] sm:block">
            <PhoneFrame label="شاشة النجاح" className="w-[164px]">
              <SuccessScreen />
            </PhoneFrame>
          </div>
        </div>

        <div className="mx-auto mt-16 w-full max-w-md rounded-xl border border-ivory/10 bg-ink p-6 text-start">
          <p className="mb-4 text-center text-xs text-ivory/70">
            {ui.heroProof[0]} — جرّب الختم بنفسك
          </p>
          <DateStamp />
        </div>
      </div>
    </section>
  );
}
