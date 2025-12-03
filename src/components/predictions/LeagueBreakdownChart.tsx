import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export interface LeagueBreakdownData {
  league: string;
  accuracy?: number;
  accuracy_percentage?: number;
  predictions?: number;
  total_predictions?: number;
}

interface LeagueBreakdownChartProps {
  data: LeagueBreakdownData[];
  title?: string;
  isLoading?: boolean;
  error?: string;
}

const COLORS = ["#10b981", "#f59e0b", "#6366f1", "#ef4444", "#14b8a6", "#8b5cf6"];

const LeagueBreakdownChart = ({
  data,
  title = "Liga szerinti pontosság",
  isLoading = false,
  error,
}: LeagueBreakdownChartProps) => {
  // Normalize data to handle different field names
  const normalizedData = data.map(item => ({
    league: item.league,
    accuracy: item.accuracy ?? item.accuracy_percentage ?? 0,
    predictions: item.predictions ?? item.total_predictions ?? 0,
  }));

  if (isLoading) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-red-400">
            {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {normalizedData.length === 0 ? (
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            Nincs elegendő adat a megjelenítéshez
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={normalizedData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                type="number"
                domain={[0, 100]}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                tickFormatter={(value) => `${value}%`}
              />
              <YAxis
                type="category"
                dataKey="league"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                width={100}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => [`${value}%`, "Pontosság"]}
              />
              <Bar dataKey="accuracy" name="Pontosság" radius={[0, 4, 4, 0]}>
                {normalizedData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default LeagueBreakdownChart;
