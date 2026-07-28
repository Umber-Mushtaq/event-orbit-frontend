export const slugify = (value = "") =>
  String(value)
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const getCategorySlug = (category = {}) => {
  const name = category.name || category.title || "";
  const baseSlug = slugify(name);

  if (baseSlug === "wedding-halls") return "event-venues";

  return baseSlug;
};

export const getVendorSlug = (vendor = {}) =>
  slugify(
    vendor.businessName ||
      vendor.name ||
      vendor.fullName ||
      [vendor.firstName, vendor.lastName].filter(Boolean).join(" "),
  );
