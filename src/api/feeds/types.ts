export interface FeedItem {
  content_id: number;
  title: string;
  platform: string;
  presentative_image_url: string;
  liked: boolean;
  like_count: number;
  comment_count: number;
  published_at: string;
}

export interface FeedListResponse {
  items: FeedItem[];
  has_next: boolean;
  next_cursor: string;
}
