"use client"

import { useState, useEffect } from "react"
import { FaMoon, FaSun } from "react-icons/fa"

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    // Check for user preference
    const isDarkMode = localStorage.getItem("darkMode") === "true" || 
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
    setDarkMode(isDarkMode)

    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem("darkMode", String(newMode))

    if (newMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed z-50 bottom-5 right-5 p-3 rounded-full bg-gray-200 dark:bg-gray-800 shadow-lg transition-all duration-300 hover:scale-110"
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <FaSun className="text-yellow-500 text-xl" />
      ) : (
        <FaMoon className="text-indigo-700 text-xl" />
      )}
    </button>
  )
}