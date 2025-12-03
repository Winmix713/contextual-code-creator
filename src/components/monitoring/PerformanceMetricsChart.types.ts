export interface MetricsPoint {
  time: string;
  p50?: number;
  p95?: number;
  p99?: number;
  value?: number;
  label?: string;
}

export interface PerformanceMetricsChartProps {
  data: MetricsPoint[];
  isLoading?: boolean;
  error?: Error | null;
}
