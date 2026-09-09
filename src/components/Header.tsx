"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { company, nav } from "@/data/site";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile drawer whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Utility bar */}
      <div className="hidden bg-navy-900 text-steel-300 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs">
          <p className="tracking-wide">
            {company.tagline}
          </p>
          <div className="flex items-center gap-6">
            <a href={company.phoneHref} className="transition hover:text-gold-300">
              {company.phone}
            </a>
            <span className="h-3 w-px bg-white/15" />
            <a href={company.emailHref} className="transition hover:text-gold-300">
              {company.email}
            </a>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-navy-100 bg-white/90 shadow-[0_2px_20px_-8px_rgba(10,26,48,0.35)] backdrop-blur-md"
            : "border-b border-transparent bg-white"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-2">
          <Link href="/" className="flex shrink-0 items-center" aria-label={`${company.name} home`}>
            <Image
              src="/logo-vaishnavi.png"
              alt={`${company.name} logo`}
              width={627}
              height={627}
              priority
              className={`w-auto transition-all duration-300 ${scrolled ? "h-14" : "h-20"}`}
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-md px-3.5 py-2 text-[0.9rem] font-medium transition ${
                  isActive(item.href)
                    ? "text-navy-800"
                    : "text-navy-600/80 hover:text-navy-800"
                }`}
              >
                {item.label}
                <span
                  className={`absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-gold-400 transition-transform duration-300 ${
                    isActive(item.href) ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={company.phoneHref}
              className="rounded-md border border-navy-200 px-4 py-2.5 text-sm font-semibold text-navy-700 transition hover:border-navy-400 hover:bg-navy-50"
            >
              Call now
            </a>
            <Link
              href="/contact"
              className="rounded-md bg-navy-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-700"
            >
              Request a quote
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-11 w-11 place-items-center rounded-md border border-navy-200 text-navy-800 lg:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 block h-0.5 w-5 bg-current transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-0.5 w-5 bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-5 bg-current transition-all duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>

        {/* Mobile drawer */}
        <div
          id="mobile-nav"
          className={`overflow-hidden border-t border-navy-100 bg-white transition-[max-height] duration-400 ease-out lg:hidden ${
            open ? "max-h-[32rem]" : "max-h-0"
          }`}
        >
          <nav className="flex flex-col px-6 py-4" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`border-b border-navy-50 py-3.5 text-base font-medium transition ${
                  isActive(item.href) ? "text-gold-600" : "text-navy-700"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-5 flex flex-col gap-3 pb-2">
              <a
                href={company.phoneHref}
                className="rounded-md border border-navy-200 px-4 py-3 text-center text-sm font-semibold text-navy-700"
              >
                {company.phone}
              </a>
              <Link
                href="/contact"
                className="rounded-md bg-navy-800 px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Request a quote
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
