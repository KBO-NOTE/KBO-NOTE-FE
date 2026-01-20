import { useState } from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";
import SearchIcon from "../assets/icons/search.svg";
import CloseIcon from "../assets/icons/close.svg";
import ButtonDefault from "../components/button/ButtonDefault";
import ButtonGray from "../components/button/ButtonGray"; // 1. ButtonGray 임포트 추가
import PlayerCardActive from "../components/landingPage/Active";
import PlayerCardDefault from "../components/landingPage/Default";
import { useNavigate } from "react-router-dom";

const PLAYERS = [
  { id: 1, name: "양의지" },
  { id: 2, name: "양의지" },
];

const SearchPage = () => {
  const navigate = useNavigate();
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleClear = () => {
    setSearchQuery("");
  };

  const handleComplete = () => {
    if (selectedPlayerId) {
      console.log("선택된 선수 ID:", selectedPlayerId);
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
        {PLAYERS.map((player) => {
          const isSelected = player.id === selectedPlayerId;
          return isSelected ? (
            <PlayerCardActive
              key={player.id}
              playerName={player.name}
              onClick={() => setSelectedPlayerId(null)}
            />
          ) : (
            <PlayerCardDefault
              key={player.id}
              playerName={player.name}
              onClick={() => setSelectedPlayerId(player.id)}
            />
          );
        })}
      </CardWapper>

      <ButtonWapper>
        {selectedPlayerId !== null ? (
          <ButtonDefault buttonText="선택 완료" onClick={handleComplete} />
        ) : (
          <ButtonGray buttonText="선택 완료" />
        )}
      </ButtonWapper>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${theme.colors.white};
  display: flex;
  flex-direction: column;
  padding: 80px 20px 70px 20px;
  border: 1px solid ${theme.colors.primary100};
  box-sizing: border-box;
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

const CardWapper = styled.div`
  width: fit-content;
  height: fit-content;
  top: 302px;
  left: 16px;
  gap: 16px;
  display: flex;
  padding: 40px 0px 40px 0px;
`;

export default SearchPage;
