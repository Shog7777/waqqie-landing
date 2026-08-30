import { Check, Sparkles } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { plans } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <section id="pricing" className="relative border-y border-ivory/10 bg-abyss/40 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Pricing"
          align="center"
          title={
            <>
              ابدأ مجانًا، وارتقِ <span className="text-gradient-gold">حين تحتاج</span>
            </>
          }
          description="الباقة الأساسية تكفي للاستخدام اليومي. Pro لمن يوقّع كثيرًا ويحتاج أدوات أوسع."
          className="mx-auto items-center text-center"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 md:items-stretch">
          {plans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.1} className="h-full">
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border p-8 transition-all duration-300",
                  plan.highlighted
                    ? "border-gold/45 bg-card shadow-[0_30px_80px_-40px_color-mix(in_oklab,var(--wq-gold)_75%,transparent)]"
                    : "border-ivory/10 bg-card/60 hover:border-ivory/20",
                )}
              >
                {plan.highlighted ? (
                  <span className="absolute -top-3 start-8 inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-[0.7rem] font-semibold text-ink">
                    <Sparkles className="size-3.5" />
                    الأكثر اختيارًا
                  </span>
                ) : null}

                <h3 className="text-xl font-bold text-ivory">{plan.name}</h3>
                <p
                  className={cn(
                    "mt-3 text-3xl font-bold",
                    plan.highlighted ? "text-gradient-gold font-mono" : "text-ivory",
                  )}
                >
                  {plan.price}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-ivory/62">{plan.note}</p>

                <span aria-hidden className="gold-divider my-7 h-px w-full opacity-40" />

                <ul className="flex flex-1 flex-col gap-3.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-ivory/70">
                      <span
                        className={cn(
                          "mt-0.5 grid size-5 shrink-0 place-items-center rounded-md",
                          plan.highlighted ? "bg-gold/15 text-gold" : "bg-ivory/8 text-ivory/70",
                        )}
                      >
                        <Check className="size-3" strokeWidth={3} />
                      </span>
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
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-8 text-center text-xs text-ivory/65">
            تُدار الاشتراكات والمدفوعات عبر متاجر التطبيقات الرسمية — App Store و Google Play —
            ويمكن الإلغاء في أي وقت من إعدادات حسابك في المتجر.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
