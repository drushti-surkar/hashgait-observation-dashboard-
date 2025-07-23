"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { LucideIcon } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  iconColor: string
  status?: "healthy" | "warning" | "critical"
  tooltip: string
  trend?: {
    value: string
    isPositive: boolean
  }
}

const getStatusColor = (status?: string) => {
  switch (status) {
    case "healthy":
      return "border-green-500 bg-green-500/10"
    case "warning":
      return "border-yellow-500 bg-yellow-500/10"
    case "critical":
      return "border-red-500 bg-red-500/10"
    default:
      return "border-gray-700"
  }
}

const getStatusIndicator = (status?: string) => {
  switch (status) {
    case "healthy":
      return <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
    case "warning":
      return <div className="h-2 w-2 bg-yellow-500 rounded-full animate-pulse" />
    case "critical":
      return <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
    default:
      return null
  }
}

export function MetricCard({ title, value, subtitle, icon: Icon, iconColor, status, tooltip, trend }: MetricCardProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card
            className={`bg-gray-900 border-2 transition-all hover:border-gray-600 cursor-help ${getStatusColor(status)}`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
                {title}
                {getStatusIndicator(status)}
              </CardTitle>
              <Icon className={`h-5 w-5 ${iconColor} flex-shrink-0`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-100 mb-1">{value}</div>
              <div className="flex items-center justify-between">
                {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
                {trend && (
                  <p className={`text-xs font-medium ${trend.isPositive ? "text-green-500" : "text-red-500"}`}>
                    {trend.value}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs">
          <p className="text-sm">{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
