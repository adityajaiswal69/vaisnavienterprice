import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { CtaBand, Eyebrow, PageHero, SectionHeading } from "@/components/ui";
import {
  businessModel,
  challenges,
  processSteps,
  revenueModel,
  solutions,
} from "@/data/site";

export const metadata: Metadata = {
  title: "Our process",
  description:
    "How Vaishnavi Enterprises turns mixed aluminium scrap into furnace-ready alloy: procurement, grade-wise segregation, melting and refining, and B2B despatch.",
};

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="How we work"
        title="Grade-wise from the weighbridge to the despatch bay."
        lead="Consistency is not a slogan in this business — it is a process discipline. Here is ours, step by step."
        image="/images/segregation.jpg"
      />

      {/* The four steps */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="The workflow"
              title="Four steps, repeated identically."
              lead="Every consignment moves through the same sequence. That is what makes the output predictable."
            />
          </Reveal>

          <div className="mt-16 space-y-16 lg:space-y-24">
            {processSteps.map((s, i) => (
              <Reveal key={s.step} delay={60}>
                <div
                  className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                    i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative aspect-16/11 overflow-hidden rounded-2xl">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      sizes="(min-width: 1024px) 46vw, 100vw"
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <span className="font-display text-5xl text-gold-400/50">
                      {s.step}
                    </span>
                    <h3 className="mt-4 font-display text-3xl text-navy-900">
                      {s.title}
                    </h3>
                    <div className="rule-gold mt-6 h-px w-32" aria-hidden />
                    <p className="mt-6 text-base leading-relaxed text-navy-600/85">
                      {s.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges → solutions */}
      <section className="relative isolate overflow-hidden bg-navy-900 py-20 sm:py-28">
        <div className="sheen absolute inset-0" aria-hidden />
        <div className="grid-lines absolute inset-0 opacity-40" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading
              tone="light"
              align="center"
              eyebrow="The problem we solve"
              title="Five industry problems, five standing answers."
            />
          </Reveal>

          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <Eyebrow tone="light">Industry challenges</Eyebrow>
                <ul className="mt-7 space-y-6">
                  {challenges.map((c) => (
                    <li key={c.title}>
                      <h3 className="text-base font-semibold text-white">{c.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-steel-400">
                        {c.body}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="h-full rounded-2xl border border-gold-400/25 bg-gold-400/[0.06] p-8 backdrop-blur-sm">
                <Eyebrow tone="light">Our response</Eyebrow>
                <ul className="mt-7 space-y-6">
                  {solutions.map((s) => (
                    <li key={s.title}>
                      <h3 className="text-base font-semibold text-gold-200">
                        {s.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-steel-300">
                        {s.body}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Quality assurance */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
                <Image
                  src="/images/lab-testing.jpg"
                  alt="Technician at a materials testing bench"
                  fill
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={120}>
              <SectionHeading
                eyebrow="Quality assurance"
                title="Consistency you can charge without checking."
                lead="Purity is controlled at the point it is cheapest to control — at intake, by segregating scrap grade by grade before anything is melted."
              />
              <p className="mt-6 text-base leading-relaxed text-navy-600/85">
                Formal grade testing is a live part of our scale-up plan: introducing
                documented testing so that every consignment ships against a recorded
                specification rather than an experienced eye alone. Until then, our
                assurance rests on disciplined segregation, repeatable processing and
                nine years of correcting the things that go wrong in this trade.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Business & revenue model */}
      <section className="bg-navy-50/70 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Business model"
              title="How the business actually runs."
              lead="No mystery to it: buy scrap well, process it accurately, sell it to buyers who come back."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {businessModel.map((b, i) => (
              <Reveal key={b.title} delay={i * 70}>
                <div className="h-full rounded-xl border border-navy-100 bg-white p-7">
                  <span className="font-display text-2xl text-gold-500/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-navy-900">
                    {b.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-navy-600/85">
                    {b.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={100}>
            <div className="mt-10 rounded-2xl border border-navy-100 bg-white p-8 sm:p-10">
              <Eyebrow>Revenue model</Eyebrow>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-navy-600/85">
                Revenue is earned by selling processed aluminium products on a per-kilogram
                basis, with margin generated from the spread between scrap procurement
                cost and finished-product selling price.
              </p>

              <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-navy-100 bg-navy-100 sm:grid-cols-3">
                {revenueModel.map((r) => (
                  <div key={r.title} className="bg-white p-7">
                    <h3 className="text-base font-semibold text-navy-900">{r.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-navy-600/85">
                      {r.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Bring us a specification and a schedule."
        lead="We will tell you what we can hold, in what volume, and how quickly we can start."
      />
    </>
  );
}
