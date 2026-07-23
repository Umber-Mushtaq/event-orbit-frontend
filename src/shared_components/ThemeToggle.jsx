import { MoonStar, SunMedium } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

function ThemeToggle({ className = "" }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted
    ? (resolvedTheme || theme) === "dark"
    : false;

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-background text-foreground shadow-sm transition hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${className}`.trim()}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? (
        <SunMedium className="h-5 w-5" />
      ) : (
        <MoonStar className="h-5 w-5" />
      )}
    </button>
  );
}

export default ThemeToggle;
