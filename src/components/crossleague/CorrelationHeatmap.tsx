import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface CorrelationData {
  league1: string;
  league2: string;
  correlation: number;
}

interface LeagueRow {
  id: string;
  name: string;
}

interface CorrelationHeatmapProps {
  data: CorrelationData[] | number[][];
  leagues: string[] | LeagueRow[];
}

const CorrelationHeatmap = ({ data, leagues }: CorrelationHeatmapProps) => {
  // Normalize leagues to string array
  const leagueNames = leagues.map((l) => (typeof l === 'string' ? l : l.name));
  
  // Handle both data formats
  const getCorrelation = (league1Idx: number, league2Idx: number): number => {
    if (league1Idx === league2Idx) return 1;
    
    // If data is a matrix (number[][])
    if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0])) {
      const matrix = data as number[][];
      return matrix[league1Idx]?.[league2Idx] ?? 0;
    }
    
    // If data is CorrelationData[]
    const correlations = data as CorrelationData[];
    const league1Name = leagueNames[league1Idx];
    const league2Name = leagueNames[league2Idx];
    
    const item = correlations.find(
      (d) =>
        (d.league1 === league1Name && d.league2 === league2Name) ||
        (d.league1 === league2Name && d.league2 === league1Name)
    );
    return item?.correlation ?? 0;
  };

  const getColorClass = (correlation: number): string => {
    if (correlation >= 0.8) return "bg-green-500";
    if (correlation >= 0.6) return "bg-green-400";
    if (correlation >= 0.4) return "bg-yellow-400";
    if (correlation >= 0.2) return "bg-orange-400";
    return "bg-red-400";
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Liga korrelációs mátrix</CardTitle>
      </CardHeader>
      <CardContent>
        {leagueNames.length === 0 ? (
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            Nincs elegendő adat a megjelenítéshez
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="p-2 text-left text-xs font-medium text-muted-foreground"></th>
                  {leagueNames.map((league) => (
                    <th
                      key={league}
                      className="p-2 text-center text-xs font-medium text-muted-foreground"
                      style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                    >
                      {league}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leagueNames.map((rowLeague, rowIdx) => (
                  <tr key={rowLeague}>
                    <td className="p-2 text-xs font-medium text-muted-foreground whitespace-nowrap">
                      {rowLeague}
                    </td>
                    {leagueNames.map((colLeague, colIdx) => {
                      const correlation = getCorrelation(rowIdx, colIdx);
                      return (
                        <td key={colLeague} className="p-1">
                          <div
                            className={`w-8 h-8 rounded flex items-center justify-center text-xs font-medium text-white ${getColorClass(
                              correlation
                            )}`}
                            title={`${rowLeague} - ${colLeague}: ${(correlation * 100).toFixed(0)}%`}
                          >
                            {(correlation * 100).toFixed(0)}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CorrelationHeatmap;
