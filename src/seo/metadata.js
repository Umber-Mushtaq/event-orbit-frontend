import {
  BRAND_NAME,
  DEFAULT_AUTHOR,
  DEFAULT_DESCRIPTION,
  DEFAULT_IMAGE,
  DEFAULT_KEYWORDS,
  DEFAULT_LOCALE,
  buildAbsoluteUrl,
  generateSchema,
  getSiteUrl,
} from "./schema";

const normalizeKeywords = (keywords) => {
  if (Array.isArray(keywords)) return keywords.filter(Boolean).join(", ");
  return keywords || DEFAULT_KEYWORDS.join(", ");
};

const normalizePath = (path = "") => {
  if (!path) return "/";
  return path.startsWith("/") ? path : `/${path}`;
};

export const generateCanonicalUrl = (canonical, url) => {
  const target = canonical || url || (typeof window !== "undefined" ? window.location.pathname : "/");
  return buildAbsoluteUrl(normalizePath(target));
};

export const generateOpenGraph = ({
  title,
  description,
  image,
  url,
  type = "website",
  locale = DEFAULT_LOCALE,
}) => ({
  "og:site_name": BRAND_NAME,
  "og:title": title,
  "og:description": description,
  "og:type": type,
  "og:url": url,
  "og:image": buildAbsoluteUrl(image || DEFAULT_IMAGE),
  "og:locale": locale,
});

export const generateTwitterMetadata = ({
  title,
  description,
  image,
}) => ({
  "twitter:card": "summary_large_image",
  "twitter:title": title,
  "twitter:description": description,
  "twitter:image": buildAbsoluteUrl(image || DEFAULT_IMAGE),
});

export const generatePageMetadata = ({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords,
  canonical,
  image = DEFAULT_IMAGE,
  url,
  type = "website",
  robots = "index,follow",
  schema,
  locale = DEFAULT_LOCALE,
  author = DEFAULT_AUTHOR,
} = {}) => {
  const resolvedTitle = title
    ? title.includes(BRAND_NAME)
      ? title
      : `${title} | ${BRAND_NAME}`
    : `${BRAND_NAME} | Official Website`;
  const resolvedDescription = description || DEFAULT_DESCRIPTION;
  const canonicalUrl = generateCanonicalUrl(canonical, url);
  const resolvedImage = buildAbsoluteUrl(image || DEFAULT_IMAGE);

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    keywords: normalizeKeywords(keywords),
    canonical: canonicalUrl,
    image: resolvedImage,
    url: canonicalUrl,
    type,
    robots,
    locale,
    author,
    themeColor: "#f59e0b",
    baseUrl: getSiteUrl(),
    openGraph: generateOpenGraph({
      title: resolvedTitle,
      description: resolvedDescription,
      image: resolvedImage,
      url: canonicalUrl,
      type,
      locale,
    }),
    twitter: generateTwitterMetadata({
      title: resolvedTitle,
      description: resolvedDescription,
      image: resolvedImage,
    }),
    schema: generateSchema(schema),
  };
};
