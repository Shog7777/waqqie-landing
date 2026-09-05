import { Check } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { plans, sections, ui } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * الباقتان عمودان في جدول لا بطاقتان طافيتان. الباقة المميّزة يعلوها خط ذهبي
 * تحمل تسميتها، كما يُعلَّم البند المختار في عرض سعر مطبوع.
 */
export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading {...sections.pricing} />

        <div className="mt-14 grid gap-x-12 gap-y-14 md:grid-cols-2">
          {plans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.08} className="flex h-full flex-col">
              <div
                className={cn(
                  "flex items-center justify-between border-t-2 pb-4 pt-4",
                  plan.highlighted
                    ? "border-gold"
                    : "border-[color-mix(in_oklab,var(--wq-ivory)_18%,transparent)]",
                )}
              >
                <h3 className="text-lg font-semibold text-ivory">{plan.name}</h3>
                {plan.highlighted ? (
                  <span
                    className="font-mono text-[0.62rem] uppercase text-ivory/70"
                    style={{ letterSpacing: "0.2em" }}
                  >
                    {ui.planBadge}
                  </span>
                ) : null}
              </div>

              <p
                className={cn(
                  "text-[2rem] font-bold leading-none",
                  plan.highlighted ? "font-mono text-gold" : "text-ivory",
                )}
              >
                {plan.price}
              </p>
              <p className="mt-3 max-w-[38ch] text-xs leading-relaxed text-ivory/65">
                {plan.note}
              </p>

              <ul className="mt-8 flex flex-1 flex-col">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 border-t hairline py-3.5 text-sm text-ivory/75"
                  >
                    <Check
                      className={cn(
                        "mt-1 size-4 shrink-0",
                        plan.highlighted ? "text-gold" : "text-ivory/55",
                      )}
                      strokeWidth={2.5}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                asChild
                size="lg"
                variant={plan.highlighted ? "default" : "outline"}
                className="mt-8 h-11 w-full text-sm font-semibold"
              >
                <a href="#download">{plan.cta}</a>
              </Button>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-12 max-w-[70ch] border-t hairline pt-5 text-xs leading-relaxed text-ivory/65">
            {ui.pricingNote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
