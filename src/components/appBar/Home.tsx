import styled from 'styled-components';
import { theme } from '../../styles/theme';
import IcWrite from '../../assets/icons/write.svg';
import IcSetting from '../../assets/icons/setting_01.svg';

const Appbar = () => {
    return (
        <Container>
        <InnerWrapper>
            <LogoWrapper>
                <Logo>
                    KBO<LogoSpan> NOTE</LogoSpan>
                </Logo>
            </LogoWrapper>
            <ActionGroup>
                    <Icon src={IcWrite} alt="글쓰기" />
                    <Icon src={IcSetting} alt="설정" />
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
`;

const InnerWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 394px;
    height: 56px; 
    padding: 0 16px;
    box-sizing: border-box;
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
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px; 
    width: 88px;
    height: 56px;
`;

const Icon = styled.img`
    width: 24px;
    height: 24px;
    cursor: pointer;
    filter: brightness(0) invert(1);
`;

export default Appbar;
