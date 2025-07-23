"use client"

import { useState } from "react"
import { AlertTriangle, BarChart3, Heart, Shield, Users, FileText, ChevronUp, ChevronDown, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navigationItems = [
  {
    id: "overview",
    title: "System Overview",
    icon: BarChart3,
    description: "Key metrics and performance",
    shortTitle: "Overview",
  },
  {
    id: "health",
    title: "Service Health",
    icon: Heart,
    description: "Service status monitoring",
    shortTitle: "Health",
  },
  {
    id: "activity",
    title: "User Activity",
    icon: Users,
    description: "User behavior analytics",
    shortTitle: "Activity",
  },
  {
    id: "logs",
    title: "Logs & Events",
    icon: FileText,
    description: "System logs and events",
    shortTitle: "Logs",
  },
  {
    id: "alerts",
    title: "Alerts & Notifications",
    icon: AlertTriangle,
    description: "Active alerts and thresholds",
    shortTitle: "Alerts",
  },
  {
    id: "security",
    title: "Security & Access",
    icon: Shield,
    description: "Security monitoring",
    shortTitle: "Security",
  },
]

interface BottomNavigationProps {
  activePanel: string
  setActivePanel: (panel: string) => void
}

export function BottomNavigation({ activePanel, setActivePanel }: BottomNavigationProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const activeItem = navigationItems.find((item) => item.id === activePanel)

  // Mobile Sheet Navigation
  const MobileNavigation = () => (
    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="md:hidden bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700"
        >
          <Menu className="h-4 w-4 mr-2" />
          {activeItem?.shortTitle || "Menu"}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="bg-gray-900 border-gray-800 h-[60vh]">
        <div className="grid grid-cols-2 gap-3 mt-4">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant={activePanel === item.id ? "default" : "outline"}
              className={`h-auto p-4 flex flex-col items-center gap-2 ${
                activePanel === item.id
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700"
              }`}
              onClick={() => {
                setActivePanel(item.id)
                setIsMobileMenuOpen(false)
              }}
            >
              <item.icon className="h-5 w-5" />
              <div className="text-center">
                <div className="text-sm font-medium">{item.title}</div>
                <div className="text-xs opacity-75">{item.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )

  // Desktop Bottom Panel
  const DesktopNavigation = () => (
    <Card className="hidden md:block bg-gray-900/95 border-gray-800 backdrop-blur supports-[backdrop-filter]:bg-gray-900/80">
      {/* Collapse/Expand Toggle */}
      <div className="flex items-center justify-between p-2 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
          <span className="text-sm font-medium text-gray-200">Monitoring Panels</span>
          <Badge variant="outline" className="border-blue-600 text-blue-400 bg-blue-600/10 text-xs">
            {navigationItems.length}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-400 hover:text-gray-200 hover:bg-gray-800"
        >
          {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          <span className="ml-1 text-xs">{isExpanded ? "Collapse" : "Expand"}</span>
        </Button>
      </div>

      {/* Navigation Items */}
      <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? "max-h-32" : "max-h-20"}`}>
        <div className="grid grid-cols-6 gap-1 p-2">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant={activePanel === item.id ? "default" : "ghost"}
              className={`h-auto p-3 flex flex-col items-center gap-1 transition-all duration-200 ${
                activePanel === item.id
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                  : "text-gray-300 hover:text-gray-100 hover:bg-gray-800"
              }`}
              onClick={() => setActivePanel(item.id)}
            >
              <item.icon className="h-4 w-4" />
              <span className="text-xs font-medium">{item.shortTitle}</span>
              {isExpanded && <span className="text-xs opacity-75 text-center">{item.description}</span>}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  )

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <MobileNavigation />
          <div className="hidden md:block flex-1">
            <DesktopNavigation />
          </div>
        </div>
      </div>
    </div>
  )
}
