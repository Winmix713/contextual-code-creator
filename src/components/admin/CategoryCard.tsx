import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { AdminCategoryCard } from "@/types/admin";

interface CategoryCardProps {
  card: AdminCategoryCard;
}

export const CategoryCard = ({ card }: CategoryCardProps) => {
  const Icon = card.icon;

  return (
    <Link to={card.href}>
      <Card className="h-full transition-all hover:shadow-md hover:border-primary/50 cursor-pointer bg-card/60 border-border/80 backdrop-blur">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
          <Icon className={`h-5 w-5 ${card.accentColorClass}`} />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">
              {card.value !== null ? card.value : "–"}
            </div>
            {card.pill && <Badge variant="secondary">{card.pill}</Badge>}
          </div>
          <p className="text-xs text-muted-foreground mt-2">{card.description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
