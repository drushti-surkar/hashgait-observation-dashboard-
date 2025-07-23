"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Users, Globe, Smartphone, Monitor, Shield, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock data
const confidenceData = Array.from({ length: 24 }, (_, i) => ({
  hour: i,
  avgConfidence: 85 + Math.random() * 10,
}))

const deviceData = [
  { name: "Desktop", value: 45, color: "#3b82f6" },
  { name: "Mobile", value: 35, color: "#10b981" },
  { name: "Tablet", value: 20, color: "#f59e0b" },
]

const geographicData = [
  { country: "United States", users: 1247, percentage: 42.3 },
  { country: "United Kingdom", users: 523, percentage: 17.8 },
  { country: "Germany", users: 387, percentage: 13.1 },
  { country: "Canada", users: 298, percentage: 10.1 },
  { country: "Australia", users: 234, percentage: 7.9 },
  { country: "Others", users: 258, percentage: 8.8 },
]

const userAgents = [
  { agent: "Chrome 120.0", count: 1456, percentage: 49.2 },
  { agent: "Safari 17.1", count: 687, percentage: 23.2 },
  { agent: "Firefox 121.0", count: 423, percentage: 14.3 },
  { agent: "Edge 120.0", count: 298, percentage: 10.1 },
  { agent: "Others", count: 95, percentage: 3.2 },
]

export function UserActivity() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-100 mb-2">User Activity</h2>
        <p className="text-gray-400">Real-time user behavior analytics and authentication patterns</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Active Users</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-100">2,959</div>
            <p className="text-xs text-green-500">+18% from last hour</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Avg Confidence</CardTitle>
            <Shield className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-100">89.4%</div>
            <p className="text-xs text-green-500">+2.1% from baseline</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Countries</CardTitle>
            <Globe className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-100">47</div>
            <p className="text-xs text-gray-400">Active regions</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Session Duration</CardTitle>
            <Monitor className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-100">14.2m</div>
            <p className="text-xs text-gray-400">Average session</p>
          </CardContent>
        </Card>
      </div>

      {/* Confidence Score Trend */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-100 flex items-center gap-2">
            Authentication Confidence Score
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Average confidence score for behavioral authentication over the last 24 hours. Higher is better.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardTitle>
          <CardDescription className="text-gray-400">Average confidence score over the last 24 hours</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              avgConfidence: {
                label: "Average Confidence",
                color: "#10b981",
              },
            }}
            className="h-[250px] md:h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={confidenceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="hour" stroke="#6b7280" fontSize={12} tickFormatter={(value) => `${value}:00`} />
                <YAxis stroke="#6b7280" domain={[80, 100]} fontSize={12} tickFormatter={(value) => `${value}%`} />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => [`${Number(value).toFixed(1)}%`, "Confidence Score"]}
                      labelFormatter={(label) => `Hour: ${label}:00`}
                    />
                  }
                />
                <Bar dataKey="avgConfidence" fill="#10b981" radius={[4, 4, 0, 0]} stroke="#059669" strokeWidth={1} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Device and Geographic Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-100">Device Distribution</CardTitle>
            <CardDescription className="text-gray-400">User devices accessing the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center mb-4">
              <ResponsiveContainer width={200} height={200}>
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {deviceData.map((device, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: device.color }}></div>
                    <span className="text-sm text-gray-300">{device.name}</span>
                  </div>
                  <span className="text-sm text-gray-100">{device.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-100">Geographic Distribution</CardTitle>
            <CardDescription className="text-gray-400">Top countries by active users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {geographicData.map((country, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-6 bg-gray-700 rounded flex items-center justify-center">
                      <Globe className="h-3 w-3 text-gray-400" />
                    </div>
                    <span className="text-sm text-gray-300">{country.country}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-100">{country.users}</div>
                    <div className="text-xs text-gray-400">{country.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Agents */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-100">Top User Agents</CardTitle>
          <CardDescription className="text-gray-400">
            Browser and device information from active sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userAgents.map((agent, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-gray-300">{agent.agent}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-100">{agent.count} users</span>
                  <Badge variant="secondary" className="bg-gray-700">
                    {agent.percentage}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
