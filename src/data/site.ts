/**
 * Single source of truth for site copy.
 *
 * Every fact here is taken from the Vaishnavi Enterprises pitch deck. Two
 * sections of that deck are deliberately NOT published: the fund ask /
 * fund-utilisation split, and the named competitor comparison. Both are
 * investor-room material rather than public marketing content.
 */

export const company = {
  name: "Vaishnavi Enterprises",
  shortName: "Vaishnavi",
  tagline: "Turning aluminium scrap into certified, furnace-ready alloy",
  motto: "Building a better tomorrow",
  legalStatus: "Sole Proprietorship",
  established: 2016,
  yearsOperating: "9+",
  phone: "+91 96877 28125",
  phoneHref: "tel:+919687728125",
  email: "vaishnavienterprise1611@gmail.com",
  emailHref: "mailto:vaishnavienterprise1611@gmail.com",
  whatsappHref: "https://wa.me/919687728125",
  summary:
    "Vaishnavi Enterprises is an aluminium recycling business with over nine years of operating experience. We convert hard aluminium scrap into refined, furnace-ready soft aluminium — ingots, alloys, shots, cubes and bars — supplied to alloy manufacturers, foundries and steel plants.",
  longAbout: [
    "Vaishnavi Enterprises is a sole-proprietorship aluminium recycling business with over nine years of operating experience. The company converts hard aluminium scrap into refined, furnace-ready soft aluminium, including ingots, alloys, shots, cubes and bars, which are supplied to alloy manufacturers, foundries and steel plants.",
    "The business is led by a founder with 25 years of hands-on aluminium industry experience and operates through a trusted vendor network, grade-wise segregation, customer-specific processing and dependable B2B supply.",
  ],
  pullQuote:
    "Vaishnavi Enterprises transforms aluminium scrap into high-quality, furnace-ready alloys, ingots and shots — driving sustainable recycling and reliable supply for India's alloy and steel industries.",
} as const;

export const stats = [
  { value: "9+", label: "Years in aluminium recycling", detail: "Continuous operations since 2016" },
  { value: "25", label: "Years of founder experience", detail: "Hands-on across the aluminium trade" },
  { value: "22", label: "Member team", detail: "Procurement, processing and despatch" },
  { value: "10", label: "Active B2B customers", detail: "Die-casters, foundries and steel plants" },
] as const;

export const highlights = [
  "9+ years in aluminium recycling",
  "25 years of founder experience",
  "10 active B2B customers",
  "22-member operating team",
  "Ingots, alloys, shots, cubes and bars",
  "Strong vendor network and steel-plant relationships",
] as const;

export const vision =
  "To be a trusted, organised-sector leader in aluminium recycling, known for consistent quality and dependable supply.";

export const mission =
  "To responsibly process aluminium scrap into high-purity ingots, alloys and shots, reducing raw-material dependency while supporting India's circular metal economy.";

export const coreValues = [
  {
    title: "Quality & Consistency",
    body: "Every batch is processed to the grade it was bought for — the same material, order after order.",
  },
  {
    title: "Reliability",
    body: "Committed volumes delivered on committed dates, so your furnace schedule holds.",
  },
  {
    title: "Sustainability",
    body: "Secondary aluminium takes a fraction of the energy of primary metal. Recycling is the product.",
  },
  {
    title: "Responsible Recycling",
    body: "Scrap is sourced, segregated and processed through a traceable, accountable vendor network.",
  },
  {
    title: "Customer Focus",
    body: "Material is processed to your specification, not to a generic house standard.",
  },
] as const;

export const challenges = [
  {
    title: "Fragmented supply",
    body: "Unorganised scrap suppliers lead to inconsistent sourcing and unpredictable availability.",
  },
  {
    title: "Inconsistent purity",
    body: "Mixed-grade scrap makes maintaining a required purity level difficult batch to batch.",
  },
  {
    title: "High virgin aluminium cost",
    body: "Rising primary-metal prices push up manufacturing expenses across the value chain.",
  },
  {
    title: "High energy consumption",
    body: "Primary aluminium production is highly energy-intensive compared with secondary metal.",
  },
  {
    title: "Reliable supply gap",
    body: "Industrial buyers need consistent, specification-based recycled aluminium they can plan around.",
  },
] as const;

export const solutions = [
  {
    title: "Grade-wise segregation",
    body: "Scrap is sorted and separated by grade on arrival to keep contamination out of the melt.",
  },
  {
    title: "Customer-specific processing",
    body: "Material is processed against the grade and specification each customer actually runs.",
  },
  {
    title: "Quality & purity focus",
    body: "Disciplined, repeatable processing keeps output consistent from one consignment to the next.",
  },
  {
    title: "Furnace-ready products",
    body: "Refined ingots, alloys, shots and cubes arrive ready to charge — no re-work at your end.",
  },
  {
    title: "Reliable B2B supply",
    body: "Long-term vendor and customer relationships underwrite dependable, repeatable volumes.",
  },
] as const;

