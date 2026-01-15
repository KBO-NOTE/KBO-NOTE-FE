import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface ButtonProps {
    buttonText: string;
}

const Button = ({ buttonText }: ButtonProps) => {
    return (
        <Container>
            {buttonText}
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    min-width: 183px;
    height: 56px;
    border-radius: ${theme.radius.full};
    padding: 16px 48px 16px 48px;
    gap: 10px;
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.primary400};
    ${theme.typography.button01}
    color: ${theme.colors.primary400};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-sizing: border-box;
`;

export default Button;