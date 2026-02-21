import styled from "styled-components";
import { theme } from "../../styles/theme";

const HomeAppBar = () => {
  return (
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
  );
};

const Appbar = styled.div`
  background-color: ${theme.colors.primary500};
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
  color: ${theme.colors.white};
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

export default HomeAppBar;
