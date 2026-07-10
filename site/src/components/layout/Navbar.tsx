"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
];

const LOGO_SRC = "/android-chrome-192x192.png";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isAbout = pathname === "/about";
  const isEvents = pathname === "/events";
  const isGallery = pathname === "/gallery";
  const isTeam = pathname === "/team";
  const isEventPage = pathname.startsWith("/event/");
  const hasDarkHero =
    isHome || isAbout || isEvents || isGallery || isTeam || isEventPage;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const transparent = hasDarkHero && !scrolled && !menuOpen;

  useEffect(() => {
    if (!hasDarkHero) return;
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasDarkHero]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 z-100 w-full transition-all duration-500",
        transparent
          ? "h-20 border-b border-white/10 bg-transparent sm:h-24"
          : "h-20 border-b border-outline/10 bg-surface/95 shadow-sm backdrop-blur-md"
      )}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary"
      >
        Skip to content
      </a>

      <div className="mx-auto flex h-full w-full max-w-container-max items-center justify-between gap-3 px-edge lg:px-edge-lg">
        <Link href="/" className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3">
          <Image
            src={LOGO_SRC}
            alt="A Cut Above emblem"
            width={50}
            height={50}
            className={cn(
              "h-10 w-10 shrink-0 rounded-full border object-cover transition-colors sm:h-11 sm:w-11",
              transparent ? "border-white/20" : "border-primary/15"
            )}
            priority
          />
          <span
            className={cn(
              "truncate font-display text-xl tracking-tight transition-colors sm:text-2xl",
              transparent ? "text-white" : "text-primary"
            )}
          >
            A Cut Above
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden flex-1 items-center justify-center gap-6 lg:flex lg:gap-10"
        >
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "font-body text-label transition-colors",
                  transparent
                    ? active
                      ? "text-white"
                      : "text-white/75 hover:text-white"
                    : active
                      ? "text-primary"
                      : "text-ink-muted hover:text-primary"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden flex-1 justify-end lg:flex">
          <Button href="/events" variant="tertiary" className="px-7 py-3">
            Register
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors lg:hidden",
            transparent ? "text-white" : "text-ink"
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={menuOpen ? "close" : "open"}
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.2 }}
              className="flex"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-outline/10 bg-surface lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-edge py-6">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "block rounded-lg px-3 py-3.5 font-display text-2xl transition-colors",
                      pathname === link.href
                        ? "text-primary"
                        : "text-ink hover:text-primary"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * NAV_LINKS.length, duration: 0.3 }}
                className="mt-3"
              >
                <Button
                  href="/events"
                  variant="tertiary"
                  className="w-full"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Button>
              </motion.li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
