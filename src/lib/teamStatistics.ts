// Statistical calculation functions for team analysis

// JAVÍTVA: A MatchResult most már tartalmazza az opcionális mezőket is,
// amiket a UI vagy a matchHistory használ.
export interface MatchResult {
  homeTeam: string
  awayTeam: string
  homeGoals: number
  awayGoals: number
  date?: string
  // Kiegészítő mezők, hogy kompatibilis legyen a matchHistory.ts adatokkal
  opponent?: string
  isHome?: boolean
  result?: "W" | "D" | "L"
  competition?: string
}

export interface TeamStatistics {
  bothTeamsScored: number
  avgGoalsPerMatch: number
  avgHomeGoals: number
  avgAwayGoals: number
  formIndex: number
  expectedGoals: number
  bothTeamsToScoreProb: number
  winProbability: {
    home: number
    draw: number
    away: number
  }
}

// Calculate percentage of matches where both teams scored
export const calculateBothTeamsScoredPercentage = (matches: MatchResult[]): number => {
  if (matches.length === 0) return 0

  const bothScored = matches.filter((match) => match.homeGoals > 0 && match.awayGoals > 0).length

  return Math.round((bothScored / matches.length) * 100)
}

// Calculate average goals per match
export const calculateAverageGoals = (matches: MatchResult[]) => {
  if (matches.length === 0) return { total: 0, home: 0, away: 0 }

  let totalGoals = 0
  let homeGoals = 0
  let awayGoals = 0
  let homeMatches = 0
  let awayMatches = 0

  matches.forEach((match) => {
    totalGoals += match.homeGoals + match.awayGoals

    // Ha van isHome flag, pontosabban tudunk számolni
    if (match.isHome !== undefined) {
      if (match.isHome) {
        homeGoals += match.homeGoals
        homeMatches++
      } else {
        awayGoals += match.awayGoals
        awayMatches++
      }
    } else {
      // Fallback
      homeGoals += match.homeGoals
      awayGoals += match.awayGoals
      homeMatches++
      awayMatches++
    }
  })

  return {
    total: Number((totalGoals / matches.length).toFixed(2)),
    home: homeMatches > 0 ? Number((homeGoals / homeMatches).toFixed(2)) : 0,
    away: awayMatches > 0 ? Number((awayGoals / awayMatches).toFixed(2)) : 0,
  }
}

// Calculate form index based on last 5 matches
export const calculateFormIndex = (matches: MatchResult[]): number => {
  const recentMatches = matches.slice(0, 5)
  if (recentMatches.length === 0) return 0

  // Ha van explicit eredmény (W/D/L), használjuk azt
  let points = 0
  const maxPoints = recentMatches.length * 3

  recentMatches.forEach((m) => {
    if (m.result === "W") points += 3
    else if (m.result === "D") points += 1
    else if (m.result === "L") points += 0
    else {
      // Becslés gólok alapján, ha nincs result
      if (m.homeGoals > m.awayGoals)
        points += 3 // Feltételezve hazai szempontot
      else if (m.homeGoals === m.awayGoals) points += 1
    }
  })

  return Math.round((points / maxPoints) * 100)
}

// Calculate expected goals (xG) - Simplified
export const calculateExpectedGoals = (matches: MatchResult[]): number => {
  if (matches.length === 0) return 0
  const teamGoals = matches.map((match) => match.homeGoals)
  const avgGoals = teamGoals.reduce((sum, goals) => sum + goals, 0) / teamGoals.length
  return Number(avgGoals.toFixed(2))
}

// Calculate probability of both teams scoring
export const calculateBothTeamsToScoreProb = (matches: MatchResult[]): number => {
  return calculateBothTeamsScoredPercentage(matches)
}

// Calculate win probability using Elo-inspired model
export const calculateWinProbability = (matches: MatchResult[]): { home: number; draw: number; away: number } => {
  if (matches.length === 0) return { home: 33, draw: 34, away: 33 }

  const formIndex = calculateFormIndex(matches)
  const adjustment = (formIndex - 50) / 2

  const home = Math.max(20, Math.min(60, 50 + adjustment))
  const away = Math.max(15, Math.min(50, 50 - adjustment))
  const draw = 100 - home - away

  return { home, draw, away }
}

// Alias function for component compatibility
export const generateTeamStatistics = (matches: MatchResult[]): TeamStatistics => {
  return {
    bothTeamsScored: calculateBothTeamsScoredPercentage(matches),
    avgGoalsPerMatch: calculateAverageGoals(matches).total,
    avgHomeGoals: calculateAverageGoals(matches).home,
    avgAwayGoals: calculateAverageGoals(matches).away,
    formIndex: calculateFormIndex(matches),
    expectedGoals: calculateExpectedGoals(matches),
    bothTeamsToScoreProb: calculateBothTeamsToScoreProb(matches),
    winProbability: calculateWinProbability(matches),
  }
}

export const calculateHeadToHeadStats = (matches: MatchResult[]) => {
  const total = matches.length
  if (total === 0) return { wins: 0, draws: 0, losses: 0 }

  let wins = 0,
    draws = 0,
    losses = 0
  matches.forEach((m) => {
    if (m.result === "W") wins++
    else if (m.result === "D") draws++
    else if (m.result === "L") losses++
  })

  return {
    wins: Math.round((wins / total) * 100),
    draws: Math.round((draws / total) * 100),
    losses: Math.round((losses / total) * 100),
  }
}

export const predictWinner = (matches: MatchResult[]) => {
  const formIndex = calculateFormIndex(matches)
  const prediction = formIndex >= 60 ? "Győzelem" : formIndex >= 40 ? "Döntetlen" : "Vereség"
  return { prediction, confidence: formIndex }
}

export const calculatePoissonGoals = (matches: MatchResult[]) => {
  const avg = calculateAverageGoals(matches)
  return { home: avg.home, away: avg.away }
}
