export interface MatchDetailInfo {
  home: MatchTeamInfo;
  away: MatchTeamInfo;
  home_score: number;
  away_score: number;
  inning: string;
  status: string;
}

export interface HighlightDetailInfo {
  order: number;
  total: number;
  text: string;
  has_audio: boolean;
}

export interface MatchTeamInfo {
  team_id: string;
  team_name: string;
}
export interface MatchSummaryResponse {
  date: string;
  match: MatchDetailInfo;
  highlight: HighlightDetailInfo;
}
