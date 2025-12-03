import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, TrendingDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface DecayData {
  current_accuracy: number;
  baseline_accuracy: number;
  decay_rate: number;
  days_since_training: number;
  needs_retraining: boolean;
}

export function PredictionDecayCard() {
  const { data, isLoading } = useQuery<DecayData>({
    queryKey: ["prediction-decay"],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("model-decay-monitor");
      if (error) throw error;
      return data as DecayData;
    },
    refetchInterval: 60000,
  });

  if (isLoading) {
    return (
      <Card className="border-border/60 bg-card/60 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="w-5 h-5" />
            Prediction Decay Monitor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/2" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="border-border/60 bg-card/60 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="w-5 h-5" />
            Prediction Decay Monitor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No decay data available</p>
        </CardContent>
      </Card>
    );
  }

  const accuracyDrop = data.baseline_accuracy - data.current_accuracy;

  return (
    <Card className={`border-border/60 backdrop-blur ${data.needs_retraining ? 'bg-red-500/10' : 'bg-card/60'}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {data.needs_retraining ? (
              <AlertTriangle className="w-5 h-5 text-red-500" />
            ) : (
              <CheckCircle className="w-5 h-5 text-green-500" />
            )}
            Prediction Decay Monitor
          </CardTitle>
          <Badge variant={data.needs_retraining ? "destructive" : "default"}>
            {data.needs_retraining ? "Retraining Recommended" : "Healthy"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <span className="text-sm text-muted-foreground">Current Accuracy</span>
            <div className="text-2xl font-bold">{data.current_accuracy.toFixed(1)}%</div>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Baseline Accuracy</span>
            <div className="text-2xl font-bold">{data.baseline_accuracy.toFixed(1)}%</div>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Decay Rate</span>
            <div className="text-2xl font-bold text-red-500">-{data.decay_rate.toFixed(2)}%/day</div>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Days Since Training</span>
            <div className="text-2xl font-bold">{data.days_since_training}</div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">Accuracy Drop</span>
            <span className={accuracyDrop > 5 ? "text-red-500" : "text-muted-foreground"}>
              -{accuracyDrop.toFixed(1)}%
            </span>
          </div>
          <Progress 
            value={Math.min(accuracyDrop * 10, 100)} 
            className={accuracyDrop > 5 ? "bg-red-500/20" : "bg-muted"}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default PredictionDecayCard;
