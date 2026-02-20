import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { theme } from "../styles/theme";
import MainLogo from "../assets/logo/main01.svg";
import Google from "../assets/icons/Google.svg";
import Kakao from "../assets/icons/Kakao.svg";

const BACKEND_URL = "http://203.252.131.18:4530";
const GOOGLE_URL = "http://203.252.131.18.nip.io:4530";

const LandingPage01 = () => {
  const { search } = useLocation();
  const hasError = new URLSearchParams(search).get("error") === "true";

  const handleGoogleLogin = () => {
    window.location.href = `${GOOGLE_URL}/oauth2/authorization/google`;
  };

  const handleKakaoLogin = () => {
    window.location.href = `${BACKEND_URL}/oauth2/authorization/kakao`;
  };

  return (
    <PageContainer>
      <LogoWapper>
        <SubTitle>선수의 오늘, 슬기로운 크보생활</SubTitle>
        <Logo src={MainLogo} alt="KBO NOTE Logo" />
      </LogoWapper>
      {hasError && <ErrorText>로그인에 실패했습니다. 다시 시도해주세요.</ErrorText>}
      <GoogleLogin onClick={handleGoogleLogin}>
        <img src={Google} alt="Google Logo" />
        <Login>구글 계정 로그인</Login>
      </GoogleLogin>
      <KakaoLogin onClick={handleKakaoLogin}>
        <img src={Kakao} alt="Kakao Logo" />
        <Login>카카오 계정 로그인</Login>
      </KakaoLogin>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${theme.colors.white};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 200px 20px 70px 20px;
  border: 1px solid ${theme.colors.primary100};
`;

const LogoWapper = styled.div`
  width: 264px;
  height: 96px;
  gap: 4px;
  text-align: center;
  align-items: center;
  margin-bottom: 160px;
`;

const SubTitle = styled.div`
  ${theme.typography.title}
  color: ${theme.colors.primary700};
  width: 209;
  height: 26;
  text-align: center;
  align-items: center;
`;

const Logo = styled.img`
  gap: 7.33px;
  width: 248px;
  height: 50px;
  border-width: 0.92px;
  text-align: center;
  align-items: center;
  padding-top: 12px;
`;

const GoogleLogin = styled.button`
  color: ${theme.colors.light03};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 362px;
  height: 56px;
  margin-bottom: 12px;
  flex-direction: row;
  gap: 8px;
  border-radius: ${theme.radius.full};
  animation-timing-function: ease-out;
  animation-duration: 200ms;
`;

const KakaoLogin = styled.button`
  background: #fee500;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 362px;
  height: 56px;
  gap: 8px;
  border-radius: ${theme.radius.full};
  animation-timing-function: ease-out;
  animation-duration: 200ms;
`;

const Login = styled.div`
  ${theme.typography.button01}
  color: ${theme.colors.black};
`;

const ErrorText = styled.p`
  ${theme.typography.body03}
  color: ${theme.colors.error};
  margin: 0 0 16px 0;
`;

export default LandingPage01;
