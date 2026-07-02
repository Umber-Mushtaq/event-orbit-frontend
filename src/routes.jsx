import { createBrowserRouter, Navigate } from "react-router";
import LandingPage from "./features/home/LandingPage";
import AuthPage from "./features/auth/AuthPage";
import ProtectedRoute from "./ProtectedRoutes";
import AdminDashboardLayout from "./features/admin/layouts/AdminDashboardLayout";
import AdminDashboardOverview from "./features/admin/sections/AdminDashboardOverview";
import AdminSectionPage from "./features/admin/sections/AdminSectionPage";
import BookingManagementPage from "./features/admin/sections/BookingManagementPage";
import UserManagementPage from "./features/admin/sections/UserManagementPage";
import SettingsManagementPage from "./features/admin/sections/SettingsManagementPage";
import BlogListingPage from "./features/admin/sections/blog/BlogListingPage";
import BlogDetailsPage from "./features/admin/sections/blog/BlogDetailsPage";
import BlogFormPage from "./features/admin/sections/blog/BlogFormPage";
import DashboardLayout from "./features/vendor/DashboardLayout";
import DashboardOverview from "./features/vendor/sections/DashboardOverview";
import ManageServices from "./features/vendor/sections/ManageServces";
import CreateService from "./features/vendor/sections/CreateService";
import ServiceDetails from "./features/vendor/sections/ServiceDetails";
import BookingRequests from "./features/vendor/sections/BookingRequests";
import ServiceReviews from "./features/vendor/sections/ServiceReviews";
import EditService from "./features/vendor/sections/EditService";
import VendorProfile from "./features/vendor/sections/VendorProfile";
import Login from "./features/auth/section/Login";
import Register from "./features/auth/section/Register";
import ForgotPassword from "./features/auth/section/ForgotPassword";
import ResetPassword from "./features/auth/section/ResetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
    children: [
      { index: true, element: <Navigate to='login' replace /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password/:token", element: <ResetPassword /> },
    ],
  },

  // ==========================================
  // VENDOR ROUTES (Only accessible if role === 'vendor')
  // ==========================================
  {
    path: "/vendor",
    element: <ProtectedRoute allowedRoles={["vendor"]} />,
    children: [
      { index: true, element: <Navigate to='dashboard' replace /> },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <DashboardOverview /> },
          { path: "services", element: <ManageServices /> },
          { path: "create", element: <CreateService /> },
          { path: "edit/:id", element: <EditService /> },
          { path: "service/details/:id", element: <ServiceDetails /> },
          { path: "bookings", element: <BookingRequests /> },
          { path: "reviews", element: <ServiceReviews /> },
          { path: "profile", element: <VendorProfile /> },
        ],
      },
    ],
  },

  // ==========================================
  // CUSTOMER ROUTES (Only accessible if role === 'customer')
  // ==========================================
  {
    path: "/customer",
    element: <ProtectedRoute allowedRoles={["customer"]} />,
    children: [
      { index: true, element: <Navigate to='dashboard' replace /> },
      {
        path: "dashboard",
        // element: <CustomerLayout />,
        element: (
          <div className='text-white p-10'>Customer Dashboard Placeholder</div>
        ), // Temp placeholder
        children: [
          // Add your customer profile/booking views here later
        ],
      },
    ],
  },

  // ==========================================
  // ADMIN ROUTES (Only accessible if role === 'admin')
  // ==========================================
  {
    path: "/admin",
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [
      {
        element: <AdminDashboardLayout />,
        children: [
          { index: true, element: <Navigate to='dashboard' replace /> },
          { path: "dashboard", element: <AdminDashboardOverview /> },
          { path: "events", element: <AdminSectionPage sectionKey='events' /> },
          {
            path: "event-categories",
            element: <AdminSectionPage sectionKey='event-categories' />,
          },
          { path: "vendors", element: <AdminSectionPage sectionKey='vendors' /> },
          { path: "bookings", element: <BookingManagementPage /> },
          { path: "users", element: <UserManagementPage /> },
          { path: "analytics", element: <AdminSectionPage sectionKey='analytics' /> },
          { path: "calendar", element: <AdminSectionPage sectionKey='calendar' /> },
          { path: "blog", element: <BlogListingPage /> },
          { path: "blog/add", element: <BlogFormPage mode='create' /> },
          { path: "blog/:blogId/edit", element: <BlogFormPage mode='edit' /> },
          { path: "blog/:blogId", element: <BlogDetailsPage /> },
          {
            path: "notifications",
            element: <AdminSectionPage sectionKey='notifications' />,
          },
          { path: "settings", element: <SettingsManagementPage /> },
        ],
      },
    ],
  },

  // Unauthorized Route Fallback
  {
    path: "/unauthorized",
    element: (
      <div className='text-white text-center mt-20 font-poppins'>
        You do not have permission to access this page.
      </div>
    ),
  },
]);

export default router;
