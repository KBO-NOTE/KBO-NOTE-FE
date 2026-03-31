import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";
import SelectTeamActive from "../components/landingPage/SelectTeamActive";
import SelectTeamDefault from "../components/landingPage/SelectTeamDefault";
import SearchIcon from "../assets/icons/search.svg";
import PopularFilter from "../components/landingPage/Popular";
import PlayerCardActive from "../components/landingPage/Active";
import PlayerCardDefault from "../components/landingPage/Default";
import Button from "../components/button/ButtonDefault";
import ButtonGray from "../components/button/ButtonGray";
import { useNavigate } from "react-router-dom";
import { useFollowFavoritePlayer } from "../api/favorites/mutations";
import playersByTeamData from "../data/playersByTeam.json";

const TEAMS = [
  { id: "doosan", name: "두산 베어스" },
  { id: "lotte", name: "롯데 자이언츠" },
  { id: "samsung", name: "삼성 라이온즈" },
  { id: "kiwoom", name: "키움 히어로즈" },
  { id: "hanwha", name: "한화 이글스" },
  { id: "kia", name: "KIA 타이거즈" },
  { id: "kt", name: "KT 위즈" },
  { id: "lg", name: "LG 트윈스" },
  { id: "nc", name: "NC 다이노스" },
  { id: "ssg", name: "SSG 랜더스" },
];

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
const SELECTED_PLAYERS_STORAGE_KEY = "selectedFavoritePlayerIds";
const TEAM_NAME_BY_ID: Record<string, string> = {
  doosan: "두산",
  lotte: "롯데",
  samsung: "삼성",
  kiwoom: "키움",
  hanwha: "한화",
  kia: "KIA",
  kt: "KT",
  lg: "LG",
  nc: "NC",
  ssg: "SSG",
};

