import HeroCarousel from "@/components/HeroCarousel";
import Reveal from "@/components/Reveal";
import { BoxButton, CatalogTitle, CategoryCard, ContactSection, slugify } from "@/components/catalog";
import { productCategories, products } from "@/data/products";
import { company, companyFacts, coreValues, highlights, industries, stats, usps } from "@/data/site";

/** Which product lines each industry segment typically buys. */
const industryProducts: Record<string, string[]> = {
  "Die-casters & alloy manufacturers": ["adc-12-alloy", "lm-24-ac-4b-alloy", "aluminium-ingots"],
  "Foundries & re-melters": ["soft-aluminium", "aluminium-ingots", "aluminium-shots"],
  "Steel plants": ["cubes-and-notch-bars", "aluminium-shots", "aluminium-ingots"],
};

function FactIcon({ index }: { index: number }) {
  const cls = "h-8 w-8 text-white/90";
  const icons = [
    // hand holding coin: nature of business
    <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls} aria-hidden><circle cx="15" cy="6" r="3" /><path d="M3 13h3l4 3h5a1.5 1.5 0 0 1 0 3H9M3 19h3l3 1h6l6-3a1.5 1.5 0 0 0-2-2l-3 1" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    // people: employees
    <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls} aria-hidden><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 19a6 6 0 0 1 12 0M14 19a4.5 4.5 0 0 1 7 -3" strokeLinecap="round" /></svg>,
    // calendar: established
    <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls} aria-hidden><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" /></svg>,
    // scales: legal status
    <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls} aria-hidden><path d="M12 3v18M6 21h12M4 7h16M6 7l-3 7a3 3 0 0 0 6 0L6 7Zm12 0-3 7a3 3 0 0 0 6 0l-3-7Z" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    // chart: years
    <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls} aria-hidden><path d="M4 20V10M10 20V4M16 20v-8M22 20H2" strokeLinecap="round" /></svg>,
    // medal: founder experience
    <svg key="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls} aria-hidden><circle cx="12" cy="14" r="6" /><path d="m8 3 2 6M16 3l-2 6M9 3h6" strokeLinecap="round" /></svg>,
    // handshake: customers
    <svg key="6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls} aria-hidden><path d="M2 9h4l4 4 3-3 3 3 2-2 4 3v4l-5 3-5-1-4-4H2V9Z" strokeLinejoin="round" /></svg>,
    // boxes: product lines
    <svg key="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls} aria-hidden><path d="M12 3 3 7.5v9L12 21l9-4.5v-9L12 3Zm0 9L3 7.5M12 12l9-4.5M12 12v9" strokeLinejoin="round" /></svg>,
  ];
  return icons[index % icons.length];
}

