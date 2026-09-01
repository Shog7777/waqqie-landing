import { describe, expect, it } from "vitest";

import {
  formatStamp,
  SAMPLE_DOC_ID,
  SAMPLE_STAMP,
  SAMPLE_TIME,
  toEasternNumerals,
} from "./format";

describe("toEasternNumerals", () => {
  it("يحوّل الأرقام الغبارية إلى مشرقية", () => {
    expect(toEasternNumerals("0123456789")).toBe("٠١٢٣٤٥٦٧٨٩");
  });

  it("لا يمسّ الحروف العربية ولا الرموز", () => {
    expect(toEasternNumerals("عقد رقم 42 — #WQ")).toBe("عقد رقم ٤٢ — #WQ");
  });

  it("يحافظ على الفواصل داخل التاريخ", () => {
    expect(toEasternNumerals("12/01/1448")).toBe("١٢/٠١/١٤٤٨");
  });

  it("يتعامل مع النص الفارغ", () => {
    expect(toEasternNumerals("")).toBe("");
  });

  it("عملية جامدة: إعادة التطبيق لا تُغيّر النتيجة", () => {
    const once = toEasternNumerals("2026");
    expect(toEasternNumerals(once)).toBe(once);
  });
});

describe("formatStamp", () => {
  it("هجري + مشرقية", () => {
    expect(formatStamp("hijri", "eastern")).toEqual({
      numeric: "١٢/٠١/١٤٤٨",
      suffix: "هـ",
    });
  });

  it("هجري + غبارية", () => {
    expect(formatStamp("hijri", "western")).toEqual({
      numeric: "12/01/1448",
      suffix: "هـ",
    });
  });

  it("ميلادي + مشرقية", () => {
    expect(formatStamp("gregorian", "eastern")).toEqual({
      numeric: "٢٧/٠٦/٢٠٢٦",
      suffix: "م",
    });
  });

  it("ميلادي + غبارية", () => {
    expect(formatStamp("gregorian", "western")).toEqual({
      numeric: "27/06/2026",
      suffix: "م",
    });
  });

  it("لاحقة التقويم لا تتأثر بنمط الأرقام", () => {
    expect(formatStamp("hijri", "eastern").suffix).toBe(
      formatStamp("hijri", "western").suffix,
    );
  });
});

describe("الثوابت النموذجية", () => {
  /**
   * التاريخ ثابت عمدًا لا مشتقّ من `new Date()`، وإلا اختلف ما يُرسم على
   * الخادم عمّا يُرسم في المتصفح وانكسر الترطيب.
   */
  it("التاريخ النموذجي ثابت لا يعتمد على وقت التشغيل", () => {
    expect(SAMPLE_STAMP.gregorian.numeric).toBe("27/06/2026");
    expect(SAMPLE_STAMP.hijri.numeric).toBe("12/01/1448");
  });

  it("رقم الوثيقة والوقت بالصيغة المعتمدة في دليل الهوية", () => {
    expect(SAMPLE_DOC_ID).toMatch(/^#WQ-\d{4}$/);
    expect(SAMPLE_TIME).toMatch(/^\d{2}:\d{2}$/);
  });
});
