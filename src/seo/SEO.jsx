import { useEffect, useMemo } from "react";
import { useLocation } from "react-router";
import { generatePageMetadata } from "./metadata";

const managedSelector = "[data-event-orbit-seo='true']";

const upsertMeta = ({ selector, attribute, name, content }) => {
  if (!content) return;

  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    if (attribute !== "charset") {
      element.setAttribute(attribute, name);
    }
    element.setAttribute("data-event-orbit-seo", "true");
    document.head.appendChild(element);
  }

  if (attribute === "charset") {
    element.setAttribute("charset", content);
  } else {
    element.setAttribute("content", content);
  }
};

const upsertLink = ({ rel, href, type }) => {
  if (!href) return;

  let element = document.head.querySelector(`link[rel="${rel}"][data-event-orbit-seo='true']`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    element.setAttribute("data-event-orbit-seo", "true");
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
  if (type) element.setAttribute("type", type);
};

const validateMetadata = ({ title, description }) => {
  if (import.meta.env.PROD) return;
  if (!title || !description) {
    console.warn("SEO metadata should include both title and description.");
  }
  if (title === description) {
    console.warn("SEO title and description should not be identical.");
  }
};

function SEO(props) {
  const location = useLocation();
  const metadata = useMemo(
    () =>
      generatePageMetadata({
        url: location.pathname + location.search,
        ...props,
      }),
    [location.pathname, location.search, props],
  );

  useEffect(() => {
    if (typeof document === "undefined") return;

    validateMetadata(metadata);

    document.documentElement.setAttribute("lang", metadata.locale.split("_")[0] || "en");
    document.title = metadata.title;

    document.head.querySelectorAll(managedSelector).forEach((node) => node.remove());

    upsertMeta({
      selector: "meta[charset]",
      attribute: "charset",
      name: "charset",
      content: "UTF-8",
    });
    upsertMeta({
      selector: 'meta[name="viewport"]',
      attribute: "name",
      name: "viewport",
      content: "width=device-width, initial-scale=1.0",
    });
    upsertMeta({
      selector: 'meta[name="description"]',
      attribute: "name",
      name: "description",
      content: metadata.description,
    });
    upsertMeta({
      selector: 'meta[name="keywords"]',
      attribute: "name",
      name: "keywords",
      content: metadata.keywords,
    });
    upsertMeta({
      selector: 'meta[name="robots"]',
      attribute: "name",
      name: "robots",
      content: metadata.robots,
    });
    upsertMeta({
      selector: 'meta[name="author"]',
      attribute: "name",
      name: "author",
      content: metadata.author,
    });
    upsertMeta({
      selector: 'meta[name="theme-color"]',
      attribute: "name",
      name: "theme-color",
      content: metadata.themeColor,
    });
    upsertMeta({
      selector: 'meta[http-equiv="content-language"]',
      attribute: "http-equiv",
      name: "content-language",
      content: metadata.locale,
    });

    Object.entries(metadata.openGraph).forEach(([property, content]) => {
      upsertMeta({
        selector: `meta[property="${property}"]`,
        attribute: "property",
        name: property,
        content,
      });
    });

    Object.entries(metadata.twitter).forEach(([name, content]) => {
      upsertMeta({
        selector: `meta[name="${name}"]`,
        attribute: "name",
        name,
        content,
      });
    });

    upsertLink({ rel: "canonical", href: metadata.canonical });
    upsertLink({ rel: "icon", href: "/logo.png", type: "image/png" });
    upsertLink({ rel: "apple-touch-icon", href: "/logo.png" });

    metadata.schema.forEach((schemaItem, index) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-event-orbit-seo", "true");
      script.setAttribute("data-schema-index", String(index));
      script.textContent = JSON.stringify(schemaItem);
      document.head.appendChild(script);
    });
  }, [metadata]);

  return null;
}

export default SEO;
