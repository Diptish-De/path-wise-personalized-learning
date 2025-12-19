"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface AccessibilitySettings {
  textToSpeech: boolean
  fontSize: "small" | "medium" | "large"
  darkMode: boolean
  highContrast: boolean
  reduceMotion: boolean
  dyslexiaFont: boolean
}

const defaultSettings: AccessibilitySettings = {
  textToSpeech: false,
  fontSize: "medium",
  darkMode: false,
  highContrast: false,
  reduceMotion: false,
  dyslexiaFont: false,
}

const AccessibilityContext = createContext<{
  settings: AccessibilitySettings
  updateSettings: (settings: Partial<AccessibilitySettings>) => void
} | null>(null)

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings)

  const updateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }))
  }

  // Apply settings to document
  if (settings.darkMode) {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }

  const fontSizeClass =
    settings.fontSize === "small" ? "text-sm" : settings.fontSize === "large" ? "text-lg" : "text-base"

  return (
    <AccessibilityContext.Provider value={{ settings, updateSettings }}>
      <div
        className={`${fontSizeClass} ${settings.highContrast ? "high-contrast" : ""} ${
          settings.reduceMotion ? "reduce-motion" : ""
        }`}
      >
        {children}
      </div>
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (!context) {
    throw new Error("useAccessibility must be used within AccessibilityProvider")
  }
  return context
}
