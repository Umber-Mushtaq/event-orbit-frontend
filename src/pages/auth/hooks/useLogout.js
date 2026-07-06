import { useNavigate } from "react-router";

export function useLogout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth/login", { replace: true });
  };

  return logout;
}
