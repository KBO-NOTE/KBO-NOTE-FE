import styled from "styled-components";

const LogoWrapper = styled.div`
  height: 55px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 0 16px;
  border: 1px solid ${({ theme }) => theme.colors.primary500};
`;

const LogoText = styled.span`
  font-family: "Airlash Raiders", sans-serif;
  font-weight: 400;
  font-size: 55px;
  line-height: 100%;
  letter-spacing: 0.06em; /* 6% */

  color: ${({ theme }) => theme.colors.primary500};
  text-align: center;
  white-space: nowrap;
`;

const LogoSpan = styled.span`
  letter-spacing: 0.01em; /* 1% */
`;

interface LogoProps {
  size?: "lg" | "md" | "sm";
}

const Logo = ({ size: _size = "lg" }: LogoProps) => {
  return (
    <LogoWrapper>
      <LogoText>
        KBO <LogoSpan>NOTE</LogoSpan>
      </LogoText>
    </LogoWrapper>
  );
};

export default Logo;
