import { useQuery } from "@tanstack/react-query";
import api from "../instance";
import type { PlayerStatsResponse } from "./types";

/**
 * 선수의 시즌 스탯(통계) 정보를 가져오는 훅
 * @param playerId 선수의 고유 ID
 */
export const useGetPlayerStats = (playerId: number) => {
  return useQuery<PlayerStatsResponse>({
    queryKey: ["stats", playerId],
    retry: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      // 경로 파라미터와 쿼리 파라미터를 모두 포함하는 예시 주소 대응
      return api
        .get(`stats/${playerId}`, {
          searchParams: { player_id: String(playerId) },
        })
        .json<PlayerStatsResponse>();
    },
    enabled: !!playerId,
    // 스탯 데이터는 빈번하게 변하지 않으므로 캐시 유효 시간을 적절히 설정 (예: 5분)
    staleTime: 1000 * 60 * 5,
  });
};