export default function HomePage() {
  const slides = products.map((p) => ({
    href: `/products/${p.slug}`,
    image: p.image,
    caption: p.name,
  }));

  return (
    <>
      {/* ----------------------------------------------------- Hero carousel */}
      <HeroCarousel slides={slides} />

      {/* ------------------------------------------------ Profile band (navy) */}
      <section className="sheen relative bg-navy-700 text-white">
        <div className="grid-lines absolute inset-0 opacity-30" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 pb-10 pt-10">
          <div className="grid items-center gap-8 lg:grid-cols-[6rem_1fr_6rem]">
            <div className="hidden justify-center lg:flex">
              <span className="grid h-24 w-24 place-items-center rounded-full border-4 border-gold-400 bg-white text-center text-navy-900">
                <span className="text-[0.62rem] font-bold uppercase leading-tight">
                  Est.
                  <br />
                  <span className="text-2xl font-extrabold text-navy-800">{company.established}</span>
                </span>
              </span>
            </div>
            <div className="text-center">
              <p className="mx-auto max-w-4xl text-lg leading-relaxed sm:text-xl">{company.summary}</p>
              <BoxButton href="/about" variant="white" className="mt-7 px-6 py-2.5 text-base">
                + Read More
              </BoxButton>
            </div>
            <div className="hidden justify-center lg:flex">
              <span className="grid h-24 w-24 place-items-center rounded-full border-4 border-gold-400 bg-white text-center text-navy-900">
                <span className="text-[0.62rem] font-bold uppercase leading-tight">
                  <span className="text-2xl font-extrabold text-navy-800">{company.yearsOperating}</span>
                  <br />
                  years
                </span>
              </span>
            </div>
          </div>

          {/* Facts, two rows of four */}
          {[companyFacts.slice(0, 4), companyFacts.slice(4)].map((row, r) => (
            <dl
              key={r}
              className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 ${
                r === 0 ? "mt-12 border-t border-white/25 pt-8" : "mt-8 border-t border-white/25 pt-8"
              }`}
            >
              {row.map((f, i) => (
                <div
                  key={f.label}
                  className="flex items-center gap-4 lg:border-l lg:border-white/25 lg:px-6 lg:first:border-l-0"
                >
                  <FactIcon index={r * 4 + i} />
                  <div>
                    <dt className="text-sm text-white/80">{f.label}</dt>
                    <dd className="text-base font-semibold">{f.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          ))}

          <div className="mt-12 text-center">
            <p className="text-lg font-semibold">Get in touch with us for best deals</p>
            <BoxButton href="/contact" variant="white" className="mt-4 px-10 py-3 text-lg">
              Contact Us
            </BoxButton>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Catalogue */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <CatalogTitle>Aluminium alloys, ingots and steel-plant products</CatalogTitle>
          </Reveal>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {productCategories.map((category, i) => {
              const inCategory = products.filter((p) => p.category === category);
              return (
                <Reveal key={category} delay={i * 80}>
                  <CategoryCard
                    title={category}
                    href={`/products#${slugify(category)}`}
                    image={inCategory[0]?.image ?? "/images/prod-ingots.jpg"}
                    items={inCategory.map((p) => ({ label: p.name, href: `/products/${p.slug}` }))}
                    highlight={i === 0}
                  />
                </Reveal>
              );
            })}
            {industries.map((ind, i) => {
              const slugs = industryProducts[ind.title] ?? [];
              const items = slugs
                .map((slug) => products.find((p) => p.slug === slug))
                .filter((p): p is (typeof products)[number] => Boolean(p))
                .map((p) => ({ label: p.name, href: `/products/${p.slug}` }));
              return (
                <Reveal key={ind.title} delay={i * 80}>
                  <CategoryCard title={ind.title} href="/products" image={ind.image} items={items} />
                </Reveal>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <BoxButton href="/products">View Complete Range</BoxButton>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- Contact */}
      <ContactSection compact />

      {/* ------------------------------------------------- Strengths panel */}
      <section className="bg-steel-100 py-14">
        <div className="mx-auto max-w-7xl px-6">
          <CatalogTitle>Why buyers work with us</CatalogTitle>

          <div className="mt-10 grid gap-10 lg:grid-cols-[0.3fr_0.38fr_0.32fr] lg:gap-0">
            {/* Headline stat */}
            <div className="lg:pr-10">
              <p className="flex items-baseline gap-1 text-navy-900">
                <span className="text-5xl font-bold">{stats[0].value}</span>
                <span className="text-lg text-navy-600">years</span>
              </p>
              <p className="mt-1 text-sm text-navy-600">{stats[0].label}</p>
              <ul className="mt-6 space-y-2.5">
                {stats.slice(1).map((s) => (
                  <li key={s.label} className="flex items-baseline gap-3 text-sm text-navy-800">
                    <span className="w-8 text-right text-xl font-semibold text-navy-900">{s.value}</span>
                    {s.label}
                  </li>
                ))}
              </ul>
            </div>

            {/* Highlights */}
            <ul className="space-y-3 lg:border-l lg:border-steel-300 lg:px-10">
              {highlights.map((h) => (
                <li key={h} className="flex items-center gap-3 text-[0.95rem] text-navy-800">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-600 text-white" aria-hidden>
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                      <path d="m8.1 13.6-3.4-3.4 1.4-1.4 2 2 5.8-5.8 1.4 1.4-7.2 7.2Z" />
                    </svg>
                  </span>
                  {h}
                </li>
              ))}
            </ul>

            {/* Core values */}
            <div className="lg:border-l lg:border-steel-300 lg:pl-10">
              <p className="inline-flex items-center gap-2 text-lg text-navy-900">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-emerald-600" aria-hidden>
                  <path d="M2 10h4v11H2V10Zm6 0 3.5-7a2 2 0 0 1 2 2v4h5a2 2 0 0 1 2 2.3l-1.5 7A2 2 0 0 1 17 21H8V10Z" />
                </svg>
                Core values
              </p>
              <ul className="mt-4 space-y-3">
                {coreValues.map((v) => (
                  <li key={v.title} className="text-sm text-navy-800">
                    <span className="font-semibold text-navy-900">{v.title}.</span> {v.body}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-12 font-semibold text-navy-900">What sets us apart</p>
          <div className="mt-5 grid gap-px bg-steel-300 sm:grid-cols-2 lg:grid-cols-4">
            {usps.map((u) => (
              <div key={u.title} className="bg-steel-100 p-5 first:pl-0">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-lg font-semibold text-navy-800 shadow-sm">
                    {u.title.charAt(0)}
                  </span>
                  <h3 className="font-semibold text-navy-900">{u.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-navy-700">{u.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <BoxButton href="/about">View Company Profile</BoxButton>
          </div>
        </div>
      </section>
    </>
  );
}
