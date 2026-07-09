import { useCallback, useEffect, useState } from "react";

const COLLAPSED_KEY = "admin-sidebar-collapsed";
const THEME_KEY = "admin-dashboard-theme";

export const useAdminLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem(COLLAPSED_KEY) === "true";
  });
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem(THEME_KEY) || "midnight";
  });

  useEffect(() => {
    localStorage.setItem(COLLAPSED_KEY, String(isCollapsed));
  }, [isCollapsed]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, themeMode);
    document.documentElement.dataset.adminTheme = themeMode;
  }, [themeMode]);

  const toggleCollapsed = useCallback(() => {
    setIsCollapsed((value) => !value);
  }, []);

  const toggleMobileOpen = useCallback(() => {
    setIsMobileOpen((value) => !value);
  }, []);

  const closeMobileOpen = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeMode((value) => (value === "midnight" ? "obsidian" : "midnight"));
  }, []);

  return {
    isCollapsed,
    isMobileOpen,
    themeMode,
    toggleCollapsed,
    toggleMobileOpen,
    closeMobileOpen,
    toggleTheme,
  };
};
