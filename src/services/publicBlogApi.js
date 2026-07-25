import axios from "axios";
import { API_BASE_URL } from "../config/api";

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
