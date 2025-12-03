import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface TeamStats {
  name: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference?: number;
  points: number;
  form?: string[];
  formScore?: number;
}

interface TeamStatisticsTableProps {
  teams?: TeamStats[];
  title?: string;
  leagueName?: string;
}

export const TeamStatisticsTable = ({ 
  teams = [], 
  title = "Team Statistics",
  leagueName
}: TeamStatisticsTableProps) => {
  const navigate = useNavigate();
  const displayTitle = leagueName || title;

  if (teams.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{displayTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No team statistics available.</p>
        </CardContent>
      </Card>
    );
  }

  // Sort teams by points (descending)
  const sortedTeams = [...teams].sort((a, b) => b.points - a.points);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{displayTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Team</TableHead>
              <TableHead className="text-center">P</TableHead>
              <TableHead className="text-center">W</TableHead>
              <TableHead className="text-center">D</TableHead>
              <TableHead className="text-center">L</TableHead>
              <TableHead className="text-center">GF</TableHead>
              <TableHead className="text-center">GA</TableHead>
              <TableHead className="text-center">GD</TableHead>
              <TableHead className="text-center">Pts</TableHead>
              {teams[0]?.form && <TableHead className="text-center">Form</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTeams.map((team, index) => (
              <TableRow 
                key={team.name} 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => navigate(`/teams/${encodeURIComponent(team.name)}`)}
              >
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium">{team.name}</TableCell>
                <TableCell className="text-center">{team.played}</TableCell>
                <TableCell className="text-center">{team.won}</TableCell>
                <TableCell className="text-center">{team.drawn}</TableCell>
                <TableCell className="text-center">{team.lost}</TableCell>
                <TableCell className="text-center">{team.goalsFor}</TableCell>
                <TableCell className="text-center">{team.goalsAgainst}</TableCell>
                <TableCell className="text-center">
                  {team.goalDifference !== undefined 
                    ? (team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference)
                    : team.goalsFor - team.goalsAgainst > 0 
                      ? `+${team.goalsFor - team.goalsAgainst}` 
                      : team.goalsFor - team.goalsAgainst
                  }
                </TableCell>
                <TableCell className="text-center font-bold">{team.points}</TableCell>
                {team.form && (
                  <TableCell className="text-center">
                    <div className="flex justify-center gap-0.5">
                      {team.form.slice(-5).map((result, i) => (
                        <span
                          key={i}
                          className={`w-5 h-5 rounded text-xs flex items-center justify-center font-bold ${
                            result === "W"
                              ? "bg-green-500/20 text-green-500"
                              : result === "D"
                              ? "bg-yellow-500/20 text-yellow-500"
                              : "bg-red-500/20 text-red-500"
                          }`}
                        >
                          {result}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TeamStatisticsTable;