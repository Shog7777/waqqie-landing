import { Check } from "lucide-react";

import { WhatsAppGlyph } from "@/components/brand/screens";
import { hero } from "@/lib/content";
import { formatStamp } from "@/lib/format";
import { cn } from "@/lib/utils";

const stamped = formatStamp("hijri", "eastern");

/**
 * قصة التوقيع كاملة تتكرّر أمام الزائر في دورة واحدة مدتها إحدى عشرة ثانية:
 * يظهر المستند، فيمسحه شعاع الماسح وتنغلق عليه أركان الكشف، ثم يُرسم التوقيع
 * خطًا خطًا، ثم ينطبع الختم بضغطة، ثم يصل تأكيد الإرسال في المحادثة.
 *
 * هذه هي رحلة المنتج نفسها كما تصفها وثيقة التعريف: استيراد ومسح، ثم توقيع
 * وختم، ثم مشاركة عبر واتساب. كل العناصر على نفس مدة الدورة فتبقى متزامنة
 * دون أي جافاسكربت، وتتوقّف كلها عند تفعيل «تقليل الحركة».
 */
export function SigningSequence({ className }: { className?: string }) {
  return (
    <div
      className={cn("relative w-full max-w-[26rem]", className)}
      role="img"
      aria-label="عرض متحرك لرحلة التوقيع: مسح المستند، ثم التوقيع، ثم الختم، ثم الإرسال عبر واتساب"
    >
      {/* هالة تحت المشهد */}
      <div
        aria-hidden
        className="fx-pulse pointer-events-none absolute -inset-12 rounded-[4rem]"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--wq-gold) 22%, transparent), transparent 70%)",
        }}
      />

      <div
        className="seq seq-doc relative overflow-hidden rounded-2xl bg-card shadow-[0_40px_90px_-38px_rgba(0,0,0,.9)]"
        style={{ ["--scan-travel" as string]: "20rem" }}
      >
        <span
          aria-hidden
          className="absolute inset-x-8 top-0 h-px bg-[linear-gradient(to_left,transparent,color-mix(in_oklab,var(--wq-ivory)_26%,transparent),transparent)]"
        />

        <div className="relative px-7 pb-8 pt-7">
          {/* ترويسة المستند */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-ivory">{hero.docTitle}</span>
              <span className="mt-1 font-mono text-[0.58rem] text-ivory/60 ltr-num">
                {hero.docId}
              </span>
            </div>
            <span className="grid size-8 place-items-center rounded-lg bg-gold/15">
              <Check className="size-4 text-gold" strokeWidth={2.6} />
            </span>
          </div>

          {/* متن المستند */}
          <div className="relative mt-7 h-[20rem]">
            {/* أركان الكشف الذكي */}
            <span
              aria-hidden
              className="seq seq-corner absolute -start-2 -top-2 size-6 rounded-ss-md border-s-2 border-t-2 border-gold"
            />
            <span
              aria-hidden
              className="seq seq-corner absolute -end-2 -top-2 size-6 rounded-se-md border-e-2 border-t-2 border-gold"
            />
            <span
              aria-hidden
              className="seq seq-corner absolute -bottom-2 -start-2 size-6 rounded-es-md border-b-2 border-s-2 border-gold"
            />
            <span
              aria-hidden
              className="seq seq-corner absolute -bottom-2 -end-2 size-6 rounded-ee-md border-b-2 border-e-2 border-gold"
            />

            {/* شعاع الماسح */}
            <span
              aria-hidden
              className="seq seq-scan absolute inset-x-0 top-0 h-24 rounded-full"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, color-mix(in oklab, var(--wq-gold) 34%, transparent) 70%, color-mix(in oklab, var(--wq-gold) 85%, transparent))",
              }}
            />

            {/* أسطر المستند */}
            <div aria-hidden className="flex flex-col gap-3">
              {[100, 94, 88, 97, 72, 91, 64].map((w, i) => (
                <span
                  key={i}
                  className="h-[5px] rounded-full bg-ivory/12"
                  style={{ width: `${w}%` }}
                />
              ))}
            </div>

            {/* التوقيع يُرسم */}
            <div className="absolute inset-x-0 bottom-16">
              <span className="font-mono text-[0.55rem] text-ivory/70 ltr-num">SIGNATURE</span>
              <svg viewBox="0 0 210 90" className="h-16 w-full" aria-hidden>
                <path
                  className="seq seq-sign"
                  d="M8 62c14-34 24-46 31-40 6 5-4 25-11 36-6 10-2 15 6 10 9-6 16-22 22-33 5-9 10-7 9 3-1 12-6 22-1 25 6 4 15-6 21-16 5-9 11-9 12 1 1 9-2 17 3 20 6 3 14-6 20-14 5-7 11-14 16-11 5 4 1 13 6 16 4 3 12-2 20-11"
                  fill="none"
                  stroke="var(--wq-gold)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="560"
                />
              </svg>
              <span aria-hidden className="block h-px bg-gold/45" />
            </div>

            {/* الختم ينطبع */}
            <div aria-hidden className="absolute -top-1 end-1 size-[5.5rem]">
              <span className="seq seq-ring absolute inset-0 rounded-full border-2 border-gold" />
              <div className="seq seq-stamp absolute inset-0">
                <svg viewBox="0 0 120 120" className="size-full">
                  <g fill="none" stroke="var(--wq-gold)" strokeWidth="1.6" opacity="0.85">
                    <circle cx="60" cy="60" r="52" />
                    <circle cx="60" cy="60" r="45" strokeDasharray="2 5" />
                  </g>
                  <text
                    x="60"
                    y="56"
                    textAnchor="middle"
                    fill="var(--wq-gold)"
                    style={{ font: "700 24px var(--font-plex-arabic), sans-serif" }}
                  >
                    وقّع
                  </text>
                  <text
                    x="60"
                    y="76"
                    textAnchor="middle"
                    fill="var(--wq-gold)"
                    opacity="0.8"
                    style={{
                      font: "500 9px var(--font-jetbrains), monospace",
                      letterSpacing: "1px",
                    }}
                  >
                    {stamped.numeric}
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* تأكيد الإرسال */}
      <div
        aria-hidden
        className="seq seq-sent absolute -bottom-6 -start-4 flex items-center gap-3 rounded-xl border border-whatsapp/30 bg-abyss px-4 py-3 shadow-[0_20px_44px_-18px_rgba(0,0,0,.9)]"
      >
        <WhatsAppGlyph className="size-5 shrink-0 text-whatsapp" />
        <span className="flex flex-col leading-tight">
          <span className="text-[0.8rem] font-medium text-ivory">أُرسل في المحادثة</span>
          <span className="font-mono text-[0.58rem] text-ivory/65 ltr-num">
            {hero.docId} · 842 KB
          </span>
        </span>
      </div>
    </div>
  );
}
