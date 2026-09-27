"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const storageKey = "toolpilot-theme";
const themeChangeEvent = "toolpilot:theme-change";
let inMemoryTheme: Theme | null = null;

function readSavedTheme(): Theme | null {
  try {
    const savedTheme = window.localStorage.getItem(storageKey);
    return savedTheme === "light" || savedTheme === "dark" ? savedTheme : null;
  } catch {
    return null;
  }
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeToTheme, getCurrentTheme, () => null);

  function chooseTheme(nextTheme: Theme) {
    inMemoryTheme = nextTheme;
    document.documentElement.dataset.theme = nextTheme;
    try {
      window.localStorage.setItem(storageKey, nextTheme);
    } catch {
      // The selected theme still applies for this page when storage is unavailable.
    }
    window.dispatchEvent(new Event(themeChangeEvent));
  }

  return (
    <div className="theme-toggle" role="group" aria-label="Color theme">
      <button
        type="button"
        aria-pressed={theme === "light"}
        onClick={() => chooseTheme("light")}
      >
        Light
      </button>
      <button
        type="button"
        aria-pressed={theme === "dark"}
        onClick={() => chooseTheme("dark")}
      >
        Dark
      </button>
    </div>
  );
}

function getCurrentTheme(): Theme {
  const savedTheme = readSavedTheme();
  if (savedTheme) return savedTheme;
  if (inMemoryTheme) return inMemoryTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function subscribeToTheme(onChange: () => void) {
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  const handleStorageChange = () => {
    const savedTheme = readSavedTheme();
    if (savedTheme) document.documentElement.dataset.theme = savedTheme;
    else {
      inMemoryTheme = null;
      document.documentElement.removeAttribute("data-theme");
    }
    onChange();
  };

  systemTheme.addEventListener("change", onChange);
  window.addEventListener("storage", handleStorageChange);
  window.addEventListener(themeChangeEvent, onChange);

  return () => {
    systemTheme.removeEventListener("change", onChange);
    window.removeEventListener("storage", handleStorageChange);
    window.removeEventListener(themeChangeEvent, onChange);
  };
}
