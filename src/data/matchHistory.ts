import { supabase } from "@/integrations/supabase/client";
import { MatchResult } from "@/lib/teamStatistics";

/**
 * Lekéri a mérkőzéseket közvetlenül a Supabase adatbázisból.
 * Többé nem használunk mock adatokat.
 */
export const getMatchHistory = async ({ 
  league, 
  team 
}: { 
  league?: string; 
  team?: string 
}): Promise<MatchResult[]> => {
  try {
    let query = supabase
      .from('matches')
      .select('*')
      .order('date', { ascending: false });

    // Szűrés ligára, ha meg van adva
    if (league) {
      query = query.eq('league', league);
    }

    // Szűrés csapatra (hazai vagy vendég)
    if (team) {
      // Supabase "or" szintaxis: home_team.eq.TeamName,away_team.eq.TeamName
      query = query.or(`home_team.eq.${team},away_team.eq.${team}`);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching match history:', error);
      return [];
    }

    if (!data) return [];

    // Adatok átalakítása a MatchResult interfészre
    return data.map((match: any) => {
      // Kiszámoljuk a dinamikus mezőket (result, isHome, opponent)
      // ha egy konkrét csapatra szűrtünk
      let additionalProps = {};
      
      if (team) {
        const isHome = match.home_team === team;
        additionalProps = {
          isHome,
          opponent: isHome ? match.away_team : match.home_team,
          result: calculateResult(
            match.home_goals, 
            match.away_goals, 
            isHome
          )
        };
      }

      return {
        id: match.id,
        date: match.date,
        homeTeam: match.home_team,
        awayTeam: match.away_team,
        homeGoals: match.home_goals,
        awayGoals: match.away_goals,
        competition: match.league || match.competition,
        ...additionalProps
      } as MatchResult;
    });

  } catch (error) {
    console.error('Unexpected error in getMatchHistory:', error);
    return [];
  }
};

// Segédfüggvény az eredmény (W/D/L) kiszámításához
function calculateResult(homeGoals: number, awayGoals: number, isHome: boolean): 'W' | 'D' | 'L' {
  const teamGoals = isHome ? homeGoals : awayGoals;
  const oppGoals = isHome ? awayGoals : homeGoals;

  if (teamGoals > oppGoals) return 'W';
  if (teamGoals < oppGoals) return 'L';
  return 'D';
}

// Kompatibilitás miatt exportáljuk, de üres tömböt ad vagy figyelmeztet
// Ezt később érdemes kivezetni a kódból teljesen
export const matchHistory: Record<string, MatchResult[]> = new Proxy({}, {
  get: () => {
    console.warn("Deprecated: direct access to 'matchHistory' object is removed. Use 'getMatchHistory()' async function instead.");
    return [];
  }
});
