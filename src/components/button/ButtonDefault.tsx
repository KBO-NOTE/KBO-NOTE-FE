import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface ButtonProps {
    buttonText: string;
    onClick?: () => void;
}

const Button = ({ buttonText, onClick }: ButtonProps) => {
    return (
        <Container onClick={onClick}>
            {buttonText}
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    min-width: 362px;
    height: 56px;
    border-radius: ${theme.radius.full};
    padding: 16px 48px 16px 48px;
    gap: 10px;
    background-color: ${theme.colors.primary400};
    ${theme.typography.button01}
    color: ${theme.colors.white};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-sizing: border-box;
`;

export default Button;