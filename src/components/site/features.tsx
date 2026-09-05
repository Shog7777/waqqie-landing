"use client";

import { useState } from "react";
import { Tabs } from "radix-ui";

import { SectionLight, Surface } from "@/components/brand/surface";
import { Reveal } from "@/components/motion/reveal";
import { FeatureStage, type FeatureId } from "@/components/site/feature-stage";
import { SectionHeading } from "@/components/site/section-heading";
import { features, sections } from "@/lib/content";

const articles = [
  { id: "whatsapp", num: "٠١", ...features.whatsapp },
  { id: "scanner", num: "٠٢", ...features.scanner },
  { id: "signature", num: "٠٣", ...features.signature },
  { id: "stamp", num: "٠٤", ...features.stamp },
  { id: "privacy", num: "٠٥", ...features.privacy },
  { id: "pages", num: "٠٦", ...features.pages },
] as const satisfies readonly { id: FeatureId; num: string; title: string; body: string }[];

/**
 * مستكشف المميزات: فهرس على جانب، ومسرح واحد على الجانب الآخر.
 *
 * كانت الميزات ستّ بطاقات نصّية متطابقة فوق بعضها، فطال القسم وصار سردًا
 * يُقرأ لا منتجًا يُرى. الآن الميزة الواحدة تأخذ المساحة كلها حين تُختار،
 * فانخفض ارتفاع القسم إلى نحو نصفه وربح كل نصّ مشهدًا يثبته.
 *
 * التبويبات من Radix: أدوار tablist/tab/tabpanel صحيحة، وتنقّل بالأسهم
 * يحترم اتجاه الصفحة من اليمين لليسار عبر DirectionProvider.
 */
export function Features() {
  const [active, setActive] = useState<string>(articles[0].id);

  return (
    <section id="features" className="relative overflow-hidden bg-abyss py-24 sm:py-32">
      <SectionLight position="end" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading {...sections.features} />

        <Reveal className="mt-12">
          <Tabs.Root
            value={active}
            onValueChange={setActive}
            orientation="vertical"
            className="grid items-start gap-4 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:gap-6"
          >
            <Tabs.List
              aria-label={`${sections.features.titleLead} ${sections.features.titleAccent}`}
              className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0 lg:pb-0"
            >
              {articles.map((item) => (
                <Tabs.Trigger
                  key={item.id}
                  value={item.id}
                  className="group relative flex shrink-0 items-center gap-3.5 rounded-lg px-4 py-3.5 text-start outline-none transition-colors duration-300 hover:bg-card/45 focus-visible:ring-2 focus-visible:ring-gold data-[state=active]:bg-card/75 lg:w-full lg:gap-4"
                >
                  <span
                    aria-hidden
                    className="absolute inset-y-2.5 start-0 w-[2px] origin-center scale-y-0 rounded-full bg-gold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[state=active]:scale-y-100"
                  />
                  <span
                    aria-hidden
                    className="font-mono text-[1.5rem] font-semibold leading-none text-gold/70 transition-colors duration-300 group-data-[state=active]:text-gold ltr-num"
                  >
                    {item.num}
                  </span>
                  <span className="whitespace-nowrap text-[0.98rem] font-semibold text-ivory/70 transition-colors duration-300 group-data-[state=active]:text-ivory lg:whitespace-normal">
                    {item.title}
                  </span>
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            {/* عدّاد يوازن العمود ويقول أين أنت من الستّ */}
            <p
              aria-hidden
              className="hidden items-center gap-4 px-4 lg:order-3 lg:col-start-1 lg:row-start-2 lg:mt-2 lg:flex"
            >
              {/* الترتيب بـ flex لا بخوارزمية الاتجاه: الأرقام المشرقية داخل نصّ
                  عربي تُعاد ترتيبها، فتُقرأ الكسرة مقلوبة لو تُركت نصًّا واحدًا */}
              <span
                dir="ltr"
                className="flex items-baseline gap-1.5 font-mono text-[1.5rem] font-semibold leading-none"
              >
                <span className="text-gold">
                  {articles.find((a) => a.id === active)?.num}
                </span>
                <span className="text-gold/70">/</span>
                <span className="text-gold/70">٠٦</span>
              </span>
              <span className="h-px flex-1 bg-[color-mix(in_oklab,var(--wq-gold)_28%,transparent)]" />
            </p>

            {articles.map((item) => (
              <Tabs.Content
                key={item.id}
                value={item.id}
                className="outline-none lg:col-start-2 lg:row-span-2 lg:row-start-1"
              >
                <Surface className="hover:translate-y-0">
                  <FeatureStage id={item.id} />
                  <p
                    className="stage-in border-t hairline px-5 py-6 text-sm leading-[2] text-ivory/75 sm:px-8"
                    style={{ animationDelay: "0.18s" }}
                  >
                    {item.body}
                  </p>
                </Surface>
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </Reveal>
      </div>
    </section>
  );
}
