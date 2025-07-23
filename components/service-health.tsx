"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertCircle, XCircle, Activity, Database, Cpu, MemoryStick } from "lucide-react"

const services = [
  {
    name: "Autoencoder Service",
    status: "healthy",
    uptime: "99.98%",
    latency: "45ms",
    cpu: 67,
    memory: 72,
    requests: "2.4K/min",
    errors: 0.1,
  },
  {
    name: "Risk Evaluation Engine",
    status: "healthy",
    uptime: "99.95%",
    latency: "120ms",
    cpu: 45,
    memory: 58,
    requests: "1.8K/min",
    errors: 0.3,
  },
  {
    name: "NFT Generation Service",
    status: "warning",
    uptime: "99.87%",
    latency: "340ms",
    cpu: 89,
    memory: 91,
    requests: "450/min",
    errors: 2.1,
  },
  {
    name: "Database Cluster",
    status: "healthy",
    uptime: "99.99%",
    latency: "12ms",
    cpu: 34,
    memory: 45,
    requests: "5.2K/min",
    errors: 0.05,
  },
  {
    name: "Message Broker",
    status: "healthy",
    uptime: "99.96%",
    latency: "8ms",
    cpu: 23,
    memory: 38,
    requests: "3.1K/min",
    errors: 0.2,
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "healthy":
      return <CheckCircle className="h-5 w-5 text-green-500" />
    case "warning":
      return <AlertCircle className="h-5 w-5 text-yellow-500" />
    case "critical":
      return <XCircle className="h-5 w-5 text-red-500" />
    default:
      return <CheckCircle className="h-5 w-5 text-gray-500" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "healthy":
      return "bg-green-600"
    case "warning":
      return "bg-yellow-600"
    case "critical":
      return "bg-red-600"
    default:
      return "bg-gray-600"
  }
}

export function ServiceHealth() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-100 mb-2">Service Health</h2>
        <p className="text-gray-400">Real-time monitoring of all HashGait backend services</p>
      </div>

      {/* Service Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Healthy Services</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">4/5</div>
            <p className="text-xs text-gray-400">80% operational</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Avg Response Time</CardTitle>
            <Activity className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-100">105ms</div>
            <p className="text-xs text-green-500">-15ms from last hour</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Error Rate</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-100">0.54%</div>
            <p className="text-xs text-yellow-500">+0.2% from baseline</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Service Status */}
      <div className="space-y-4">
        {services.map((service, index) => (
          <Card key={index} className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(service.status)}
                  <div>
                    <CardTitle className="text-lg text-gray-100">{service.name}</CardTitle>
                    <CardDescription className="text-gray-400">
                      Uptime: {service.uptime} • Latency: {service.latency}
                    </CardDescription>
                  </div>
                </div>
                <Badge className={getStatusColor(service.status)}>{service.status.toUpperCase()}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-gray-300">CPU Usage</span>
                  </div>
                  <Progress value={service.cpu} className="h-2" />
                  <span className="text-xs text-gray-400">{service.cpu}%</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MemoryStick className="h-4 w-4 text-purple-500" />
                    <span className="text-sm text-gray-300">Memory</span>
                  </div>
                  <Progress value={service.memory} className="h-2" />
                  <span className="text-xs text-gray-400">{service.memory}%</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-300">Requests</span>
                  </div>
                  <div className="text-lg font-semibold text-gray-100">{service.requests}</div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-gray-300">Error Rate</span>
                  </div>
                  <div className="text-lg font-semibold text-gray-100">{service.errors}%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Database Health Details */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-100 flex items-center gap-2">
            <Database className="h-5 w-5 text-blue-500" />
            Database Health Details
          </CardTitle>
          <CardDescription className="text-gray-400">
            Connection pools, query performance, and replication status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-200">Connection Pools</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Read Pool</span>
                  <span className="text-gray-200">45/100</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Write Pool</span>
                  <span className="text-gray-200">23/50</span>
                </div>
                <Progress value={46} className="h-2" />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-200">Query Performance</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Avg Query Time</span>
                  <span className="text-sm text-gray-200">12ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Slow Queries</span>
                  <span className="text-sm text-yellow-500">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Failed Queries</span>
                  <span className="text-sm text-green-500">0</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-200">Replication</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Replication Lag</span>
                  <span className="text-sm text-green-500">2ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Replica Status</span>
                  <Badge className="bg-green-600">Healthy</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
