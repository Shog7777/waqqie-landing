"use client";

import type { ReactNode } from "react";
import { Direction } from "radix-ui";

/**
 * مكوّنات Radix تفترض LTR افتراضيًا ما لم يُبلَّغ الاتجاه صراحةً،
 * وهذا ما يجعل التنقّل بلوحة المفاتيح (الأسهم) داخل الأكورديون والتبويبات
 * يعمل بالاتجاه الصحيح في صفحة عربية.
 */
export function Providers({ children }: { children: ReactNode }) {
  return <Direction.DirectionProvider dir="rtl">{children}</Direction.DirectionProvider>;
}
