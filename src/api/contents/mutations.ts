import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../instance";
import type {
  LikeResponse,
  PostCommentRequest,
  PostCommentResponse,
} from "./types";

export const usePostLike = (contentId: number) => {
  const queryClient = useQueryClient();

  return useMutation<LikeResponse>({
    mutationFn: () =>
      api.post(`contents/${contentId}/like`).json<LikeResponse>(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content", contentId] });
      queryClient.invalidateQueries({ queryKey: ["feeds"] });
    },
  });
};

export const usePostComment = (contentId: number) => {
  const queryClient = useQueryClient();

  return useMutation<PostCommentResponse, Error, PostCommentRequest>({
    mutationFn: (body) =>
      api
        .post(`contents/${contentId}/comments`, { json: body })
        .json<PostCommentResponse>(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", contentId] });
      queryClient.invalidateQueries({ queryKey: ["content", contentId] });
    },
  });
};
