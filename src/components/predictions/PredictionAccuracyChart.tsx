import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export interface AccuracyDataPoint {
  date?: string;
  week?: string;
  accuracy?: number;
  accuracy_percentage?: number;
  predictions?: number;
  total_predictions?: number;
}

interface PredictionAccuracyChartProps {
  data: AccuracyDataPoint[];
  title?: string;
  isLoading?: boolean;
  error?: string;
}

const PredictionAccuracyChart = ({
  data,
  title = "Predikciós pontosság",
  isLoading = false,
  error,
}: PredictionAccuracyChartProps) => {
  // Normalize data to handle different field names
  const normalizedData = data.map(item => ({
    date: item.date || item.week || '',
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
            <LineChart data={normalizedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="date"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="accuracy"
                name="Pontosság"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default PredictionAccuracyChart;
