import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

export interface CalibrationDataPoint {
  predicted?: number;
  actual?: number;
  count?: number;
  confidence_range?: string;
  calibration_score?: number;
  sample_size?: number;
}

interface ConfidenceCalibrationChartProps {
  data: CalibrationDataPoint[];
  title?: string;
  isLoading?: boolean;
  error?: string;
}

const ConfidenceCalibrationChart = ({
  data,
  title = "Konfidencia kalibráció",
  isLoading = false,
  error,
}: ConfidenceCalibrationChartProps) => {
  // Normalize data to handle different field names
  const normalizedData = data.map((item, index) => {
    // Parse confidence_range like "70-80" to get midpoint
    let predicted = item.predicted;
    if (!predicted && item.confidence_range) {
      const parts = item.confidence_range.split('-').map(Number);
      predicted = parts.length === 2 ? (parts[0] + parts[1]) / 2 : parts[0];
    }
    
    return {
      predicted: predicted ?? (index * 10 + 5),
      actual: item.actual ?? item.calibration_score ?? 0,
      count: item.count ?? item.sample_size ?? 1,
    };
  });

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
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                type="number"
                dataKey="predicted"
                name="Előrejelzett"
                domain={[0, 100]}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                tickFormatter={(value) => `${value}%`}
                label={{
                  value: "Előrejelzett konfidencia",
                  position: "bottom",
                  fill: "hsl(var(--muted-foreground))",
                }}
              />
              <YAxis
                type="number"
                dataKey="actual"
                name="Tényleges"
                domain={[0, 100]}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                tickFormatter={(value) => `${value}%`}
                label={{
                  value: "Tényleges pontosság",
                  angle: -90,
                  position: "insideLeft",
                  fill: "hsl(var(--muted-foreground))",
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value: number, name: string) => [
                  `${value}%`,
                  name === "predicted" ? "Előrejelzett" : "Tényleges",
                ]}
              />
              <ReferenceLine
                segment={[
                  { x: 0, y: 0 },
                  { x: 100, y: 100 },
                ]}
                stroke="hsl(var(--muted-foreground))"
                strokeDasharray="5 5"
              />
              <Scatter
                name="Kalibráció"
                data={normalizedData}
                fill="hsl(var(--primary))"
              />
            </ScatterChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default ConfidenceCalibrationChart;
