import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle, Activity } from "lucide-react";

export type HealthStatus = 'healthy' | 'warning' | 'error' | 'unknown' | 'degraded' | 'down';

export interface SystemHealthSnapshot {
  id: string;
  component_name: string;
  component_type?: string;
  status: HealthStatus;
  response_time_ms?: number | null;
  error_rate?: number | null;
  cpu_usage?: number | null;
  memory_usage?: number | null;
  error_count?: number;
  error_message?: string;
  last_check?: string;
  checked_at?: string;
  details?: Record<string, unknown>;
}

export interface SystemHealthCardProps {
  health: SystemHealthSnapshot;
}

export default function SystemHealthCard({ health }: SystemHealthCardProps) {
  const getStatusIcon = (status: HealthStatus) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning': 
      case 'degraded': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'error': 
      case 'down': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Activity className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: HealthStatus) => {
    switch (status) {
      case 'healthy': return <Badge className="bg-green-500/20 text-green-400">Healthy</Badge>;
      case 'warning': 
      case 'degraded': return <Badge className="bg-yellow-500/20 text-yellow-400">Warning</Badge>;
      case 'error': 
      case 'down': return <Badge className="bg-red-500/20 text-red-400">Error</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const timestamp = health.last_check || health.checked_at;
  const responseTime = health.response_time_ms;

  return (
    <Card className="border-border/60 bg-card/60 backdrop-blur">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon(health.status)}
            <CardTitle className="text-lg">{health.component_name}</CardTitle>
          </div>
          {getStatusBadge(health.status)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {responseTime !== undefined && responseTime !== null && (
            <div>
              <span className="text-muted-foreground">Response Time</span>
              <div className="font-medium">{responseTime}ms</div>
            </div>
          )}
          {health.error_count !== undefined && (
            <div>
              <span className="text-muted-foreground">Errors</span>
              <div className="font-medium">{health.error_count}</div>
            </div>
          )}
          {health.error_message && (
            <div className="col-span-2">
              <span className="text-muted-foreground">Message</span>
              <div className="font-medium text-sm text-red-400">{health.error_message}</div>
            </div>
          )}
          {timestamp && (
            <div className="col-span-2">
              <span className="text-muted-foreground">Last Check</span>
              <div className="font-medium text-xs">
                {new Date(timestamp).toLocaleString()}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
