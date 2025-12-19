"use client"

import { useState } from "react"
import { Bell } from "lucide-react"

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    lessonsReminders: true,
    achievementNotifications: true,
    classAnnouncements: true,
    weeklyReport: true,
    socialActivity: false,
  })

  const updateSetting = (key: string, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const notifications = [
    { key: "lessonsReminders", label: "Lesson Reminders", description: "Get notified about recommended lessons" },
    { key: "achievementNotifications", label: "Achievements", description: "Celebrate your milestones" },
    { key: "classAnnouncements", label: "Class Announcements", description: "Important updates from your teacher" },
    { key: "weeklyReport", label: "Weekly Report", description: "Summary of your progress" },
    { key: "socialActivity", label: "Social Activity", description: "When peers interact with your posts" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">Notification Preferences</h2>
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.key}
            className="rounded-xl border border-border bg-card p-6 flex items-start justify-between"
          >
            <div className="flex items-center gap-3">
              <Bell size={20} className="text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground">{notification.label}</h3>
                <p className="text-sm text-muted-foreground">{notification.description}</p>
              </div>
            </div>
            <button
              onClick={() => updateSetting(notification.key, !settings[notification.key as keyof typeof settings])}
              className={`relative w-12 h-6 rounded-full transition flex-shrink-0 ${
                settings[notification.key as keyof typeof settings] ? "bg-primary" : "bg-muted"
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition transform ${
                  settings[notification.key as keyof typeof settings] ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      <button className="w-full py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition font-medium">
        Save Notification Settings
      </button>
    </div>
  )
}
