import type { Metadata } from "next";
import { Breadcrumb, CatalogTitle, ContactSection } from "@/components/catalog";
import { company, industries } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Us",
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
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 pt-5">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact Us" }]} />
          <div className="mt-4">
            <CatalogTitle align="left" as="h1">
              Contact Us
            </CatalogTitle>
            <p className="mt-5 max-w-4xl text-lg text-navy-800">
              Tell us the grade, the tonnage and the date. We would rather tell you honestly what we can
              commit to than promise a specification we cannot hold.
            </p>
          </div>
        </div>
      </div>

      {/* Channels */}
      <section className="bg-white pt-8">
        <div className="mx-auto grid max-w-7xl gap-px border-y border-steel-200 bg-steel-200 lg:grid-cols-3">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              // min-w-0 lets the long email wrap instead of forcing the grid track open
              className="group min-w-0 bg-white p-6 transition hover:bg-navy-50/60 sm:p-8"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">{c.label}</p>
              <p className="mt-3 break-words text-xl font-semibold text-navy-900 transition group-hover:text-gold-600 sm:text-2xl">
                {c.value}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-navy-600/85">{c.note}</p>
            </a>
          ))}
        </div>
      </section>

      <div className="bg-white pt-8">
        <ContactSection compact={false} />
      </div>

      <section className="bg-steel-100 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <CatalogTitle>We typically supply</CatalogTitle>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {industries.map((ind) => (
              <div key={ind.title} className="bg-white p-6">
                <h3 className="text-lg font-semibold text-navy-900">{ind.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-700">{ind.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
