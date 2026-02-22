export interface Content {
  id: number;
  title: string;
  article_url: string;
  representative_image_url: string;
  image_count: number;
  like_count: number;
  liked: boolean;
  comment_count: number;
  published_at: string;
}

export interface Comment {
  id: number;
  user_id: number;
  profile_image_url: string;
  nickname: string;
  content: string;
  created_at: string;
}

export interface CommentListResponse {
  comments: Comment[];
  has_next: boolean;
  next_cursor: string;
}

export interface ContentImage {
  id: number;
  image_url: string;
  order: number;
}

export interface ContentImagesResponse {
  images: ContentImage[];
}

export interface LikeResponse {
  content_id: number;
  liked: boolean;
  like_count: number;
}

export interface PostCommentRequest {
  comment: string;
}

export interface PostCommentResponse {
  comment_id: number;
}
