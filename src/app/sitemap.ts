import type { MetadataRoute } from "next";
import { products } from "@/data/products";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vaishnavienterprises.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/products", priority: 0.9 },
    { path: "/process", priority: 0.7 },
    { path: "/sustainability", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
    { path: "/credits", priority: 0.2 },
  ];

  const now = new Date();

  return [
    ...staticRoutes.map((r) => ({
      url: `${BASE}${r.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: r.priority,
    })),
    ...products.map((p) => ({
      url: `${BASE}/products/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}
