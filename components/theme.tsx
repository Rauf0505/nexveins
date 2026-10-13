"use client";

import { useEffect, useState } from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "nexveins-theme";
const CHANGE_EVENT = "nexveins:theme";

export function currentTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function setTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* private mode etc. */
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function toggleTheme() {
  setTheme(currentTheme() === "dark" ? "light" : "dark");
}

export function useTheme(): Theme {
  const [theme, setThemeState] = useState<Theme>("dark");
  useEffect(() => {
    setThemeState(currentTheme());
    const sync = () => setThemeState(currentTheme());
    window.addEventListener(CHANGE_EVENT, sync);
    return () => window.removeEventListener(CHANGE_EVENT, sync);
  }, []);
  return theme;
}