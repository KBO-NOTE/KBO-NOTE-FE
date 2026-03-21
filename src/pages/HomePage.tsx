import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";
import HomeAppBar from "../components/home/HomeAppBar";
import HomePlayerCard from "../components/home/HomePlayerCard";
import { useNavigate } from "react-router-dom";
import HomeFeedItem from "../components/home/HomeFeedItem";
import { useGetPlayerStats } from "../api/stats/queries";
import { useGetMatchSummary } from "../api/match/queries";
import { useGetFeeds } from "../api/feeds/queries";
import { useGetFavoritePlayers } from "../api/favorites/queries";
import type {
  BatterStatsMetrics,
  PitcherStatsMetrics,
} from "../api/stats/types";
import React from "react";
import { useInView } from "react-intersection-observer";
import playersByTeamData from "../data/playersByTeam.json";

interface Player {
  id: string;
  name: string;
}

interface TeamPlayers {
  team: string;
  players: Player[];
}

interface PlayersByTeamData {
  teams: TeamPlayers[];
}

const playersByTeam = playersByTeamData as PlayersByTeamData;

const HomePage = () => {
  const { data: favorites } = useGetFavoritePlayers();
  const playerIds = useMemo(() => favorites?.playerIds ?? [], [favorites]);
  const playerNameById = useMemo(() => {
    return playersByTeam.teams.reduce<Record<number, string>>((acc, team) => {
      team.players.forEach((player) => {
        acc[Number(player.id)] = player.name;
      });
      return acc;
    }, {});
  }, []);

  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
  const activePlayerId = useMemo(() => {
    if (selectedPlayerId !== null && playerIds.includes(selectedPlayerId)) {
      return selectedPlayerId;
    }

    return playerIds[0] ?? null;
  }, [playerIds, selectedPlayerId]);

  const { data: stats } = useGetPlayerStats(activePlayerId ?? 0);
  const { data: matchSummary } = useGetMatchSummary(activePlayerId ?? 0);
  const batterStats =
    stats?.player_type === "BATTER"
      ? (stats.metrics as BatterStatsMetrics)
      : null;
  const pitcherStats =
    stats?.player_type === "PITCHER"
      ? (stats.metrics as PitcherStatsMetrics)
      : null;
  const {
    data: feedList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetFeeds(activePlayerId ?? 0, 5);

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
    navigate(`/feed/${feedId}`);
  };
  return (
    <Container>
      {/* Appbar */}
      <HomeAppBar />
      {/* Player Section */}
      <PlayerSection>
        {playerIds.map((playerId) => (
          <HomePlayerCard
            playerName={playerNameById[playerId] ?? String(playerId)}
            key={playerId}
            isActive={activePlayerId === playerId}
            onClick={() => setSelectedPlayerId(playerId)}
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
          {matchSummary ? (
            <MatchCard>
              <MatchContent>
                <TeamContainer>
                  <TeamLogo />
                  <TeamName>{matchSummary.match.home.team_name}</TeamName>
                </TeamContainer>
                <Score>{matchSummary.match.home_score}</Score>
                <ScoreDivider>:</ScoreDivider>
                <Score primary>{matchSummary.match.away_score}</Score>
                <TeamContainer>
                  <TeamLogo />
                  <TeamName>{matchSummary.match.away.team_name}</TeamName>
                </TeamContainer>
              </MatchContent>
              <MatchInfo>
                <NoticeIcon />
                <MatchDetails>
                  <MatchText>{matchSummary.highlight.text}</MatchText>
                  <InningBadge>
                    {`${matchSummary.match.status} · ${matchSummary.match.inning}`}
                  </InningBadge>
                </MatchDetails>
              </MatchInfo>
            </MatchCard>
          ) : (
            <EmptyCard>오늘 경기 정보가 없습니다.</EmptyCard>
          )}
        </Section>

        {/* Season Stats Section */}
        <Section>
          <SectionTitle>{stats?.season ?? 2025} 시즌 성적</SectionTitle>
          {stats ? (
            <StatsCard>
              <AchievementBadge>
                <TrophyIcon />
                <BadgeScroll>
                  <BadgeText>WAR {stats.summary.war_rank}위</BadgeText>
                  <Dot />
                  <BadgeText>타율 {stats.summary.batting_avg_rank}위</BadgeText>
                  <Dot />
                  <BadgeText>안타 {stats.summary.hits_rank}위</BadgeText>
                  <Dot />
                  <BadgeText>타점 {stats.summary.rbi_rank}위</BadgeText>
                  <Dot />
                  <BadgeText>홈런 {stats.summary.home_run_rank}위</BadgeText>
                </BadgeScroll>
              </AchievementBadge>

              {stats.player_type === "BATTER" ? (
                <StatsGrid>
                  <StatsRow>
                    <StatItem>
                      <StatLabel>타율</StatLabel>
                      <StatValue>{batterStats?.batting_avg}</StatValue>
                    </StatItem>
                    <StatItem>
                      <StatLabel>홈런</StatLabel>
                      <StatValue>{batterStats?.home_runs}</StatValue>
                    </StatItem>
                    <StatItem>
                      <StatLabel>안타</StatLabel>
                      <StatValue>{batterStats?.hits}</StatValue>
                    </StatItem>
                    <StatItem>
                      <StatLabel>타점</StatLabel>
                      <StatValue>{batterStats?.rbi}</StatValue>
                    </StatItem>
                  </StatsRow>
                  <StatsRow>
                    <StatItem>
                      <StatLabel>득점</StatLabel>
                      <StatValue>{batterStats?.runs}</StatValue>
                    </StatItem>
                    <StatItem>
                      <StatLabel>도루</StatLabel>
                      <StatValue>{batterStats?.stolen_bases}</StatValue>
                    </StatItem>
                    <StatItem>
                      <StatLabel>출루율</StatLabel>
                      <StatValue>{batterStats?.on_base_percentage}</StatValue>
                    </StatItem>
                    <StatItem>
                      <StatLabel>OPS</StatLabel>
                      <StatValue>{batterStats?.ops}</StatValue>
                    </StatItem>
                  </StatsRow>
                </StatsGrid>
              ) : (
                <StatsGrid>
                  <StatsRow>
                    <StatItem>
                      <StatLabel>ERA</StatLabel>
                      <StatValue>{pitcherStats?.era}</StatValue>
                    </StatItem>
                    <StatItem>
                      <StatLabel>경기</StatLabel>
                      <StatValue>{pitcherStats?.games}</StatValue>
                    </StatItem>
                    <StatItem>
                      <StatLabel>승패</StatLabel>
                      <StatValue>{pitcherStats?.win_loss}</StatValue>
                    </StatItem>
                    <StatItem>
                      <StatLabel>세이브/홀드</StatLabel>
                      <StatValue>{pitcherStats?.save_hold}</StatValue>
                    </StatItem>
                  </StatsRow>
                  <StatsRow>
                    <StatItem>
                      <StatLabel>이닝</StatLabel>
                      <StatValue>{pitcherStats?.innings_pitched}</StatValue>
                    </StatItem>
                    <StatItem>
                      <StatLabel>탈삼진</StatLabel>
                      <StatValue>{pitcherStats?.strikeouts}</StatValue>
                    </StatItem>
                    <StatItem>
                      <StatLabel>볼넷</StatLabel>
                      <StatValue>{pitcherStats?.walks}</StatValue>
                    </StatItem>
                    <StatItem>
                      <StatLabel>WHIP</StatLabel>
                      <StatValue>{pitcherStats?.whip}</StatValue>
                    </StatItem>
                  </StatsRow>
                </StatsGrid>
              )}
            </StatsCard>
          ) : (
            <EmptyCard>시즌 성적 정보가 없습니다.</EmptyCard>
          )}
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

const EmptyCard = styled.div`
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.light02};
  border-radius: ${theme.radius.xl};
  padding: 20px 16px;
  ${theme.typography.body03}
  color: ${theme.colors.dark03};
`;
