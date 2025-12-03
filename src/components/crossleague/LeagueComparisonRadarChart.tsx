import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from "recharts"

export interface LeagueRadarMetric {
  metric: string | number
  leagueId?: string
  leagueName?: string
  metrics?: Record<string, number>
  [league: string]: string | number | Record<string, number> | undefined
}

interface LeagueComparisonRadarChartProps {
  data: LeagueRadarMetric[]
  leagues: string[] | LeagueRadarMetric[]
}

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#00C49F"]

const LeagueComparisonRadarChart = ({ data, leagues }: LeagueComparisonRadarChartProps) => {
  // Normalize leagues to string array
  const leagueNames = leagues.map((l) => (typeof l === "string" ? l : l.leagueName || l.leagueId || String(l.metric)))

  // Transform data if needed for radar chart
  const chartData = data.length > 0 && data[0].metrics ? transformMetricsData(data as LeagueRadarMetric[]) : data

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Liga összehasonlítás</CardTitle>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <div className="flex items-center justify-center h-80 text-muted-foreground">
            Nincs elegendő adat a megjelenítéshez
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart data={chartData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
              />
              {leagueNames.map((league, index) => (
                <Radar
                  key={league}
                  name={league}
                  dataKey={league}
                  stroke={COLORS[index % COLORS.length]}
                  fill={COLORS[index % COLORS.length]}
                  fillOpacity={0.2}
                />
              ))}
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}

// Transform data from per-league metrics format to per-metric format for radar chart
function transformMetricsData(leagues: LeagueRadarMetric[]): LeagueRadarMetric[] {
  if (leagues.length === 0) return []

  const metricKeys = leagues[0].metrics ? Object.keys(leagues[0].metrics) : []

  return metricKeys.map((metricKey) => {
    const point: LeagueRadarMetric = { metric: metricKey }
    leagues.forEach((league) => {
      const leagueName = league.leagueName || league.leagueId || "Unknown"
      point[leagueName] = league.metrics?.[metricKey] ?? 0
    })
    return point
  })
}

export default LeagueComparisonRadarChart
