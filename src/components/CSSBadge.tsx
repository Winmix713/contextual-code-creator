import { Badge } from "@/components/ui/badge"

interface CSSBadgeProps {
  score: number
  className?: string
}

export const CSSBadge = ({ score, className }: CSSBadgeProps) => {
  const getVariant = () => {
    if (score >= 80) return "default"
    if (score >= 60) return "secondary"
    return "destructive"
  }

  return (
    <Badge variant={getVariant()} className={className}>
      CSS: {score}%
    </Badge>
  )
}

export default CSSBadge
