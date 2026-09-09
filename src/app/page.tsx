import Image from "next/image";
import Link from "next/link";
import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";
import { ArrowRight, Button, CtaBand, Eyebrow, SectionHeading } from "@/components/ui";
import { products } from "@/data/products";
import {
  company,
  highlights,
  industries,
  market,
  processSteps,
  solutions,
  stats,
  usps,
} from "@/data/site";

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative isolate overflow-hidden bg-navy-950">
        <Image
          src="/images/hero-foundry.jpg"
          alt="Molten aluminium being poured from a furnace into an industrial ladle"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-950/80 to-navy-950/25"
          aria-hidden
        />
        <div className="grid-lines absolute inset-0 opacity-40" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-20 sm:pb-24 sm:pt-28 lg:pb-28 lg:pt-32">
          <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2.5 rounded-full border border-gold-400/30 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-gold-200">
                    {company.yearsOperating} years in aluminium recycling
                  </span>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <h1 className="mt-7 max-w-3xl font-display text-4xl leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-[4.2rem]">
                  Turning aluminium scrap into{" "}
                  <span className="text-gold-300">certified, furnace-ready</span>{" "}
                  alloy.
                </h1>
              </Reveal>

              <Reveal delay={160}>
                <p className="mt-8 max-w-xl text-base leading-relaxed text-steel-300 sm:text-lg">
                  {company.summary}
                </p>
              </Reveal>

              <Reveal delay={240}>
                <div className="mt-10 flex flex-wrap gap-3">
                  <Button href="/products" variant="gold">
                    Explore our products
                    <ArrowRight />
                  </Button>
                  <Button href="/contact" variant="ghost">
                    Talk to our team
                  </Button>
                </div>
              </Reveal>

              <Reveal delay={320}>
                <dl className="mt-14 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-8 border-t border-white/10 pt-10 sm:grid-cols-4">
                  {stats.map((s) => (
                    <div key={s.label}>
                      <dt className="sr-only">{s.label}</dt>
                      <dd>
                        <span className="block font-display text-4xl text-gold-300">
                          <Counter value={s.value} />
                        </span>
                        <span className="mt-2 block text-xs leading-snug text-steel-400">
                          {s.label}
                        </span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            {/* Logo plaque */}
            <Reveal delay={200} className="hidden lg:block">
              <div className="relative">
                <div
                  className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-gold-400/20 via-transparent to-transparent blur-2xl"
                  aria-hidden
                />
                <div className="relative rounded-2xl border border-white/12 bg-white/95 p-10 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]">
                  <Image
                    src="/logo-vaishnavi.png"
                    alt={`${company.name} logo`}
                    width={620}
                    height={620}
                    priority
                    className="mx-auto h-auto w-full max-w-[19rem]"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Product strip */}
      <section className="border-b border-navy-100 bg-navy-50/60">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-navy-500">
              We supply
            </span>
            {products.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="text-sm font-medium text-navy-700/80 transition hover:text-gold-600"
              >
                {p.shortName}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- About */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div className="relative">
                <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
                  <Image
                    src="/images/about-plant.jpg"
                    alt="Glowing metal moving through an industrial plant"
                    fill
                    sizes="(min-width: 1024px) 46vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-8 -right-4 hidden w-56 rounded-xl border border-navy-100 bg-white p-6 shadow-[0_24px_60px_-24px_rgba(10,26,48,0.45)] sm:block">
                  <span className="block font-display text-4xl text-navy-800">25</span>
                  <span className="mt-1 block text-sm leading-snug text-navy-600/80">
                    years of founder experience in the aluminium trade
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <SectionHeading
                eyebrow="Who we are"
                title="An organised recycler in a fragmented market."
                lead={company.longAbout[0]}
              />
              <p className="mt-5 text-base leading-relaxed text-navy-600/85">
                {company.longAbout[1]}
              </p>

              <ul className="mt-9 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
                {highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-sm text-navy-700">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400"
                      aria-hidden
                    />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Button href="/about" variant="outline">
                  More about the company
                  <ArrowRight />
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ Products */}
      <section className="relative bg-navy-50/70 py-20 sm:py-28">
        <div className="grid-lines-dark absolute inset-0 opacity-60" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <Reveal>
              <SectionHeading
                eyebrow="Our offerings"
                title="Six furnace-ready product lines."
                lead="Alloys, refined ingots, soft aluminium, granulated shots and steel-plant cubes and bars — each processed to the grade our customer actually runs."
              />
            </Reveal>
            <Reveal delay={100}>
              <Button href="/products" variant="outline">
                View full catalogue
                <ArrowRight />
              </Button>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
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
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent"
                      aria-hidden
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-navy-700">
                      {p.grade}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gold-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 font-display text-xl text-navy-900">
                      {p.name}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-600/85">
                      {p.summary}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy-700 transition group-hover:text-gold-600">
                      Specifications
                      <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- Why us */}
      <section className="relative isolate overflow-hidden bg-navy-900 py-20 sm:py-28">
        <Image
          src="/images/texture.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-10"
          aria-hidden
        />
        <div className="sheen absolute inset-0" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading
              tone="light"
              align="center"
              eyebrow="Why Vaishnavi"
              title="Built on relationships, run on discipline."
              lead="What separates an organised recycler from a scrap trader is repeatability — the same grade, the same purity, the same delivery, every time."
            />
          </Reveal>

          <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {usps.map((u, i) => (
              <Reveal key={u.title} delay={i * 80}>
                <div className="h-full bg-navy-900 p-8 transition duration-500 hover:bg-navy-800">
                  <span className="font-display text-3xl text-gold-400/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-white">{u.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-steel-400">
                    {u.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <blockquote className="mx-auto mt-16 max-w-4xl text-center">
              <p className="font-display text-2xl leading-relaxed text-white sm:text-[1.75rem]">
                &ldquo;{company.pullQuote}&rdquo;
              </p>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------------- How */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="How we work"
              title="Scrap in, specification out."
              lead="Four steps between a vendor's load and a customer's furnace. Nothing exotic — just done the same way every time."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((s, i) => (
              <Reveal key={s.step} delay={i * 80}>
                <article className="group h-full overflow-hidden rounded-xl border border-navy-100 bg-white">
                  <div className="relative aspect-16/11 overflow-hidden">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent"
                      aria-hidden
                    />
                    <span className="absolute bottom-4 left-5 font-display text-3xl text-gold-300">
                      {s.step}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-base font-semibold text-navy-900">{s.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-navy-600/85">
                      {s.body}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="mt-10">
              <Button href="/process" variant="outline">
                See the full process
                <ArrowRight />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------- Industries */}
      <section className="bg-navy-50/70 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Who we supply"
              title="Three industries, one standard."
              lead="Mid-size B2B industrial buyers who need consistent purity and a supplier they can plan production around."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {industries.map((ind, i) => (
              <Reveal key={ind.title} delay={i * 90}>
                <article className="group relative h-96 overflow-hidden rounded-xl">
                  <Image
                    src={ind.image}
                    alt={ind.title}
                    fill
                    sizes="(min-width: 1024px) 31vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-transparent"
                    aria-hidden
                  />
                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <h3 className="font-display text-2xl text-white">{ind.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-steel-300">
                      {ind.body}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- Solutions + market */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow="Our solutions"
                title="The gap we close."
                lead="Fragmented sourcing, mixed-grade scrap and an unreliable supply base are the industry's standing problems. These five habits are how we take them off our customers' desks."
              />
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/sustainability" variant="outline">
                  Market &amp; sustainability
                  <ArrowRight />
                </Button>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <ul className="divide-y divide-navy-100 border-y border-navy-100">
                {solutions.map((s, i) => (
                  <li key={s.title} className="flex gap-6 py-6">
                    <span className="font-display text-2xl text-gold-500/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-navy-900">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-navy-600/85">
                        {s.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Market band */}
          <Reveal delay={100}>
            <div className="mt-20 overflow-hidden rounded-2xl border border-navy-100 bg-navy-50/60">
              <div className="grid gap-px bg-navy-100 sm:grid-cols-3">
                {[market.tam, market.sam, market.som].map((m) => (
                  <div key={m.label} className="bg-navy-50/60 p-8">
                    <Eyebrow>{m.label}</Eyebrow>
                    <h3 className="mt-3 font-display text-xl text-navy-900">
                      {m.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-navy-600/85">
                      {m.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Need a consistent grade, delivered on schedule?"
        lead="Tell us the alloy, the purity and the monthly tonnage you run. We will come back with what we can commit to."
      />
    </>
  );
}
