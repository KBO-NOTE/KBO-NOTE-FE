import styled from "styled-components";

const HomePage = () => {
  return (
    <Container>
      {/* Appbar */}
      <Appbar>
        <AppbarContent>
          <Logo>KBO NOTE</Logo>
          <AppbarActions>
            <IconButton>
              <WriteIcon />
            </IconButton>
            <IconButton>
              <SettingIcon />
            </IconButton>
          </AppbarActions>
        </AppbarContent>
      </Appbar>
      {/* Player Section */}
      <PlayerSection>
        <PlayerCard active>
          <PlayerImage active>
            <PlayerImageInner />
          </PlayerImage>
          <PlayerName active>양의지</PlayerName>
        </PlayerCard>
        <PlayerCard>
          <PlayerImage>
            <PlayerImageInner />
          </PlayerImage>
          <PlayerName>강승호</PlayerName>
        </PlayerCard>
        <PlayerCard>
          <PlayerImage>
            <PlayerImageInner />
          </PlayerImage>
          <PlayerName>김기연</PlayerName>
        </PlayerCard>
        <PlayerAddCard>
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
                <TeamName>한화이글스</TeamName>
              </TeamContainer>
              <Score>3</Score>
              <ScoreDivider>:</ScoreDivider>
              <Score primary>7</Score>
              <TeamContainer>
                <TeamLogo />
                <TeamName>엘지트윈스</TeamName>
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
                <BadgeText>타율 1위</BadgeText>
                <Dot />
                <BadgeText>WAR 4위</BadgeText>
                <Dot />
                <BadgeText>안타 8위</BadgeText>
                <Dot />
                <BadgeText>타점 10위</BadgeText>
                <Dot />
                <BadgeText>홈런 13위</BadgeText>
              </BadgeScroll>
            </AchievementBadge>

            <StatsGrid>
              <StatsRow>
                <StatItem>
                  <StatLabel>타율</StatLabel>
                  <StatValue>0.337</StatValue>
                </StatItem>
                <StatItem>
                  <StatLabel>홈런</StatLabel>
                  <StatValue>20</StatValue>
                </StatItem>
                <StatItem>
                  <StatLabel>안타</StatLabel>
                  <StatValue>153</StatValue>
                </StatItem>
                <StatItem>
                  <StatLabel>타점</StatLabel>
                  <StatValue>89</StatValue>
                </StatItem>
              </StatsRow>
              <StatsRow>
                <StatItem>
                  <StatLabel>득점</StatLabel>
                  <StatValue>56</StatValue>
                </StatItem>
                <StatItem>
                  <StatLabel>도루</StatLabel>
                  <StatValue>4</StatValue>
                </StatItem>
                <StatItem>
                  <StatLabel>출루율</StatLabel>
                  <StatValue>0.406</StatValue>
                </StatItem>
                <StatItem>
                  <StatLabel>OPS</StatLabel>
                  <StatValue>0.939</StatValue>
                </StatItem>
              </StatsRow>
            </StatsGrid>
          </StatsCard>
        </Section>

        {/* KBO Feed Section */}
        <Section>
          <SectionTitle>KBO Feed</SectionTitle>
          <FeedList>
            <FeedItem>
              <FeedImage />
              <FeedContent>
                <FeedMeta>
                  <FeedAction>
                    <HeartIcon />
                    <FeedCount>234</FeedCount>
                  </FeedAction>
                  <FeedAction>
                    <ChatIcon />
                    <FeedCount>7</FeedCount>
                  </FeedAction>
                </FeedMeta>
                <FeedTitle>
                  '김동주→김현수→양의지' 곰 동굴에서 역대 3번째 타격왕 등장
                </FeedTitle>
              </FeedContent>
            </FeedItem>

            <FeedItem>
              <FeedImage />
              <FeedContent>
                <FeedMeta>
                  <FeedAction>
                    <HeartIcon />
                    <FeedCount>372</FeedCount>
                  </FeedAction>
                  <FeedAction>
                    <ChatIcon />
                    <FeedCount>32</FeedCount>
                  </FeedAction>
                </FeedMeta>
                <FeedTitle>
                  두목곰 양의지, 6년 만의 타격왕 복귀…'올해의 반전상' 품에 안다
                </FeedTitle>
              </FeedContent>
            </FeedItem>
          </FeedList>
        </Section>
      </ContentContainer>
    </Container>
  );
};

export default HomePage;

// Styled Components
const Container = styled.div`
  background-color: #f4f6f9;
  min-height: 100vh;
  position: relative;
  width: 100%;
`;

const Appbar = styled.div`
  background-color: #007aff;
  height: 110px;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const AppbarContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  position: absolute;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
`;

const Logo = styled.h1`
  font-family: "Airlash Raiders", sans-serif;
  font-size: 20px;
  color: white;
  margin: 0;
  font-weight: normal;
  letter-spacing: 1.32px;
`;

const AppbarActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
`;

const IconButton = styled.button`
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const WriteIcon = styled.div`
  width: 24px;
  height: 24px;
  background-color: white;
  mask: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z' fill='white'/%3E%3C/svg%3E")
    center/contain no-repeat;
`;

const SettingIcon = styled.div`
  width: 24px;
  height: 24px;
  background-color: white;
  mask: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='12' cy='12' r='3' stroke='white' stroke-width='2'/%3E%3Cpath d='M12 1v6m0 6v10M23 12h-6m-4 0H1' stroke='white' stroke-width='2'/%3E%3C/svg%3E")
    center/contain no-repeat;
`;

const PlayerSection = styled.div`
  position: absolute;
  top: 142px;
  left: 16px;
  right: 16px;
  background: white;
  border-radius: 20px;
  padding: 12px 16px;
  display: flex;
  gap: 9px;
  overflow-x: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.16);
  z-index: 50;
`;

const PlayerCard = styled.div<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  cursor: pointer;
`;

const PlayerImage = styled.div<{ active?: boolean }>`
  width: 72px;
  height: 72px;
  border-radius: 13.5px;
  border: ${(props) =>
    props.active ? "1.125px solid #007aff" : "1px solid #eaecee"};
  box-shadow: ${(props) =>
    props.active ? "0px 0px 6.75px 0px rgba(0, 44, 103, 0.5)" : "none"};
  overflow: hidden;
  position: relative;
  background-color: #f9f9f9;
`;

const PlayerImageInner = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%);
`;

const PlayerName = styled.p<{ active?: boolean }>`
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: -0.56px;
  color: ${(props) => (props.active ? "#111827" : "#9ca3af")};
  margin: 0;
  text-align: center;
`;

const PlayerAddCard = styled.button`
  width: 72px;
  height: 72px;
  border-radius: 12px;
  border: 1px solid #eaecee;
  background: white;
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
    background-color: #9ca3af;
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
  font-family: "Pretendard", sans-serif;
  font-size: 22px;
  font-weight: 600;
  line-height: 30px;
  letter-spacing: -0.88px;
  color: #111827;
  margin: 0;
`;

const MatchCard = styled.div`
  background: white;
  border: 1px solid #eaecee;
  border-radius: 20px;
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
  border-radius: 8px;
  background: linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%);
`;

const TeamName = styled.p`
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: -0.56px;
  color: #9ca3af;
  margin: 0;
`;

const Score = styled.p<{ primary?: boolean }>`
  font-family: "Rocket Command", sans-serif;
  font-size: 56px;
  font-weight: 400;
  line-height: 36px;
  letter-spacing: -2.24px;
  color: ${(props) => (props.primary ? "#007aff" : "#111827")};
  margin: 0;
`;

const ScoreDivider = styled.p`
  font-family: "Pretendard", sans-serif;
  font-size: 28px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: -1.12px;
  color: #111827;
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
  background-color: #111827;
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
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: -0.56px;
  color: #1b1b1b;
  margin: 0;
`;

const InningBadge = styled.div`
  background-color: #eaecee;
  border-radius: 999px;
  padding: 4px 12px;
  font-family: "Pretendard", sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  color: #374151;
`;

const StatsCard = styled.div`
  background: white;
  border: 1px solid #eaecee;
  border-radius: 20px;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const AchievementBadge = styled.div`
  background: linear-gradient(90deg, #0066d3 0%, #004996 100%);
  border-radius: 8px;
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
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: -0.56px;
  color: white;
  white-space: nowrap;
  flex-shrink: 0;
`;

const Dot = styled.div`
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background-color: white;
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
  background-color: #fafbfd;
  border-radius: 8px;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StatLabel = styled.p`
  font-family: "Pretendard", sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  color: #6b7280;
  margin: 0;
`;

const StatValue = styled.p`
  font-family: "Pretendard", sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: -0.64px;
  color: #111827;
  margin: 0;
`;

const FeedList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FeedItem = styled.a`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.16);
  text-decoration: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
`;

const FeedImage = styled.div`
  width: 100%;
  height: 220px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
  background-color: #111827;
  mask: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z' fill='%23111827'/%3E%3C/svg%3E")
    center/contain no-repeat;
`;

const ChatIcon = styled.div`
  width: 24px;
  height: 24px;
  background-color: #111827;
  mask: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z' stroke='%23111827' stroke-width='2'/%3E%3C/svg%3E")
    center/contain no-repeat;
`;

const FeedCount = styled.span`
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: -0.56px;
  color: #111827;
`;

const FeedTitle = styled.p`
  font-family: "Pretendard", sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 26px;
  letter-spacing: -0.72px;
  color: #111827;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
