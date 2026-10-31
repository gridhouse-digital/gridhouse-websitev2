import { useCallback, useSyncExternalStore } from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "gh-theme";
const LIGHT_CLASS = "theme-light";
const TRANSITION_CLASS = "theme-transition";

let listeners: Array<() => void> = [];

function currentTheme(): Theme {
  return document.documentElement.classList.contains(LIGHT_CLASS)
    ? "light"
    : "dark";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  // Cross-fade colors during the swap; class is removed after the
  // transition so it never interferes with normal interactions.
  root.classList.add(TRANSITION_CLASS);
  root.classList.toggle(LIGHT_CLASS, theme === "light");
  themeColor?.setAttribute("content", theme === "light" ? "#F4F3ED" : "#0F0F0F");
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* private mode — preference simply won't persist */
  }
  window.setTimeout(() => root.classList.remove(TRANSITION_CLASS), 400);
  listeners.forEach((l) => l());
}

function subscribe(callback: () => void) {
  listeners.push(callback);
  return () => {
    listeners = listeners.filter((l) => l !== callback);
  };
}

/**
 * Theme state shared across components. The initial class on <html> is
 * set by an inline script in index.html (before first paint), so this
 * hook only reads and toggles it.
 */
export function useTheme() {
  const theme = useSyncExternalStore<Theme>(
    subscribe,
    currentTheme,
    () => "dark",
  );
  const toggleTheme = useCallback(() => {
    applyTheme(currentTheme() === "light" ? "dark" : "light");
  }, []);
  return { theme, toggleTheme };
}
