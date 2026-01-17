import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface SelectTeamProps {
    TeamNameProp: string;
    onClick?: () => void;
}

const SelectTeam = ({ TeamNameProp, onClick }: SelectTeamProps) => {
    const playerImage = new URL(`../../assets/images/teamLogos/${TeamNameProp}.svg`, import.meta.url).href;

    return (
        <ActionGroup onClick={onClick}>
            <TeamLogo src={playerImage} alt={TeamNameProp} />
            <TeamName>{TeamNameProp}</TeamName>
        </ActionGroup>
    );
};

const ActionGroup = styled.div`
    width: fit-content;
    min-width: 118px;
    height: 44px;
    gap: 4px;
    border-radius: ${theme.radius.full};
    padding: 6px 12px 6px 8px;
    align-items: center;
    display: flex;
    cursor: pointer;
    background-color: ${theme.colors.light03};
    box-sizing: border-box;
`;

const TeamLogo = styled.img`
    width: 32px;
    height: 32px;
    gap: 8px;
`;

const TeamName = styled.span`
    height: 22px;
    ${theme.typography.button02}
    color: ${theme.colors.black};
`;

export default SelectTeam;
