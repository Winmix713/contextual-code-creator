import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import TeamStatisticsTable from "@/components/TeamStatisticsTable";
import { Users } from "lucide-react";
import { LEAGUE_TEAM_OPTIONS, LEAGUE_METADATA, type LeagueKey } from "@/data/teamOptions";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const generateTeamStats = (teamNames: string[]) => {
  return teamNames.map(name => {
    const played = Math.floor(Math.random() * 10) + 20;
    const won = Math.floor(Math.random() * played * 0.5);
    const lost = Math.floor(Math.random() * (played - won) * 0.6);
    const drawn = played - won - lost;
    const goalsFor = Math.floor(Math.random() * 40) + 20;
    const goalsAgainst = Math.floor(Math.random() * 40) + 15;
    const points = won * 3 + drawn;
    
    const formResults = ['W', 'D', 'L'];
    const form = Array.from({ length: 8 }, () => 
      formResults[Math.floor(Math.random() * formResults.length)]
    );
    
    const recentForm = form.slice(-5);
    const formScore = Math.round(
      (recentForm.filter(r => r === 'W').length * 100 + 
       recentForm.filter(r => r === 'D').length * 50) / 5
    );

    return {
      name,
      played,
      won,
      drawn,
      lost,
      goalsFor,
      goalsAgainst,
      goalDifference: goalsFor - goalsAgainst,
      points,
      form,
      formScore
    };
  });
};

const Teams = () => {
  useDocumentTitle("Teams");
  const [league, setLeague] = useState<LeagueKey>("angol");
  const teamStats = generateTeamStats(LEAGUE_TEAM_OPTIONS[league].map((team) => team.label));
  const leagueMetadata = LEAGUE_METADATA[league];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <TopBar />
      <main className="ml-0 md:ml-[84px] lg:ml-64 pt-20 lg:pt-0">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 rounded-full ring-1 ring-primary/20 bg-primary/10 px-3 py-1.5 mb-4">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wide">Teams</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-3">
              Team Statistics
            </h1>
            <p className="text-lg text-muted-foreground">
              Browse teams and analyze their performance metrics and recent form
            </p>
          </div>

          {/* League Selector */}
          <div className="mb-8">
            <div className="inline-flex items-center rounded-lg bg-muted border border-border p-1">
              <button
                onClick={() => setLeague("angol")}
                className={`px-6 py-2.5 rounded-md text-sm font-semibold transition-all ${
                  league === "angol"
                    ? "bg-card text-foreground ring-1 ring-border shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Premier League
              </button>
              <button
                onClick={() => setLeague("spanyol")}
                className={`px-6 py-2.5 rounded-md text-sm font-semibold transition-all ${
                  league === "spanyol"
                    ? "bg-card text-foreground ring-1 ring-border shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                La Liga
              </button>
            </div>
          </div>

          {/* Teams Table */}
          <TeamStatisticsTable
            teams={teamStats}
            leagueName={leagueMetadata.displayName}
          />
        </div>
      </main>
    </div>
  );
};

export default Teams;
