import ErrorIcon from "../assets/icons/error.svg";
import styled from "styled-components";
import { theme } from "../styles/theme";
import Button from "../components/button/ButtonDefault";

const ErrorPage = () => {
  return (
    <PageContainer>
      <ErrorWrapper>
        <img src={ErrorIcon} width={32} height={32} alt="ErrorIcon" />
        <ErrorTextFrame>
          <ErrorTitle>현재 요청을 처리할 수 없습니다.</ErrorTitle>
          <ErrorSubtitle>잠시후에 다시 시도해 주세요.</ErrorSubtitle>
        </ErrorTextFrame>
        <ButtonWapper>
          <Button buttonText="창닫기" />
        </ButtonWapper>
      </ErrorWrapper>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${theme.colors.white};
  text-align: center;
  display: flex;

  align-items: center;
  justify-content: center;

  border: 1px solid ${theme.colors.primary100};
  box-sizing: border-box;
`;

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
// padding: 200px 20px 70px 20px;
const ErrorTextFrame = styled.div`
  margin-top: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 236px;
  height: 52px;
  top: 368px;
  left: 79px;
  gap: 4px;
`;

const ErrorTitle = styled.h1`
  width: 236px;
  height: 26px;
  ${theme.typography.title}
  color: ${theme.colors.dark01};
`;

const ErrorSubtitle = styled.h2`
  width: 236px;
  height: 22px;
  margin-top: -10px;
  ${theme.typography.body03}
  color: ${theme.colors.dark04};
`;

const ButtonWapper = styled.div`
  width: 116px;
  top: 444px;
  left: 138.5px;
  gap: 10px;
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

export default ErrorPage;
