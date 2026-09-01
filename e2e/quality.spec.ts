import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("الوصولية — فحص axe آلي", () => {
  test("الصفحة الرئيسية بلا مخالفات WCAG 2.1 A/AA", async ({ page }) => {
    await page.goto("/");

    // فتح كل الأسئلة حتى تُفحص محتوياتها لا عناوينها فقط
    for (const trigger of await page.locator("#faq button[aria-expanded]").all()) {
      if ((await trigger.getAttribute("aria-expanded")) === "false") await trigger.click();
    }

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(
      results.violations.map((v) => `${v.id}: ${v.nodes.length} عنصر`),
      JSON.stringify(results.violations, null, 1),
    ).toEqual([]);
  });

  test("صفحة 404 بلا مخالفات", async ({ page }) => {
    await page.goto("/does-not-exist");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });

  test("القائمة الجانبية المفتوحة بلا مخالفات", async ({ page, isMobile }) => {
    test.skip(!isMobile, "القائمة الجانبية تظهر في مقاسات الجوال");
    await page.goto("/");
    await page.getByRole("button", { name: "فتح القائمة" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
});

test.describe("التجاوب", () => {
  const widths = [320, 375, 768, 1024, 1440];

  for (const width of widths) {
    test(`لا تمرير أفقي عند عرض ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");

      const overflow = await page.evaluate(() => {
        const de = document.documentElement;
        return { scroll: de.scrollWidth, client: de.clientWidth };
      });

      // فرق بكسل واحد مقبول لتقريب المتصفح
      expect(overflow.scroll - overflow.client).toBeLessThanOrEqual(1);
    });
  }

  test("كل الأقسام لها ارتفاع فعلي — لا قسم منهار", async ({ page }) => {
    await page.goto("/");
    const heights = await page.evaluate(() =>
      [...document.querySelectorAll("main > section")].map((s) => ({
        id: s.id || "(بلا معرّف)",
        h: Math.round(s.getBoundingClientRect().height),
      })),
    );

    expect(heights.length).toBeGreaterThanOrEqual(9);
    for (const { id, h } of heights) {
      expect(h, `القسم ${id} منهار`).toBeGreaterThan(100);
    }
  });
});

test.describe("صمود المحتوى", () => {
  /**
   * عناصر الظهور التدريجي تبدأ بشفافية صفر ويكشفها JS. لو فشل الكشف —
   * تمرير سريع، قفزة عبر رابط داخلي، أو JS معطّل — يبقى نصف الصفحة مخفيًا.
   */
  test("القفز عبر رابط داخلي لا يترك محتوى مخفيًا خلفه", async ({ page }) => {
    await page.goto("/#faq");

    // الصفحة تستخدم scroll-behavior: smooth، فالقفزة رحلة لا لحظة.
    // ننتظر استقرار موضع التمرير فعليًا بدل تخمين مهلة ثابتة.
    await page.evaluate(
      () =>
        new Promise<void>((resolve) => {
          let last = -1;
          let stable = 0;
          const tick = () => {
            if (window.scrollY === last) {
              if (++stable > 8) return resolve();
            } else {
              stable = 0;
              last = window.scrollY;
            }
            requestAnimationFrame(tick);
          };
          tick();
        }),
    );
    await page.waitForTimeout(500); // مهلة المسح المؤجَّل بعد توقّف التمرير

    const hidden = await page.evaluate(() =>
      [...document.querySelectorAll(".reveal")].filter((el) => {
        const above = el.getBoundingClientRect().bottom < 0;
        return above && !el.classList.contains("is-visible");
      }).length,
    );

    expect(hidden, "عناصر تجاوزتها الشاشة وبقيت مخفية").toBe(0);
  });

  test("النص الأساسي موجود في HTML المُرسَل من الخادم", async ({ request }) => {
    const html = await (await request.get("/")).text();
    for (const needle of [
      "توقيعك، بثقة",
      "أرسله عبر واتساب فورًا",
      "خصوصية لا تفاوض عليها",
      "hello@waqqie.sa",
    ]) {
      expect(html, `النص «${needle}» غير موجود في HTML الخادم`).toContain(needle);
    }
  });
});
