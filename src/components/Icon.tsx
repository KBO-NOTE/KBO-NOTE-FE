import styled from 'styled-components';

interface IconProps {
  src: string;    
  size: 16 | 24 | 32; 
  alt?: string;
}

const Icon = ({ src, size, alt = 'icon' }: IconProps) => {
  return <StyledIcon src={src} size={size} alt={alt} />;
};

const StyledIcon = styled.img<{ size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  object-fit: contain;
`;

export default Icon;