import { useInfiniteQuery } from "@tanstack/react-query";
import api from "../instance";
import type { FeedListResponse } from "./types";

export const useGetFeeds = (playerId: number, size: number = 5) => {
  return useInfiniteQuery<FeedListResponse>({
    queryKey: ["feeds", playerId],
    retry: false,
    refetchOnWindowFocus: false,
    queryFn: async ({ pageParam }) => {
      const searchParams: Record<string, string> = { size: String(size) };
      if (pageParam) {
        searchParams.cursor = (pageParam as string).replace(/=/g, "");
      }
      console.log(searchParams.cursor);
      return api
        .get(`players/${playerId}/feeds`, { searchParams })
        .json<FeedListResponse>();
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) =>
      lastPage.has_next ? lastPage.next_cursor?.replace(/=/g, "") : undefined,
    enabled: !!playerId,
  });
};
