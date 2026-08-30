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

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const top = visible.reduce((a, b) =>
          a.intersectionRatio >= b.intersectionRatio ? a : b,
        );
        setActive(top.target.id);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
