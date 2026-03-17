import { useQuery } from "@tanstack/react-query";
import api from "../instance";
import type { MatchSummaryResponse } from "./types";

/**
 * 특정 선수의 경기 요약 정보를 가져오는 훅
 * @param playerId 선수의 고유 ID
 */
export const useGetMatchSummary = (playerId: number) => {
  return useQuery<MatchSummaryResponse>({
    queryKey: ["match", playerId],
    retry: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      // API 경로가 /api/match/{player_id} 형태이면서
      // 쿼리 파라미터 ?player_id=...도 함께 요구하는 경우를 모두 고려한 작성법입니다.
      return api
        .get(`match/${playerId}`, {
          searchParams: { player_id: String(playerId) },
        })
        .json<MatchSummaryResponse>();
    },
    // playerId가 유효할 때만 쿼리를 실행하도록 설정
    enabled: !!playerId,
  });
};
