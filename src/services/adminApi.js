import axios from "axios";
import { API_BASE_URL } from "../config/api";

export const adminApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }

    return Promise.reject(error);
  },
);

export const getAdminErrorMessage = (error, fallback = "Something went wrong.") =>
  error?.response?.data?.message || error?.message || fallback;

const buildParams = (params = {}) =>
  Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== ""));

export const adminAuthApi = {
  login: (payload) => adminApi.post("/api/admin/auth/login", payload),
  me: () => adminApi.get("/api/admin/auth/me"),
  logout: () => adminApi.post("/api/admin/auth/logout"),
};

export const adminDashboardApi = {
  summary: (params) => adminApi.get("/api/admin/dashboard/summary", { params: buildParams(params) }),
  revenueAnalytics: () => adminApi.get("/api/admin/dashboard/revenue-analytics"),
  bookingAnalytics: () => adminApi.get("/api/admin/dashboard/booking-analytics"),
  eventStatus: () => adminApi.get("/api/admin/dashboard/event-status"),
  vendorPerformance: () => adminApi.get("/api/admin/dashboard/vendor-performance"),
  recentEvents: (params) =>
    adminApi.get("/api/admin/dashboard/recent-events", { params: buildParams(params) }),
  activities: () => adminApi.get("/api/admin/dashboard/activities"),
  notifications: () => adminApi.get("/api/admin/notifications"),
  messages: () => adminApi.get("/api/admin/messages"),
};

export const adminEventsApi = {
  list: (params) => adminApi.get("/api/admin/events", { params: buildParams(params) }),
  getById: (id) => adminApi.get(`/api/admin/events/${id}`),
  create: (payload) => adminApi.post("/api/admin/events", payload),
  update: (id, payload) => adminApi.patch(`/api/admin/events/${id}`, payload),
  remove: (id) => adminApi.delete(`/api/admin/events/${id}`),
};

export const adminServicesApi = {
  list: (params) => adminApi.get("/api/admin/services", { params: buildParams(params) }),
  getById: (id) => adminApi.get(`/api/admin/services/${id}`),
  create: (payload) => adminApi.post("/api/admin/services", payload),
  update: (id, payload) => adminApi.patch(`/api/admin/services/${id}`, payload),
  remove: (id) => adminApi.delete(`/api/admin/services/${id}`),
};

export const adminCategoriesApi = {
  list: (params) => adminApi.get("/api/admin/event-categories", { params: buildParams(params) }),
  getById: (id) => adminApi.get(`/api/admin/event-categories/${id}`),
  create: (payload) => adminApi.post("/api/admin/event-categories", payload),
  update: (id, payload) => adminApi.patch(`/api/admin/event-categories/${id}`, payload),
  remove: (id) => adminApi.delete(`/api/admin/event-categories/${id}`),
};

export const adminVendorsApi = {
  list: (params) => adminApi.get("/api/admin/vendors", { params: buildParams(params) }),
  getById: (id) => adminApi.get(`/api/admin/vendors/${id}`),
  create: (payload) => adminApi.post("/api/admin/vendors", payload),
  update: (id, payload) => adminApi.patch(`/api/admin/vendors/${id}`, payload),
  remove: (id) => adminApi.delete(`/api/admin/vendors/${id}`),
};

export const adminVenuesApi = {
  list: (params) => adminApi.get("/api/admin/venues", { params: buildParams(params) }),
};

export const adminBookingsApi = {
  list: (params) => adminApi.get("/api/admin/bookings", { params: buildParams(params) }),
  getById: (id) => adminApi.get(`/api/admin/bookings/${id}`),
  create: (payload) => adminApi.post("/api/admin/bookings", payload),
};

export const adminUsersApi = {
  list: (params) => adminApi.get("/api/admin/users", { params: buildParams(params) }),
  getById: (id) => adminApi.get(`/api/admin/users/${id}`),
};

export const adminCalendarApi = {
  get: (params) => adminApi.get("/api/admin/calendar", { params: buildParams(params) }),
  events: () => adminApi.get("/api/admin/calendar/events"),
};

export const adminBlogsApi = {
  list: (params) => adminApi.get("/api/admin/blogs", { params: buildParams(params) }),
  getById: (id) => adminApi.get(`/api/admin/blogs/${id}`),
  create: (payload) =>
    adminApi.post(
      "/api/admin/blogs",
      payload,
      payload instanceof FormData
        ? { headers: { "Content-Type": "multipart/form-data" } }
        : undefined,
    ),
  update: (id, payload) =>
    adminApi.patch(
      `/api/admin/blogs/${id}`,
      payload,
      payload instanceof FormData
        ? { headers: { "Content-Type": "multipart/form-data" } }
        : undefined,
    ),
  remove: (id) => adminApi.delete(`/api/admin/blogs/${id}`),
};

export const adminSettingsApi = {
  get: () => adminApi.get("/api/admin/settings"),
  update: (payload) => adminApi.patch("/api/admin/settings", payload),
};

export const adminProfileApi = {
  get: () => adminApi.get("/api/admin/profile"),
  update: (payload) => {
    const isFormData =
      typeof FormData !== "undefined" && payload instanceof FormData;

    return adminApi.patch(
      "/api/admin/profile",
      payload,
      isFormData
        ? { headers: { "Content-Type": "multipart/form-data" } }
        : undefined,
    );
  },
  updatePreferences: (payload) => adminApi.patch("/api/admin/profile/preferences", payload),
  changePassword: (payload) => adminApi.patch("/api/admin/profile/password", payload),
};
