"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Users, Zap, CheckCircle, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { EnhancedMetricCard } from "./enhanced-metric-card"
import { EnhancedChart } from "./enhanced-chart"
import { useMemo } from "react"
import { QuickStatsBar } from "./quick-stats-bar"

// Mock data for charts with more realistic patterns
const generateApiRequestData = () => {
  return Array.from({ length: 24 }, (_, i) => {
    // Simulate daily patterns - higher during business hours
    const baseRequests = i >= 8 && i <= 18 ? 800 + Math.random() * 400 : 300 + Math.random() * 200
    const errorRate = Math.random() * 0.05 + 0.01 // 1-6% error rate
    return {
      hour: i,
      requests: Math.floor(baseRequests),
      errors: Math.floor(baseRequests * errorRate),
    }
  })
}

export function SystemOverview() {
  const apiRequestData = useMemo(() => generateApiRequestData(), [])

  // Calculate current error rate for status determination
  const currentHour = new Date().getHours()
  const currentData = apiRequestData[currentHour] || apiRequestData[0]
  const errorRate = (currentData.errors / currentData.requests) * 100

  const getApiStatus = () => {
    if (errorRate > 5) return "critical"
    if (errorRate > 2) return "warning"
    return "healthy"
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-100 mb-2">System Overview</h2>
        <p className="text-gray-300">Real-time system metrics and performance indicators</p>
      </div>

      {/* Quick Stats Bar */}
      <QuickStatsBar />

      {/* Enhanced Key Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <EnhancedMetricCard
          title="Active Sessions"
          value="2,847"
          icon={Users}
          iconColor="text-blue-500"
          status="healthy"
          tooltip="Number of currently active user sessions. Healthy range: 2000-5000 sessions. This includes all authenticated users currently interacting with the platform."
          trend={{ value: "+12% from last hour", isPositive: true }}
          threshold={{ warning: 4000, critical: 5000, current: 2847 }}
        />

        <EnhancedMetricCard
          title="System Uptime"
          value="99.99%"
          subtitle="23 days, 14 hours"
          icon={CheckCircle}
          iconColor="text-green-500"
          status="healthy"
          tooltip="Percentage of time the system has been operational. Target: >99.9% uptime. Current streak: 23 days without downtime."
        />

        <EnhancedMetricCard
          title="API Requests/sec"
          value="847"
          subtitle={`Peak: 1,203 RPS | Error: ${errorRate.toFixed(1)}%`}
          icon={Activity}
          iconColor="text-purple-500"
          status={getApiStatus()}
          tooltip={`Current rate of API requests per second. Normal range: 500-1500 RPS. Current error rate: ${errorRate.toFixed(1)}%. Warning if >2%, critical if >5%.`}
          threshold={{ warning: 1200, critical: 1500, current: 847 }}
        />

        <EnhancedMetricCard
          title="Events Processed"
          value="15.2K"
          icon={Zap}
          iconColor="text-yellow-500"
          status="healthy"
          tooltip="Total behavioral authentication events processed in the last hour. Includes pattern analysis, risk evaluation, and NFT generation events."
          trend={{ value: "+8% from yesterday", isPositive: true }}
        />
      </div>

      {/* Status Distribution and Chart */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-100">Response Status Distribution</CardTitle>
            <CardDescription className="text-gray-300">Last 24 hours</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-200">2xx Success</span>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-gray-100">94.2%</div>
                <div className="text-xs text-gray-300">847K requests</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-200">4xx Client Error</span>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-gray-100">4.1%</div>
                <div className="text-xs text-gray-300">37K requests</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-200">5xx Server Error</span>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-gray-100">1.7%</div>
                <div className="text-xs text-gray-300">15K requests</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="xl:col-span-2 bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-100 flex items-center gap-2">
              API Request Rate
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-gray-800 border-gray-700">
                    <p className="text-gray-200">
                      Requests per hour over the last 24 hours. Blue line shows successful requests, red line shows
                      errors. Hover over data points for exact values.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
            <CardDescription className="text-gray-300">
              Requests per hour with detailed hover information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EnhancedChart data={apiRequestData} className="h-[300px]" />
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Live Events */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-100 flex items-center gap-2">
            Live Event Stream
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            <Badge className="bg-green-600 hover:bg-green-700 text-xs">LIVE</Badge>
          </CardTitle>
          <CardDescription className="text-gray-300">Real-time behavioral authentication events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
            {[
              {
                type: "AUTH_SUCCESS",
                message: "Behavioral hash validated for user_847291",
                time: "2 seconds ago",
                level: "info",
                details: "Confidence: 94.2%, Processing time: 45ms",
              },
              {
                type: "NFT_GENERATED",
                message: "Authentication NFT minted: 0x7f8a9b2c...",
                time: "5 seconds ago",
                level: "info",
                details: "Gas used: 21000, Transaction confirmed",
              },
              {
                type: "RISK_EVAL",
                message: "Risk evaluation completed - confidence: 94.2%",
                time: "8 seconds ago",
                level: "info",
                details: "LLM response time: 120ms, Risk score: 0.12",
              },
              {
                type: "AUTH_ATTEMPT",
                message: "New authentication session started",
                time: "12 seconds ago",
                level: "info",
                details: "User ID: user_847291, IP: 192.168.1.100",
              },
              {
                type: "PATTERN_ANOMALY",
                message: "Unusual behavioral pattern detected",
                time: "15 seconds ago",
                level: "warn",
                details: "Deviation score: 2.3, Flagged for review",
              },
            ].map((event, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-200 hover:shadow-lg"
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <Badge
                    className={`${
                      event.level === "info"
                        ? "bg-blue-600 hover:bg-blue-700"
                        : event.level === "warn"
                          ? "bg-yellow-600 hover:bg-yellow-700"
                          : "bg-red-600 hover:bg-red-700"
                    } flex-shrink-0 text-white font-medium`}
                  >
                    {event.level.toUpperCase()}
                  </Badge>
                  <Badge variant="outline" className="border-gray-600 text-gray-200 bg-gray-700/50 flex-shrink-0">
                    {event.type}
                  </Badge>
                  <div className="min-w-0 flex-1">
                    <span className="text-sm text-gray-200 block">{event.message}</span>
                    <span className="text-xs text-gray-400 block mt-1">{event.details}</span>
                  </div>
                </div>
                <span className="text-xs text-gray-500 flex-shrink-0 mt-1 bg-gray-700/50 px-2 py-1 rounded">
                  {event.time}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
