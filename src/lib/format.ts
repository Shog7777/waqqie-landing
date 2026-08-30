/** أدوات تنسيق عربية — الأرقام والتواريخ حسب متطلبات المنتج. */

const EASTERN = "٠١٢٣٤٥٦٧٨٩";

/** تحويل الأرقام الغبارية (0-9) إلى مشرقية (٠-٩). */
export function toEasternNumerals(input: string): string {
  return input.replace(/[0-9]/g, (d) => EASTERN[Number(d)]);
}

export type Calendar = "hijri" | "gregorian";
export type Numerals = "western" | "eastern";

/**
 * تاريخ نموذجي ثابت مأخوذ من دليل الهوية (٢٧ يونيو ٢٠٢٦) —
 * ثابت عمدًا حتى يتطابق ما يُرسم على الخادم مع ما يُرسم في المتصفح.
 */
export const SAMPLE_STAMP = {
  hijri: { numeric: "12/01/1448", long: "١٢ محرم ١٤٤٨", suffix: "هـ" },
  gregorian: { numeric: "27/06/2026", long: "٢٧ يونيو ٢٠٢٦", suffix: "م" },
} as const;

export function formatStamp(calendar: Calendar, numerals: Numerals) {
  const source = SAMPLE_STAMP[calendar];
  const numeric =
    numerals === "eastern" ? toEasternNumerals(source.numeric) : source.numeric;
  return { numeric, suffix: source.suffix };
}

export const SAMPLE_TIME = "14:32";
export const SAMPLE_DOC_ID = "#WQ-0042";
