"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import type { LucideIcon } from "lucide-react"

interface EnhancedMetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  iconColor: string
  status: "healthy" | "warning" | "critical"
  tooltip: string
  trend?: {
    value: string
    isPositive: boolean
  }
  threshold?: {
    warning: number
    critical: number
    current: number
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "healthy":
      return "border-green-500/50 bg-green-500/5"
    case "warning":
      return "border-yellow-500/50 bg-yellow-500/5"
    case "critical":
      return "border-red-500/50 bg-red-500/5"
    default:
      return "border-gray-700"
  }
}

const getStatusIndicator = (status: string) => {
  switch (status) {
    case "healthy":
      return (
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
          <Badge className="bg-green-600 hover:bg-green-700 text-xs">HEALTHY</Badge>
        </div>
      )
    case "warning":
      return (
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 bg-yellow-500 rounded-full animate-pulse" />
          <Badge className="bg-yellow-600 hover:bg-yellow-700 text-xs">WARNING</Badge>
        </div>
      )
    case "critical":
      return (
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
          <Badge className="bg-red-600 hover:bg-red-700 text-xs">CRITICAL</Badge>
        </div>
      )
    default:
      return null
  }
}

export function EnhancedMetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor,
  status,
  tooltip,
  trend,
  threshold,
}: EnhancedMetricCardProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card
            className={`bg-gray-900 border-2 transition-all hover:border-gray-600 cursor-help ${getStatusColor(status)}`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200 flex items-center gap-2">{title}</CardTitle>
              <Icon className={`h-5 w-5 ${iconColor} flex-shrink-0`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-100 mb-2">{value}</div>
              <div className="flex items-center justify-between mb-2">
                {subtitle && <p className="text-xs text-gray-300">{subtitle}</p>}
                {trend && (
                  <p className={`text-xs font-medium ${trend.isPositive ? "text-green-400" : "text-red-400"}`}>
                    {trend.value}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between">
                {getStatusIndicator(status)}
                {threshold && (
                  <div className="text-xs text-gray-400">
                    {threshold.current}/{threshold.warning}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs bg-gray-800 border-gray-700">
          <p className="text-sm text-gray-200">{tooltip}</p>
          {threshold && (
            <div className="mt-2 text-xs text-gray-400">
              <p>Warning: {threshold.warning}</p>
              <p>Critical: {threshold.critical}</p>
            </div>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
