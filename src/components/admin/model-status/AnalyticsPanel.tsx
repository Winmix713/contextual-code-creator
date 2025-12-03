import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

interface AnalyticsPanelProps {
  data?: Record<string, number>;
}

export const AnalyticsPanel = ({ data }: AnalyticsPanelProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data && Object.keys(data).length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(data).map(([key, value]) => (
              <div key={key} className="p-3 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground capitalize">{key.replace(/_/g, ' ')}</p>
                <p className="text-lg font-semibold">{typeof value === 'number' ? value.toFixed(2) : value}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No analytics data available.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default AnalyticsPanel;
