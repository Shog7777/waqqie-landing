import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * IBM Plex Sans Arabic Bold — يُحمّل من ملف محلي (رخصة OFL) بدل جلبه من الشبكة،
 * حتى تعمل صور OG أثناء البناء دون اتصال ودون فشل غير متوقع.
 */
export async function loadArabicOgFont() {
  return readFile(join(process.cwd(), "assets", "ibm-plex-sans-arabic-700.woff"));
}
