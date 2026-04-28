import styled from "styled-components";
import { theme } from "../../styles/theme";

interface HomePlayerCardProps {
  playerName: string;
  playerImg?: string;
  isActive?: boolean;
  onClick?: () => void;
}
const HomePlayerCard = ({
  playerName,
  playerImg,
  isActive = false,
  onClick,
}: HomePlayerCardProps) => {
  return (
    <PlayerCard onClick={onClick}>
      <PlayerImage active={isActive}>
        {playerImg && !playerImg.includes("undefined") ? (
          <PlayerImg src={playerImg} alt={playerName} />
        ) : (
          <PlayerImageInner />
        )}
      </PlayerImage>
      <PlayerName active={isActive}>{playerName}</PlayerName>
    </PlayerCard>
  );
};

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
    props.active
      ? `1.125px solid ${theme.colors.primary500}`
      : `1px solid ${theme.colors.light02}`};
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

const PlayerImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlayerName = styled.p<{ active?: boolean }>`
  ${theme.typography.body03}
  color: ${(props) =>
    props.active ? theme.colors.dark01 : theme.colors.dark04};
  margin: 0;
  text-align: center;
`;
export default HomePlayerCard;
