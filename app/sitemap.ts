import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://founderiq.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/validate", "/canvas", "/pitch", "/market", "/report", "/history"];
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
