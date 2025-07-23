"use client"

import { AlertTriangle, BarChart3, Heart, Shield, Users, FileText, Server } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const navigationItems = [
  {
    id: "overview",
    title: "System Overview",
    icon: BarChart3,
    description: "Key metrics and performance",
  },
  {
    id: "health",
    title: "Service Health",
    icon: Heart,
    description: "Service status monitoring",
  },
  {
    id: "activity",
    title: "User Activity",
    icon: Users,
    description: "User behavior analytics",
  },
  {
    id: "logs",
    title: "Logs & Events",
    icon: FileText,
    description: "System logs and events",
  },
  {
    id: "alerts",
    title: "Alerts & Notifications",
    icon: AlertTriangle,
    description: "Active alerts and thresholds",
  },
  {
    id: "security",
    title: "Security & Access",
    icon: Shield,
    description: "Security monitoring",
  },
]

interface AppSidebarProps {
  activePanel: string
  setActivePanel: (panel: string) => void
}

export function AppSidebar({ activePanel, setActivePanel }: AppSidebarProps) {
  return (
    <Sidebar className="border-r border-gray-800" collapsible="offcanvas" side="left">
      <SidebarHeader className="border-b border-gray-800 p-4">
        <div className="flex items-center gap-2">
          <Server className="h-6 w-6 text-blue-500 flex-shrink-0" />
          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-gray-100 truncate">HashGait</h2>
            <p className="text-sm text-gray-400 truncate">Backend Monitoring</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-300 px-2 font-medium">Monitoring Panels</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActivePanel(item.id)}
                    isActive={activePanel === item.id}
                    className="text-gray-300 hover:text-gray-100 hover:bg-gray-800 data-[active=true]:bg-blue-600 data-[active=true]:text-white transition-all duration-200"
                    tooltip={item.description}
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-medium truncate">{item.title}</span>
                      <span className="text-xs text-gray-400 truncate group-data-[collapsible=icon]:hidden">
                        {item.description}
                      </span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
