import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

interface MatchSelectionProps {
  onMatchSelect?: (homeTeam: string, awayTeam: string) => void;
  teams?: string[];
}

const DEFAULT_TEAMS = [
  "Barcelona",
  "Real Madrid",
  "Bayern Munich",
  "Manchester City",
  "Liverpool",
  "PSG",
  "Juventus",
  "Inter Milan",
];

const MatchSelection = ({ onMatchSelect, teams = DEFAULT_TEAMS }: MatchSelectionProps) => {
  const [homeTeam, setHomeTeam] = useState<string>("");
  const [awayTeam, setAwayTeam] = useState<string>("");

  const handleSubmit = () => {
    if (homeTeam && awayTeam && homeTeam !== awayTeam) {
      onMatchSelect?.(homeTeam, awayTeam);
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Mérkőzés kiválasztása
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Hazai csapat</label>
            <Select value={homeTeam} onValueChange={setHomeTeam}>
              <SelectTrigger>
                <SelectValue placeholder="Válassz hazai csapatot" />
              </SelectTrigger>
              <SelectContent>
                {teams.map((team) => (
                  <SelectItem key={team} value={team} disabled={team === awayTeam}>
                    {team}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Vendég csapat</label>
            <Select value={awayTeam} onValueChange={setAwayTeam}>
              <SelectTrigger>
                <SelectValue placeholder="Válassz vendég csapatot" />
              </SelectTrigger>
              <SelectContent>
                {teams.map((team) => (
                  <SelectItem key={team} value={team} disabled={team === homeTeam}>
                    {team}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button 
          onClick={handleSubmit} 
          disabled={!homeTeam || !awayTeam || homeTeam === awayTeam}
          className="w-full"
        >
          Predikció kérése
        </Button>
      </CardContent>
    </Card>
  );
};

export default MatchSelection;
