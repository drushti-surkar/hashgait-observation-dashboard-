"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { XAxis, YAxis, ResponsiveContainer, LineChart, Line } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Shield, Key, AlertTriangle, Ban, Globe, Lock } from "lucide-react"

// Mock data
const authFailureData = Array.from({ length: 24 }, (_, i) => ({
  hour: i,
  failures: Math.floor(Math.random() * 20) + 5,
}))

const apiKeyUsage = [
  { keyId: "ak_prod_1a2b3c", usage: 85, limit: 10000, requests: 8500 },
  { keyId: "ak_prod_4d5e6f", usage: 67, limit: 5000, requests: 3350 },
  { keyId: "ak_dev_7g8h9i", usage: 23, limit: 1000, requests: 230 },
  { keyId: "ak_test_0j1k2l", usage: 12, limit: 500, requests: 60 },
]

const blockedRequests = [
  {
    ip: "192.168.1.100",
    country: "Unknown",
    reason: "Rate limit exceeded",
    timestamp: "2 minutes ago",
    attempts: 1247,
  },
  {
    ip: "10.0.0.45",
    country: "Russia",
    reason: "Suspicious behavior",
    timestamp: "5 minutes ago",
    attempts: 89,
  },
  {
    ip: "203.0.113.0",
    country: "China",
    reason: "Blacklisted IP",
    timestamp: "8 minutes ago",
    attempts: 156,
  },
  {
    ip: "198.51.100.0",
    country: "Brazil",
    reason: "Invalid JWT token",
    timestamp: "12 minutes ago",
    attempts: 34,
  },
]

const securityEvents = [
  {
    type: "JWT_VALIDATION_FAILED",
    description: "Invalid JWT signature detected",
    severity: "warning",
    count: 23,
    lastSeen: "1 minute ago",
  },
  {
    type: "BRUTE_FORCE_ATTEMPT",
    description: "Multiple failed authentication attempts",
    severity: "error",
    count: 7,
    lastSeen: "3 minutes ago",
  },
  {
    type: "SUSPICIOUS_GEOLOCATION",
    description: "Login from unusual location",
    severity: "warning",
    count: 12,
    lastSeen: "5 minutes ago",
  },
  {
    type: "API_KEY_ABUSE",
    description: "API key usage exceeded normal patterns",
    severity: "warning",
    count: 4,
    lastSeen: "8 minutes ago",
  },
]

export function SecurityAccess() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-100 mb-2">Security & Access</h2>
        <p className="text-gray-400">Monitor authentication security, API access, and threat detection</p>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">JWT Failures</CardTitle>
            <Lock className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">47</div>
            <p className="text-xs text-gray-400">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Blocked IPs</CardTitle>
            <Ban className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">12</div>
            <p className="text-xs text-gray-400">Currently blocked</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">API Keys Active</CardTitle>
            <Key className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">24</div>
            <p className="text-xs text-green-500">All within limits</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Security Score</CardTitle>
            <Shield className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">94%</div>
            <p className="text-xs text-gray-400">Excellent</p>
          </CardContent>
        </Card>
      </div>

      {/* Authentication Failures Chart */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-100">Authentication Failures</CardTitle>
          <CardDescription className="text-gray-400">JWT validation failures over the last 24 hours</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              failures: {
                label: "Failures",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={authFailureData}>
                <XAxis dataKey="hour" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="failures" stroke="#ef4444" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* API Key Usage */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-100">API Key Usage</CardTitle>
          <CardDescription className="text-gray-400">Current usage statistics for active API keys</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {apiKeyUsage.map((key, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Key className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-mono text-gray-300">{key.keyId}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-100">{key.requests.toLocaleString()}</span>
                    <span className="text-xs text-gray-400"> / {key.limit.toLocaleString()}</span>
                  </div>
                </div>
                <Progress value={key.usage} className="h-2" />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{key.usage}% used</span>
                  <span>{key.limit - key.requests} remaining</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Blocked Requests and Security Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-100">Blocked Requests</CardTitle>
            <CardDescription className="text-gray-400">Recently blocked IP addresses and reasons</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {blockedRequests.map((request, index) => (
                <div key={index} className="p-3 bg-gray-800 rounded-lg border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-mono text-gray-200">{request.ip}</span>
                      <Badge variant="outline" className="border-gray-600 text-gray-300">
                        {request.country}
                      </Badge>
                    </div>
                    <span className="text-xs text-gray-500">{request.timestamp}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{request.reason}</span>
                    <span className="text-sm text-red-400">{request.attempts} attempts</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-100">Security Events</CardTitle>
            <CardDescription className="text-gray-400">Recent security-related events and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {securityEvents.map((event, index) => (
                <div key={index} className="p-3 bg-gray-800 rounded-lg border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle
                        className={`h-4 w-4 ${event.severity === "error" ? "text-red-500" : "text-yellow-500"}`}
                      />
                      <Badge className={event.severity === "error" ? "bg-red-600" : "bg-yellow-600"}>
                        {event.type}
                      </Badge>
                    </div>
                    <span className="text-xs text-gray-500">{event.lastSeen}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{event.description}</span>
                    <span className="text-sm text-gray-200">{event.count} events</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Threat Intelligence */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-100">Threat Intelligence</CardTitle>
          <CardDescription className="text-gray-400">Geographic threat analysis and risk assessment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-200">High-Risk Countries</h4>
              <div className="space-y-3">
                {[
                  { country: "Russia", risk: "High", requests: 234 },
                  { country: "China", risk: "High", requests: 189 },
                  { country: "North Korea", risk: "Critical", requests: 12 },
                ].map((country, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-300">{country.country}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={country.risk === "Critical" ? "bg-red-600" : "bg-yellow-600"}>
                        {country.risk}
                      </Badge>
                      <span className="text-xs text-gray-400">{country.requests}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-200">Attack Patterns</h4>
              <div className="space-y-3">
                {[
                  { pattern: "Credential Stuffing", detected: 23 },
                  { pattern: "SQL Injection", detected: 7 },
                  { pattern: "XSS Attempts", detected: 12 },
                ].map((pattern, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">{pattern.pattern}</span>
                    <Badge variant="outline" className="border-red-600 text-red-400">
                      {pattern.detected}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-200">Security Metrics</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">False Positive Rate</span>
                  <span className="text-sm text-green-500">2.1%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Detection Accuracy</span>
                  <span className="text-sm text-green-500">97.8%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Response Time</span>
                  <span className="text-sm text-blue-500">1.2s</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
