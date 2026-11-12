"use client"

import { useState, useEffect } from "react"
import { FaMoon, FaSun } from "react-icons/fa"

export default function DarkModeToggle() {
  // Night mode is the default (the `dark` class is set on <html> in layout.tsx)
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    // Sync with whatever the pre-paint script in layout.tsx decided
    setDarkMode(document.documentElement.classList.contains("dark"))
  }, [])

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    try {
      localStorage.setItem("darkMode", String(newMode))
    } catch {}
    document.documentElement.classList.toggle("dark", newMode)
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed z-50 bottom-5 right-5 p-3 rounded-full bg-gray-200 dark:bg-gray-800 shadow-lg transition-all duration-300 hover:scale-110"
      aria-label={darkMode ? "Switch to day mode" : "Switch to night mode"}
    >
      {darkMode ? (
        <FaSun className="text-yellow-500 text-xl" />
      ) : (
        <FaMoon className="text-indigo-700 text-xl" />
      )}
    </button>
  )
}
