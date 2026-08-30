import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs, site } from "@/lib/content";

export function Faq() {
  return (
    <section id="faq" className="relative border-t border-ivory/10 bg-abyss/40 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="FAQ"
            title={
              <>
                أسئلة يطرحها <span className="text-gradient-gold">أغلب المستخدمين</span>
              </>
            }
            description="لم تجد إجابتك؟ راسلنا وسنرد خلال يوم عمل."
          />
          <Reveal delay={0.15}>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-gold/30 bg-abyss/70 px-4 py-2.5 text-sm text-gold transition-colors hover:border-gold/60 hover:bg-abyss"
            >
              <span className="font-mono ltr-num">{site.email}</span>
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="w-full" defaultValue="faq-0">
            {faqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`faq-${i}`}
                className="border-b border-ivory/10 last:border-b-0"
              >
                <AccordionTrigger className="py-5 text-start text-base font-medium text-ivory hover:text-gold hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-[2] text-ivory/70">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
