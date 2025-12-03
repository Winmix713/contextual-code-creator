import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Grid3X3 } from "lucide-react"

interface TransitionMatrixHeatmapProps {
  teamName: string
}

export const TransitionMatrixHeatmap = ({ teamName }: TransitionMatrixHeatmapProps) => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Grid3X3 className="h-5 w-5 text-primary" />
          Átmeneti Mátrix - {teamName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Mátrix vizualizáció betöltése...</p>
      </CardContent>
    </Card>
  )
}

export default TransitionMatrixHeatmap
