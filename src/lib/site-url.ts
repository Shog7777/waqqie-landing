/**
 * عنوان الموقع المستخدم في الروابط المطلقة (canonical، صور OG، sitemap).
 *
 * `site.url` في content.ts هو نطاق العلامة المقصود (waqqie.sa) ويُعرض للزائر،
 * لكنه غير مُشغَّل بعد — فلو استُخدم في الميتاداتا لكانت صورة المشاركة تشير
 * إلى نطاق لا يستجيب، ولظهرت معاينة مكسورة عند مشاركة الرابط.
 *
 * الترتيب: متغيّر بيئة صريح ← نطاق Vercel الإنتاجي (متاح وقت البناء) ← محليًا.
 */
export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}
