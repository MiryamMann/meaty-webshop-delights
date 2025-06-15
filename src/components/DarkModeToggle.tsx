
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const THEME_KEY = "theme";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(() =>
    typeof window !== "undefined"
      ? localStorage.getItem(THEME_KEY) === "dark"
      : false
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem(THEME_KEY, "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem(THEME_KEY, "light");
    }
  }, [isDark]);

  return (
    <button
      className="p-2 rounded-full hover:bg-muted transition text-xl"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setIsDark((v) => !v)}
      type="button"
    >
      {isDark ? <Sun size={21} /> : <Moon size={21} />}
    </button>
  );
}
