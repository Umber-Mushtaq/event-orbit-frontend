import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="event-orbit-theme"
      themes={["light", "dark"]}
    >
      {children}
    </NextThemesProvider>
  );
}

export default ThemeProvider;
