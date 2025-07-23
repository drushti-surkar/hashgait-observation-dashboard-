"use client"

import { SystemOverview } from "@/components/system-overview"
import { ServiceHealth } from "@/components/service-health"
import { UserActivity } from "@/components/user-activity"
import { LogsEvents } from "@/components/logs-events"
import { AlertsNotifications } from "@/components/alerts-notifications"
import { SecurityAccess } from "@/components/security-access"
import { BottomNavigation } from "@/components/bottom-navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardLayout } from "@/components/dashboard-layout"
import { EnhancedPerformanceMonitor } from "@/components/enhanced-performance-monitor"
import { useState, useCallback } from "react"

export default function Dashboard() {
  const [activePanel, setActivePanel] = useState("overview")

  const handleRefresh = useCallback(() => {
    // Trigger data refresh
    window.location.reload()
  }, [])

  const renderActivePanel = () => {
    switch (activePanel) {
      case "overview":
        return <SystemOverview />
      case "health":
        return <ServiceHealth />
      case "activity":
        return <UserActivity />
      case "logs":
        return <LogsEvents />
      case "alerts":
        return <AlertsNotifications />
      case "security":
        return <SecurityAccess />
      default:
        return <SystemOverview />
    }
  }

  return (
    <DashboardLayout>
      <DashboardHeader activePanel={activePanel} onRefresh={handleRefresh} />
      {renderActivePanel()}
      <BottomNavigation activePanel={activePanel} setActivePanel={setActivePanel} />
      <EnhancedPerformanceMonitor />
    </DashboardLayout>
  )
}
