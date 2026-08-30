import { Layers, PenLine, ScanLine, ShieldCheck, Stamp } from "lucide-react";

import { DateStamp } from "@/components/brand/date-stamp";
import { WhatsAppGlyph } from "@/components/brand/screens";
import { SignatureMark } from "@/components/brand/signature-mark";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { featureExtras, features, sections } from "@/lib/content";
import { cn } from "@/lib/utils";

function Tile({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-ivory/10 bg-card p-6",
        "transition-all duration-300 hover:-translate-y-1 hover:border-gold/35",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at 80% 0%, color-mix(in oklab, var(--wq-gold) 10%, transparent), transparent 70%)",
        }}
      />
      <div className="relative flex h-full flex-col">{children}</div>
    </div>
  );
}

function TileIcon({
  children,
  tone = "gold",
}: {
  children: React.ReactNode;
  tone?: "gold" | "whatsapp";
}) {
  return (
    <span
      className={cn(
        "mb-4 grid size-11 place-items-center rounded-xl border",
        tone === "whatsapp"
          ? "border-whatsapp/30 bg-whatsapp/10 text-whatsapp"
          : "border-gold/25 bg-gold/10 text-gold",
      )}
    >
      {children}
    </span>
  );
}

function TileText({ title, body }: { title: string; body: string }) {
  return (
    <>
      <h3 className="mb-2 text-lg font-semibold text-ivory">{title}</h3>
      <p className="text-sm leading-relaxed text-ivory/60">{body}</p>
    </>
  );
}

export function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          {...sections.features}
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-6">
          {/* واتساب — البطاقة الرئيسية */}
          <Reveal className="lg:col-span-4">
            <Tile className="h-full">
              <TileIcon tone="whatsapp">
                <WhatsAppGlyph className="size-5" />
              </TileIcon>
              <TileText {...features.whatsapp} />

              <div className="mt-6 flex flex-col gap-2.5">
                {/* في الاتجاه العربي: رسالة الطرف الآخر يمينًا، وردّك يسارًا */}
                <div className="flex justify-start">
                  <span className="max-w-[75%] rounded-2xl rounded-ss-sm bg-ivory/8 px-4 py-2.5 text-sm text-ivory/75">
                    {featureExtras.chat.incoming}
                  </span>
                </div>
                <div className="flex justify-end">
                  <span className="flex max-w-[80%] items-center gap-3 rounded-2xl rounded-se-sm border border-whatsapp/25 bg-whatsapp/10 px-4 py-2.5">
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-ivory">
                      <span className="h-4 w-3 rounded-[2px] bg-ink/70" />
                    </span>
                    <span className="flex flex-col leading-tight">
                      <span className="text-sm text-ivory">{featureExtras.chat.fileName}</span>
                      <span className="font-mono text-[0.6rem] text-whatsapp ltr-num">
                        {featureExtras.chat.fileMeta}
                      </span>
                    </span>
                  </span>
                </div>
              </div>
            </Tile>
          </Reveal>

          {/* الخصوصية */}
          <Reveal delay={0.08} className="lg:col-span-2">
            <Tile className="h-full">
              <TileIcon>
                <ShieldCheck className="size-5" />
              </TileIcon>
              <TileText {...features.privacy} />
              <div className="mt-auto pt-6">
                <div className="flex items-center justify-between rounded-xl border border-ivory/10 bg-abyss/50 px-3 py-2.5">
                  <span className="font-mono text-[0.62rem] text-ivory/65">UPLOADS</span>
                  <span className="font-mono text-sm font-semibold text-gold ltr-num">
                    {featureExtras.uploadsValue}
                  </span>
                </div>
              </div>
            </Tile>
          </Reveal>

          {/* الماسح */}
          <Reveal delay={0.04} className="lg:col-span-2">
            <Tile className="h-full">
              <TileIcon>
                <ScanLine className="size-5" />
              </TileIcon>
              <TileText {...features.scanner} />
            </Tile>
          </Reveal>

          {/* التوقيع */}
          <Reveal delay={0.08} className="lg:col-span-2">
            <Tile className="h-full">
              <TileIcon>
                <PenLine className="size-5" />
              </TileIcon>
              <TileText {...features.signature} />
              <div className="mt-auto pt-4">
                <div className="rounded-xl bg-ivory px-3 py-1">
                  <SignatureMark className="h-14" strokeWidth={2.5} />
                </div>
              </div>
            </Tile>
          </Reveal>

          {/* إدارة الصفحات */}
          <Reveal delay={0.12} className="lg:col-span-2">
            <Tile className="h-full">
              <TileIcon>
                <Layers className="size-5" />
              </TileIcon>
              <TileText {...features.pages} />
              <div className="mt-auto flex items-end gap-2 pt-6" aria-hidden>
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="flex-1 rounded-md border border-ivory/15 bg-ivory/8 transition-all duration-300 group-hover:border-gold/30"
                    style={{ height: `${28 + i * 8}px` }}
                  />
                ))}
              </div>
            </Tile>
          </Reveal>

          {/* الختم التفاعلي */}
          <Reveal delay={0.16} className="lg:col-span-6">
            <Tile>
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div>
                  <TileIcon>
                    <Stamp className="size-5" />
                  </TileIcon>
                  <TileText {...features.stamp} />
                  <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/8 px-3 py-1.5 text-xs text-gold">
                    {featureExtras.stampHint}
                  </p>
                </div>
                <div className="rounded-2xl border border-ivory/10 bg-abyss/40 p-5">
                  <DateStamp />
                </div>
              </div>
            </Tile>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
