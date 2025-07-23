"use client"

import { Line, LineChart, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

interface EnhancedChartProps {
  data: Array<{
    hour: number
    requests: number
    errors: number
  }>
  className?: string
}

const formatTime = (hour: number) => {
  if (hour === 0) return "12 AM"
  if (hour < 12) return `${hour} AM`
  if (hour === 12) return "12 PM"
  return `${hour - 12} PM`
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-lg">
        <p className="text-gray-200 font-medium mb-2">{`Time: ${formatTime(label)}`}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-gray-300 text-sm">
              {entry.name}: {entry.value.toLocaleString()} requests
            </span>
          </div>
        ))}
        <div className="mt-2 pt-2 border-t border-gray-700">
          <p className="text-xs text-gray-400">
            Error Rate: {payload[1] ? ((payload[1].value / payload[0].value) * 100).toFixed(1) : 0}%
          </p>
        </div>
      </div>
    )
  }
  return null
}

export function EnhancedChart({ data, className }: EnhancedChartProps) {
  return (
    <ChartContainer
      config={{
        requests: {
          label: "Successful Requests",
          color: "#3b82f6",
        },
        errors: {
          label: "Error Requests",
          color: "#ef4444",
        },
      }}
      className={className}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <XAxis
            dataKey="hour"
            stroke="#9ca3af"
            fontSize={12}
            tickFormatter={formatTime}
            interval={2}
            tick={{ fill: "#d1d5db" }}
          />
          <YAxis
            stroke="#9ca3af"
            fontSize={12}
            tick={{ fill: "#d1d5db" }}
            tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: "20px" }}
            iconType="circle"
            formatter={(value) => <span style={{ color: "#d1d5db" }}>{value}</span>}
          />
          <Line
            type="monotone"
            dataKey="requests"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2, fill: "#1e40af" }}
            name="Successful Requests"
          />
          <Line
            type="monotone"
            dataKey="errors"
            stroke="#ef4444"
            strokeWidth={3}
            dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: "#ef4444", strokeWidth: 2, fill: "#dc2626" }}
            name="Error Requests"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
