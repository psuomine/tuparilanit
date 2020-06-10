interface Stat {
  average: number;
  playerId: string;
}

export interface StatSection {
  title: string;
  description: string;
  stats: Stat[];
}
