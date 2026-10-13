"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import { useTheme, toggleTheme } from "@/components/theme";

export function ThemeToggle() {
  const theme = useTheme();
  const toLight = theme === "dark";
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={toLight ? "Switch to light mode" : "Switch to dark mode"}
      title={toLight ? "Switch to light mode" : "Switch to dark mode"}
    >
      {toLight ? <Sun size={15} weight="light" aria-hidden="true" /> : <Moon size={15} weight="light" aria-hidden="true" />}
      <span>{toLight ? "Light" : "Dark"}</span>
    </button>
  );
}