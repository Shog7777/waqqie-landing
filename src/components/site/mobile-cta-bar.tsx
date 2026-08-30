"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * شريط تحميل ثابت أسفل الشاشة — للجوال فقط.
 *
 * على الجوال يختفي زر «حمّل التطبيق» من الترويسة داخل القائمة الجانبية،
 * فيبقى الزائر بلا دعوة ظاهرة طوال تمرير الصفحة. هذا الشريط يظهر بعد
 * تجاوز القسم الافتتاحي ويُبقي الإجراء الأساسي في متناول الإبهام.
 *
 * الظهور بانتقال CSS لا بمكتبة حركة، ويُخفى عن قارئات الشاشة وهو مطويّ.
 */
export function MobileCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("download");
      const threshold = hero ? hero.offsetHeight * 0.75 : 600;
      setVisible(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      inert={!visible}
      className={cn(
        "glass fixed inset-x-0 bottom-0 z-40 border-t border-ivory/10 sm:hidden",
        "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        visible ? "translate-y-0" : "translate-y-full",
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <p className="flex flex-col leading-tight">
          <span className="text-sm font-semibold text-ivory">وقّع أول مستند</span>
          <span className="text-[0.7rem] text-ivory/70">مجانًا · بلا إنشاء حساب</span>
        </p>
        <Button asChild size="lg" className="h-11 shrink-0 px-5 text-sm font-semibold">
          <a href="#download">حمّل التطبيق</a>
        </Button>
      </div>
    </div>
  );
}
