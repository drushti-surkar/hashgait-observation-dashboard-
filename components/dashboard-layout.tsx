"use client"

import type { ReactNode } from "react"

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-950">
      <div className="flex flex-col h-screen">
        {/* Main content area with bottom padding for navigation */}
        <main className="flex-1 overflow-auto pb-32 md:pb-24">
          <div className="p-4 md:p-6 max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}
