import { ChevronRight } from "lucide-react";
import { useLocation } from "react-router";
import { adminSectionCopy } from "../../data/admin-data/adminNavigationData";

const titleMap = {
  "/admin/dashboard": "Dashboard",
  "/admin/events": "Events",
  "/admin/event-categories": "Event Categories",
  "/admin/vendors": "Vendors",
  "/admin/users": "Users",
  "/admin/analytics": "Analytics",
  "/admin/calendar": "Calendar",
  "/admin/blog": "Blogs",
  "/admin/blog/add": "Add Blog",
  "/admin/notifications": "Notifications",
  "/admin/profile": "Profile",
  "/admin/change-password": "Change Password",
  "/admin/settings": "Settings",
};

function AdminBreadcrumbs() {
  const location = useLocation();
  const pathname = location.pathname;
  if (
    pathname === "/admin/events" ||
    pathname === "/admin/event-categories" ||
    pathname === "/admin/vendors" ||
    pathname === "/admin/users" ||
    pathname === "/admin/calendar" ||
    pathname === "/admin/profile" ||
    pathname === "/admin/change-password" ||
    pathname === "/admin/settings"
  ) {
    return null;
  }
  const isBlogRoute = pathname.startsWith("/admin/blog");
  const label =
    titleMap[pathname] ||
    (isBlogRoute && pathname.endsWith("/edit")
      ? "Edit Blog"
      : isBlogRoute && pathname.split("/").filter(Boolean).length === 3
        ? "Blog Details"
        : isBlogRoute
          ? "Blogs"
          : "Dashboard");
  const descriptionKey = isBlogRoute
    ? "blog"
    : pathname.split("/").filter(Boolean)[1] || "dashboard";
  const copy = adminSectionCopy[descriptionKey] || adminSectionCopy.dashboard;

  return (
    <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <div className="mb-2 flex items-center gap-2 text-xs font-medium text-stone-500">
          <span>Admin</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-stone-300">{label}</span>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">
          {copy.title}
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone-400">
          {copy.description}
        </p>
      </div>
      <div className="rounded-full border border-border-gold/20 bg-glass-gold px-4 py-2 text-xs font-semibold tracking-wide text-border-gold-hover shadow-gold-glow">
        Premium black & gold workspace
      </div>
    </div>
  );
}

export default AdminBreadcrumbs;
