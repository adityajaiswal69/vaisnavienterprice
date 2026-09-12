import Image from "next/image";
import Link from "next/link";
import { company, nav } from "@/data/site";
import { products } from "@/data/products";

export default function Footer() {
  const year = new Date().getFullYear();
  const half = Math.ceil(products.length / 2);
  const columns = [products.slice(0, half), products.slice(half)];

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-steel-200">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" aria-hidden />
      <div className="sheen pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6 pb-8 pt-12">
        <div className="grid gap-12 lg:grid-cols-[0.36fr_0.64fr]">
          <div>
            <h2 className="text-2xl font-semibold uppercase tracking-wide text-white">Our Company</h2>
            <ul className="mt-5 space-y-3.5 text-lg">
              {nav
                .filter((item) => item.href !== "/")
                .map((item) => (
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
            <h2 className="text-2xl font-semibold uppercase tracking-wide text-white">Our Products</h2>
            <div className="mt-5 grid gap-x-10 sm:grid-cols-2">
              {columns.map((col, i) => (
                <ul key={i} className="space-y-3.5 text-lg">
                  {col.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/products/${p.slug}`} className="transition hover:text-gold-300">
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm leading-relaxed text-steel-300">
            <p>
              © {year} {company.name}. All Rights Reserved.
            </p>
            <p>
              {company.legalStatus} · Established {company.established} ·{" "}
              <a href={company.emailHref} className="underline underline-offset-2 transition hover:text-gold-300">
                {company.email}
              </a>
            </p>
          </div>
          <div className="inline-flex shrink-0 items-center gap-3 rounded-sm bg-white px-3 py-2">
            <Image
              src="/logo-vaishnavi.png"
              alt={`${company.name} logo`}
              width={627}
              height={627}
              className="h-10 w-10 object-contain"
            />
            <span className="text-xs font-semibold leading-tight text-navy-900">
              {company.shortName}
              <br />
              <span className="font-normal text-navy-600">{company.motto}</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
