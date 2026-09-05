import { SectionLight, Surface } from "@/components/brand/surface";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { sections, steps } from "@/lib/content";

export function HowItWorks() {
  return (
    <section id="how" className="relative overflow-hidden bg-abyss py-24 sm:py-32">
      <SectionLight position="start" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading {...sections.how} align="center" className="mx-auto items-center" />

        <ol className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal as="li" key={step.n} delay={i * 0.08} className="h-full">
              <Surface className="flex h-full flex-col p-7">
                <span
                  aria-hidden
                  className="font-mono text-[1.7rem] font-semibold leading-none text-gold ltr-num"
                >
                  {step.n}
                </span>
                <h3 className="mt-5 text-base font-semibold text-ivory">{step.title}</h3>
                <p className="mt-3 text-sm leading-[2] text-ivory/70">{step.body}</p>
              </Surface>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
