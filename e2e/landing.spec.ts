import { expect, test } from "@playwright/test";

test.describe("الصفحة الرئيسية — المحتوى والميتاداتا", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("المستند عربي واتجاهه من اليمين لليسار", async ({ page }) => {
    const html = page.locator("html");
    await expect(html).toHaveAttribute("lang", "ar");
    await expect(html).toHaveAttribute("dir", "rtl");
  });

  test("عنوان واحد من المستوى الأول ووصف للصفحة", async ({ page }) => {
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toContainText("توقيعك، بثقة");

    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute("content", /توقيع إلكتروني عربي/);
  });

  test("كل الأقسام المعلن عنها في الترويسة موجودة فعلًا", async ({ page }) => {
    for (const id of ["features", "how", "showcase", "pricing", "faq"]) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }
  });

  test("زرّا المتجرين ظاهران ولهما اسم واضح", async ({ page }) => {
    await expect(page.getByRole("link", { name: /App Store/ }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /Google Play/ }).first()).toBeVisible();
  });

  test("البيانات المنظّمة تصف تطبيقًا وصفحة أسئلة", async ({ page }) => {
    const raw = await page.locator('script[type="application/ld+json"]').innerText();
    const data = JSON.parse(raw);
    const types = data["@graph"].map((n: { "@type": string }) => n["@type"]);
    expect(types).toContain("MobileApplication");
    expect(types).toContain("FAQPage");
  });

  test("الروابط المطلقة تشير إلى نطاق النشر لا إلى نطاق ميت", async ({ page, baseURL }) => {
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute("content");

    expect(canonical).toBe(baseURL);
    expect(ogImage).toContain(baseURL!);

    // الصورة نفسها يجب أن تستجيب، وإلا ظهرت معاينة مكسورة عند المشاركة
    const response = await page.request.get(ogImage!);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/png");
  });

  test("أيقونة العلامة لا أيقونة الإطار الافتراضية", async ({ page }) => {
    await expect(page.locator('link[rel="icon"]')).toHaveCount(1);
    await expect(page.locator('link[rel="icon"]')).toHaveAttribute("href", /\/icon/);

    const favicon = await page.request.get("/favicon.ico");
    expect(favicon.status()).toBe(404);
  });
});

test.describe("مسارات مساعدة", () => {
  test("robots و sitemap يشيران إلى نفس نطاق النشر", async ({ request, baseURL }) => {
    const robots = await request.get("/robots.txt");
    expect(robots.status()).toBe(200);
    expect(await robots.text()).toContain(`${baseURL}/sitemap.xml`);

    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    expect(await sitemap.text()).toContain(baseURL!);
  });

  test("صفحة غير موجودة تعرض 404 بهوية العلامة", async ({ page }) => {
    const response = await page.goto("/does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("لم تُوقَّع بعد");
    await expect(page.getByRole("link", { name: "العودة للرئيسية" })).toBeVisible();
  });
});
