import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  BoxButton,
  Breadcrumb,
  CatalogTitle,
  CategoryCard,
  ContactSection,
  ProductBlock,
  slugify,
} from "@/components/catalog";
import { getProduct, productCategories, products } from "@/data/products";
import { company } from "@/data/site";

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    category: product.category,
    image: product.image,
    brand: { "@type": "Brand", name: company.name },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      description: `Price on request, per ${product.unit}`,
    },
  };

  const otherCategories = productCategories.filter((c) => c !== product.category);
  const sameCategory = products.filter((p) => p.category === product.category && p.slug !== product.slug);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 pt-5">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Our Products", href: "/products" },
              { label: product.category, href: `/products#${slugify(product.category)}` },
              { label: product.shortName },
            ]}
          />
          <div className="mt-4">
            <CatalogTitle align="left" as="h1">
              {product.category}
            </CatalogTitle>
            <p className="mt-5 max-w-4xl text-lg text-navy-800">{product.summary}</p>
          </div>
        </div>
      </div>

      <section className="bg-steel-100 py-6">
        <div className="mx-auto max-w-7xl px-6">
          <ProductBlock product={product} showChemistry priority />
        </div>
      </section>

      {sameCategory.length > 0 ? (
        <section className="bg-steel-100 pb-6">
          <div className="mx-auto max-w-7xl px-6">
            <div className="bg-white px-4 py-5 sm:px-8">
              <p className="font-semibold text-navy-900">Also in {product.category}</p>
            </div>
            <div className="mt-2 space-y-2">
              {sameCategory.map((p) => (
                <ProductBlock key={p.slug} product={p} linkTitle />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-6">
          <CatalogTitle>Other product lines</CatalogTitle>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {otherCategories.map((category) => {
              const inCategory = products.filter((p) => p.category === category);
              return (
                <CategoryCard
                  key={category}
                  title={category}
                  href={`/products#${slugify(category)}`}
                  image={inCategory[0]?.image ?? "/images/prod-ingots.jpg"}
                  items={inCategory.map((p) => ({ label: p.name, href: `/products/${p.slug}` }))}
                />
              );
            })}
            <div className="flex items-center justify-center bg-navy-50 p-8 text-center">
              <div>
                <p className="text-lg font-semibold text-navy-900">Need a different specification?</p>
                <p className="mt-2 text-sm text-navy-700">
                  We process to customer specification rather than a fixed house standard. Send us your
                  chemistry and we will tell you honestly whether we can hold it.
                </p>
                <BoxButton href={`/contact?product=${product.slug}`} className="mt-5">
                  Send your specification
                </BoxButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactSection compact />
    </>
  );
}
