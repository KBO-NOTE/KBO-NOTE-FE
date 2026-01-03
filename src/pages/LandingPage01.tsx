import styled from 'styled-components';
import { theme } from '../styles/theme';
import MainLogo from '../assets/logo/main01.svg';
import Google from '../assets/icons/google.svg';
import Kakao from '../assets/icons/kakao.svg';

const LandingPage01 = () => {
  return (
    <PageContainer>
        <LogoWapper>
          <SubTitle>선수의 오늘, 슬기로운 크보생활</SubTitle>
          <Logo src={MainLogo} alt="KBO NOTE Logo" />
        </LogoWapper>
        <GoogleLogin><img src={Google} alt="Google Logo" />
          <Login>구글 계정 로그인</Login>
        </GoogleLogin>
        <KakaoLogin><img src={Kakao} alt="Kakao Logo" />
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
  background: #FEE500;  
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

export default LandingPage01;