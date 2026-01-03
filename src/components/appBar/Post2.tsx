import styled from 'styled-components';
import { theme } from '../../styles/theme';
import Backspace from '../../assets/icons/backspace.svg';
import Filter from '../../assets/icons/filter.svg';

const Post2 = () => {
    return (
        <Container>
        <InnerWrapper>
            <Icon src={Backspace} alt="뒤로가기" />
            <ActionGroup>
                <Icon2 src={Filter} alt="필터" />최신순
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
    background-color: ${theme.colors.white};
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

const ActionGroup = styled.div`
    ${theme.typography.button02}
    color: ${theme.colors.black};    
    width: 64;
    height: 56;
    gap: 4px;
    align-items: center;
    display: flex;
`;

const Icon = styled.img`
    cursor: pointer;
    filter: brightness(0);
    width: 44px;
    height: 56px;
    gap: 8px;
    padding: 4px;
`;

const Icon2 = styled.img`
    cursor: pointer;
    filter: brightness(0);
    width: 24px;
    height: 24px;
    gap: 8px;
`;

export default Post2;
