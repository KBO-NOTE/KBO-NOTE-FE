import { colors } from './colors';
import { typography } from './typography';
import { shadows } from './shadows';
import { radius } from './radius';

export const theme = {
  colors,
  typography,
  shadows,
  radius,
};

export type ThemeType = typeof theme;