import styled from "styled-components";
import { theme } from "../../styles/theme";

interface SelectTeamProps {
  TeamNameProp: string;
}

const SelectTeam = ({ TeamNameProp }: SelectTeamProps) => {
  const playerImage = new URL(
    `../../assets/images/teamLogos/${TeamNameProp}.svg`,
    import.meta.url
  ).href;

  return (
    <ActionGroup>
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
  border: 1.3px solid ${theme.colors.primary500};
  align-items: center;
  display: flex;
  cursor: pointer;
  background-color: ${theme.colors.white};
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
