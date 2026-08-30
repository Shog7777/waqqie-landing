import { Mail } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { footerLinks, site, ui } from "@/lib/content";

const socials = [
  { label: "X", href: "#", glyph: "X" },
  { label: "Instagram", href: "#", glyph: "IG" },
  { label: "LinkedIn", href: "#", glyph: "in" },
];

export function Footer() {
  const columns = [footerLinks.product, footerLinks.support, footerLinks.legal];

  return (
    <footer className="relative border-t border-ivory/10 bg-abyss">
      {/* الشريط الذهبي — عنصر هوية دائم أسفل أي ترويسة أو تذييل رسمي */}
      <span aria-hidden className="block h-[3px] w-full bg-gold" />

      <div className="mx-auto max-w-6xl px-4 pb-28 pt-14 sm:px-6 sm:pb-14">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div className="flex flex-col items-start gap-5">
            <Logo size="lg" className="items-start" />
            <p className="max-w-xs text-sm leading-[2] text-ivory/65">
              {ui.footerBlurb}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 text-sm text-ivory/70 transition-colors hover:text-gold"
            >
              <Mail className="size-4" />
              <span className="font-mono ltr-num">{site.email}</span>
            </a>
            <ul className="flex items-center gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={`${s.label} (${s.glyph})`}
                    className="grid size-9 place-items-center rounded-lg border border-ivory/12 font-mono text-[0.7rem] text-ivory/60 transition-all hover:border-gold/45 hover:text-gold"
                  >
                    {s.glyph}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="روابط التذييل" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title} className="flex flex-col gap-4">
                <h3
                  className="font-mono text-[0.65rem] uppercase text-gold"
                  style={{ letterSpacing: "0.2em" }}
                >
                  {col.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {col.items.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="text-sm text-ivory/65 transition-colors hover:text-ivory"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-ivory/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.7rem] text-ivory/65 ltr-num">
            © 2026 {site.latin} · {site.domain}
          </p>
          <p className="text-[0.7rem] text-ivory/65">
            {ui.footerNote}
          </p>
        </div>
      </div>
    </footer>
  );
}
