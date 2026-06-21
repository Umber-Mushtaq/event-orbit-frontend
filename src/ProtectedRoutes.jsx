import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute({ allowedRoles }) {
  const userString = localStorage.getItem("user");
  let user = null;

  try {
    if (userString) {
      user = JSON.parse(userString);
    }
  } catch (error) {
    console.error("Local storage user parsing failed:", error);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  if (!user) {
    return <Navigate to='/auth/login' replace />;
  }

  // If the vendor exists but is not approved, log them out and kick them to login
  if (user.role === "vendor" && !user.isApproved) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return <Navigate to='/auth/login' replace />;
  }

  // If the logged-in user doesn't have the role required for this section
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to='/unauthorized' replace />; // Or redirect to a fallback page
  }

  // Renders the child components inside this route group
  return <Outlet />;
}
