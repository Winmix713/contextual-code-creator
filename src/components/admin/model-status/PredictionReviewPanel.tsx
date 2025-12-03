import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, RefreshCcw } from "lucide-react";
import { useState, useEffect } from "react";

interface PredictionReviewItem {
  id: string;
  matchId: string;
  homeTeam: string;
  awayTeam: string;
  predictedOutcome: string;
  confidence: number;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

interface PredictionReviewPanelProps {
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export const PredictionReviewPanel = ({
  autoRefresh = false,
  refreshInterval = 30000,
}: PredictionReviewPanelProps) => {
  const [predictions, setPredictions] = useState<PredictionReviewItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data for now
    const mockPredictions: PredictionReviewItem[] = [
      {
        id: "1",
        matchId: "m1",
        homeTeam: "Team A",
        awayTeam: "Team B",
        predictedOutcome: "Home Win",
        confidence: 85,
        status: "pending",
        createdAt: new Date().toISOString(),
      },
    ];
    
    setPredictions(mockPredictions);
    setIsLoading(false);
    
    if (autoRefresh) {
      const interval = setInterval(() => {
        // Refresh logic would go here
      }, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval]);

  const handleApprove = (id: string) => {
    setPredictions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "approved" as const } : p))
    );
  };

  const handleReject = (id: string) => {
    setPredictions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "rejected" as const } : p))
    );
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-32">
          <RefreshCcw className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Predictions for Review
          <Badge variant="secondary">{predictions.filter(p => p.status === "pending").length} pending</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {predictions.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No predictions awaiting review.
          </p>
        ) : (
          <div className="space-y-4">
            {predictions.map((prediction) => (
              <div
                key={prediction.id}
                className="flex items-center justify-between p-4 rounded-lg border"
              >
                <div>
                  <p className="font-medium">
                    {prediction.homeTeam} vs {prediction.awayTeam}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Prediction: {prediction.predictedOutcome} ({prediction.confidence}% confidence)
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      prediction.status === "approved"
                        ? "default"
                        : prediction.status === "rejected"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {prediction.status}
                  </Badge>
                  {prediction.status === "pending" && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleApprove(prediction.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleReject(prediction.id)}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PredictionReviewPanel;