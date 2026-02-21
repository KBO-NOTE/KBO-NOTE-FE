import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import api from "../instance";
import type {
  Content,
  CommentListResponse,
  ContentImagesResponse,
} from "./types";

export const useGetContent = (contentId: number) => {
  return useQuery<Content>({
    queryKey: ["content", contentId],
    queryFn: () => api.get(`contents/${contentId}`).json<Content>(),
  });
};

export const useGetComments = (
  contentId: number,
  size: number = 20,
  sort: string = "latest"
) => {
  return useInfiniteQuery<CommentListResponse>({
    queryKey: ["comments", contentId, sort],
    queryFn: async ({ pageParam }) => {
      const searchParams: Record<string, string> = {
        size: String(size),
        sort,
      };
      if (pageParam) {
        searchParams.cursor = pageParam as string;
      }
      return api
        .get(`contents/${contentId}/comment`, { searchParams })
        .json<CommentListResponse>();
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) =>
      lastPage.has_next ? lastPage.next_cursor : undefined,
  });
};

export const useGetContentImages = (contentId: number) => {
  return useQuery<ContentImagesResponse>({
    queryKey: ["contentImages", contentId],
    queryFn: () =>
      api.get(`contents/${contentId}/images`).json<ContentImagesResponse>(),
  });
};
