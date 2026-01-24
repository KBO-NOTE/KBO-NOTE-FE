import 'styled-components';
import { typography } from './styles/typography';
import { shadows } from './styles/shadows';
import { radius } from './styles/radius';

type TypographyType = typeof typography
type ShadowsType = typeof shadows
type RadiusType = typeof radius
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      [key: string]: string;
    };
    typography: TypographyType;
    shadows: ShadowsType;
    radius: RadiusType;
  }
}