import { DateStamp } from "@/components/brand/date-stamp";
import { WhatsAppGlyph } from "@/components/brand/screens";
import { SectionLight, Surface } from "@/components/brand/surface";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { featureExtras, features, sections } from "@/lib/content";

const articles = [
  { num: "٠١", ...features.whatsapp },
  { num: "٠٢", ...features.scanner },
  { num: "٠٣", ...features.signature },
  { num: "٠٤", ...features.stamp },
  { num: "٠٥", ...features.privacy },
  { num: "٠٦", ...features.pages },
] as const;

export function Features() {
  return (
    <section id="features" className="relative overflow-hidden bg-abyss py-24 sm:py-32">
      <SectionLight position="end" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading {...sections.features} />

        <ol className="mt-14 grid gap-5 md:grid-cols-2">
          {articles.map((item, i) => (
            <Reveal as="li" key={item.num} delay={i * 0.05}>
              <Surface className="h-full p-7">
                <div className="flex items-baseline gap-4">
                  <span
                    aria-hidden
                    className="font-mono text-[1.5rem] font-semibold leading-none text-gold ltr-num"
                  >
                    {item.num}
                  </span>
                  <h3 className="text-[1.05rem] font-semibold text-ivory">{item.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-[2] text-ivory/70">{item.body}</p>
              </Surface>
            </Reveal>
          ))}
        </ol>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <Surface className="h-full p-7">
              <p className="mb-5 flex items-center gap-2 text-xs text-ivory/70">
                <WhatsAppGlyph className="size-3.5 shrink-0 text-whatsapp" />
                الأخضر محصور في هذا السياق وحده، كما ينصّ دليل الهوية.
              </p>
              <div className="flex flex-col gap-2.5">
                <div className="flex justify-start">
                  <span className="max-w-[80%] rounded-2xl rounded-ss-sm bg-ivory/8 px-4 py-2.5 text-sm text-ivory/75">
                    {featureExtras.chat.incoming}
                  </span>
                </div>
                <div className="flex justify-end">
                  <span className="flex max-w-[85%] items-center gap-3 rounded-2xl rounded-se-sm border border-whatsapp/25 bg-whatsapp/10 px-4 py-2.5">
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-ivory">
                      <span className="h-4 w-3 rounded-[2px] bg-ink/70" />
                    </span>
                    <span className="flex flex-col leading-tight">
                      <span className="text-sm text-ivory">{featureExtras.chat.fileName}</span>
                      <span className="font-mono text-[0.62rem] text-ivory/75 ltr-num">
                        {featureExtras.chat.fileMeta}
                      </span>
                    </span>
                  </span>
                </div>
              </div>
            </Surface>
          </Reveal>

          <Reveal delay={0.08}>
            <Surface glow className="h-full p-7">
              <p className="mb-5 text-xs text-ivory/70">{featureExtras.stampHint}</p>
              <DateStamp />
            </Surface>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
