"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { DeadLink } from "@/components/ui/DeadLink";
import { Magnetic } from "@/components/ui/Magnetic";
import { LogoMark } from "@/components/icons/TechIcons";
import { springSoft } from "@/lib/motion";

const NAV_LINKS = [
  { label: "Home", href: "#top", real: true },
  { label: "Our Services", href: "/services", real: false },
  { label: "Projects", href: "/projects", real: false },
  { label: "Tech Stack", href: "/tech-stack", real: false },
  { label: "FAQ", href: "#faq", real: true },
  { label: "About us", href: "/about-us", real: false },
  { label: "Client Insights", href: "#client-insights", real: true },
  { label: "Contact", href: "/contact", real: false },
] as const;

/** Calendar glyph matching crawlcorpindia.com contact CTA icon */
function CalendarNavIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M12 1.334v1.333M4 1.334v1.333m3.997 6h.006m-.006 2.667h.006m2.658-2.667h.006m-5.334 0h.006m-.006 2.667h.006m-3.006-6h11.334M2 5.334h12M1.667 8.163c0-2.905 0-4.357.834-5.26.835-.902 2.179-.902 4.866-.902h1.266c2.687 0 4.03 0 4.866.902.834.902.834 2.355.834 5.26v.342c0 2.905 0 4.357-.834 5.26-.835.902-2.179.902-4.866.902H7.367c-2.687 0-4.03 0-4.866-.902-.834-.902-.834-2.355-.834-5.26z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** 3×3 dot grid matching crawlcorpindia.com menu toggle */
function GridMenuIcon({ size = 16 }: { size?: number }) {
  const dots = [0, 1, 2].flatMap((row) =>
    [0, 1, 2].map((col) => ({
      cx: 3 + col * 5,
      cy: 3 + row * 5,
      key: `${row}-${col}`,
    })),
  );
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {dots.map((d) => (
        <circle key={d.key} cx={d.cx} cy={d.cy} r="1.35" fill="currentColor" />
      ))}
    </svg>
  );
}

function NavItem({
  link,
  onNavigate,
  className,
}: {
  link: (typeof NAV_LINKS)[number];
  onNavigate?: () => void;
  className: string;
}) {
  if (link.real) {
    return (
      <a href={link.href} onClick={onNavigate} className={className}>
        {link.label}
      </a>
    );
  }
  return (
    <DeadLink href={link.href} onClick={onNavigate} className={className}>
      {link.label}
    </DeadLink>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const iconBtn =
    "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/70 bg-white/50 text-heading backdrop-blur-md transition-colors hover:bg-white/80 hover:text-accent-soft";

  return (
    <>
      <motion.header
        layout
        className={`fixed inset-x-0 top-0 z-50 transition-[padding] duration-300 ${
          scrolled ? "pt-2" : "pt-4"
        }`}
      >
        <div
          className={`mx-auto flex h-14 max-w-6xl items-center justify-between overflow-hidden rounded-2xl border border-white/70 bg-white/45 px-3 shadow-nav backdrop-blur-xl sm:h-16 sm:px-4 ${
            scrolled ? "mx-3 sm:mx-auto" : "mx-4 sm:mx-6 lg:mx-auto"
          }`}
        >
          <a
            href="#top"
            className="flex h-full items-center gap-2.5 text-heading"
            onClick={() => setOpen(false)}
          >
            <LogoMark size={28} className="text-heading" />
            <span className="text-sm font-semibold tracking-tight sm:text-[15px]">
              Crawl Corp India
            </span>
          </a>

          <div className="flex h-full items-center gap-2">
            <Magnetic strength={12}>
              <DeadLink
                href="/contact"
                aria-label="Contact"
                data-cursor="hover"
                className={`${iconBtn} bg-accent text-accent-fg border-transparent hover:bg-[color:var(--accent-soft)] hover:text-accent-fg`}
              >
                <CalendarNavIcon size={16} />
              </DeadLink>
            </Magnetic>

            <Magnetic strength={12}>
              <motion.button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                whileHover={{ scale: 1.05 }}
                transition={springSoft}
                className={iconBtn}
                data-cursor="hover"
              >
                <motion.span
                  key={open ? "close" : "open"}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex"
                >
                  {open ? <X size={18} strokeWidth={1.75} /> : <GridMenuIcon size={16} />}
                </motion.span>
              </motion.button>
            </Magnetic>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            layoutId="mobile-drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-zinc-900/15 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 36 }}
              className="absolute inset-y-0 right-0 flex w-[min(100%,20rem)] flex-col border-l border-white/70 bg-white/70 p-6 shadow-card-hover backdrop-blur-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                Navigation
              </p>
              <div className="flex flex-col gap-1 divide-y divide-zinc-900/[0.08]">
                {NAV_LINKS.map((link) => (
                  <NavItem
                    key={link.label}
                    link={link}
                    onNavigate={() => setOpen(false)}
                    className="px-3 py-3 text-sm font-medium text-heading hover:bg-white/50"
                  />
                ))}
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
