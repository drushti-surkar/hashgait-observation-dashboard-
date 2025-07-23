"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"

export function PerformanceMonitor() {
  const [renderTime, setRenderTime] = useState<number>(0)
  const [memoryUsage, setMemoryUsage] = useState<number>(0)

  useEffect(() => {
    const startTime = performance.now()

    // Measure render time
    const measureRender = () => {
      const endTime = performance.now()
      setRenderTime(Math.round(endTime - startTime))
    }

    // Measure memory usage if available
    const measureMemory = () => {
      if ("memory" in performance) {
        const memory = (performance as any).memory
        setMemoryUsage(Math.round(memory.usedJSHeapSize / 1024 / 1024))
      }
    }

    measureRender()
    measureMemory()

    const interval = setInterval(measureMemory, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-50 flex gap-2">
      <Badge variant="outline" className="bg-gray-900/90 border-gray-700 text-gray-300">
        Render: {renderTime}ms
      </Badge>
      {memoryUsage > 0 && (
        <Badge variant="outline" className="bg-gray-900/90 border-gray-700 text-gray-300">
          Memory: {memoryUsage}MB
        </Badge>
      )}
    </div>
  )
}
