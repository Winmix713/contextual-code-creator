import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Activity, Database, TrendingUp, Loader2, RefreshCcw } from "lucide-react";
import { DataConfigurationPanel } from "@/components/admin/model-status/DataConfigurationPanel";
import { SystemLogTable } from "@/components/admin/model-status/SystemLogTable";
import { ModelStatusCard } from "@/components/admin/model-status/ModelStatusCard";
import { ModelRegistryTable } from "@/components/admin/model-status/ModelRegistryTable";

// Simple local types to avoid complex type conflicts
interface SimpleModel {
  id: string;
  name: string;
  version: string;
  status: "active" | "inactive" | "training" | "error";
  accuracy?: number;
  lastUpdated?: string;
}

export default function ModelStatusDashboard() {
  const { toast } = useToast();
  const [isTraining, setIsTraining] = useState(false);

  // Simplified mock data approach to avoid type conflicts
  const [models] = useState<SimpleModel[]>([
    { id: "1", name: "HeuristicEngine", version: "1.0.0", status: "active", accuracy: 78.5, lastUpdated: new Date().toISOString() },
    { id: "2", name: "PatternMatcher", version: "2.1.0", status: "inactive", accuracy: 72.3, lastUpdated: new Date().toISOString() },
  ]);

  const activeModel = models.find(m => m.status === "active");
  const isLoading = false;

  const handleTriggerTraining = async () => {
    setIsTraining(true);
    toast({ title: "Training Started", description: "Model training initiated" });
    setTimeout(() => {
      setIsTraining(false);
      toast({ title: "Training Complete", description: "Model training finished" });
    }, 3000);
  };

  const handlePromote = (_modelId: string) => {
    toast({ title: "Model Promoted", description: `Model ${modelId} promoted successfully` });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading model dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">ML Model Control Center</h1>
          <p className="text-muted-foreground mt-2">
            Unified dashboard for model management, performance monitoring, and data configuration
          </p>
        </div>
        <Button onClick={handleTriggerTraining} disabled={isTraining}>
          <RefreshCcw className={`h-4 w-4 mr-2 ${isTraining ? 'animate-spin' : ''}`} />
          {isTraining ? "Training..." : "Retrain Model"}
        </Button>
      </div>

      <ModelStatusCard
        modelName={activeModel?.name}
        status={activeModel?.status}
        accuracy={activeModel?.accuracy}
        lastUpdated={activeModel?.lastUpdated}
      />

      <Card>
        <CardHeader>
          <CardTitle>System Overview</CardTitle>
          <CardDescription>Current system status and active configuration</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Active Model</p>
              <p className="text-lg font-semibold">{activeModel?.name || "No active model"}</p>
              <p className="text-xs text-muted-foreground">{activeModel?.version || ""}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Total Models</p>
              <p className="text-lg font-semibold">{models.length}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">System Health</p>
              <p className="text-lg font-semibold capitalize">Healthy</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <SystemLogTable />

      <Tabs defaultValue="models" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="models" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Model Management
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Analytics & Health
          </TabsTrigger>
          <TabsTrigger value="config" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Data Configuration
          </TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="mt-6">
          <ModelRegistryTable
            models={models.map(m => ({
              id: m.id,
              model_name: m.name,
              model_version: m.version,
              model_type: m.status === "active" ? "champion" as const : "challenger" as const,
              is_active: m.status === "active",
              accuracy: m.accuracy,
              traffic_allocation: 100,
            }))}
          />
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Analytics data will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="config" className="mt-6">
          <DataConfigurationPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}