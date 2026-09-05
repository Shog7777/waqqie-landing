import type { ReactNode } from "react";
import { CloudOff, Lock } from "lucide-react";

import { DateStamp } from "@/components/brand/date-stamp";
import { WhatsAppGlyph } from "@/components/brand/screens";
import { SignatureMark } from "@/components/brand/signature-mark";
import { featureExtras } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * المسرح: لوح واحد يعرض الميزة المختارة عرضًا حيًّا بدل ستّ بطاقات نصّية.
 *
 * كل مشهد هنا يُري ما يقوله النص: الماسح يمسح فعلًا، والتوقيع يُرسم، والرفع
 * يقف عند صفر. المشاهد كلها `aria-hidden` لأن نصّ الميزة إلى جوارها يقول
 * المعنى نفسه — عدا مشهد الختم، فهو تفاعلي ويجب أن يبقى في شجرة الوصول.
 */

export type FeatureId =
  | "whatsapp"
  | "scanner"
  | "signature"
  | "stamp"
  | "privacy"
  | "pages";

function Frame({
  children,
  decorative = true,
  className,
}: {
  children: ReactNode;
  decorative?: boolean;
  className?: string;
}) {
  return (
    <div
      {...(decorative ? { "aria-hidden": true } : {})}
      className={cn(
        "relative flex h-[16.5rem] items-center justify-center overflow-hidden px-5 sm:h-[19rem] sm:px-8",
        className,
      )}
    >
      {/* نسيج المستند وضوء علوي: عمق بلا صندوق داخل صندوق */}
      <span aria-hidden className="ruled absolute inset-0" />
      <span
        aria-hidden
        className="pointer-events-none absolute -top-24 start-1/2 size-72 -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--wq-gold) 15%, transparent), transparent 70%)",
        }}
      />
      <div className="stage-in relative flex w-full items-center justify-center">
        {children}
      </div>
    </div>
  );
}

/** أرسله عبر واتساب — المحادثة نفسها، والأخضر لا يظهر خارجها. */
function ChatStage() {
  return (
    <Frame>
      <div className="w-full max-w-[25rem]">
        <p
          className="stage-in flex items-center gap-2 text-[0.72rem] leading-relaxed text-ivory/70"
          style={{ animationDelay: "0.04s" }}
        >
          <WhatsAppGlyph className="size-3.5 shrink-0 text-whatsapp" />
          {featureExtras.chat.note}
        </p>

        <div className="mt-7 flex flex-col gap-4">
          <div
            className="stage-in flex justify-start"
            style={{ animationDelay: "0.22s" }}
          >
            <span className="max-w-[80%] rounded-2xl rounded-ss-sm bg-ivory/8 px-4 py-2.5 text-sm text-ivory/75">
              {featureExtras.chat.incoming}
            </span>
          </div>

          <div
            className="stage-in flex justify-end"
            style={{ animationDelay: "0.46s" }}
          >
            <span className="flex max-w-[88%] items-center gap-3 rounded-2xl rounded-se-sm border border-whatsapp/25 bg-whatsapp/10 px-4 py-2.5">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-ivory">
                <span className="h-4 w-3 rounded-[2px] bg-ink/70" />
              </span>
              <span className="flex min-w-0 flex-col leading-tight">
                <span className="truncate text-sm text-ivory">
                  {featureExtras.chat.fileName}
                </span>
                <span className="font-mono text-[0.62rem] text-ivory/75 ltr-num">
                  {featureExtras.chat.fileMeta}
                </span>
              </span>
            </span>
          </div>
        </div>
      </div>
    </Frame>
  );
}

