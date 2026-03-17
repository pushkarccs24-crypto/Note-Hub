import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';

export const lightTheme = {
  colors,
  spacing,
  typography,
  radii: {
    sm: 8,
    md: 12,
    lg: 16,
    pill: 999
  },
  shadow: {
    card: {
      elevation: 4,
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 }
    }
  }
} as const;

export type AppTheme = typeof lightTheme;

declare module 'styled-components/native' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends AppTheme {}
}

