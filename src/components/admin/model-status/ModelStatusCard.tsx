import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, CheckCircle, XCircle, Clock } from "lucide-react";

interface ModelStatusCardProps {
  modelName?: string;
  status?: "active" | "inactive" | "training" | "error";
  accuracy?: number;
  lastUpdated?: string;
}

export const ModelStatusCard = ({ 
  modelName = "Unknown Model", 
  status = "inactive", 
  accuracy,
  lastUpdated 
}: ModelStatusCardProps) => {
  const getStatusIcon = () => {
    switch (status) {
      case "active": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "training": return <Clock className="h-4 w-4 text-yellow-500 animate-pulse" />;
      case "error": return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusVariant = () => {
    switch (status) {
      case "active": return "default";
      case "training": return "secondary";
      case "error": return "destructive";
      default: return "outline";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          {getStatusIcon()}
          {modelName}
        </CardTitle>
        <Badge variant={getStatusVariant()}>{status}</Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {accuracy !== undefined && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Accuracy</span>
              <span className="font-medium">{accuracy.toFixed(1)}%</span>
            </div>
          )}
          {lastUpdated && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Last Updated</span>
              <span className="font-medium">{new Date(lastUpdated).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelStatusCard;
