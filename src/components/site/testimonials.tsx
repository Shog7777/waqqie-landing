import { SectionLight, Surface } from "@/components/brand/surface";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { sections, testimonials } from "@/lib/content";

export function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden bg-abyss py-24 sm:py-32">
      <SectionLight position="start" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading {...sections.testimonials} />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.07} className="h-full">
              <Surface className="flex h-full flex-col p-7">
                <blockquote className="flex-1 text-sm leading-[2] text-ivory/75">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t hairline pt-4">
                  <span className="grid size-9 place-items-center rounded-full bg-gold/12 text-xs font-semibold text-gold">
                    {t.initials}
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="text-sm font-medium text-ivory">{t.name}</span>
                    <span className="text-xs text-ivory/65">{t.role}</span>
                  </span>
                </figcaption>
              </Surface>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
