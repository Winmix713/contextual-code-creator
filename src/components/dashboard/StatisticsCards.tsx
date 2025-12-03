import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Target, Award, Flame } from "lucide-react";

interface StatisticsCardsProps {
  totalPredictions: number;
  accuracy: number;
  topPattern: string;
  winningStreak: number;
}

const StatisticsCards = ({
  totalPredictions,
  accuracy,
  topPattern,
  winningStreak,
}: StatisticsCardsProps) => {
  const stats = [
    {
      title: "Összes predikció",
      value: totalPredictions.toLocaleString(),
      icon: Target,
      color: "text-blue-500",
    },
    {
      title: "Pontosság",
      value: `${accuracy}%`,
      icon: TrendingUp,
      color: "text-green-500",
    },
    {
      title: "Legjobb pattern",
      value: topPattern,
      icon: Award,
      color: "text-yellow-500",
    },
    {
      title: "Nyerő sorozat",
      value: winningStreak.toString(),
      icon: Flame,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatisticsCards;
