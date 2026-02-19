import { useState, useEffect } from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";
import HomeAppBar from "../components/home/HomeAppBar";
import HomePlayerCard from "../components/home/HomePlayerCard";
import { useNavigate } from "react-router-dom";
import HomeFeedItem from "../components/home/HomeFeedItem";
import { useGetPlayerStats } from "../api/stats/queries";
import { useGetMatchSummary } from "../api/match/queries";
import { useGetFeeds } from "../api/feeds/queries";
import React from "react";
import { useInView } from "react-intersection-observer";

// const mockFeedData = [
//   {
//     id: 1,
//     imageSrc: "",
//     likeCount: 234,
//     commentCount: 7,
//     title: "'김동주→김현수→양의지' 곰 동굴에서 역대 3번째 타격왕 등장",
//   },
//   {
//     id: 2,
//     imageSrc: "",
//     likeCount: 372,
//     commentCount: 32,
//     title: "두목곰 양의지, 6년 만의 타격왕 복귀…'올해의 반전상' 품에 안다",
//   },
// ];
interface PlayerListItem {
  id: number;
  name: string;
  team?: string; // 팀 정보가 필요할 경우를 대비한 선택적 프로퍼티
}

const HomePage = () => {
  const testPlayerList: PlayerListItem[] = [
    { id: 251, name: "양의지" },
    { id: 252, name: "김기연" },
    { id: 253, name: "강승호" },
  ];
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState<number>(0);

  const { data: stats } = useGetPlayerStats(
    testPlayerList[selectedPlayerIndex].id,
  );
  const { data: matchSummary } = useGetMatchSummary(
    testPlayerList[selectedPlayerIndex].id,
  );
  const {
    data: feedList, // 전체 페이지 데이터 (pages 배열 포함)
    fetchNextPage, // 다음 페이지를 불러오는 함수
    hasNextPage, // 다음 페이지가 있는지 여부 (boolean)
    isFetchingNextPage, // 다음 페이지를 불러오는 중인지 여부
    status: _status, // 초기 로딩 상태 ('pending', 'error', 'success')
    error: _error, // 에러 객체
  } = useGetFeeds(testPlayerList[selectedPlayerIndex].id, 5); // 5개씩 가져오기

  const { ref: feedEndRef, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const navigate = useNavigate();

  const onPlayerAddClick = () => {
    navigate("/landing2");
  };
  const onFeedClick = (feedId: number) => {
    console.log("dddd");
    navigate(`/feed/${feedId}`);
  };
  return (
    <Container>
      {/* Appbar */}
      <HomeAppBar />
      {/* Player Section */}
      <PlayerSection>
        {testPlayerList.map((value, _) => (
          <HomePlayerCard
            playerName={value.name}
            key={value.id}
            isActive={selectedPlayerIndex === value.id}
            onClick={() => setSelectedPlayerIndex(value.id)}
          />
        ))}
        <PlayerAddCard onClick={onPlayerAddClick}>
          <PlusIcon />
        </PlayerAddCard>
      </PlayerSection>
      {/* Content Container */}
      <ContentContainer>
        {/* Today's Match Section */}
        <Section>
          <SectionTitle>Today's Match</SectionTitle>
          <MatchCard>
            <MatchContent>
              <TeamContainer>
                <TeamLogo />
                <TeamName>{matchSummary?.match.home.team_name}</TeamName>
              </TeamContainer>
              <Score>{matchSummary?.match.home_score}</Score>
              <ScoreDivider>:</ScoreDivider>
              <Score primary>{matchSummary?.match.away_score}</Score>
              <TeamContainer>
                <TeamLogo />
                <TeamName>{matchSummary?.match.away.team_name}</TeamName>
              </TeamContainer>
            </MatchContent>
            <MatchInfo>
              <NoticeIcon />
              <MatchDetails>
                <MatchText>안타(타점1) 삼진 땅볼 뜬공</MatchText>
                <InningBadge>1 / 4</InningBadge>
              </MatchDetails>
            </MatchInfo>
          </MatchCard>
        </Section>

        {/* Season Stats Section */}
        <Section>
          <SectionTitle>2025 시즌 성적</SectionTitle>
          <StatsCard>
            <AchievementBadge>
              <TrophyIcon />
              <BadgeScroll>
                <BadgeText>타율 {stats?.summary.batting_avg_rank}위</BadgeText>
                <Dot />
                <BadgeText>WAR {stats?.summary.war_rank}위</BadgeText>
                <Dot />
                <BadgeText>안타 {stats?.summary.hits_rank}위</BadgeText>
                <Dot />
                <BadgeText>타점 {stats?.summary.rbi_rank}위</BadgeText>
                <Dot />
                <BadgeText>홈런 {stats?.summary.home_run_rank}위</BadgeText>
              </BadgeScroll>
            </AchievementBadge>

            <StatsGrid>
              <StatsRow>
                <StatItem>
                  <StatLabel>타율</StatLabel>
                  <StatValue>{stats?.metrics.batting_avg}</StatValue>
                </StatItem>
                <StatItem>
                  <StatLabel>홈런</StatLabel>
                  <StatValue>{stats?.metrics.home_runs}</StatValue>
                </StatItem>
                <StatItem>
                  <StatLabel>안타</StatLabel>
                  <StatValue>{stats?.metrics.hits}</StatValue>
                </StatItem>
                <StatItem>
                  <StatLabel>타점</StatLabel>
                  <StatValue>{stats?.metrics.rbi}</StatValue>
                </StatItem>
              </StatsRow>
              <StatsRow>
                <StatItem>
                  <StatLabel>득점</StatLabel>
                  <StatValue>{stats?.metrics.runs}</StatValue>
                </StatItem>
                <StatItem>
                  <StatLabel>도루</StatLabel>
                  <StatValue>{stats?.metrics.stolen_bases}</StatValue>
                </StatItem>
                <StatItem>
                  <StatLabel>출루율</StatLabel>
                  <StatValue>{stats?.metrics.on_base_percentage}</StatValue>
                </StatItem>
                <StatItem>
                  <StatLabel>OPS</StatLabel>
                  <StatValue>{stats?.metrics.ops}</StatValue>
                </StatItem>
              </StatsRow>
            </StatsGrid>
          </StatsCard>
        </Section>

        {/* KBO Feed Section */}
        <Section>
          <SectionTitle>KBO Feed</SectionTitle>
          <FeedList>
            {feedList?.pages.map((page, pageIndex) => (
              <React.Fragment key={pageIndex}>
                {page.items.map((feed) => (
                  <HomeFeedItem
                    key={feed.content_id}
                    contentId={feed.content_id}
                    imageSrc={feed.representative_image_url}
                    likeCount={feed.like_count}
                    commentCount={feed.comment_count}
                    title={feed.title}
                    onClick={() => onFeedClick(feed.content_id)}
                  />
                ))}
              </React.Fragment>
            ))}
            <div ref={feedEndRef} />
            {isFetchingNextPage && <LoadingText>불러오는 중...</LoadingText>}
          </FeedList>
        </Section>
      </ContentContainer>
    </Container>
  );
};

export default HomePage;

// Styled Components
const Container = styled.div`
  background-color: ${theme.colors.bg01};
  min-height: 100vh;
  position: relative;
  width: 100%;
`;

const PlayerSection = styled.div`
  position: absolute;
  top: 142px;
  left: 16px;
  right: 16px;
  background: ${theme.colors.white};
  border-radius: ${theme.radius.xl};
  padding: 12px 16px;
  display: flex;
  gap: 9px;
  overflow-x: auto;
  box-shadow: ${theme.shadows.m};
  z-index: 50;
`;

const PlayerAddCard = styled.button`
  width: 72px;
  height: 72px;
  border-radius: ${theme.radius.m};
  border: 1px solid ${theme.colors.light02};
  background: ${theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
`;

const PlusIcon = styled.div`
  width: 32px;
  height: 32px;
  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
    background-color: ${theme.colors.dark04};
  }

  &::before {
    width: 2px;
    height: 18px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &::after {
    width: 18px;
    height: 2px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

const ContentContainer = styled.div`
  padding: 296px 16px 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SectionTitle = styled.h2`
  ${theme.typography.h2}
  margin: 0;
`;

const MatchCard = styled.div`
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.light02};
  border-radius: ${theme.radius.xl};
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MatchContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
`;

const TeamContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const TeamLogo = styled.div`
  width: 64px;
  height: 64px;
  border-radius: ${theme.radius.s};
  background: linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%);
`;

const TeamName = styled.p`
  ${theme.typography.body03}
  color: ${theme.colors.dark04};
  margin: 0;
`;

const Score = styled.p<{ primary?: boolean }>`
  font-family: "Rocket Command", sans-serif;
  font-size: 56px;
  font-weight: 400;
  line-height: 36px;
  letter-spacing: -2.24px;
  color: ${(props) =>
    props.primary ? theme.colors.primary500 : theme.colors.dark01};
  margin: 0;
`;

const ScoreDivider = styled.p`
  ${theme.typography.h1}
  margin: 0;
`;

const MatchInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const NoticeIcon = styled.div`
  width: 24px;
  height: 24px;
  background-color: ${theme.colors.dark01};
  mask: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' stroke='%23111827' stroke-width='2'/%3E%3C/svg%3E")
    center/contain no-repeat;
  flex-shrink: 0;
`;

const MatchDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const MatchText = styled.p`
  ${theme.typography.body03}
  margin: 0;
`;

const InningBadge = styled.div`
  background-color: ${theme.colors.light02};
  border-radius: ${theme.radius.full};
  padding: 4px 12px;
  ${theme.typography.caption01}
  color: ${theme.colors.dark02};
`;

const StatsCard = styled.div`
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.light02};
  border-radius: ${theme.radius.xl};
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const AchievementBadge = styled.div`
  background: linear-gradient(
    90deg,
    ${theme.colors.primary600} 0%,
    #004996 100%
  );
  border-radius: ${theme.radius.s};
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;
`;

const TrophyIcon = styled.div`
  width: 16px;
  height: 16px;
  background-color: #ffd700;
  border-radius: 2px;
  flex-shrink: 0;
`;

const BadgeScroll = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  overflow-x: auto;
  flex: 1;
  min-width: 0;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const BadgeText = styled.span`
  ${theme.typography.body03}
  color: ${theme.colors.white};
  white-space: nowrap;
  flex-shrink: 0;
`;

const Dot = styled.div`
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background-color: ${theme.colors.white};
  opacity: 0.6;
  flex-shrink: 0;
`;

const StatsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StatsRow = styled.div`
  display: flex;
  gap: 8px;
`;

const StatItem = styled.div`
  flex: 1;
  background-color: ${theme.colors.light01};
  border-radius: ${theme.radius.s};
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StatLabel = styled.p`
  ${theme.typography.caption01}
  color: ${theme.colors.dark03};
  margin: 0;
`;

const StatValue = styled.p`
  ${theme.typography.body01}
  font-weight: 600;
  margin: 0;
`;

const FeedList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const LoadingText = styled.p`
  ${theme.typography.body03}
  color: ${theme.colors.dark03};
  text-align: center;
  margin: 0;
  padding: 8px 0;
`;
