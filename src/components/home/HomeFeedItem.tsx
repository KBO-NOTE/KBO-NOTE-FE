import styled from "styled-components";
import { theme } from "../../styles/theme";

interface HomeFeedItemProps {
  imageSrc?: string;
  likeCount: number;
  commentCount: number;
  title: string;
}

const HomeFeedItem = ({
  imageSrc,
  likeCount,
  commentCount,
  title,
}: HomeFeedItemProps) => {
  return (
    <FeedItemContainer>
      {imageSrc ? (
        <FeedImg src={imageSrc} alt={title} />
      ) : (
        <FeedImagePlaceholder />
      )}
      <FeedContent>
        <FeedMeta>
          <FeedAction>
            <HeartIcon />
            <FeedCount>{likeCount}</FeedCount>
          </FeedAction>
          <FeedAction>
            <ChatIcon />
            <FeedCount>{commentCount}</FeedCount>
          </FeedAction>
        </FeedMeta>
        <FeedTitle>{title}</FeedTitle>
      </FeedContent>
    </FeedItemContainer>
  );
};

export default HomeFeedItem;

const FeedItemContainer = styled.a`
  background: ${theme.colors.white};
  border-radius: ${theme.radius.xl};
  overflow: hidden;
  box-shadow: ${theme.shadows.m};
  text-decoration: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
`;

const FeedImagePlaceholder = styled.div`
  width: 100%;
  height: 220px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const FeedImg = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
`;

const FeedContent = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FeedMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const FeedAction = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const HeartIcon = styled.div`
  width: 24px;
  height: 24px;
  background-color: ${theme.colors.dark01};
  mask: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z' fill='%23111827'/%3E%3C/svg%3E")
    center/contain no-repeat;
`;

const ChatIcon = styled.div`
  width: 24px;
  height: 24px;
  background-color: ${theme.colors.dark01};
  mask: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z' stroke='%23111827' stroke-width='2'/%3E%3C/svg%3E")
    center/contain no-repeat;
`;

const FeedCount = styled.span`
  ${theme.typography.body03}
`;

const FeedTitle = styled.p`
  ${theme.typography.title}
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
