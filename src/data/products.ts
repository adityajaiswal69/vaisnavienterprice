/**
 * Product catalogue.
 *
 * Purity figures and product descriptions come from the company pitch deck.
 * Chemistry tables reproduce the *published industry standard* for each alloy
 * (JIS H5302 for ADC-12, BS 1490 / JIS AC-4B for LM-24) and are labelled as
 * indicative — actual per-heat chemistry is confirmed against each order.
 */

export type SpecRow = { element: string; range: string };

export type Product = {
  slug: string;
  name: string;
  shortName: string;
  category: "Alloys" | "Ingots & soft metal" | "Steel-plant products";
  grade: string;
  summary: string;
  description: string[];
  image: string;
  keyFacts: { label: string; value: string }[];
  applications: string[];
  /** Standard the chemistry table is quoted against, if any. */
  standard?: string;
  chemistry?: SpecRow[];
  forms: string[];
};

export const products: Product[] = [
  {
    slug: "adc-12-alloy",
    name: "ADC-12 Aluminium Alloy",
    shortName: "ADC-12 Alloy",
    category: "Alloys",
    grade: "Die-casting grade",
    summary:
      "The workhorse pressure die-casting alloy — high fluidity, good strength and consistent castability.",
    description: [
      "ADC-12 is the most widely used aluminium pressure die-casting alloy in India, valued for its fluidity, dimensional stability and resistance to hot cracking. Vaishnavi Enterprises supplies ADC-12 produced from grade-segregated aluminium scrap and refined to a furnace-ready condition.",
      "Because the alloy is made to order against the grade you run, each consignment arrives with the same handling and melting behaviour as the last — no surprises when the metal hits the holding furnace.",
    ],
    image: "/images/prod-adc12.jpg",
    keyFacts: [
      { label: "Grade", value: "ADC-12 (die-casting)" },
      { label: "Standard referenced", value: "JIS H5302" },
      { label: "Supplied as", value: "Ingots" },
      { label: "Typical use", value: "Pressure die-casting" },
    ],
    applications: [
      "Automotive housings and covers",
      "Two-wheeler and engine components",
      "Electrical and switchgear enclosures",
      "General-purpose pressure die-cast parts",
    ],
    standard: "JIS H5302",
    chemistry: [
      { element: "Silicon (Si)", range: "9.6 – 12.0%" },
      { element: "Copper (Cu)", range: "1.5 – 3.5%" },
      { element: "Iron (Fe)", range: "1.3% max" },
      { element: "Manganese (Mn)", range: "0.5% max" },
      { element: "Magnesium (Mg)", range: "0.3% max" },
      { element: "Nickel (Ni)", range: "0.5% max" },
      { element: "Zinc (Zn)", range: "1.0% max" },
      { element: "Tin (Sn)", range: "0.3% max" },
      { element: "Aluminium (Al)", range: "Balance" },
    ],
    forms: ["Notched ingots", "Customer-specified ingot weights"],
  },
  {
    slug: "lm-24-ac-4b-alloy",
    name: "LM-24 / AC-4B Aluminium Alloy",
    shortName: "LM-24 / AC-4B",
    category: "Alloys",
    grade: "Die-casting grade",
    summary:
      "A pressure die-casting alloy for higher-strength castings where good machinability matters.",
    description: [
      "LM-24 (and its close JIS equivalent AC-4B) is a copper-bearing aluminium–silicon die-casting alloy used where castings need more strength and better machinability than a straight Al-Si grade delivers.",
      "Vaishnavi Enterprises processes LM-24 / AC-4B from segregated scrap streams, holding the chemistry within the standard band so that die-casters can run it without adjusting their process.",
    ],
    image: "/images/prod-lm24.jpg",
    keyFacts: [
      { label: "Grade", value: "LM-24 / AC-4B" },
      { label: "Standard referenced", value: "BS 1490 / JIS H5202" },
      { label: "Supplied as", value: "Ingots" },
      { label: "Typical use", value: "Pressure & gravity die-casting" },
    ],
    applications: [
      "Structural die-cast components",
      "Pump and compressor bodies",
      "Machined castings requiring good finish",
      "General engineering castings",
    ],
    standard: "BS 1490 (LM-24) / JIS H5202 (AC-4B)",
    chemistry: [
      { element: "Silicon (Si)", range: "7.5 – 9.5%" },
      { element: "Copper (Cu)", range: "3.0 – 4.0%" },
      { element: "Iron (Fe)", range: "1.3% max" },
      { element: "Manganese (Mn)", range: "0.5% max" },
      { element: "Magnesium (Mg)", range: "0.3% max" },
      { element: "Nickel (Ni)", range: "0.5% max" },
      { element: "Zinc (Zn)", range: "3.0% max" },
      { element: "Lead (Pb)", range: "0.3% max" },
      { element: "Tin (Sn)", range: "0.2% max" },
      { element: "Titanium (Ti)", range: "0.2% max" },
      { element: "Aluminium (Al)", range: "Balance" },
    ],
    forms: ["Notched ingots", "Customer-specified ingot weights"],
  },
  {
    slug: "aluminium-ingots",
    name: "Aluminium Ingots",
    shortName: "Aluminium Ingots",
    category: "Ingots & soft metal",
    grade: "~98% purity",
    summary:
      "Refined aluminium ingots at approximately 98% purity — clean, stackable, furnace-ready charge material.",
    description: [
      "Our standard aluminium ingots are refined to approximately 98% purity from grade-segregated hard scrap. They are cast in consistent sizes so they stack cleanly, charge predictably and melt without the dross load that mixed scrap brings with it.",
      "Ingots are the default choice for re-melters and alloy manufacturers who want to control their own final chemistry while starting from a known, uniform base metal.",
    ],
    image: "/images/prod-ingots.jpg",
    keyFacts: [
      { label: "Purity", value: "~98% (approx.)" },
      { label: "Category", value: "Refined ingot" },
      { label: "Supplied as", value: "Cast ingots" },
      { label: "Typical use", value: "Re-melting, alloying" },
    ],
    applications: [
      "Alloy manufacturing base metal",
      "Foundry re-melting stock",
      "Deoxidation applications",
      "General secondary-aluminium supply",
    ],
    forms: ["Cast ingots", "Bundled and strapped for transport"],
  },
  {
    slug: "soft-aluminium",
    name: "Soft Aluminium",
    shortName: "Soft Aluminium",
    category: "Ingots & soft metal",
    grade: "~97% purity",
    summary:
      "Hard scrap converted into refined soft aluminium at approximately 97% purity.",
    description: [
      "Converting hard aluminium scrap into soft aluminium is the core of what Vaishnavi Enterprises does. Incoming hard scrap is segregated by grade, processed and refined to roughly 97% purity, producing a soft, workable metal suited to downstream alloying and casting.",
      "This is the product that replaces a share of virgin aluminium in a customer's charge mix — at a materially lower energy and cost footprint than primary metal.",
    ],
    image: "/images/prod-soft-aluminium.jpg",
    keyFacts: [
      { label: "Purity", value: "~97% (approx.)" },
      { label: "Input", value: "Hard aluminium scrap" },
      { label: "Supplied as", value: "Ingots / blocks" },
      { label: "Typical use", value: "Alloying, casting" },
    ],
    applications: [
      "Substitution for a share of virgin aluminium",
      "Alloy preparation",
      "Foundry charge material",
      "Downstream casting operations",
    ],
    forms: ["Ingots", "Blocks", "Customer-specified formats"],
  },
  {
    slug: "aluminium-shots",
    name: "Aluminium Shots",
    shortName: "Aluminium Shots",
    category: "Ingots & soft metal",
    grade: "Granulated feedstock",
    summary:
      "Granulated aluminium feedstock that dissolves fast and doses accurately.",
    description: [
      "Aluminium shots are granulated feedstock produced for applications where the metal needs to dissolve quickly and be dosed by weight rather than by piece. The high surface-area-to-volume ratio means fast, predictable dissolution.",
      "Shots are supplied to steel plants and industrial users who need controlled, repeatable additions rather than bulk ingot charging.",
    ],
    image: "/images/prod-shots.jpg",
    keyFacts: [
      { label: "Form", value: "Granulated shots" },
      { label: "Category", value: "Feedstock" },
      { label: "Supplied as", value: "Bagged / bulk" },
      { label: "Typical use", value: "Deoxidation, dosing" },
    ],
    applications: [
      "Steel deoxidation",
      "Controlled metal additions",
      "Industrial feedstock applications",
      "Processes requiring rapid dissolution",
    ],
    forms: ["Bagged shots", "Bulk supply to customer specification"],
  },
  {
    slug: "cubes-and-notch-bars",
    name: "TATA / DSP Cubes & NOCH Bars",
    shortName: "Cubes & NOCH Bars",
    category: "Steel-plant products",
    grade: "Steel-plant and industrial grades",
    summary:
      "Compacted cubes and notch bars produced to steel-plant and industrial grades.",
    description: [
      "Cubes and NOCH (notch) bars are produced specifically for steel-plant consumption, where aluminium is added for deoxidation and metallurgical control. Both formats are made to handle, store and charge cleanly in a steel-making environment.",
      "Vaishnavi Enterprises has supplied this product line into steel plants directly, and these relationships are a core part of the business.",
    ],
    image: "/images/prod-cubes-bars.jpg",
    keyFacts: [
      { label: "Grade", value: "Steel-plant & industrial" },
      { label: "Formats", value: "Cubes, notch bars" },
      { label: "Supplied as", value: "Compacted cubes / cast bars" },
      { label: "Typical use", value: "Steel deoxidation" },
    ],
    applications: [
      "Steel-plant deoxidation",
      "Ladle metallurgy additions",
      "Industrial aluminium additions",
      "Bulk supply to steel-making operations",
    ],
    forms: ["Cubes", "NOCH (notch) bars", "Customer-specified sizes"],
  },
];

export const productCategories = [
  "Alloys",
  "Ingots & soft metal",
  "Steel-plant products",
] as const;

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
