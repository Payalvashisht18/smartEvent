import { createContext, useContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

// Set theme on <html> immediately (before first render)
const getInitialTheme = () => {
  const saved = localStorage.getItem("se-theme") || "dark";
  document.documentElement.setAttribute("data-theme", saved);
  return saved;
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("se-theme", theme);
  }, [theme]);

  const toggle = () => setTheme(t => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggle, isDark: theme === "dark" }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
