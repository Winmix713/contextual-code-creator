import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Brain, TrendingUp, Loader2, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import PredictionDisplay from '@/components/PredictionDisplay';
import FeedbackForm from '@/components/FeedbackForm';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

interface Match {
  id: string;
  match_date: string;
  status: string;
  home_score?: number;
  away_score?: number;
  home_team: { id: string; name: string };
  away_team: { id: string; name: string };
  league: { name: string };
}

interface Prediction {
  id: string;
  predicted_outcome: string;
  confidence_score: number;
  btts_prediction: boolean;
  actual_outcome?: string;
  was_correct?: boolean;
}

interface Pattern {
  template_name: string;
  confidence_boost: number;
  data: Record<string, unknown>;
}

export default function MatchDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [match, setMatch] = useState<Match | null>(null);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [formScores, setFormScores] = useState<{ home: number; away: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useDocumentTitle("Match Detail");

  const fetchMatch = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('matches')
      .select(`
        *,
        home_team:teams!home_team_id(id, name),
        away_team:teams!away_team_id(id, name),
        league:leagues(name)
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching match:', error);
      setError('Match not found');
    } else {
      setMatch(data);
    }
    setLoading(false);
  }, [id]);

  const fetchPrediction = useCallback(async () => {
    const { data } = await supabase
      .from('predictions')
      .select('*')
      .eq('match_id', id)
      .maybeSingle();

    setPrediction(data);
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchMatch();
      fetchPrediction();
    }
  }, [id, fetchMatch, fetchPrediction]);

  async function handleAnalyze() {
    if (!match) return;

    setAnalyzing(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke('analyze-match', {
        body: { matchId: id }
      });

      if (error) throw error;

      if (data?.prediction) {
        setPrediction(data.prediction);
      }
      if (data?.patterns) {
        setPatterns(data.patterns);
      }
    } catch (err) {
      console.error('Analysis error:', err);
      setError('Failed to analyze match');
    } finally {
      setAnalyzing(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Sidebar />
        <TopBar />
        <main className="ml-0 md:ml-[84px] lg:ml-64 pt-20 lg:pt-0">
          <div className="container mx-auto px-4 py-12">
            <div className="flex items-center justify-center py-24">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen bg-background">
        <Sidebar />
        <TopBar />
        <main className="ml-0 md:ml-[84px] lg:ml-64 pt-20 lg:pt-0">
          <div className="container mx-auto px-4 py-12">
            <Alert variant="destructive">
              <AlertDescription>Match not found</AlertDescription>
            </Alert>
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
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-8 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          {/* Match Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline">{match.league?.name}</Badge>
              <Badge>{match.status}</Badge>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-2">
                  {match.home_team.name} vs {match.away_team.name}
                </h1>
                <p className="text-lg text-muted-foreground">
                  {format(new Date(match.match_date), 'EEEE, MMMM d, yyyy HH:mm')}
                </p>
              </div>
              <Button
                onClick={handleAnalyze}
                disabled={analyzing}
                size="lg"
                className="gap-2"
              >
                {analyzing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                {analyzing ? 'Analyzing...' : 'Analyze Match'}
              </Button>
            </div>
          </div>

          {/* Match Score (if completed) */}
          {match.status === 'completed' && match.home_score !== null && match.away_score !== null && (
            <Card className="mb-8 border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-5xl font-bold text-foreground">
                    {match.home_score} - {match.away_score}
                  </div>
                  <p className="text-muted-foreground mt-2">Final Score</p>
                </div>
              </CardContent>
            </Card>
          )}

          {error && (
            <Alert variant="destructive" className="mb-8">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Prediction Section */}
          {prediction && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">AI Prediction</h2>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="w-5 h-5" />
                      Predicted Outcome
                    </CardTitle>
                    <Badge variant="outline">
                      {Math.round(prediction.confidence_score)}% Confidence
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <PredictionDisplay prediction={prediction} />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Patterns Section */}
          {patterns.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Detected Patterns</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {patterns.map((pattern, idx) => (
                  <Card key={idx}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        {pattern.template_name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground">
                        Confidence Boost: <span className="font-semibold text-foreground">{pattern.confidence_boost}%</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Feedback Form */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Feedback</h2>
            <FeedbackForm matchId={match.id} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
