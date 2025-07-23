"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Server, RefreshCwIcon as Refresh, Settings } from "lucide-react"

interface DashboardHeaderProps {
  activePanel: string
  onRefresh?: () => void
}

const panelTitles = {
  overview: "System Overview",
  health: "Service Health",
  activity: "User Activity",
  logs: "Logs & Events",
  alerts: "Alerts & Notifications",
  security: "Security & Access",
}

export function DashboardHeader({ activePanel, onRefresh }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-4 border-b border-gray-800 px-6 bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-gray-950/80">
      <div className="flex items-center gap-2">
        <Server className="h-6 w-6 text-blue-500" />
        <div>
          <h1 className="text-lg font-semibold text-gray-100">HashGait Observability</h1>
          <p className="text-xs text-gray-400">Backend Monitoring Dashboard</p>
        </div>
      </div>

      <Separator orientation="vertical" className="h-6 bg-gray-700" />

      <div className="flex items-center gap-2">
        <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-sm font-medium text-gray-200">
          {panelTitles[activePanel as keyof typeof panelTitles] || "Dashboard"}
        </span>
        <Badge variant="outline" className="border-green-600 text-green-400 bg-green-600/10">
          Live
        </Badge>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          className="bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700"
        >
          <Refresh className="h-4 w-4 mr-2" />
          Refresh
        </Button>
        <Button variant="outline" size="sm" className="bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}
