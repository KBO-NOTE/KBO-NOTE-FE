export interface BatterStatsSummary {
  batting_avg_rank: number;
  war_rank: number;
  hits_rank: number;
  rbi_rank: number;
  home_runs_rank: number;
  runs_rank: number;
  stolen_bases_rank: number;
  on_base_percentage_rank: number;
  ops_rank: number;
}

export interface PitcherStatsSummary {
  era_rank: number;
  games_rank: number;
  wins_rank: number;
  saves_rank: number;
  holds_rank: number;
  innings_pitched_rank: number;
  strikeouts_rank: number;
  walks_rank: number;
  whip_rank: number;
}

export interface BatterStatsMetrics {
  batting_avg: number;
  home_runs: number;
  hits: number;
  rbi: number;
  runs: number;
  stolen_bases: number;
  on_base_percentage: number;
  ops: number;
}

export interface PitcherStatsMetrics {
  era: number;
  games: number;
  win_loss: string;
  save_hold: string;
  innings_pitched: number;
  strikeouts: number;
  walks: number;
  whip: number;
}

export interface PlayerStatsResponse {
  season: number;
  player_type: "BATTER" | "PITCHER";
  summary: BatterStatsSummary | PitcherStatsSummary;
  metrics: BatterStatsMetrics | PitcherStatsMetrics;
}
