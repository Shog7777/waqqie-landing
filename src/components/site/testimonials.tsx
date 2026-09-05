import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { sections, testimonials } from "@/lib/content";

/**
 * الآراء كقيود في سجل، لا كبطاقات اقتباس. كل قيد يبدأ بخط شعري، والاسم
 * والصفة في عمود جانبي كما تُدوَّن أطراف المستند.
 */
export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading {...sections.testimonials} />

        <div className="mt-14">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.06}>
              <figure className="grid gap-x-10 gap-y-3 border-t hairline py-8 md:grid-cols-[11rem_1fr]">
                <figcaption className="flex flex-col">
                  <span className="text-sm font-semibold text-ivory">{t.name}</span>
                  <span className="mt-0.5 text-xs text-ivory/60">{t.role}</span>
                </figcaption>
                <blockquote className="max-w-[60ch] text-[0.98rem] leading-[2] text-ivory/75">
                  {t.quote}
                </blockquote>
              </figure>
            </Reveal>
          ))}
          <div className="border-t hairline" />
        </div>
      </div>
    </section>
  );
}
