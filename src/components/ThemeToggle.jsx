"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Ensure component is mounted on client to prevent layout shifts
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="h-9 w-9 rounded-xl bg-slate-200/50 dark:bg-slate-800/50 animate-pulse" />
        );
    }

    // fallback check matching system preferences accurately
    const isDark = resolvedTheme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all duration-200 cursor-pointer shadow-xs focus:outline-hidden"
            aria-label="Toggle structural interface theme mode"
        >
            {isDark ? (
                <Sun className="h-4 w-4 text-amber-500 transition-transform duration-300 rotate-0 scale-100" />
            ) : (
                <Moon className="h-4 w-4 text-blue-600 transition-transform duration-300 rotate-0 scale-100" />
            )}
        </button>
    );
}