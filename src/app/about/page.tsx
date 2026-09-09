import type { Metadata } from "next";
import Image from "next/image";
import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";
import { CtaBand, Eyebrow, PageHero, SectionHeading } from "@/components/ui";
import {
  company,
  coreValues,
  growthPlan,
  highlights,
  mission,
  stats,
  usps,
  vision,
} from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: company.longAbout[0],
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Nine years of turning scrap into supply you can plan around."
        lead={company.summary}
        image="/images/team-floor.jpg"
      />

      {/* Story + stats */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow="The company"
                title="A sole proprietorship with an industrial customer list."
              />
              {company.longAbout.map((para) => (
                <p
                  key={para.slice(0, 40)}
                  className="mt-6 text-base leading-relaxed text-navy-600/85"
                >
                  {para}
                </p>
              ))}

              <ul className="mt-10 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
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
            </Reveal>

            <Reveal delay={120}>
              <div className="relative aspect-4/5 overflow-hidden rounded-2xl">
                <Image
                  src="/images/worker.jpg"
                  alt="Worker on the plant floor"
                  fill
                  sizes="(min-width: 1024px) 44vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          <Reveal delay={80}>
            <dl className="mt-20 grid gap-px overflow-hidden rounded-xl border border-navy-100 bg-navy-100 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-white p-8">
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block font-display text-4xl text-navy-800">
                      <Counter value={s.value} />
                    </span>
                    <span className="mt-2 block text-sm font-medium text-navy-800">
                      {s.label}
                    </span>
                    <span className="mt-1 block text-xs text-navy-500">{s.detail}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Vision & mission */}
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
          <div className="grid gap-10 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border border-white/12 bg-white/5 p-10 backdrop-blur-sm">
                <Eyebrow tone="light">Vision</Eyebrow>
                <p className="mt-6 font-display text-2xl leading-relaxed text-white sm:text-[1.7rem]">
                  {vision}
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="h-full rounded-2xl border border-white/12 bg-white/5 p-10 backdrop-blur-sm">
                <Eyebrow tone="light">Mission</Eyebrow>
                <p className="mt-6 font-display text-2xl leading-relaxed text-white sm:text-[1.7rem]">
                  {mission}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Core values"
              title="Five things we do not trade away."
              align="center"
            />
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((v, i) => (
              <Reveal key={v.title} delay={i * 70}>
                <div className="h-full rounded-xl border border-navy-100 bg-navy-50/50 p-8 transition duration-300 hover:border-gold-300 hover:bg-white hover:shadow-[0_24px_50px_-30px_rgba(10,26,48,0.5)]">
                  <span className="font-display text-2xl text-gold-500/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-navy-900">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-600/85">
                    {v.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership + USP */}
      <section className="bg-navy-50/70 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow="Leadership"
                title="Twenty-five years on the shop floor."
                lead="The business is led by a founder with 25 years of hands-on aluminium industry experience — the kind of judgement that tells you what a load is worth before it comes off the truck."
              />
            </Reveal>

            <Reveal delay={120}>
              <div className="grid gap-6 sm:grid-cols-2">
                {usps.map((u) => (
                  <div
                    key={u.title}
                    className="rounded-xl border border-navy-100 bg-white p-7"
                  >
                    <h3 className="text-base font-semibold text-navy-900">{u.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-navy-600/85">
                      {u.body}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Growth roadmap */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Where we are going"
              title="The scale-up plan."
              lead="Five parallel tracks that take the business from a dependable regional recycler to an organised-sector supplier."
            />
          </Reveal>

          <ol className="mt-14 space-y-px overflow-hidden rounded-xl border border-navy-100 bg-navy-100">
            {growthPlan.map((g, i) => (
              <Reveal key={g.step} delay={i * 60} as="li">
                <div className="flex flex-col gap-4 bg-white p-8 transition hover:bg-navy-50/60 sm:flex-row sm:items-center sm:gap-10">
                  <span className="font-display text-3xl text-gold-500/60 sm:w-16">
                    {g.step}
                  </span>
                  <h3 className="text-lg font-semibold text-navy-900 sm:w-72 sm:shrink-0">
                    {g.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-navy-600/85">{g.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        title="Work with a recycler that answers the phone."
        lead="Twenty-two people, nine years, and a customer base that keeps re-ordering. Let's talk about your requirement."
      />
    </>
  );
}
