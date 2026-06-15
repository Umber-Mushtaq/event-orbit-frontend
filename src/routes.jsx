import { createBrowserRouter, Navigate } from "react-router";
import LandingPage from "./features/home/LandingPage";
import AuthPage from "./features/auth/AuthPage";
import Login from "./features/auth/components/Login";
import Register from "./features/auth/components/Register";
import ForgotPassword from "./features/auth/components/ForgotPassword";
import ResetPassword from "./features/auth/components/ResetPassword";
import DashboardOverview from "./features/vendor/sections/DashboardOverview";
import ManageServices from "./features/vendor/sections/ManageServces";
import BookingRequests from "./features/vendor/sections/BookingRequests";
import ServiceReviews from "./features/vendor/sections/ServiceReviews";
import DashboardLayout from "./features/vendor/DashboardLayout";
import CreateService from "./features/vendor/sections/CreateService";
import ProtectedRoute from "./ProtectedRoutes";
import ServiceDetails from "./features/vendor/sections/ServiceDetails";

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
      { path: "reset-password", element: <ResetPassword /> },
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
          {
            index: true,
            element: <DashboardOverview />,
          },
          {
            path: "services",
            element: <ManageServices />,
          },
          {
            path: "create",
            element: <CreateService />,
          },
          {
            path: "service/detatails",
            element: <ServiceDetails />,
          },
          {
            path: "bookings",
            element: <BookingRequests />,
          },
          {
            path: "reviews",
            element: <ServiceReviews />,
          },
        ],
      },
    ],
  },
]);

export default router;