export const usps = [
  {
    title: "Experienced leadership",
    body: "25 years of hands-on aluminium industry expertise behind every buying and processing decision.",
  },
  {
    title: "Proven track record",
    body: "Nine-plus years of continuous operations with a stable, repeat B2B customer base.",
  },
  {
    title: "Grade-wise processing",
    body: "Consistent, customer-specific material processing rather than one-size-fits-all output.",
  },
  {
    title: "Strong network",
    body: "An established vendor base and direct working relationships with steel plants.",
  },
] as const;

export const processSteps = [
  {
    step: "01",
    title: "Scrap procurement",
    body: "Aluminium scrap is purchased at market rates from a vendor network built over nine years of trading.",
    image: "/images/scrap-yard.jpg",
  },
  {
    step: "02",
    title: "Grade-wise processing",
    body: "Incoming material is sorted, segregated and processed according to grade and customer specification.",
    image: "/images/segregation.jpg",
  },
  {
    step: "03",
    title: "Melting & refining",
    body: "Segregated scrap is melted and refined into soft aluminium, alloys, shots, cubes and notch bars.",
    image: "/images/furnace.jpg",
  },
  {
    step: "04",
    title: "B2B despatch",
    body: "Finished, furnace-ready product is despatched to alloy manufacturers, foundries and steel plants.",
    image: "/images/logistics.jpg",
  },
] as const;

export const industries = [
  {
    title: "Die-casters & alloy manufacturers",
    body: "ADC-12 and LM-24 / AC-4B alloy supplied to specification for pressure and gravity die-casting.",
    image: "/images/prod-adc12.jpg",
  },
  {
    title: "Foundries & re-melters",
    body: "Soft aluminium, ingots and shots as clean, predictable furnace feedstock.",
    image: "/images/pouring.jpg",
  },
  {
    title: "Steel plants",
    body: "TATA / DSP cubes and NOCH bars for deoxidation and steel-making applications.",
    image: "/images/steel-plant.jpg",
  },
] as const;

export const market = {
  headline: "A ₹-scale market moving to the organised sector",
  tam: {
    label: "TAM",
    title: "India's aluminium scrap market",
    body: "Valued at approximately US$3.8 billion in 2024 and projected to reach US$11.2 billion by 2034, growing at around 10.9% CAGR.",
  },
  sam: {
    label: "SAM",
    title: "Organised secondary-aluminium supply",
    body: "Serving die-casters, alloy manufacturers, foundries, re-melters and steel plants that buy to specification.",
  },
  som: {
    label: "SOM",
    title: "Our immediate opportunity",
    body: "Expanding the existing 10-customer B2B base, the vendor network, steel-plant supply and processing capacity.",
  },
  drivers: [
    "Rising demand for recycled aluminium",
    "Corporate sustainability requirements",
    "Automotive and EV sector growth",
    "Increasing formalisation of the recycling industry",
  ],
  sourceLabel: "Allied Market Research — India Aluminium Scrap Market",
  sourceUrl:
    "https://www.marketresearch.com/Allied-Market-Research-v4029/India-Aluminum-Scrap-41865680/",
} as const;

export const growthPlan = [
  {
    step: "01",
    title: "Expand processing capacity",
    body: "Upgrade and add furnaces and segregation capacity to increase throughput.",
  },
  {
    step: "02",
    title: "Strengthen the vendor network",
    body: "Add scrap suppliers to secure consistent and higher input volumes.",
  },
  {
    step: "03",
    title: "Expand the customer base",
    body: "Acquire more steel plants, alloy manufacturers, foundries and re-melters.",
  },
  {
    step: "04",
    title: "Enhance quality assurance",
    body: "Introduce formal grade testing to ensure consistent purity against customer specifications.",
  },
  {
    step: "05",
    title: "Diversify the product portfolio",
    body: "Widen the range of aluminium alloys, ingots, shots, cubes and other processed products.",
  },
] as const;

export const businessModel = [
  {
    title: "Scrap procurement",
    body: "Purchase aluminium scrap from a trusted vendor network at prevailing market rates.",
  },
  {
    title: "Grade-wise processing",
    body: "Sort, segregate and process scrap according to grade and customer specifications.",
  },
  {
    title: "B2B product sales",
    body: "Supply ingots, alloys, shots, cubes and bars to alloy manufacturers, foundries and steel plants.",
  },
  {
    title: "Processing margin",
    body: "Earn margin on the spread between scrap procurement cost and processed-product selling price.",
  },
] as const;

export const revenueModel = [
  {
    title: "Per-kg pricing",
    body: "Revenue is generated through product sales priced on a per-kilogram basis.",
  },
  {
    title: "Grade-based pricing",
    body: "Higher-value products and specific grades command different selling prices.",
  },
  {
    title: "Processing margin",
    body: "Profit is earned from the spread between scrap procurement cost and processed-product selling price.",
  },
] as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/process", label: "Process" },
  { href: "/sustainability", label: "Sustainability" },
  { href: "/contact", label: "Contact" },
] as const;
