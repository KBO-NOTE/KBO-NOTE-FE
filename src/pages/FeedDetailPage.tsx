import { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { useNavigate, useParams } from "react-router-dom";
import BackSpace from "../assets/icons/backspace_dark.svg";
import Heart from "../assets/icons/heart_01.svg";
import Filled_Heart from "../assets/icons/heart_02.svg";
import Comment from "../assets/icons/chat01.svg";
import Send from "../assets/icons/send.svg";
import { useGetContent, useGetComments } from "../api/contents/queries";
import { usePostLike, usePostComment } from "../api/contents/mutations";

const formatRelativeTime = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) return "방금 전";
  if (diffMinutes < 60) return `${diffMinutes}분전`;
  if (diffHours < 24) return `${diffHours}시간전`;
  return `${diffDays}일전`;
};

const FeedDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const contentId = Number(id);

  const [sortOrder, setSortOrder] = useState<"latest" | "popular">("latest");
  const [commentInput, setCommentInput] = useState("");

  const { data: content, isLoading: isContentLoading } =
    useGetContent(contentId);
  const {
    data: commentPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetComments(contentId, 20, sortOrder);
  const { mutate: toggleLike } = usePostLike(contentId);
  const { mutate: postComment, isPending: isSubmitting } =
    usePostComment(contentId);

  const comments = commentPages?.pages.flatMap((page) => page.comments) ?? [];

  const sentinelRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [handleObserver]);

  const handleBack = () => {
    navigate(-1);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "latest" ? "popular" : "latest");
  };

  const handleSubmitComment = () => {
    if (!commentInput.trim() || isSubmitting) return;
    postComment(
      { comment: commentInput.trim() },
      { onSuccess: () => setCommentInput("") },
    );
  };

  const handleCommentKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmitComment();
    }
  };

  if (isContentLoading || !content) {
    return (
      <Container>
        <AppBar>
          <AppBarContent>
            <BackButton onClick={handleBack}>
              <BackIcon src={BackSpace} alt="뒤로가기" />
            </BackButton>
          </AppBarContent>
        </AppBar>
      </Container>
    );
  }

  return (
    <Container>
      {/* AppBar */}
      <AppBar>
        <AppBarContent>
          <BackButton onClick={handleBack}>
            <BackIcon src={BackSpace} alt="뒤로가기"></BackIcon>
          </BackButton>
          <SortButton onClick={toggleSortOrder}>
            <FilterIcon />
            <SortText>{sortOrder === "latest" ? "최신순" : "인기순"}</SortText>
          </SortButton>
        </AppBarContent>
      </AppBar>

      {/* Main Content Area */}
      <MainContent>
        {/* Feed Content - Left Side */}
        <FeedContent>
          <FeedImage onClick={() => window.open(content.url, "_blank")}>
            <img src={content.representative_image_url} alt="Feed" />
          </FeedImage>
          <FeedInfo>
            <FeedActions>
              <ActionItem onClick={() => toggleLike()}>
                <HeartIcon src={content.liked ? Filled_Heart : Heart} />
                <ActionCount>{content.like_count}</ActionCount>
              </ActionItem>
              <ActionItem>
                <CommentIcon src={Comment} />
                <ActionCount>{content.comment_count}</ActionCount>
              </ActionItem>
            </FeedActions>
            <FeedTitle>{content.title}</FeedTitle>
          </FeedInfo>
        </FeedContent>

        {/* Comment Panel - Right Side */}
        <CommentPanel>
          <CommentListWrapper>
            <CommentList>
              {comments.map((comment) => (
                <CommentItem key={comment.id}>
                  <Avatar>
                    {comment.profile_image_url ? (
                      <AvatarImg
                        src={comment.profile_image_url}
                        alt={comment.nickname}
                      />
                    ) : (
                      <PersonIcon />
                    )}
                  </Avatar>
                  <CommentContent>
                    <CommentHeader>
                      <CommentUsername>{comment.nickname}</CommentUsername>
                      <CommentText>{comment.content}</CommentText>
                    </CommentHeader>
                    <CommentTime>
                      {formatRelativeTime(comment.created_at)}
                    </CommentTime>
                  </CommentContent>
                </CommentItem>
              ))}
              <div ref={sentinelRef} />
              {isFetchingNextPage && <LoadingText>불러오는 중...</LoadingText>}
            </CommentList>
          </CommentListWrapper>

          <CommentInputArea>
            <LikeInfo>
              <LikeInfoRow>
                <LikeInfoLabel>좋아요</LikeInfoLabel>
                <LikeInfoCount>{content.like_count}개</LikeInfoCount>
              </LikeInfoRow>
              <LikeInfoTime>
                {formatRelativeTime(content.published_at)}
              </LikeInfoTime>
            </LikeInfo>
            <CommentInputRow>
              <CommentIcon src={Comment} />
              <CommentInputWrapper>
                <CommentInputField
                  placeholder="댓글 달기..."
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  onKeyDown={handleCommentKeyDown}
                  disabled={isSubmitting}
                />
                <SendButton
                  onClick={handleSubmitComment}
                  disabled={isSubmitting || !commentInput.trim()}
                >
                  <SendIcon src={Send} />
                </SendButton>
              </CommentInputWrapper>
            </CommentInputRow>
          </CommentInputArea>
        </CommentPanel>
      </MainContent>
    </Container>
  );
};

