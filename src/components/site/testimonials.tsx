import { Quote } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { sections, testimonials } from "@/lib/content";

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          {...sections.testimonials}
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08} className="h-full">
              <figure className="group flex h-full flex-col rounded-2xl border border-ivory/10 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30">
                <Quote className="mb-4 size-6 rotate-180 text-gold/50" />
                <blockquote className="flex-1 text-sm leading-[2] text-ivory/75">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-ivory/10 pt-4">
                  <span className="grid size-9 place-items-center rounded-full bg-gold/12 text-xs font-semibold text-gold">
                    {t.initials}
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="text-sm font-medium text-ivory">{t.name}</span>
                    <span className="text-xs text-ivory/62">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
