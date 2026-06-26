import { createBrowserRouter, Navigate } from "react-router";
import PublicLayout from "../layouts/PublicLayout";
import LandingPage from "../pages/landing/LandingPage";
import PublicServiceListings from "../pages/services/PublicServiceListings";
import PublicServiceDetails from "../pages/services/PublicServiceDetails";
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
import ServiceListings from "../pages/user/sections/ServiceListings";
import UserServiceDetails from "../pages/user/sections/UserServiceDetails";
import MyBookings from "../pages/user/sections/MyBookings";
import Wishlist from "../pages/user/sections/Wishlist";

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
        path: "/services",
        element: <PublicServiceListings />,
      },
      {
        path: "/service/:id",
        element: <PublicServiceDetails />,
      },
      {
        path: "/vendors",
        element: <VendorsPage />,
      },
      {
        path: "/vendor/:id",
        element: <VendorProfilePage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { index: true, element: <Navigate to='login' replace /> },
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
  {
    path: "/customer",
    element: <ProtectedRoute allowedRoles={["customer"]} />,
    children: [
      { index: true, element: <Navigate to='dashboard' replace /> },
      {
        path: "dashboard",
        element: <UserDashboardLayout />,
        children: [
          {
            index: true,
            element: <UserDashboardOverview />,
          },
          {
            path: "services",
            element: <ServiceListings />,
          },
          {
            path: "services/:id",
            element: <UserServiceDetails />,
          },
          {
            path: "bookings",
            element: <MyBookings />,
          },
          {
            path: "wishlist",
            element: <Wishlist />,
          },
        ],
      },
    ],
  },
]);
export default router;