export default FeedDetailPage;

// Styled Components
const Container = styled.div`
  background-color: ${theme.colors.white};
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow: hidden;

  @media (max-width: 768px) {
    height: auto;
    min-height: 100vh;
    overflow: auto;
  }
`;

const AppBar = styled.header`
  background: ${theme.colors.white};
  z-index: 100;
  height: 56px;
  width: 100%;
  max-width: 1034px;
`;

const AppBarContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 16px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 100%;
`;
const BackIcon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;

const SortButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  padding: 8px 0;
`;

const FilterIcon = styled.div`
  width: 24px;
  height: 24px;
  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 3px;
    right: 3px;
    height: 2px;
    background: ${theme.colors.dark01};
    border-radius: 1px;
  }

  &::before {
    top: 6px;
  }

  &::after {
    top: 11px;
    left: 6px;
    right: 6px;
  }

  &::after {
    box-shadow: 0 5px 0 ${theme.colors.dark01};
  }
`;

const SortText = styled.span`
  ${theme.typography.body03}
  color: ${theme.colors.dark01};
`;

const MainContent = styled.main`
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FeedContent = styled.div`
  flex: 1;
  max-width: 640px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const FeedImage = styled.div`
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.white};
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const FeedInfo = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FeedActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const ActionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;

const HeartIcon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;

const CommentIcon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;

const ActionCount = styled.span`
  ${theme.typography.body03}
  color: ${theme.colors.dark02};
`;

const FeedTitle = styled.h1`
  ${theme.typography.title}
  color: ${theme.colors.dark01};
  margin: 0;
`;

const CommentPanel = styled.aside`
  width: 394px;
  border-left: 1px solid ${theme.colors.light02};
  border-top: 1px solid ${theme.colors.light02};
  display: flex;
  flex-direction: column;
  height: calc(100vh - 56px);
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
    border-left: none;
    height: auto;
    min-height: 400px;
  }
`;

const CommentListWrapper = styled.div`
  flex: 1;
  overflow-y: auto;

  @media (max-width: 768px) {
    flex: none;
    overflow-y: visible;
  }
`;

const CommentList = styled.div`
  padding: 31px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 768px) {
    padding-bottom: 150px;
  }
`;

const CommentItem = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${theme.radius.full};
  background: ${theme.colors.light02};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
`;

const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PersonIcon = styled.div`
  width: 24px;
  height: 24px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 18px;
    height: 18px;
    background: url("data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='9' cy='5' r='3.5' stroke='%239CA3AF' stroke-width='1.5'/%3E%3Cpath d='M2 15.5C2 12.46 4.69 10 8 10H10C13.31 10 16 12.46 16 15.5' stroke='%239CA3AF' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")
      center no-repeat;
    background-size: contain;
  }
`;

const CommentContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CommentHeader = styled.div`
  display: flex;
  flex-direction: column;
  ${theme.typography.body03}
  color: ${theme.colors.dark01};
`;

const CommentUsername = styled.span`
  ${theme.typography.body02}
  color: ${theme.colors.dark01};
`;

const CommentText = styled.span`
  ${theme.typography.body03}
  color: ${theme.colors.dark01};
`;

const CommentTime = styled.span`
  ${theme.typography.caption02}
  color: ${theme.colors.dark04};
`;

const LoadingText = styled.div`
  ${theme.typography.caption02}
  color: ${theme.colors.dark04};
  text-align: center;
  padding: 8px 0;
`;

const CommentInputArea = styled.div`
  padding: 8px 16px;
  border-top: 1px solid ${theme.colors.light02};
  background: ${theme.colors.white};
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 100;
  }
`;

const LikeInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const LikeInfoRow = styled.div`
  display: flex;
  gap: 4px;
  ${theme.typography.body02}
  color: ${theme.colors.dark01};
`;

const LikeInfoLabel = styled.span``;

const LikeInfoCount = styled.span``;

const LikeInfoTime = styled.span`
  ${theme.typography.caption02}
  color: ${theme.colors.dark04};
`;

const CommentInputRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const CommentInputWrapper = styled.div`
  flex: 1;
  background: ${theme.colors.light01};
  border-radius: ${theme.radius.full};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
`;

const CommentInputField = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  ${theme.typography.body03}
  color: ${theme.colors.dark01};

  &::placeholder {
    color: ${theme.colors.dark01};
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.5;
  }
`;

const SendButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;
const SendIcon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;
