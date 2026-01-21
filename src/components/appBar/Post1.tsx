import styled from "styled-components";
import { theme } from "../../styles/theme";
import Backspace from "../../assets/icons/backspace.svg";
import MainLogo from "../../assets/logo/main02.svg";

const Post = () => {
  return (
    <Container>
      <InnerWrapper>
        <Icon src={Backspace} alt="뒤로가기" />
        <LogoWrapper>
          <Logo src={MainLogo} alt="KBO NOTE Logo" />
        </LogoWrapper>
        <ActionGroup>게시하기</ActionGroup>
      </InnerWrapper>
    </Container>
  );
};

const Container = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 394px;
  height: 110px;
  background-color: ${theme.colors.primary500};
  box-sizing: border-box;
  top: 16px;
`;

const InnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 394px;
  height: 56px;
  padding: 0 16px;
  box-sizing: border-box;
  top: 54px;
`;

const Icon = styled.img`
  cursor: pointer;
  filter: brightness(0) invert(1);
  width: 44px;
  height: 56px;
  gap: 8px;
  padding: 4px;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 112px;
  height: 28px;
  gap: 3.11px;
`;

const Logo = styled.img`
  width: 112px;
  height: 28px;
  gap: 3.11px;
  border-width: 0.92px;
  text-align: center;
  align-items: center;
`;

// const LogoSpan = styled.span`
//     ${theme.typography.brand.logoSpan}
//     font-size: 22px;
// `;

const ActionGroup = styled.div`
  ${theme.typography.button02}
  color: ${theme.colors.white};
  width: 44;
  height: 56;
`;

export default Post;
