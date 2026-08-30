import { ImageResponse } from "next/og";

import { site } from "@/lib/content";
import { loadArabicOgFont } from "@/lib/og-font";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

/**
 * Satori (محرك ImageResponse) يشكّل الحروف العربية بشكل صحيح داخل الكلمة،
 * لكنه لا يعيد ترتيب الكلمات حسب اتجاه النص، ولا تُجدي `direction: rtl`.
 * لذلك نعكس ترتيب الكلمات يدويًا قبل الرسم.
 */
function rtl(line: string) {
  return line.split(" ").reverse().join(" ");
}

/** صورة المشاركة الاجتماعية — مبنية بنفس رموز الهوية (Deep Ink Teal + Warm Gold). */
export default async function OpengraphImage() {
  const font = await loadArabicOgFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0F4C5C",
          color: "#FAF8F4",
          position: "relative",
        }}
      >
        {/* شبكة الهوية */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(#D4A24E 1px, transparent 1px), linear-gradient(90deg, #D4A24E 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            opacity: 0.05,
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
          <div style={{ fontSize: 104, fontWeight: 700, lineHeight: 1 }}>وقّع</div>
          <div style={{ width: 90, height: 2, background: "#D4A24E" }} />
          <div style={{ fontSize: 22, letterSpacing: 14, color: "#D4A24E", paddingLeft: 14 }}>
            WAQQIE
          </div>
        </div>

        <div style={{ marginTop: 44, fontSize: 38, color: "#FAF8F4", opacity: 0.92 }}>
          {rtl(site.tagline)}
        </div>

        <div style={{ marginTop: 18, fontSize: 24, color: "#FAF8F4", opacity: 0.55 }}>
          {rtl("توقيع إلكتروني عربي · معالجة كاملة على الجهاز")}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 8,
            background: "#D4A24E",
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "PlexArabic", data: font, weight: 700, style: "normal" }],
    },
  );
}
