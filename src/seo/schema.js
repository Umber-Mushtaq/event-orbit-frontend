export const BRAND_NAME = "Event Orbit";
export const DEFAULT_LOCALE = "en_US";
export const DEFAULT_AUTHOR = "Event Orbit Team";
export const DEFAULT_BASE_URL = "https://eventorbit.com";
export const DEFAULT_DESCRIPTION =
  "Event Orbit helps customers discover trusted event vendors, categories, services, and planning resources in one marketplace.";
export const DEFAULT_KEYWORDS = [
  "event planning",
  "wedding vendors",
  "event services",
  "wedding halls",
  "catering",
  "photography",
  "Event Orbit",
];
export const DEFAULT_IMAGE = "/logo.png";

export const getSiteUrl = () =>
  import.meta.env.VITE_SITE_URL ||
  (typeof window !== "undefined" ? window.location.origin : DEFAULT_BASE_URL);

export const buildAbsoluteUrl = (value = "") => {
  if (!value) return getSiteUrl();
  if (/^https?:\/\//i.test(value)) return value;

  const siteUrl = getSiteUrl().replace(/\/$/, "");
  const path = String(value).startsWith("/") ? value : `/${value}`;
  return `${siteUrl}${path}`;
};

export const organizationSchema = ({
  name = BRAND_NAME,
  url = getSiteUrl(),
  logo = DEFAULT_IMAGE,
  sameAs = [],
} = {}) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name,
  url: buildAbsoluteUrl(url),
  logo: buildAbsoluteUrl(logo),
  sameAs,
});

export const localBusinessSchema = ({
  name,
  description,
  image,
  url,
  telephone,
  address,
  priceRange = "$$",
} = {}) => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: name || BRAND_NAME,
  description: description || DEFAULT_DESCRIPTION,
  image: buildAbsoluteUrl(image || DEFAULT_IMAGE),
  url: buildAbsoluteUrl(url || "/"),
  telephone,
  priceRange,
  address:
    typeof address === "string"
      ? {
          "@type": "PostalAddress",
          streetAddress: address,
        }
      : address,
});

export const articleSchema = ({
  title,
  description,
  image,
  url,
  author = DEFAULT_AUTHOR,
  publishedAt,
  updatedAt,
} = {}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  image: buildAbsoluteUrl(image || DEFAULT_IMAGE),
  url: buildAbsoluteUrl(url || "/blog"),
  author: {
    "@type": "Person",
    name: author,
  },
  publisher: organizationSchema(),
  datePublished: publishedAt,
  dateModified: updatedAt || publishedAt,
});

export const faqPageSchema = (items = []) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
});

export const breadcrumbSchema = (items = []) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: buildAbsoluteUrl(item.url),
  })),
});

export const websiteSchema = ({
  name = BRAND_NAME,
  url = getSiteUrl(),
  searchPath = "/services?search={search_term_string}",
} = {}) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name,
  url: buildAbsoluteUrl(url),
  potentialAction: {
    "@type": "SearchAction",
    target: buildAbsoluteUrl(searchPath),
    "query-input": "required name=search_term_string",
  },
});

export const generateSchema = (schema) => {
  if (!schema) return [organizationSchema(), websiteSchema()];
  return Array.isArray(schema) ? schema.filter(Boolean) : [schema];
};
