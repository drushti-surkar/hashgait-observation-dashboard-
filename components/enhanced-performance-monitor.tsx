"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cpu, HardDrive, Activity, Clock } from "lucide-react"

interface SystemMetrics {
  renderTime: number
  memoryUsage: number
  cpuUsage: number
  diskUsage: number
  queueLength: number
  networkLatency: number
}

export function EnhancedPerformanceMonitor() {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    renderTime: 0,
    memoryUsage: 0,
    cpuUsage: 0,
    diskUsage: 0,
    queueLength: 0,
    networkLatency: 0,
  })
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const startTime = performance.now()

    const updateMetrics = () => {
      const endTime = performance.now()

      setMetrics({
        renderTime: Math.round(endTime - startTime),
        memoryUsage:
          "memory" in performance
            ? Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024)
            : Math.round(Math.random() * 200 + 50),
        cpuUsage: Math.round(Math.random() * 30 + 15), // Mock CPU usage
        diskUsage: Math.round(Math.random() * 20 + 60), // Mock disk usage
        queueLength: Math.round(Math.random() * 10 + 2), // Mock queue length
        networkLatency: Math.round(Math.random() * 50 + 20), // Mock network latency
      })
    }

    updateMetrics()
    const interval = setInterval(updateMetrics, 2000)
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (value: number, thresholds: { warning: number; critical: number }) => {
    if (value >= thresholds.critical) return "text-red-400 border-red-500"
    if (value >= thresholds.warning) return "text-yellow-400 border-yellow-500"
    return "text-green-400 border-green-500"
  }

  if (isExpanded) {
    return (
      <Card className="fixed bottom-4 right-4 z-50 w-80 bg-gray-900/95 border-gray-700 backdrop-blur">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-gray-200 flex items-center justify-between">
            System Performance
            <button onClick={() => setIsExpanded(false)} className="text-gray-400 hover:text-gray-200 text-xs">
              Minimize
            </button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-400" />
              <div>
                <p className="text-xs text-gray-400">Render Time</p>
                <p className="text-sm font-medium text-gray-200">{metrics.renderTime}ms</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-purple-400" />
              <div>
                <p className="text-xs text-gray-400">Memory</p>
                <p
                  className={`text-sm font-medium ${getStatusColor(metrics.memoryUsage, { warning: 150, critical: 200 })}`}
                >
                  {metrics.memoryUsage}MB
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-green-400" />
              <div>
                <p className="text-xs text-gray-400">CPU Usage</p>
                <p className={`text-sm font-medium ${getStatusColor(metrics.cpuUsage, { warning: 70, critical: 90 })}`}>
                  {metrics.cpuUsage}%
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <HardDrive className="h-4 w-4 text-yellow-400" />
              <div>
                <p className="text-xs text-gray-400">Disk Usage</p>
                <p
                  className={`text-sm font-medium ${getStatusColor(metrics.diskUsage, { warning: 80, critical: 95 })}`}
                >
                  {metrics.diskUsage}%
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-orange-400" />
              <div>
                <p className="text-xs text-gray-400">Queue Length</p>
                <p
                  className={`text-sm font-medium ${getStatusColor(metrics.queueLength, { warning: 8, critical: 12 })}`}
                >
                  {metrics.queueLength}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-cyan-400" />
              <div>
                <p className="text-xs text-gray-400">Network</p>
                <p
                  className={`text-sm font-medium ${getStatusColor(metrics.networkLatency, { warning: 100, critical: 200 })}`}
                >
                  {metrics.networkLatency}ms
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex gap-2">
      <Badge
        variant="outline"
        className="bg-gray-900/90 border-gray-700 text-gray-200 cursor-pointer hover:bg-gray-800/90"
        onClick={() => setIsExpanded(true)}
      >
        Render: {metrics.renderTime}ms
      </Badge>
      <Badge
        variant="outline"
        className={`bg-gray-900/90 border-gray-700 cursor-pointer hover:bg-gray-800/90 ${getStatusColor(metrics.memoryUsage, { warning: 150, critical: 200 })}`}
        onClick={() => setIsExpanded(true)}
      >
        Memory: {metrics.memoryUsage}MB
      </Badge>
      <Badge
        variant="outline"
        className={`bg-gray-900/90 border-gray-700 cursor-pointer hover:bg-gray-800/90 ${getStatusColor(metrics.cpuUsage, { warning: 70, critical: 90 })}`}
        onClick={() => setIsExpanded(true)}
      >
        CPU: {metrics.cpuUsage}%
      </Badge>
    </div>
  )
}
