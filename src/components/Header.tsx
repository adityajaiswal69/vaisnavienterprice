"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { products } from "@/data/products";
import { company, headerNav, nav } from "@/data/site";

function PinIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden className="h-3.5 w-3.5">
      <path d="M10 2a5.5 5.5 0 0 0-5.5 5.5c0 4.1 5.5 10.5 5.5 10.5s5.5-6.4 5.5-10.5A5.5 5.5 0 0 0 10 2Zm0 7.75a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5Z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden className="h-3.5 w-3.5 text-emerald-600">
      <path d="M10 1.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Zm-1.1 12-3.4-3.4 1.4-1.4 2 2 4.6-4.6 1.4 1.4-6 6Z" />
    </svg>
  );
}

export function PhoneIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden className={className}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" strokeLinejoin="round" />
    </svg>
  );
}

export function MailIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className="h-5 w-5">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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
    <header className="sticky top-0 z-50 bg-white shadow-[0_2px_14px_-6px_rgba(10,26,48,0.35)]">
      {/* ------------------------------------------------ Identity + nav bar */}
      <div className="border-b border-steel-200">
        <div className="mx-auto flex max-w-7xl items-stretch justify-between gap-4 px-4 sm:px-6">
          {/* Logo + company block */}
          <Link
            href="/"
            className="flex items-center gap-3 py-3 sm:gap-4"
            aria-label={`${company.name} home`}
          >
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-md border border-steel-200 bg-white p-1 sm:h-20 sm:w-20">
              <Image
                src="/logo-vaishnavi.png"
                alt={`${company.name} logo`}
                width={627}
                height={627}
                priority
                className="h-full w-full object-contain"
              />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-lg font-bold leading-tight text-navy-900 sm:text-2xl">
                {company.name}
              </span>
              <span className="mt-1 hidden items-center gap-1.5 text-sm text-navy-600 sm:flex">
                <PinIcon />
                {company.tagline}
              </span>
              <span className="mt-0.5 hidden flex-wrap items-center gap-x-4 gap-y-1 text-xs text-navy-600 sm:flex">
                <span className="inline-flex items-center gap-1.5">
                  <CheckIcon />
                  Est. <strong className="font-semibold text-navy-800">{company.established}</strong>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckIcon />
                  <strong className="font-semibold text-navy-800">{company.legalStatus}</strong>
                </span>
              </span>
            </span>
          </Link>

          {/* Primary nav: the active item gets the solid block, like the reference */}
          <nav className="hidden items-stretch lg:flex" aria-label="Primary">
            {headerNav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-end px-6 pb-4 pt-8 text-[0.95rem] font-semibold uppercase tracking-wide transition ${
                    active ? "bg-navy-700 text-white" : "text-navy-800 hover:text-gold-600"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Call + enquiry */}
          <div className="hidden flex-col justify-center gap-2 lg:flex">
            <a
              href={company.phoneHref}
              className="flex flex-col items-center rounded-sm border border-navy-500 px-4 py-1.5 text-navy-700 transition hover:bg-navy-50"
            >
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold">
                <PhoneIcon />
                Call {company.phone}
              </span>
              <span className="text-[0.68rem] text-navy-500">Direct line to the proprietor</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-navy-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-600"
            >
              <MailIcon />
              Send Enquiry
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="my-auto grid h-11 w-11 place-items-center rounded-md border border-navy-200 text-navy-800 lg:hidden"
          >
            <span className="relative block h-4 w-5">
              <span className={`absolute left-0 block h-0.5 w-5 bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-1.5 block h-0.5 w-5 bg-current transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`} />
              <span className={`absolute left-0 block h-0.5 w-5 bg-current transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------ "Our range" bar */}
      <div className="hidden border-b border-steel-200 bg-white lg:block">
        <div className="mx-auto flex max-w-7xl items-stretch gap-4 px-6">
          <Link
            href="/products"
            className={`flex items-center px-4 text-[0.95rem] font-bold uppercase tracking-wide transition ${
              pathname.startsWith("/products")
                ? "bg-navy-700 text-white"
                : "text-navy-700 hover:text-gold-600"
            }`}
          >
            Our Range
          </Link>
          <span className="my-3 w-px bg-steel-300" aria-hidden />
          <nav className="flex flex-1 items-center" aria-label="Product range">
            {products.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className={`border-r border-steel-200 px-3 py-4 text-center text-[0.82rem] leading-tight transition last:border-r-0 ${
                  pathname === `/products/${p.slug}`
                    ? "text-gold-600"
                    : "text-navy-800 hover:text-gold-600"
                }`}
              >
                {p.shortName}
              </Link>
            ))}
          </nav>
          <form action="/products" method="get" role="search" className="my-2.5 flex w-72 items-center border border-steel-300">
            <label htmlFor="range-search" className="sr-only">
              Search products
            </label>
            <input
              id="range-search"
              name="q"
              type="search"
              placeholder="Search Products/Services"
              className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm text-navy-900 placeholder:text-navy-400 focus:outline-none"
            />
            <button type="submit" aria-label="Search" className="px-3 text-navy-700 transition hover:text-gold-600">
              <SearchIcon />
            </button>
          </form>
        </div>
      </div>

      {/* ------------------------------------------------ Mobile drawer */}
      <div
        id="mobile-nav"
        className={`overflow-hidden border-t border-steel-200 bg-white transition-[max-height] duration-400 ease-out lg:hidden ${
          open ? "max-h-[44rem] overflow-y-auto" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-4" aria-label="Mobile">
          <form action="/products" method="get" role="search" className="mb-3 flex items-center border border-steel-300">
            <input
              name="q"
              type="search"
              placeholder="Search Products/Services"
              aria-label="Search products"
              className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm text-navy-900 placeholder:text-navy-400 focus:outline-none"
            />
            <button type="submit" aria-label="Search" className="px-3 text-navy-700">
              <SearchIcon />
            </button>
          </form>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`border-b border-steel-200 py-3.5 text-base font-semibold uppercase tracking-wide transition ${
                isActive(item.href) ? "text-gold-600" : "text-navy-800"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <p className="mt-4 text-xs font-bold uppercase tracking-wide text-navy-500">Our range</p>
          {products.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="border-b border-steel-100 py-2.5 text-sm text-navy-800"
            >
              {p.shortName}
            </Link>
          ))}
          <div className="mt-5 flex flex-col gap-3 pb-2">
            <a
              href={company.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-navy-500 px-4 py-3 text-sm font-semibold text-navy-700"
            >
              <PhoneIcon />
              Call {company.phone}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-navy-700 px-4 py-3 text-sm font-semibold text-white"
            >
              <MailIcon />
              Send Enquiry
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
