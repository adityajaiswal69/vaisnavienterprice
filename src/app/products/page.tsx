import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { ArrowRight, CtaBand, Eyebrow, PageHero, SectionHeading } from "@/components/ui";
import { productCategories, products } from "@/data/products";
import { industries } from "@/data/site";

export const metadata: Metadata = {
  title: "Products",
  description:
    "ADC-12 and LM-24 / AC-4B die-casting alloys, ~98% aluminium ingots, ~97% soft aluminium, granulated aluminium shots, and TATA / DSP cubes and NOCH bars.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our offerings"
        title="Furnace-ready aluminium, processed to your grade."
        lead="Six product lines covering die-casting alloys, refined ingots, soft aluminium, granulated feedstock and steel-plant additions."
        image="/images/prod-ingots.jpg"
      />

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          {productCategories.map((category, ci) => {
            const inCategory = products.filter((p) => p.category === category);
            if (inCategory.length === 0) return null;

            return (
              <div key={category} className={ci === 0 ? "" : "mt-20"}>
                <Reveal>
                  <div className="flex items-center gap-5">
                    <Eyebrow>{category}</Eyebrow>
                    <span className="h-px flex-1 bg-navy-100" aria-hidden />
                    <span className="text-xs text-navy-400">
                      {inCategory.length} product{inCategory.length > 1 ? "s" : ""}
                    </span>
                  </div>
                </Reveal>

                <div className="mt-8 grid gap-8">
                  {inCategory.map((p, i) => (
                    <Reveal key={p.slug} delay={i * 80}>
                      <article className="group grid overflow-hidden rounded-xl border border-navy-100 bg-white transition duration-300 hover:border-gold-300 hover:shadow-[0_28px_60px_-32px_rgba(10,26,48,0.5)] lg:grid-cols-[0.85fr_1.15fr]">
                        <div className="relative aspect-16/10 overflow-hidden lg:aspect-auto lg:min-h-72">
                          <Image
                            src={p.image}
                            alt={p.name}
                            fill
                            sizes="(min-width: 1024px) 40vw, 100vw"
                            className="object-cover transition duration-700 group-hover:scale-105"
                          />
                        </div>

                        <div className="flex flex-col p-8 lg:p-10">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="rounded-full bg-navy-50 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-navy-600">
                              {p.grade}
                            </span>
                            {p.standard ? (
                              <span className="rounded-full border border-gold-300 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-gold-600">
                                {p.standard}
                              </span>
                            ) : null}
                          </div>

                          <h2 className="mt-4 font-display text-2xl text-navy-900 sm:text-3xl">
                            {p.name}
                          </h2>
                          <p className="mt-4 text-base leading-relaxed text-navy-600/85">
                            {p.summary}
                          </p>

                          <dl className="mt-7 grid gap-x-8 gap-y-4 border-t border-navy-100 pt-6 sm:grid-cols-2">
                            {p.keyFacts.map((f) => (
                              <div key={f.label}>
                                <dt className="text-xs uppercase tracking-wide text-navy-400">
                                  {f.label}
                                </dt>
                                <dd className="mt-1 text-sm font-medium text-navy-800">
                                  {f.value}
                                </dd>
                              </div>
                            ))}
                          </dl>

                          <div className="mt-8 flex flex-wrap gap-3">
                            <Link
                              href={`/products/${p.slug}`}
                              className="inline-flex items-center gap-2 rounded-md bg-navy-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy-700"
                            >
                              Full specification
                              <ArrowRight />
                            </Link>
                            <Link
                              href={`/contact?product=${p.slug}`}
                              className="inline-flex items-center gap-2 rounded-md border border-navy-200 px-5 py-3 text-sm font-semibold text-navy-800 transition hover:border-navy-400 hover:bg-navy-50"
                            >
                              Enquire
                            </Link>
                          </div>
                        </div>
                      </article>
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-navy-50/70 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Applications"
              title="Where our metal ends up."
              align="center"
            />
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {industries.map((ind, i) => (
              <Reveal key={ind.title} delay={i * 90}>
                <div className="h-full rounded-xl border border-navy-100 bg-white p-8">
                  <h3 className="font-display text-xl text-navy-900">{ind.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-600/85">
                    {ind.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Tell us the grade and the tonnage."
        lead="Send your specification and monthly requirement — we will confirm what we can commit to and at what lead time."
      />
    </>
  );
}
