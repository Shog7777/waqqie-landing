import { FileCheck2, ShieldCheck, WifiOff } from "lucide-react";

import { PhoneFrame } from "@/components/brand/phone-frame";
import { SignScreen } from "@/components/brand/screens";
import { SignatureMark } from "@/components/brand/signature-mark";
import { StoreBadges } from "@/components/brand/store-badges";
import { Rise } from "@/components/motion/rise";
import { hero, ui } from "@/lib/content";
import { formatStamp } from "@/lib/format";

const proofIcons = [ShieldCheck, WifiOff, FileCheck2];

/** التاريخ في كتلة التوقيع بالتقويم الهجري والأرقام المشرقية، كبقية الصفحة. */
const signedOn = formatStamp("hijri", "eastern");

export function Hero() {
  return (
    <section id="download" className="relative overflow-hidden pt-32 sm:pt-40">
      {/* نسيج ورق مسطّر بدل نمط النقاط العام */}
      <div aria-hidden className="ruled pointer-events-none absolute inset-0 opacity-60" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[70%] bg-[radial-gradient(120%_80%_at_70%_0%,color-mix(in_oklab,var(--wq-gold)_9%,transparent),transparent_70%)]"
      />

      <div className="relative mx-auto grid max-w-6xl items-end gap-y-16 px-4 sm:px-6 lg:grid-cols-[1.12fr_0.88fr] lg:gap-x-10">
        <div className="flex flex-col items-start pb-20 sm:pb-28">
          <Rise>
            <p className="flex items-center gap-3">
              <span aria-hidden className="h-px w-10 bg-gold" />
              <span
                className="font-mono text-[0.66rem] uppercase text-ivory/70"
                style={{ letterSpacing: "0.26em" }}
              >
                {hero.eyebrow}
              </span>
            </p>
          </Rise>

          {/* العنوان والنص الفرعي بلا حركة دخول عمدًا: أي عنصر يبدأ بشفافية صفر
              يُستبعد من قياس LCP حتى يظهر، وهذان أكبر نصّين في الصفحة. */}
          <h1 className="mt-7 text-[2.6rem] font-bold leading-[1.2] text-ivory sm:text-[3.2rem] lg:text-[3.6rem]">
            {hero.titleLead}
            <br />
            <span className="text-gold">{hero.titleAccent}</span>
          </h1>

          {/* سطر التوقيع: التوقيع يُرسم فوق الخط، والاسم والتاريخ تحته —
              كتلة التوقيع نفسها في أي عقد رسمي. */}
          <Rise delay={0.12}>
            <div className="mt-8 w-[min(22rem,100%)]">
              <SignatureMark
                color="var(--wq-gold)"
                strokeWidth={2.5}
                className="h-16 translate-y-1"
              />
              <div className="border-b hairline-gold" />
              <div className="mt-2 flex items-baseline justify-between font-mono text-[0.62rem] text-ivory/60">
                <span style={{ letterSpacing: "0.24em" }}>WAQQIE</span>
                <span className="ltr-num">
                  {signedOn.numeric} {signedOn.suffix}
                </span>
              </div>
            </div>
          </Rise>

          <p className="mt-9 max-w-[46ch] text-base leading-[2] text-ivory/70 sm:text-[1.05rem]">
            {hero.subtitle}
          </p>

          <Rise delay={0.18}>
            <StoreBadges className="mt-9" />
          </Rise>

          <Rise delay={0.24} className="mt-9 w-full">
            <ul className="flex flex-wrap items-center gap-x-7 gap-y-3 border-t hairline pt-5">
              {ui.heroProof.map((text, i) => {
                const Icon = proofIcons[i];
                return (
                  <li key={text} className="flex items-center gap-2 text-sm text-ivory/70">
                    <Icon className="size-4 text-gold" />
                    {text}
                  </li>
                );
              })}
            </ul>
          </Rise>
        </div>

        {/* المجسّم مُحاذى لأسفل القسم فيلامس حافّته، بدل توسيطه في مربّع متساوٍ */}
        <Rise delay={0.2} className="flex justify-center lg:justify-end">
          <PhoneFrame label="شاشة التوقيع في تطبيق وقّع" className="translate-y-px">
            <SignScreen />
          </PhoneFrame>
        </Rise>
      </div>
    </section>
  );
}
