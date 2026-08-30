import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { GoldGlow, GridPattern } from "@/components/brand/pattern";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "الصفحة غير موجودة",
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center gap-8 overflow-hidden px-6 text-center">
      <GridPattern />
      <GoldGlow className="start-1/2 top-[-20%] size-[520px] -translate-x-1/2" />

      <Logo size="lg" className="relative" />

      <div className="relative flex flex-col items-center gap-4">
        <span
          className="font-mono text-5xl font-bold text-gold ltr-num"
          style={{ letterSpacing: "0.12em" }}
        >
          404
        </span>
        <h1 className="text-2xl font-bold text-ivory sm:text-3xl">
          هذه الصفحة لم تُوقَّع بعد
        </h1>
        <p className="max-w-sm text-sm leading-[2] text-ivory/70">
          الرابط الذي وصلت منه لا يقود إلى شيء. عُد إلى الصفحة الرئيسية وتابع من هناك.
        </p>
      </div>

      <Button asChild size="lg" className="relative h-11 px-6 font-semibold">
        <Link href="/">العودة للرئيسية</Link>
      </Button>
    </main>
  );
}
