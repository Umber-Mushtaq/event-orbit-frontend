import { Outlet, useLocation } from "react-router";
import { useEffect, useState } from "react";
import AdminSidebar from "../components/adminComponent/AdminSidebar";
import AdminTopbar from "../components/adminComponent/AdminTopbar";
import AdminBreadcrumbs from "../components/adminComponent/AdminBreadcrumbs";
import { useAdminLayout } from "../hooks/admin-hook/useAdminLayout";

function AdminDashboardLayout() {
  const location = useLocation();
  const layout = useAdminLayout();
  const [globalSearch, setGlobalSearch] = useState("");

  useEffect(() => {
    layout.closeMobileOpen();
  }, [layout.closeMobileOpen, location.pathname]);

  return (
    <div className='min-h-screen bg-[#0b0b0b] text-white'>
      <AdminSidebar {...layout} />

      <div
        className={`min-h-screen transition-all duration-300 ${
          layout.isCollapsed ? "lg:pl-[84px]" : "lg:pl-[286px]"
        }`}
      >
        <AdminTopbar
          {...layout}
          globalSearch={globalSearch}
          setGlobalSearch={setGlobalSearch}
        />

        <main className='px-4 py-6 md:px-6 lg:px-8'>
          <AdminBreadcrumbs />
          <div className='animate-page-enter'>
            <Outlet context={{ globalSearch, setGlobalSearch }} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboardLayout;
