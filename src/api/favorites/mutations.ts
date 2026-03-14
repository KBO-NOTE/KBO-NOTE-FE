import { useMutation } from "@tanstack/react-query";
import api from "../instance";

export const useFollowFavoritePlayer = () =>
  useMutation<void, Error, number>({
    mutationFn: async (playerId) => {
      await api.post(`v1/favorites/players/${playerId}`);
    },
  });
