import { ImageResponse } from "next/og";

import { loadArabicOgFont } from "@/lib/og-font";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** أيقونة شاشة iOS الرئيسية — نفس تركيب أيقونة المتصفح بمقاس أكبر. */
export default async function AppleIcon() {
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
          fontSize: 72,
          fontWeight: 700,
        }}
      >
        وقّع
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "PlexArabic", data: font, weight: 700, style: "normal" }],
    },
  );
}
