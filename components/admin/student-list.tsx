"use client"

import { useState } from "react"
import { Search, MoreVertical } from "lucide-react"

const students = [
  {
    id: 1,
    name: "Sarah Chen",
    email: "sarah@example.com",
    progress: 72,
    status: "Active",
    subjects: "Math, Science",
  },
  {
    id: 2,
    name: "John Smith",
    email: "john@example.com",
    progress: 58,
    status: "Active",
    subjects: "English, History",
  },
  {
    id: 3,
    name: "Maria Garcia",
    email: "maria@example.com",
    progress: 85,
    status: "Active",
    subjects: "Math, Science, Arts",
  },
  {
    id: 4,
    name: "Alex Johnson",
    email: "alex@example.com",
    progress: 42,
    status: "Inactive",
    subjects: "Math",
  },
  {
    id: 5,
    name: "Emma Wilson",
    email: "emma@example.com",
    progress: 91,
    status: "Active",
    subjects: "All subjects",
  },
]

export default function StudentList() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredStudents = students.filter((student) => student.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="rounded-xl border border-border bg-card p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-4">Student Management</h2>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="search"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Email</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Progress</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Subjects</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id} className="border-b border-border hover:bg-muted/50 transition">
                <td className="px-4 py-3 text-sm text-foreground font-medium">{student.name}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{student.email}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${student.progress}%` }} />
                    </div>
                    <span className="text-sm font-medium text-foreground">{student.progress}%</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      student.status === "Active" ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {student.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{student.subjects}</td>
                <td className="px-4 py-3">
                  <button className="p-2 hover:bg-muted rounded-lg transition">
                    <MoreVertical size={16} className="text-muted-foreground" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
