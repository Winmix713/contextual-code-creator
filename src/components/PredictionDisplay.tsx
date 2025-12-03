import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Target, AlertCircle } from "lucide-react"

interface PredictionDisplayProps {
  prediction: {
    predicted_outcome: string
    confidence_score: number
    css_score?: number | null
    model_version?: string
  }
  match?: {
    home_team: string
    away_team: string
  }
  patterns?: Array<{ template_name: string; confidence_boost: number }>
  formScores?: { home: number; away: number } | null
}

const PredictionDisplay = ({ prediction, match, patterns, formScores }: PredictionDisplayProps) => {
  const formatOutcome = (outcome: string) => {
    switch (outcome) {
      case "home_win":
        return match ? `${match.home_team} győzelem` : "Hazai győzelem"
      case "away_win":
        return match ? `${match.away_team} győzelem` : "Vendég győzelem"
      case "draw":
        return "Döntetlen"
      default:
        return outcome
    }
  }

  const getConfidenceColor = (score: number) => {
    if (score >= 70) return "text-green-500"
    if (score >= 50) return "text-yellow-500"
    return "text-red-500"
  }

  const getConfidenceLabel = (score: number) => {
    if (score >= 70) return "Magas"
    if (score >= 50) return "Közepes"
    return "Alacsony"
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Predikció
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main prediction */}
        <div className="text-center py-4">
          <Badge variant="default" className="text-lg px-4 py-2">
            {formatOutcome(prediction.predicted_outcome)}
          </Badge>
        </div>

        {/* Confidence */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              Megbízhatóság
            </span>
            <span className={`font-medium ${getConfidenceColor(prediction.confidence_score)}`}>
              {getConfidenceLabel(prediction.confidence_score)}
            </span>
          </div>
          <Progress value={prediction.confidence_score} className="h-2" />
          <p className="text-right text-sm text-muted-foreground">{prediction.confidence_score.toFixed(1)}%</p>
        </div>

        {/* CSS Score if available */}
        {prediction.css_score !== null && prediction.css_score !== undefined && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">CSS Score</span>
              <span className="font-medium">{prediction.css_score.toFixed(1)}%</span>
            </div>
            <Progress value={prediction.css_score} className="h-2" />
          </div>
        )}

        {formScores && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Hazai forma</span>
              <span className="font-medium">{formScores.home}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Vendég forma</span>
              <span className="font-medium">{formScores.away}%</span>
            </div>
          </div>
        )}

        {patterns && patterns.length > 0 && (
          <div className="space-y-2">
            <span className="text-sm text-muted-foreground">Alkalmazott minták</span>
            <div className="flex flex-wrap gap-2">
              {patterns.map((pattern, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {pattern.template_name} (+{pattern.confidence_boost.toFixed(1)}%)
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Model version */}
        {prediction.model_version && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Model verzió</span>
            <Badge variant="outline">{prediction.model_version}</Badge>
          </div>
        )}

        {/* Disclaimer */}
        <div className="flex items-start gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
          <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            A predikciók tájékoztató jellegűek. A fogadás saját felelősségre történik.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default PredictionDisplay
