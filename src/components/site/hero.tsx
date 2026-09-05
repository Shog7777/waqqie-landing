import { FileCheck2, ShieldCheck, WifiOff } from "lucide-react";

import { PaperLines, PaperSheet, Seal } from "@/components/brand/paper";
import { PhoneFrame } from "@/components/brand/phone-frame";
import { SignScreen } from "@/components/brand/screens";
import { SignatureMark } from "@/components/brand/signature-mark";
import { StoreBadges } from "@/components/brand/store-badges";
import { Rise } from "@/components/motion/rise";
import { hero, site, ui } from "@/lib/content";
import { formatStamp } from "@/lib/format";

const proofIcons = [ShieldCheck, WifiOff, FileCheck2];

/** التاريخ بالتقويم الهجري والأرقام المشرقية، كبقية الصفحة. */
const signedOn = formatStamp("hijri", "eastern");

export function Hero() {
  return (
    <section id="download" className="relative overflow-hidden pb-28 pt-32 sm:pt-40">
      <div aria-hidden className="ruled pointer-events-none absolute inset-0 opacity-70" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[80%] bg-[radial-gradient(115%_75%_at_72%_0%,color-mix(in_oklab,var(--wq-gold)_10%,transparent),transparent_68%)]"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-y-24 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-x-12">
        <div className="flex flex-col items-start">
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

          {/* بلا حركة دخول: أي عنصر يبدأ بشفافية صفر يُستبعد من قياس LCP. */}
          <h1 className="mt-8 text-[2.7rem] font-bold leading-[1.16] text-ivory sm:text-[3.3rem] lg:text-[3.7rem]">
            {hero.titleLead}
            <br />
            <span className="text-gold">{hero.titleAccent}</span>
          </h1>

          {/* كتلة التوقيع: التوقيع فوق الخط، والاسم والتاريخ تحته. */}
          <Rise delay={0.12}>
            <div className="mt-9 w-[min(21rem,100%)]">
              <SignatureMark
                color="var(--wq-gold)"
                strokeWidth={2.5}
                className="h-14 translate-y-1"
              />
              <div className="border-b hairline-gold" />
              <div className="mt-2 flex items-baseline justify-between gap-6 font-mono text-[0.6rem] text-ivory/60">
                <span style={{ letterSpacing: "0.16em" }}>{site.latin}</span>
                <span className="ltr-num">
                  {signedOn.numeric} {signedOn.suffix}
                </span>
              </div>
            </div>
          </Rise>

          <p className="mt-9 max-w-[44ch] text-base leading-[2] text-ivory/70 sm:text-[1.05rem]">
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

        {/* المشهد: عقد موقّع ومختوم، والجهاز موضوع فوقه. */}
        <Rise delay={0.2}>
          <div className="relative mx-auto w-full max-w-[30rem] pb-16 sm:pb-8">
            <div className="-rotate-[6deg]">
              <PaperSheet stacked={false}>
                <div className="relative min-h-[22rem] sm:min-h-[25rem]">
                  <p className="font-mono text-[0.55rem] text-ink/60 ltr-num">{hero.docId}</p>
                  <h2 className="mt-2 text-base font-bold text-ink">{hero.docTitle}</h2>
                  <PaperLines className="mt-6" widths={[100, 94, 88, 97, 72]} />
                  <PaperLines className="mt-5" widths={[96, 82]} />

                  <div className="mt-9 border-t border-dashed border-ink/25 pt-3">
                    <span className="font-mono text-[0.5rem] text-ink/55 ltr-num">SIGNATURE</span>
                    <SignatureMark color="var(--wq-ink)" strokeWidth={2.4} className="h-14" />
                  </div>

                  <Seal className="absolute -bottom-3 end-0 size-24 -rotate-[10deg] sm:size-28" />
                </div>
              </PaperSheet>
            </div>

            <div className="absolute -bottom-2 -start-6 rotate-[3deg] sm:-start-12">
              <PhoneFrame label="شاشة التوقيع في تطبيق وقّع" className="w-[180px] sm:w-[214px]">
                <SignScreen />
              </PhoneFrame>
            </div>
          </div>
        </Rise>
      </div>
    </section>
  );
}
