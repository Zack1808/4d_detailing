import React, { useState, useEffect, useContext } from "react";

type ThemeContextType = {
  isDark: boolean;
};

type ThemeProviderType = {
  children: React.ReactNode;
};

const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined,
);

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    if (!context) {
      throw new Error("useTheme must be used within a ThemeProvider");
    }
  }

  return context;
};

export const ThemeProvider: React.FC<ThemeProviderType> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateTheme = () => {
      setIsDark(mediaQuery.matches);
    };

    updateTheme();

    mediaQuery.addEventListener("change", updateTheme);

    return () => {
      mediaQuery.removeEventListener("change", updateTheme);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark }}>{children}</ThemeContext.Provider>
  );
};
