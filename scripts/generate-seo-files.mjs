import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");

const siteUrl = (process.env.VITE_SITE_URL || "https://eventorbit.com").replace(/\/$/, "");
const apiBaseUrl = (process.env.VITE_API_BASE_URL || "http://localhost:5000").replace(/\/$/, "");

const slugify = (value = "") =>
  String(value)
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const categorySlug = (category = {}) => {
  const slug = slugify(category.name);
  return slug === "wedding-halls" ? "event-venues" : slug;
};

const vendorSlug = (vendor = {}) =>
  slugify(
    vendor.businessName ||
      vendor.name ||
      vendor.fullName ||
      [vendor.firstName, vendor.lastName].filter(Boolean).join(" "),
  );

const fetchJson = async (pathName) => {
  try {
    const response = await fetch(`${apiBaseUrl}${pathName}`);
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
};

const staticRoutes = [
  "/",
  "/categories",
  "/services",
  "/vendors",
  "/blog",
  "/about",
  "/contact",
  "/help",
  "/help/signup",
  "/help/password-reset",
  "/help/billing",
];

const collectDynamicRoutes = async () => {
  const routes = [];

  const categories = await fetchJson("/api/categories/");
  (categories?.data || []).forEach((category) => {
    const slug = categorySlug(category);
    if (slug) routes.push(`/category/${slug}`);
  });

  const vendors = await fetchJson("/api/vendor/all");
  (vendors?.vendors || []).forEach((vendor) => {
    const slug = vendorSlug(vendor);
    if (slug) routes.push(`/vendor/${slug}`);
  });

  const services = await fetchJson("/api/services/getAllServices");
  (services?.data || []).forEach((service) => {
    const serviceId = service.id || service._id;
    if (serviceId) routes.push(`/services/${serviceId}`);
  });

  const blogs = await fetchJson("/api/blogs/public");
  const blogItems = blogs?.data?.items || blogs?.items || [];
  blogItems.forEach((blog) => {
    if (blog.slug) routes.push(`/blog/${blog.slug}`);
  });

  return routes;
};

const buildSitemap = (routes) => {
  const uniqueRoutes = [...new Set(routes)];
  const urls = uniqueRoutes
    .map(
      (route) => `  <url>
    <loc>${siteUrl}${route === "/" ? "" : route}</loc>
    <changefreq>${route === "/" ? "daily" : "weekly"}</changefreq>
    <priority>${route === "/" ? "1.0" : "0.7"}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
};

const buildRobots = () => `User-agent: *
Allow: /
Disallow: /admin
Disallow: /auth
Disallow: /vendor/dashboard
Disallow: /customer/dashboard
Disallow: /checkout

Sitemap: ${siteUrl}/sitemap.xml
`;

const dynamicRoutes = await collectDynamicRoutes();
await fs.mkdir(publicDir, { recursive: true });
await fs.writeFile(
  path.join(publicDir, "sitemap.xml"),
  buildSitemap([...staticRoutes, ...dynamicRoutes]),
);
await fs.writeFile(path.join(publicDir, "robots.txt"), buildRobots());

console.log(
  `SEO files generated with ${staticRoutes.length + dynamicRoutes.length} candidate route(s).`,
);
