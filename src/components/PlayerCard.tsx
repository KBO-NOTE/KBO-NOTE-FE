import styled from "styled-components";
import { theme } from "../styles/theme";

interface PlayerCardProps {
  name: string;
  imageUrl: string;
  isSelected?: boolean;
}

const PlayerCard = ({
  name,
  imageUrl,
  isSelected = false,
}: PlayerCardProps) => {
  return (
    <CardContainer>
      <ImageWrapper $isSelected={isSelected}>
        <PlayerImage src={imageUrl} alt={name} />
        {isSelected && <CheckBadge>✓</CheckBadge>}
      </ImageWrapper>
      <PlayerName>{name}</PlayerName>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
`;

const ImageWrapper = styled.div<{ $isSelected: boolean }>`
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid ${(props) => (props.$isSelected ? "#007AFF" : "#E0E0E0")};
  overflow: visible;
`;

const PlayerImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const CheckBadge = styled.div`
  position: absolute;
  top: -2px;
  right: -2px;
  background-color: ${theme.colors.primary500};
  color: white;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlayerName = styled.span`
  margin-top: 8px;
  font-size: 0.8rem;
  color: #333;
`;

export default PlayerCard;
