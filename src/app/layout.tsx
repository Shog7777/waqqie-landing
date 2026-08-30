import type { Metadata, Viewport } from "next";
import { Aref_Ruqaa, IBM_Plex_Sans_Arabic, JetBrains_Mono } from "next/font/google";

import { Providers } from "@/components/providers";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { site, ui } from "@/lib/content";

import "./globals.css";

/**
 * الخطوط — دليل الهوية، الفصل 04.
 * 29LT Azat خط تجاري مرخّص (29lt.com) ولا يُوزَّع مع الويب،
 * لذا يُستخدم IBM Plex Sans Arabic بوزن 700 للعناوين كبديل معتمد داخل نفس النظام.
 */
const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic", "latin"],
  // الأوزان المستخدمة فعليًا فقط. كل وزن إضافي ملف يُحمَّل ويزاحم غيره على
  // النطاق، وقياس Lighthouse أظهر أن تحميل الخطوط هو ما كان يؤخّر LCP.
  weight: ["400", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

/** اللمسة الخطية الاستثنائية — تُستخدم في مكان واحد فقط: شاشة نجاح التوقيع. */
const arefRuqaa = Aref_Ruqaa({
  variable: "--font-aref",
  subsets: ["arabic"],
  weight: ["400"],
  // يظهر مرة واحدة فقط داخل مجسّم أسفل الصفحة، فلا داعي لمزاحمته الخطوط الأساسية.
  preload: false,
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "توقيع إلكتروني",
    "وقّع",
    "waqqie",
    "e-sign",
    "توقيع PDF",
    "ماسح ضوئي",
    "عقود",
    "واتساب",
    "السعودية",
  ],
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0F4C5C",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`dark h-full ${plexArabic.variable} ${jetbrainsMono.variable} ${arefRuqaa.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col overflow-x-hidden">
        <a
          href="#main"
          className="sr-only rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:absolute focus:end-4 focus:top-4 focus:z-[999]"
        >
          {ui.skipToContent}
        </a>
        {/* بدون JS لا يُضاف is-visible، فنلغي الإخفاء بالكامل */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <Providers>
          <ScrollProgress />
          {children}
        </Providers>
      </body>
    </html>
  );
}
