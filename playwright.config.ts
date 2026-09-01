import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;
const baseURL = `http://127.0.0.1:${PORT}`;

/**
 * الاختبارات تعمل على **نسخة الإنتاج** لا خادم التطوير، لأن الفارق جوهري:
 * التوليد الثابت، وتقسيم الحزم، وتوليد صور OG لا يحدث شيء منها في `next dev`.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
    locale: "ar-SA",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 5"] } },
  ],
  webServer: {
    command: `npm run build && npx next start -p ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    // بدون هذا تشتقّ الصفحة روابطها المطلقة من localhost:3000 الافتراضي
    // فتفشل تأكيدات canonical و og:image و sitemap.
    env: { NEXT_PUBLIC_SITE_URL: baseURL },
  },
});
