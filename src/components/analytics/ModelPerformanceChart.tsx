import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export interface PerformancePoint {
  date: string;
  overall: number;
  home_win: number;
  draw: number;
  away_win: number;
}

interface ModelPerformanceChartProps {
  data: PerformancePoint[];
}

const ModelPerformanceChart = ({ data }: ModelPerformanceChartProps) => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Model teljesítmény idősor</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex items-center justify-center h-96 text-muted-foreground">
            Nincs elegendő adat a megjelenítéshez
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis
                dataKey="date"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => [`${value.toFixed(1)}%`]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="overall"
                name="Összesített"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="home_win"
                name="Hazai győzelem"
                stroke="#22c55e"
                strokeWidth={1}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="draw"
                name="Döntetlen"
                stroke="#eab308"
                strokeWidth={1}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="away_win"
                name="Vendég győzelem"
                stroke="#ef4444"
                strokeWidth={1}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default ModelPerformanceChart;
