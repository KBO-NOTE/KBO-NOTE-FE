import styled from 'styled-components';
import { theme } from '../../styles/theme';
import IcCheck from '../../assets/icons/check.svg'; 

interface ActiveProps {
    playerName: string;
}

const Active = ({ playerName }: ActiveProps) => {
    const playerImage = new URL(`../../assets/images/players/${playerName}.png`, import.meta.url).href;

    return (
        <Container>
        <IconWapper>
            <CheckIcon src={IcCheck} alt="selected" />
        </IconWapper>
        <ImageWrapper>
            <PlayerImage src={playerImage} alt={playerName} />
            <PlayerName>{playerName}</PlayerName>
            <ImageFilter />
        </ImageWrapper>
        </Container>
    );
};

const Container = styled.div`
    width: 110px;
    height: 144px;
    border-radius: ${theme.radius.l};
    background-color: ${theme.colors.light02}; 
    position: relative;
    overflow: visible;
    box-sizing: border-box;
`;

const IconWapper = styled.div`
    position: absolute;
    z-index: 10;
    background: ${theme.colors.primary500};
    width: 24px;
    height: 24px;
    top: -12px;
    left: 82px;
    border-radius: ${theme.radius.full};
    display: flex;
    align-items: center;
    justify-content: center;
`;

const CheckIcon = styled.img`
    position: absolute;
    width: 14px;
    height: 14px;
    filter: brightness(0) invert(1);
    top: 6.5px;
`;

const ImageWrapper = styled.div`
    width: 100%;
    height: 100%;
    border-radius: ${theme.radius.l};
    border: 1.5px solid ${theme.colors.primary500};
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
`;

const ImageFilter = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    background: ${theme.colors.primary500}80;
`;

const PlayerImage = styled.img`
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    top: 20px;
`;

const PlayerName = styled.span`
    position: absolute;
    ${theme.typography.body03}
    color: ${theme.colors.white};
    z-index: 10;
`;

export default Active;