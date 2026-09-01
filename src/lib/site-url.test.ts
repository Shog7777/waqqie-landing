import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { getBaseUrl } from "./site-url";

const KEYS = ["NEXT_PUBLIC_SITE_URL", "VERCEL_PROJECT_PRODUCTION_URL"] as const;

describe("getBaseUrl", () => {
  const original: Record<string, string | undefined> = {};

  beforeEach(() => {
    for (const k of KEYS) {
      original[k] = process.env[k];
      delete process.env[k];
    }
  });

  afterEach(() => {
    for (const k of KEYS) {
      if (original[k] === undefined) delete process.env[k];
      else process.env[k] = original[k];
    }
  });

  it("يعود إلى العنوان المحلي حين لا يوجد متغيّر بيئة", () => {
    expect(getBaseUrl()).toBe("http://localhost:3000");
  });

  it("يشتقّ العنوان من نطاق Vercel الإنتاجي", () => {
    process.env.VERCEL_PROJECT_PRODUCTION_URL = "waqqie-landing.vercel.app";
    expect(getBaseUrl()).toBe("https://waqqie-landing.vercel.app");
  });

  it("المتغيّر الصريح له الأولوية على نطاق Vercel", () => {
    process.env.VERCEL_PROJECT_PRODUCTION_URL = "waqqie-landing.vercel.app";
    process.env.NEXT_PUBLIC_SITE_URL = "https://waqqie.sa";
    expect(getBaseUrl()).toBe("https://waqqie.sa");
  });

  it("يحذف الشرطة المائلة الأخيرة حتى لا تتضاعف في الروابط", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://waqqie.sa/";
    expect(getBaseUrl()).toBe("https://waqqie.sa");
  });

  it("الناتج عنوان صالح دائمًا — لأن metadataBase يبنيه بـ new URL", () => {
    process.env.VERCEL_PROJECT_PRODUCTION_URL = "waqqie-landing.vercel.app";
    expect(() => new URL(getBaseUrl())).not.toThrow();
  });
});
