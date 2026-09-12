import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import EnquiryForm from "@/components/EnquiryForm";
import { MailIcon, PhoneIcon } from "@/components/Header";
import ProductGallery from "@/components/ProductGallery";
import type { Product } from "@/data/products";
import { company, contactPerson } from "@/data/site";
import { Suspense } from "react";

/* ------------------------------------------------------------------ atoms */

/** URL-safe anchor id for a category heading. */
export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

/** Centred uppercase section title with the short navy/gold underline. */
export function CatalogTitle({
  children,
  align = "center",
  as: Tag = "h2",
}: {
  children: ReactNode;
  align?: "center" | "left";
  as?: "h1" | "h2";
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <Tag className="text-2xl font-semibold uppercase tracking-wide text-navy-900 sm:text-[1.75rem]">
        {children}
      </Tag>
      <span
        className={`mt-2.5 block h-[3px] w-8 bg-navy-700 ${align === "center" ? "mx-auto" : ""}`}
        aria-hidden
      >
        <span className="block h-full w-1/2 bg-gold-400" />
      </span>
    </div>
  );
}

export function BoxButton({
  href,
  children,
  variant = "outline",
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "outline" | "solid" | "white";
  external?: boolean;
  className?: string;
}) {
  const styles = {
    outline: "border border-navy-600 text-navy-700 hover:bg-navy-50",
    solid: "border border-navy-700 bg-navy-700 text-white hover:bg-navy-600",
    white: "border border-white bg-white text-navy-900 hover:bg-navy-50",
  }[variant];
  const cls = `inline-flex items-center justify-center gap-2 rounded-sm px-7 py-3 text-[0.95rem] font-semibold transition ${styles} ${className}`;

  if (external) {
    return (
      <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-navy-500">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li key={item.label + i} className="flex items-center gap-2">
            {i > 0 ? <span aria-hidden>»</span> : null}
            {item.href ? (
              <Link href={item.href} className="transition hover:text-gold-600">
                {item.label}
              </Link>
            ) : (
              <span className="text-navy-800">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ---------------------------------------------------------- category card */

export function CategoryCard({
  title,
  href,
  image,
  items,
  highlight = false,
}: {
  title: string;
  href: string;
  image: string;
  items: { label: string; href: string }[];
  highlight?: boolean;
}) {
  return (
    <article
      className={`flex h-full flex-col bg-white p-3 transition ${
        highlight ? "shadow-[0_0_0_1px_var(--color-navy-100),0_16px_40px_-24px_rgba(10,26,48,0.5)]" : ""
      } hover:shadow-[0_0_0_1px_var(--color-navy-100),0_16px_40px_-24px_rgba(10,26,48,0.5)]`}
    >
      <Link href={href} className="relative block aspect-[16/11] overflow-hidden border border-steel-200 bg-white">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover"
        />
      </Link>
      <h3 className="mt-4 px-2 text-xl font-semibold text-navy-900">
        <Link href={href} className="transition hover:text-gold-600">
          {title}
        </Link>
      </h3>
      <ul className="mt-2 flex-1 px-2">
        {items.slice(0, 3).map((it) => (
          <li key={it.href + it.label} className="border-b border-dotted border-steel-300">
            <Link href={it.href} className="block py-2.5 text-[0.95rem] text-navy-700 transition hover:text-gold-600">
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href={href}
        className="mt-1 block py-3 text-center text-[0.95rem] font-medium text-navy-800 transition hover:text-gold-600"
      >
        + View All
      </Link>
    </article>
  );
}

/* ---------------------------------------------------------- product block */

/**
 * Stacked product listing: gallery on the left, price line + spec table +
 * description on the right. Used on the products page (with a linked title)
 * and on the product detail page (with the full chemistry table).
 */
export function ProductBlock({
  product,
  linkTitle = false,
  showChemistry = false,
  priority = false,
}: {
  product: Product;
  linkTitle?: boolean;
  showChemistry?: boolean;
  priority?: boolean;
}) {
  const specs: { label: string; value: string }[] = [
    { label: "Category", value: product.category },
    { label: "Grade", value: product.grade },
    ...product.keyFacts.filter((f) => f.label !== "Grade"),
    { label: "Supplied formats", value: product.forms.join(", ") },
    { label: "Place of origin", value: "India" },
  ];
  if (product.standard) specs.splice(2, 0, { label: "Standard referenced", value: product.standard });
  const seen = new Set<string>();
  const rows = specs.filter((r) => (seen.has(r.label) ? false : (seen.add(r.label), true)));

  const enquiryHref = `/contact?product=${product.slug}`;

  return (
    <article id={product.slug} className="scroll-mt-40 bg-white px-4 py-8 sm:px-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <h2 className="text-2xl font-semibold text-navy-900">
          {linkTitle ? (
            <Link href={`/products/${product.slug}`} className="transition hover:text-gold-600">
              {product.name}
            </Link>
          ) : (
            product.name
          )}
        </h2>
        <a
          href={company.phoneHref}
          className="inline-flex items-center gap-2 rounded-sm border border-navy-600 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-navy-700 transition hover:bg-navy-50"
        >
          <PhoneIcon />
          Request a call back
        </a>
      </div>

      <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-10">
        <div>
          <ProductGallery images={[product.image, ...product.gallery]} alt={product.name} priority={priority} />
          <div className="mt-5 flex justify-center">
            <Link
              href={enquiryHref}
              className="inline-flex items-center gap-2 rounded-sm bg-navy-700 px-8 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-navy-600"
            >
              <MailIcon className="h-5 w-5" />
              Get best quote
            </Link>
          </div>
        </div>

        <div className="min-w-0">
          <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-2xl font-semibold text-navy-900">Price on Request</span>
            <span className="text-lg text-navy-600">/ {product.unit}</span>
            <Link href={enquiryHref} className="text-base text-navy-600 underline underline-offset-4 transition hover:text-gold-600">
              Get latest price
            </Link>
          </p>
          <p className="mt-2 text-sm text-navy-700">
            Grade-based, per-{product.unit.toLowerCase()} pricing. Share your monthly tonnage for a commercial offer.
          </p>

          <table className="mt-5 w-full border-collapse text-[0.95rem]">
            <caption className="sr-only">Specification for {product.name}</caption>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} className="border-b border-steel-200">
                  <th scope="row" className="w-[42%] py-2.5 pr-4 text-left font-normal text-navy-700">
                    {r.label}
                  </th>
                  <td className="py-2.5 text-navy-900">{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {product.description.map((para, i) => (
            <p
              key={para.slice(0, 32)}
              className={`text-[0.95rem] leading-relaxed text-navy-800 ${i === 0 ? "mt-5" : "mt-3"}`}
            >
              {para}
            </p>
          ))}

          <p className="mt-5 font-semibold text-navy-900">Applications:</p>
          <ul className="mt-2 space-y-1.5">
            {product.applications.map((a) => (
              <li key={a} className="flex items-start gap-3 text-[0.95rem] text-navy-800">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-navy-800" aria-hidden />
                {a}
              </li>
            ))}
          </ul>

          {showChemistry && product.chemistry ? (
            <div className="mt-7">
              <p className="font-semibold text-navy-900">Indicative chemistry ({product.standard}):</p>
              <p className="mt-1 text-sm text-navy-600">
                Typical composition quoted against the published standard. Actual per-heat chemistry is
                confirmed against each order before despatch.
              </p>
              <div className="mt-3 overflow-x-auto border border-steel-200">
                <table className="w-full min-w-[22rem] border-collapse text-sm">
                  <caption className="sr-only">Indicative chemical composition for {product.name}</caption>
                  <thead>
                    <tr className="bg-navy-50 text-left">
                      <th scope="col" className="px-4 py-2.5 font-semibold text-navy-800">
                        Element
                      </th>
                      <th scope="col" className="px-4 py-2.5 font-semibold text-navy-800">
                        Composition
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.chemistry.map((row) => (
                      <tr key={row.element} className="border-t border-steel-200">
                        <th scope="row" className="px-4 py-2 text-left font-normal text-navy-800">
                          {row.element}
                        </th>
                        <td className="px-4 py-2 text-navy-700">{row.range}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}

          <div className="mt-7">
            <Link
              href={enquiryHref}
              className="inline-flex items-center justify-center rounded-sm border border-navy-600 px-12 py-3 text-base font-bold uppercase tracking-wide text-navy-700 transition hover:bg-navy-50"
            >
              Yes! I am interested
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

/* --------------------------------------------------------- contact section */

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-7 w-7">
      <path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 2c-4.4 0-8 2.2-8 5v2h16v-2c0-2.8-3.6-5-8-5Z" />
    </svg>
  );
}

function ShareIcon({ kind }: { kind: "whatsapp" | "mail" | "linkedin" | "x" }) {
  const cls = "h-4 w-4";
  switch (kind) {
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cls}>
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.6 1.1 2.7.1.2 1.9 2.9 4.6 4 1.7.7 2.3.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.2-.3-.2-.6-.3Z" />
        </svg>
      );
    case "mail":
      return <MailIcon className={cls} />;
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cls}>
          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.5c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4V9Z" />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cls}>
          <path d="M17.5 3h3l-7 8 8.3 10h-6.5l-5-6.6L4.5 21h-3l7.5-8.6L1 3h6.6l4.6 6.1L17.5 3Zm-1.1 16.2h1.7L7 4.7H5.2l11.2 14.5Z" />
        </svg>
      );
  }
}

/**
 * Split contact section: navy details panel on the left, enquiry form on the
 * right. `compact` renders the short "Your message" form; otherwise the full
 * form is shown (used on the contact page).
 */
export function ContactSection({ compact = true }: { compact?: boolean }) {
  const site = "https://vaishnavienterprises.in";
  const shareText = encodeURIComponent(`${company.name} — ${company.tagline}`);
  const shares: { kind: "whatsapp" | "mail" | "linkedin" | "x"; href: string; label: string }[] = [
    { kind: "whatsapp", href: `https://wa.me/?text=${shareText}%20${encodeURIComponent(site)}`, label: "Share on WhatsApp" },
    { kind: "linkedin", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(site)}`, label: "Share on LinkedIn" },
    { kind: "x", href: `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(site)}`, label: "Share on X" },
    { kind: "mail", href: `mailto:?subject=${shareText}&body=${encodeURIComponent(site)}`, label: "Share by email" },
  ];

  return (
    <section className="border-t-4 border-navy-700 bg-white" id="contact">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-[0.44fr_0.56fr]">
        {/* Details panel */}
        <div className="sheen bg-navy-700 text-white">
          <h2 className="bg-navy-800 px-8 py-4 text-2xl font-semibold">{company.name}</h2>
          <dl className="space-y-8 px-8 py-9">
            <div className="flex gap-4">
              <span className="mt-1 text-white/90"><UserIcon /></span>
              <div>
                <dt className="text-lg uppercase tracking-wide text-white/90">Contact person</dt>
                <dd className="text-lg font-semibold">
                  {contactPerson.name} | {contactPerson.role}
                </dd>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="mt-1 text-white/90"><MailIcon className="h-7 w-7" /></span>
              <div className="min-w-0">
                <dt className="text-lg uppercase tracking-wide text-white/90">Email</dt>
                <dd className="break-all text-lg font-semibold">
                  <a href={company.emailHref} className="transition hover:text-gold-300">
                    {company.email}
                  </a>
                </dd>
                <dd className="mt-1 text-sm text-white/80">
                  {company.legalStatus} · Established {company.established} · {company.yearsOperating} years in aluminium recycling
                </dd>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="mt-1 text-white/90"><PhoneIcon className="h-7 w-7" /></span>
              <div>
                <dt className="text-lg uppercase tracking-wide text-white/90">Contact number</dt>
                <dd className="text-lg font-semibold">
                  <a href={company.phoneHref} className="transition hover:text-gold-300">
                    {company.phone}
                  </a>
                </dd>
                <dd className="mt-1">
                  <a
                    href={company.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/85 underline underline-offset-4 transition hover:text-gold-300"
                  >
                    Message on WhatsApp
                  </a>
                </dd>
              </div>
            </div>
          </dl>
          <div className="flex items-center gap-3 px-8 pb-10">
            <span className="text-lg">Share us on</span>
            {shares.map((s) => (
              <a
                key={s.kind}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-10 w-10 place-items-center rounded-full bg-white text-navy-800 transition hover:bg-gold-300"
              >
                <ShareIcon kind={s.kind} />
              </a>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="px-6 py-10 sm:px-10">
          <CatalogTitle align="left">Contact us</CatalogTitle>
          <div className="mt-8">
            <Suspense fallback={<div className="h-64 animate-pulse bg-navy-50" />}>
              <EnquiryForm compact={compact} />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
