import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { ArrowRight, Button, CtaBand, Eyebrow } from "@/components/ui";
import { getProduct, products } from "@/data/products";
import { company, solutions } from "@/data/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };

  return {
    title: product.name,
    description: product.summary,
    openGraph: {
      title: `${product.name} — ${company.name}`,
      description: product.summary,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    category: product.category,
    brand: { "@type": "Brand", name: company.name },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb + hero */}
      <section className="relative isolate overflow-hidden bg-navy-950">
        <Image
          src={product.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/88 to-navy-900/45"
          aria-hidden
        />
        <div className="grid-lines absolute inset-0 opacity-40" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-24">
          <nav aria-label="Breadcrumb" className="text-xs text-steel-400">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition hover:text-gold-300">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/products" className="transition hover:text-gold-300">
                  Products
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-steel-300">{product.shortName}</li>
            </ol>
          </nav>

          <div className="mt-8 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-gold-400/40 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-gold-300">
                  {product.grade}
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-steel-300">
                  {product.category}
                </span>
              </div>

              <h1 className="mt-6 font-display text-4xl leading-[1.1] tracking-tight text-white sm:text-5xl">
                {product.name}
              </h1>
              <div className="rule-gold mt-7 h-px w-48" aria-hidden />
              <p className="mt-7 max-w-xl text-base leading-relaxed text-steel-300 sm:text-lg">
                {product.summary}
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Button href={`/contact?product=${product.slug}`} variant="gold">
                  Enquire about this grade
                  <ArrowRight />
                </Button>
                <Button href={company.phoneHref} variant="ghost" external>
                  {company.phone}
                </Button>
              </div>
            </div>

            <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-white/12">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key facts strip */}
      <section className="border-b border-navy-100 bg-white">
        <dl className="mx-auto grid max-w-7xl gap-px bg-navy-100 px-0 sm:grid-cols-2 lg:grid-cols-4">
          {product.keyFacts.map((f) => (
            <div key={f.label} className="bg-white px-6 py-7">
              <dt className="text-xs uppercase tracking-wide text-navy-400">
                {f.label}
              </dt>
              <dd className="mt-1.5 text-base font-semibold text-navy-900">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Detail */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            {/* min-w-0 stops the wide chemistry table forcing the grid track open */}
            <Reveal className="min-w-0">
              <Eyebrow>Overview</Eyebrow>
              <h2 className="mt-3 font-display text-3xl text-navy-900">
                About this grade
              </h2>
              <div className="rule-gold mt-6 h-px w-40" aria-hidden />

              {product.description.map((para) => (
                <p
                  key={para.slice(0, 40)}
                  className="mt-6 text-base leading-relaxed text-navy-600/85"
                >
                  {para}
                </p>
              ))}

              {product.chemistry ? (
                <div className="mt-12">
                  <h3 className="font-display text-2xl text-navy-900">
                    Indicative chemistry
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-600/85">
                    Typical composition quoted against {product.standard}. Actual
                    per-heat chemistry is confirmed against each order before despatch.
                  </p>

                  <div className="mt-6 overflow-x-auto rounded-xl border border-navy-100">
                    <table className="w-full min-w-100 border-collapse text-sm">
                      <caption className="sr-only">
                        Indicative chemical composition for {product.name}
                      </caption>
                      <thead>
                        <tr className="bg-navy-50">
                          <th
                            scope="col"
                            className="px-5 py-3.5 text-left font-semibold text-navy-800"
                          >
                            Element
                          </th>
                          <th
                            scope="col"
                            className="px-5 py-3.5 text-left font-semibold text-navy-800"
                          >
                            Composition
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-navy-100">
                        {product.chemistry.map((row) => (
                          <tr key={row.element} className="transition hover:bg-navy-50/50">
                            <th
                              scope="row"
                              className="px-5 py-3.5 text-left font-medium text-navy-800"
                            >
                              {row.element}
                            </th>
                            <td className="px-5 py-3.5 text-navy-600">{row.range}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null}
            </Reveal>

            <Reveal delay={120}>
              <div className="sticky top-28 space-y-8">
                <div className="rounded-xl border border-navy-100 bg-navy-50/60 p-8">
                  <h3 className="text-base font-semibold text-navy-900">Applications</h3>
                  <ul className="mt-5 space-y-3">
                    {product.applications.map((a) => (
                      <li
                        key={a}
                        className="flex items-start gap-3 text-sm text-navy-700"
                      >
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400"
                          aria-hidden
                        />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-navy-100 bg-white p-8">
                  <h3 className="text-base font-semibold text-navy-900">
                    Supplied formats
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {product.forms.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-3 text-sm text-navy-700"
                      >
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-navy-300"
                          aria-hidden
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl bg-navy-900 p-8 text-steel-300">
                  <h3 className="font-display text-xl text-white">
                    Need a different specification?
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed">
                    We process to customer specification rather than a fixed house
                    standard. Send us your chemistry and we will tell you honestly
                    whether we can hold it.
                  </p>
                  <Link
                    href={`/contact?product=${product.slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-300 transition hover:text-gold-200"
                  >
                    Send your specification
                    <ArrowRight />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Quality reassurance */}
      <section className="bg-navy-50/70 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {solutions.map((s, i) => (
              <Reveal key={s.title} delay={i * 60}>
                <div className="h-full rounded-xl border border-navy-100 bg-white p-6">
                  <h3 className="text-sm font-semibold text-navy-900">{s.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-navy-600/85">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>Also available</Eyebrow>
              <h2 className="mt-3 font-display text-3xl text-navy-900">
                Other product lines
              </h2>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-navy-700 transition hover:text-gold-600"
            >
              View all products
              <ArrowRight />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 70}>
                <Link
                  href={`/products/${p.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-navy-100 bg-white transition duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-[0_28px_60px_-30px_rgba(10,26,48,0.5)]"
                >
                  <div className="relative aspect-16/10 overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(min-width: 1024px) 30vw, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-lg text-navy-900">{p.name}</h3>
                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-navy-600/85">
                      {p.summary}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={`Ready to price ${product.shortName}?`}
        lead="Share your monthly tonnage and delivery location and we will revert with a commercial offer."
      />
    </>
  );
}
