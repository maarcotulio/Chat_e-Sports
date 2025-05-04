export type Team = {
  name: string;
  logoUrl: string | null;
};

export type Tournament = {
  name: string;
};

export type Match = {
  id: number;
  tournamentId: number;
  date: string;
  teamAId: number;
  teamBId: number;
  tournament: Tournament;
  teamA: Team;
  teamB: Team;
};
