"use client";

import { useEffect, useState } from "react";

/**
 * يتتبّع القسم الظاهر حاليًا لتمييز رابطه في الترويسة —
 * نفس سلوك الفهرس الجانبي في دليل الهوية الرسمي.
 *
 * يُوازن بين قسمين ظاهرين معًا باختيار الأكثر تغطية للشاشة،
 * حتى لا يقفز التمييز ذهابًا وإيابًا عند حدود الأقسام.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    // المراقب يُبلّغ عن الأقسام المتغيّرة فقط لا عن كلها، فلو قارنّا داخل
    // الدفعة وحدها لاختير قسمٌ دخل للتوّ على قسمٍ يغطّي الشاشة أكثر منه.
    // لذا نحتفظ بآخر نسبة تغطية لكل قسم ونقارن بينها جميعًا.
    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        let bestId: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }

        // لا قسم داخل النطاق (بين قسمين) → نُبقي التمييز على آخر قسم.
        if (bestId) setActive(bestId);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
