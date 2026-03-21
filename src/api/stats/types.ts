export interface PlayerStatsSummary {
  batting_avg_rank: number;
  war_rank: number;
  hits_rank: number;
  rbi_rank: number;
  home_run_rank: number;
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
  summary: PlayerStatsSummary;
  metrics: BatterStatsMetrics | PitcherStatsMetrics;
}
