"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus, Activity, Users, AlertTriangle, CheckCircle } from "lucide-react"

interface QuickStatsBarProps {
  className?: string
}

export function QuickStatsBar({ className }: QuickStatsBarProps) {
  const stats = [
    {
      label: "System Status",
      value: "Healthy",
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      trend: "stable",
    },
    {
      label: "Active Users",
      value: "2,847",
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      trend: "up",
      change: "+12%",
    },
    {
      label: "API Health",
      value: "99.8%",
      icon: Activity,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      trend: "up",
      change: "+0.1%",
    },
    {
      label: "Active Alerts",
      value: "3",
      icon: AlertTriangle,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      trend: "down",
      change: "-2",
    },
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-green-500" />
      case "down":
        return <TrendingDown className="h-3 w-3 text-red-500" />
      default:
        return <Minus className="h-3 w-3 text-gray-500" />
    }
  }

  return (
    <Card className={`bg-gray-900/50 border-gray-800 backdrop-blur ${className}`}>
      <div className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-400 truncate">{stat.label}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-200">{stat.value}</span>
                  {stat.change && (
                    <div className="flex items-center gap-1">
                      {getTrendIcon(stat.trend)}
                      <span className="text-xs text-gray-400">{stat.change}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
