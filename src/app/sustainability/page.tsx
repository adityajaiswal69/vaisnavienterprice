import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { CtaBand, Eyebrow, PageHero, SectionHeading } from "@/components/ui";
import { challenges, growthPlan, market, mission } from "@/data/site";

export const metadata: Metadata = {
  title: "Sustainability & market",
  description:
    "Secondary aluminium, the circular metal economy, and the growth of India's aluminium scrap market — where Vaishnavi Enterprises fits.",
};

export default function SustainabilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Sustainability"
        title="The greenest tonne of aluminium is the one already above ground."
        lead="Primary aluminium production is highly energy-intensive. Every tonne of scrap we return to a furnace as specification-grade metal is a tonne that does not have to be smelted from ore."
        image="/images/sustainability.jpg"
      />

      {/* Circular economy */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow="Our mission"
                title="Supporting India's circular metal economy."
                lead={mission}
              />
              <p className="mt-6 text-base leading-relaxed text-navy-600/85">
                Recycling is not a side benefit of this business — it is the business.
                Everything Vaishnavi Enterprises sells began as somebody else&rsquo;s
                scrap, and every consignment displaces virgin metal in a customer&rsquo;s
                charge mix. The commercial case and the environmental case point the same
                way.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
                <Image
                  src="/images/sustainability.jpg"
                  alt="Crushed aluminium cans collected for recycling"
                  fill
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="relative isolate overflow-hidden bg-navy-900 py-20 sm:py-28">
        <Image
          src="/images/foil-texture.jpg"
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
              eyebrow="Why it matters"
              title="The pressures reshaping aluminium supply."
            />
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {challenges.map((c, i) => (
              <Reveal key={c.title} delay={i * 70}>
                <div className="h-full bg-navy-900 p-8">
                  <span className="font-display text-2xl text-gold-400/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-white">{c.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-steel-400">
                    {c.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Market opportunity */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Market opportunity"
              title="A market on track to roughly triple in a decade."
              lead="India's aluminium scrap market was valued at approximately US$3.8 billion in 2024 and is projected to reach US$11.2 billion by 2034 — around 10.9% CAGR."
            />
          </Reveal>

          {/* Simple TAM / SAM / SOM diagram */}
          <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <Reveal>
              <svg
                viewBox="0 0 360 300"
                role="img"
                aria-label="Nested market diagram: total addressable market, serviceable available market, and serviceable obtainable market"
                className="mx-auto w-full max-w-md"
              >
                <circle cx="180" cy="150" r="140" fill="#eef3fa" stroke="#adc3e2" />
                <circle cx="180" cy="176" r="100" fill="#d6e2f2" stroke="#7d9dcd" />
                <circle cx="180" cy="205" r="60" fill="#142e52" />

                <text x="180" y="42" textAnchor="middle" className="fill-navy-700" fontSize="15" fontWeight="700">
                  TAM
                </text>
                <text x="180" y="62" textAnchor="middle" className="fill-navy-600" fontSize="12">
                  US$3.8B → US$11.2B
                </text>

                <text x="180" y="112" textAnchor="middle" className="fill-navy-700" fontSize="15" fontWeight="700">
                  SAM
                </text>
                <text x="180" y="131" textAnchor="middle" className="fill-navy-600" fontSize="12">
                  Organised secondary supply
                </text>

                <text x="180" y="200" textAnchor="middle" fill="#e3c77e" fontSize="15" fontWeight="700">
                  SOM
                </text>
                <text x="180" y="220" textAnchor="middle" fill="#c3ccd8" fontSize="11">
                  Our 10-customer base
                </text>
                <text x="180" y="236" textAnchor="middle" fill="#c3ccd8" fontSize="11">
                  &amp; capacity expansion
                </text>
              </svg>
            </Reveal>

            <Reveal delay={120}>
              <div className="space-y-px overflow-hidden rounded-xl border border-navy-100 bg-navy-100">
                {[market.tam, market.sam, market.som].map((m) => (
                  <div key={m.label} className="bg-white p-7">
                    <div className="flex items-baseline gap-4">
                      <Eyebrow>{m.label}</Eyebrow>
                      <h3 className="font-display text-xl text-navy-900">{m.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-navy-600/85">
                      {m.body}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-navy-800">
                  Key growth drivers
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2.5">
                  {market.drivers.map((d) => (
                    <li
                      key={d}
                      className="rounded-full border border-navy-200 bg-navy-50/60 px-4 py-2 text-sm text-navy-700"
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-6 text-xs text-navy-400">
                Source:{" "}
                <a
                  href={market.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline transition hover:text-gold-600"
                >
                  {market.sourceLabel}
                </a>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="bg-navy-50/70 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Our roadmap"
              title="How we intend to grow into it."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {growthPlan.map((g, i) => (
              <Reveal key={g.step} delay={i * 70}>
                <div className="h-full rounded-xl border border-navy-100 bg-white p-8">
                  <span className="font-display text-2xl text-gold-500/70">{g.step}</span>
                  <h3 className="mt-4 text-base font-semibold text-navy-900">
                    {g.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-navy-600/85">
                    {g.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Put recycled metal into your charge mix."
        lead="Specification-grade secondary aluminium, supplied consistently, at a lower cost and energy footprint than primary metal."
      />
    </>
  );
}
