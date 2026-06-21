import { createBrowserRouter, Navigate } from "react-router";
import LandingPage from "./features/home/LandingPage";
import AuthPage from "./features/auth/AuthPage";
import ProtectedRoute from "./ProtectedRoutes";
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
import UserDashboardOverview from "./features/user/sections/UserDashboardOverview";
import UserDashboardLayout from "./features/user/sections/UserDashboardLayout";
import ServiceListings from "./features/user/sections/ServiceListings";
import MyBookings from "./features/user/sections/MyBookings";
import Wishlist from "./features/user/sections/Wishlist";

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

  // ==========================================
  // ADMIN ROUTES (Only accessible if role === 'admin')
  // ==========================================
  {
    path: "/admin",
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [
      { index: true, element: <Navigate to='dashboard' replace /> },
      {
        path: "dashboard",
        // element: <AdminLayout />,
        element: (
          <div className='text-white p-10'>
            Admin Dashboard (Where you will approve vendors!)
          </div>
        ), // Temp placeholder
        children: [
          // Add your vendor approval queues and platform charts here later
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
