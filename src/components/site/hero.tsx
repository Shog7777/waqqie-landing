import { FileCheck2, ShieldCheck, WifiOff } from "lucide-react";

import { GoldGlow, GridPattern, NodePattern } from "@/components/brand/pattern";
import { PhoneFrame } from "@/components/brand/phone-frame";
import { SignScreen, WhatsAppGlyph } from "@/components/brand/screens";
import { StoreBadges } from "@/components/brand/store-badges";
import { Reveal } from "@/components/motion/reveal";
import { hero } from "@/lib/content";

const proofItems = [
  { icon: ShieldCheck, text: "معالجة كاملة على الجهاز" },
  { icon: WifiOff, text: "يعمل دون إنترنت" },
  { icon: FileCheck2, text: "تصدير PDF قياسي" },
];

export function Hero() {
  return (
    <section
      id="download"
      className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40"
    >
      <GridPattern className="opacity-70" />
      <NodePattern className="h-[55%] opacity-60" />
      <GoldGlow className="start-[-10%] top-[-12%] size-[520px]" />
      <GoldGlow className="bottom-[-30%] end-[-5%] size-[420px] opacity-60" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* النص */}
        <div className="flex flex-col items-start gap-7">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-gold/8 px-4 py-1.5 text-xs text-gold">
              <WhatsAppGlyph className="size-3.5 text-whatsapp" />
              {hero.eyebrow}
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="text-4xl font-bold leading-[1.18] text-ivory sm:text-5xl lg:text-[3.4rem]">
              {hero.titleLead}
              <span className="mx-2 text-gold/40">—</span>
              <span className="text-gradient-gold whitespace-nowrap">{hero.titleAccent}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="max-w-xl text-base leading-[2] text-ivory/65 sm:text-lg">
              {hero.subtitle}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <StoreBadges />
          </Reveal>

          <Reveal delay={0.24}>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {proofItems.map((p) => (
                <li key={p.text} className="flex items-center gap-2 text-sm text-ivory/70">
                  <p.icon className="size-4 text-gold" />
                  {p.text}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* المجسّم */}
        <Reveal delay={0.2} className="flex justify-center">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--wq-gold)_14%,transparent),transparent_65%)]"
            />

            <div className="motion-safe:animate-float">
              <PhoneFrame label="شاشة التوقيع في تطبيق وقّع">
                <SignScreen />
              </PhoneFrame>
            </div>

            {/* بطاقات طافية تُلخّص القيمة */}
            <div className="absolute -top-4 start-6 hidden rounded-xl border border-ivory/12 bg-abyss/85 px-3 py-2 shadow-lg backdrop-blur sm:block">
              <p className="font-mono text-[0.55rem] text-gold ltr-num">#WQ-0042</p>
              <p className="text-[0.7rem] text-ivory/70">عقد إيجار — الرياض</p>
            </div>

            <div className="absolute -end-4 bottom-28 hidden items-center gap-2 rounded-xl border border-whatsapp/30 bg-abyss/85 px-3 py-2 backdrop-blur sm:flex">
              <WhatsAppGlyph className="size-4 text-whatsapp" />
              <span className="text-[0.7rem] text-ivory/75">أُرسل في المحادثة</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
