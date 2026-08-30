import {
  Check,
  ChevronRight,
  Download,
  Images,
  Layers,
  PenLine,
  Plus,
  ScanLine,
  Search,
  Stamp,
  Type,
} from "lucide-react";

import { DateStamp } from "@/components/brand/date-stamp";
import { SignatureMark } from "@/components/brand/signature-mark";
import { cn } from "@/lib/utils";
import { SAMPLE_DOC_ID, toEasternNumerals } from "@/lib/format";

/* ------------------------------------------------------------------ */
/* عناصر مشتركة داخل الشاشات                                            */
/* ------------------------------------------------------------------ */

function ScreenTitle({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <header className="flex items-center justify-between px-4 pb-3 pt-1">
      <span
        aria-hidden
        className="grid size-7 place-items-center rounded-lg bg-ivory/10 text-ivory/70"
      >
        <ChevronRight className="size-4" />
      </span>
      <span className="text-[0.78rem] font-semibold text-ivory">{title}</span>
      {action ?? <span className="size-7" />}
    </header>
  );
}

function PaperLines({ count = 7, className }: { count?: number; className?: string }) {
  const widths = [100, 92, 96, 74, 88, 98, 60];
  return (
    <div className={cn("flex flex-col gap-2", className)} aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="h-[3px] rounded-full bg-ink/15"
          style={{ width: `${widths[i % widths.length]}%` }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 01 — الشاشة الرئيسية                                                 */
/* ------------------------------------------------------------------ */

const recentDocs = [
  { name: "عقد إيجار — الرياض", id: "#WQ-0042", state: "SIGNED" as const },
  { name: "اتفاقية عمل حر", id: "#WQ-0041", state: "SIGNED" as const },
  { name: "محضر تسليم", id: "#WQ-0040", state: "DRAFT" as const },
];

export function HomeScreen() {
  return (
    <div className="flex size-full flex-col bg-ink">
      <div className="flex items-center justify-between px-4 pb-4 pt-2">
        <div className="flex flex-col leading-none">
          <span className="text-base font-bold text-ivory">وقّع</span>
          <span
            className="font-mono text-[0.42rem] text-gold"
            style={{ letterSpacing: "0.4em" }}
          >
            WAQQIE
          </span>
        </div>
        <span className="grid size-7 place-items-center rounded-full bg-gold/15 text-[0.6rem] font-semibold text-gold">
          ش
        </span>
      </div>

      <div className="mx-4 mb-4 flex items-center gap-2 rounded-xl border border-ivory/10 bg-abyss/50 px-3 py-2">
        <Search className="size-3.5 text-ivory/40" />
        <span className="text-[0.68rem] text-ivory/40">ابحث في مستنداتك…</span>
      </div>

      <p
        className="mb-2 px-4 font-mono text-[0.55rem] text-ivory/45"
        style={{ letterSpacing: "0.22em" }}
      >
        RECENT
      </p>

      <div className="flex flex-col gap-2 px-4">
        {recentDocs.map((d) => (
          <div
            key={d.id}
            className="flex items-center gap-3 rounded-xl border border-ivory/10 bg-card px-3 py-2.5"
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-ivory/10">
              <span className="h-4 w-3 rounded-[2px] bg-ivory/70" />
            </span>
            <span className="flex min-w-0 flex-1 flex-col leading-tight">
              <span className="truncate text-[0.68rem] font-medium text-ivory">{d.name}</span>
              <span className="font-mono text-[0.52rem] text-ivory/40 ltr-num">{d.id}</span>
            </span>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 font-mono text-[0.45rem]",
                d.state === "SIGNED" ? "bg-gold/15 text-gold" : "bg-ivory/10 text-ivory/45",
              )}
              style={{ letterSpacing: "0.12em" }}
            >
              {d.state}
            </span>
          </div>
        ))}
      </div>

      {/* زر الإجراء الموحّد */}
      <div className="mt-auto flex flex-col items-center gap-2 pb-6">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full border border-ivory/10 bg-abyss/60 px-3 py-1.5 text-[0.6rem] text-ivory/70">
            <ScanLine className="size-3 text-gold" />
            مسح
          </span>
          <span className="grid size-12 place-items-center rounded-full bg-gold text-ink shadow-[0_10px_30px_-6px_color-mix(in_oklab,var(--wq-gold)_70%,transparent)]">
            <Plus className="size-6" strokeWidth={2.4} />
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-ivory/10 bg-abyss/60 px-3 py-1.5 text-[0.6rem] text-ivory/70">
            <Images className="size-3 text-gold" />
            استيراد
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 02 — الماسح الذكي                                                    */
/* ------------------------------------------------------------------ */

export function ScanScreen() {
  const corner = "absolute size-5 border-gold";
  return (
    <div className="relative flex size-full flex-col bg-black">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,color-mix(in_oklab,var(--wq-ink)_75%,transparent),#000_75%)]"
      />
      <div className="relative z-10 flex justify-center pt-1">
        <span className="rounded-full bg-black/60 px-3 py-1 text-[0.58rem] text-ivory/80">
          وجّه الكاميرا نحو المستند
        </span>
      </div>

      {/* الورقة المكتشفة + أركان الكشف الذكي */}
      <div className="relative z-10 flex flex-1 items-center justify-center">
        <div className="relative h-[58%] w-[68%] rotate-[-3deg]">
          <div className="size-full overflow-hidden rounded-sm bg-ivory/90 p-3 shadow-[0_20px_60px_rgba(0,0,0,.6)]">
            <div className="mb-3 h-2 w-1/2 rounded-full bg-ink/25" />
            <PaperLines count={7} />
          </div>
          <span className={cn(corner, "-start-1.5 -top-1.5 rounded-ss-md border-s-2 border-t-2")} />
          <span className={cn(corner, "-end-1.5 -top-1.5 rounded-se-md border-e-2 border-t-2")} />
          <span className={cn(corner, "-bottom-1.5 -start-1.5 rounded-es-md border-b-2 border-s-2")} />
          <span className={cn(corner, "-bottom-1.5 -end-1.5 rounded-ee-md border-b-2 border-e-2")} />
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-8 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--wq-gold)_45%,transparent),transparent)] motion-safe:animate-[float_3.5s_ease-in-out_infinite]"
          />
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between px-6 pb-7">
        <span className="font-mono text-[0.6rem] text-ivory/60 ltr-num">
          {toEasternNumerals("2/3")}
        </span>
        <span className="grid size-14 place-items-center rounded-full border-2 border-ivory/80">
          <span className="size-11 rounded-full bg-ivory" />
        </span>
        <Images className="size-5 text-ivory/60" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 03 — لوحة التوقيع                                                    */
/* ------------------------------------------------------------------ */

const signTools = [
  { icon: PenLine, label: "توقيع", active: true },
  { icon: Type, label: "نص", active: false },
  { icon: Stamp, label: "ختم", active: false },
  { icon: Layers, label: "صفحات", active: false },
];

export function SignScreen() {
  return (
    <div className="flex size-full flex-col bg-ink">
      <ScreenTitle
        title="عقد إيجار.pdf"
        action={
          <span className="grid size-7 place-items-center rounded-lg bg-gold text-ink">
            <Check className="size-4" strokeWidth={3} />
          </span>
        }
      />

      <div className="mx-4 flex-1 overflow-hidden rounded-lg bg-ivory p-4">
        <div className="mb-3 h-2 w-2/5 rounded-full bg-ink/30" />
        <PaperLines count={6} />
        <div className="mt-5 border-t border-dashed border-ink/20 pt-3">
          <span className="font-mono text-[0.5rem] text-ink/45 ltr-num">SIGNATURE</span>
          <div className="relative h-14">
            <SignatureMark className="absolute inset-0 h-14" />
          </div>
        </div>
      </div>

      <div className="mx-4 my-4 flex items-center justify-between rounded-xl border border-ivory/10 bg-card px-2 py-2">
        {signTools.map((t) => (
          <span
            key={t.label}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 rounded-lg py-1.5 text-[0.55rem]",
              t.active ? "bg-gold/15 text-gold" : "text-ivory/50",
            )}
          >
            <t.icon className="size-4" />
            {t.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 04 — الختم والتاريخ                                                  */
/* ------------------------------------------------------------------ */

export function StampScreen() {
  return (
    <div className="flex size-full flex-col bg-ink">
      <ScreenTitle title="ختم التاريخ" />
      <div className="flex-1 px-4">
        <DateStamp compact />
        <p className="mt-4 rounded-lg border border-ivory/10 bg-card px-3 py-2 text-[0.6rem] leading-relaxed text-ivory/55">
          يُطبَّق الختم على الصفحة الحالية، ويمكنك سحبه إلى أي موضع في الوثيقة.
        </p>
      </div>
      <div className="p-4">
        <span className="flex w-full items-center justify-center rounded-xl bg-gold py-2.5 text-[0.72rem] font-semibold text-ink">
          تثبيت الختم
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 05 — تم التوقيع                                                      */
/* ------------------------------------------------------------------ */

export function SuccessScreen() {
  return (
    <div className="relative flex size-full flex-col items-center justify-center gap-5 bg-ink px-5 text-center">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,color-mix(in_oklab,var(--wq-gold)_16%,transparent),transparent_65%)]"
      />

      <span className="relative grid size-16 place-items-center rounded-full border border-gold/40 bg-gold/10">
        <Check className="size-8 text-gold" strokeWidth={2.6} />
      </span>

      {/* اللمسة الخطية الوحيدة في المنتج كله — دليل الهوية، الفصل 04 */}
      <p className="relative font-calligraphy text-2xl leading-relaxed text-gold">
        تم التوقيع بنجاح
      </p>

      <span className="relative flex items-center gap-2 rounded-full border border-ivory/10 bg-abyss/60 px-3 py-1.5">
        <span className="text-[0.62rem] text-ivory/70">عقد إيجار.pdf</span>
        <span className="font-mono text-[0.55rem] text-gold ltr-num">{SAMPLE_DOC_ID}</span>
      </span>

      <div className="relative mt-2 flex w-full flex-col gap-2">
        <span className="flex w-full items-center justify-center gap-2 rounded-xl bg-whatsapp py-2.5 text-[0.72rem] font-semibold text-[#06301a]">
          <WhatsAppGlyph />
          إرسال عبر واتساب
        </span>
        <span className="flex w-full items-center justify-center gap-2 rounded-xl border border-gold/40 py-2.5 text-[0.72rem] font-semibold text-gold">
          <Download className="size-4" />
          حفظ في الملفات
        </span>
      </div>
    </div>
  );
}

export function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-4 fill-current", className)} aria-hidden>
      <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2 22l5.36-1.4a9.8 9.8 0 0 0 4.68 1.2c5.43 0 9.84-4.4 9.84-9.84 0-2.63-1.02-5.1-2.88-6.96A9.78 9.78 0 0 0 12.04 2m0 1.8c2.15 0 4.17.84 5.69 2.36a7.99 7.99 0 0 1 2.36 5.68c0 4.45-3.62 8.06-8.06 8.06a8.1 8.1 0 0 1-4.1-1.12l-.3-.18-3.05.8.82-2.98-.2-.3a8.02 8.02 0 0 1-1.24-4.3c0-4.44 3.62-8.05 8.07-8.05m-3.1 4.03c-.15 0-.38.06-.58.28-.2.22-.77.75-.77 1.83s.79 2.12.9 2.27c.11.15 1.55 2.37 3.76 3.32.53.23.94.36 1.26.46.53.17 1.01.15 1.39.09.42-.06 1.3-.53 1.49-1.05.18-.51.18-.95.13-1.05-.06-.09-.2-.15-.42-.26-.22-.11-1.31-.65-1.51-.72-.2-.08-.35-.11-.5.1-.14.23-.56.73-.69.88-.13.15-.25.17-.47.06-.22-.11-.93-.34-1.77-1.09-.65-.58-1.1-1.3-1.22-1.52-.13-.22-.02-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.23.22-.38.08-.15.04-.28-.02-.39-.05-.11-.5-1.2-.68-1.65-.18-.43-.36-.37-.5-.38h-.42Z" />
    </svg>
  );
}

export const screenMap = {
  home: HomeScreen,
  scan: ScanScreen,
  sign: SignScreen,
  stamp: StampScreen,
  success: SuccessScreen,
} as const;

export type ScreenId = keyof typeof screenMap;
