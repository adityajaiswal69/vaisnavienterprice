import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui";
import credits from "@/data/image-credits.json";

export const metadata: Metadata = {
  title: "Image credits",
  description:
    "Licensing and attribution for the photography used on this website.",
};

type Credit = {
  file: string;
  title: string;
  author: string;
  license: string;
  source: string;
};

export default function CreditsPage() {
  const entries = Object.entries(credits as Record<string, Credit>).sort(
    ([a], [b]) => a.localeCompare(b),
  );

  return (
    <>
      <PageHero
        eyebrow="Credits"
        title="Photography licensing and attribution."
        lead="All photography on this site is used under the Unsplash License or a Creative Commons / public-domain licence. Company logo and branding are the property of Vaishnavi Enterprises."
        image="/images/texture.jpg"
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <p className="max-w-3xl text-sm leading-relaxed text-navy-600/85">
            Images are illustrative of the industry and processes described and do not
            necessarily depict Vaishnavi Enterprises&rsquo; own premises, plant or
            personnel. Replacing them with photography of the company&rsquo;s own
            operations is recommended before launch.
          </p>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {entries.map(([slot, credit]) => (
              <li
                key={slot}
                className="overflow-hidden rounded-xl border border-navy-100 bg-white"
              >
                <div className="relative aspect-16/10">
                  <Image
                    src={credit.file}
                    alt={credit.title}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs uppercase tracking-wide text-navy-400">{slot}</p>
                  <p className="mt-1.5 text-sm font-medium text-navy-900">
                    {credit.title}
                  </p>
                  <p className="mt-2 text-xs text-navy-500">
                    {credit.author} · {credit.license}
                  </p>
                  <a
                    href={credit.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-xs font-semibold text-navy-700 underline transition hover:text-gold-600"
                  >
                    View source
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
