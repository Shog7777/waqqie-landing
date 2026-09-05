import { Check } from "lucide-react";

import { SectionLight, Surface } from "@/components/brand/surface";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { plans, sections, ui } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden bg-abyss py-24 sm:py-32">
      <SectionLight position="end" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading {...sections.pricing} align="center" className="mx-auto items-center" />

        <div className="mt-16 grid gap-5 md:grid-cols-2 md:items-stretch">
          {plans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.08} className="h-full">
              <Surface
                glow={plan.highlighted}
                className={cn(
                  "flex h-full flex-col p-8",
                  plan.highlighted && "bg-card shadow-[0_34px_90px_-38px_rgba(212,162,78,.45)]",
                )}
              >
                {plan.highlighted ? (
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[2px] overflow-hidden bg-gold/45"
                  >
                    <span className="fx-travel absolute inset-y-0 w-1/3 bg-[linear-gradient(to_left,transparent,var(--wq-gold),transparent)]" />
                  </span>
                ) : null}

                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-ivory">{plan.name}</h3>
                  {plan.highlighted ? (
                    <span
                      className="font-mono text-[0.6rem] uppercase text-ivory/70"
                      style={{ letterSpacing: "0.2em" }}
                    >
                      {ui.planBadge}
                    </span>
                  ) : null}
                </div>

                <p
                  className={cn(
                    "mt-5 text-[2.2rem] font-bold leading-none",
                    plan.highlighted ? "font-mono text-gold" : "text-ivory",
                  )}
                >
                  {plan.price}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-ivory/70">{plan.note}</p>

                <ul className="mt-8 flex flex-1 flex-col gap-3.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-ivory/75">
                      <Check
                        className={cn(
                          "mt-1 size-4 shrink-0",
                          plan.highlighted ? "text-gold" : "text-ivory/60",
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
                  className="mt-9 h-11 w-full text-sm font-semibold"
                >
                  <a href="#download">{plan.cta}</a>
                </Button>
              </Surface>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-10 max-w-[70ch] text-center text-xs leading-relaxed text-ivory/70">
            {ui.pricingNote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
