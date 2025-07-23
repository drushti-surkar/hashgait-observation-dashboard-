"use client"

import { useState, useEffect, useCallback } from "react"

interface LiveMetrics {
  activeSessions: number
  uptime: number
  apiRequestsPerSec: number
  eventsProcessed: number
  errorRate: number
  lastUpdate: number
}

export function useLiveData() {
  const [metrics, setMetrics] = useState<LiveMetrics>({
    activeSessions: 2847,
    uptime: 99.99,
    apiRequestsPerSec: 847,
    eventsProcessed: 15200,
    errorRate: 1.2,
    lastUpdate: Date.now(),
  })

  const [isConnected, setIsConnected] = useState(true)

  const updateMetrics = useCallback(() => {
    setMetrics((prev) => ({
      activeSessions: prev.activeSessions + Math.floor(Math.random() * 20 - 10),
      uptime: Math.min(99.99, prev.uptime + Math.random() * 0.001),
      apiRequestsPerSec: Math.max(200, prev.apiRequestsPerSec + Math.floor(Math.random() * 100 - 50)),
      eventsProcessed: prev.eventsProcessed + Math.floor(Math.random() * 50 + 10),
      errorRate: Math.max(0.1, Math.min(8.0, prev.errorRate + (Math.random() - 0.5) * 0.5)),
      lastUpdate: Date.now(),
    }))
  }, [])

  useEffect(() => {
    // Simulate WebSocket connection
    const interval = setInterval(() => {
      if (Math.random() > 0.05) {
        // 95% connection reliability
        updateMetrics()
        setIsConnected(true)
      } else {
        setIsConnected(false)
      }
    }, 3000) // Update every 3 seconds

    return () => clearInterval(interval)
  }, [updateMetrics])

  return {
    metrics,
    isConnected,
    refreshData: updateMetrics,
  }
}
