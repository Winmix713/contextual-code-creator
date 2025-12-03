import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock } from "lucide-react";

interface Prediction {
  id: string;
  match: {
    home_team: string;
    away_team: string;
    match_date: string;
    league: string;
  };
  predicted_outcome: string;
  confidence_score: number;
  actual_outcome: string | null;
  was_correct: boolean | null;
}

interface RecentPredictionsProps {
  predictions: Prediction[];
}

const RecentPredictions = ({ predictions }: RecentPredictionsProps) => {
  const formatOutcome = (outcome: string) => {
    switch (outcome) {
      case "home_win":
        return "Hazai";
      case "away_win":
        return "Vendég";
      case "draw":
        return "Döntetlen";
      default:
        return outcome;
    }
  };

  const getStatusIcon = (wasCorrect: boolean | null) => {
    if (wasCorrect === null) return <Clock className="h-4 w-4 text-yellow-500" />;
    return wasCorrect ? (
      <CheckCircle className="h-4 w-4 text-green-500" />
    ) : (
      <XCircle className="h-4 w-4 text-red-500" />
    );
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Legutóbbi predikciók</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {predictions.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              Még nincsenek predikciók
            </p>
          ) : (
            predictions.map((prediction) => (
              <div
                key={prediction.id}
                className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border"
              >
                <div className="flex-1">
                  <div className="font-medium text-sm">
                    {prediction.match.home_team} vs {prediction.match.away_team}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {prediction.match.league} •{" "}
                    {new Date(prediction.match.match_date).toLocaleDateString("hu-HU")}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">
                    {formatOutcome(prediction.predicted_outcome)}
                  </Badge>
                  <span className="text-sm font-medium">
                    {Math.round(prediction.confidence_score)}%
                  </span>
                  {getStatusIcon(prediction.was_correct)}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentPredictions;
