"use client"

import { useState, useEffect, useCallback, useMemo } from "react"

// Mock data generators with performance optimization
export function useDashboardData() {
  const [lastUpdate, setLastUpdate] = useState(Date.now())

  // Memoized data generation to prevent unnecessary recalculations
  const apiRequestData = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        hour: i,
        requests: Math.floor(Math.random() * 1000) + 500,
        errors: Math.floor(Math.random() * 50) + 10,
      })),
    [lastUpdate],
  )

  const systemMetrics = useMemo(
    () => ({
      activeSessions: 2847 + Math.floor(Math.random() * 100),
      uptime: 99.99,
      apiRequestsPerSec: 847 + Math.floor(Math.random() * 200),
      eventsProcessed: 15200 + Math.floor(Math.random() * 1000),
    }),
    [lastUpdate],
  )

  // Optimized refresh function
  const refreshData = useCallback(() => {
    setLastUpdate(Date.now())
  }, [])

  // Auto-refresh every 30 seconds instead of constant updates
  useEffect(() => {
    const interval = setInterval(refreshData, 30000)
    return () => clearInterval(interval)
  }, [refreshData])

  return {
    apiRequestData,
    systemMetrics,
    refreshData,
    lastUpdate,
  }
}
