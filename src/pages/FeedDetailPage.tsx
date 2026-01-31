import { useState } from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { useNavigate } from "react-router-dom";

// Mock 댓글 데이터
const mockComments = [
  {
    id: 1,
    username: "곰돌이포수88",
    content: "드디어 우리 포수가 타격왕이라니 ㅠㅠ 진짜 전설이다.",
    time: "2분전",
  },
  {
    id: 2,
    username: "두린이23",
    content: "양의지 타격은 진짜 교과서지… 타격폼 보면 미쳤음.",
    time: "13분전",
  },
  {
    id: 3,
    username: "헬스곰곰이",
    content: "김동주→김현수→양의지… 이 계보 진짜 실화냐 ㄷㄷ",
    time: "30분전",
  },
  {
    id: 4,
    username: "리틀베어",
    content: "나 초등학생 때 김현수 봤는데, 이젠 양의지가… 세월 빠르다.",
    time: "1시간전",
  },
  {
    id: 5,
    username: "타율0점대싫어",
    content: "올해 타격폼 유지한 게 진짜 대단함. 체력관리도 완벽.",
    time: "1시간전",
  },
  {
    id: 6,
    username: "야알못탈출중",
    content: "야구는 몰라도 양의지는 알겠다",
    time: "2시간전",
  },
  {
    id: 7,
    username: "잠실직관러",
    content: "직관 갔을 때 홈런 친 그날 잊을 수가 없다",
    time: "3시간전",
  },
  {
    id: 8,
    username: "BaseKing91",
    content: "이제는 '곰의 왕'이라고 불러도 무방함",
    time: "3시간전",
  },
];

// Mock 피드 데이터
const mockFeedDetail = {
  id: 1,
  imageSrc: "https://www.figma.com/api/mcp/asset/375a9cfa-a008-47ec-88f6-d114b3063634",
  likeCount: 234,
  commentCount: 7,
  title: "'김동주→김현수→양의지' 곰 동굴에서 역대 3번째 타격왕 등장",
  time: "3시간전",
};

const FeedDetailPage = () => {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState<"latest" | "popular">("latest");
  const [commentInput, setCommentInput] = useState("");

  const handleBack = () => {
    navigate(-1);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "latest" ? "popular" : "latest");
  };

  return (
    <Container>
      {/* AppBar */}
      <AppBar>
        <AppBarContent>
          <BackButton onClick={handleBack}>
            <BackIcon />
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
          <FeedImage>
            <img src={mockFeedDetail.imageSrc} alt="Feed" />
          </FeedImage>
          <FeedInfo>
            <FeedActions>
              <ActionItem>
                <HeartIcon />
                <ActionCount>{mockFeedDetail.likeCount}</ActionCount>
              </ActionItem>
              <ActionItem>
                <CommentIcon />
                <ActionCount>{mockFeedDetail.commentCount}</ActionCount>
              </ActionItem>
            </FeedActions>
            <FeedTitle>{mockFeedDetail.title}</FeedTitle>
          </FeedInfo>
        </FeedContent>

        {/* Comment Panel - Right Side */}
        <CommentPanel>
          <CommentList>
            {mockComments.map((comment) => (
              <CommentItem key={comment.id}>
                <Avatar>
                  <PersonIcon />
                </Avatar>
                <CommentContent>
                  <CommentHeader>
                    <CommentUsername>{comment.username}</CommentUsername>
                    <CommentText>{comment.content}</CommentText>
                  </CommentHeader>
                  <CommentTime>{comment.time}</CommentTime>
                </CommentContent>
              </CommentItem>
            ))}
          </CommentList>

          <CommentInputArea>
            <LikeInfo>
              <LikeInfoRow>
                <LikeInfoLabel>좋아요</LikeInfoLabel>
                <LikeInfoCount>{mockFeedDetail.likeCount}개</LikeInfoCount>
              </LikeInfoRow>
              <LikeInfoTime>{mockFeedDetail.time}</LikeInfoTime>
            </LikeInfo>
            <CommentInputRow>
              <ChatIcon />
              <CommentInputWrapper>
                <CommentInputField
                  placeholder="댓글 달기..."
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                />
                <SendButton>
                  <SendIcon />
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
  min-height: 100vh;
  position: relative;
  width: 100%;
`;

const AppBar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: ${theme.colors.white};
  z-index: 100;
  height: 56px;
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

const BackIcon = styled.div`
  width: 15.58px;
  height: 15.17px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    border-left: 2px solid ${theme.colors.dark01};
    border-bottom: 2px solid ${theme.colors.dark01};
    transform: rotate(45deg);
    top: 50%;
    left: 50%;
    margin-left: -3px;
    margin-top: -5px;
  }
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
  padding-top: 56px;
  min-height: 100vh;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FeedContent = styled.div`
  flex: 1;
  max-width: 394px;

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
`;

const HeartIcon = styled.div`
  width: 24px;
  height: 24px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 18px;
    background: url("data:image/svg+xml,%3Csvg width='20' height='18' viewBox='0 0 20 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 17.25C10 17.25 1.5 12 1.5 6.5C1.5 3.46 3.96 1 7 1C8.83 1 10.41 1.95 11.25 3.36C11.66 2.54 12.28 1.85 13.04 1.34C13.8 0.83 14.67 0.52 15.58 0.42C16.49 0.32 17.41 0.45 18.26 0.79C19.11 1.13 19.87 1.67 20.46 2.37C21.06 3.07 21.47 3.9 21.66 4.79C21.85 5.68 21.82 6.6 21.57 7.48C21.31 8.35 20.85 9.15 20.21 9.81C19.57 10.46 18.77 10.95 17.89 11.24' stroke='%23374151' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
      center no-repeat;
    background-size: contain;
  }
`;

const CommentIcon = styled.div`
  width: 24px;
  height: 24px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    background: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18 9.5C18 14.19 14.19 18 9.5 18L4.6 19.8C4.17 19.97 3.7 19.7 3.53 19.27C3.47 19.13 3.45 18.97 3.49 18.82L4.5 14.97C3.55 13.44 3 11.57 3 9.5C3 4.81 6.81 1 11.5 1C16.19 1 20 4.81 20 9.5' stroke='%23374151' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M7 9.5H13' stroke='%23374151' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")
      center no-repeat;
    background-size: contain;
  }
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

const CommentList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 31px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
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

const CommentInputArea = styled.div`
  padding: 8px 16px 44px;
  border-top: 1px solid ${theme.colors.light02};
  background: ${theme.colors.white};
  display: flex;
  flex-direction: column;
  gap: 12px;
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

const ChatIcon = styled.div`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 18px;
    height: 18px;
    background: url("data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 8.5C16 12.64 12.64 16 8.5 16L4.4 17.6C4.02 17.75 3.6 17.53 3.45 17.15C3.4 17.03 3.38 16.89 3.42 16.76L4.3 13.47C3.48 12.16 3 10.56 3 8.5C3 4.36 6.36 1 10.5 1C14.64 1 18 4.36 18 8.5' stroke='%23374151' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
      center no-repeat;
    background-size: contain;
  }
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
`;

const SendButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SendIcon = styled.div`
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
    background: url("data:image/svg+xml,%3Csvg width='18' height='20' viewBox='0 0 18 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M17 1L8 10M17 1L11 19L8 10M17 1L1 8L8 10' stroke='%23374151' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
      center no-repeat;
    background-size: contain;
  }
`;
