import { useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";
import SearchIcon from "../assets/icons/search.svg";
import CloseIcon from "../assets/icons/close.svg";
import ButtonDefault from "../components/button/ButtonDefault";
import ButtonGray from "../components/button/ButtonGray";
import PlayerCardActive from "../components/landingPage/Active";
import PlayerCardDefault from "../components/landingPage/Default";
import { useLocation, useNavigate } from "react-router-dom";
import { useFollowFavoritePlayer } from "../api/favorites/mutations";
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

interface SearchPageState {
  selectedTeam?: string;
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

const SearchPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { selectedTeam = "doosan" } = (state as SearchPageState | null) ?? {};
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
  const [searchQuery, setSearchQuery] = useState("");
  const players =
    playersByTeam.teams.find(
      (team) => team.team === TEAM_NAME_BY_ID[selectedTeam],
    )?.players ?? [];
  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleClear = () => {
    setSearchQuery("");
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

  const handleComplete = async () => {
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
      <HeaderFrame>
        <IconWapper onClick={() => navigate(-1)} style={{ cursor: "pointer" }}>
          <Icon src={CloseIcon} alt="close icon" />
        </IconWapper>
        <TeamSearchWapper>
          <SearchInput
            placeholder="선수를 검색해보세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <IconWapper onClick={handleClear} style={{ cursor: "pointer" }}>
            <Icon src={SearchIcon} alt="search icon" />
          </IconWapper>
        </TeamSearchWapper>
      </HeaderFrame>

      <CardWapper>
        {filteredPlayers.map((player) => {
          const playerId = Number(player.id);
          const isSelected = selectedPlayerIds.includes(playerId);
          return isSelected ? (
            <PlayerCardActive
              key={player.id}
              playerId={player.id}
              playerName={player.name}
              onClick={() => handleSelectPlayer(playerId)}
            />
          ) : (
            <PlayerCardDefault
              key={player.id}
              playerId={player.id}
              playerName={player.name}
              onClick={() => handleSelectPlayer(playerId)}
            />
          );
        })}
      </CardWapper>

      {followFavoritePlayer.isError ? (
        <ErrorText>
          좋아하는 선수 등록에 실패했습니다. 다시 시도해주세요.
        </ErrorText>
      ) : null}
      <ButtonWapper>
        {selectedPlayerIds.length > 0 ? (
          <ButtonDefault
            buttonText={
              followFavoritePlayer.isPending ? "등록 중..." : "선택 완료"
            }
            onClick={
              followFavoritePlayer.isPending ? undefined : handleComplete
            }
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
  overflow: hidden;
`;

const HeaderFrame = styled.div`
  width: 100%;
  height: 44px;
  top: 90px;
  left: 16px;
  gap: 8px;
  display: flex;
  align-items: center;
`;

const TeamSearchWapper = styled.div`
  flex: 1;
  height: 44px;
  border-radius: ${theme.radius.full};
  padding: 0 16px;
  background-color: ${theme.colors.light02};
  display: flex;
  align-items: center;
  box-sizing: border-box;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  ${theme.typography.body03}
  color: ${theme.colors.black};
  &::placeholder {
    color: ${theme.colors.dark03};
  }
`;

const IconWapper = styled.div`
  width: 24px;
  height: 24px;
  gap: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    filter: brightness(0);
  }
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
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
  padding: 12px 0px 40px 0px;
  box-sizing: border-box;
`;

export default SearchPage;
