import { ImageResponse } from "next/og";

import { loadArabicOgFont } from "@/lib/og-font";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** أيقونة الموقع — حرف الشعار الذهبي على Deep Ink Teal. */
export default async function Icon() {
  const font = await loadArabicOgFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0F4C5C",
          color: "#D4A24E",
          fontSize: 42,
          fontWeight: 700,
        }}
      >
        و
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "PlexArabic", data: font, weight: 700, style: "normal" }],
    },
  );
}
