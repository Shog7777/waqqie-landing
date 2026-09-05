import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { sections, steps } from "@/lib/content";

/**
 * الخطوات كإجراء مرقّم في مستند: رقم كبير في الهامش وخط شعري يفصل كل خطوة،
 * بدل أيقونات داخل مربّعات دائرية.
 */
export function HowItWorks() {
  return (
    <section id="how" className="relative border-y hairline bg-abyss/40 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading {...sections.how} />

        <ol className="mt-14 grid gap-x-10 gap-y-0 sm:grid-cols-2">
          {steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.n}
              delay={i * 0.07}
              className="border-t hairline py-8"
            >
              <div className="flex items-baseline gap-4">
                <span
                  className="font-mono text-[1.55rem] font-semibold leading-none text-gold ltr-num"
                  aria-hidden
                >
                  {step.n}
                </span>
                <h3 className="text-lg font-semibold text-ivory">{step.title}</h3>
              </div>
              <p className="mt-3 max-w-[46ch] text-sm leading-[2] text-ivory/70 sm:ps-[3.4rem]">
                {step.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
