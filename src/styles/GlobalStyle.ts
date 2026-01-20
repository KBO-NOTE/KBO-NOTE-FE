import { createGlobalStyle } from 'styled-components';
import AirlashRaiders from '../assets/fonts/AirlashRaiders.ttf';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Airlash Raiders';
    src: url(${AirlashRaiders}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
`;

export default GlobalStyle;