const LandingPage02 = () => {
  const navigate = useNavigate();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [selectedTeam, setSelectedTeam] = useState("doosan");
  const [selectedPlayerIds, setSelectedPlayerIds] = useState<number[]>(() => {
    const stored = localStorage.getItem(SELECTED_PLAYERS_STORAGE_KEY);

    if (!stored) {
      return [];
    }

    try {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed)
        ? parsed.filter((value): value is number => typeof value === "number")
        : [];
    } catch {
      return [];
    }
  });
  const followFavoritePlayer = useFollowFavoritePlayer();

  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (!scrollArea) return;

    let isDown = false;
    let startX = 0;
    let startScrollLeft = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      startX = e.clientX;
      startScrollLeft = scrollArea.scrollLeft;
      scrollArea.style.cursor = "grabbing";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      const walk = (e.clientX - startX) * 1.5;
      scrollArea.scrollLeft = startScrollLeft - walk;
    };

    const handleMouseUp = () => {
      isDown = false;
      scrollArea.style.cursor = "grab";
    };

    const handleTouchStart = (e: TouchEvent) => {
      isDown = true;
      startX = e.touches[0].clientX;
      startScrollLeft = scrollArea.scrollLeft;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDown) return;
      const walk = (e.touches[0].clientX - startX) * 1.5;
      scrollArea.scrollLeft = startScrollLeft - walk;
    };

    scrollArea.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    scrollArea.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleMouseUp);

    return () => {
      scrollArea.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      scrollArea.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, []);
  const players =
    playersByTeam.teams.find(
      (team) => team.team === TEAM_NAME_BY_ID[selectedTeam],
    )?.players ?? [];

  const handleSelectTeam = (teamId: string) => {
    setSelectedTeam(teamId);
  };

  const handleSelectPlayer = (playerId: number) => {
    setSelectedPlayerIds((prev) =>
      prev.includes(playerId)
        ? prev.filter((id) => id !== playerId)
        : [...prev, playerId],
    );
  };

  useEffect(() => {
    localStorage.setItem(
      SELECTED_PLAYERS_STORAGE_KEY,
      JSON.stringify(selectedPlayerIds),
    );
  }, [selectedPlayerIds]);

  const handleSubmit = async () => {
    try {
      await Promise.all(
        selectedPlayerIds.map((playerId) =>
          followFavoritePlayer.mutateAsync(playerId),
        ),
      );
      navigate("/", { replace: true });
    } catch {
      // Error UI is rendered below from the mutation state.
    }
  };

  return (
    <PageContainer>
      <TitleWrapper>
        <Title>좋아하는 선수를 만나보세요!</Title>
      </TitleWrapper>
      <ActionGroup>
        <IconWapper
          onClick={() =>
            navigate("/searchpage", {
              state: {
                selectedTeam,
              },
            })
          }
          style={{ cursor: "pointer" }}
        >
          <Icon src={SearchIcon} alt="search icon" />
        </IconWapper>
        <TeamScrollArea ref={scrollAreaRef}>
          <TeamList>
            {TEAMS.map((team) =>
              team.id === selectedTeam ? (
                <SelectTeamActive
                  key={team.id}
                  TeamNameProp={team.name}
                  onClick={() => handleSelectTeam(team.id)}
                />
              ) : (
                <SelectTeamDefault
                  key={team.id}
                  TeamNameProp={team.name}
                  onClick={() => handleSelectTeam(team.id)}
                />
              ),
            )}
          </TeamList>
        </TeamScrollArea>
      </ActionGroup>
      <PopularWapper>
        <PopularFilter />
      </PopularWapper>
      <CardWapper>
        {players.map((player) =>
          selectedPlayerIds.includes(Number(player.id)) ? (
            <PlayerCardActive
              key={player.id}
              playerId={player.id}
              playerName={player.name}
              onClick={() => handleSelectPlayer(Number(player.id))}
            />
          ) : (
            <PlayerCardDefault
              key={player.id}
              playerId={player.id}
              playerName={player.name}
              onClick={() => handleSelectPlayer(Number(player.id))}
            />
          ),
        )}
      </CardWapper>
      {followFavoritePlayer.isError ? (
        <ErrorText>
          좋아하는 선수 등록에 실패했습니다. 다시 시도해주세요.
        </ErrorText>
      ) : null}
      <ButtonWapper>
        {selectedPlayerIds.length > 0 ? (
          <Button
            buttonText={
              followFavoritePlayer.isPending ? "등록 중..." : "선택 완료"
            }
            onClick={followFavoritePlayer.isPending ? undefined : handleSubmit}
          />
        ) : (
          <ButtonGray buttonText="선택 완료" />
        )}
      </ButtonWapper>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${theme.colors.white};
  display: flex;
  flex-direction: column;
  padding: 80px 20px 70px 20px;
  border: 1px solid ${theme.colors.primary100};
  box-sizing: border-box;
  align-items: center;
  overflow: hidden;
`;

const TitleWrapper = styled.div`
  align-self: flex-start;
  text-align: left;
  width: 169px;
  height: 72px;
  top: 90px;
  left: 16px;
  margin-right: 130px;
  margin-bottom: 45px;
`;

const Title = styled.h1`
  ${theme.typography.h1}
`;

const ActionGroup = styled.div`
  width: 100%;
  height: 44px;
  top: 194px;
  left: 16px;
  gap: 4px;
  display: flex;
  align-items: center;
`;

const IconWapper = styled.div`
  width: 44px;
  height: 44px;
  gap: 8px;
  border-radius: ${theme.radius.full};
  background-color: ${theme.colors.primary400};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const TeamScrollArea = styled.div`
  flex: 1;
  min-width: 0;
  overflow-x: auto;
  overflow-y: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  cursor: grab;
  user-select: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const TeamList = styled.div`
  width: max-content;
  display: flex;
  gap: 4px;
`;

const PopularWapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const CardWapper = styled.div`
  width: 100%;
  flex: 1;
  min-height: 0;
  top: 302px;
  left: 16px;
  gap: 16px;
  display: grid;
  grid-template-columns: repeat(3, 110px);
  justify-content: center;
  align-content: start;
  overflow-y: auto;
  padding: 12px 0 40px 0;
  box-sizing: border-box;
`;

const ButtonWapper = styled.div`
  width: 100%;
  height: 56px;
  margin-top: auto;
`;

const ErrorText = styled.p`
  ${theme.typography.body03}
  color: ${theme.colors.error};
  margin: 0 0 12px 0;
`;

export default LandingPage02;
