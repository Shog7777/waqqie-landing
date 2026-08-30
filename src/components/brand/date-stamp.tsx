"use client";

import { useState } from "react";
import { CalendarDays, Hash } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  formatStamp,
  SAMPLE_DOC_ID,
  SAMPLE_TIME,
  toEasternNumerals,
  type Calendar,
  type Numerals,
} from "@/lib/format";

function Segmented<T extends string>({
  value,
  onChange,
  options,
  label,
  icon,
  compact,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
  label: string;
  icon: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span
        className={cn(
          "flex items-center gap-1.5 text-ivory/55",
          compact ? "text-[0.62rem]" : "text-xs",
        )}
      >
        {icon}
        {label}
      </span>
      <div
        role="group"
        aria-label={label}
        className="flex rounded-lg border border-ivory/10 bg-abyss/60 p-0.5"
      >
        {options.map((o) => {
          const active = o.value === value;
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(o.value)}
              className={cn(
                "rounded-md transition-all duration-200",
                compact ? "px-2 py-0.5 text-[0.6rem]" : "px-3 py-1 text-xs",
                active
                  ? "bg-gold font-semibold text-ink"
                  : "text-ivory/55 hover:text-ivory",
              )}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * ختم التاريخ التفاعلي — يعرض ميزة المنتج بدل وصفها:
 * تبديل بين الهجري والميلادي وبين الأرقام الغبارية والمشرقية.
 */
export function DateStamp({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  const [calendar, setCalendar] = useState<Calendar>("hijri");
  const [numerals, setNumerals] = useState<Numerals>("eastern");
  const { numeric, suffix } = formatStamp(calendar, numerals);
  const time = numerals === "eastern" ? toEasternNumerals(SAMPLE_TIME) : SAMPLE_TIME;
  const docId = numerals === "eastern" ? toEasternNumerals(SAMPLE_DOC_ID) : SAMPLE_DOC_ID;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* معاينة الختم فوق ورقة عاجية */}
      <div
        className={cn(
          "relative overflow-hidden rounded-xl bg-ivory",
          compact ? "p-3" : "p-5",
        )}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(180deg, var(--wq-ink) 0 1px, transparent 1px 11px)",
          }}
        />
        <div
          className={cn(
            "relative flex items-center justify-between gap-3 rounded-lg border-2 border-dashed border-[color-mix(in_oklab,var(--wq-gold)_75%,var(--wq-ink))] px-3 py-2",
          )}
        >
          <div className="flex flex-col leading-tight">
            <span
              className={cn(
                "font-bold text-ink",
                compact ? "text-[0.7rem]" : "text-sm",
              )}
            >
              وقّع
            </span>
            <span
              className={cn(
                "font-mono text-[color-mix(in_oklab,var(--wq-ink)_65%,transparent)]",
                compact ? "text-[0.5rem]" : "text-[0.58rem]",
              )}
              style={{ letterSpacing: "0.3em" }}
            >
              SIGNED
            </span>
          </div>
          <div className="flex flex-col items-end leading-tight">
            <span
              className={cn(
                "whitespace-nowrap font-mono font-semibold text-ink ltr-num",
                compact ? "text-[0.72rem]" : "text-base",
              )}
            >
              {numeric}{" "}
              <span className="text-[0.75em] text-[color-mix(in_oklab,var(--wq-ink)_60%,transparent)]">
                {suffix}
              </span>
            </span>
            <span
              className={cn(
                "font-mono text-[color-mix(in_oklab,var(--wq-ink)_55%,transparent)] ltr-num",
                compact ? "text-[0.5rem]" : "text-[0.62rem]",
              )}
            >
              {time} · {docId}
            </span>
          </div>
        </div>
      </div>

      <div className={cn("flex flex-col", compact ? "gap-1.5" : "gap-2.5")}>
        <Segmented
          label="التقويم"
          compact={compact}
          icon={<CalendarDays className={compact ? "size-3" : "size-3.5"} />}
          value={calendar}
          onChange={setCalendar}
          options={[
            { value: "hijri", label: "هجري" },
            { value: "gregorian", label: "ميلادي" },
          ]}
        />
        <Segmented
          label="نمط الأرقام"
          compact={compact}
          icon={<Hash className={compact ? "size-3" : "size-3.5"} />}
          value={numerals}
          onChange={setNumerals}
          options={[
            { value: "eastern", label: "٠-٩" },
            { value: "western", label: "0-9" },
          ]}
        />
      </div>
    </div>
  );
}
