import type { Metadata } from "next";
import Link from "next/link";
import {
  BoxButton,
  Breadcrumb,
  CatalogTitle,
  ContactSection,
  ProductBlock,
  slugify,
} from "@/components/catalog";
import { productCategories, products } from "@/data/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "ADC-12 and LM-24 / AC-4B die-casting alloys, ~98% aluminium ingots, ~97% soft aluminium, granulated aluminium shots, and TATA / DSP cubes and NOCH bars.",
};

const categoryIntro: Record<(typeof productCategories)[number], string> = {
  Alloys:
    "Pressure die-casting alloys processed from grade-segregated aluminium scrap and held within the published standard band.",
  "Ingots & soft metal":
    "Refined ingots, soft aluminium and granulated shots supplied as clean, predictable furnace charge material.",
  "Steel-plant products":
    "Compacted cubes and notch bars produced to steel-plant grades for deoxidation and metallurgical control.",
};

type Search = { searchParams: Promise<{ q?: string }> };

export default async function ProductsPage({ searchParams }: Search) {
  const { q = "" } = await searchParams;
  const query = q.trim().toLowerCase();
  const matches = query
    ? products.filter((p) =>
        [p.name, p.shortName, p.category, p.grade, p.summary, ...p.applications]
          .join(" ")
          .toLowerCase()
          .includes(query),
      )
    : products;

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 pt-5">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Our Products" }]} />
          <div className="mt-4">
            <CatalogTitle align="left" as="h1">
              {query ? `Results for “${q.trim()}”` : "Our Products"}
            </CatalogTitle>
            <p className="mt-5 max-w-4xl text-lg text-navy-800">
              {query
                ? `${matches.length} product${matches.length === 1 ? "" : "s"} match your search.`
                : "Owing to nine-plus years of grade-wise processing, we are engaged in supplying a furnace-ready range of aluminium alloys, ingots, soft aluminium, shots, cubes and notch bars."}
            </p>
            {query ? (
              <Link href="/products" className="mt-3 inline-block text-sm text-navy-600 underline underline-offset-4 hover:text-gold-600">
                Clear search and view the complete range
              </Link>
            ) : null}
          </div>
        </div>
      </div>

      {query ? (
        <section className="bg-steel-100 py-6">
          <div className="mx-auto max-w-7xl space-y-6 px-6">
            {matches.length === 0 ? (
              <div className="bg-white p-8">
                <p className="text-navy-800">
                  Nothing matched. Try “alloy”, “ingot”, “shots” or “bars”, or{" "}
                  <Link href="/contact" className="font-semibold underline underline-offset-4">
                    send us your specification
                  </Link>{" "}
                  and we will tell you what we can hold.
                </p>
              </div>
            ) : (
              matches.map((p, i) => <ProductBlock key={p.slug} product={p} linkTitle priority={i === 0} />)
            )}
          </div>
        </section>
      ) : (
        productCategories.map((category, ci) => {
          const inCategory = products.filter((p) => p.category === category);
          if (inCategory.length === 0) return null;
          return (
            <section
              key={category}
              id={slugify(category)}
              className={`scroll-mt-40 bg-steel-100 pb-6 ${ci === 0 ? "pt-8" : "pt-2"}`}
            >
              <div className="mx-auto max-w-7xl px-6">
                <div className="bg-white px-4 pb-6 pt-8 sm:px-8">
                  <Breadcrumb
                    items={[
                      { label: "Home", href: "/" },
                      { label: "Our Products", href: "/products" },
                      { label: category },
                    ]}
                  />
                  <div className="mt-4">
                    <CatalogTitle align="left">{category}</CatalogTitle>
                  </div>
                  <p className="mt-5 text-lg text-navy-800">{categoryIntro[category]}</p>
                </div>
                <div className="mt-2 space-y-2">
                  {inCategory.map((p, i) => (
                    <ProductBlock key={p.slug} product={p} linkTitle priority={ci === 0 && i === 0} />
                  ))}
                </div>
              </div>
            </section>
          );
        })
      )}

      <div className="bg-steel-100 pb-12 pt-4 text-center">
        <BoxButton href="/contact">Send us your specification</BoxButton>
      </div>

      <ContactSection compact />
    </>
  );
}
