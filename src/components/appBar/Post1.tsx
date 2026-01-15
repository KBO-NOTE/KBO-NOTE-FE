import styled from 'styled-components';
import { theme } from '../../styles/theme';
import Backspace from '../../assets/icons/backspace.svg';

const Post = () => {
    return (
        <Container>
        <InnerWrapper>
            <Icon src={Backspace} alt="뒤로가기" />
            <LogoWrapper>
                <Logo>
                    KBO<LogoSpan> NOTE</LogoSpan>
                </Logo>
            </LogoWrapper>
            <ActionGroup>
                게시하기
            </ActionGroup>
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
    width: 44px;
    cursor: pointer;
    filter: brightness(0) invert(1);
    width: 44;
    height: 56;
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

const Logo = styled.div`
    ${theme.typography.brand.logo}
    color: ${theme.colors.white};
    font-size: 22px;
    display: flex;
    align-items: center;
    opacity: 1;
    -webkit-text-stroke: 0.39px white;
`;

const LogoSpan = styled.span`
    ${theme.typography.brand.logoSpan}
    font-size: 22px;
`;

const ActionGroup = styled.div`
    ${theme.typography.button02}
    color: ${theme.colors.white};    
    width: 44;
    height: 56;
`;

export default Post;
