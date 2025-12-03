import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { ArrowLeft, TrendingUp, Users, Target, Shield, Activity, TrendingDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/StatCard";
import { CSSBadge } from "@/components/CSSBadge";
import { NarrativeSection } from "@/components/NarrativeSection";
import TeamPatternsSection from "@/components/patterns/TeamPatternsSection";
import { StreakAnalysis } from "@/components/analysis/StreakAnalysis";
import { TransitionMatrixHeatmap } from "@/components/analysis/TransitionMatrixHeatmap";
import { 
  generateTeamStatistics, 
  calculateHeadToHeadStats, 
  predictWinner,
  calculatePoissonGoals,
  type MatchResult
} from "@/lib/teamStatistics";

interface SimpleStat { value: number; color: string }
interface DetailedStat { name: string; value: number }
interface TeamInfo {
  league: string;
  form: string;
  stats: {
    attack: SimpleStat;
    defense: SimpleStat;
    midfield: SimpleStat;
    overall: SimpleStat;
  };
  detailedStats: Record<string, DetailedStat[]>;
}

const teamStats: Record<string, TeamInfo> = {
  "Aston Oroszlán": {
    league: "angol",
    form: "WWDWL",
    stats: {
      attack: { value: 85, color: "primary" },
      defense: { value: 78, color: "primary" },
      midfield: { value: 82, color: "primary" },
      overall: { value: 82, color: "primary" }
    },
    detailedStats: {
      "Támadás": [
        { name: "Lövések", value: 88 },
        { name: "Gólképesség", value: 84 },
        { name: "Gyorsaság", value: 86 },
        { name: "Passz pontosság", value: 81 }
      ],
      "Védelem": [
        { name: "Szerelések", value: 79 },
        { name: "Labdaszerzések", value: 76 },
        { name: "Kapus", value: 82 },
        { name: "Állóképesség", value: 75 }
      ],
      "Középpálya": [
        { name: "Labdabirtoklás", value: 83 },
        { name: "Átadások", value: 85 },
        { name: "Kreativitás", value: 80 },
        { name: "Ütemváltás", value: 82 }
      ]
    }
  },
  "Liverpool": {
    league: "angol",
    form: "WWWWW",
    stats: {
      attack: { value: 92, color: "primary" },
      defense: { value: 88, color: "primary" },
      midfield: { value: 90, color: "primary" },
      overall: { value: 90, color: "primary" }
    },
    detailedStats: {
      "Támadás": [
        { name: "Lövések", value: 94 },
        { name: "Gólképesség", value: 91 },
        { name: "Gyorsaság", value: 93 },
        { name: "Passz pontosság", value: 90 }
      ],
      "Védelem": [
        { name: "Szerelések", value: 89 },
        { name: "Labdaszerzések", value: 87 },
        { name: "Kapus", value: 90 },
        { name: "Állóképesség", value: 88 }
      ],
      "Középpálya": [
        { name: "Labdabirtoklás", value: 91 },
        { name: "Átadások", value: 92 },
        { name: "Kreativitás", value: 89 },
        { name: "Ütemváltás", value: 90 }
      ]
    }
  },
  "Barcelona": {
    league: "spanyol",
    form: "WWWDW",
    stats: {
      attack: { value: 93, color: "primary" },
      defense: { value: 85, color: "primary" },
      midfield: { value: 92, color: "primary" },
      overall: { value: 90, color: "primary" }
    },
    detailedStats: {
      "Támadás": [
        { name: "Lövések", value: 95 },
        { name: "Gólképesség", value: 92 },
        { name: "Gyorsaság", value: 94 },
        { name: "Passz pontosság", value: 91 }
      ],
      "Védelem": [
        { name: "Szerelések", value: 86 },
        { name: "Labdaszerzések", value: 84 },
        { name: "Kapus", value: 87 },
        { name: "Állóképesség", value: 85 }
      ],
      "Középpálya": [
        { name: "Labdabirtoklás", value: 94 },
        { name: "Átadások", value: 93 },
        { name: "Kreativitás", value: 91 },
        { name: "Ütemváltás", value: 92 }
      ]
    }
  }
};

const getTeamStats = (teamName: string) => {
  if (teamStats[teamName]) return teamStats[teamName];
  
  return {
    league: "angol",
    form: "WWDLD",
    stats: {
      attack: { value: 75, color: "primary" },
      defense: { value: 72, color: "primary" },
      midfield: { value: 74, color: "primary" },
      overall: { value: 74, color: "primary" }
    },
    detailedStats: {
      "Támadás": [
        { name: "Lövések", value: 76 },
        { name: "Gólképesség", value: 74 },
        { name: "Gyorsaság", value: 75 },
        { name: "Passz pontosság", value: 73 }
      ],
      "Védelem": [
        { name: "Szerelések", value: 73 },
        { name: "Labdaszerzések", value: 71 },
        { name: "Kapus", value: 74 },
        { name: "Állóképesség", value: 72 }
      ],
      "Középpálya": [
        { name: "Labdabirtoklás", value: 75 },
        { name: "Átadások", value: 76 },
        { name: "Kreativitás", value: 72 },
        { name: "Ütemváltás", value: 74 }
      ]
    }
  };
};

const getStatColor = (value: number) => {
  if (value >= 85) return "text-primary";
  if (value >= 70) return "text-secondary";
  return "text-destructive";
};

// Generate mock match history based on team strength
const generateMockMatches = (teamName: string, _overallStrength: number): MatchResult[] => {
  const matches: MatchResult[] = [];
  const opponents = ["Team A", "Team B", "Team C", "Team D", "Team E"];
  
  for (let i = 0; i < 10; i++) {
    const isHome = i % 2 === 0;
    const homeGoals = Math.floor(Math.random() * 4);
    const awayGoals = Math.floor(Math.random() * 3);
    const teamGoals = isHome ? homeGoals : awayGoals;
    const oppGoals = isHome ? awayGoals : homeGoals;
    
    let result: "W" | "D" | "L";
    if (teamGoals > oppGoals) result = "W";
    else if (teamGoals < oppGoals) result = "L";
    else result = "D";
    
    matches.push({
      homeTeam: isHome ? teamName : opponents[i % opponents.length],
      awayTeam: isHome ? opponents[i % opponents.length] : teamName,
      homeGoals,
      awayGoals,
      isHome,
      result,
      opponent: opponents[i % opponents.length],
      date: new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000).toISOString()
    });
  }
  
  return matches;
};

