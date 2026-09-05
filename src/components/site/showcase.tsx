"use client";

import { useEffect, useState } from "react";

import { PhoneFrame } from "@/components/brand/phone-frame";
import { SectionLight } from "@/components/brand/surface";
import { screenMap, type ScreenId } from "@/components/brand/screens";
import { SectionHeading } from "@/components/site/section-heading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { screens, sections } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Showcase() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section id="showcase" className="relative overflow-hidden py-24 sm:py-32">
      <SectionLight position="top" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          {...sections.showcase}
          align="center"
          className="mx-auto items-center text-center"
        />
      </div>

      <div className="relative mt-14">
        <Carousel
          setApi={setApi}
          opts={{ align: "center", loop: true, direction: "rtl" }}
          className="mx-auto w-full max-w-6xl px-4 sm:px-6"
        >
          <CarouselContent className="py-6">
            {screens.map((s, i) => {
              const Screen = screenMap[s.id as ScreenId];
              const active = i === current;
              return (
                <CarouselItem
                  key={s.id}
                  className="basis-[76%] sm:basis-[46%] lg:basis-[30%]"
                >
                  <div
                    // التمييز بالحجم لا بالشفافية: تخفيت الشريحة بـ opacity
                    // يخفض تباين كل نص داخلها ويُسقط تدقيق التباين.
                    className={cn(
                      "flex flex-col items-center gap-5 transition-all duration-500",
                      active ? "scale-100" : "scale-[0.88] saturate-[0.85]",
                    )}
                  >
                    <PhoneFrame label={s.title} className="w-[230px] sm:w-[248px]">
                      <Screen />
                    </PhoneFrame>
                    <div className="text-center">
                      <h3
                        className={cn(
                          "text-base font-semibold transition-colors",
                          active ? "text-ivory" : "text-ivory/70",
                        )}
                      >
                        {s.title}
                      </h3>
                      <p className="mt-1 max-w-[16rem] text-xs leading-relaxed text-ivory/65">
                        {s.caption}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <CarouselPrevious className="hidden size-10 border-ivory/15 bg-abyss/70 text-ivory hover:border-gold/50 hover:text-gold sm:flex" />
          <CarouselNext className="hidden size-10 border-ivory/15 bg-abyss/70 text-ivory hover:border-gold/50 hover:text-gold sm:flex" />
        </Carousel>

        {/* مؤشّرات */}
        <div className="mt-4 flex items-center justify-center">
          {screens.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => api?.scrollTo(i)}
              aria-label={`اذهب إلى ${s.title}`}
              aria-current={i === current}
              className="group grid h-11 w-11 place-items-center"
            >
              <span
                className={cn(
                  "block h-1.5 rounded-full transition-all duration-300",
                  i === current
                    ? "w-8 bg-gold"
                    : "w-1.5 bg-ivory/25 group-hover:bg-ivory/45",
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
