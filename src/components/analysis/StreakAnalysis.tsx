import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

interface StreakAnalysisProps {
  teamName: string
}

export const StreakAnalysis = ({ teamName }: StreakAnalysisProps) => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Sorozat Elemzés - {teamName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Sorozat adatok betöltése...</p>
      </CardContent>
    </Card>
  )
}

export default StreakAnalysis
