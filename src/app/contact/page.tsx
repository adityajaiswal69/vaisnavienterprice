import type { Metadata } from "next";
import { Suspense } from "react";
import EnquiryForm from "@/components/EnquiryForm";
import Reveal from "@/components/Reveal";
import { Eyebrow, PageHero, SectionHeading } from "@/components/ui";
import { company, industries } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Talk to ${company.name} about aluminium alloys, ingots, shots, cubes and notch bars. Call ${company.phone} or send your specification.`,
};

export default function ContactPage() {
  const channels = [
    {
      label: "Call us",
      value: company.phone,
      href: company.phoneHref,
      note: "Fastest route to a real answer on grade and availability.",
    },
    {
      label: "Email us",
      value: company.email,
      href: company.emailHref,
      note: "Send a specification sheet and we will reply with what we can hold.",
    },
    {
      label: "WhatsApp",
      value: "Message us",
      href: company.whatsappHref,
      note: "Convenient for quick quantities, photos and follow-ups.",
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us the grade, the tonnage and the date."
        lead="We would rather tell you honestly what we can commit to than promise a specification we cannot hold."
        image="/images/logistics.jpg"
      />

      {/* Channels */}
      <section className="border-b border-navy-100 bg-white">
        <div className="mx-auto grid max-w-7xl gap-px bg-navy-100 lg:grid-cols-3">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group bg-white p-6 transition hover:bg-navy-50/60 sm:p-8"
            >
              <Eyebrow>{c.label}</Eyebrow>
              <p className="mt-3 break-words font-display text-xl text-navy-900 transition group-hover:text-gold-600 sm:text-2xl">
                {c.value}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-navy-600/85">{c.note}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Form */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow="Enquiry"
                title="Send us your requirement."
                lead="The more specific you are about grade, chemistry limits and monthly volume, the more useful our reply will be."
              />

              <div className="mt-10">
                <Suspense
                  fallback={
                    <div className="h-96 animate-pulse rounded-xl bg-navy-50" />
                  }
                >
                  <EnquiryForm />
                </Suspense>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="space-y-8">
                <div className="rounded-xl border border-navy-100 bg-navy-50/60 p-8">
                  <h2 className="font-display text-xl text-navy-900">
                    {company.name}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-navy-600/85">
                    {company.legalStatus} · {company.yearsOperating} years in aluminium
                    recycling · 22-member team
                  </p>

                  <dl className="mt-7 space-y-5 border-t border-navy-200/60 pt-6 text-sm">
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-navy-400">
                        Phone
                      </dt>
                      <dd className="mt-1">
                        <a
                          href={company.phoneHref}
                          className="text-base font-medium text-navy-900 transition hover:text-gold-600"
                        >
                          {company.phone}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-navy-400">
                        Email
                      </dt>
                      <dd className="mt-1">
                        <a
                          href={company.emailHref}
                          className="break-all font-medium text-navy-900 transition hover:text-gold-600"
                        >
                          {company.email}
                        </a>
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="rounded-xl border border-navy-100 bg-white p-8">
                  <h2 className="text-base font-semibold text-navy-900">
                    We typically supply
                  </h2>
                  <ul className="mt-5 space-y-4">
                    {industries.map((ind) => (
                      <li key={ind.title}>
                        <h3 className="text-sm font-semibold text-navy-800">
                          {ind.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-navy-600/85">
                          {ind.body}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl bg-navy-900 p-8">
                  <p className="font-display text-xl leading-relaxed text-white">
                    &ldquo;{company.motto}&rdquo;
                  </p>
                  <p className="mt-4 text-sm text-steel-400">{company.tagline}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
