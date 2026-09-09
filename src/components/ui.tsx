import Link from "next/link";
import type { ReactNode } from "react";

export function Eyebrow({
  children,
  tone = "dark",
}: {
  children: ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <p
      className={`text-xs font-semibold uppercase tracking-[0.22em] ${
        tone === "light" ? "text-gold-300" : "text-gold-600"
      }`}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "dark",
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <h2
        className={`mt-3 font-display text-3xl leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.75rem] ${
          tone === "light" ? "text-white" : "text-navy-900"
        }`}
      >
        {title}
      </h2>
      <div
        className={`rule-gold mt-6 h-px w-40 ${align === "center" ? "mx-auto" : ""}`}
        aria-hidden
      />
      {lead ? (
        <p
          className={`mt-6 text-base leading-relaxed sm:text-lg ${
            tone === "light" ? "text-steel-300" : "text-navy-600/85"
          }`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost" | "gold";
  external?: boolean;
  className?: string;
}) {
  const styles = {
    primary:
      "bg-navy-800 text-white hover:bg-navy-700 shadow-[0_10px_30px_-14px_rgba(10,26,48,0.9)]",
    gold: "bg-gold-400 text-navy-900 hover:bg-gold-300 shadow-[0_10px_30px_-14px_rgba(196,154,65,0.9)]",
    outline:
      "border border-navy-200 text-navy-800 hover:border-navy-400 hover:bg-navy-50",
    ghost:
      "border border-white/30 text-white hover:border-gold-300 hover:text-gold-300",
  }[variant];

  const cls = `inline-flex items-center justify-center gap-2 rounded-md px-6 py-3.5 text-sm font-semibold transition duration-300 ${styles} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
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

export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className={`h-4 w-4 ${className}`}
    >
      <path
        d="M4 10h11m0 0-4.5-4.5M15 10l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Dark page banner used at the top of every interior page. */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  image: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{ backgroundImage: `url('${image}')` }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-900/40"
        aria-hidden
      />
      <div className="grid-lines absolute inset-0 opacity-50" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <Eyebrow tone="light">{eyebrow}</Eyebrow>
        <h1 className="mt-4 max-w-4xl font-display text-4xl leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <div className="rule-gold mt-7 h-px w-48" aria-hidden />
        {lead ? (
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-steel-300 sm:text-lg">
            {lead}
          </p>
        ) : null}
      </div>
    </section>
  );
}

/** Full-width navy call-to-action band reused across pages. */
export function CtaBand({
  title,
  lead,
  primaryLabel = "Request a quote",
  primaryHref = "/contact",
}: {
  title: string;
  lead: string;
  primaryLabel?: string;
  primaryHref?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900">
      <div className="sheen absolute inset-0" aria-hidden />
      <div className="grid-lines absolute inset-0 opacity-40" aria-hidden />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-6 py-16 lg:flex-row lg:items-center lg:justify-between lg:py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl leading-tight text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-steel-300">{lead}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href={primaryHref} variant="gold">
            {primaryLabel}
            <ArrowRight />
          </Button>
          <Button href="/products" variant="ghost">
            View products
          </Button>
        </div>
      </div>
    </section>
  );
}