/** الماسح: شعاع يمرّ على الورقة وأركان الكشف تنغلق عليها في كل دورة. */
function ScannerStage() {
  return (
    <Frame>
      <div className="relative w-[15rem]" style={{ ["--scan-run" as string]: "12rem" }}>
        {[
          "-start-2 -top-2 rounded-ss-md border-s-2 border-t-2",
          "-end-2 -top-2 rounded-se-md border-e-2 border-t-2",
          "-bottom-2 -start-2 rounded-es-md border-b-2 border-s-2",
          "-bottom-2 -end-2 rounded-ee-md border-b-2 border-e-2",
        ].map((place) => (
          <span
            key={place}
            className={cn("fx-corner absolute size-6 border-gold", place)}
          />
        ))}

        {/* الورقة تقصّ الشعاع بنفسها فلا يتسرّب خارج حوافّها */}
        <div className="relative overflow-hidden rounded-lg border hairline bg-abyss px-5 py-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,.9)]">
          <span
            className="fx-scan absolute inset-x-0 top-0 h-24"
            style={{
              background:
                "linear-gradient(to bottom, transparent, color-mix(in oklab, var(--wq-gold) 22%, transparent) 72%, color-mix(in oklab, var(--wq-gold) 55%, transparent))",
              borderBottom: "2px solid var(--wq-gold)",
            }}
          />

          <div className="relative flex flex-col gap-3">
            {[100, 92, 84, 96, 70, 88, 62, 90].map((w, i) => (
              <span
                key={i}
                className="h-[5px] rounded-full bg-ivory/12"
                style={{ width: `${w}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

/** التوقيع: المسار نفسه يُرسم ويُمحى في دورة مستمرة. */
function SignatureStage() {
  return (
    <Frame>
      <div className="w-full max-w-[23rem]">
        <span
          className="font-mono text-[0.6rem] text-ivory/70 ltr-num"
          style={{ letterSpacing: "0.3em" }}
        >
          SIGNATURE
        </span>
        <SignatureMark
          color="var(--wq-gold)"
          strokeWidth={3}
          animate={false}
          className="sig-loop mt-3 h-28"
        />
        <span className="block h-px bg-gold/45" />
      </div>
    </Frame>
  );
}

/** الختم: الميزة الوحيدة التي تُجرَّب لا تُشاهَد، فتبقى تفاعلية ومُعلنة. */
function StampStage() {
  return (
    <Frame decorative={false}>
      <DateStamp className="w-full max-w-[23rem]" />
    </Frame>
  );
}

/** الخصوصية: عدّاد الرفع واقف عند صفر، والمستند لا يغادر الجهاز. */
function PrivacyStage() {
  return (
    <Frame>
      <div className="flex flex-col items-center">
        <div className="relative grid size-32 place-items-center">
          {["0s", "0.77s", "1.54s"].map((d) => (
            <span
              key={d}
              className="fx-ring absolute inset-0 rounded-full border border-gold/60"
              style={{ animationDelay: d }}
            />
          ))}
          <span className="grid size-16 place-items-center rounded-2xl bg-gold/12">
            <Lock className="size-7 text-gold" strokeWidth={1.8} />
          </span>
        </div>

        <div className="mt-8 flex items-center gap-3 rounded-lg border hairline bg-abyss px-4 py-2.5">
          <CloudOff className="size-4 shrink-0 text-ivory/70" strokeWidth={1.8} />
          <span
            className="font-mono text-[0.62rem] text-ivory/70"
            style={{ letterSpacing: "0.26em" }}
          >
            {featureExtras.uploadsLabel}
          </span>
          <span className="font-mono text-[1.1rem] font-semibold leading-none text-gold ltr-num">
            {featureExtras.uploadsValue}
          </span>
        </div>
      </div>
    </Frame>
  );
}

/** إدارة الصفحات: رزمة صفحات تتنفّس، وأعلاها الملف المُصدَّر. */
function PagesStage() {
  const sheets = [
    { tilt: "11deg", offset: "2.6rem", delay: "0s", opacity: "opacity-45" },
    { tilt: "-8deg", offset: "-2.2rem", delay: "0.7s", opacity: "opacity-75" },
  ];

  return (
    <Frame>
      <div className="relative h-[13rem] w-[10rem]">
        {sheets.map((s) => (
          <span
            key={s.tilt}
            className={cn(
              "fx-float absolute inset-0 rounded-lg border hairline bg-abyss shadow-[0_24px_48px_-28px_rgba(0,0,0,.9)]",
              s.opacity,
            )}
            style={{
              ["--tilt" as string]: s.tilt,
              insetInlineStart: s.offset,
              animationDelay: s.delay,
            }}
          />
        ))}

        <span
          className="fx-float absolute inset-0 flex flex-col rounded-lg border hairline bg-abyss p-4 shadow-[0_30px_60px_-26px_rgba(0,0,0,.95)]"
          style={{ ["--tilt" as string]: "0deg", animationDelay: "1.2s" }}
        >
          <span className="flex flex-1 flex-col gap-2.5">
            {[100, 88, 94, 72, 90, 66].map((w, i) => (
              <span
                key={i}
                className="h-[4px] rounded-full bg-ivory/12"
                style={{ width: `${w}%` }}
              />
            ))}
          </span>
          <span className="mt-4 flex items-center justify-between border-t hairline-gold pt-3">
            <span
              className="font-mono text-[0.58rem] text-gold"
              style={{ letterSpacing: "0.22em" }}
            >
              PDF
            </span>
            <span className="h-1.5 w-8 rounded-full bg-gold/60" />
          </span>
        </span>
      </div>
    </Frame>
  );
}

const stages: Record<FeatureId, () => ReactNode> = {
  whatsapp: ChatStage,
  scanner: ScannerStage,
  signature: SignatureStage,
  stamp: StampStage,
  privacy: PrivacyStage,
  pages: PagesStage,
};

export function FeatureStage({ id }: { id: FeatureId }) {
  const Stage = stages[id];
  return <Stage />;
}
