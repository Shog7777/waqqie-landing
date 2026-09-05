import { expect, test, type Page } from "@playwright/test";

/**
 * قسم المميزات فهرس ولوح واحد: الختم التفاعلي لا يُركَّب إلا حين تُختار
 * ميزة «أختام وتواريخ» من الفهرس.
 */
async function openStampTab(page: Page) {
  const tab = page
    .locator("#features")
    .getByRole("tab", { name: "أختام وتواريخ بصيغتك أنت" });
  await tab.scrollIntoViewIfNeeded();
  await tab.click();
  await expect(tab).toHaveAttribute("aria-selected", "true");
}

test.describe("ختم التاريخ التفاعلي", () => {
  test("التبديل بين التقويمين وبين نمطي الأرقام يغيّر الختم مباشرة", async ({ page }) => {
    await page.goto("/");

    // الميزة تُختار من فهرس القسم، ولوحها هو ما يحمل الختم التفاعلي
    await openStampTab(page);

    const stamp = page.locator("#features").getByText(/^[٠-٩0-9]{2}\/[٠-٩0-9]{2}\//).first();
    await stamp.scrollIntoViewIfNeeded();

    // الحالة الافتراضية: هجري + أرقام مشرقية
    await expect(stamp).toContainText("١٢/٠١/١٤٤٨");
    await expect(stamp).toContainText("هـ");

    await page.locator("#features").getByRole("button", { name: "ميلادي" }).click();
    await expect(stamp).toContainText("٢٧/٠٦/٢٠٢٦");
    await expect(stamp).toContainText("م");

    await page.locator("#features").getByRole("button", { name: "0-9" }).click();
    await expect(stamp).toContainText("27/06/2026");

    // والعودة للحالة الأولى تعيد الختم كما كان
    await page.locator("#features").getByRole("button", { name: "هجري" }).click();
    await page.locator("#features").getByRole("button", { name: "٠-٩" }).click();
    await expect(stamp).toContainText("١٢/٠١/١٤٤٨");
  });

  test("حالة الأزرار مُعلَنة لقارئ الشاشة", async ({ page }) => {
    await page.goto("/");
    await openStampTab(page);
    const hijri = page.locator("#features").getByRole("button", { name: "هجري" });
    const gregorian = page.locator("#features").getByRole("button", { name: "ميلادي" });

    await expect(hijri).toHaveAttribute("aria-pressed", "true");
    await expect(gregorian).toHaveAttribute("aria-pressed", "false");

    await gregorian.click();
    await expect(gregorian).toHaveAttribute("aria-pressed", "true");
    await expect(hijri).toHaveAttribute("aria-pressed", "false");
  });
});

test.describe("مستكشف المميزات", () => {
  test("اختيار ميزة يبدّل اللوح ويعرض وصفها", async ({ page }) => {
    await page.goto("/");
    const features = page.locator("#features");
    await features.scrollIntoViewIfNeeded();

    const tabs = features.getByRole("tab");
    await expect(tabs).toHaveCount(6);
    await expect(tabs.first()).toHaveAttribute("aria-selected", "true");

    // لوح واحد معروض في كل لحظة
    await expect(features.getByRole("tabpanel")).toHaveCount(1);
    await expect(
      features.getByText(/أنهِ التوقيع وشارك النسخة الموقّعة/),
    ).toBeVisible();

    await tabs.nth(1).click();
    await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
    await expect(tabs.first()).toHaveAttribute("aria-selected", "false");
    await expect(
      features.getByText(/الكاميرا تلتقط أطراف الورقة/),
    ).toBeVisible();
  });
});

test.describe("معرض الشاشات", () => {
  test("الأسهم والمؤشرات تنقل بين الشرائح", async ({ page }) => {
    await page.goto("/");
    const showcase = page.locator("#showcase");
    await showcase.scrollIntoViewIfNeeded();

    const dots = showcase.getByRole("button", { name: /^اذهب إلى/ });
    await expect(dots).toHaveCount(5);
    await expect(dots.first()).toHaveAttribute("aria-current", "true");

    // مؤشّر بعيد: القفز المباشر يعمل
    await dots.nth(3).click();
    await expect(dots.nth(3)).toHaveAttribute("aria-current", "true");
    await expect(dots.first()).toHaveAttribute("aria-current", "false");
  });

  test("زر الشريحة التالية يتقدّم فعلًا", async ({ page, isMobile }) => {
    test.skip(!!isMobile, "الأسهم مخفية في مقاسات الجوال — التنقّل بالسحب والمؤشرات");
    await page.goto("/");
    const showcase = page.locator("#showcase");
    await showcase.scrollIntoViewIfNeeded();

    const dots = showcase.getByRole("button", { name: /^اذهب إلى/ });
    await showcase.getByRole("button", { name: "الشريحة التالية" }).click();
    await expect(dots.nth(1)).toHaveAttribute("aria-current", "true");
  });
});

test.describe("الأسئلة الشائعة", () => {
  test("فتح سؤال يعرض جوابه", async ({ page }) => {
    await page.goto("/");
    const faq = page.locator("#faq");
    await faq.scrollIntoViewIfNeeded();

    const question = faq.getByRole("button", { name: /هل يعمل التطبيق دون إنترنت؟/ });
    await expect(question).toHaveAttribute("aria-expanded", "false");

    await question.click();
    await expect(question).toHaveAttribute("aria-expanded", "true");
    await expect(faq.getByText(/الاستيراد والمسح والتوقيع والتصدير تعمل بالكامل/)).toBeVisible();
  });
});

test.describe("تجربة الجوال", () => {
  test.skip(({ isMobile }) => !isMobile, "خاص بمقاسات الجوال");

  test("القائمة الجانبية تفتح وتغلق وتحتوي كل روابط التنقّل", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "فتح القائمة" }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    for (const label of ["المميزات", "آلية العمل", "الشاشات", "الباقات", "الأسئلة"]) {
      await expect(dialog.getByRole("link", { name: label })).toBeVisible();
    }

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("شريط التحميل السفلي يظهر بعد تجاوز القسم الافتتاحي", async ({ page }) => {
    await page.goto("/");
    const bar = page.getByRole("link", { name: "حمّل التطبيق" }).last();

    // مطويّ في البداية — خارج الشاشة أسفلها
    const before = await bar.boundingBox();
    const viewport = page.viewportSize()!;
    expect(before!.y).toBeGreaterThanOrEqual(viewport.height - 1);

    await page.locator("#pricing").scrollIntoViewIfNeeded();
    await expect(bar).toBeInViewport();
  });
});
