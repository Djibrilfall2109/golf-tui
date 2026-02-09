import { cachedApiRequest } from './client.js';
import type { Tour, PlayerScorecard, RoundScorecard, HoleScore } from './types.js';

interface ESPNLeaderboardResponse {
  events?: ESPNEvent[];
}

interface ESPNEvent {
  id: string;
  name: string;
  competitions?: ESPNCompetition[];
}

interface ESPNCompetition {
  competitors?: ESPNCompetitor[];
}

interface ESPNCompetitor {
  id: string;
  athlete?: {
    id?: string;
    displayName?: string;
  };
  linescores?: ESPNRoundLinescore[];
}

interface ESPNRoundLinescore {
  period?: number;
  value?: number;
  displayValue?: string;
  linescores?: ESPNHoleLinescore[];
}

interface ESPNHoleLinescore {
  period?: number;
  value?: number;
  scoreType?: {
    displayValue?: string;
  };
}

function parseToParValue(displayValue: string | undefined): number {
  if (!displayValue || displayValue === 'E') return 0;
  const num = parseInt(displayValue, 10);
  return isNaN(num) ? 0 : num;
}

export async function fetchPlayerScorecard(
  eventId: string,
  playerId: string,
  playerName: string,
  tour: Tour
): Promise<PlayerScorecard | null> {
  try {
    const response = await cachedApiRequest<ESPNLeaderboardResponse>(`/${tour}/scoreboard`);

    if (!response.events || response.events.length === 0) {
      return null;
    }

    // Find the event
    const event = response.events.find(e => e.id === eventId) || response.events[0];
    const competition = event.competitions?.[0];

    if (!competition) {
      return null;
    }

    // Find the competitor
    const competitor = competition.competitors?.find(
      c => c.id === playerId || c.athlete?.id === playerId
    );

    if (!competitor) {
      return null;
    }

    const rounds: RoundScorecard[] = [];

    // Parse each round's linescores
    const roundLinescores = competitor.linescores || [];

    for (const roundData of roundLinescores) {
      if (roundData.period === undefined) continue;
      if (roundData.period > 4) continue;

      const holeLinescores = roundData.linescores || [];
      const holes: HoleScore[] = [];

      for (const hole of holeLinescores) {
        if (hole.period === undefined || hole.value === undefined) continue;

        const toPar = parseToParValue(hole.scoreType?.displayValue);
        const strokes = hole.value;
        const par = strokes - toPar;

        holes.push({
          holeNumber: hole.period,
          strokes,
          toPar,
          par,
        });
      }

      // Sort holes by hole number
      holes.sort((a, b) => a.holeNumber - b.holeNumber);

      const isComplete = holes.length === 18;
      const totalStrokes = holes.length > 0
        ? holes.reduce((sum, h) => sum + h.strokes, 0)
        : null;
      const totalToPar = holes.length > 0
        ? holes.reduce((sum, h) => sum + h.toPar, 0)
        : null;

      rounds.push({
        round: roundData.period,
        totalStrokes,
        toPar: totalToPar,
        holes,
        isComplete,
      });
    }

    // Sort rounds by round number
    rounds.sort((a, b) => a.round - b.round);

    return {
      playerId,
      playerName,
      eventId: event.id,
      eventName: event.name,
      rounds,
    };
  } catch (error) {
    console.error('Error fetching player scorecard:', error);
    return null;
  }
}
