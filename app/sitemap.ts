import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://teamjacademy.com";
  const routes = [
    "",
    "/about",
    "/classes",
    "/instructors",
    "/schedule",
    "/events",
    "/achievements",
    "/gallery",
    "/training",
    "/join",
    "/contact",
  ];
  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
