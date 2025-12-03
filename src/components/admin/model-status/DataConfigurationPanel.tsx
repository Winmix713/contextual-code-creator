import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";

interface DataConfigurationPanelProps {
  config?: Record<string, unknown>;
}

export const DataConfigurationPanel = ({ config }: DataConfigurationPanelProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Data Configuration
        </CardTitle>
      </CardHeader>
      <CardContent>
        {config && Object.keys(config).length > 0 ? (
          <pre className="text-sm bg-muted/50 p-4 rounded-lg overflow-auto">
            {JSON.stringify(config, null, 2)}
          </pre>
        ) : (
          <p className="text-muted-foreground">No configuration data available.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default DataConfigurationPanel;
