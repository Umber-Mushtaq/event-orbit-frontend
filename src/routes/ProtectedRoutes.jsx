import { Navigate, Outlet } from "react-router";

function ProtectedRoute({ allowedRoles }) {
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

  if (user.role === "vendor" && !user.isApproved) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return <Navigate to='/auth/login' replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to='/auth/login' replace />;
  }

  return <Outlet />;
}
export default ProtectedRoute;
