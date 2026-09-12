"use client";

import Image from "next/image";
import { useState } from "react";

/** Thumbnail column + large image, as on a supplier product listing. */
export default function ProductGallery({
  images,
  alt,
  priority = false,
}: {
  images: string[];
  alt: string;
  priority?: boolean;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex gap-3">
      <div className="flex w-[4.5rem] shrink-0 flex-col gap-3" role="tablist" aria-label="Product photos">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Photo ${i + 1} of ${images.length}`}
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(i)}
            className={`relative aspect-square overflow-hidden border bg-white transition ${
              i === active ? "border-navy-600 ring-1 ring-navy-600" : "border-steel-300 hover:border-navy-400"
            }`}
          >
            <Image src={src} alt="" fill sizes="72px" className="object-cover" />
          </button>
        ))}
      </div>
      <div className="relative aspect-square min-w-0 flex-1 overflow-hidden border border-steel-300 bg-white">
        <Image
          key={images[active]}
          src={images[active]}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 34vw, 100vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
