import { useQuery } from "@tanstack/react-query";
import api from "../instance";
import type { FavoritePlayersResponse } from "./types";

export const useGetFavoritePlayers = () => {
  return useQuery<FavoritePlayersResponse>({
    queryKey: ["favorites"],
    queryFn: () => api.get("v1/favorites").json<FavoritePlayersResponse>(),
  });
};
