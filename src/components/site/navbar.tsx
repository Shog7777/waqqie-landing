"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useActiveSection } from "@/hooks/use-active-section";
import { nav } from "@/lib/content";
import { cn } from "@/lib/utils";

const sectionIds = nav.map((n) => n.href.slice(1));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass border-b border-ivory/10 py-2" : "border-b border-transparent py-4",
      )}
    >
      <nav
        aria-label="التنقّل الرئيسي"
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 sm:px-6"
      >
        <a href="#main" aria-label="وقّع WAQQIE — العودة لأعلى الصفحة" className="shrink-0">
          <Logo size={scrolled ? "sm" : "md"} className="transition-all duration-300" />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative rounded-lg px-3 py-2 text-sm transition-colors",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
                    isActive ? "text-gold" : "text-ivory/70 hover:text-ivory",
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-3 -bottom-0.5 h-px origin-center bg-gold transition-transform duration-300",
                      isActive ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Button
            asChild
            size="lg"
            className="hidden font-semibold shadow-[0_8px_24px_-10px_color-mix(in_oklab,var(--wq-gold)_90%,transparent)] sm:inline-flex"
          >
            <a href="#download">حمّل التطبيق</a>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon-lg"
                className="lg:hidden"
                aria-label="فتح القائمة"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[82vw] border-ivory/10 bg-abyss sm:w-80">
              <SheetHeader className="items-start">
                <SheetTitle className="sr-only">قائمة التنقّل</SheetTitle>
                <Logo size="md" />
              </SheetHeader>
              <ul className="flex flex-col gap-1 px-4">
                {nav.map((item) => (
                  <li key={item.href}>
                    <SheetClose asChild>
                      <a
                        href={item.href}
                        aria-current={active === item.href.slice(1) ? "true" : undefined}
                        className={cn(
                          "block rounded-lg border-e-2 px-3 py-3 text-base transition-colors",
                          active === item.href.slice(1)
                            ? "border-gold bg-gold/10 text-gold"
                            : "border-transparent text-ivory/70 hover:border-gold hover:bg-gold/10 hover:text-gold",
                        )}
                      >
                        {item.label}
                      </a>
                    </SheetClose>
                  </li>
                ))}
              </ul>
              <div className="mt-auto p-4">
                <SheetClose asChild>
                  <Button asChild size="lg" className="h-11 w-full font-semibold">
                    <a href="#download">حمّل التطبيق</a>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
