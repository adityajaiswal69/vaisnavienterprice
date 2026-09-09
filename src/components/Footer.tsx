import Image from "next/image";
import Link from "next/link";
import { company, nav } from "@/data/site";
import { products } from "@/data/products";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-steel-300">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="sheen pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="inline-block rounded-lg bg-white/95 p-3">
              <Image
                src="/logo-vaishnavi.png"
                alt={`${company.name} logo`}
                width={627}
                height={627}
                className="h-28 w-auto"
              />
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-steel-400">
              {company.summary}
            </p>
            <p className="mt-5 font-display text-lg text-gold-300">
              {company.motto}
            </p>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
              Company
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition hover:text-gold-300">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/credits" className="transition hover:text-gold-300">
                  Image credits
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
              Products
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="transition hover:text-gold-300"
                  >
                    {p.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
              Get in touch
            </h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <span className="block text-xs uppercase tracking-wide text-steel-500">
                  Phone
                </span>
                <a
                  href={company.phoneHref}
                  className="mt-1 block text-base text-white transition hover:text-gold-300"
                >
                  {company.phone}
                </a>
              </li>
              <li>
                <span className="block text-xs uppercase tracking-wide text-steel-500">
                  Email
                </span>
                <a
                  href={company.emailHref}
                  className="mt-1 block break-all transition hover:text-gold-300"
                >
                  {company.email}
                </a>
              </li>
            </ul>
            <a
              href={company.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-md border border-gold-400/40 px-4 py-2.5 text-sm font-semibold text-gold-300 transition hover:bg-gold-400 hover:text-navy-900"
            >
              Message on WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-steel-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.name}. All rights reserved.
          </p>
          <p>
            {company.legalStatus} · Established {company.established} ·{" "}
            {company.yearsOperating} years in aluminium recycling
          </p>
        </div>
      </div>
    </footer>
  );
}
