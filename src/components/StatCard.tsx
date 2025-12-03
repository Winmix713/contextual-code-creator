import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ReactNode } from "react"

interface StatItem {
  label: string
  value: string | number
  type?: "percentage" | "number" | "text"
}

interface StatCardProps {
  title: string
  icon?: ReactNode
  stats: StatItem[]
}

const StatCard = ({ title, icon, stats }: StatCardProps) => {
  const formatValue = (item: StatItem) => {
    if (item.type === "percentage") return `${item.value}%`
    if (item.type === "number") return Number(item.value).toFixed(2)
    return item.value
  }

  return (
    <Card className="glass-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <span className="text-sm font-medium">{formatValue(stat)}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default StatCard
