"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertTriangle, Bell, CheckCircle, XCircle, Clock, Settings } from "lucide-react"
import { useState } from "react"

const activeAlerts = [
  {
    id: 1,
    title: "High NFT Service Latency",
    description: "NFT generation service response time exceeded 300ms threshold",
    severity: "warning",
    timestamp: "2 minutes ago",
    service: "nft-service",
    acknowledged: false,
  },
  {
    id: 2,
    title: "Database Slow Query",
    description: "Query execution time exceeded 2 seconds",
    severity: "error",
    timestamp: "5 minutes ago",
    service: "database",
    acknowledged: false,
  },
  {
    id: 3,
    title: "High CPU Usage",
    description: "Autoencoder service CPU usage above 85%",
    severity: "warning",
    timestamp: "8 minutes ago",
    service: "autoencoder",
    acknowledged: true,
  },
]

const alertRules = [
  {
    name: "Response Latency",
    threshold: "500ms",
    enabled: true,
    service: "All Services",
  },
  {
    name: "Error Rate",
    threshold: "1%",
    enabled: true,
    service: "All Services",
  },
  {
    name: "CPU Usage",
    threshold: "80%",
    enabled: true,
    service: "All Services",
  },
  {
    name: "Memory Usage",
    threshold: "85%",
    enabled: true,
    service: "All Services",
  },
  {
    name: "Authentication Confidence",
    threshold: "70%",
    enabled: false,
    service: "Risk Engine",
  },
]

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case "critical":
      return <XCircle className="h-5 w-5 text-red-500" />
    case "error":
      return <AlertTriangle className="h-5 w-5 text-red-500" />
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />
    default:
      return <Bell className="h-5 w-5 text-blue-500" />
  }
}

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "critical":
      return "bg-red-600"
    case "error":
      return "bg-red-600"
    case "warning":
      return "bg-yellow-600"
    default:
      return "bg-blue-600"
  }
}

export function AlertsNotifications() {
  const [alerts, setAlerts] = useState(activeAlerts)

  const acknowledgeAlert = (id: number) => {
    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, acknowledged: true } : alert)))
  }

  const resolveAlert = (id: number) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-100 mb-2">Alerts & Notifications</h2>
        <p className="text-gray-400">Monitor active alerts and configure notification thresholds</p>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{alerts.length}</div>
            <p className="text-xs text-gray-400">Requires attention</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Critical</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">0</div>
            <p className="text-xs text-green-500">No critical alerts</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Acknowledged</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {alerts.filter((alert) => alert.acknowledged).length}
            </div>
            <p className="text-xs text-gray-400">Being handled</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Avg Resolution</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-100">12m</div>
            <p className="text-xs text-gray-400">Last 24 hours</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Alerts */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-100">Active Alerts</CardTitle>
          <CardDescription className="text-gray-400">Current system alerts requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border ${alert.acknowledged ? "bg-gray-800 border-gray-700" : "bg-gray-800 border-yellow-600"}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getSeverityIcon(alert.severity)}
                    <div>
                      <h4 className="font-medium text-gray-100">{alert.title}</h4>
                      <p className="text-sm text-gray-400">{alert.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getSeverityColor(alert.severity)}>{alert.severity.toUpperCase()}</Badge>
                    {alert.acknowledged && <Badge className="bg-green-600">ACKNOWLEDGED</Badge>}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Service: {alert.service}</span>
                    <span>•</span>
                    <span>{alert.timestamp}</span>
                  </div>
                  <div className="flex gap-2">
                    {!alert.acknowledged && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => acknowledgeAlert(alert.id)}
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        Acknowledge
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => resolveAlert(alert.id)}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      Resolve
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alert Rules Configuration */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-100 flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Alert Rules Configuration
          </CardTitle>
          <CardDescription className="text-gray-400">
            Configure thresholds and enable/disable alert rules
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {alertRules.map((rule, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <Switch checked={rule.enabled} />
                    <div>
                      <h4 className="font-medium text-gray-100">{rule.name}</h4>
                      <p className="text-sm text-gray-400">Service: {rule.service}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <Label className="text-xs text-gray-400">Threshold</Label>
                    <Input
                      value={rule.threshold}
                      className="w-24 h-8 bg-gray-700 border-gray-600 text-gray-100"
                      readOnly
                    />
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                  >
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notification Channels */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-100">Notification Channels</CardTitle>
          <CardDescription className="text-gray-400">Configure how and where alerts are sent</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-200">Email Notifications</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm text-gray-300">Critical Alerts</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm text-gray-300">Warning Alerts</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm text-gray-300">Info Alerts</Label>
                  <Switch />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-200">Slack Integration</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm text-gray-300">Critical Alerts</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm text-gray-300">Warning Alerts</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm text-gray-300">Daily Summary</Label>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-200">PagerDuty</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm text-gray-300">Critical Alerts Only</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm text-gray-300">Escalation Policy</Label>
                  <Badge variant="outline" className="border-gray-600 text-gray-300">
                    HashGait-Backend
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-200">Webhook</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm text-gray-300">Custom Webhook</Label>
                  <Switch />
                </div>
                <Input
                  placeholder="https://your-webhook-url.com/alerts"
                  className="bg-gray-800 border-gray-700 text-gray-100"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
