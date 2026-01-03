import styled from 'styled-components';
import { theme } from '../../styles/theme';
import Filter from '../../assets/icons/filter.svg';

const Name = () => {
    return (
        <ActionGroup>
            <Icon src={Filter} alt="필터" />이름순
        </ActionGroup>
    );
};

const ActionGroup = styled.div`
    ${theme.typography.button02}
    color: ${theme.colors.black};    
    width: 64;
    height: 24;
    gap: 4px;
    align-items: center;
    display: flex;
    top: 16px;
    left: 16px;
`;

const Icon = styled.img`
    cursor: pointer;
    filter: brightness(0);
    width: 24px;
    height: 24px;
    gap: 8px;
`;

export default Name;
