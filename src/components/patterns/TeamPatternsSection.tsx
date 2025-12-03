import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Layers } from "lucide-react"

interface TeamPatternsSectionProps {
  teamName: string
}

const TeamPatternsSection = ({ teamName }: TeamPatternsSectionProps) => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-primary" />
          {teamName} Mintázatok
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">A csapat játékstílusának és teljesítményének elemzése...</p>
      </CardContent>
    </Card>
  )
}

export default TeamPatternsSection
