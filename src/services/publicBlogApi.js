import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const publicBlogApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const buildParams = (params = {}) =>
  Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== null && value !== "",
    ),
  );

export const getPublicBlogErrorMessage = (
  error,
  fallback = "Something went wrong.",
) => error?.response?.data?.message || error?.message || fallback;

export const publicBlogsApi = {
  list: (params, config = {}) =>
    publicBlogApi.get("/api/blogs", {
      params: buildParams(params),
      ...config,
    }),
  getBySlug: (slug, config = {}) => publicBlogApi.get(`/api/blogs/${slug}`, config),
};
