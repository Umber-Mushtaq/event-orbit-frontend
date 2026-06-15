import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute({ allowedRoles }) {
  const userString = localStorage.getItem("credentials");

  let user = null;

  try {
    if (userString) {
      const credentials = JSON.parse(userString);
      user = credentials.user || credentials;
    }
  } catch (error) {
    console.error("Local storage token parsing failed:", error);
    localStorage.removeItem("credentials");
  }

  if (!user) {
    return <Navigate to='/auth/login' replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to='/unauthorized' replace />;
  }

  return <Outlet />;
}
