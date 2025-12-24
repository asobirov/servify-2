import React, { createContext, useCallback, useContext, useMemo } from "react";
import { Uniwind, useUniwind } from "uniwind";

export const SUPPORTED_THEMES = ["light", "dark", "system"] as const;
export type ThemeName = (typeof SUPPORTED_THEMES)[number];

type AppThemeContextType = {
  currentTheme: ThemeName;
  isLight: boolean;
  isDark: boolean;
  hasAdaptiveThemes: boolean;
  setTheme: (theme: ThemeName) => void;
  toggleTheme: () => void;
  isSupportedTheme: (theme: string) => theme is ThemeName;
};

const AppThemeContext = createContext<AppThemeContextType | undefined>(undefined);

export const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme, hasAdaptiveThemes } = useUniwind();

  const isLight = useMemo(() => {
    return theme === "light";
  }, [theme]);

  const isDark = useMemo(() => {
    return theme === "dark";
  }, [theme]);

  const setTheme = useCallback((newTheme: ThemeName) => {
    Uniwind.setTheme(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    Uniwind.setTheme(theme === "light" ? "dark" : "light");
  }, [theme]);

  const isSupportedTheme = (theme: string): theme is ThemeName => {
    return SUPPORTED_THEMES.includes(theme as (typeof SUPPORTED_THEMES)[number]);
  };

  const value = useMemo(
    () => ({
      currentTheme: theme,
      isLight,
      isDark,
      setTheme,
      toggleTheme,
      isSupportedTheme,
      hasAdaptiveThemes,
    }),
    [theme, isLight, isDark, setTheme, toggleTheme, isSupportedTheme, hasAdaptiveThemes],
  );

  return <AppThemeContext.Provider value={value}>{children}</AppThemeContext.Provider>;
};

export function useAppTheme() {
  const context = useContext(AppThemeContext);
  if (!context) {
    throw new Error("useAppTheme must be used within AppThemeProvider");
  }
  return context;
}
