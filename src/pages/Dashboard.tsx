import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import StatisticsCards from "@/components/dashboard/StatisticsCards";
import RecentPredictions from "@/components/dashboard/RecentPredictions";
import PatternPerformanceChart from "@/components/dashboard/PatternPerformanceChart";
import { Skeleton } from "@/components/ui/skeleton";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

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

interface PatternData {
  name: string;
  accuracy: number;
  total: number;
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [patternData, setPatternData] = useState<PatternData[]>([]);
  const [stats, setStats] = useState({
    totalPredictions: 0,
    accuracy: 0,
    topPattern: "",
    winningStreak: 0,
  });

  useDocumentTitle("Dashboard");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const { data: predictionsData, error: predictionsError } = await supabase
        .from("predictions")
        .select(`
          id,
          predicted_outcome,
          confidence_score,
          actual_outcome,
          was_correct,
          match:matches(
            match_date,
            home_team:teams!matches_home_team_id_fkey(name),
            away_team:teams!matches_away_team_id_fkey(name),
            league:leagues(name)
          )
        `)
        .order("created_at", { ascending: false })
        .limit(10);

      if (predictionsError) throw predictionsError;

      const formattedPredictions: Prediction[] = (predictionsData ?? []).map((p: Record<string, unknown>) => {
        const matchData = Array.isArray(p.match) ? p.match[0] : p.match;
        const matchObj = matchData as Record<string, unknown> | null;
        const homeTeamData = matchObj?.home_team as Record<string, unknown> | Record<string, unknown>[] | null;
        const awayTeamData = matchObj?.away_team as Record<string, unknown> | Record<string, unknown>[] | null;
        const leagueData = matchObj?.league as Record<string, unknown> | Record<string, unknown>[] | null;
        
        const getNameFromData = (data: Record<string, unknown> | Record<string, unknown>[] | null): string => {
          if (!data) return 'Unknown';
          if (Array.isArray(data)) return (data[0]?.name as string) ?? 'Unknown';
          return (data.name as string) ?? 'Unknown';
        };
        
        return {
          id: p.id as string,
          predicted_outcome: p.predicted_outcome as string,
          confidence_score: p.confidence_score as number,
          actual_outcome: p.actual_outcome as string | null,
          was_correct: p.was_correct as boolean | null,
          match: {
            home_team: getNameFromData(homeTeamData),
            away_team: getNameFromData(awayTeamData),
            match_date: (matchObj?.match_date as string) ?? '',
            league: getNameFromData(leagueData),
          },
        };
      });

      setPredictions(formattedPredictions);

      const { data: allPredictions, error: allPredictionsError } = await supabase
        .from("predictions")
        .select("was_correct");

      if (allPredictionsError) throw allPredictionsError;

      const evaluatedPredictions = allPredictions?.filter((p) => p.was_correct !== null) || [];
      const correctPredictions = evaluatedPredictions.filter((p) => p.was_correct).length;
      const totalEvaluated = evaluatedPredictions.length;
      const accuracy = totalEvaluated > 0 ? Math.round((correctPredictions / totalEvaluated) * 100) : 0;

      let currentStreak = 0;
      let maxStreak = 0;
      const sortedPredictions = [...evaluatedPredictions].reverse();
      
      for (const pred of sortedPredictions) {
        if (pred.was_correct) {
          currentStreak++;
          maxStreak = Math.max(maxStreak, currentStreak);
        } else {
          currentStreak = 0;
        }
      }

      const { data: patternAccuracy, error: patternError } = await supabase
        .from("pattern_accuracy")
        .select(`
          total_predictions,
          correct_predictions,
          accuracy_rate,
          template:pattern_templates(name)
        `)
        .order("accuracy_rate", { ascending: false });

      if (patternError) throw patternError;

      const formattedPatternData: PatternData[] = (patternAccuracy ?? []).map((p) => {
        const templateData = Array.isArray(p.template) ? p.template[0] : p.template;
        return {
          name: templateData?.name ?? 'Unknown Pattern',
          accuracy: p.accuracy_rate ?? 0,
          total: p.total_predictions ?? 0,
        };
      });

      setPatternData(formattedPatternData);
      const topPattern = formattedPatternData[0]?.name || "N/A";

      setStats({
        totalPredictions: allPredictions?.length || 0,
        accuracy,
        topPattern,
        winningStreak: maxStreak,
      });

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Sidebar />
        <TopBar />
        <main className="ml-0 md:ml-[84px] lg:ml-64 pt-20 lg:pt-0">
          <div className="container mx-auto px-4 py-12">
            <div className="mb-12">
              <Skeleton className="h-10 w-48 mb-2" />
              <Skeleton className="h-5 w-80" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-40" />
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Skeleton className="lg:col-span-2 h-96" />
              <Skeleton className="h-96" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <TopBar />
      <main className="ml-0 md:ml-[84px] lg:ml-64 pt-20 lg:pt-0">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-3">
              Dashboard
            </h1>
            <p className="text-lg text-muted-foreground">
              Track your predictions accuracy and performance metrics in real-time
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="mb-12">
            <StatisticsCards
              totalPredictions={stats.totalPredictions}
              accuracy={stats.accuracy}
              topPattern={stats.topPattern}
              winningStreak={stats.winningStreak}
            />
          </div>

          {/* Charts and Recent Predictions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RecentPredictions predictions={predictions} />
            </div>
            <div>
              <PatternPerformanceChart data={patternData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