const TeamDetail = () => {
  const { teamName } = useParams<{ teamName: string }>();
  const navigate = useNavigate();
  const team = getTeamStats(teamName || "");
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Generate mock matches synchronously for now
    const mockMatches = generateMockMatches(teamName || "", team.stats.overall.value);
    setMatches(mockMatches);
    setLoading(false);
  }, [teamName, team.stats.overall.value]);
  
  // Calculate statistics from matches
  const statistics = generateTeamStatistics(matches);
  const headToHead = calculateHeadToHeadStats(matches);
  const prediction = predictWinner(matches);
  const poissonGoals = calculatePoissonGoals(matches);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Sidebar />
      <TopBar />
      <main className="ml-0 md:ml-[84px] py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Button
            variant="outline"
            onClick={() => navigate("/teams")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Vissza a csapatokhoz
          </Button>

          <div className="mb-6">
            <div className="inline-flex items-center gap-2 rounded-full ring-1 ring-primary/20 bg-primary/10 px-2.5 py-1 mb-2">
              <Users className="w-3.5 h-3.5 text-primary" />
              <span className="text-[11px] text-primary font-semibold">Csapat Statisztikák</span>
            </div>
            <h1 className="text-3xl sm:text-4xl tracking-tight text-foreground font-semibold">{teamName}</h1>
            <p className="text-muted-foreground mt-1">
              {team.league === "angol" ? "Angol Bajnokság" : "Spanyol Bajnokság"}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Team Info Card */}
            <div className="rounded-2xl bg-card ring-1 ring-border p-6">
              <div className="flex items-center justify-center mb-6">
                <div className="h-32 w-32 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 ring-2 ring-primary/30 grid place-items-center">
                  <span className="text-5xl font-bold text-primary">{teamName?.charAt(0)}</span>
                </div>
              </div>
              
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-md bg-muted ring-1 ring-border mb-3">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">Összesített: {team.stats.overall.value}</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  {team.form.split("").map((result: string, i: number) => (
                    <div
                      key={i}
                      className={`h-7 w-7 rounded-md grid place-items-center text-xs font-bold ${
                        result === "W"
                          ? "bg-primary/20 text-primary ring-1 ring-primary/30"
                          : result === "D"
                          ? "bg-secondary/20 text-secondary ring-1 ring-secondary/30"
                          : "bg-destructive/20 text-destructive ring-1 ring-destructive/30"
                      }`}
                    >
                      {result}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {Object.entries(team.stats).slice(0, 3).map(([key, stat]: [string, SimpleStat]) => (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground capitalize">{key}</span>
                      <span className={`text-sm font-bold ${getStatColor(stat.value)}`}>{stat.value}</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden ring-1 ring-border">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all"
                        style={{ width: `${stat.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Stats */}
            <div className="lg:col-span-2 space-y-6">
              <TeamPatternsSection teamName={teamName || ""} />
              <StreakAnalysis teamName={teamName || ""} />
              <TransitionMatrixHeatmap teamName={teamName || ""} />
              
              {/* Basic Match Statistics */}
              <StatCard
                title="Alapvető Mérkőzésstatisztikák"
                icon={<Activity className="w-5 h-5 text-primary" />}
                stats={[
                  { label: "Mindkét csapat góllövése", value: statistics.bothTeamsScored, type: "percentage" },
                  { label: "Átlagos gólok mérkőzésenként", value: statistics.avgGoalsPerMatch, type: "number" },
                  { label: "Átlagos hazai gólok", value: statistics.avgHomeGoals, type: "number" },
                  { label: "Átlagos vendég gólok", value: statistics.avgAwayGoals, type: "number" },
                ]}
              />

              {/* Team-Specific Statistics */}
              <StatCard
                title="Csapatspecifikus Statisztikák"
                icon={<Target className="w-5 h-5 text-primary" />}
                stats={[
                  { label: "Formindex (utolsó 5 mérkőzés)", value: statistics.formIndex, type: "percentage" },
                  { label: "Várható gólok (xG)", value: statistics.expectedGoals, type: "number" },
                  { label: "Mindkét csapat góllövésének valószínűsége", value: statistics.bothTeamsToScoreProb, type: "percentage" },
                ]}
              />

              {/* Head-to-Head Statistics */}
              <StatCard
                title="Mérkőzések Eredményei"
                icon={<Shield className="w-5 h-5 text-primary" />}
                stats={[
                  { label: "Győzelmek aránya", value: headToHead.wins, type: "percentage" },
                  { label: "Döntetlenek aránya", value: headToHead.draws, type: "percentage" },
                  { label: "Vereségek aránya", value: headToHead.losses, type: "percentage" },
                ]}
              />

              {/* Prediction Statistics */}
              <StatCard
                title="Előrejelzési Képesség"
                icon={<TrendingDown className="w-5 h-5 text-primary" />}
                stats={[
                  { label: "Következő mérkőzés előrejelzés", value: prediction.prediction, type: "text" },
                  { label: "Bizonytalansági szint", value: `${prediction.confidence}%`, type: "text" },
                  { label: "Várható hazai gólok (Poisson)", value: poissonGoals.home, type: "number" },
                  { label: "Várható vendég gólok (Poisson)", value: poissonGoals.away, type: "number" },
                ]}
              />

              {/* Win Probability */}
              <StatCard
                title="Győzelmi Valószínűségek (Elo-modell)"
                icon={<TrendingUp className="w-5 h-5 text-primary" />}
                stats={[
                  { label: "Hazai győzelem valószínűsége", value: statistics.winProbability.home, type: "percentage" },
                  { label: "Döntetlen valószínűsége", value: statistics.winProbability.draw, type: "percentage" },
                  { label: "Vendég győzelem valószínűsége", value: statistics.winProbability.away, type: "percentage" },
                ]}
              />

              {/* Original Detailed Stats */}
              {Object.entries(team.detailedStats).map(([category, stats]: [string, DetailedStat[]]) => (
                <div key={category} className="rounded-2xl bg-card ring-1 ring-border p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">{category}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {stats.map((stat: DetailedStat) => (
                      <div key={stat.name}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">{stat.name}</span>
                          <span className={`text-sm font-bold ${getStatColor(stat.value)}`}>
                            {stat.value}
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden ring-1 ring-border">
                          <div
                            className={`h-full transition-all ${
                              stat.value >= 85
                                ? "bg-gradient-to-r from-primary to-primary/80"
                                : stat.value >= 70
                                ? "bg-gradient-to-r from-secondary to-secondary/80"
                                : "bg-gradient-to-r from-destructive to-destructive/80"
                            }`}
                            style={{ width: `${stat.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* CSS Badge */}
              <div className="rounded-2xl bg-card ring-1 ring-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Kognitív Stabilitás Score (CSS)</h3>
                <div className="flex justify-center">
                  <CSSBadge score={87} />
                </div>
              </div>

              {/* Narrative Section */}
              <NarrativeSection
                title="Szakértői Elemzés"
                content={`A(z) ${teamName} kiváló formában van, várható gólok száma: ${statistics.expectedGoals.toFixed(1)} mérkőzésenként. A csapat formindexe ${statistics.formIndex.toFixed(0)}%, ami erős teljesítményre utal. ${prediction.prediction === "Győzelem" ? "Hazai pályán erős esélyekkel rendelkezik" : prediction.prediction === "Vereség" ? "Vendégként is megbízható" : "Kiegyensúlyozott teljesítményre számíthatunk"}. Az előrejelzés megbízhatósága Magas (CSS: 8.7/10), ami azt jelenti, hogy az adatminőség és a modell bizonyossága egyaránt kiemelkedő.`}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeamDetail;