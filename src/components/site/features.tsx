import { DateStamp } from "@/components/brand/date-stamp";
import { WhatsAppGlyph } from "@/components/brand/screens";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { featureExtras, features, sections } from "@/lib/content";

/**
 * البنود مرقّمة كمواد عقد، مفصولة بخطوط شعرية لا ببطاقات.
 * الترقيم هنا يحمل معنى: هذه قائمة قدرات مرقّمة في وثيقة، لا زخرفة.
 */
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
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading {...sections.features} />

        <ol className="mt-14 grid gap-x-12 md:grid-cols-2">
          {articles.map((item, i) => (
            <Reveal
              as="li"
              key={item.num}
              delay={i * 0.05}
              className="grid gap-x-6 gap-y-2 border-t hairline py-6 sm:grid-cols-[3.2rem_1fr]"
            >
              <span
                className="font-mono text-[1.5rem] font-semibold leading-none text-gold ltr-num"
                aria-hidden
              >
                {item.num}
              </span>
              <div>
                <h3 className="text-lg font-semibold text-ivory">{item.title}</h3>
                <p className="mt-2 text-sm leading-[2] text-ivory/70">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>

        {/* عيّنتان توضيحيتان، معنونتان كأشكال في دليل رسمي */}
        <div className="mt-16 grid gap-x-10 gap-y-12 lg:grid-cols-2">
          <Reveal className="flex flex-col">
            <Figure caption="شكل ١ — مشاركة النسخة الموقّعة داخل المحادثة" />
            <div className="mt-5 flex flex-col gap-2.5">
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
              <p className="mt-3 flex items-center gap-2 text-xs text-ivory/60">
                <WhatsAppGlyph className="size-3.5 text-whatsapp" />
                الأخضر محصور في هذا السياق وحده، كما ينصّ دليل الهوية.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="flex flex-col">
            <Figure caption="شكل ٢ — ختم التاريخ، بدّل الخيارات وشاهد الأثر" />
            <div className="mt-5">
              <DateStamp />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** عنوان عيّنة: خط شعري ثم تسمية صغيرة، كما تُعنون الأشكال في الأدلة المطبوعة. */
function Figure({ caption }: { caption: string }) {
  return (
    <div className="flex items-center gap-3 border-t hairline-gold pt-3">
      <span className="text-xs text-ivory/70">{caption}</span>
    </div>
  );
}
