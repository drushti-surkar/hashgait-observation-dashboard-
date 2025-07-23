"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, AlertCircle, Info, AlertTriangle, XCircle } from "lucide-react"
import { useState } from "react"

const logLevels = [
  { value: "all", label: "All Levels" },
  { value: "info", label: "Info" },
  { value: "warn", label: "Warning" },
  { value: "error", label: "Error" },
  { value: "fatal", label: "Fatal" },
]

const services = [
  { value: "all", label: "All Services" },
  { value: "autoencoder", label: "Autoencoder" },
  { value: "risk-engine", label: "Risk Engine" },
  { value: "nft-service", label: "NFT Service" },
  { value: "database", label: "Database" },
  { value: "auth", label: "Authentication" },
]

const mockLogs = [
  {
    timestamp: "2024-01-15 14:23:45.123",
    service: "autoencoder",
    level: "info",
    message: "Behavioral pattern analysis completed for session_847291 - confidence: 94.2%",
    details: "Processing time: 45ms, Features extracted: 127",
  },
  {
    timestamp: "2024-01-15 14:23:44.891",
    service: "risk-engine",
    level: "info",
    message: "Risk evaluation completed - user authenticated successfully",
    details: "LLM response time: 120ms, Risk score: 0.12",
  },
  {
    timestamp: "2024-01-15 14:23:44.567",
    service: "nft-service",
    level: "warn",
    message: "High gas price detected - transaction delayed",
    details: "Current gas price: 45 gwei, Threshold: 40 gwei",
  },
  {
    timestamp: "2024-01-15 14:23:43.234",
    service: "database",
    level: "error",
    message: "Slow query detected - execution time exceeded threshold",
    details: "Query: SELECT * FROM user_sessions WHERE..., Time: 2.3s",
  },
  {
    timestamp: "2024-01-15 14:23:42.891",
    service: "auth",
    level: "info",
    message: "New authentication session initiated",
    details: "User ID: user_847291, IP: 192.168.1.100",
  },
  {
    timestamp: "2024-01-15 14:23:41.567",
    service: "autoencoder",
    level: "info",
    message: "Model inference completed successfully",
    details: "Input features: 127, Output confidence: 0.942",
  },
  {
    timestamp: "2024-01-15 14:23:40.234",
    service: "risk-engine",
    level: "warn",
    message: "Unusual behavioral pattern detected - flagged for review",
    details: "Deviation score: 2.3, Threshold: 2.0",
  },
  {
    timestamp: "2024-01-15 14:23:39.891",
    service: "nft-service",
    level: "info",
    message: "Authentication NFT minted successfully",
    details: "Transaction hash: 0x7f8a9b2c..., Gas used: 21000",
  },
]

const getLevelIcon = (level: string) => {
  switch (level) {
    case "info":
      return <Info className="h-4 w-4 text-blue-500" />
    case "warn":
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    case "error":
      return <AlertCircle className="h-4 w-4 text-red-500" />
    case "fatal":
      return <XCircle className="h-4 w-4 text-red-600" />
    default:
      return <Info className="h-4 w-4 text-gray-500" />
  }
}

const getLevelColor = (level: string) => {
  switch (level) {
    case "info":
      return "bg-blue-600"
    case "warn":
      return "bg-yellow-600"
    case "error":
      return "bg-red-600"
    case "fatal":
      return "bg-red-700"
    default:
      return "bg-gray-600"
  }
}

export function LogsEvents() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [selectedService, setSelectedService] = useState("all")

  const filteredLogs = mockLogs.filter((log) => {
    const matchesSearch =
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.service.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = selectedLevel === "all" || log.level === selectedLevel
    const matchesService = selectedService === "all" || log.service === selectedService

    return matchesSearch && matchesLevel && matchesService
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-100 mb-2">Logs & Events</h2>
        <p className="text-gray-400">Real-time system logs with filtering and search capabilities</p>
      </div>

      {/* Filters */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-100">Log Filters</CardTitle>
          <CardDescription className="text-gray-400">Filter logs by service, level, or search terms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-gray-100"
                />
              </div>
            </div>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-700 text-gray-100">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {logLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value} className="text-gray-100">
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-700 text-gray-100">
                <SelectValue placeholder="Select service" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {services.map((service) => (
                  <SelectItem key={service.value} value={service.value} className="text-gray-100">
                    {service.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Log Stream */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-100">Live Log Stream</CardTitle>
          <CardDescription className="text-gray-400">
            Showing {filteredLogs.length} of {mockLogs.length} log entries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {filteredLogs.map((log, index) => (
              <div
                key={index}
                className="p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-200 hover:shadow-lg"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {getLevelIcon(log.level)}
                    <Badge className={`${getLevelColor(log.level)} text-white font-medium flex-shrink-0`}>
                      {log.level.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className="border-gray-600 text-gray-300 bg-gray-700/50 flex-shrink-0">
                      {log.service}
                    </Badge>
                  </div>
                  <span className="text-xs text-gray-500 font-mono flex-shrink-0 bg-gray-700/50 px-2 py-1 rounded">
                    {log.timestamp}
                  </span>
                </div>
                <p className="text-sm text-gray-200 mb-3 leading-relaxed">{log.message}</p>
                {log.details && (
                  <div className="mt-3 pt-3 border-t border-gray-700">
                    <p className="text-xs text-gray-400 font-mono bg-gray-900/50 p-3 rounded border border-gray-700 leading-relaxed">
                      {log.details}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Log Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Events</CardTitle>
            <Info className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-100">15,247</div>
            <p className="text-xs text-gray-400">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Warnings</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">23</div>
            <p className="text-xs text-gray-400">Requires attention</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Errors</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">7</div>
            <p className="text-xs text-gray-400">Critical issues</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Success Rate</CardTitle>
            <Info className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">99.8%</div>
            <p className="text-xs text-gray-400">Event processing</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
