import { Check } from "lucide-react";

import { PaperSheet } from "@/components/brand/paper";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { plans, sections, ui } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * الباقتان جدول أسعار مطبوع على ورق، لا بطاقتان طافيتان. الباقة المميّزة
 * يعلوها خط داكن تحمل تسميتها، كما يُعلَّم البند المختار في عرض سعر رسمي.
 */
export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading {...sections.pricing} />

        <Reveal delay={0.1} className="mt-14">
          <PaperSheet chapter="الباقات" page="٠٢">
            <div className="grid gap-x-14 gap-y-12 md:grid-cols-2">
              {plans.map((plan) => (
                <div key={plan.id} className="flex h-full flex-col">
                  <div
                    className={cn(
                      "flex items-center justify-between border-t-2 pb-4 pt-4",
                      plan.highlighted ? "border-card" : "border-ink/25",
                    )}
                  >
                    <h3 className="text-lg font-semibold text-ink">{plan.name}</h3>
                    {plan.highlighted ? (
                      <span
                        className="font-mono text-[0.6rem] uppercase text-ink/70"
                        style={{ letterSpacing: "0.2em" }}
                      >
                        {ui.planBadge}
                      </span>
                    ) : null}
                  </div>

                  <p
                    className={cn(
                      "text-[2.1rem] font-bold leading-none text-ink",
                      plan.highlighted && "font-mono",
                    )}
                  >
                    {plan.price}
                  </p>
                  <p className="mt-3 max-w-[38ch] text-xs leading-relaxed text-ink/70">
                    {plan.note}
                  </p>

                  <ul className="mt-8 flex flex-1 flex-col">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-3 border-t border-ink/12 py-3.5 text-sm text-ink/80"
                      >
                        <Check className="mt-1 size-4 shrink-0 text-card" strokeWidth={2.5} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    size="lg"
                    className={cn(
                      "mt-8 h-11 w-full text-sm font-semibold",
                      plan.highlighted
                        ? "bg-ink text-ivory hover:bg-card"
                        : "border border-ink/30 bg-transparent text-ink hover:bg-ink/10",
                    )}
                  >
                    <a href="#download">{plan.cta}</a>
                  </Button>
                </div>
              ))}
            </div>

            <p className="mt-12 max-w-[74ch] border-t border-ink/12 pt-5 text-xs leading-relaxed text-ink/70">
              {ui.pricingNote}
            </p>
          </PaperSheet>
        </Reveal>
      </div>
    </section>
  );
}
