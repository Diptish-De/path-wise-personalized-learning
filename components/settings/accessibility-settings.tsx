"use client"

import { useState } from "react"
import { Volume2, Type, Moon, Eye } from "lucide-react"

export default function AccessibilitySettings() {
  const [settings, setSettings] = useState({
    textToSpeech: true,
    darkMode: false,
    fontSize: "medium",
    highContrast: false,
    reduceMotion: false,
    dyslexiaFont: false,
  })

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">Accessibility Options</h2>
      </div>

      {/* Text-to-Speech */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Volume2 size={24} className="text-primary" />
            <div>
              <h3 className="font-semibold text-foreground">Text-to-Speech</h3>
              <p className="text-sm text-muted-foreground">Enable audio narration for lessons</p>
            </div>
          </div>
          <button
            onClick={() => updateSetting("textToSpeech", !settings.textToSpeech)}
            className={`relative w-12 h-6 rounded-full transition ${settings.textToSpeech ? "bg-primary" : "bg-muted"}`}
          >
            <span
              className={`absolute top-1 w-4 h-4 rounded-full bg-white transition transform ${
                settings.textToSpeech ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Font Size */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Type size={24} className="text-accent" />
          <div>
            <h3 className="font-semibold text-foreground">Font Size</h3>
            <p className="text-sm text-muted-foreground">Adjust text size for better readability</p>
          </div>
        </div>

        <div className="flex gap-3">
          {["small", "medium", "large"].map((size) => (
            <button
              key={size}
              onClick={() => updateSetting("fontSize", size)}
              className={`px-4 py-2 rounded-lg border transition ${
                settings.fontSize === size
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              {size.charAt(0).toUpperCase() + size.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Dark Mode */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Moon size={24} className="text-secondary" />
            <div>
              <h3 className="font-semibold text-foreground">Dark Mode</h3>
              <p className="text-sm text-muted-foreground">Reduce eye strain with dark background</p>
            </div>
          </div>
          <button
            onClick={() => updateSetting("darkMode", !settings.darkMode)}
            className={`relative w-12 h-6 rounded-full transition ${settings.darkMode ? "bg-primary" : "bg-muted"}`}
          >
            <span
              className={`absolute top-1 w-4 h-4 rounded-full bg-white transition transform ${
                settings.darkMode ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* High Contrast */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Eye size={24} className="text-primary" />
            <div>
              <h3 className="font-semibold text-foreground">High Contrast</h3>
              <p className="text-sm text-muted-foreground">Increase color contrast for better visibility</p>
            </div>
          </div>
          <button
            onClick={() => updateSetting("highContrast", !settings.highContrast)}
            className={`relative w-12 h-6 rounded-full transition ${settings.highContrast ? "bg-primary" : "bg-muted"}`}
          >
            <span
              className={`absolute top-1 w-4 h-4 rounded-full bg-white transition transform ${
                settings.highContrast ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Reduce Motion */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-lg bg-accent/20 flex items-center justify-center">
              <span className="text-xs">⏸</span>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Reduce Motion</h3>
              <p className="text-sm text-muted-foreground">Minimize animations and transitions</p>
            </div>
          </div>
          <button
            onClick={() => updateSetting("reduceMotion", !settings.reduceMotion)}
            className={`relative w-12 h-6 rounded-full transition ${settings.reduceMotion ? "bg-primary" : "bg-muted"}`}
          >
            <span
              className={`absolute top-1 w-4 h-4 rounded-full bg-white transition transform ${
                settings.reduceMotion ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Dyslexia Font */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">Aa</span>
            <div>
              <h3 className="font-semibold text-foreground">Dyslexia-Friendly Font</h3>
              <p className="text-sm text-muted-foreground">Use fonts optimized for dyslexic readers</p>
            </div>
          </div>
          <button
            onClick={() => updateSetting("dyslexiaFont", !settings.dyslexiaFont)}
            className={`relative w-12 h-6 rounded-full transition ${settings.dyslexiaFont ? "bg-primary" : "bg-muted"}`}
          >
            <span
              className={`absolute top-1 w-4 h-4 rounded-full bg-white transition transform ${
                settings.dyslexiaFont ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      <button className="w-full py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition font-medium">
        Save Accessibility Settings
      </button>
    </div>
  )
}
