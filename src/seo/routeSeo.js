import {
  DEFAULT_DESCRIPTION,
  breadcrumbSchema,
  faqPageSchema,
  organizationSchema,
  websiteSchema,
} from "./schema";

const helpFaqs = [
  {
    question: "How do I create an Event Orbit account?",
    answer: "Visit the signup page, choose your role, and complete the registration form.",
  },
  {
    question: "How do I find vendors?",
    answer: "Use categories, services, vendors, and search filters to compare marketplace listings.",
  },
  {
    question: "How do I contact Event Orbit?",
    answer: "Use the contact page form or the listed contact details to reach the team.",
  },
];

const staticRoutes = [
  {
    pattern: /^\/$/,
    metadata: {
      title: "Event Orbit | Official Website",
      description:
        "Discover trusted event vendors, services, categories, and planning resources with Event Orbit.",
      canonical: "/",
      keywords: ["Event Orbit", "event vendors", "wedding marketplace", "event planning"],
      schema: [organizationSchema(), websiteSchema()],
    },
  },
  {
    pattern: /^\/about\/?$/,
    metadata: {
      title: "About Us",
      description:
        "Learn about Event Orbit, a marketplace connecting customers with trusted event vendors and services.",
      canonical: "/about",
      keywords: ["about Event Orbit", "event marketplace", "trusted vendors"],
      schema: [
        organizationSchema(),
        breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
        ]),
      ],
    },
  },
  {
    pattern: /^\/contact\/?$/,
    metadata: {
      title: "Contact Us",
      description:
        "Contact Event Orbit for marketplace support, vendor inquiries, collaborations, and event planning questions.",
      canonical: "/contact",
      keywords: ["contact Event Orbit", "event planning support", "vendor support"],
      schema: [
        organizationSchema(),
        breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
        ]),
      ],
    },
  },
  {
    pattern: /^\/categories\/?$/,
    metadata: {
      title: "Event Categories",
      description:
        "Explore Event Orbit categories including venues, catering, photography, decor, beauty, entertainment, and more.",
      canonical: "/categories",
      keywords: ["event categories", "wedding categories", "vendor categories"],
      schema: [
        breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Categories", url: "/categories" },
        ]),
      ],
    },
  },
  {
    pattern: /^\/services\/?$/,
    metadata: {
      title: "Event Services",
      description:
        "Search and compare event services from verified vendors across Event Orbit.",
      canonical: "/services",
      keywords: ["event services", "wedding services", "service listings"],
      schema: [
        websiteSchema(),
        breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
        ]),
      ],
    },
  },
  {
    pattern: /^\/vendors\/?$/,
    metadata: {
      title: "Verified Vendors",
      description:
        "Browse trusted Event Orbit vendors and compare business profiles, contact details, and services.",
      canonical: "/vendors",
      keywords: ["verified vendors", "event vendors", "wedding vendors"],
      schema: [
        breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Vendors", url: "/vendors" },
        ]),
      ],
    },
  },
  {
    pattern: /^\/blog\/?$/,
    metadata: {
      title: "Blog",
      description:
        "Read Event Orbit articles about venues, vendors, wedding planning, event trends, and marketplace guidance.",
      canonical: "/blog",
      keywords: ["event planning blog", "wedding blog", "vendor tips"],
      type: "website",
      schema: [
        breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
        ]),
      ],
    },
  },
  {
    pattern: /^\/help\/?$/,
    metadata: {
      title: "FAQ and Help Center",
      description:
        "Find answers about Event Orbit accounts, booking workflows, payments, vendors, and marketplace support.",
      canonical: "/help",
      keywords: ["Event Orbit help", "FAQ", "support center"],
      schema: [
        faqPageSchema(helpFaqs),
        breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Help", url: "/help" },
        ]),
      ],
    },
  },
  {
    pattern: /^\/help\/signup\/?$/,
    metadata: {
      title: "Signup Help",
      description: "Learn how to create your Event Orbit account and start using the marketplace.",
      canonical: "/help/signup",
      robots: "index,follow",
    },
  },
  {
    pattern: /^\/help\/password-reset\/?$/,
    metadata: {
      title: "Password Reset Help",
      description: "Learn how to reset or recover your Event Orbit password.",
      canonical: "/help/password-reset",
    },
  },
  {
    pattern: /^\/help\/billing\/?$/,
    metadata: {
      title: "Billing and Payments Help",
      description: "Understand Event Orbit billing, payments, invoices, and refund guidance.",
      canonical: "/help/billing",
    },
  },
];

export const getRouteSeo = (pathname = "/") => {
  const matchedRoute = staticRoutes.find((route) => route.pattern.test(pathname));
  if (matchedRoute) return matchedRoute.metadata;

  if (/^\/category\//.test(pathname) || /^\/categories\//.test(pathname)) {
    return {
      title: "Category Services",
      description: "Explore Event Orbit vendors and services for this category.",
      canonical: pathname,
      schema: [
        breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Categories", url: "/categories" },
          { name: "Category", url: pathname },
        ]),
      ],
    };
  }

  if (/^\/vendor\//.test(pathname) || /^\/vendors\//.test(pathname)) {
    return {
      title: "Trusted Vendor",
      description: "Review this verified Event Orbit vendor profile, services, contact details, and reviews.",
      canonical: pathname,
      schema: [
        breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Vendors", url: "/vendors" },
          { name: "Vendor", url: pathname },
        ]),
      ],
    };
  }

  if (/^\/services\//.test(pathname)) {
    return {
      title: "Event Service",
      description: "View service details, vendors, reviews, and location information on Event Orbit.",
      canonical: pathname,
    };
  }

  if (/^\/booking\//.test(pathname) || /^\/checkout\//.test(pathname)) {
    return {
      title: "Booking",
      description: "Secure Event Orbit booking.",
      canonical: pathname,
      robots: "noindex,nofollow",
    };
  }

  if (/^\/blog\//.test(pathname)) {
    return {
      title: "Blog Article",
      description: DEFAULT_DESCRIPTION,
      canonical: pathname,
      type: "article",
    };
  }

  return {
    title: "Page Not Found",
    description: "The requested Event Orbit page could not be found.",
    canonical: pathname,
    robots: "noindex,follow",
  };
};

export const privateSeo = {
  title: "Private Area",
  description: "Private Event Orbit area.",
  robots: "noindex,nofollow",
  canonical: "/",
};
