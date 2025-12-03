import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { Trophy } from "lucide-react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const leagueStandings = {
  angol: [
    { position: 1, team: "Liverpool", played: 12, won: 9, drawn: 2, lost: 1, points: 29 },
    { position: 2, team: "Manchester City", played: 12, won: 8, drawn: 3, lost: 1, points: 27 },
    { position: 3, team: "Arsenal", played: 12, won: 7, drawn: 4, lost: 1, points: 25 },
    { position: 4, team: "Chelsea", played: 12, won: 7, drawn: 3, lost: 2, points: 24 },
    { position: 5, team: "Aston Villa", played: 12, won: 6, drawn: 3, lost: 3, points: 21 },
    { position: 6, team: "Tottenham", played: 12, won: 6, drawn: 2, lost: 4, points: 20 },
    { position: 7, team: "Newcastle", played: 12, won: 5, drawn: 4, lost: 3, points: 19 },
    { position: 8, team: "Brighton", played: 12, won: 5, drawn: 3, lost: 4, points: 18 },
  ],
  spanyol: [
    { position: 1, team: "Real Madrid", played: 12, won: 9, drawn: 2, lost: 1, points: 29 },
    { position: 2, team: "Barcelona", played: 12, won: 8, drawn: 3, lost: 1, points: 27 },
    { position: 3, team: "Atletico Madrid", played: 12, won: 7, drawn: 3, lost: 2, points: 24 },
    { position: 4, team: "Girona", played: 12, won: 6, drawn: 4, lost: 2, points: 22 },
    { position: 5, team: "Athletic Bilbao", played: 12, won: 6, drawn: 3, lost: 3, points: 21 },
    { position: 6, team: "Real Sociedad", played: 12, won: 5, drawn: 4, lost: 3, points: 19 },
    { position: 7, team: "Valencia", played: 12, won: 5, drawn: 3, lost: 4, points: 18 },
    { position: 8, team: "Sevilla", played: 12, won: 4, drawn: 5, lost: 3, points: 17 },
  ]
};

const Leagues = () => {
  useDocumentTitle("Leagues");
  const [league, setLeague] = useState<"angol" | "spanyol">("angol");
  const standings = leagueStandings[league];
  const leagueName = league === "angol" ? "Premier League" : "La Liga";

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <TopBar />
      <main className="ml-0 md:ml-[84px] lg:ml-64 pt-20 lg:pt-0">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 rounded-full ring-1 ring-primary/20 bg-primary/10 px-3 py-1.5 mb-4">
              <Trophy className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wide">Leagues</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-3">
              League Standings
            </h1>
            <p className="text-lg text-muted-foreground">
              View current season standings and team performance metrics
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

          {/* Standings Table */}
          <div className="rounded-xl bg-card border border-border overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">#</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Team</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">MP</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">W</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">D</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">L</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">PTS</th>
                  </tr>
                </thead>
                <tbody>
                  {standings.map((team, idx) => (
                    <tr
                      key={team.position}
                      className={`border-b border-border hover:bg-muted/30 transition ${
                        idx === 0 ? 'bg-green-500/5' : idx < 4 ? 'bg-blue-500/5' : idx < 6 ? 'bg-yellow-500/5' : ''
                      }`}
                    >
                      <td className="px-6 py-4 text-sm font-semibold text-foreground">{team.position}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-foreground">{team.team}</td>
                      <td className="px-6 py-4 text-center text-sm text-muted-foreground">{team.played}</td>
                      <td className="px-6 py-4 text-center text-sm text-green-500 font-medium">{team.won}</td>
                      <td className="px-6 py-4 text-center text-sm text-yellow-500 font-medium">{team.drawn}</td>
                      <td className="px-6 py-4 text-center text-sm text-red-500 font-medium">{team.lost}</td>
                      <td className="px-6 py-4 text-center text-sm font-bold text-primary">{team.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-8 p-6 rounded-lg bg-muted/30 border border-border">
            <h3 className="font-semibold text-foreground mb-3">Legend</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm text-muted-foreground">W = Win</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <span className="text-sm text-muted-foreground">D = Draw</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-sm text-muted-foreground">L = Loss</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">PTS = Points</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Leagues;
