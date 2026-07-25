import { createBrowserRouter, Navigate } from "react-router";
import PublicLayout from "../layouts/PublicLayout";
import LandingPage from "../pages/landing/LandingPage";
import PublicCategoryListings from "../pages/services/PublicServiceListings";
import PublicCategoryDetails from "../pages/services/PublicServiceDetails";
import VendorsPage from "../pages/public_vendor/VendorsPage";
import VendorProfilePage from "../pages/public_vendor/VendorProfilePage";
import Login from "../pages/auth/section/Login";
import Register from "../pages/auth/section/Register";
import ForgotPassword from "../pages/auth/section/ForgotPassword";
import ResetPassword from "../pages/auth/section/ResetPassword";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedRoute from "./ProtectedRoutes";
import DashboardLayout from "../pages/vendor/DashboardLayout";
import DashboardOverview from "../pages/vendor/sections/DashboardOverview";
import ManageServices from "../pages/vendor/sections/ManageServces";
import CreateService from "../pages/vendor/sections/CreateService";
import EditService from "../pages/vendor/sections/EditService";
import ServiceDetails from "../pages/vendor/sections/ServiceDetails";
import BookingRequests from "../pages/vendor/sections/BookingRequests";
import ServiceReviews from "../pages/vendor/sections/ServiceReviews";
import VendorProfile from "../pages/vendor/sections/VendorProfile";
import UserDashboardLayout from "../pages/user/sections/UserDashboardLayout";
import UserDashboardOverview from "../pages/user/sections/UserDashboardOverview";
import MyBookings from "../pages/user/sections/MyBookings";
import Wishlist from "../pages/user/sections/Wishlist";
import ContactPage from "../pages/landing/ContactPage";
import AboutPage from "../pages/landing/AboutPage";
import CheckoutPage from "../pages/user/sections/CheckoutPage";
import CustomerProfile from "../pages/user/sections/CustomerProfile";
import BlogListingPage from "../pages/blog/BlogListingPage";
import PublicBlogDetailPage from "../pages/blog/PublicBlogDetailPage";
import HelpCenter from "../pages/landing/HelpCenter";
import {
  BillingArticlePage,
  PasswordResetArticlePage,
  SignupArticlePage,
} from "../pages/landing/ui/HelpArticle";
import AdminDashboardLayout from "../pages/admin/layouts/AdminDashboardLayout";
import AdminDashboardOverview from "../pages/admin/sections/admin-section/AdminDashboardOverview";
import AdminSectionPage from "../pages/admin/sections/admin-section/AdminSectionPage";
import EventCategoriesPage from "../pages/admin/sections/admin-section/EventCategoriesPage";
import EventsManagementPage from "../pages/admin/sections/admin-section/EventsManagementPage";
import CalendarManagementPage from "../pages/admin/sections/admin-section/CalendarManagementPage";
import VendorManagementPage from "../pages/admin/sections/admin-section/VendorManagementPage";
import UserManagementPage from "../pages/admin/sections/admin-section/UserManagementPage";
import SettingsManagementPage from "../pages/admin/sections/admin-section/SettingsManagementPage";
import AdminProfilePage from "../pages/admin/sections/admin-section/AdminProfilePage";
import AdminChangePasswordPage from "../pages/admin/sections/admin-section/AdminChangePasswordPage";
import AdminBlogListingPage from "../pages/admin/sections/admin-section/blog/BlogListingPage";
import BlogDetailsPage from "../pages/admin/sections/admin-section/blog/BlogDetailsPage";
import BlogFormPage from "../pages/admin/sections/admin-section/blog/BlogFormPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "/categories",
        element: <PublicCategoryListings />,
      },
      {
        path: "/categories/:categoryId",
        element: <PublicCategoryDetails />,
      },
      {
        path: "/category/:categoryId/vendor/:vendorId",
        element: <PublicCategoryDetails />,
      },
      {
        path: "/vendors",
        element: <VendorsPage />,
      },
      {
        path: "/vendors/:vendorId",
        element: <VendorProfilePage />,
      },
      {
        path: "/vendor/:id",
        element: <VendorProfilePage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/checkout/:serviceId/vendor/:vendorId",
        element: <CheckoutPage />,
      },
      {
        path: "/blog",
        element: <BlogListingPage />,
      },
      {
        path: "/blog/:slug",
        element: <PublicBlogDetailPage />,
      },
      {
        path: "/help",
        element: <HelpCenter />,
      },
      {
        path: "/help/signup",
        element: <SignupArticlePage />,
      },
      {
        path: "/help/password-reset",
        element: <PasswordResetArticlePage />,
      },
      {
        path: "/help/billing",
        element: <BillingArticlePage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { index: true, element: <Navigate to="login" replace /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password/:token", element: <ResetPassword /> },
    ],
  },
  {
    path: "/vendor",
    element: <ProtectedRoute allowedRoles={["vendor"]} />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <DashboardOverview /> },
          { path: "categories", element: <ManageServices /> },
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
  {
    path: "/admin",
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [
      {
        element: <AdminDashboardLayout />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", element: <AdminDashboardOverview /> },
          { path: "events", element: <EventsManagementPage /> },
          { path: "categories", element: <EventCategoriesPage /> },
          { path: "services", element: <Navigate to="/admin/categories" replace /> },
          { path: "event-categories", element: <Navigate to="/admin/categories" replace /> },
          { path: "vendors", element: <VendorManagementPage /> },
          { path: "users", element: <UserManagementPage /> },
          {
            path: "analytics",
            element: <AdminSectionPage sectionKey="analytics" />,
          },
          { path: "calendar", element: <CalendarManagementPage /> },
          { path: "blog", element: <AdminBlogListingPage /> },
          { path: "blog/add", element: <BlogFormPage mode="create" /> },
          { path: "blog/:blogId", element: <BlogDetailsPage /> },
          { path: "blog/:blogId/edit", element: <BlogFormPage mode="edit" /> },
          {
            path: "notifications",
            element: <AdminSectionPage sectionKey="notifications" />,
          },
          { path: "profile", element: <AdminProfilePage /> },
          { path: "change-password", element: <AdminChangePasswordPage /> },
          { path: "settings", element: <SettingsManagementPage /> },
        ],
      },
    ],
  },
  {
    path: "/customer",
    element: <ProtectedRoute allowedRoles={["customer"]} />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      {
        path: "dashboard",
        element: <UserDashboardLayout />,
        children: [
          {
            index: true,
            element: <UserDashboardOverview />,
          },
          {
            path: "categories",
            element: <PublicCategoryListings />,
          },
          {
            path: "categories/:categoryId",
            element: <PublicCategoryDetails />,
          },
          {
            path: "category/:categoryId/vendor/:vendorId",
            element: <PublicCategoryDetails />,
          },
          {
            path: "checkout/:serviceId/vendor/:vendorId",
            element: <CheckoutPage />,
          },
          {
            path: "bookings",
            element: <MyBookings />,
          },
          {
            path: "wishlist",
            element: <Wishlist />,
          },
          { path: "profile", element: <CustomerProfile /> },
        ],
      },
    ],
  },
]);
export default router;
