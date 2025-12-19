"use client"

import { useState } from "react"

export default function GeneralSettings() {
  const [settings, setSettings] = useState({
    language: "english",
    timezone: "UTC",
    theme: "light",
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">General Settings</h2>
      </div>

      {/* Language */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <label className="block font-semibold text-foreground">Language</label>
        <select
          value={settings.language}
          onChange={(e) => setSettings({ ...settings, language: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="english">English</option>
          <option value="spanish">Spanish</option>
          <option value="french">French</option>
          <option value="chinese">Chinese</option>
        </select>
      </div>

      {/* Timezone */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <label className="block font-semibold text-foreground">Timezone</label>
        <select
          value={settings.timezone}
          onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="UTC">UTC</option>
          <option value="EST">EST (Eastern)</option>
          <option value="CST">CST (Central)</option>
          <option value="PST">PST (Pacific)</option>
        </select>
      </div>

      <button className="w-full py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition font-medium">
        Save General Settings
      </button>
    </div>
  )
}
