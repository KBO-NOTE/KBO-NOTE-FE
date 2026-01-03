import styled from 'styled-components';
import { theme } from '../styles/theme';
import SelectTeamAction from '../components/landingPage/SelectTeamAction';
import SelectTeamDefault from '../components/landingPage/SelectTeamDefault';
import SearchIcon from '../assets/icons/search.svg';
import PopularFilter from '../components/landingPage/Popular';
import PlayerCardActive from '../components/landingPage/Active';
import PlayerCardDefault from '../components/landingPage/Default';
import Button from '../components/button/ButtonDefault';

const LandingPage02 = () => {
    return (
        <PageContainer>
            <TitleWrapper>
                <Title>좋아하는 선수를 만나보세요!</Title>
            </TitleWrapper>
            <ActionGroup>
                <IconWapper><Icon src={SearchIcon} alt="search icon" /></IconWapper>
                <SelectTeamAction TeamNameProp="두산 베어스" />
                <SelectTeamDefault TeamNameProp="롯데 자이언츠" />
            </ActionGroup>
            <PopularWapper><PopularFilter /></PopularWapper>
            <CardWapper>
                <PlayerCardActive playerName='양의지'/>
                <PlayerCardDefault playerName='양의지'/>
                <PlayerCardDefault playerName='양의지'/>
            </CardWapper>
            <ButtonWapper><Button buttonText="선택 완료" /></ButtonWapper>
        </PageContainer>
    );
};

const PageContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: ${theme.colors.white};
    display: flex;
    flex-direction: column;
    padding: 80px 20px 70px 20px;
    border: 1px solid ${theme.colors.primary100};
    box-sizing: border-box;
`;

const TitleWrapper = styled.div`
    align-self: flex-start;
    text-align: left;
    width: 169px;
    height: 72px;
    top: 90px;
    left: 16px;
    margin-right: 130px;
    margin-bottom: 45px;
`;

const Title = styled.h1`
    ${theme.typography.h1}
`;

const ActionGroup = styled.div`
    width: fit-content;
    height: 44px;
    top: 194px;
    left: 16px;
    gap: 4px;
    display: flex;
`;

const IconWapper = styled.div`
    width: 44px;
    height: 44px;
    gap: 8px;
    border-radius: ${theme.radius.full};
    background-color: ${theme.colors.primary400};
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Icon = styled.img`
    width: 24px;
    height: 24px;
`;

const PopularWapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    margin-bottom: 20px;
`;

const CardWapper = styled.div`
    width: fit-content;
    height: fit-content;
    top: 302px;
    left: 16px;
    gap: 16px;
    display: flex;
    padding-bottom: 40px;
`;

const ButtonWapper = styled.div`
    width: 362px;
    height: 56px;
`;

export default LandingPage02;