import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import RecentPredictions from "@/components/dashboard/RecentPredictions";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, RefreshCcw, Sparkles, ArrowRight } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

interface PredictionListItem {
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

interface SupabasePredictionRow {
  id: string;
  predicted_outcome: string;
  confidence_score: number;
  actual_outcome: string | null;
  was_correct: boolean | null;
  match: {
    match_date?: string;
    home_team?: { name: string } | null;
    away_team?: { name: string } | null;
    league?: { name: string } | null;
  } | null;
}

const PredictionsView = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [predictions, setPredictions] = useState<PredictionListItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useDocumentTitle("Predictions");

  useEffect(() => {
    loadPredictions();
  }, []);

  const loadPredictions = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: predictionsError } = await supabase
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
        .limit(25);

      if (predictionsError) {
        throw predictionsError;
      }

      const rows = (data ?? []) as SupabasePredictionRow[];

      const formatted: PredictionListItem[] = rows.map((item) => ({
        id: item.id,
        predicted_outcome: item.predicted_outcome,
        confidence_score: item.confidence_score,
        actual_outcome: item.actual_outcome,
        was_correct: item.was_correct,
        match: {
          home_team: item.match?.home_team?.name ?? "Unknown Home",
          away_team: item.match?.away_team?.name ?? "Unknown Away",
          match_date: item.match?.match_date ?? new Date().toISOString(),
          league: item.match?.league?.name ?? "Unknown League",
        },
      }));

      setPredictions(formatted);
    } catch (err) {
      console.error("Error loading predictions:", err);
      setError("Failed to load predictions. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <TopBar />
      <main className="relative">
        <div className="ml-0 md:ml-[84px] lg:ml-64 pt-20 lg:pt-0">
          <div className="container mx-auto px-4 py-12">
            {/* Header Section */}
            <div className="mb-12">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                    Predictions
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
                    Track AI-generated predictions, monitor accuracy, and create new analyses instantly. 
                    View detailed confidence scores and outcome analysis for every match.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 lg:flex-col lg:gap-3">
                  <Button 
                    variant="outline" 
                    onClick={loadPredictions} 
                    disabled={loading}
                    className="gap-2 h-11"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <RefreshCcw className="w-4 h-4" />
                    )}
                    Refresh List
                  </Button>
                  <Button 
                    onClick={() => navigate("/predictions/new")}
                    className="gap-2 h-11"
                  >
                    <Sparkles className="w-4 h-4" />
                    New Prediction
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Error Alert */}
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Content */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24">
                <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Loading predictions...</p>
              </div>
            ) : (
              <RecentPredictions predictions={predictions} />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PredictionsView;
