import { DateStamp } from "@/components/brand/date-stamp";
import { PaperSheet, Seal } from "@/components/brand/paper";
import { WhatsAppGlyph } from "@/components/brand/screens";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { featureExtras, features, sections, site } from "@/lib/content";

/**
 * البنود مرقّمة كمواد عقد، معروضة على ورقة حقيقية فوق أرضية الحبر.
 *
 * الألوان على الورق: الحبر للنص (8.96:1)، وCard Teal للأرقام (10.9:1)،
 * والذهبي للشريط والختم فقط لأنه لا يعطي على الورق إلا 2.18:1.
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
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading {...sections.features} />

        <Reveal delay={0.1} className="mt-14">
          <PaperSheet>
            <div className="relative px-6 py-12 sm:px-12 sm:py-14">
              <Seal className="absolute -bottom-4 end-2 size-28 -rotate-[9deg] sm:end-6 sm:size-36" />

              {/* ترويسة الوثيقة بالنسخة المعكوسة من الشعار، المعتمدة للورق */}
              <div className="flex items-end justify-between border-b border-ink/15 pb-5">
                <div className="flex flex-col leading-none">
                  <span className="text-xl font-bold text-ink">{site.name}</span>
                  <span
                    className="mt-1.5 font-mono text-[0.55rem] text-ink/70"
                    style={{ letterSpacing: "0.4em" }}
                  >
                    {site.latin}
                  </span>
                </div>
                <span
                  className="font-mono text-[0.6rem] uppercase text-ink/70 ltr-num"
                  style={{ letterSpacing: "0.2em" }}
                >
                  ٠١ — ٠٦
                </span>
              </div>

              <ol className="grid gap-x-12 md:grid-cols-2">
                {articles.map((item) => (
                  <li
                    key={item.num}
                    className="grid gap-x-5 gap-y-1.5 border-b border-ink/12 py-7 sm:grid-cols-[3rem_1fr]"
                  >
                    <span
                      className="font-mono text-[1.5rem] font-semibold leading-none text-card ltr-num"
                      aria-hidden
                    >
                      {item.num}
                    </span>
                    <div>
                      <h3 className="text-[1.05rem] font-semibold text-ink">{item.title}</h3>
                      <p className="mt-2 text-sm leading-[1.95] text-ink/80">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </PaperSheet>
        </Reveal>

        {/* عيّنتان على أرضية الحبر، معنونتان كأشكال في دليل مطبوع */}
        <div className="mt-20 grid gap-x-12 gap-y-14 lg:grid-cols-2">
          <Reveal className="flex flex-col">
            <Figure caption="شكل ١ — مشاركة النسخة الموقّعة داخل المحادثة" />
            <div className="mt-6 flex flex-col gap-2.5">
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
              <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-ivory/65">
                <WhatsAppGlyph className="mt-0.5 size-3.5 shrink-0 text-whatsapp" />
                الأخضر محصور في هذا السياق وحده، كما ينصّ دليل الهوية.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="flex flex-col">
            <Figure caption="شكل ٢ — ختم التاريخ، بدّل الخيارات وشاهد الأثر" />
            <div className="mt-6">
              <DateStamp />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** عنوان عيّنة: خط ذهبي شعري ثم تسمية، كما تُعنون الأشكال في الأدلة المطبوعة. */
function Figure({ caption }: { caption: string }) {
  return (
    <div className="border-t hairline-gold pt-3">
      <span className="text-xs text-ivory/70">{caption}</span>
    </div>
  );
}
