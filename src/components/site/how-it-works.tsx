import { PenLine, ScanLine, Send, Stamp } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { sections, steps } from "@/lib/content";

const icons = [ScanLine, PenLine, Stamp, Send];

export function HowItWorks() {
  return (
    <section id="how" className="relative border-y border-ivory/10 bg-abyss/40 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          {...sections.how}
          align="center"
          className="mx-auto items-center text-center"
        />

        <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
          {/* الخط الواصل */}
          <span
            aria-hidden
            className="absolute inset-x-[12%] top-7 hidden h-px bg-[linear-gradient(to_left,transparent,color-mix(in_oklab,var(--wq-gold)_45%,transparent),transparent)] md:block"
          />

          {steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <Reveal as="li" key={step.n} delay={i * 0.1} className="relative">
                <div className="flex flex-col items-center text-center md:items-start md:text-start">
                  <span className="relative z-10 mb-5 grid size-14 place-items-center rounded-2xl border border-gold/30 bg-ink text-gold shadow-[0_0_0_6px_var(--wq-abyss)]">
                    <Icon className="size-6" />
                  </span>
                  <span
                    className="mb-2 font-mono text-xs text-gold/70 ltr-num"
                    style={{ letterSpacing: "0.25em" }}
                  >
                    {step.n}
                  </span>
                  <h3 className="mb-2 text-lg font-semibold text-ivory">{step.title}</h3>
                  <p className="max-w-xs text-sm leading-relaxed text-ivory/70">{step.body}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
