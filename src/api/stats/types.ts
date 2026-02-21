//TODO : 투수의 경우는 다를 거임
export interface PlayerStatsSummary {
  batting_avg_rank: number;
  war_rank: number;
  hits_rank: number;
  rbi_rank: number;
  home_run_rank: number;
}

//TODO : 투수의 경우는 다를 거임
export interface PlayerStatsMetrics {
  batting_avg: number;
  home_runs: number;
  hits: number;
  rbi: number;
  runs: number;
  stolen_bases: number;
  on_base_percentage: number;
  ops: number;
}
export interface PlayerStatsResponse {
  season: number;
  player_type: string;
  summary: PlayerStatsSummary;
  metrics: PlayerStatsMetrics;
}
