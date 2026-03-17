import styled from "styled-components";
import { theme } from "../../styles/theme";
import DefaultPlayerImage from "../../assets/images/players/default.png";

interface ActiveProps {
  playerName: string;
  onClick?: () => void;
}

const Default = ({ playerName, onClick }: ActiveProps) => {
  const playerImage = new URL(
    `../../assets/images/players/${playerName}.png`,
    import.meta.url,
  ).href;

  return (
    <Container onClick={onClick}>
      <ImageWrapper>
        <PlayerImage
          src={playerImage}
          alt={playerName}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = DefaultPlayerImage;
          }}
        />
      </ImageWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 110px;
  height: 144px;
  border-radius: ${theme.radius.l};
  background: ${theme.colors.white};
  position: relative;
  overflow: visible;
  box-sizing: border-box;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: ${theme.radius.l};
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.light02};
  box-sizing: border-box;
`;

const PlayerImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  top: 20px;
`;

export default Default;
